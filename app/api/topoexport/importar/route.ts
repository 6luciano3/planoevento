import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Integración con TopoExport pendiente. Ver PRD §10 y §23 (Riesgos)." },
    { status: 501 }
  );
}
