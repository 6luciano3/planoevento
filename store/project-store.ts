import { create } from "zustand";
import type { ProyectoPlano, Evento } from "@/types/project";
import * as projectService from "@/services/project.service";

interface ProjectStoreState {
  proyectos: ProyectoPlano[];
  cargarProyectos: () => void;
  crear: (evento: Evento, predio: Partial<ProyectoPlano["predio"]>) => ProyectoPlano;
  eliminar: (id: string) => void;
  duplicar: (id: string) => void;
}

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
  proyectos: [],

  cargarProyectos: () => set({ proyectos: projectService.listarProyectos() }),

  crear: (evento, predio) => {
    const nuevo = projectService.crearProyecto(evento, predio);
    set({ proyectos: [...get().proyectos, nuevo] });
    return nuevo;
  },

  eliminar: (id) => {
    projectService.eliminarProyecto(id);
    set({ proyectos: get().proyectos.filter((p) => p.id !== id) });
  },

  duplicar: (id) => {
    const copia = projectService.duplicarProyecto(id);
    if (copia) set({ proyectos: [...get().proyectos, copia] });
  },
}));
