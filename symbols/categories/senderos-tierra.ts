import type { DefinicionSimbolo } from "@/types/symbol";

/**
 * Piezas direccionales para la herramienta "Camino" (editor/tools/caminoAutoTile.ts)
 * — recta/curva/T/cruce/terminal, más las piezas extra de esta carpeta para
 * arrastre manual. Los ids de las piezas nucleo deben coincidir exactamente
 * con lo que arma calcularPiezasCamino.
 */
export const SENDEROS_TIERRA: DefinicionSimbolo[] = [
  { id: "sendero-tierra-recta-norte-sur", nombre: "Recta norte-sur", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/01_recta_norte_sur.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-recta-este-oeste", nombre: "Recta este-oeste", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/02_recta_este_oeste.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-curva-norte-este", nombre: "Curva norte-este", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/03_curva_norte_este.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-curva-este-sur", nombre: "Curva este-sur", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/04_curva_este_sur.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-curva-sur-oeste", nombre: "Curva sur-oeste", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/05_curva_sur_oeste.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-curva-oeste-norte", nombre: "Curva oeste-norte", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/06_curva_oeste_norte.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-t-sin-norte", nombre: "Empalme en T (sin norte)", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/07_t_sin_norte.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-t-sin-este", nombre: "Empalme en T (sin este)", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/08_t_sin_este.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-t-sin-sur", nombre: "Empalme en T (sin sur)", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/09_t_sin_sur.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-t-sin-oeste", nombre: "Empalme en T (sin oeste)", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/10_t_sin_oeste.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-cruce", nombre: "Cruce de cuatro vías", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/11_cruce_cuatro_vias.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-terminal-norte", nombre: "Final de camino (norte)", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/12_terminal_norte.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-terminal-sur", nombre: "Final de camino (sur)", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/13_terminal_sur.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: false, estiloIcono: "isometrico" },
  { id: "sendero-tierra-extra-cruce-peatonal-de-tierra", nombre: "Cruce peatonal de tierra", categoria: "senderos-tierra", icono: "/symbols/Senderos de tierra colorada/14_cruce_peatonal_tierra.png", prefijo: "SDT", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
