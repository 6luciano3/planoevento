/**
 * Wrapper de persistencia local para el prototipo (Etapa 1).
 * Reemplaza a database/ + services/*.service.ts cuando exista un backend real:
 * la firma de las funciones en services/project.service.ts ya está pensada
 * para que ese reemplazo no toque los componentes que las consumen.
 */
export function leer<T>(clave: string, valorPorDefecto: T): T {
  if (typeof window === "undefined") return valorPorDefecto;
  try {
    const crudo = window.localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

export function guardar<T>(clave: string, valor: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Almacenamiento no disponible (modo privado, cuota excedida, etc.)
  }
}

export function eliminar(clave: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(clave);
}
