export type CapaTopoId =
  | "parcelas"
  | "edificios"
  | "calles"
  | "ferrocarriles"
  | "cursos_agua"
  | "arboles"
  | "areas_verdes"
  | "terreno";

export type EstadoImportacionTopo =
  | "pendiente"
  | "procesando"
  | "completo"
  | "parcial"
  | "sin_cobertura"
  | "error";

export interface CapaTopoExport {
  id: CapaTopoId;
  nombre: string;
  recomendada: boolean;
  disponible: boolean;
}

export interface ResultadoImportacionTopo {
  estado: EstadoImportacionTopo;
  mensaje: string;
  capasImportadas: CapaTopoId[];
  superficieM2?: number;
  fechaImportacion?: string;
}
