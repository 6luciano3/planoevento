import type { DefinicionSimbolo } from "@/types/symbol";

export const SENALIZACION: DefinicionSimbolo[] = [
  { id: "cartel-entrada", nombre: "Cartel de entrada", categoria: "senalizacion", icono: "/symbols/senalizacion/cartel.svg", prefijo: "CE", defaultWidth: 1, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "cartel-salida", nombre: "Cartel de salida", categoria: "senalizacion", icono: "/symbols/senalizacion/cartel.svg", prefijo: "CS", defaultWidth: 1, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "cartel-informacion", nombre: "Información", categoria: "senalizacion", icono: "/symbols/senalizacion/cartel.svg", prefijo: "CI", defaultWidth: 1, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "prohibido-paso", nombre: "Prohibido el paso", categoria: "senalizacion", icono: "/symbols/senalizacion/prohibido.svg", prefijo: "PP", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: false },
  { id: "cartel-banos", nombre: "Baños", categoria: "senalizacion", icono: "/symbols/senalizacion/cartel.svg", prefijo: "CB", defaultWidth: 0.8, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "cartel-emergencias", nombre: "Emergencias", categoria: "senalizacion", icono: "/symbols/senalizacion/cartel.svg", prefijo: "CM", defaultWidth: 0.8, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "cartel-encuentro", nombre: "Punto de encuentro", categoria: "senalizacion", icono: "/symbols/emergencias/punto-encuentro.svg", prefijo: "CP", defaultWidth: 0.8, defaultHeight: 0.8, unit: "m", rotatable: false, resizable: false },
  { id: "cartel-accesibilidad", nombre: "Accesibilidad", categoria: "senalizacion", icono: "/symbols/senalizacion/accesibilidad.svg", prefijo: "CA", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: false },
  { id: "cartel-estacionamiento", nombre: "Estacionamiento", categoria: "senalizacion", icono: "/symbols/senalizacion/cartel.svg", prefijo: "CT", defaultWidth: 0.8, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "numeracion-sector", nombre: "Numeración de sectores", categoria: "senalizacion", icono: "/symbols/senalizacion/numeracion.svg", prefijo: "NS", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
  { id: "flecha-norte", nombre: "Flecha norte", categoria: "senalizacion", icono: "/symbols/senalizacion/flecha-norte.svg", prefijo: "NO", defaultWidth: 1.5, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
];
