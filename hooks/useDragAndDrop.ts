"use client";

import { useCallback, useEffect, type PointerEvent as ReactPointerEvent } from "react";
import { useDragStore } from "@/store/drag-store";
import { useEditorStore } from "@/store/editor-store";
import { isometricoAMetros } from "@/editor/geometry/isometric";
import { aplicarGridSnap } from "@/editor/snapping/GridSnap";

const ANCHO_PREDIO_M = 60;
const ALTO_PREDIO_M = 40;

/**
 * Arrastrar un símbolo de la biblioteca y soltarlo en el lienzo — HU-ORG-21,
 * la historia de usuario central del producto. Basado en Pointer Events (no
 * en la API nativa de HTML5 Drag and Drop) para que funcione igual con
 * mouse, lápiz y dedo — el drag-and-drop de HTML5 no dispara en touch en
 * los navegadores móviles reales.
 */
export function useDragAndDrop() {
  const iniciar = useDragStore((s) => s.iniciar);

  const iniciarArrastre = useCallback(
    (event: ReactPointerEvent<HTMLElement>, simboloId: string) => {
      iniciar(simboloId, event.clientX, event.clientY);
    },
    [iniciar]
  );

  return { iniciarArrastre };
}

/**
 * Sigue el arrastre en toda la ventana mientras haya un símbolo activo en
 * useDragStore — se monta una sola vez (junto a <DragGhost />). No depende
 * de que el botón de origen mantenga la captura del puntero, así que el
 * arrastre sigue funcionando aunque el dedo/cursor salga de sus límites.
 */
export function useGlobalDragListeners() {
  const simboloId = useDragStore((s) => s.simboloId);
  const mover = useDragStore((s) => s.mover);
  const terminar = useDragStore((s) => s.terminar);

  useEffect(() => {
    if (simboloId === null) return;

    function alMover(event: PointerEvent) {
      mover(event.clientX, event.clientY);
    }
    function alSoltar(event: PointerEvent) {
      soltarEnPunto(simboloId as string, event.clientX, event.clientY);
      terminar();
    }
    function alCancelar() {
      terminar();
    }

    window.addEventListener("pointermove", alMover);
    window.addEventListener("pointerup", alSoltar);
    window.addEventListener("pointercancel", alCancelar);
    return () => {
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("pointerup", alSoltar);
      window.removeEventListener("pointercancel", alCancelar);
    };
  }, [simboloId, mover, terminar]);
}

function soltarEnPunto(simboloId: string, clientX: number, clientY: number) {
  const lienzo = document.querySelector<HTMLElement>(".editor-canvas");
  if (!lienzo) return;

  const rect = lienzo.getBoundingClientRect();
  if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;

  const { zoom, ajustarACuadricula, soltarSimbolo } = useEditorStore.getState();
  const puntoM = isometricoAMetros(
    { x: clientX - rect.left + lienzo.scrollLeft, y: clientY - rect.top + lienzo.scrollTop },
    { anchoPredioM: ANCHO_PREDIO_M, altoPredioM: ALTO_PREDIO_M, zoom }
  );
  soltarSimbolo(simboloId, aplicarGridSnap(puntoM, ajustarACuadricula));
}
