import type { DefinicionSimbolo } from "@/types/symbol";

/**
 * Diámetro de copa aproximado (m). Se usa como ancho/alto por defecto para
 * evitar que un árbol interfiera con stands o caminos — PRD §11.8.
 */
export const VEGETACION: DefinicionSimbolo[] = [
  { id: "planta-ornamental", nombre: "Planta ornamental", categoria: "vegetacion", icono: "/symbols/vegetacion/planta.svg", prefijo: "PL", defaultWidth: 0.5, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: true },
  { id: "arbusto", nombre: "Arbusto", categoria: "vegetacion", icono: "/symbols/vegetacion/arbusto.svg", prefijo: "AR", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true },
  { id: "cantero", nombre: "Cantero", categoria: "vegetacion", icono: "/symbols/vegetacion/cantero.svg", prefijo: "CN", defaultWidth: 2, defaultHeight: 1, unit: "m", rotatable: true, resizable: true },
  { id: "palmera", nombre: "Palmera", categoria: "vegetacion", icono: "/symbols/vegetacion/palmera.svg", prefijo: "PA", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-pequeno", nombre: "Árbol pequeño", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-pequeno.svg", prefijo: "AP", defaultWidth: 2.5, defaultHeight: 2.5, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-mediano", nombre: "Árbol mediano", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-mediano.svg", prefijo: "AM", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-grande", nombre: "Árbol grande", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-grande.svg", prefijo: "AG", defaultWidth: 6, defaultHeight: 6, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-frondoso", nombre: "Árbol frondoso", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-grande.svg", prefijo: "AF", defaultWidth: 8, defaultHeight: 8, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-nativo", nombre: "Árbol nativo", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-mediano.svg", prefijo: "AN", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-existente", nombre: "Árbol existente", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-mediano.svg", prefijo: "AE", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true },
  { id: "arbol-conservar", nombre: "Árbol a conservar", categoria: "vegetacion", icono: "/symbols/vegetacion/arbol-mediano.svg", prefijo: "AC", defaultWidth: 4, defaultHeight: 4, unit: "m", rotatable: false, resizable: true },
  { id: "area-verde", nombre: "Área verde", categoria: "vegetacion", icono: "/symbols/vegetacion/cantero.svg", prefijo: "AV", defaultWidth: 5, defaultHeight: 5, unit: "m", rotatable: true, resizable: true },
  { id: "cesped", nombre: "Césped", categoria: "vegetacion", icono: "/symbols/vegetacion/cantero.svg", prefijo: "CE", defaultWidth: 5, defaultHeight: 5, unit: "m", rotatable: true, resizable: true },
  { id: "jardin", nombre: "Jardín", categoria: "vegetacion", icono: "/symbols/vegetacion/cantero.svg", prefijo: "JA", defaultWidth: 3, defaultHeight: 3, unit: "m", rotatable: true, resizable: true },
];
