import { NextResponse } from "next/server";

/**
 * Generación de PDF en el servidor (para descarga directa sin el diálogo
 * de impresión del navegador). El MVP resuelve la exportación en el
 * cliente con `window.print()` — ver services/pdf.service.ts y
 * editor/renderers/README.md. Esta ruta queda como el lugar indicado para
 * sumar `@react-pdf/renderer` o similar si hace falta un PDF descargable
 * sin intervención del usuario.
 */
export async function POST() {
  return NextResponse.json(
    { error: "Generación de PDF en servidor no implementada. Usar la exportación por impresión del navegador." },
    { status: 501 }
  );
}
