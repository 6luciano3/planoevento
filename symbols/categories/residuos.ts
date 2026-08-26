import type { DefinicionSimbolo } from "@/types/symbol";

export const RESIDUOS: DefinicionSimbolo[] = [
  { id: "tacho-basura", nombre: "Tacho de basura", categoria: "residuos", icono: "/symbols/residuos/tacho-basura.svg", prefijo: "TA", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "contenedor", nombre: "Contenedor", categoria: "residuos", icono: "/symbols/residuos/contenedor.svg", prefijo: "CN", defaultWidth: 1.5, defaultHeight: 1, unit: "m", rotatable: true, resizable: true },
  { id: "punto-reciclaje", nombre: "Punto de reciclaje", categoria: "residuos", icono: "/symbols/residuos/punto-reciclaje.svg", prefijo: "PR", defaultWidth: 1, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true },
  { id: "residuos-organicos", nombre: "Residuos orgánicos", categoria: "residuos", icono: "/symbols/residuos/tacho-basura.svg", prefijo: "RO", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: false },
  { id: "residuos-reciclables", nombre: "Residuos reciclables", categoria: "residuos", icono: "/symbols/residuos/punto-reciclaje.svg", prefijo: "RC", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: false },
  { id: "residuos-peligrosos", nombre: "Residuos peligrosos", categoria: "residuos", icono: "/symbols/residuos/residuos-peligrosos.svg", prefijo: "RP", defaultWidth: 0.8, defaultHeight: 0.8, unit: "m", rotatable: true, resizable: false },
  { id: "area-limpieza", nombre: "Área de limpieza", categoria: "residuos", icono: "/symbols/residuos/area-limpieza.svg", prefijo: "AL", defaultWidth: 2, defaultHeight: 2, unit: "m", rotatable: true, resizable: true },
  { id: "iso-papelero-urbano-negro", nombre: "Papelero urbano negro", categoria: "residuos", icono: "/symbols/Iluminación, energía y servicios técnicos/01_papelero_urbano_negro.png", prefijo: "TA", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
