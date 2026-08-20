import { EDITOR_CONFIG } from "@/config/editor.config";

/** Convierte metros reales a píxeles de lienzo según el zoom actual. */
export function metrosAPixeles(metros: number, zoom: number): number {
  return metros * EDITOR_CONFIG.pixelsPerMeter * zoom;
}

/** Convierte píxeles de lienzo a metros reales según el zoom actual. */
export function pixelesAMetros(pixeles: number, zoom: number): number {
  return pixeles / (EDITOR_CONFIG.pixelsPerMeter * zoom);
}

/** Factor de escala entre dos puntos de calibración y una distancia real conocida. */
export function calcularFactorEscala(distanciaPixeles: number, distanciaRealM: number): number {
  if (distanciaPixeles <= 0) return 1;
  return distanciaRealM / distanciaPixeles;
}
