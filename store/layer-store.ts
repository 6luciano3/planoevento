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
