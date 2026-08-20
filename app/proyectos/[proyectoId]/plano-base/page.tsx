"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe2, Upload } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { WizardSteps } from "@/components/layout/WizardSteps";
import { obtenerProyecto, guardarProyecto } from "@/services/project.service";
import { useOpenStreetMap } from "@/hooks/useOpenStreetMap";
import { importarArchivo, extensionValida } from "@/services/file.service";
import type { ProyectoPlano } from "@/types/project";
import type { CapaTopoId } from "@/types/topoexport";

const ETIQUETAS_CAPA: Record<CapaTopoId, string> = {
  parcelas: "Parcelas",
  edificios: "Edificios",
  calles: "Calles",
  ferrocarriles: "Ferrocarriles",
  cursos_agua: "Cursos de agua",
  arboles: "Árboles",
  areas_verdes: "Áreas verdes",
  terreno: "Terreno",
};
const TODAS_LAS_CAPAS = Object.keys(ETIQUETAS_CAPA) as CapaTopoId[];

/** Pantalla 09/10/11 — Plano base, paso 3/4 del asistente (PRD §10, HU-ORG-09/HU-ORG-04). */
export default function PlanoBasePage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const router = useRouter();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);
  const [origen, setOrigen] = useState<"openstreetmap" | "archivo_propio">("openstreetmap");
  const [capasElegidas, setCapasElegidas] = useState<Set<CapaTopoId>>(new Set());
  const [archivo, setArchivo] = useState<{ nombre: string } | null>(null);
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
  const inputArchivoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  const osm = useOpenStreetMap(
    proyecto ? { latitud: proyecto.predio.latitud, longitud: proyecto.predio.longitud, limite: proyecto.predio.limite } : { latitud: 0, longitud: 0 }
  );

  useEffect(() => {
    if (proyecto && origen === "openstreetmap") osm.consultar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proyecto?.id]);

  useEffect(() => {
    setCapasElegidas(new Set(osm.capasDisponibles));
  }, [osm.capasDisponibles]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  function alternarCapa(id: CapaTopoId) {
    setCapasElegidas((actual) => {
      const nuevo = new Set(actual);
      if (nuevo.has(id)) nuevo.delete(id);
      else nuevo.add(id);
      return nuevo;
    });
  }

  async function alSeleccionarArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!extensionValida(file.name)) {
      setErrorArchivo("Formato no admitido. Usá PNG, JPG, PDF, SVG o GeoJSON.");
      return;
    }
    setErrorArchivo(null);
    const importado = await importarArchivo(file);
    setArchivo({ nombre: importado.nombre });
  }

  async function continuarConOpenStreetMap() {
    if (!proyecto) return;
    const resultado = await osm.importar(Array.from(capasElegidas));
    guardarProyecto({
      ...proyecto,
      base: {
        origen: "openstreetmap",
        capasTopo: resultado.capasImportadas,
        estadoImportacion: resultado.estado,
      },
    });
    router.push(`/proyectos/${proyectoId}/editor`);
  }

  function continuarConArchivo() {
    if (!proyecto || !archivo) return;
    guardarProyecto({
      ...proyecto,
      base: { origen: "archivo_propio", capasTopo: [], archivoNombre: archivo.nombre },
    });
    router.push(`/proyectos/${proyectoId}/editor`);
  }

  function omitir() {
    if (!proyecto) return;
    guardarProyecto({ ...proyecto, base: { origen: "ninguna", capasTopo: [] } });
    router.push(`/proyectos/${proyectoId}/editor`);
  }

  return (
    <>
      <AppHeader volverA={`/proyectos/${proyectoId}/ubicacion?wizard=1`} volverLabel="Volver a ubicación" />
      <div className="app-shell">
        <WizardSteps actual={3} />
        <h1>Configurar plano base</h1>
        <p className="sub-lede">Elegí la información geográfica que querés incorporar, o importá un plano propio.</p>

        <div className="wizard-source-grid">
          <button
            type="button"
            className={`wizard-source-card ${origen === "openstreetmap" ? "wizard-source-card-active" : ""}`}
            onClick={() => setOrigen("openstreetmap")}
          >
            <Globe2 size={20} />
            <strong>Obtener con OpenStreetMap</strong>
            <span>Edificios, calles, cursos de agua y árboles reales del predio elegido — gratis, sin cuenta.</span>
          </button>
          <button
            type="button"
            className={`wizard-source-card ${origen === "archivo_propio" ? "wizard-source-card-active" : ""}`}
            onClick={() => setOrigen("archivo_propio")}
          >
            <Upload size={20} />
            <strong>Importar mi propio plano</strong>
            <span>Subí un PNG, JPG, PDF, SVG o GeoJSON existente del predio.</span>
          </button>
        </div>

        {origen === "openstreetmap" ? (
          <div>
            {osm.consultando ? <p className="field-hint">Consultando OpenStreetMap…</p> : null}
            {!osm.consultando && osm.capasDisponibles.length === 0 ? (
              <div className="callout-info" style={{ borderColor: "var(--warn)", background: "var(--warn-soft)", color: "var(--warn)" }}>
                {osm.error
                  ? `No se pudo consultar OpenStreetMap: ${osm.error}`
                  : "OpenStreetMap no tiene datos mapeados para esta ubicación todavía."}{" "}
                Podés importar un plano propio o continuar sin base geográfica y agregarla más adelante.
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 14, marginBottom: 10 }}>Capas disponibles</h3>
                <div className="capa-topo-grid">
                  {TODAS_LAS_CAPAS.filter((id) => osm.capasDisponibles.includes(id)).map((id) => (
                    <label className="capa-topo-item" key={id}>
                      <input type="checkbox" checked={capasElegidas.has(id)} onChange={() => alternarCapa(id)} />
                      {ETIQUETAS_CAPA[id]}
                    </label>
                  ))}
                </div>
                <p className="field-hint" style={{ marginTop: 10 }}>
                  Datos de © colaboradores de OpenStreetMap, vía la API pública de Overpass.
                </p>
              </>
            )}
          </div>
        ) : (
          <div>
            <input
              ref={inputArchivoRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.svg,.geojson,.json"
              style={{ display: "none" }}
              onChange={alSeleccionarArchivo}
            />
            <button className="btn btn-outline" onClick={() => inputArchivoRef.current?.click()}>
              <Upload size={16} /> Seleccionar archivo
            </button>
            {archivo ? <p className="field-hint" style={{ marginTop: 10 }}>Cargado: {archivo.nombre}</p> : null}
            {errorArchivo ? <p className="form-error" style={{ marginTop: 10 }}>{errorArchivo}</p> : null}
          </div>
        )}

        <div className="form-actions" style={{ marginTop: 28, justifyContent: "space-between" }}>
          <button className="btn btn-ghost" onClick={omitir}>
            Omitir por ahora
          </button>
          {origen === "openstreetmap" ? (
            <button className="btn btn-solid" onClick={continuarConOpenStreetMap} disabled={capasElegidas.size === 0}>
              Importar capas y continuar
            </button>
          ) : (
            <button className="btn btn-solid" onClick={continuarConArchivo} disabled={!archivo}>
              Continuar al editor
            </button>
          )}
        </div>
      </div>
    </>
  );
}
