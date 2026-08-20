"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/store/editor-store";

/** Atajos de teclado del editor — Deshacer/Rehacer/Eliminar/Duplicar (HU-ORG-22, HU-ORG-31). */
export function useKeyboardShortcuts() {
  const deshacer = useEditorStore((s) => s.deshacer);
  const rehacer = useEditorStore((s) => s.rehacer);
  const eliminarSeleccionado = useEditorStore((s) => s.eliminarSeleccionado);
  const duplicarSeleccionado = useEditorStore((s) => s.duplicarSeleccionado);

  useEffect(() => {
    function alPresionar(event: KeyboardEvent) {
      const objetivo = event.target as HTMLElement | null;
      if (objetivo && ["INPUT", "TEXTAREA"].includes(objetivo.tagName)) return;

      const ctrl = event.ctrlKey || event.metaKey;
      if (ctrl && event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        deshacer();
      } else if (ctrl && (event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey))) {
        event.preventDefault();
        rehacer();
      } else if (ctrl && event.key.toLowerCase() === "d") {
        event.preventDefault();
        duplicarSeleccionado();
      } else if (event.key === "Delete" || event.key === "Backspace") {
        eliminarSeleccionado();
      }
    }

    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [deshacer, rehacer, eliminarSeleccionado, duplicarSeleccionado]);
}
