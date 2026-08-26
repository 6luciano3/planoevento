import type { DefinicionSimbolo } from "@/types/symbol";

export const AGUA_GAS: DefinicionSimbolo[] = [
  { id: "punto-agua", nombre: "Punto de agua", categoria: "agua-gas", icono: "/symbols/agua-gas/punto-agua.svg", prefijo: "AG", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
  { id: "punto-gas", nombre: "Punto de gas", categoria: "agua-gas", icono: "/symbols/agua-gas/punto-gas.svg", prefijo: "PG", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },

  // Colección "Iluminación, energía y servicios técnicos" — infraestructura
  // de agua isométrica, se suma a los SVG planos de arriba.
  { id: "iso-tanque-agua-elevado", nombre: "Tanque de agua elevado", categoria: "agua-gas", icono: "/symbols/Iluminación, energía y servicios técnicos/09_tanque_agua_elevado.png", prefijo: "IA", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-cisterna-agua-horizontal", nombre: "Cisterna de agua horizontal", categoria: "agua-gas", icono: "/symbols/Iluminación, energía y servicios técnicos/10_cisterna_agua_horizontal.png", prefijo: "IA", defaultWidth: 3, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-bomba-agua", nombre: "Bomba de agua", categoria: "agua-gas", icono: "/symbols/Iluminación, energía y servicios técnicos/11_bomba_de_agua.png", prefijo: "IA", defaultWidth: 1, defaultHeight: 0.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
