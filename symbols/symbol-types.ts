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
  { id: "mobiliario-urbano", nombre: "Mobiliario urbano" },
  { id: "personas", nombre: "Personas y flujo" },
  { id: "stands", nombre: "Stands" },
  { id: "senderos-tierra", nombre: "Senderos de tierra" },
  { id: "caminos-pavimentados", nombre: "Caminos pavimentados" },
  { id: "calles-vehiculares", nombre: "Calles vehiculares" },
  { id: "cerramientos", nombre: "Cerramientos y accesos" },
  { id: "superficies", nombre: "Superficies y bases" },
];
