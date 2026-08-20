/**
 * Conversión y lectura de archivos importados (Pantalla 05 / HU-ORG-11).
 * Etapa 1: solo lee la imagen para previsualizarla en el navegador.
 * Etapa 3 deberá sumar parseo real de PDF/SVG/GeoJSON del lado del servidor.
 */
export function leerArchivoComoDataUrl(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(archivo);
  });
}

export const FORMATOS_IMPORTACION_MVP = [".png", ".jpg", ".jpeg", ".pdf", ".svg", ".geojson"];
