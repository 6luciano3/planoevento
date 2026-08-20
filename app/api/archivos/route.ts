import { NextResponse } from "next/server";

/**
 * Subida de archivos importados (Pantalla 05/11). El MVP los lee como
 * data URL en el propio navegador (services/file.service.ts) sin pasar por
 * el servidor. Esta ruta es para cuando haya almacenamiento real (S3, etc.)
 * y archivos grandes que no convenga mandar como data URL.
 */
export async function POST() {
  return NextResponse.json({ error: "Almacenamiento de archivos no implementado todavía." }, { status: 501 });
}
