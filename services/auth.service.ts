import { leer, guardar, eliminar } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

export interface Sesion {
  nombre: string;
  apellido: string;
  email: string;
}

/**
 * Autenticación simulada para el prototipo: no valida contraseña contra un
 * backend, solo guarda una "sesión" en localStorage. Reemplazar por
 * NextAuth/Auth.js + database/schema.ts#UsuarioRow en Etapa 2.
 */
export function registrar(datos: Sesion): Sesion {
  guardar(STORAGE_KEYS.sesion, datos);
  return datos;
}

export function iniciarSesion(email: string): Sesion {
  const existente = leer<Sesion | null>(STORAGE_KEYS.sesion, null);
  const sesion: Sesion = existente ?? { nombre: "Organizador", apellido: "", email };
  guardar(STORAGE_KEYS.sesion, sesion);
  return sesion;
}

export function obtenerSesion(): Sesion | null {
  return leer<Sesion | null>(STORAGE_KEYS.sesion, null);
}

export function cerrarSesion(): void {
  eliminar(STORAGE_KEYS.sesion);
}
