import type { DefinicionSimbolo } from "@/types/symbol";

const CARPETA = "/symbols/Personas y flujo de público";

/**
 * Figuras isométricas (Colección 13) — sin césped/plataforma propia, están
 * pensadas para apilarse sobre cualquier superficie del plano. Rotar una
 * persona ya renderizada con cámara fija no tiene sentido, así que no son
 * `rotatable`.
 */
export const PERSONAS: DefinicionSimbolo[] = [
  { id: "hombre-caminando", nombre: "Hombre caminando", categoria: "personas", icono: `${CARPETA}/01_hombre_caminando.png`, prefijo: "PS", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "mujer-caminando", nombre: "Mujer caminando", categoria: "personas", icono: `${CARPETA}/02_mujer_caminando.png`, prefijo: "PS", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "pareja-caminando", nombre: "Pareja caminando", categoria: "personas", icono: `${CARPETA}/03_pareja_caminando.png`, prefijo: "PS", defaultWidth: 1.2, defaultHeight: 0.7, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "familia-cuatro", nombre: "Familia de cuatro", categoria: "personas", icono: `${CARPETA}/04_familia_cuatro.png`, prefijo: "PS", defaultWidth: 1.6, defaultHeight: 1.0, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "adultos-mayores", nombre: "Adultos mayores", categoria: "personas", icono: `${CARPETA}/05_adultos_mayores.png`, prefijo: "PS", defaultWidth: 1.2, defaultHeight: 0.7, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "silla-ruedas-acompanante", nombre: "Silla de ruedas con acompañante", categoria: "personas", icono: `${CARPETA}/06_silla_ruedas_acompanante.png`, prefijo: "PS", defaultWidth: 1.4, defaultHeight: 0.9, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "adulto-con-nino", nombre: "Adulto con niño", categoria: "personas", icono: `${CARPETA}/07_adulto_con_nino.png`, prefijo: "PS", defaultWidth: 1.0, defaultHeight: 0.7, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "visitante-mapa", nombre: "Visitante consultando mapa", categoria: "personas", icono: `${CARPETA}/08_visitante_consultando_mapa.png`, prefijo: "PS", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "grupo-tres", nombre: "Grupo de tres conversando", categoria: "personas", icono: `${CARPETA}/09_grupo_tres_conversando.png`, prefijo: "PS", defaultWidth: 1.8, defaultHeight: 1.2, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "fila-cinco", nombre: "Fila de cinco visitantes", categoria: "personas", icono: `${CARPETA}/10_fila_cinco_visitantes.png`, prefijo: "PS", defaultWidth: 3.0, defaultHeight: 0.8, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "vendedora-artesanias", nombre: "Vendedora de artesanías", categoria: "personas", icono: `${CARPETA}/11_vendedora_artesanias.png`, prefijo: "PS", defaultWidth: 0.7, defaultHeight: 0.7, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "vendedora-gastronomica", nombre: "Vendedora gastronómica", categoria: "personas", icono: `${CARPETA}/12_vendedora_gastronomica.png`, prefijo: "PS", defaultWidth: 0.7, defaultHeight: 0.7, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "personal-organizacion", nombre: "Personal de organización", categoria: "personas", icono: `${CARPETA}/13_personal_organizacion.png`, prefijo: "PS", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "personal-seguridad", nombre: "Personal de seguridad", categoria: "personas", icono: `${CARPETA}/14_personal_seguridad.png`, prefijo: "PS", defaultWidth: 0.6, defaultHeight: 0.6, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
  { id: "grupo-ocho", nombre: "Grupo de público de ocho", categoria: "personas", icono: `${CARPETA}/15_grupo_publico_ocho.png`, prefijo: "PS", defaultWidth: 3.5, defaultHeight: 2.0, unit: "m", rotatable: false, resizable: true, estiloIcono: "isometrico" },
];
