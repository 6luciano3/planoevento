import type { CategoriaSimbolo } from "@/types/symbol";

export interface DefinicionCategoria {
  id: CategoriaSimbolo;
  nombre: string;
}

/** Categorías de la paleta lateral — PRD §11. */
export const CATEGORIAS: DefinicionCategoria[] = [
  { id: "infraestructura", nombre: "Infraestructura" },
  { id: "sanitarios", nombre: "Servicios sanitarios" },
  { id: "accesos", nombre: "Accesos y circulación" },
  { id: "emergencias", nombre: "Seguridad y emergencias" },
  { id: "residuos", nombre: "Residuos y limpieza" },
  { id: "gastronomia", nombre: "Gastronomía" },
  { id: "estacionamiento", nombre: "Estacionamiento" },
  { id: "electricidad", nombre: "Electricidad" },
  { id: "agua-gas", nombre: "Agua y gas" },
  { id: "senalizacion", nombre: "Señalización" },
  { id: "vegetacion", nombre: "Vegetación" },
];
