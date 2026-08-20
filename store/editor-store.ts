import { create } from "zustand";
import type { ProyectoPlano } from "@/types/project";
import type { ObjetoPlano, EstadoEditor, HerramientaEditor } from "@/types/editor";
import type { Punto } from "@/types/location";
import * as projectService from "@/services/project.service";
import { crearObjetoDesdeSimbolo } from "@/symbols/symbol-factory";
import {
  agregarObjeto,
  actualizarObjeto,
  eliminarObjeto,
  duplicarObjeto,
  ESTADO_EDITOR_INICIAL,
} from "@/editor/core/EditorState";
import { HistoryManager } from "@/editor/core/HistoryManager";

const historial = new HistoryManager<ObjetoPlano[]>(50);

interface EditorStoreState extends EstadoEditor {
  proyecto: ProyectoPlano | null;
  capaActivaId: string | null;
  cargar: (proyectoId: string) => void;
  guardar: () => void;
  setHerramienta: (h: HerramientaEditor) => void;
  setZoom: (z: number) => void;
  toggleCuadricula: () => void;
  setCapaActiva: (id: string) => void;
  seleccionar: (id: string | null) => void;
  soltarSimbolo: (simboloId: string, posicion: Punto) => void;
  moverObjeto: (id: string, posicion: Punto) => void;
  actualizarPropiedades: (id: string, cambios: Partial<ObjetoPlano>) => void;
  eliminarSeleccionado: () => void;
  duplicarSeleccionado: () => void;
  deshacer: () => void;
  rehacer: () => void;
}

export const useEditorStore = create<EditorStoreState>((set, get) => ({
  ...ESTADO_EDITOR_INICIAL,
  proyecto: null,
  capaActivaId: null,

  cargar: (proyectoId) => {
    const proyecto = projectService.obtenerProyecto(proyectoId) ?? null;
    historial.reiniciar();
    set({
      proyecto,
      capaActivaId: proyecto?.capas.find((c) => !c.esBase)?.id ?? proyecto?.capas[0]?.id ?? null,
      seleccionId: null,
    });
  },

  guardar: () => {
    const { proyecto } = get();
    if (!proyecto) return;
    projectService.guardarProyecto(proyecto);
  },

  setHerramienta: (herramienta) => set({ herramienta }),
  setZoom: (zoom) => set({ zoom }),
  toggleCuadricula: () => set((s) => ({ mostrarCuadricula: !s.mostrarCuadricula })),
  setCapaActiva: (capaActivaId) => set({ capaActivaId }),
  seleccionar: (seleccionId) => set({ seleccionId }),

  soltarSimbolo: (simboloId, posicion) => {
    const { proyecto, capaActivaId } = get();
    if (!proyecto || !capaActivaId) return;
    const siguienteNumero = proyecto.objetos.filter((o) => o.simboloId === simboloId).length + 1;
    const nuevo = crearObjetoDesdeSimbolo(simboloId, posicion, capaActivaId, siguienteNumero);
    if (!nuevo) return;

    historial.registrar(proyecto.objetos);
    const objetos = agregarObjeto(proyecto.objetos, nuevo);
    const actualizado = { ...proyecto, objetos };
    set({ proyecto: actualizado, seleccionId: nuevo.id });
    projectService.guardarProyecto(actualizado);
  },

  moverObjeto: (id, posicion) => {
    const { proyecto } = get();
    if (!proyecto) return;
    const objetos = actualizarObjeto(proyecto.objetos, id, { posicion });
    const actualizado = { ...proyecto, objetos };
    set({ proyecto: actualizado });
    projectService.guardarProyecto(actualizado);
  },

  actualizarPropiedades: (id, cambios) => {
    const { proyecto } = get();
    if (!proyecto) return;
    historial.registrar(proyecto.objetos);
    const objetos = actualizarObjeto(proyecto.objetos, id, cambios);
    const actualizado = { ...proyecto, objetos };
    set({ proyecto: actualizado });
    projectService.guardarProyecto(actualizado);
  },

  eliminarSeleccionado: () => {
    const { proyecto, seleccionId } = get();
    if (!proyecto || !seleccionId) return;
    historial.registrar(proyecto.objetos);
    const objetos = eliminarObjeto(proyecto.objetos, seleccionId);
    const actualizado = { ...proyecto, objetos };
    set({ proyecto: actualizado, seleccionId: null });
    projectService.guardarProyecto(actualizado);
  },

  duplicarSeleccionado: () => {
    const { proyecto, seleccionId } = get();
    if (!proyecto || !seleccionId) return;
    historial.registrar(proyecto.objetos);
    const nuevoId = `obj-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const objetos = duplicarObjeto(proyecto.objetos, seleccionId, nuevoId);
    const actualizado = { ...proyecto, objetos };
    set({ proyecto: actualizado, seleccionId: nuevoId });
    projectService.guardarProyecto(actualizado);
  },

  deshacer: () => {
    const { proyecto } = get();
    if (!proyecto) return;
    const anterior = historial.deshacer(proyecto.objetos);
    if (!anterior) return;
    const actualizado = { ...proyecto, objetos: anterior };
    set({ proyecto: actualizado });
    projectService.guardarProyecto(actualizado);
  },

  rehacer: () => {
    const { proyecto } = get();
    if (!proyecto) return;
    const siguiente = historial.rehacer(proyecto.objetos);
    if (!siguiente) return;
    const actualizado = { ...proyecto, objetos: siguiente };
    set({ proyecto: actualizado });
    projectService.guardarProyecto(actualizado);
  },
}));
