import { create } from "zustand";

interface DragState {
  /** Símbolo que se está arrastrando desde la biblioteca, o null si no hay arrastre en curso. */
  simboloId: string | null;
  /** Posición del puntero en coordenadas de viewport (clientX/clientY), para la vista previa flotante. */
  x: number;
  y: number;
  iniciar: (simboloId: string, x: number, y: number) => void;
  mover: (x: number, y: number) => void;
  terminar: () => void;
}

export const useDragStore = create<DragState>((set) => ({
  simboloId: null,
  x: 0,
  y: 0,
  iniciar: (simboloId, x, y) => set({ simboloId, x, y }),
  mover: (x, y) => set({ x, y }),
  terminar: () => set({ simboloId: null }),
}));
