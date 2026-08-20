"use client";

import { useCallback, type DragEvent } from "react";
import { useEditorStore } from "@/store/editor-store";
import { pixelesAMetros } from "@/editor/geometry/scale";
import { aplicarGridSnap } from "@/editor/snapping/GridSnap";

/**
 * Arrastrar un símbolo de la biblioteca y soltarlo en el lienzo — HU-ORG-21,
 * la historia de usuario central del producto. Usa la API nativa de
 * drag-and-drop del navegador, sin librerías externas.
 */
export function useDragAndDrop(lienzoRef: React.RefObject<HTMLDivElement | null>) {
  const soltarSimbolo = useEditorStore((s) => s.soltarSimbolo);
  const zoom = useEditorStore((s) => s.zoom);
  const ajustarACuadriculaActivo = useEditorStore((s) => s.ajustarACuadricula);

  const iniciarArrastre = useCallback((event: DragEvent<HTMLElement>, simboloId: string) => {
    event.dataTransfer.setData("text/plain", simboloId);
    event.dataTransfer.effectAllowed = "copy";
  }, []);

  const permitirSoltar = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  const soltar = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const simboloId = event.dataTransfer.getData("text/plain");
      if (!simboloId || !lienzoRef.current) return;

      const rect = lienzoRef.current.getBoundingClientRect();
      const xPx = event.clientX - rect.left;
      const yPx = event.clientY - rect.top;
      const puntoM = { x: pixelesAMetros(xPx, zoom), y: pixelesAMetros(yPx, zoom) };

      soltarSimbolo(simboloId, aplicarGridSnap(puntoM, ajustarACuadriculaActivo));
    },
    [lienzoRef, soltarSimbolo, zoom, ajustarACuadriculaActivo]
  );

  return { iniciarArrastre, permitirSoltar, soltar };
}
