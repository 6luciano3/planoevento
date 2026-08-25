import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA = "/symbols/elementos característicos de Misiones";

/**
 * Elementos temáticos regionales de Misiones — árboles, estructuras y
 * escenas puntuales, sin conexión con las otras colecciones (vegetación,
 * caminos, stands): arrastre manual, un objeto por ítem.
 */
export const ELEMENTOS_MISIONES: DefinicionSimbolo[] = [
  { id: "mision-araucaria", nombre: "Araucaria", categoria: "elementos-misiones", icono: `${CARPETA}/Araucaria.png`, prefijo: "EC", defaultWidth: 6, defaultHeight: 6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-arroyo", nombre: "Arroyo misionero", categoria: "elementos-misiones", icono: `${CARPETA}/Arroyo misionero..png`, prefijo: "EC", defaultWidth: 6, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-barbacua", nombre: "Barbacuá tradicional", categoria: "elementos-misiones", icono: `${CARPETA}/Barbacuá tradicional.png`, prefijo: "EC", defaultWidth: 2.5, defaultHeight: 2.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-camino-tierra-colorada", nombre: "Camino de tierra colorada", categoria: "elementos-misiones", icono: `${CARPETA}/Camino de tierra colorada.png`, prefijo: "EC", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-cantero-yerba-mate", nombre: "Cantero con plantas de yerba mate", categoria: "elementos-misiones", icono: `${CARPETA}/Cantero con plantas de yerba mate.png`, prefijo: "EC", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-carro-cosecha", nombre: "Carro de cosecha", categoria: "elementos-misiones", icono: `${CARPETA}/Carro de cosecha.png`, prefijo: "EC", defaultWidth: 3, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-casa-colectividades", nombre: "Casa de colectividades", categoria: "elementos-misiones", icono: `${CARPETA}/Casa de colectividades.png`, prefijo: "EC", defaultWidth: 6, defaultHeight: 5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-helechos-subtropicales", nombre: "Helechos y vegetación subtropical", categoria: "elementos-misiones", icono: `${CARPETA}/Helechos y vegetación subtropical.png`, prefijo: "EC", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-lapacho-rosado", nombre: "Lapacho rosado", categoria: "elementos-misiones", icono: `${CARPETA}/Lapacho rosado.png`, prefijo: "EC", defaultWidth: 5, defaultHeight: 5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-monumento-mate", nombre: "Monumento al mate", categoria: "elementos-misiones", icono: `${CARPETA}/Monumento al mate.png`, prefijo: "EC", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-palmera-pindo", nombre: "Palmera pindó", categoria: "elementos-misiones", icono: `${CARPETA}/Palmera pindó.png`, prefijo: "EC", defaultWidth: 3.5, defaultHeight: 3.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-salto-agua", nombre: "Pequeño salto de agua", categoria: "elementos-misiones", icono: `${CARPETA}/Pequeño salto de agua..png`, prefijo: "EC", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-portico-regional", nombre: "Pórtico regional de madera", categoria: "elementos-misiones", icono: `${CARPETA}/Pórtico regional de madera.png`, prefijo: "EC", defaultWidth: 5, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-raido-yerba", nombre: "Raído de yerba", categoria: "elementos-misiones", icono: `${CARPETA}/Raído de yerba.png`, prefijo: "EC", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-secadero-yerba-mate", nombre: "Secadero de yerba mate", categoria: "elementos-misiones", icono: `${CARPETA}/Secadero de yerba mate.png`, prefijo: "EC", defaultWidth: 4, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-sendero-tierra-colorada", nombre: "Sendero de tierra colorada", categoria: "elementos-misiones", icono: `${CARPETA}/Sendero de tierra colorada.png`, prefijo: "EC", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mision-tractor-yerbatero", nombre: "Tractor yerbatero", categoria: "elementos-misiones", icono: `${CARPETA}/Tractor yerbatero.png`, prefijo: "EC", defaultWidth: 3, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
