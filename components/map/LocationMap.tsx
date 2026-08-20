"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import type { Coordenadas } from "@/types/location";

// Los íconos default de Leaflet apuntan a rutas relativas que el bundler de
// Next.js no resuelve — se reemplazan por los del CDN oficial, como
// recomienda la documentación de Leaflet para bundlers modernos.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CENTRO_ARGENTINA: [number, number] = [-38.4161, -63.6167];

interface LocationMapProps {
  latitud: number;
  longitud: number;
  limite: Coordenadas[];
  onCambiar: (cambios: { latitud: number; longitud: number; limite: Coordenadas[]; superficieM2?: number }) => void;
}

interface ResultadoBusqueda {
  display_name: string;
  lat: string;
  lon: string;
}

/**
 * Pantalla 08 — Ubicación del predio (HU-ORG-07/08). Leaflet plano (sin
 * react-leaflet) para no depender de wrappers de React sin mantenimiento
 * reciente sobre leaflet-draw. Geocodifica con Nominatim (OpenStreetMap) —
 * es el servicio público gratuito, pero su política de uso pide poco
 * volumen; para un uso con más tráfico conviene un proveedor propio.
 */
export function LocationMap({ latitud, longitud, limite, onCambiar }: LocationMapProps) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<L.Map | null>(null);
  const marcadorRef = useRef<L.Marker | null>(null);
  const capaDibujoRef = useRef<L.FeatureGroup | null>(null);
  const onCambiarRef = useRef(onCambiar);
  onCambiarRef.current = onCambiar;

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<ResultadoBusqueda[]>([]);
  const [buscando, setBuscando] = useState(false);

  const tienePunto = latitud !== 0 || longitud !== 0;

  const moverMarcador = useCallback((lat: number, lon: number) => {
    if (!mapaRef.current) return;
    if (marcadorRef.current) {
      marcadorRef.current.setLatLng([lat, lon]);
    } else {
      marcadorRef.current = L.marker([lat, lon], { draggable: true }).addTo(mapaRef.current);
      marcadorRef.current.on("dragend", () => {
        const pos = marcadorRef.current!.getLatLng();
        onCambiarRef.current({ latitud: pos.lat, longitud: pos.lng, limite });
      });
    }
  }, [limite]);

  useEffect(() => {
    if (!contenedorRef.current || mapaRef.current) return;

    const mapa = L.map(contenedorRef.current).setView(
      tienePunto ? [latitud, longitud] : CENTRO_ARGENTINA,
      tienePunto ? 17 : 4
    );
    mapaRef.current = mapa;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapa);

    const capaDibujo = new L.FeatureGroup();
    capaDibujoRef.current = capaDibujo;
    mapa.addLayer(capaDibujo);

    if (limite.length >= 3) {
      const poligono = L.polygon(limite.map((c) => [c.latitud, c.longitud] as [number, number]));
      capaDibujo.addLayer(poligono);
    }

    const controlDibujo = new L.Control.Draw({
      position: "topright",
      draw: {
        polygon: { allowIntersection: false, showArea: true, shapeOptions: { color: "#C2410C" } },
        marker: false,
        circle: false,
        circlemarker: false,
        polyline: false,
        rectangle: false,
      },
      edit: { featureGroup: capaDibujo, remove: true },
    });
    mapa.addControl(controlDibujo);

    function limiteDesdeCapa(): Coordenadas[] {
      const capas = capaDibujo.getLayers();
      if (capas.length === 0) return [];
      const poligono = capas[0] as L.Polygon;
      const anillo = (poligono.getLatLngs()[0] as L.LatLng[]) ?? [];
      return anillo.map((p) => ({ latitud: p.lat, longitud: p.lng }));
    }

    function superficieDesdeCapa(): number | undefined {
      const capas = capaDibujo.getLayers();
      if (capas.length === 0) return undefined;
      const poligono = capas[0] as L.Polygon;
      const anillo = poligono.getLatLngs()[0] as L.LatLng[];
      const geometryUtil = (L as unknown as { GeometryUtil?: { geodesicArea: (l: L.LatLng[]) => number } }).GeometryUtil;
      return geometryUtil ? Math.round(geometryUtil.geodesicArea(anillo)) : undefined;
    }

    mapa.on(L.Draw.Event.CREATED, (e) => {
      capaDibujo.clearLayers(); // un solo polígono de límite a la vez
      capaDibujo.addLayer((e as L.DrawEvents.Created).layer);
      onCambiarRef.current({ latitud, longitud, limite: limiteDesdeCapa(), superficieM2: superficieDesdeCapa() });
    });
    mapa.on(L.Draw.Event.EDITED, () => {
      onCambiarRef.current({ latitud, longitud, limite: limiteDesdeCapa(), superficieM2: superficieDesdeCapa() });
    });
    mapa.on(L.Draw.Event.DELETED, () => {
      onCambiarRef.current({ latitud, longitud, limite: [] });
    });

    mapa.on("click", (e: L.LeafletMouseEvent) => {
      moverMarcador(e.latlng.lat, e.latlng.lng);
      onCambiarRef.current({ latitud: e.latlng.lat, longitud: e.latlng.lng, limite: limiteDesdeCapa() });
    });

    if (tienePunto) moverMarcador(latitud, longitud);

    return () => {
      mapa.remove();
      mapaRef.current = null;
      marcadorRef.current = null;
    };
    // Solo se inicializa una vez; los cambios posteriores de latitud/longitud
    // los maneja el efecto de abajo para no recrear el mapa en cada drag.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapaRef.current || !tienePunto) return;
    moverMarcador(latitud, longitud);
  }, [latitud, longitud, tienePunto, moverMarcador]);

  async function buscarDireccion(e: React.FormEvent) {
    e.preventDefault();
    if (!busqueda.trim()) return;
    setBuscando(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(busqueda)}`;
      const respuesta = await fetch(url);
      const datos: ResultadoBusqueda[] = await respuesta.json();
      setResultados(datos);
    } catch {
      setResultados([]);
    } finally {
      setBuscando(false);
    }
  }

  function elegirResultado(r: ResultadoBusqueda) {
    const lat = parseFloat(r.lat);
    const lon = parseFloat(r.lon);
    setResultados([]);
    setBusqueda(r.display_name);
    mapaRef.current?.setView([lat, lon], 17);
    moverMarcador(lat, lon);
    onCambiarRef.current({ latitud: lat, longitud: lon, limite });
  }

  return (
    <div className="location-map">
      <form className="location-map-search" onSubmit={buscarDireccion}>
        <input
          type="text"
          placeholder="Buscar dirección o localidad…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button type="submit" className="btn btn-outline" disabled={buscando}>
          {buscando ? "Buscando…" : "Buscar"}
        </button>
        {resultados.length > 0 ? (
          <ul className="location-map-results">
            {resultados.map((r, i) => (
              <li key={i}>
                <button type="button" onClick={() => elegirResultado(r)}>
                  {r.display_name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </form>
      <div ref={contenedorRef} className="location-map-canvas" />
      <p className="location-map-hint">
        Hacé clic en el mapa para ubicar el predio, o usá la herramienta de polígono (arriba a la derecha del
        mapa) para dibujar su límite exacto. © colaboradores de OpenStreetMap.
      </p>
    </div>
  );
}
