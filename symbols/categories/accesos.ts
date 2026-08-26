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

  // Colección "circulación y orientación" — circulación isométrica, se suma
  // a los SVG planos de arriba.
  { id: "iso-calle-interna-predio", nombre: "Calle interna del predio", categoria: "accesos", icono: "/symbols/circulación y orientación/Calle interna del predio.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-camino-peatonal-pavimentado", nombre: "Camino peatonal pavimentado", categoria: "accesos", icono: "/symbols/circulación y orientación/Camino peatonal pavimentado.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-cruce-peatonal-circulacion", nombre: "Cruce peatonal", categoria: "accesos", icono: "/symbols/circulación y orientación/Cruce peatonal.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-escalera-exterior", nombre: "Escalera exterior", categoria: "accesos", icono: "/symbols/circulación y orientación/Escalera exterior.png", prefijo: "CO", defaultWidth: 2, defaultHeight: 2.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-pasarela-accesible", nombre: "Pasarela accesible", categoria: "accesos", icono: "/symbols/circulación y orientación/Pasarela accesible.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-puente-peatonal-pequeno", nombre: "Puente peatonal pequeño", categoria: "accesos", icono: "/symbols/circulación y orientación/Puente peatonal pequeño.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-rampa-accesible", nombre: "Rampa accesible", categoria: "accesos", icono: "/symbols/circulación y orientación/Rampa accesible.png", prefijo: "CO", defaultWidth: 3, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-sendero-tierra-colorada-circulacion", nombre: "Sendero de tierra colorada", categoria: "accesos", icono: "/symbols/circulación y orientación/Sendero de tierra colorada.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "iso-zona-descanso", nombre: "Zona de descanso", categoria: "accesos", icono: "/symbols/circulación y orientación/Zona de descanso.png", prefijo: "CO", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
