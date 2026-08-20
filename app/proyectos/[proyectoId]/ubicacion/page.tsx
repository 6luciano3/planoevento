"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { obtenerProyecto, guardarProyecto } from "@/services/project.service";
import type { ProyectoPlano } from "@/types/project";
import type { Coordenadas } from "@/types/location";

const LocationMap = dynamic(() => import("@/components/map/LocationMap").then((m) => m.LocationMap), {
  ssr: false,
  loading: () => <div className="location-map-canvas" />,
});

/** Pantalla 08 — Ubicación del predio (PRD §10, HU-ORG-07/08). */
export default function UbicacionPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const router = useRouter();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  function actualizarPredio(cambios: { latitud: number; longitud: number; limite: Coordenadas[]; superficieM2?: number }) {
    setProyecto((actual) => {
      if (!actual) return actual;
      return {
        ...actual,
        predio: {
          ...actual.predio,
          latitud: cambios.latitud,
          longitud: cambios.longitud,
          limite: cambios.limite,
          superficieM2: cambios.superficieM2 ?? actual.predio.superficieM2,
        },
      };
    });
    setGuardado(false);
  }

  function guardar() {
    if (!proyecto) return;
    guardarProyecto(proyecto);
    setGuardado(true);
  }

  return (
    <>
      <AppHeader volverA={`/proyectos/${proyectoId}/editor`} volverLabel="Volver al editor" />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Ubicación del predio</h1>
            <p className="sub-lede">
              Buscá la dirección, hacé clic para marcar el predio y dibujá su límite si lo conocés.
            </p>
          </div>
          <button className="btn btn-solid" onClick={guardar}>
            {guardado ? "Guardado ✓" : "Guardar ubicación"}
          </button>
        </div>

        <p className="field-hint" style={{ marginBottom: 12 }}>
          {proyecto.predio.direccion || proyecto.predio.nombre
            ? `${proyecto.predio.nombre}${proyecto.predio.direccion ? " — " + proyecto.predio.direccion : ""}, ${proyecto.predio.municipio}, ${proyecto.predio.provincia}`
            : "Todavía no cargaste una dirección de referencia en los datos del proyecto."}
        </p>

        <LocationMap
          latitud={proyecto.predio.latitud}
          longitud={proyecto.predio.longitud}
          limite={proyecto.predio.limite}
          onCambiar={actualizarPredio}
        />

        <div className="form-actions" style={{ marginTop: 20, justifyContent: "space-between" }}>
          <span className="field-hint">
            {proyecto.predio.limite.length >= 3
              ? `Límite dibujado · ${proyecto.predio.limite.length} vértices${proyecto.predio.superficieM2 ? ` · ~${Math.round(proyecto.predio.superficieM2).toLocaleString("es-AR")} m²` : ""}`
              : "Sin límite dibujado todavía — se puede exportar igual usando solo el punto marcado."}
          </span>
          <button className="btn btn-outline" onClick={() => router.push(`/proyectos/${proyectoId}/editor`)}>
            Volver al editor
          </button>
        </div>
      </div>
    </>
  );
}
