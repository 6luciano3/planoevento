export type TamanoHoja = "A4" | "A3" | "A2" | "A1" | "A0" | "PERSONALIZADO";
export type Orientacion = "HORIZONTAL" | "VERTICAL";
export type UnidadMedida = "METRO" | "CENTIMETRO" | "MILIMETRO";

export interface ConfiguracionHoja {
  tamano: TamanoHoja;
  orientacion: Orientacion;
  anchoMm: number;
  altoMm: number;
  margenSuperiorMm: number;
  margenInferiorMm: number;
  margenIzquierdoMm: number;
  margenDerechoMm: number;
  mostrarCuadricula: boolean;
  mostrarFondo: boolean;
}

export interface Caratula {
  tituloPlano: string;
  nombreEvento: string;
  organizador: string;
  documentoOrganizador: string;
  ubicacion: string;
  municipio: string;
  provincia: string;
  fechaEvento: string;
  horario: string;
  superficie: string;
  escala: string;
  autor: string;
  numeroPlano: string;
  version: string;
  fechaElaboracion: string;
  observaciones: string;
}

export interface ItemLeyenda {
  id: string;
  simbolo: string;
  codigo: string;
  nombre: string;
  cantidad: number;
  visible: boolean;
}

export type CategoriaRevision = "documento" | "distribucion" | "seguridad";

export interface ItemRevision {
  id: string;
  categoria: CategoriaRevision;
  descripcion: string;
  completado: boolean;
  mensaje: string;
}

export interface Plano {
  id: string;
  nombre: string;
  unidadMedida: UnidadMedida;
  escalaNumerica: number;
  fechaActualizacion: string;
  hoja: ConfiguracionHoja;
  caratula: Caratula;
}
