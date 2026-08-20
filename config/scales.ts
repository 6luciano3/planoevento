/** Escalas sugeridas — PRD §6/§13. Expresadas como el denominador de 1:N. */
export const ESCALAS_SUGERIDAS = [50, 100, 200, 250, 500, 1000] as const;

export type EscalaSugerida = (typeof ESCALAS_SUGERIDAS)[number];

/**
 * Sugiere una escala 1:N a partir de la superficie del predio (m²) y el
 * tamaño de hoja disponible (mm), buscando que el predio entre en la hoja
 * con margen. Aproximación simple para el MVP (Etapa 2 la refinará).
 */
export function sugerirEscala(superficieM2: number, hojaAnchoMm: number, hojaAltoMm: number): number {
  const ladoPredioM = Math.sqrt(Math.max(superficieM2, 1));
  const ladoHojaUtilM = (Math.min(hojaAnchoMm, hojaAltoMm) / 1000) * 0.85;
  const necesaria = ladoPredioM / ladoHojaUtilM;
  const candidata = ESCALAS_SUGERIDAS.find((e) => e >= necesaria);
  return candidata ?? ESCALAS_SUGERIDAS[ESCALAS_SUGERIDAS.length - 1];
}
