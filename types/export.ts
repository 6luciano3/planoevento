export type FormatoSalida = "PDF" | "PNG" | "JPG" | "SVG";
export type ModoColor = "COLOR" | "ESCALA_GRISES" | "BLANCO_NEGRO";

export interface ConfiguracionExportacion {
  formato: FormatoSalida;
  modoColor: ModoColor;
  calidadDpi: number;
  incluirFondo: boolean;
  incluirCuadricula: boolean;
  incluirCaratula: boolean;
  incluirLeyenda: boolean;
  incluirListado: boolean;
}

export interface DocumentoExportado {
  id: string;
  nombreArchivo: string;
  formato: FormatoSalida;
  fechaGeneracion: string;
  numeroPaginas: number;
}
