import type { Predio } from "./location";
import type { CapaTopoId, EstadoImportacionTopo } from "./topoexport";
import type { CapaPlano } from "./layer";
import type { ObjetoPlano } from "./editor";
import type { Plano } from "./plan";

export type EstadoProyecto = "BORRADOR" | "COMPLETO" | "EXPORTADO";

export type TipoEvento =
  | "FERIA"
  | "FESTIVAL"
  | "EXPOSICION"
  | "EVENTO_CULTURAL"
  | "EVENTO_GASTRONOMICO"
  | "EVENTO_DEPORTIVO"
  | "OTRO";

export interface Evento {
  nombre: string;
  tipo: TipoEvento;
  organizador: string;
  documentoOrganizador: string;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  asistentesEstimados: number;
}

export interface BaseImportada {
  origen: "topoexport" | "archivo_propio" | "ninguna";
  capasTopo: CapaTopoId[];
  estadoImportacion?: EstadoImportacionTopo;
  archivoNombre?: string;
  factorEscala?: number;
}

export interface ProyectoPlano {
  id: string;
  nombre: string;
  estado: EstadoProyecto;
  fechaCreacion: string;
  fechaModificacion: string;
  evento: Evento;
  predio: Predio;
  base: BaseImportada;
  plano: Plano;
  capas: CapaPlano[];
  objetos: ObjetoPlano[];
  /** Prefijos de leyenda que el organizador ocultó manualmente (Pantalla 20). */
  leyendaOcultos?: string[];
}
