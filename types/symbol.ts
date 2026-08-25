export type CategoriaSimbolo =
  | "infraestructura"
  | "sanitarios"
  | "accesos"
  | "emergencias"
  | "residuos"
  | "gastronomia"
  | "estacionamiento"
  | "electricidad"
  | "agua-gas"
  | "senalizacion"
  | "vegetacion"
  | "mobiliario-urbano"
  | "personas"
  | "stands"
  | "senderos-tierra"
  | "caminos-pavimentados"
  | "calles-vehiculares"
  | "cerramientos"
  | "superficies"
  | "elementos-misiones";

/** Definición estática de un componente de la biblioteca (no un objeto ya colocado). */
export interface DefinicionSimbolo {
  id: string;
  nombre: string;
  categoria: CategoriaSimbolo;
  /** Ruta al ícono dentro de /public/symbols (SVG plano o PNG isométrico) */
  icono: string;
  /** Prefijo de numeración automática, ej. "ST" para stands. */
  prefijo?: string;
  defaultWidth: number;
  defaultHeight: number;
  unit: "m";
  rotatable: boolean;
  resizable: boolean;
  /**
   * "isometrico" ⇒ el ícono es un PNG con perspectiva propia (cámara isométrica,
   * 1536×1024) que se ancla en su centro-inferior y no se estira/rota — ver
   * IconoObjetoIsometrico. Sin valor (u "plano") ⇒ el SVG top-down de siempre,
   * estirado a ancho×alto y rotable.
   */
  estiloIcono?: "plano" | "isometrico";
  /**
   * Proporción ancho/alto real del PNG isométrico (ej. 1536/1024). Sin valor
   * ⇒ se asume 1536/1024, el tamaño estándar de la mayoría de los assets
   * isométricos — solo hace falta declararlo para los que tienen otro lienzo.
   */
  aspectoIcono?: number;
}
