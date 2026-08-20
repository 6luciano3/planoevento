import { useEditorStore } from "./editor-store";
import * as projectService from "@/services/project.service";
import type { CapaPlano } from "@/types/layer";

/**
 * Selectores y acciones sobre las capas del proyecto cargado en editor-store.
 * Se mantiene como archivo aparte (en vez de sumar más acciones a
 * editor-store.ts) porque el panel de capas es una feature con su propio
 * ciclo de cambios — PRD §14.
 */

export function useCapas(): CapaPlano[] {
  return useEditorStore((s) => s.proyecto?.capas ?? []);
}

export function actualizarCapa(id: string, cambios: Partial<CapaPlano>): void {
  const { proyecto } = useEditorStore.getState();
  if (!proyecto) return;
  const capas = proyecto.capas.map((c) => (c.id === id ? { ...c, ...cambios } : c));
  const actualizado = { ...proyecto, capas };
  useEditorStore.setState({ proyecto: actualizado });
  projectService.guardarProyecto(actualizado);
}

export function alternarVisibilidad(id: string): void {
  const capa = useEditorStore.getState().proyecto?.capas.find((c) => c.id === id);
  if (!capa) return;
  actualizarCapa(id, { visible: !capa.visible });
}

export function alternarBloqueo(id: string): void {
  const capa = useEditorStore.getState().proyecto?.capas.find((c) => c.id === id);
  if (!capa || capa.esBase) return;
  actualizarCapa(id, { bloqueada: !capa.bloqueada });
}

function nuevoIdCapa(): string {
  return `capa-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function crearCapa(nombre: string): void {
  const { proyecto } = useEditorStore.getState();
  if (!proyecto || !nombre.trim()) return;
  const orden = Math.max(0, ...proyecto.capas.map((c) => c.orden)) + 1;
  const nueva = { id: nuevoIdCapa(), nombre: nombre.trim(), orden, visible: true, bloqueada: false, color: "#16A34A", transparencia: 100, incluirEnImpresion: true };
  const actualizado = { ...proyecto, capas: [...proyecto.capas, nueva] };
  useEditorStore.setState({ proyecto: actualizado });
  projectService.guardarProyecto(actualizado);
}

/** No borra una capa con objetos asignados — evita dejar objetos con una capaId huérfana. */
export function eliminarCapa(id: string): { ok: boolean; motivo?: string } {
  const { proyecto } = useEditorStore.getState();
  if (!proyecto) return { ok: false };
  const capa = proyecto.capas.find((c) => c.id === id);
  if (!capa) return { ok: false };
  if (capa.esBase) return { ok: false, motivo: "No se puede eliminar una capa base importada." };
  if (proyecto.objetos.some((o) => o.capaId === id)) {
    return { ok: false, motivo: "Esta capa tiene elementos asignados. Movelos a otra capa antes de eliminarla." };
  }
  const actualizado = { ...proyecto, capas: proyecto.capas.filter((c) => c.id !== id) };
  if (useEditorStore.getState().capaActivaId === id) useEditorStore.setState({ capaActivaId: null });
  useEditorStore.setState({ proyecto: actualizado });
  projectService.guardarProyecto(actualizado);
  return { ok: true };
}

export function ocultarTodas(): void {
  const { proyecto } = useEditorStore.getState();
  if (!proyecto) return;
  const capas = proyecto.capas.map((c) => ({ ...c, visible: false }));
  const actualizado = { ...proyecto, capas };
  useEditorStore.setState({ proyecto: actualizado });
  projectService.guardarProyecto(actualizado);
}

export function bloquearTodas(): void {
  const { proyecto } = useEditorStore.getState();
  if (!proyecto) return;
  const capas = proyecto.capas.map((c) => ({ ...c, bloqueada: true }));
  const actualizado = { ...proyecto, capas };
  useEditorStore.setState({ proyecto: actualizado });
  projectService.guardarProyecto(actualizado);
}

export function restablecerCapas(): void {
  const { proyecto } = useEditorStore.getState();
  if (!proyecto) return;
  const capas = proyecto.capas.map((c) => ({ ...c, visible: true, bloqueada: !!c.esBase, transparencia: 100, incluirEnImpresion: true }));
  const actualizado = { ...proyecto, capas };
  useEditorStore.setState({ proyecto: actualizado });
  projectService.guardarProyecto(actualizado);
}
