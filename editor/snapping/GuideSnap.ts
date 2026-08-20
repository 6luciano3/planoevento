/**
 * Guías manuales (activadas por el usuario desde la regla). No forman parte
 * del MVP funcional todavía; se deja el contrato para cuando EditorCanvas
 * sume reglas arrastrables.
 */
export interface Guia {
  eje: "x" | "y";
  posicionM: number;
}

export function crearGuia(eje: "x" | "y", posicionM: number): Guia {
  return { eje, posicionM };
}
