import { EDITOR_CONFIG } from "@/config/editor.config";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";
import type { Punto } from "@/types/location";
import type { ObjetoPlano } from "@/types/editor";

/**
 * Proyección isométrica dimétrica 2:1 del plano — convierte las mismas
 * coordenadas lógicas en metros que usa el modo plano (`scale.ts`) en
 * posiciones de pantalla con profundidad, sin tocar el modelo de datos:
 * `posicion`/`anchoM`/`largoM` siguen siendo x/y/ancho/alto en metros,
 * solo cambia cómo se dibujan.
 *
 * Constante de escala: no hay un tamaño real de módulo declarado en los
 * README de los assets isométricos nuevos, así que se deriva de
 * `pixelsPerMeter` para que la densidad visual a zoom 100% se sienta
 * parecida al modo plano — es un valor ajustable a ojo, no una medida real.
 */
const TILE_WIDTH_BASE_PX = EDITOR_CONFIG.pixelsPerMeter * 2; // 48

/** Espacio mínimo arriba del lienzo para sprites chicos (pérgolas, árboles) — el real se calcula con `calcularPaddingSuperior`. */
export const ISO_VERTICAL_PADDING_MINIMO_PX = 260;
const MARGEN_SPRITE_PX = 40;

export interface ConfigIsometrica {
  anchoPredioM: number;
  altoPredioM: number;
  zoom: number;
  /** Espacio arriba del lienzo para que los sprites más altos no se corten — ver `calcularPaddingSuperior`. */
  paddingSuperiorPx?: number;
}

function coeficientes(zoom: number) {
  return {
    kx: (TILE_WIDTH_BASE_PX / 2) * zoom,
    ky: (TILE_WIDTH_BASE_PX / 4) * zoom,
  };
}

function origen(cfg: ConfigIsometrica) {
  const { kx } = coeficientes(cfg.zoom);
  return { origenX: cfg.altoPredioM * kx, origenY: cfg.paddingSuperiorPx ?? ISO_VERTICAL_PADDING_MINIMO_PX };
}

/**
 * Cuánto espacio hace falta arriba del lienzo para que el sprite isométrico
 * más alto entre los objetos colocados no se corte — los stands grandes
 * (pabellones de hasta 12×9m) necesitan mucho más que un banco o un árbol.
 * Objetos sin definición isométrica (planos, sin `simboloId`) no aportan.
 */
export function calcularPaddingSuperior(objetos: ObjetoPlano[], zoom: number): number {
  const { kx } = coeficientes(zoom);
  let maxAlturaPx = 0;
  for (const objeto of objetos) {
    if (objeto.tipo !== "simbolo" || !objeto.simboloId) continue;
    const def = obtenerSimbolo(objeto.simboloId);
    if (def?.estiloIcono !== "isometrico") continue;
    const aspecto = def.aspectoIcono ?? ISO_ASPECT_DEFECTO;
    const anchoPx = (objeto.anchoM + objeto.largoM) * kx;
    const altoPx = anchoPx / aspecto;
    if (altoPx > maxAlturaPx) maxAlturaPx = altoPx;
  }
  return Math.max(ISO_VERTICAL_PADDING_MINIMO_PX, maxAlturaPx + MARGEN_SPRITE_PX);
}

const ISO_ASPECT_DEFECTO = 1536 / 1024;

/** Punto lógico (metros) → posición de pantalla (px), con el origen desplazado para que nada quede fuera del lienzo. */
export function metrosAIsometrico(punto: Punto, cfg: ConfigIsometrica): Punto {
  const { kx, ky } = coeficientes(cfg.zoom);
  const { origenX, origenY } = origen(cfg);
  return {
    x: (punto.x - punto.y) * kx + origenX,
    y: (punto.x + punto.y) * ky + origenY,
  };
}

/** Inversa exacta de `metrosAIsometrico` — posición de pantalla (px) → punto lógico (metros). */
export function isometricoAMetros(puntoPx: Punto, cfg: ConfigIsometrica): Punto {
  const { kx, ky } = coeficientes(cfg.zoom);
  const { origenX, origenY } = origen(cfg);
  const a = (puntoPx.x - origenX) / kx; // x - y
  const b = (puntoPx.y - origenY) / ky; // x + y
  return { x: (a + b) / 2, y: (b - a) / 2 };
}

/** Tamaño del lienzo SVG que contiene todo el predio proyectado. */
export function dimensionesLienzoIsometrico(cfg: ConfigIsometrica): { anchoPx: number; altoPx: number } {
  const { kx, ky } = coeficientes(cfg.zoom);
  return {
    anchoPx: (cfg.anchoPredioM + cfg.altoPredioM) * kx,
    altoPx: (cfg.anchoPredioM + cfg.altoPredioM) * ky + (cfg.paddingSuperiorPx ?? ISO_VERTICAL_PADDING_MINIMO_PX),
  };
}

/** Matriz 2×2 (a,b,c,d) de la parte lineal de la proyección — para transformar formas (ej. un círculo → elipse) sin traducir. */
export function matrizLineal(zoom: number): { a: number; b: number; c: number; d: number } {
  const { kx, ky } = coeficientes(zoom);
  return { a: kx, b: ky, c: -kx, d: ky };
}

function centroFigura(objeto: ObjetoPlano): Punto {
  return { x: objeto.posicion.x + objeto.anchoM / 2, y: objeto.posicion.y + objeto.largoM / 2 };
}

/** Rota un punto (metros) alrededor de un centro (metros), en el mismo sentido que `rotate()` de SVG. */
function puntoRotado(punto: Punto, centro: Punto, grados: number): Punto {
  if (grados === 0) return punto;
  const rad = (grados * Math.PI) / 180;
  const dx = punto.x - centro.x;
  const dy = punto.y - centro.y;
  return {
    x: centro.x + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: centro.y + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

/** Clave de profundidad para el orden pintor — más "atrás" (x+y chico) se dibuja primero. */
export function claveProfundidad(objeto: ObjetoPlano): number {
  const c = centroFigura(objeto);
  return c.x + c.y;
}

/** Comparador estable para ordenar `proyecto.objetos` antes de dibujarlos (orden pintor). */
export function compararProfundidad(a: ObjetoPlano, b: ObjetoPlano): number {
  const diff = claveProfundidad(a) - claveProfundidad(b);
  if (diff !== 0) return diff;
  const cA = centroFigura(a);
  const cB = centroFigura(b);
  if (cA.y !== cB.y) return cA.y - cB.y;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** Proyecta cada vértice de una lista de puntos lógicos (metros) a píxeles. */
export function puntosProyectadosPoligono(puntosM: Punto[], cfg: ConfigIsometrica): Punto[] {
  return puntosM.map((p) => metrosAIsometrico(p, cfg));
}

/** Las 4 esquinas de un objeto rectangular (posicion/anchoM/largoM), rotadas y proyectadas — se ve como un paralelogramo. */
export function cajaProyectada(objeto: ObjetoPlano, cfg: ConfigIsometrica): Punto[] {
  const { x, y } = objeto.posicion;
  const centro = centroFigura(objeto);
  const esquinasM: Punto[] = [
    { x, y },
    { x: x + objeto.anchoM, y },
    { x: x + objeto.anchoM, y: y + objeto.largoM },
    { x, y: y + objeto.largoM },
  ].map((p) => puntoRotado(p, centro, objeto.rotacionGrados));
  return puntosProyectadosPoligono(esquinasM, cfg);
}

/**
 * Vértices absolutos (metros, ya proyectados) de una línea/polilínea/polígono
 * — `objeto.puntos` está relativo a `posicion` (el primero siempre {0,0}) y
 * puede llevar rotación propia, igual que un rectángulo.
 */
export function puntosFiguraProyectada(objeto: ObjetoPlano, cfg: ConfigIsometrica): Punto[] {
  const centroLocal = { x: objeto.anchoM / 2, y: objeto.largoM / 2 };
  const puntosM = (objeto.puntos ?? []).map((p) => {
    const absoluto = { x: objeto.posicion.x + p.x, y: objeto.posicion.y + p.y };
    const centroAbsoluto = { x: objeto.posicion.x + centroLocal.x, y: objeto.posicion.y + centroLocal.y };
    return puntoRotado(absoluto, centroAbsoluto, objeto.rotacionGrados);
  });
  return puntosProyectadosPoligono(puntosM, cfg);
}

/** Ancla proyectada (centro-inferior) y tamaño en px para dibujar un sprite isométrico. */
export function centroYEscalaSimbolo(
  objeto: ObjetoPlano,
  cfg: ConfigIsometrica
): { anchorXPx: number; anchorYPx: number; displayWidthPx: number } {
  const centro = centroFigura(objeto);
  const { x: anchorXPx, y: anchorYPx } = metrosAIsometrico(centro, cfg);
  const { kx } = coeficientes(cfg.zoom);
  // Ancho del rombo de base (misma fórmula que el ancho total del lienzo,
  // aplicada a la huella del objeto en vez de al predio entero).
  const displayWidthPx = (objeto.anchoM + objeto.largoM) * kx;
  return { anchorXPx, anchorYPx, displayWidthPx };
}
