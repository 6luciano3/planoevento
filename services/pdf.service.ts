/**
 * Exportación a PDF — HU-ORG-38 / RF-19. El MVP usa la impresión nativa del
 * navegador ("Guardar como PDF") sobre una vista de solo impresión, en vez
 * de sumar una librería de generación de PDF (ver editor/renderers/README.md).
 */
export function exportarComoPdf(): void {
  if (typeof window === "undefined") return;
  window.print();
}
