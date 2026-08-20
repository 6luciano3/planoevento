import type { DefinicionSimbolo } from "@/types/symbol";

export const INFRAESTRUCTURA: DefinicionSimbolo[] = [
  { id: "stand", nombre: "Stand", categoria: "infraestructura", icono: "/symbols/stands/stand-simple.svg", prefijo: "ST", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "carpa", nombre: "Carpa", categoria: "infraestructura", icono: "/symbols/stands/carpa.svg", prefijo: "CA", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: true, resizable: true },
  { id: "gazebo", nombre: "Gazebo", categoria: "infraestructura", icono: "/symbols/infraestructura/gazebo.svg", prefijo: "GZ", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "escenario", nombre: "Escenario", categoria: "infraestructura", icono: "/symbols/stands/escenario.svg", prefijo: "ES", defaultWidth: 8, defaultHeight: 6, unit: "m", rotatable: true, resizable: true },
  { id: "deposito", nombre: "Depósito", categoria: "infraestructura", icono: "/symbols/infraestructura/deposito.svg", prefijo: "DE", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "oficina", nombre: "Oficina", categoria: "infraestructura", icono: "/symbols/infraestructura/oficina.svg", prefijo: "OF", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "casilla", nombre: "Casilla", categoria: "infraestructura", icono: "/symbols/infraestructura/casilla.svg", prefijo: "CS", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "punto-informacion", nombre: "Punto de información", categoria: "infraestructura", icono: "/symbols/infraestructura/punto-informacion.svg", prefijo: "PI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: false },
  { id: "vestuario", nombre: "Vestuario", categoria: "infraestructura", icono: "/symbols/infraestructura/vestuario.svg", prefijo: "VE", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
  { id: "cabina-tecnica", nombre: "Cabina técnica", categoria: "infraestructura", icono: "/symbols/infraestructura/cabina-tecnica.svg", prefijo: "CT", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "torre-sonido", nombre: "Torre de sonido", categoria: "infraestructura", icono: "/symbols/infraestructura/torre-sonido.svg", prefijo: "TS", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: false },
  { id: "pantalla", nombre: "Pantalla", categoria: "infraestructura", icono: "/symbols/infraestructura/pantalla.svg", prefijo: "PA", defaultWidth: 4, defaultHeight: 0.5, unit: "m", rotatable: true, resizable: true },
  { id: "generador-electrico", nombre: "Generador eléctrico", categoria: "infraestructura", icono: "/symbols/electricidad/generador.svg", prefijo: "GE", defaultWidth: 2, defaultHeight: 1.2, unit: "m", rotatable: true, resizable: false },
];
