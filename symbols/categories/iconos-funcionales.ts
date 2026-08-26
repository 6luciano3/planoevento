import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA = "/symbols/iconos funcionales";
/** Estos PNG son verticales (1024×1536, cartel sobre poste), no el lienzo 1536×1024 habitual. */
const ASPECTO = 1024 / 1536;

/**
 * Carteles-pictograma sobre poste — amenities y servicios del predio,
 * arrastre manual, un objeto por ítem.
 */
export const ICONOS_FUNCIONALES: DefinicionSimbolo[] = [
  { id: "icono-accesibilidad", nombre: "Accesibilidad", categoria: "iconos-funcionales", icono: `${CARPETA}/Accesibilidad.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-agua-potable", nombre: "Agua potable", categoria: "iconos-funcionales", icono: `${CARPETA}/Agua potable.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-bomberos-funcional", nombre: "Bomberos", categoria: "iconos-funcionales", icono: `${CARPETA}/Bomberos.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-cajero-automatico", nombre: "Cajero automático", categoria: "iconos-funcionales", icono: `${CARPETA}/Cajero automático.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-lactancia", nombre: "Lactancia", categoria: "iconos-funcionales", icono: `${CARPETA}/Lactancia.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-mascotas-permitidas", nombre: "Mascotas permitidas", categoria: "iconos-funcionales", icono: `${CARPETA}/Mascotas permitidas.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-ninos-perdidos", nombre: "Niños perdidos", categoria: "iconos-funcionales", icono: `${CARPETA}/Niños perdidos.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-pago-electronico", nombre: "Pago electrónico", categoria: "iconos-funcionales", icono: `${CARPETA}/Pago electrónico.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-primeros-auxilios-funcional", nombre: "Primeros auxilios", categoria: "iconos-funcionales", icono: `${CARPETA}/Primeros auxilios.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-prohibido-fumar", nombre: "Prohibido fumar", categoria: "iconos-funcionales", icono: `${CARPETA}/Prohibido fumar.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-punto-encuentro-funcional", nombre: "Punto de encuentro", categoria: "iconos-funcionales", icono: `${CARPETA}/Punto de encuentro.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-reciclaje-funcional", nombre: "Reciclaje", categoria: "iconos-funcionales", icono: `${CARPETA}/Reciclaje.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-salida-emergencia-funcional", nombre: "Salida de emergencia", categoria: "iconos-funcionales", icono: `${CARPETA}/Salida de emergencia.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-sanitarios-accesibles", nombre: "Sanitarios accesibles", categoria: "iconos-funcionales", icono: `${CARPETA}/Sanitarios accesibles.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-sanitarios-femeninos", nombre: "Sanitarios femeninos", categoria: "iconos-funcionales", icono: `${CARPETA}/Sanitarios femeninos.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-sanitarios-masculinos", nombre: "Sanitarios masculinos", categoria: "iconos-funcionales", icono: `${CARPETA}/Sanitarios masculinos.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-seguridad-funcional", nombre: "Seguridad", categoria: "iconos-funcionales", icono: `${CARPETA}/Seguridad.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-wifi", nombre: "Wi-Fi", categoria: "iconos-funcionales", icono: `${CARPETA}/Wi‑Fi.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
  { id: "icono-informacion-funcional", nombre: "Información", categoria: "iconos-funcionales", icono: `${CARPETA}/información.png`, prefijo: "IF", defaultWidth: 1.2, defaultHeight: 1.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico", aspectoIcono: ASPECTO },
];
