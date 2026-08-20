import { NextResponse } from "next/server";
import { bboxDelPredio, contarCapasDisponibles } from "@/lib/openstreetmap-client";
import type { Coordenadas } from "@/types/location";

/**
 * RF-04 / HU-ORG-09. Consulta la disponibilidad real de datos de
 * OpenStreetMap (vía Overpass, sin API key) para el predio dibujado en la
 * Pantalla 08.
 */
export async function POST(request: Request) {
  const { latitud, longitud, limite } = (await request.json()) as {
    latitud?: number;
    longitud?: number;
    limite?: Coordenadas[];
  };

  if (typeof latitud !== "number" || typeof longitud !== "number") {
    return NextResponse.json({ error: "Faltan latitud/longitud." }, { status: 400 });
  }

  try {
    const bbox = bboxDelPredio(latitud, longitud, limite);
    const capas = await contarCapasDisponibles(bbox);
    return NextResponse.json({ disponible: capas.length > 0, capas, bbox });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 502 });
  }
}
