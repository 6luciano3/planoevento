"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/store/editor-store";

/** Carga un proyecto en el editor al entrar a la Pantalla 15 — Editor principal. */
export function useEditor(proyectoId: string) {
  const cargar = useEditorStore((s) => s.cargar);

  useEffect(() => {
    cargar(proyectoId);
  }, [proyectoId, cargar]);

  return useEditorStore();
}
