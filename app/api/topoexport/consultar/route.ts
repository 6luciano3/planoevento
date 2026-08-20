import { NextResponse } from "next/server";

/**
 * Consultará TOPOEXPORT_API_URL / TOPOEXPORT_API_KEY (ver .env.example)
 * cuando exista una cuenta real. Hoy `services/topoexport.service.ts`
 * simula la respuesta directamente en el cliente para no depender de esta
 * ruta — moverla acá evita exponer la API key en el navegador el día que
 * haya credenciales reales.
 */
export async function POST() {
  return NextResponse.json(
    { error: "Integración con TopoExport pendiente. Ver PRD §10 y §23 (Riesgos)." },
    { status: 501 }
  );
}
