/**
 * Esquema de datos objetivo, derivado del diagrama de clases del proyecto
 * (Usuario, ProyectoPlano, Predio, Plano, CapaPlano, ObjetoPlano, Componente...).
 *
 * Este archivo NO conecta a una base real todavía: el prototipo persiste en
 * localStorage (ver lib/storage.ts y services/project.service.ts). Cuando se
 * incorpore un backend (Etapa 2+), estas interfaces son la referencia para
 * generar las migraciones (Prisma, Drizzle, SQL, lo que se elija).
 */

export interface UsuarioRow {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  passwordHash: string;
  activo: boolean;
  fechaRegistro: string;
}

export interface ProyectoPlanoRow {
  id: string;
  usuarioId: string;
  nombre: string;
  estado: "BORRADOR" | "COMPLETO" | "EXPORTADO";
  fechaCreacion: string;
  fechaModificacion: string;
  guardadoAutomatico: boolean;
}

export interface PredioRow {
  id: string;
  proyectoId: string;
  nombre: string;
  provincia: string;
  municipio: string;
  localidad: string;
  direccion: string;
  latitud: number;
  longitud: number;
  superficieM2: number;
}

export interface PlanoRow {
  id: string;
  proyectoId: string;
  nombre: string;
  unidadMedida: "METRO" | "CENTIMETRO" | "MILIMETRO";
  escalaNumerica: number;
  fechaActualizacion: string;
}

export interface CapaPlanoRow {
  id: string;
  planoId: string;
  nombre: string;
  tipo: string;
  orden: number;
  visible: boolean;
  bloqueada: boolean;
  color: string;
  transparencia: number;
}

export interface ObjetoPlanoRow {
  id: string;
  capaId: string;
  codigo: string | null;
  nombreVisible: string;
  posicionX: number;
  posicionY: number;
  anchoM: number;
  largoM: number;
  rotacionGrados: number;
  color: string;
  transparencia: number;
  ordenVisual: number;
  visible: boolean;
  bloqueado: boolean;
}

export interface ComponenteRow {
  id: string;
  codigo: string;
  nombre: string;
  categoriaId: string;
  icono: string;
  anchoPredeterminadoM: number;
  largoPredeterminadoM: number;
  permiteEscalar: boolean;
  permiteRotar: boolean;
  activo: boolean;
}
