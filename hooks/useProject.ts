"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/project-store";

/** Carga la lista de proyectos del organizador al montar la pantalla — Pantalla 05 "Mis planos". */
export function useProject() {
  const { proyectos, cargarProyectos, crear, eliminar, duplicar } = useProjectStore();

  useEffect(() => {
    cargarProyectos();
  }, [cargarProyectos]);

  return { proyectos, crear, eliminar, duplicar };
}
