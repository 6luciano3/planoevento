import type { DefinicionSimbolo } from "@/types/symbol";

export const ACCESOS: DefinicionSimbolo[] = [
  { id: "entrada-principal", nombre: "Entrada principal", categoria: "accesos", icono: "/symbols/accesos/entrada.svg", prefijo: "EN", defaultWidth: 2, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "entrada-secundaria", nombre: "Entrada secundaria", categoria: "accesos", icono: "/symbols/accesos/entrada.svg", prefijo: "E2", defaultWidth: 1.5, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "salida", nombre: "Salida", categoria: "accesos", icono: "/symbols/accesos/salida.svg", prefijo: "SA", defaultWidth: 2, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "salida-emergencia", nombre: "Salida de emergencia", categoria: "accesos", icono: "/symbols/accesos/salida-emergencia.svg", prefijo: "SE", defaultWidth: 1.5, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "acceso-vehicular", nombre: "Acceso vehicular", categoria: "accesos", icono: "/symbols/accesos/acceso-vehicular.svg", prefijo: "AV", defaultWidth: 4, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "acceso-peatonal", nombre: "Acceso peatonal", categoria: "accesos", icono: "/symbols/accesos/acceso-peatonal.svg", prefijo: "AP", defaultWidth: 2, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "camino-interno", nombre: "Camino interno", categoria: "accesos", icono: "/symbols/accesos/camino.svg", prefijo: "CI", defaultWidth: 3, defaultHeight: 0.3, unit: "m", rotatable: true, resizable: true },
  { id: "calle-servicio", nombre: "Calle de servicio", categoria: "accesos", icono: "/symbols/accesos/camino.svg", prefijo: "CV", defaultWidth: 4, defaultHeight: 0.3, unit: "m", rotatable: true, resizable: true },
  { id: "sendero-accesible", nombre: "Sendero accesible", categoria: "accesos", icono: "/symbols/accesos/sendero-accesible.svg", prefijo: "SD", defaultWidth: 2, defaultHeight: 0.3, unit: "m", rotatable: true, resizable: true },
  { id: "rampa", nombre: "Rampa", categoria: "accesos", icono: "/symbols/accesos/rampa.svg", prefijo: "RA", defaultWidth: 2, defaultHeight: 1.2, unit: "m", rotatable: true, resizable: true },
  { id: "escalera", nombre: "Escalera", categoria: "accesos", icono: "/symbols/accesos/escalera.svg", prefijo: "EC", defaultWidth: 1.5, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "porton", nombre: "Portón", categoria: "accesos", icono: "/symbols/accesos/porton.svg", prefijo: "PO", defaultWidth: 3, defaultHeight: 0.3, unit: "m", rotatable: true, resizable: true },
  { id: "valla", nombre: "Valla", categoria: "accesos", icono: "/symbols/accesos/valla.svg", prefijo: "VA", defaultWidth: 2, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "cerco", nombre: "Cerco", categoria: "accesos", icono: "/symbols/accesos/cerco.svg", prefijo: "CE", defaultWidth: 2, defaultHeight: 0.1, unit: "m", rotatable: true, resizable: true },
  { id: "molinete", nombre: "Molinete", categoria: "accesos", icono: "/symbols/accesos/molinete.svg", prefijo: "MO", defaultWidth: 0.8, defaultHeight: 0.8, unit: "m", rotatable: true, resizable: false },
];
