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
  | "vegetacion";

/** Definición estática de un componente de la biblioteca (no un objeto ya colocado). */
export interface DefinicionSimbolo {
  id: string;
  nombre: string;
  categoria: CategoriaSimbolo;
  /** Ruta al SVG dentro de /public/symbols */
  icono: string;
  /** Prefijo de numeración automática, ej. "ST" para stands. */
  prefijo?: string;
  defaultWidth: number;
  defaultHeight: number;
  unit: "m";
  rotatable: boolean;
  resizable: boolean;
}
