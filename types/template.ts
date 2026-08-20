import type { TipoEvento } from "./project";

/** Un símbolo ya ubicado dentro de una plantilla, en el sistema de coordenadas del lienzo (60m x 40m). */
export interface ObjetoPlantilla {
  simboloId: string;
  /** Debe coincidir con un `nombre` de `CAPAS_INICIALES` (config/layer-presets.ts). */
  capa: string;
  x: number;
  y: number;
  anchoM?: number;
  largoM?: number;
  rotacionGrados?: number;
}

/** Pantalla 14 — Plantillas (PRD, extensión): una distribución inicial lista para editar. */
export interface PlantillaPlano {
  id: string;
  nombre: string;
  tipoEvento: TipoEvento;
  descripcion: string;
  /** Nombre de ícono de lucide-react, mapeado en TemplateCard. */
  icono: string;
  objetos: ObjetoPlantilla[];
}
