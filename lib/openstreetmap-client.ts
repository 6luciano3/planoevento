import type { CapaTopoId } from "@/types/topoexport";
import type { Coordenadas } from "@/types/location";

/**
 * Cliente del lado del servidor para datos reales de OpenStreetMap vía la
 * API pública de Overpass (https://overpass-api.de/api/interpreter) — sin
 * API key, gratuita. Reemplaza a TopoExport (que requería una cuenta paga
 * que este proyecto nunca tuvo) como fuente de la base geográfica.
 *
 * Documentación: https://wiki.openstreetmap.org/wiki/Overpass_API
 *
 * No todo lo que ofrecía TopoExport existe en OSM: no hay parcelas
 * catastrales ni relieve/elevación con cobertura confiable a nivel
 * mundial, así que esas dos capas no se ofrecen acá (quedan en
 * CapaTopoId por si algún día se suma otra fuente para ellas).
 */

const OVERPASS_URL = process.env.OVERPASS_API_URL || "https://lz4.overpass-api.de/api/interpreter";

const FILTRO_POR_CAPA: Partial<Record<CapaTopoId, string>> = {
  edificios: 'way["building"]',
  calles: 'way["highway"]',
  ferrocarriles: 'way["railway"]',
  cursos_agua: 'way["waterway"]',
  arboles: 'node["natural"="tree"]',
  areas_verdes: 'way["leisure"="park"]; way["landuse"~"grass|forest|meadow"]',
};

export const CAPAS_DISPONIBLES_OSM = Object.keys(FILTRO_POR_CAPA) as CapaTopoId[];

interface ElementoOverpass {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
  geometry?: { lat: number; lon: number }[];
}

/** Bbox a partir del polígono dibujado en la Pantalla 08, o un margen fijo alrededor del punto si todavía no se dibujó. */
export function bboxDelPredio(latitud: number, longitud: number, limite: Coordenadas[] = []): string {
  if (limite.length >= 3) {
    const lats = limite.map((p) => p.latitud);
    const lons = limite.map((p) => p.longitud);
    return `${Math.min(...lats)},${Math.min(...lons)},${Math.max(...lats)},${Math.max(...lons)}`;
  }
  const delta = 0.003;
  return `${latitud - delta},${longitud - delta},${latitud + delta},${longitud + delta}`;
}

async function consultarOverpassCrudo(query: string): Promise<{ elements: Record<string, unknown>[] }> {
  const respuesta = await fetch(OVERPASS_URL, {
    method: "POST",
    // El servidor de Overpass devuelve 406 si falta Accept o un User-Agent
    // identificable (lo exige explícitamente su política de uso).
    headers: {
      "Content-Type": "text/plain",
      Accept: "*/*",
      "User-Agent": "PlanoEvento/1.0 (+https://github.com/6luciano3/planoevento)",
    },
    body: query,
    signal: AbortSignal.timeout(25000),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => "");
    throw new Error(`Overpass respondió ${respuesta.status}: ${detalle.slice(0, 300)}`);
  }

  return respuesta.json();
}

async function consultarOverpass(query: string): Promise<ElementoOverpass[]> {
  const datos = await consultarOverpassCrudo(query);
  return (datos.elements as unknown as ElementoOverpass[]) ?? [];
}

/**
 * "out count;" siempre devuelve exactamente un elemento resumen (con el
 * conteo real en tags.total como string) — nunca cero elementos, aunque no
 * haya nada en el bbox. Por eso se lee ese campo en vez de la longitud del
 * array de elementos.
 */
async function contarElementos(query: string): Promise<number> {
  const datos = await consultarOverpassCrudo(query);
  const total = datos.elements?.[0] as { tags?: { total?: string } } | undefined;
  return Number(total?.tags?.total ?? 0);
}

/** Cuenta elementos por capa dentro del bbox, para mostrar qué hay disponible antes de importar. */
export async function contarCapasDisponibles(bbox: string): Promise<CapaTopoId[]> {
  const disponibles: CapaTopoId[] = [];
  await Promise.all(
    CAPAS_DISPONIBLES_OSM.map(async (capa) => {
      try {
        const total = await contarElementos(`[out:json][timeout:20][bbox:${bbox}];(${FILTRO_POR_CAPA[capa]};);out count;`);
        if (total > 0) disponibles.push(capa);
      } catch {
        // si Overpass falla para una capa puntual, simplemente no se ofrece
      }
    })
  );
  return disponibles;
}

function aGeoJSON(elementos: ElementoOverpass[]) {
  return {
    type: "FeatureCollection" as const,
    features: elementos
      .map((el) => {
        if (el.type === "node" && el.lat !== undefined && el.lon !== undefined) {
          return { type: "Feature", properties: el.tags ?? {}, geometry: { type: "Point", coordinates: [el.lon, el.lat] } };
        }
        if (el.geometry && el.geometry.length > 0) {
          return {
            type: "Feature",
            properties: el.tags ?? {},
            geometry: { type: "LineString", coordinates: el.geometry.map((p) => [p.lon, p.lat]) },
          };
        }
        return null;
      })
      .filter((f): f is NonNullable<typeof f> => f !== null),
  };
}

/** Trae las geometrías reales de una capa dentro del bbox, ya convertidas a GeoJSON. */
export async function obtenerCapaComoGeoJSON(capa: CapaTopoId, bbox: string) {
  const filtro = FILTRO_POR_CAPA[capa];
  if (!filtro) throw new Error(`La capa "${capa}" no está disponible desde OpenStreetMap.`);
  const elementos = await consultarOverpass(`[out:json][timeout:25][bbox:${bbox}];(${filtro};);out geom;`);
  return aGeoJSON(elementos);
}
