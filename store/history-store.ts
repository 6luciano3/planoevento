import { useEditorStore } from "./editor-store";

/**
 * El deshacer/rehacer real vive dentro de editor-store.ts (junto al estado
 * que modifica, para no duplicar la fuente de verdad). Este archivo expone
 * únicamente los selectores que la UI necesita — el botón de la barra
 * superior no necesita saber cómo funciona el HistoryManager.
 */
export function useDeshacer() {
  return useEditorStore((s) => s.deshacer);
}

export function useRehacer() {
  return useEditorStore((s) => s.rehacer);
}
