import type { TamanoHoja } from "@/types/plan";

export interface PaperSizeDef {
  id: TamanoHoja;
  label: string;
  widthMm: number;
  heightMm: number;
}

/** Tamaños de hoja — PRD §6/§13/§20. Ancho x alto en orientación vertical. */
export const PAPER_SIZES: PaperSizeDef[] = [
  { id: "A4", label: "A4", widthMm: 210, heightMm: 297 },
  { id: "A3", label: "A3", widthMm: 297, heightMm: 420 },
  { id: "A2", label: "A2", widthMm: 420, heightMm: 594 },
  { id: "A1", label: "A1", widthMm: 594, heightMm: 841 },
  { id: "A0", label: "A0", widthMm: 841, heightMm: 1189 },
  { id: "PERSONALIZADO", label: "Personalizado", widthMm: 594, heightMm: 841 },
];

export function getPaperSize(id: TamanoHoja): PaperSizeDef {
  return PAPER_SIZES.find((p) => p.id === id) ?? PAPER_SIZES[3];
}
