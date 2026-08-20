/**
 * Cliente HTTP mínimo para cuando app/api/* hable con un backend real.
 * Hoy los servicios (project.service.ts, etc.) no lo usan porque persisten
 * en localStorage; queda listo para el reemplazo de Etapa 2.
 */
export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const respuesta = await fetch(input, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al solicitar ${input}`);
  }
  return respuesta.json() as Promise<T>;
}
