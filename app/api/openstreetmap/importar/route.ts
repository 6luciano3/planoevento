import { NextResponse } from "next/server";
import { bboxDelPredio, obtenerCapaComoGeoJSON } from "@/lib/openstreetmap-client";
import type { CapaTopoId } from "@/types/topoexport";
import type { Coordenadas } from "@/types/location";

/** RF-04 / HU-ORG-09. Trae las geometrías reales de OpenStreetMap para las capas elegidas. */
export async function POST(request: Request) {
  const { latitud, longitud, limite, capas } = (await request.json()) as {
    latitud?: number;
    longitud?: number;
    limite?: Coordenadas[];
    capas?: CapaTopoId[];
  };

  if (typeof latitud !== "number" || typeof longitud !== "number" || !capas?.length) {
    return NextResponse.json({ error: "Faltan latitud/longitud/capas." }, { status: 400 });
  }

  const bbox = bboxDelPredio(latitud, longitud, limite);
  const resultados = await Promise.allSettled(capas.map((capa) => obtenerCapaComoGeoJSON(capa, bbox)));

  const capasImportadas = capas.filter((_, i) => resultados[i].status === "fulfilled");
  const geojsonPorCapa = Object.fromEntries(
    capas
      .map((capa, i) => [capa, resultados[i]] as const)
      .filter(([, r]) => r.status === "fulfilled")
      .map(([capa, r]) => [capa, (r as PromiseFulfilledResult<unknown>).value])
  );
  const huboErrores = resultados.some((r) => r.status === "rejected");

  if (capasImportadas.length === 0) {
    return NextResponse.json({
      estado: "error",
      mensaje: "No se pudo obtener ninguna capa de OpenStreetMap para esta ubicación.",
      capasImportadas: [],
    });
  }

  return NextResponse.json({
    estado: huboErrores ? "parcial" : "completo",
    mensaje: huboErrores
      ? "Se importaron algunas capas de OpenStreetMap; otras fallaron."
      : "La base geográfica de OpenStreetMap fue obtenida correctamente.",
    capasImportadas,
    fechaImportacion: new Date().toISOString(),
    geojsonPorCapa,
  });
}
