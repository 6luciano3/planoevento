/** Maneja qué objeto del plano está seleccionado en el lienzo (selección simple para el MVP). */
export class SelectionManager {
  private seleccionActual: string | null = null;
  private listeners = new Set<(id: string | null) => void>();

  seleccionar(id: string | null): void {
    this.seleccionActual = id;
    this.listeners.forEach((fn) => fn(id));
  }

  obtenerSeleccion(): string | null {
    return this.seleccionActual;
  }

  limpiar(): void {
    this.seleccionar(null);
  }

  suscribir(fn: (id: string | null) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
