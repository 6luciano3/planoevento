import type { CapaTopoId } from "@/types/topoexport";

/**
 * Cliente del lado del servidor para la API real de TopoExport
 * (https://data.topoexport.com). Documentación verificada navegando la
 * página de docs (Scalar) el 2026-08-20:
 *
 * GET /lookup?bbox=min_lon,min_lat,max_lon,max_lat
 *   Header: Authorization: Bearer <TOPOEXPORT_API_KEY>
 *   200 → { region: {...}, datasets: [{ id, type, minYear, maxYear, product: {...} }] }
 *   401 → API key inválida u origen no autorizado
 *
 * GET /datasets/{id} y GET /datasets/{id}/features existen (confirmado en
 * el índice de la doc), pero no pude expandir sus parámetros exactos desde
 * la UI de Scalar sin una cuenta real. `obtenerFeaturesDataset` asume el
 * mismo parámetro `bbox` que /lookup — si TopoExport responde 400, el
 * mensaje de error de la propia API debería decir qué parámetro falta;
 * ajustar acá cuando se confirme contra una cuenta real.
 *
 * El único `type` de dataset confirmado en la doc es "BUILDINGS_2D"; el
 * resto de TIPOS_POR_CAPA es un mapeo por palabra clave, no una lista
 * cerrada verificada — revisar cuando haya una respuesta real de /lookup.
 */

const TIPOS_POR_CAPA: Record<CapaTopoId, string[]> = {
  parcelas: ["PARCEL", "CADAST"],
  edificios: ["BUILDING"],
  calles: ["ROAD", "STREET"],
  ferrocarriles: ["RAIL"],
  cursos_agua: ["WATER", "RIVER", "HYDRO"],
  arboles: ["TREE"],
  areas_verdes: ["GREEN", "VEGETATION", "PARK"],
  terreno: ["TERRAIN", "ELEVATION", "DTM", "DSM"],
};

interface DatasetTopo {
  id: string;
  type: string;
  minYear?: number;
  maxYear?: number;
  product?: { name?: string; licence?: string; publisher?: { name?: string } };
}

interface RespuestaLookup {
  region: { id: string; name: string; isoCode: string };
  datasets: DatasetTopo[];
}

export class TopoExportNoConfigurado extends Error {
  constructor() {
    super("TOPOEXPORT_API_KEY no está configurada.");
    this.name = "TopoExportNoConfigurado";
  }
}

function baseUrlYClave() {
  const baseUrl = process.env.TOPOEXPORT_API_URL || "https://data.topoexport.com";
  const apiKey = process.env.TOPOEXPORT_API_KEY;
  if (!apiKey) throw new TopoExportNoConfigurado();
  return { baseUrl, apiKey };
}

/** Bbox aproximado alrededor de un punto — hasta que exista la Pantalla 08 (dibujar el área real). */
function bboxDesdePunto(latitud: number, longitud: number, deltaGrados = 0.003): string {
  const minLon = longitud - deltaGrados;
  const minLat = latitud - deltaGrados;
  const maxLon = longitud + deltaGrados;
  const maxLat = latitud + deltaGrados;
  return `${minLon},${minLat},${maxLon},${maxLat}`;
}

export async function buscarDatasetsDisponibles(latitud: number, longitud: number) {
  const { baseUrl, apiKey } = baseUrlYClave();
  const bbox = bboxDesdePunto(latitud, longitud);

  const respuesta = await fetch(`${baseUrl}/lookup?bbox=${encodeURIComponent(bbox)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => "");
    throw new Error(`TopoExport /lookup respondió ${respuesta.status}: ${detalle.slice(0, 300)}`);
  }

  const datos = (await respuesta.json()) as RespuestaLookup;
  return { bbox, region: datos.region, datasets: datos.datasets ?? [] };
}

export function mapearCapasDisponibles(datasets: DatasetTopo[]): CapaTopoId[] {
  const capas = new Set<CapaTopoId>();
  for (const dataset of datasets) {
    const tipo = dataset.type?.toUpperCase() ?? "";
    for (const [capaId, palabrasClave] of Object.entries(TIPOS_POR_CAPA) as [CapaTopoId, string[]][]) {
      if (palabrasClave.some((palabra) => tipo.includes(palabra))) capas.add(capaId);
    }
  }
  return Array.from(capas);
}

export async function obtenerFeaturesDataset(datasetId: string, bbox: string) {
  const { baseUrl, apiKey } = baseUrlYClave();
  const respuesta = await fetch(
    `${baseUrl}/datasets/${encodeURIComponent(datasetId)}/features?bbox=${encodeURIComponent(bbox)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => "");
    throw new Error(`TopoExport /datasets/${datasetId}/features respondió ${respuesta.status}: ${detalle.slice(0, 300)}`);
  }

  return respuesta.json();
}
