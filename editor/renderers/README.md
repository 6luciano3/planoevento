# Renderers

Para el MVP, el lienzo se renderiza directamente en `components/editor/EditorCanvas.tsx`
como SVG del DOM (permite arrastrar y soltar con eventos nativos sin dependencias extra).

- **CanvasRenderer / SvgRenderer**: cubiertos por `EditorCanvas.tsx` mientras el
  render en pantalla siga siendo SVG interactivo.
- **PdfRenderer**: para el MVP se resuelve con `window.print()` sobre una vista
  de solo impresión (`app/proyectos/[proyectoId]/exportar/page.tsx` + estilos
  `@media print` en `app/globals.css`), que es lo que exige RNF-08 sin sumar
  una librería de generación de PDF. Si más adelante se necesita un PDF
  generado en el servidor (para descarga directa sin diálogo del navegador),
  este es el lugar para agregar `PdfRenderer.ts` con `@react-pdf/renderer` o
  similar.
