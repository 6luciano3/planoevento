import type { HerramientaEditor } from "@/types/editor";

export interface DefinicionHerramienta {
  id: HerramientaEditor;
  label: string;
  atajo?: string;
}

/** Herramientas del editor — PRD §12. Las de dibujo (línea, polígono...) se
 * implementan en EditorCanvas.tsx; este archivo centraliza su metadata. */
export const HERRAMIENTAS: DefinicionHerramienta[] = [
  { id: "seleccionar", label: "Seleccionar", atajo: "V" },
  { id: "mover", label: "Mover", atajo: "M" },
  { id: "linea", label: "Línea", atajo: "L" },
  { id: "polilinea", label: "Polilínea", atajo: "P" },
  { id: "rectangulo", label: "Rectángulo", atajo: "R" },
  { id: "circulo", label: "Círculo", atajo: "C" },
  { id: "poligono", label: "Polígono", atajo: "G" },
  { id: "texto", label: "Texto", atajo: "T" },
  { id: "medir", label: "Medir distancia", atajo: "D" },
];
