"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/store/editor-store";
import { APP_CONFIG } from "@/config/app.config";

export type EstadoGuardado = "guardado" | "guardando" | "sin_cambios";

/** Guardado automático — HU-ORG-32. Persiste el proyecto cargado cada pocos segundos. */
export function useAutosave(): EstadoGuardado {
  const proyecto = useEditorStore((s) => s.proyecto);
  const guardar = useEditorStore((s) => s.guardar);
  const [estado, setEstado] = useState<EstadoGuardado>("sin_cambios");

  useEffect(() => {
    if (!proyecto) return;
    setEstado("guardando");
    const timeout = setTimeout(() => {
      guardar();
      setEstado("guardado");
    }, APP_CONFIG.autosaveIntervalMs);
    return () => clearTimeout(timeout);
  }, [proyecto, guardar]);

  return estado;
}
