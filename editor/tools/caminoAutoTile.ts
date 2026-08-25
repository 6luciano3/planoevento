import type { Punto } from "@/types/location";

/** Metros por celda de grilla — visualmente ajustable, no hay medida real declarada. */
export const TILE_M = 4;

/** Las 3 familias de piezas que comparten el mismo vocabulario direccional (recta/curva/T/cruce/terminal). */
export const FAMILIAS_CAMINO: { prefijo: string; nombre: string }[] = [
  { prefijo: "sendero-tierra", nombre: "Sendero de tierra" },
  { prefijo: "camino-pavimentado", nombre: "Camino pavimentado" },
  { prefijo: "calle-vehicular", nombre: "Calle vehicular" },
];

type Direccion = "norte" | "este" | "sur" | "oeste";

interface CeldaGrilla {
  col: number;
  fila: number;
}

/**
 * Arma la secuencia de piezas (recta/curva/T/cruce/terminal) que forman un
 * camino continuo a partir de los puntos que el usuario clickeó con la
 * herramienta "Camino" — HU-ORG-21 extendida a senderos/calles.
 *
 * Modelo: cada pieza ocupa una celda cuadrada de `tileM` metros (aunque el
 * PNG de la pieza "recta" se vea más ancho que el de una curva, todas
 * comparten el mismo lienzo 1536×1024 — puesta en una celda de 1×1 se ve
 * perfectamente bien, el sendero cruza el tile de borde a borde).
 *
 * Límites conocidos, aceptados a propósito:
 * - No existe pieza `terminal-este`/`terminal-oeste` en los sets de assets
 *   (solo terminal-norte/terminal-sur) — un camino que termina yendo
 *   este-oeste cae a una pieza `recta-este-oeste` en vez de angostarse.
 * - Solo mira las celdas de ESTE trazo — no detecta piezas de un camino ya
 *   colocado en un uso anterior de la herramienta (sin memoria entre usos).
 * - Un trazo que se cruza a sí mismo puede dar una pieza incorrecta en el
 *   cruce (no se maneja como caso especial).
 */
export function calcularPiezasCamino(
  puntosClic: Punto[],
  prefijoFamilia: string,
  tileM: number
): { simboloId: string; posicion: Punto }[] {
  const ajustados = puntosClic.map((p) => ajustarAGrilla(p, tileM));
  const sinRepetidos = quitarConsecutivosIguales(ajustados);
  if (sinRepetidos.length < 2) return [];

  const ortogonal = insertarCodos(sinRepetidos);
  const celdas = recorrerCeldas(ortogonal, tileM);
  if (celdas.length === 0) return [];

  return celdas.map((celda, indice) => {
    const conexiones = new Set<Direccion>();
    if (indice > 0) conexiones.add(direccionHacia(celda, celdas[indice - 1]));
    if (indice < celdas.length - 1) conexiones.add(direccionHacia(celda, celdas[indice + 1]));

    const tipoPieza = elegirTipoPieza(conexiones);
    return {
      simboloId: `${prefijoFamilia}-${tipoPieza}`,
      posicion: { x: celda.col * tileM, y: celda.fila * tileM },
    };
  });
}

function ajustarAGrilla(punto: Punto, tileM: number): Punto {
  return { x: Math.round(punto.x / tileM) * tileM, y: Math.round(punto.y / tileM) * tileM };
}

function quitarConsecutivosIguales(puntos: Punto[]): Punto[] {
  return puntos.filter((p, i) => i === 0 || p.x !== puntos[i - 1].x || p.y !== puntos[i - 1].y);
}

/** Entre dos puntos no alineados en un eje, inserta un codo horizontal-primero — el trazo final es siempre ortogonal. */
function insertarCodos(puntos: Punto[]): Punto[] {
  const resultado: Punto[] = [puntos[0]];
  for (let i = 1; i < puntos.length; i++) {
    const anterior = resultado[resultado.length - 1];
    const actual = puntos[i];
    if (anterior.x !== actual.x && anterior.y !== actual.y) {
      resultado.push({ x: actual.x, y: anterior.y });
    }
    resultado.push(actual);
  }
  return quitarConsecutivosIguales(resultado);
}

/** Camina el trazo ortogonal celda por celda (paso `tileM`), sin repetir la celda de arranque de cada segmento. */
function recorrerCeldas(puntosOrtogonales: Punto[], tileM: number): CeldaGrilla[] {
  const celdas: CeldaGrilla[] = [aCelda(puntosOrtogonales[0], tileM)];
  for (let i = 1; i < puntosOrtogonales.length; i++) {
    const desde = puntosOrtogonales[i - 1];
    const hasta = puntosOrtogonales[i];
    const pasosX = Math.round((hasta.x - desde.x) / tileM);
    const pasosY = Math.round((hasta.y - desde.y) / tileM);
    const pasos = Math.abs(pasosX) + Math.abs(pasosY);
    const dirX = Math.sign(pasosX);
    const dirY = Math.sign(pasosY);
    for (let paso = 1; paso <= pasos; paso++) {
      const anterior = celdas[celdas.length - 1];
      celdas.push({ col: anterior.col + dirX, fila: anterior.fila + dirY });
    }
  }
  return celdas;
}

function aCelda(punto: Punto, tileM: number): CeldaGrilla {
  return { col: Math.round(punto.x / tileM), fila: Math.round(punto.y / tileM) };
}

function direccionHacia(desde: CeldaGrilla, hasta: CeldaGrilla): Direccion {
  if (hasta.fila < desde.fila) return "norte";
  if (hasta.fila > desde.fila) return "sur";
  if (hasta.col < desde.col) return "oeste";
  return "este";
}

const OPUESTA: Record<Direccion, Direccion> = { norte: "sur", sur: "norte", este: "oeste", oeste: "este" };
const TODAS: Direccion[] = ["norte", "este", "sur", "oeste"];

function elegirTipoPieza(conexiones: Set<Direccion>): string {
  if (conexiones.size === 4) return "cruce";

  if (conexiones.size === 3) {
    const faltante = TODAS.find((d) => !conexiones.has(d))!;
    return `t-sin-${faltante}`;
  }

  if (conexiones.size === 2) {
    const [a, b] = [...conexiones];
    if (OPUESTA[a] === b) {
      return a === "norte" || a === "sur" ? "recta-norte-sur" : "recta-este-oeste";
    }
    return nombreCurva(a, b);
  }

  // size === 1: terminal — solo hay pieza para norte/sur, este/oeste cae a recta.
  const [unica] = [...conexiones];
  if (unica === "norte" || unica === "sur") return `terminal-${unica}`;
  return "recta-este-oeste";
}

/** Las 4 combinaciones adyacentes posibles ya cubren exactamente los 4 assets de curva existentes. */
function nombreCurva(a: Direccion, b: Direccion): string {
  const par = new Set([a, b]);
  if (par.has("norte") && par.has("este")) return "curva-norte-este";
  if (par.has("este") && par.has("sur")) return "curva-este-sur";
  if (par.has("sur") && par.has("oeste")) return "curva-sur-oeste";
  return "curva-oeste-norte";
}
