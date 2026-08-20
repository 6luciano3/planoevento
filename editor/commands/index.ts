import type { ObjetoPlano } from "@/types/editor";

/**
 * Comandos como funciones puras "objetos anteriores -> objetos nuevos".
 * store/history-store.ts guarda el snapshot anterior antes de aplicarlos,
 * lo que le da deshacer/rehacer a cualquier comando sin código extra.
 */

export function comandoMover(objetos: ObjetoPlano[], id: string, dx: number, dy: number): ObjetoPlano[] {
  return objetos.map((o) =>
    o.id === id ? { ...o, posicion: { x: o.posicion.x + dx, y: o.posicion.y + dy } } : o
  );
}

export function comandoRotar(objetos: ObjetoPlano[], id: string, deltaGrados: number): ObjetoPlano[] {
  return objetos.map((o) =>
    o.id === id ? { ...o, rotacionGrados: (o.rotacionGrados + deltaGrados + 360) % 360 } : o
  );
}

export function comandoRedimensionar(
  objetos: ObjetoPlano[],
  id: string,
  anchoM: number,
  largoM: number
): ObjetoPlano[] {
  return objetos.map((o) => (o.id === id ? { ...o, anchoM, largoM } : o));
}

export function comandoEliminar(objetos: ObjetoPlano[], id: string): ObjetoPlano[] {
  return objetos.filter((o) => o.id !== id);
}
