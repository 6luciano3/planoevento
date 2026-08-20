import type { CategoriaSimbolo, DefinicionSimbolo } from "@/types/symbol";
import { INFRAESTRUCTURA } from "./categories/infraestructura";
import { SANITARIOS } from "./categories/sanitarios";
import { ACCESOS } from "./categories/accesos";
import { EMERGENCIAS } from "./categories/emergencias";
import { RESIDUOS } from "./categories/residuos";
import { GASTRONOMIA } from "./categories/gastronomia";
import { ESTACIONAMIENTO } from "./categories/estacionamiento";
import { ELECTRICIDAD } from "./categories/electricidad";
import { AGUA_GAS } from "./categories/agua-gas";
import { SENALIZACION } from "./categories/senalizacion";
import { VEGETACION } from "./categories/vegetacion";

/** Catálogo completo de la biblioteca — PRD §11, agrupado por categoría. */
export const SYMBOL_CATALOG: Record<CategoriaSimbolo, DefinicionSimbolo[]> = {
  infraestructura: INFRAESTRUCTURA,
  sanitarios: SANITARIOS,
  accesos: ACCESOS,
  emergencias: EMERGENCIAS,
  residuos: RESIDUOS,
  gastronomia: GASTRONOMIA,
  estacionamiento: ESTACIONAMIENTO,
  electricidad: ELECTRICIDAD,
  "agua-gas": AGUA_GAS,
  senalizacion: SENALIZACION,
  vegetacion: VEGETACION,
};

export const TODOS_LOS_SIMBOLOS: DefinicionSimbolo[] = Object.values(SYMBOL_CATALOG).flat();

export function buscarSimbolos(texto: string): DefinicionSimbolo[] {
  const q = texto.trim().toLowerCase();
  if (!q) return TODOS_LOS_SIMBOLOS;
  return TODOS_LOS_SIMBOLOS.filter((s) => s.nombre.toLowerCase().includes(q));
}

export function obtenerSimbolo(id: string): DefinicionSimbolo | undefined {
  return TODOS_LOS_SIMBOLOS.find((s) => s.id === id);
}
