import type { Punto } from "@/types/location";

export function distanciaEntrePuntos(a: Punto, b: Punto): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function puntoMedio(a: Punto, b: Punto): Punto {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Ajusta un punto a la cuadrícula (en metros) si "activo" está habilitado. */
export function ajustarACuadricula(punto: Punto, pasoM: number, activo: boolean): Punto {
  if (!activo || pasoM <= 0) return punto;
  return {
    x: Math.round(punto.x / pasoM) * pasoM,
    y: Math.round(punto.y / pasoM) * pasoM,
  };
}

/** Superficie de un polígono simple (fórmula del área de Gauss / shoelace), en las unidades de los puntos. */
export function areaPoligono(puntos: Punto[]): number {
  if (puntos.length < 3) return 0;
  let suma = 0;
  for (let i = 0; i < puntos.length; i++) {
    const actual = puntos[i];
    const siguiente = puntos[(i + 1) % puntos.length];
    suma += actual.x * siguiente.y - siguiente.x * actual.y;
  }
  return Math.abs(suma) / 2;
}
