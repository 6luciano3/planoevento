import { NextResponse } from "next/server";
import { TopoExportNoConfigurado, buscarDatasetsDisponibles, mapearCapasDisponibles } from "@/lib/topoexport-client";

/**
 * RF-04 / HU-ORG-09. Llama a la API real de TopoExport (GET /lookup) desde
 * el servidor, para que TOPOEXPORT_API_KEY nunca llegue al navegador.
 * Necesita TOPOEXPORT_API_KEY en .env.local — ver .env.example.
 */
export async function POST(request: Request) {
  const { latitud, longitud } = await request.json();

  if (typeof latitud !== "number" || typeof longitud !== "number") {
    return NextResponse.json({ error: "Faltan latitud/longitud." }, { status: 400 });
  }

  try {
    const { bbox, region, datasets } = await buscarDatasetsDisponibles(latitud, longitud);
    return NextResponse.json({
      disponible: datasets.length > 0,
      capas: mapearCapasDisponibles(datasets),
      region,
      bbox,
      datasetsCrudos: datasets,
    });
  } catch (error) {
    if (error instanceof TopoExportNoConfigurado) {
      return NextResponse.json({ error: error.message }, { status: 501 });
    }
    return NextResponse.json({ error: (error as Error).message }, { status: 502 });
  }
}
