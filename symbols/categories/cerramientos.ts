import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA = "/symbols/Cerramientos y accesos del predio";

/**
 * Cercos, esquinas, portones y accesos del predio — arrastre manual (a
 * diferencia de senderos/caminos/calles, no tienen herramienta de
 * autoconexión: un solo empalme en T genérico no alcanza para orientarse
 * en las 4 direcciones sin rotar la imagen). La carpeta trae cada pieza
 * duplicada bajo dos nombres de archivo — se usa la que coincide con el
 * README.md de la colección, se ignora la otra.
 */
export const CERRAMIENTOS: DefinicionSimbolo[] = [
  { id: "cerco-recto-norte-sur", nombre: "Cerco recto norte-sur", categoria: "cerramientos", icono: `${CARPETA}/01_cerco_recto_norte_sur.png`, prefijo: "CR", defaultWidth: 2, defaultHeight: 0.4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "cerco-recto-este-oeste", nombre: "Cerco recto este-oeste", categoria: "cerramientos", icono: `${CARPETA}/02_cerco_recto_este_oeste.png`, prefijo: "CR", defaultWidth: 2, defaultHeight: 0.4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "esquina-cerco-norte-este", nombre: "Esquina de cerco norte-este", categoria: "cerramientos", icono: `${CARPETA}/03_esquina_norte_este.png`, prefijo: "CR", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "esquina-cerco-este-sur", nombre: "Esquina de cerco este-sur", categoria: "cerramientos", icono: `${CARPETA}/04_esquina_este_sur.png`, prefijo: "CR", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "esquina-cerco-sur-oeste", nombre: "Esquina de cerco sur-oeste", categoria: "cerramientos", icono: `${CARPETA}/05_esquina_sur_oeste.png`, prefijo: "CR", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "esquina-cerco-oeste-norte", nombre: "Esquina de cerco oeste-norte", categoria: "cerramientos", icono: `${CARPETA}/06_esquina_oeste_norte.png`, prefijo: "CR", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "union-cerco-t", nombre: "Unión de cerco en T", categoria: "cerramientos", icono: `${CARPETA}/07_union_cerco_t.png`, prefijo: "CR", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "cruce-cercos-cuatro-direcciones", nombre: "Cruce de cercos en cuatro direcciones", categoria: "cerramientos", icono: `${CARPETA}/08_cruce_cercos_cuatro_direcciones.png`, prefijo: "CR", defaultWidth: 1.5, defaultHeight: 1.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "porton-vehicular-simple", nombre: "Portón vehicular simple", categoria: "cerramientos", icono: `${CARPETA}/09_porton_vehicular_simple.png`, prefijo: "PV", defaultWidth: 3, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "porton-vehicular-doble", nombre: "Portón vehicular doble", categoria: "cerramientos", icono: `${CARPETA}/10_porton_vehicular_doble.png`, prefijo: "PV", defaultWidth: 4, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "acceso-peatonal-controlado", nombre: "Acceso peatonal controlado", categoria: "cerramientos", icono: `${CARPETA}/11_acceso_peatonal_controlado.png`, prefijo: "AP", defaultWidth: 1.5, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "entrada-principal-portico", nombre: "Entrada principal con pórtico", categoria: "cerramientos", icono: `${CARPETA}/12_entrada_principal_portico.png`, prefijo: "EN", defaultWidth: 5, defaultHeight: 3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "entrada-secundaria-cerco", nombre: "Entrada secundaria", categoria: "cerramientos", icono: `${CARPETA}/13_entrada_secundaria.png`, prefijo: "EN", defaultWidth: 3, defaultHeight: 2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "salida-emergencia-cerco", nombre: "Salida de emergencia", categoria: "cerramientos", icono: `${CARPETA}/14_salida_emergencia.png`, prefijo: "SE", defaultWidth: 2, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },

  // Piezas extra de la carpeta, sin equivalente en el README de la colección.
  { id: "porton-peatonal-simple", nombre: "Portón peatonal simple", categoria: "cerramientos", icono: `${CARPETA}/07_porton_peatonal_simple.png`, prefijo: "PP", defaultWidth: 1.2, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "porton-peatonal-doble", nombre: "Portón peatonal doble", categoria: "cerramientos", icono: `${CARPETA}/08_porton_peatonal_doble.png`, prefijo: "PP", defaultWidth: 2, defaultHeight: 0.5, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "porton-vehicular-corredizo", nombre: "Portón vehicular corredizo", categoria: "cerramientos", icono: `${CARPETA}/09_porton_vehicular_corredizo.png`, prefijo: "PV", defaultWidth: 3.5, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "porton-vehicular-doble-hoja", nombre: "Portón vehicular doble hoja", categoria: "cerramientos", icono: `${CARPETA}/10_porton_vehicular_doble_hoja.png`, prefijo: "PV", defaultWidth: 4, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "valla-temporal-recta", nombre: "Valla temporal recta", categoria: "cerramientos", icono: `${CARPETA}/12_valla_temporal_recta.png`, prefijo: "VT", defaultWidth: 2, defaultHeight: 0.3, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "valla-temporal-esquina", nombre: "Valla temporal esquina", categoria: "cerramientos", icono: `${CARPETA}/13_valla_temporal_esquina.png`, prefijo: "VT", defaultWidth: 1, defaultHeight: 1, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "cerco-rustico-madera", nombre: "Cerco rústico de madera", categoria: "cerramientos", icono: `${CARPETA}/14_cerco_rustico_madera.png`, prefijo: "CR", defaultWidth: 2, defaultHeight: 0.4, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
