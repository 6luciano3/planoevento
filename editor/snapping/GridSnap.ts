import type { Punto } from "@/types/location";
import { ajustarACuadricula } from "../geometry/coordinates";
import { EDITOR_CONFIG } from "@/config/editor.config";

export function aplicarGridSnap(punto: Punto, activo: boolean): Punto {
  return ajustarACuadricula(punto, EDITOR_CONFIG.gridStepMeters, activo);
}
