import type { DefinicionSimbolo } from "@/types/symbol";

export const SANITARIOS: DefinicionSimbolo[] = [
  { id: "bano-hombres", nombre: "Baño para hombres", categoria: "sanitarios", icono: "/symbols/sanitarios/bano-hombres.svg", prefijo: "BH", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "bano-mujeres", nombre: "Baño para mujeres", categoria: "sanitarios", icono: "/symbols/sanitarios/bano-mujeres.svg", prefijo: "BM", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "bano-inclusivo", nombre: "Baño inclusivo", categoria: "sanitarios", icono: "/symbols/sanitarios/bano-inclusivo.svg", prefijo: "BI", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "bano-accesible", nombre: "Baño accesible", categoria: "sanitarios", icono: "/symbols/sanitarios/bano-accesible.svg", prefijo: "BA", defaultWidth: 2.2, defaultHeight: 2.2, unit: "m", rotatable: true, resizable: true },
  { id: "bano-quimico", nombre: "Baño químico", categoria: "sanitarios", icono: "/symbols/sanitarios/bano-quimico.svg", prefijo: "BQ", defaultWidth: 1.2, defaultHeight: 1.2, unit: "m", rotatable: true, resizable: false },
  { id: "lavamanos", nombre: "Lavamanos", categoria: "sanitarios", icono: "/symbols/sanitarios/lavamanos.svg", prefijo: "LM", defaultWidth: 1, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: false },
  { id: "punto-agua-potable", nombre: "Punto de agua potable", categoria: "sanitarios", icono: "/symbols/agua-gas/punto-agua.svg", prefijo: "AP", defaultWidth: 0.8, defaultHeight: 0.8, unit: "m", rotatable: false, resizable: false },
];
