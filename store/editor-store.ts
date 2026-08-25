import { create } from "zustand";
import type { ProyectoPlano } from "@/types/project";
import type { ObjetoPlano, EstadoEditor, HerramientaEditor } from "@/types/editor";
import type { Punto } from "@/types/location";
import * as projectService from "@/services/project.service";
import { crearObjetoDesdeSimbolo } from "@/symbols/symbol-factory";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";
import {
  agregarObjeto,
  actualizarObjeto,
  eliminarObjeto,
  duplicarObjeto,
  ESTADO_EDITOR_INICIAL,
} from "@/editor/core/EditorState";
import { HistoryManager } from "@/editor/core/HistoryManager";
import { FUENTE_TEXTO_DEFECTO } from "@/config/fonts";
import { FAMILIAS_CAMINO } from "@/editor/tools/caminoAutoTile";

const historial = new HistoryManager<ObjetoPlano[]>(50);

/**
 * Si la capa activa está oculta, un objeto nuevo se crea igual pero no se ve
 * en el lienzo — quedaba como si la herramienta "no hiciera nada". Se
 * muestra la capa automáticamente al agregar algo en ella.
 */
function conCapaVisible(capas: ProyectoPlano["capas"], capaId: string): ProyectoPlano["capas"] {
  return capas.map((c) => (c.id === capaId && !c.visible ? { ...c, visible: true } : c));
}

interface EditorStoreState extends EstadoEditor {
  proyecto: ProyectoPlano | null;
  capaActivaId: string | null;
  familiaCaminoActiva: string;
  cargar: (proyectoId: string) => void;
  guardar: () => void;
  setHerramienta: (h: HerramientaEditor) => void;
  setZoom: (z: number) => void;
  toggleCuadricula: () => void;
  setCapaActiva: (id: string) => void;
  setFamiliaCamino: (prefijo: string) => void;
  seleccionar: (id: string | null) => void;
  soltarSimbolo: (simboloId: string, posicion: Punto) => void;
  agregarCamino: (piezas: { simboloId: string; posicion: Punto }[]) => number;
  agregarFigura: (figura: {
    tipo: "linea" | "polilinea" | "rectangulo" | "circulo" | "poligono" | "texto";
    posicion: Punto;
    anchoM: number;
    largoM: number;
    puntos?: Punto[];
    contenido?: string;
  }) => string | null;
  distribuirSimbolo: (
    simboloId: string,
    origen: Punto,
    filas: number,
    columnas: number,
    separacionHorizontalM: number,
    separacionVerticalM: number
  ) => number;
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
  familiaCaminoActiva: FAMILIAS_CAMINO[0].prefijo,

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
  setFamiliaCamino: (familiaCaminoActiva) => set({ familiaCaminoActiva }),
  seleccionar: (seleccionId) => set({ seleccionId }),

  soltarSimbolo: (simboloId, posicion) => {
    const { proyecto, capaActivaId } = get();
    if (!proyecto || !capaActivaId) return;
    const siguienteNumero = proyecto.objetos.filter((o) => o.simboloId === simboloId).length + 1;
    const nuevo = crearObjetoDesdeSimbolo(simboloId, posicion, capaActivaId, siguienteNumero);
    if (!nuevo) return;

    historial.registrar(proyecto.objetos);
    const objetos = agregarObjeto(proyecto.objetos, nuevo);
    const actualizado = { ...proyecto, objetos, capas: conCapaVisible(proyecto.capas, capaActivaId) };
    set({ proyecto: actualizado, seleccionId: nuevo.id });
    projectService.guardarProyecto(actualizado);
  },

  /** Crea una figura dibujada a mano (línea, polilínea, rectángulo, círculo, polígono o texto) — HU-ORG-15. */
  agregarFigura: (figura) => {
    const { proyecto, capaActivaId } = get();
    if (!proyecto || !capaActivaId) return null;

    const NOMBRE_POR_TIPO: Record<string, string> = {
      linea: "Línea",
      polilinea: "Polilínea",
      rectangulo: "Rectángulo",
      circulo: "Círculo",
      poligono: "Polígono",
      texto: "Texto",
    };
    const id = `obj-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const nuevo: ObjetoPlano = {
      id,
      tipo: figura.tipo,
      nombreVisible: NOMBRE_POR_TIPO[figura.tipo] ?? "Elemento",
      capaId: capaActivaId,
      posicion: figura.posicion,
      anchoM: figura.anchoM,
      largoM: figura.largoM,
      puntos: figura.puntos,
      contenido: figura.contenido,
      fontFamily: figura.tipo === "texto" ? FUENTE_TEXTO_DEFECTO : undefined,
      rotacionGrados: 0,
      color: "#C2410C",
      transparencia: 100,
      ordenVisual: proyecto.objetos.length + 1,
      visible: true,
      bloqueado: false,
      mostrarNombre: false,
      mostrarMedidas: false,
    };

    historial.registrar(proyecto.objetos);
    const objetos = agregarObjeto(proyecto.objetos, nuevo);
    const actualizado = { ...proyecto, objetos, capas: conCapaVisible(proyecto.capas, capaActivaId) };
    set({ proyecto: actualizado, seleccionId: id, herramienta: "seleccionar" });
    projectService.guardarProyecto(actualizado);
    return id;
  },

  /** Crea varios objetos en fila/cuadrícula de una sola vez — Pantalla de "Distribuir y numerar" (HU-ORG-28/29). */
  distribuirSimbolo: (simboloId, origen, filas, columnas, separacionHorizontalM, separacionVerticalM) => {
    const { proyecto, capaActivaId } = get();
    if (!proyecto || !capaActivaId) return 0;
    const def = obtenerSimbolo(simboloId);
    if (!def) return 0;

    historial.registrar(proyecto.objetos);
    let numero = proyecto.objetos.filter((o) => o.simboloId === simboloId).length + 1;
    const nuevos: ObjetoPlano[] = [];
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        const posicion = {
          x: origen.x + c * (def.defaultWidth + separacionHorizontalM),
          y: origen.y + f * (def.defaultHeight + separacionVerticalM),
        };
        const nuevo = crearObjetoDesdeSimbolo(simboloId, posicion, capaActivaId, numero);
        if (nuevo) {
          nuevos.push(nuevo);
          numero += 1;
        }
      }
    }

    const objetos = [...proyecto.objetos, ...nuevos];
    const actualizado = { ...proyecto, objetos, capas: conCapaVisible(proyecto.capas, capaActivaId) };
    set({ proyecto: actualizado });
    projectService.guardarProyecto(actualizado);
    return nuevos.length;
  },

  /** Coloca de una sola vez todas las piezas que arma la herramienta "Camino" — un solo registro de historial. */
  agregarCamino: (piezas) => {
    const { proyecto, capaActivaId } = get();
    if (!proyecto || !capaActivaId || piezas.length === 0) return 0;

    historial.registrar(proyecto.objetos);
    const usadosEnEstaTanda: Record<string, number> = {};
    const nuevos: ObjetoPlano[] = [];
    for (const pieza of piezas) {
      const previos = proyecto.objetos.filter((o) => o.simboloId === pieza.simboloId).length;
      usadosEnEstaTanda[pieza.simboloId] = (usadosEnEstaTanda[pieza.simboloId] ?? 0) + 1;
      const numero = previos + usadosEnEstaTanda[pieza.simboloId];
      const nuevo = crearObjetoDesdeSimbolo(pieza.simboloId, pieza.posicion, capaActivaId, numero);
      if (nuevo) nuevos.push(nuevo);
    }

    const objetos = [...proyecto.objetos, ...nuevos];
    const actualizado = { ...proyecto, objetos, capas: conCapaVisible(proyecto.capas, capaActivaId) };
    set({ proyecto: actualizado, herramienta: "seleccionar" });
    projectService.guardarProyecto(actualizado);
    return nuevos.length;
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
