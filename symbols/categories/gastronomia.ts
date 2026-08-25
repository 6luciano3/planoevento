import type { DefinicionSimbolo } from "@/types/symbol";

export const GASTRONOMIA: DefinicionSimbolo[] = [
  { id: "puesto-gastronomico", nombre: "Puesto gastronómico", categoria: "gastronomia", icono: "/symbols/gastronomia/puesto-gastronomico.svg", prefijo: "PG", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "food-truck", nombre: "Food truck", categoria: "gastronomia", icono: "/symbols/gastronomia/food-truck.svg", prefijo: "FT", defaultWidth: 6, defaultHeight: 2.5, unit: "m", rotatable: true, resizable: true },
  { id: "parrilla", nombre: "Parrilla", categoria: "gastronomia", icono: "/symbols/gastronomia/parrilla.svg", prefijo: "PL", defaultWidth: 2, defaultHeight: 1, unit: "m", rotatable: true, resizable: true },
  { id: "cocina", nombre: "Cocina", categoria: "gastronomia", icono: "/symbols/gastronomia/cocina.svg", prefijo: "CO", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "barra", nombre: "Barra", categoria: "gastronomia", icono: "/symbols/gastronomia/barra.svg", prefijo: "BR", defaultWidth: 3, defaultHeight: 1, unit: "m", rotatable: true, resizable: true },
  { id: "area-mesas", nombre: "Área de mesas", categoria: "gastronomia", icono: "/symbols/gastronomia/area-mesas.svg", prefijo: "MZ", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true },
  { id: "camara-frigorifica", nombre: "Cámara frigorífica", categoria: "gastronomia", icono: "/symbols/gastronomia/camara-frigorifica.svg", prefijo: "CF", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "punto-gas-cocina", nombre: "Punto de gas", categoria: "gastronomia", icono: "/symbols/agua-gas/punto-gas.svg", prefijo: "PG2", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
  { id: "punto-agua-gastro", nombre: "Punto de agua", categoria: "gastronomia", icono: "/symbols/agua-gas/punto-agua.svg", prefijo: "PA2", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
];
