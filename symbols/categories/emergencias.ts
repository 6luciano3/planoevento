import type { DefinicionSimbolo } from "@/types/symbol";

export const EMERGENCIAS: DefinicionSimbolo[] = [
  { id: "atencion-medica", nombre: "Puesto de atención médica", categoria: "emergencias", icono: "/symbols/emergencias/primeros-auxilios.svg", prefijo: "PM", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "ambulancia", nombre: "Ambulancia", categoria: "emergencias", icono: "/symbols/emergencias/ambulancia.svg", prefijo: "AM", defaultWidth: 2.5, defaultHeight: 5, unit: "m", rotatable: true, resizable: false },
  { id: "bomberos", nombre: "Bomberos", categoria: "emergencias", icono: "/symbols/emergencias/bomberos.svg", prefijo: "BO", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: false },
  { id: "matafuego", nombre: "Extintor", categoria: "emergencias", icono: "/symbols/emergencias/extintor.svg", prefijo: "MT", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
  { id: "hidrante", nombre: "Hidrante", categoria: "emergencias", icono: "/symbols/emergencias/hidrante.svg", prefijo: "HI", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: false },
  { id: "punto-evacuacion", nombre: "Punto de evacuación", categoria: "emergencias", icono: "/symbols/emergencias/punto-encuentro.svg", prefijo: "PV", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: false },
  { id: "punto-encuentro", nombre: "Punto de encuentro", categoria: "emergencias", icono: "/symbols/emergencias/punto-encuentro.svg", prefijo: "PE", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: false, resizable: false },
  { id: "ruta-evacuacion", nombre: "Ruta de evacuación", categoria: "emergencias", icono: "/symbols/emergencias/ruta-evacuacion.svg", prefijo: "RE", defaultWidth: 3, defaultHeight: 0.3, unit: "m", rotatable: true, resizable: true },
  { id: "salida-emergencia-sim", nombre: "Salida de emergencia", categoria: "emergencias", icono: "/symbols/accesos/salida-emergencia.svg", prefijo: "SE", defaultWidth: 1.5, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "puesto-seguridad", nombre: "Puesto de seguridad", categoria: "emergencias", icono: "/symbols/emergencias/puesto-seguridad.svg", prefijo: "PS", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: true, resizable: true },
  { id: "camara-seguridad", nombre: "Cámara de seguridad", categoria: "emergencias", icono: "/symbols/emergencias/camara.svg", prefijo: "CM", defaultWidth: 0.4, defaultHeight: 0.4, unit: "m", rotatable: true, resizable: false },
  { id: "iluminacion-emergencia", nombre: "Iluminación de emergencia", categoria: "emergencias", icono: "/symbols/emergencias/iluminacion.svg", prefijo: "IE", defaultWidth: 0.4, defaultHeight: 0.4, unit: "m", rotatable: false, resizable: false },
];
