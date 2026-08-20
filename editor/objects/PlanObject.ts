import type { ObjetoPlano } from "@/types/editor";

/** Type guards por tipo de objeto del plano, usados por EditorCanvas al renderizar. */

export function esSimbolo(o: ObjetoPlano): boolean {
  return o.tipo === "simbolo";
}

export function esFiguraDibujada(o: ObjetoPlano): boolean {
  return o.tipo === "linea" || o.tipo === "rectangulo" || o.tipo === "circulo" || o.tipo === "poligono";
}

export function esTexto(o: ObjetoPlano): boolean {
  return o.tipo === "texto";
}

export function esCota(o: ObjetoPlano): boolean {
  return o.tipo === "cota";
}
