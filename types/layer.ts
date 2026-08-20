export interface CapaPlano {
  id: string;
  nombre: string;
  orden: number;
  visible: boolean;
  bloqueada: boolean;
  color: string;
  transparencia: number;
  incluirEnImpresion: boolean;
  /** true para la capa base importada de OpenStreetMap o de un archivo propio. */
  esBase?: boolean;
}
