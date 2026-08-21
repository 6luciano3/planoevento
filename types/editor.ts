import type { Punto } from "./location";

/** Un objeto ya colocado sobre el plano (instancia de un símbolo o una figura dibujada). */
export interface ObjetoPlano {
  id: string;
  simboloId?: string;
  tipo: "simbolo" | "linea" | "polilinea" | "rectangulo" | "circulo" | "poligono" | "texto" | "cota";
  codigo?: string;
  nombreVisible: string;
  capaId: string;
  posicion: Punto;
  anchoM: number;
  largoM: number;
  rotacionGrados: number;
  color: string;
  transparencia: number;
  ordenVisual: number;
  visible: boolean;
  bloqueado: boolean;
  mostrarNombre: boolean;
  mostrarMedidas: boolean;
  /** Contenido para objetos de tipo texto. */
  contenido?: string;
  /** Familia tipográfica para objetos de tipo texto — ver FUENTES_TEXTO en config/fonts.ts. */
  fontFamily?: string;
  /** Vértices de línea/polilínea/polígono/cota, relativos a `posicion` (el primero siempre es {0,0}). */
  puntos?: Punto[];
}

export type HerramientaEditor =
  | "seleccionar"
  | "mover"
  | "linea"
  | "polilinea"
  | "rectangulo"
  | "circulo"
  | "poligono"
  | "texto"
  | "medir";

export interface EstadoEditor {
  herramienta: HerramientaEditor;
  zoom: number;
  mostrarCuadricula: boolean;
  ajustarACuadricula: boolean;
  seleccionId: string | null;
}
