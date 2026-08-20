import type { DefinicionSimbolo } from "@/types/symbol";

export const ESTACIONAMIENTO: DefinicionSimbolo[] = [
  { id: "estacionamiento-general", nombre: "Estacionamiento general", categoria: "estacionamiento", icono: "/symbols/estacionamiento/automovil.svg", prefijo: "EG", defaultWidth: 2.5, defaultHeight: 5, unit: "m", rotatable: true, resizable: true },
  { id: "estacionamiento-accesible", nombre: "Estacionamiento accesible", categoria: "estacionamiento", icono: "/symbols/estacionamiento/accesible.svg", prefijo: "EA", defaultWidth: 3.5, defaultHeight: 5, unit: "m", rotatable: true, resizable: true },
  { id: "estacionamiento-motos", nombre: "Estacionamiento de motos", categoria: "estacionamiento", icono: "/symbols/estacionamiento/motocicleta.svg", prefijo: "EM", defaultWidth: 1, defaultHeight: 2.2, unit: "m", rotatable: true, resizable: true },
  { id: "estacionamiento-bicicletas", nombre: "Estacionamiento de bicicletas", categoria: "estacionamiento", icono: "/symbols/estacionamiento/bicicleta.svg", prefijo: "EB", defaultWidth: 0.6, defaultHeight: 1.8, unit: "m", rotatable: true, resizable: true },
  { id: "estacionamiento-proveedores", nombre: "Estacionamiento de proveedores", categoria: "estacionamiento", icono: "/symbols/estacionamiento/automovil.svg", prefijo: "EP", defaultWidth: 3, defaultHeight: 8, unit: "m", rotatable: true, resizable: true },
  { id: "estacionamiento-ambulancias", nombre: "Estacionamiento de ambulancias", categoria: "estacionamiento", icono: "/symbols/emergencias/ambulancia.svg", prefijo: "EM2", defaultWidth: 3, defaultHeight: 6, unit: "m", rotatable: true, resizable: true },
  { id: "carga-descarga", nombre: "Zona de carga y descarga", categoria: "estacionamiento", icono: "/symbols/estacionamiento/carga-descarga.svg", prefijo: "CD", defaultWidth: 4, defaultHeight: 8, unit: "m", rotatable: true, resizable: true },
];
