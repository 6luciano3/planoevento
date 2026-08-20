import type { CapaPlano } from "@/types/layer";

/** Capas iniciales de un plano nuevo — PRD §14 "Capas del plano". */
export const CAPAS_INICIALES: Omit<CapaPlano, "id">[] = [
  { nombre: "Base TopoExport", orden: 0, visible: true, bloqueada: true, color: "#8FB79B", transparencia: 100, incluirEnImpresion: true, esBase: true },
  { nombre: "Predio", orden: 1, visible: true, bloqueada: false, color: "#1C2430", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Circulación", orden: 2, visible: true, bloqueada: false, color: "#9C9C9C", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Stands", orden: 3, visible: true, bloqueada: false, color: "#C2410C", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Servicios", orden: 4, visible: true, bloqueada: false, color: "#2563EB", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Emergencias", orden: 5, visible: true, bloqueada: false, color: "#DC2626", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Electricidad", orden: 6, visible: true, bloqueada: false, color: "#CA8A04", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Estacionamiento", orden: 7, visible: true, bloqueada: false, color: "#6B7280", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Vegetación", orden: 8, visible: true, bloqueada: false, color: "#2F6D4F", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Textos", orden: 9, visible: true, bloqueada: false, color: "#1C2430", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Cotas y medidas", orden: 10, visible: true, bloqueada: false, color: "#5B6472", transparencia: 100, incluirEnImpresion: true },
  { nombre: "Leyenda y rótulo", orden: 11, visible: true, bloqueada: false, color: "#1C2430", transparencia: 100, incluirEnImpresion: true },
];
