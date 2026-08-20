import type { DefinicionSimbolo } from "@/types/symbol";

export const AGUA_GAS: DefinicionSimbolo[] = [
  { id: "punto-agua", nombre: "Punto de agua", categoria: "agua-gas", icono: "/symbols/agua-gas/punto-agua.svg", prefijo: "AG", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
  { id: "punto-gas", nombre: "Punto de gas", categoria: "agua-gas", icono: "/symbols/agua-gas/punto-gas.svg", prefijo: "PG", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
];
