import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA = "/symbols/Mobiliario urbano y confort";

/**
 * Mobiliario isométrico (Colección 9) — cada PNG incluye su propio parche de
 * césped/tierra colorada, así que el ancho/alto por defecto cubre esa base
 * visible, no solo el objeto en sí.
 */
export const MOBILIARIO_URBANO: DefinicionSimbolo[] = [
  { id: "banco-madera", nombre: "Banco regional de madera", categoria: "mobiliario-urbano", icono: `${CARPETA}/01_banco_regional_madera.png`, prefijo: "MU", defaultWidth: 2.2, defaultHeight: 0.9, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "banco-metalico", nombre: "Banco urbano metálico", categoria: "mobiliario-urbano", icono: `${CARPETA}/02_banco_urbano_metalico.png`, prefijo: "MU", defaultWidth: 2.0, defaultHeight: 0.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mesa-picnic", nombre: "Mesa de pícnic accesible", categoria: "mobiliario-urbano", icono: `${CARPETA}/03_mesa_picnic_accesible.png`, prefijo: "MU", defaultWidth: 2.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mesa-sombrilla", nombre: "Mesa exterior con sombrilla", categoria: "mobiliario-urbano", icono: `${CARPETA}/04_mesa_exterior_sombrilla.png`, prefijo: "MU", defaultWidth: 2.5, defaultHeight: 2.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "pergola", nombre: "Pérgola de madera", categoria: "mobiliario-urbano", icono: `${CARPETA}/05_pergola_madera.png`, prefijo: "MU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "vela-tensada", nombre: "Zona de sombra con vela tensada", categoria: "mobiliario-urbano", icono: `${CARPETA}/06_sombra_vela_tensada.png`, prefijo: "MU", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "bebedero", nombre: "Bebedero accesible", categoria: "mobiliario-urbano", icono: `${CARPETA}/07_bebedero_accesible.png`, prefijo: "MU", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "bicicletero", nombre: "Bicicletero", categoria: "mobiliario-urbano", icono: `${CARPETA}/08_bicicletero.png`, prefijo: "MU", defaultWidth: 2.5, defaultHeight: 1.2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "cesto-residuos-iso", nombre: "Cesto de residuos", categoria: "mobiliario-urbano", icono: `${CARPETA}/09_cesto_residuos.png`, prefijo: "MU", defaultWidth: 0.8, defaultHeight: 0.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "punto-reciclaje-iso", nombre: "Punto de reciclaje", categoria: "mobiliario-urbano", icono: `${CARPETA}/10_punto_reciclaje.png`, prefijo: "MU", defaultWidth: 1.5, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "jardinera", nombre: "Jardinera subtropical", categoria: "mobiliario-urbano", icono: `${CARPETA}/11_jardinera_subtropical.png`, prefijo: "MU", defaultWidth: 2, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "maceton-lapacho", nombre: "Macetón con lapacho rosado", categoria: "mobiliario-urbano", icono: `${CARPETA}/12_maceton_lapacho_rosado.png`, prefijo: "MU", defaultWidth: 1.2, defaultHeight: 1.2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "ordenamiento-filas", nombre: "Sistema de ordenamiento de filas", categoria: "mobiliario-urbano", icono: `${CARPETA}/13_ordenamiento_filas.png`, prefijo: "MU", defaultWidth: 3, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "conjunto-mastiles", nombre: "Conjunto de mástiles", categoria: "mobiliario-urbano", icono: `${CARPETA}/14_conjunto_mastiles.png`, prefijo: "MU", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "banco-solar", nombre: "Banco con carga solar", categoria: "mobiliario-urbano", icono: `${CARPETA}/15_banco_carga_solar.png`, prefijo: "MU", defaultWidth: 2, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "fuente-agua", nombre: "Fuente de agua", categoria: "mobiliario-urbano", icono: "/symbols/Fuente de agua/fuente_agua.png", prefijo: "MU", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
