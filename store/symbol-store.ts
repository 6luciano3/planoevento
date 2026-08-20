import { create } from "zustand";
import type { CategoriaSimbolo } from "@/types/symbol";
import { leer, guardar } from "@/lib/storage";

interface SymbolStoreState {
  busqueda: string;
  categoriaActiva: CategoriaSimbolo | "todas";
  recientes: string[];
  favoritos: string[];
  setBusqueda: (texto: string) => void;
  setCategoria: (categoria: CategoriaSimbolo | "todas") => void;
  registrarUso: (simboloId: string) => void;
  alternarFavorito: (simboloId: string) => void;
}

const CLAVE_RECIENTES = "planoevento:simbolos:recientes";
const CLAVE_FAVORITOS = "planoevento:simbolos:favoritos";

export const useSymbolStore = create<SymbolStoreState>((set, get) => ({
  busqueda: "",
  categoriaActiva: "todas",
  recientes: leer<string[]>(CLAVE_RECIENTES, []),
  favoritos: leer<string[]>(CLAVE_FAVORITOS, []),

  setBusqueda: (busqueda) => set({ busqueda }),
  setCategoria: (categoriaActiva) => set({ categoriaActiva }),

  registrarUso: (simboloId) => {
    const recientes = [simboloId, ...get().recientes.filter((id) => id !== simboloId)].slice(0, 8);
    guardar(CLAVE_RECIENTES, recientes);
    set({ recientes });
  },

  alternarFavorito: (simboloId) => {
    const actual = get().favoritos;
    const favoritos = actual.includes(simboloId)
      ? actual.filter((id) => id !== simboloId)
      : [...actual, simboloId];
    guardar(CLAVE_FAVORITOS, favoritos);
    set({ favoritos });
  },
}));
