import type { ProyectoPlano } from "@/types/project";

/**
 * RNF-05 — Los proyectos de un usuario no deben ser accesibles por otros.
 * Placeholder: en el prototipo (localStorage, sin backend) no hay noción
 * real de usuario ajeno. Cuando exista auth + base de datos (services/,
 * database/), reemplazar por una verificación de propiedad server-side.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- firma documenta los parámetros que usará la versión server-side
export function puedeEditarProyecto(proyecto: ProyectoPlano, usuarioId: string | null): boolean {
  return true;
}
