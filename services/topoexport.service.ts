import type { CapaTopoId, ResultadoImportacionTopo } from "@/types/topoexport";
import type { Predio } from "@/types/location";

/**
 * Integración con TopoExport — PRD §10 y Etapa 3 de la hoja de ruta.
 * Sin credenciales reales todavía (ver .env.example), así que esta función
 * simula el flujo descripto: consulta -> disponibilidad -> importación.
 * Cuando exista la API real, solo hay que reemplazar el cuerpo de
 * `consultarDisponibilidad` e `importarCapas` — la firma ya es la que usan
 * los componentes (hooks/useTopoExport.ts, app/proyectos/.../ubicacion).
 */

export async function consultarDisponibilidad(_predio: Pick<Predio, "latitud" | "longitud">): Promise<{
  disponible: boolean;
  capas: CapaTopoId[];
}> {
  await simularLatencia();
  return {
    disponible: true,
    capas: ["parcelas", "edificios", "calles", "arboles", "areas_verdes"],
  };
}

export async function importarCapas(
  _predio: Pick<Predio, "latitud" | "longitud">,
  capasSeleccionadas: CapaTopoId[]
): Promise<ResultadoImportacionTopo> {
  await simularLatencia();

  if (capasSeleccionadas.length === 0) {
    return { estado: "error", mensaje: "No se seleccionó ninguna capa.", capasImportadas: [] };
  }

  return {
    estado: "completo",
    mensaje: "La base geográfica fue obtenida correctamente.",
    capasImportadas: capasSeleccionadas,
    fechaImportacion: new Date().toISOString(),
  };
}

function simularLatencia(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
