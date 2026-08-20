import type { CapaTopoId, ResultadoImportacionTopo } from "@/types/topoexport";
import type { Predio, Coordenadas } from "@/types/location";

/**
 * Base geográfica del predio — PRD §10 (originalmente pensado para
 * TopoExport, un servicio pago al que nunca se tuvo acceso). Usa datos
 * reales y gratuitos de OpenStreetMap en su lugar, vía las rutas
 * server-side app/api/openstreetmap/* (que a su vez llaman a Overpass).
 */

type PredioParaConsulta = Pick<Predio, "latitud" | "longitud"> & { limite?: Coordenadas[] };

export async function consultarDisponibilidad(
  predio: PredioParaConsulta
): Promise<{ disponible: boolean; capas: CapaTopoId[]; error?: string }> {
  try {
    const respuesta = await fetch("/api/openstreetmap/consultar", {
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
    return { disponible: false, capas: [], error: "No se pudo contactar a OpenStreetMap." };
  }
}

export async function importarCapas(
  predio: PredioParaConsulta,
  capasSeleccionadas: CapaTopoId[]
): Promise<ResultadoImportacionTopo> {
  if (capasSeleccionadas.length === 0) {
    return { estado: "error", mensaje: "No se seleccionó ninguna capa.", capasImportadas: [] };
  }

  try {
    const respuesta = await fetch("/api/openstreetmap/importar", {
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
    return { estado: "error", mensaje: "No se pudo contactar a OpenStreetMap.", capasImportadas: [] };
  }
}
