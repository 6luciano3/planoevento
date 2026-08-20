import { leerArchivoComoDataUrl, FORMATOS_IMPORTACION_MVP } from "@/lib/file-converter";

export interface ArchivoImportado {
  nombre: string;
  tamanoBytes: number;
  dataUrl: string;
}

export function extensionValida(nombreArchivo: string): boolean {
  const ext = nombreArchivo.slice(nombreArchivo.lastIndexOf(".")).toLowerCase();
  return FORMATOS_IMPORTACION_MVP.includes(ext);
}

/** Importar plano propio — HU-ORG-11. Guarda el archivo como data URL para previsualizarlo. */
export async function importarArchivo(archivo: File): Promise<ArchivoImportado> {
  const dataUrl = await leerArchivoComoDataUrl(archivo);
  return { nombre: archivo.name, tamanoBytes: archivo.size, dataUrl };
}
