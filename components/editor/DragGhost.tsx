"use client";

import { useDragStore } from "@/store/drag-store";
import { useGlobalDragListeners } from "@/hooks/useDragAndDrop";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";

/** Sigue al dedo/cursor mientras se arrastra un símbolo desde la biblioteca hasta el lienzo. */
export function DragGhost() {
  const simboloId = useDragStore((s) => s.simboloId);
  const x = useDragStore((s) => s.x);
  const y = useDragStore((s) => s.y);

  useGlobalDragListeners();

  if (!simboloId) return null;
  const def = obtenerSimbolo(simboloId);
  if (!def) return null;

  return (
    <div className="drag-ghost" style={{ left: x, top: y }}>
      {def.nombre}
    </div>
  );
}
