import type { ObjetoPlano, EstadoEditor } from "@/types/editor";

/**
 * Operaciones puras sobre la lista de objetos del plano. Sin estado propio:
 * las usa store/editor-store.ts para no repetir la lógica de inmutabilidad
 * en cada acción de Zustand.
 */

export function agregarObjeto(objetos: ObjetoPlano[], nuevo: ObjetoPlano): ObjetoPlano[] {
  return [...objetos, nuevo];
}

export function actualizarObjeto(
  objetos: ObjetoPlano[],
  id: string,
  cambios: Partial<ObjetoPlano>
): ObjetoPlano[] {
  return objetos.map((o) => (o.id === id ? { ...o, ...cambios } : o));
}

export function eliminarObjeto(objetos: ObjetoPlano[], id: string): ObjetoPlano[] {
  return objetos.filter((o) => o.id !== id);
}

export function duplicarObjeto(objetos: ObjetoPlano[], id: string, nuevoId: string): ObjetoPlano[] {
  const original = objetos.find((o) => o.id === id);
  if (!original) return objetos;
  const copia: ObjetoPlano = {
    ...original,
    id: nuevoId,
    posicion: { x: original.posicion.x + 1, y: original.posicion.y + 1 },
  };
  return [...objetos, copia];
}

export const ESTADO_EDITOR_INICIAL: EstadoEditor = {
  herramienta: "seleccionar",
  zoom: 1,
  mostrarCuadricula: true,
  ajustarACuadricula: true,
  seleccionId: null,
};
