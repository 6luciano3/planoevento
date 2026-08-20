/**
 * Pila de deshacer/rehacer genérica sobre snapshots de estado — HU-ORG-31.
 * Se usa desde store/history-store.ts, que la conecta al estado real del editor.
 */
export class HistoryManager<T> {
  private pasado: T[] = [];
  private futuro: T[] = [];
  private limite: number;

  constructor(limite = 50) {
    this.limite = limite;
  }

  registrar(snapshotAnterior: T): void {
    this.pasado.push(snapshotAnterior);
    if (this.pasado.length > this.limite) this.pasado.shift();
    this.futuro = [];
  }

  puedeDeshacer(): boolean {
    return this.pasado.length > 0;
  }

  puedeRehacer(): boolean {
    return this.futuro.length > 0;
  }

  deshacer(actual: T): T | null {
    const anterior = this.pasado.pop();
    if (anterior === undefined) return null;
    this.futuro.push(actual);
    return anterior;
  }

  rehacer(actual: T): T | null {
    const siguiente = this.futuro.pop();
    if (siguiente === undefined) return null;
    this.pasado.push(actual);
    return siguiente;
  }

  reiniciar(): void {
    this.pasado = [];
    this.futuro = [];
  }
}
