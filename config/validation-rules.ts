import type { ProyectoPlano } from "@/types/project";
import type { ItemRevision } from "@/types/plan";

/**
 * Reglas de revisión — PRD §15 "Reglas de validación" / Pantalla 09.
 * Son advertencias de preparación, nunca una aprobación municipal.
 */
export function ejecutarRevision(proyecto: ProyectoPlano): ItemRevision[] {
  const objetosPorTipo = (codigoPrefijo: string) =>
    proyecto.objetos.filter((o) => o.codigo?.startsWith(codigoPrefijo));

  const checks: ItemRevision[] = [
    {
      id: "caratula",
      descripcion: "Carátula completa",
      completado: Boolean(proyecto.plano.caratula.tituloPlano && proyecto.plano.caratula.escala),
      mensaje: "Falta completar el título o la escala de la carátula.",
    },
    {
      id: "escala",
      descripcion: "Escala indicada",
      completado: proyecto.plano.escalaNumerica > 0,
      mensaje: "No se indicó una escala para el plano.",
    },
    {
      id: "norte",
      descripcion: "Orientación norte",
      completado: proyecto.objetos.some((o) => o.simboloId === "flecha-norte"),
      mensaje: "No se encontró una flecha norte en el plano.",
    },
    {
      id: "predio",
      descripcion: "Límite del predio visible",
      completado: proyecto.predio.limite.length >= 3,
      mensaje: "El límite del predio no está definido.",
    },
    {
      id: "entrada",
      descripcion: "Al menos una entrada",
      completado: objetosPorTipo("EN").length > 0,
      mensaje: "No se encontró ninguna entrada marcada.",
    },
    {
      id: "salida",
      descripcion: "Al menos una salida",
      completado: objetosPorTipo("SA").length > 0 || objetosPorTipo("SE").length > 0,
      mensaje: "No se encontró ninguna salida marcada.",
    },
    {
      id: "emergencias",
      descripcion: "Salidas de emergencia identificadas",
      completado: objetosPorTipo("SE").length > 0,
      mensaje: "No hay salidas de emergencia representadas.",
    },
    {
      id: "banos",
      descripcion: "Baños identificados",
      completado: objetosPorTipo("BA").length > 0,
      mensaje: "No se encontraron baños en el plano.",
    },
    {
      id: "leyenda",
      descripcion: "Elementos con referencia en la leyenda",
      completado: proyecto.objetos.length === 0 || proyecto.objetos.some((o) => Boolean(o.codigo)),
      mensaje: "Ningún elemento tiene código para la leyenda.",
    },
  ];

  return checks;
}
