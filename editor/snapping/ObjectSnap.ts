import type { ObjetoPlano } from "@/types/editor";
import type { Punto } from "@/types/location";

const TOLERANCIA_M = 0.3;

/** Si el punto cae cerca del borde de otro objeto, lo alinea a ese borde. */
export function aplicarObjectSnap(punto: Punto, objetos: ObjetoPlano[], excluirId?: string): Punto {
  let resultado = punto;
  for (const o of objetos) {
    if (o.id === excluirId) continue;
    if (Math.abs(o.posicion.x - punto.x) < TOLERANCIA_M) resultado = { ...resultado, x: o.posicion.x };
    if (Math.abs(o.posicion.y - punto.y) < TOLERANCIA_M) resultado = { ...resultado, y: o.posicion.y };
  }
  return resultado;
}
