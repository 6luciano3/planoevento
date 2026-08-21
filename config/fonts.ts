/** Familias tipográficas disponibles para los objetos de texto del plano — deben coincidir con las cargadas en app/layout.tsx. */
export interface FuenteTexto {
  id: string;
  nombre: string;
  fontFamily: string;
}

export const FUENTES_TEXTO: FuenteTexto[] = [
  { id: "mono", nombre: "Técnica (mono)", fontFamily: "'IBM Plex Mono', monospace" },
  { id: "inter", nombre: "Moderna (Inter)", fontFamily: "'Inter', sans-serif" },
  { id: "display", nombre: "Cartel (Bebas Neue)", fontFamily: "'Bebas Neue', sans-serif" },
  { id: "serif", nombre: "Elegante (Playfair Display)", fontFamily: "'Playfair Display', serif" },
];

export const FUENTE_TEXTO_DEFECTO = FUENTES_TEXTO[0].fontFamily;
