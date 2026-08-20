import type { DefinicionSimbolo } from "@/types/symbol";

export const ELECTRICIDAD: DefinicionSimbolo[] = [
  { id: "generador", nombre: "Generador eléctrico", categoria: "electricidad", icono: "/symbols/electricidad/generador.svg", prefijo: "GE", defaultWidth: 2, defaultHeight: 1.2, unit: "m", rotatable: true, resizable: false },
  { id: "toma-corriente", nombre: "Toma de corriente", categoria: "electricidad", icono: "/symbols/electricidad/toma.svg", prefijo: "TC", defaultWidth: 0.3, defaultHeight: 0.3, unit: "m", rotatable: false, resizable: false },
  { id: "tablero-electrico", nombre: "Tablero eléctrico", categoria: "electricidad", icono: "/symbols/electricidad/tablero.svg", prefijo: "TE", defaultWidth: 0.6, defaultHeight: 0.4, unit: "m", rotatable: true, resizable: false },
];
