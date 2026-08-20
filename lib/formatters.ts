export function formatearFecha(iso: string): string {
  if (!iso) return "—";
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return "—";
  return fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatearFechaHora(iso: string): string {
  if (!iso) return "—";
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return "—";
  return fecha.toLocaleString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function formatearSuperficie(m2: number): string {
  return `${m2.toLocaleString("es-AR", { maximumFractionDigits: 0 })} m²`;
}

export function formatearEscala(denominador: number): string {
  return `1:${denominador}`;
}

export function metrosACm(metros: number): number {
  return Math.round(metros * 100);
}
