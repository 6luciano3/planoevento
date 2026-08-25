import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA = "/symbols/Superficies y bases modulares";

/**
 * Paleta de texturas de piso y tiles de transición entre dos superficies —
 * arrastre manual, no son un "camino" con direcciones (no hay noción de
 * conexión, solo de qué textura cubre cada módulo del piso). Igual que
 * Cerramientos, la carpeta trae cada ítem duplicado bajo dos nombres de
 * archivo — se usa el que coincide con el README.txt de la colección.
 */
export const SUPERFICIES: DefinicionSimbolo[] = [
  { id: "cesped-uniforme", nombre: "Césped uniforme", categoria: "superficies", icono: `${CARPETA}/01_cesped_uniforme.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "tierra-colorada-compactada", nombre: "Tierra colorada compactada", categoria: "superficies", icono: `${CARPETA}/02_tierra_colorada_compactada.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "grava-fina", nombre: "Grava fina", categoria: "superficies", icono: `${CARPETA}/03_grava_fina.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "hormigon-liso", nombre: "Hormigón liso", categoria: "superficies", icono: `${CARPETA}/04_hormigon_liso.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "adoquines-grises", nombre: "Adoquines grises", categoria: "superficies", icono: `${CARPETA}/05_adoquines_grises.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "ladrillo-terracota", nombre: "Ladrillo terracota", categoria: "superficies", icono: `${CARPETA}/06_ladrillo_terracota.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "asfalto-liso", nombre: "Asfalto liso", categoria: "superficies", icono: `${CARPETA}/07_asfalto_liso.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "deck-madera", nombre: "Deck de madera", categoria: "superficies", icono: `${CARPETA}/08_deck_madera.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "arena-compactada", nombre: "Arena compactada", categoria: "superficies", icono: `${CARPETA}/09_arena_compactada.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mantillo-madera", nombre: "Mantillo de madera", categoria: "superficies", icono: `${CARPETA}/10_mantillo_madera.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "transicion-cesped-tierra", nombre: "Transición césped–tierra", categoria: "superficies", icono: `${CARPETA}/11_transicion_cesped_tierra.png`, prefijo: "TR", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
  { id: "transicion-cesped-hormigon", nombre: "Transición césped–hormigón", categoria: "superficies", icono: `${CARPETA}/12_transicion_cesped_hormigon.png`, prefijo: "TR", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
  { id: "transicion-cesped-grava", nombre: "Transición césped–grava", categoria: "superficies", icono: `${CARPETA}/13_transicion_cesped_grava.png`, prefijo: "TR", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
  { id: "transicion-tierra-grava", nombre: "Transición tierra–grava", categoria: "superficies", icono: `${CARPETA}/14_transicion_tierra_grava.png`, prefijo: "TR", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
  { id: "base-hormigon-sobre-cesped", nombre: "Base de hormigón sobre césped", categoria: "superficies", icono: `${CARPETA}/15_base_hormigon_sobre_cesped.png`, prefijo: "SU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },

  // Pieza extra de la carpeta, sin equivalente exacto en el README de la colección.
  { id: "transicion-cesped-pavimento", nombre: "Transición césped–pavimento", categoria: "superficies", icono: `${CARPETA}/10_transicion_cesped_pavimento.png`, prefijo: "TR", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
];
