import type { CapaTopoId, ResultadoImportacionTopo } from "@/types/topoexport";
import type { Predio } from "@/types/location";

/**
 * Integración con TopoExport — PRD §10. Llama a las rutas server-side
 * (app/api/topoexport/*), que a su vez llaman a la API real
 * (https://data.topoexport.com, ver lib/topoexport-client.ts). Sin
 * TOPOEXPORT_API_KEY configurada (.env.local), esas rutas devuelven 501 y
 * acá se lo reporta como "no disponible" en vez de simular datos falsos.
 */

export async function consultarDisponibilidad(
  predio: Pick<Predio, "latitud" | "longitud">
): Promise<{ disponible: boolean; capas: CapaTopoId[]; error?: string }> {
  try {
    const respuesta = await fetch("/api/topoexport/consultar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predio),
    });
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return { disponible: false, capas: [], error: datos.error ?? `Error ${respuesta.status}` };
    }
    return { disponible: datos.disponible, capas: datos.capas };
  } catch {
    return { disponible: false, capas: [], error: "No se pudo contactar a TopoExport." };
  }
}

export async function importarCapas(
  predio: Pick<Predio, "latitud" | "longitud">,
  capasSeleccionadas: CapaTopoId[]
): Promise<ResultadoImportacionTopo> {
  if (capasSeleccionadas.length === 0) {
    return { estado: "error", mensaje: "No se seleccionó ninguna capa.", capasImportadas: [] };
  }

  try {
    const respuesta = await fetch("/api/topoexport/importar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...predio, capas: capasSeleccionadas }),
    });
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return { estado: "error", mensaje: datos.error ?? `Error ${respuesta.status}`, capasImportadas: [] };
    }
    return datos as ResultadoImportacionTopo;
  } catch {
    return { estado: "error", mensaje: "No se pudo contactar a TopoExport.", capasImportadas: [] };
  }
}
