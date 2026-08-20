import { NextResponse } from "next/server";

/** Hoy el plano vive embebido en el ProyectoPlano (ver types/project.ts). */
export async function GET() {
  return NextResponse.json({ error: "Backend no implementado todavía." }, { status: 501 });
}
