import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA_ISO = "/symbols/arboles";

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

  // Colección 12 "Vegetación y paisajismo de Misiones" — isométricos, se suman
  // a los SVG planos de arriba (no los reemplazan, para no romper proyectos guardados).
  { id: "lapacho-rosado", nombre: "Lapacho rosado", categoria: "vegetacion", icono: `${CARPETA_ISO}/01_lapacho_rosado.png`, prefijo: "AI", defaultWidth: 5, defaultHeight: 5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "lapacho-amarillo", nombre: "Lapacho amarillo", categoria: "vegetacion", icono: `${CARPETA_ISO}/02_lapacho_amarillo.png`, prefijo: "AI", defaultWidth: 5, defaultHeight: 5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "araucaria-parana", nombre: "Araucaria paranaense", categoria: "vegetacion", icono: `${CARPETA_ISO}/03_araucaria_parana.png`, prefijo: "AI", defaultWidth: 6, defaultHeight: 6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "palmera-pindo-iso", nombre: "Palmera pindó", categoria: "vegetacion", icono: `${CARPETA_ISO}/04_palmera_pindo.png`, prefijo: "AI", defaultWidth: 3.5, defaultHeight: 3.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "yerba-mate-planta", nombre: "Planta de yerba mate", categoria: "vegetacion", icono: `${CARPETA_ISO}/05_planta_yerba_mate.png`, prefijo: "AI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "helechos-conjunto", nombre: "Conjunto de helechos", categoria: "vegetacion", icono: `${CARPETA_ISO}/06_conjunto_helechos.png`, prefijo: "AI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "monsteras-filodendros", nombre: "Monsteras y filodendros", categoria: "vegetacion", icono: `${CARPETA_ISO}/07_monsteras_filodendros.png`, prefijo: "AI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "bromelias-conjunto", nombre: "Conjunto de bromelias", categoria: "vegetacion", icono: `${CARPETA_ISO}/08_conjunto_bromelias.png`, prefijo: "AI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "tacuaral", nombre: "Tacuaral", categoria: "vegetacion", icono: `${CARPETA_ISO}/09_tacuaral.png`, prefijo: "AI", defaultWidth: 4, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "arbol-nativo-sombra", nombre: "Árbol nativo de sombra", categoria: "vegetacion", icono: `${CARPETA_ISO}/10_arbol_nativo_sombra.png`, prefijo: "AI", defaultWidth: 5, defaultHeight: 5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "cerco-vivo-recto", nombre: "Cerco vivo recto", categoria: "vegetacion", icono: `${CARPETA_ISO}/11_cerco_vivo_recto.png`, prefijo: "AI", defaultWidth: 2, defaultHeight: 0.6, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
  { id: "cerco-vivo-esquina", nombre: "Cerco vivo esquina", categoria: "vegetacion", icono: `${CARPETA_ISO}/12_cerco_vivo_esquina.png`, prefijo: "AI", defaultWidth: 1.2, defaultHeight: 1.2, unit: "m", rotatable: true, resizable: true, estiloIcono: "isometrico" },
  { id: "pastos-ornamentales", nombre: "Pastos ornamentales", categoria: "vegetacion", icono: `${CARPETA_ISO}/13_pastos_ornamentales.png`, prefijo: "AI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "azaleas", nombre: "Arbusto de azaleas", categoria: "vegetacion", icono: `${CARPETA_ISO}/14_arbusto_azaleas.png`, prefijo: "AI", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "arboleda-tres", nombre: "Arboleda de tres árboles", categoria: "vegetacion", icono: `${CARPETA_ISO}/15_arboleda_tres_arboles.png`, prefijo: "AI", defaultWidth: 8, defaultHeight: 6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
