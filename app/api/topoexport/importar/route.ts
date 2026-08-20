import { NextResponse } from "next/server";
import {
  TopoExportNoConfigurado,
  buscarDatasetsDisponibles,
  mapearCapasDisponibles,
  obtenerFeaturesDataset,
} from "@/lib/topoexport-client";
import type { CapaTopoId } from "@/types/topoexport";

/**
 * RF-04 / HU-ORG-09. Vuelve a resolver los datasets disponibles (lookup) y
 * trae las features (GeoJSON) de los que coincidan con las capas pedidas,
 * vía GET /datasets/{id}/features. Ver lib/topoexport-client.ts: el
 * parámetro `bbox` de ese endpoint es un supuesto razonable, no algo
 * confirmado contra una cuenta real todavía.
 */
export async function POST(request: Request) {
  const { latitud, longitud, capas } = (await request.json()) as {
    latitud?: number;
    longitud?: number;
    capas?: CapaTopoId[];
  };

  if (typeof latitud !== "number" || typeof longitud !== "number" || !capas?.length) {
    return NextResponse.json({ error: "Faltan latitud/longitud/capas." }, { status: 400 });
  }

  try {
    const { bbox, datasets } = await buscarDatasetsDisponibles(latitud, longitud);
    const capasSolicitadas = new Set(capas);

    const datasetsAImportar = datasets.filter((dataset) =>
      mapearCapasDisponibles([dataset]).some((capaId) => capasSolicitadas.has(capaId))
    );

    if (datasetsAImportar.length === 0) {
      return NextResponse.json({
        estado: "sin_cobertura",
        mensaje: "TopoExport no tiene datasets para las capas pedidas en esta ubicación.",
        capasImportadas: [],
      });
    }

    const resultados = await Promise.allSettled(
      datasetsAImportar.map((dataset) => obtenerFeaturesDataset(dataset.id, bbox))
    );

    const capasImportadas = mapearCapasDisponibles(
      datasetsAImportar.filter((_, i) => resultados[i].status === "fulfilled")
    );
    const geojsonPorCapa = Object.fromEntries(
      datasetsAImportar
        .map((dataset, i) => [dataset.id, resultados[i]])
        .filter(([, r]) => (r as PromiseSettledResult<unknown>).status === "fulfilled")
        .map(([id, r]) => [id, (r as PromiseFulfilledResult<unknown>).value])
    );

    const huboErrores = resultados.some((r) => r.status === "rejected");

    return NextResponse.json({
      estado: huboErrores ? "parcial" : "completo",
      mensaje: huboErrores
        ? "Se importaron algunas capas; otras fallaron (ver consola del servidor)."
        : "La base geográfica fue obtenida correctamente.",
      capasImportadas,
      fechaImportacion: new Date().toISOString(),
      geojsonPorCapa,
    });
  } catch (error) {
    if (error instanceof TopoExportNoConfigurado) {
      return NextResponse.json({ error: error.message }, { status: 501 });
    }
    return NextResponse.json({ error: (error as Error).message }, { status: 502 });
  }
}
