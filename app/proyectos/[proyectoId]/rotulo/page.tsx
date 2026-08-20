"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Input } from "@/components/ui/Input";
import { obtenerProyecto, guardarProyecto } from "@/services/project.service";
import { formatearFecha } from "@/lib/formatters";
import type { ProyectoPlano } from "@/types/project";
import type { Caratula } from "@/types/plan";

/** Pantalla 19 — Rótulo (PRD §16, "Completá el rótulo técnico"). */
export default function RotuloPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  function actualizar(cambios: Partial<Caratula>) {
    setProyecto((actual) => {
      if (!actual) return actual;
      return { ...actual, plano: { ...actual.plano, caratula: { ...actual.plano.caratula, ...cambios } } };
    });
    setGuardado(false);
  }

  function guardar() {
    if (!proyecto) return;
    guardarProyecto(proyecto);
    setGuardado(true);
  }

  const c = proyecto.plano.caratula;

  return (
    <>
      <AppHeader volverA={`/proyectos/${proyectoId}/editor`} volverLabel="Volver al editor" />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Rótulo y carátula</h1>
            <p className="sub-lede">Completá la información que va a aparecer en la hoja impresa y en el PDF.</p>
          </div>
          <button className="btn btn-solid" onClick={guardar}>
            {guardado ? "Guardado ✓" : "Guardar"}
          </button>
        </div>

        <div className="export-layout">
          <div>
            <section className="properties-section" style={{ borderTop: "none", paddingTop: 0 }}>
              <h4>Identificación del plano</h4>
              <Input id="titulo-plano" label="Título del plano" value={c.tituloPlano} onChange={(e) => actualizar({ tituloPlano: e.target.value })} />
              <div className="properties-grid-2">
                <Input id="numero-plano" label="Número de plano" value={c.numeroPlano} onChange={(e) => actualizar({ numeroPlano: e.target.value })} />
                <Input id="version-plano" label="Versión" value={c.version} onChange={(e) => actualizar({ version: e.target.value })} />
              </div>
            </section>

            <section className="properties-section">
              <h4>Organizador</h4>
              <div className="properties-grid-2">
                <Input id="autor-plano" label="Autor" value={c.autor} onChange={(e) => actualizar({ autor: e.target.value })} />
                <Input
                  id="documento-organizador"
                  label="CUIT / Documento"
                  value={c.documentoOrganizador}
                  onChange={(e) => actualizar({ documentoOrganizador: e.target.value })}
                />
              </div>
            </section>

            <section className="properties-section">
              <h4>Ubicación y fecha</h4>
              <Input id="ubicacion-plano" label="Ubicación / predio" value={c.ubicacion} onChange={(e) => actualizar({ ubicacion: e.target.value })} />
              <div className="properties-grid-2">
                <Input id="municipio-plano" label="Municipio" value={c.municipio} onChange={(e) => actualizar({ municipio: e.target.value })} />
                <Input id="provincia-plano" label="Provincia" value={c.provincia} onChange={(e) => actualizar({ provincia: e.target.value })} />
                <Input
                  id="fecha-evento-plano"
                  label="Fecha del evento"
                  type="date"
                  value={c.fechaEvento}
                  onChange={(e) => actualizar({ fechaEvento: e.target.value })}
                />
                <Input id="horario-plano" label="Horario" value={c.horario} onChange={(e) => actualizar({ horario: e.target.value })} />
              </div>
            </section>

            <section className="properties-section">
              <h4>Información técnica</h4>
              <div className="properties-grid-2">
                <Input
                  id="superficie-plano"
                  label="Superficie"
                  value={c.superficie}
                  onChange={(e) => actualizar({ superficie: e.target.value })}
                  placeholder="Ej: 3.200 m²"
                />
                <Input id="escala-plano" label="Escala" value={c.escala} onChange={(e) => actualizar({ escala: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="observaciones-plano">Observaciones</label>
                <textarea
                  id="observaciones-plano"
                  className="input"
                  rows={3}
                  value={c.observaciones}
                  onChange={(e) => actualizar({ observaciones: e.target.value })}
                />
              </div>
            </section>
          </div>

          <aside className="export-config no-print">
            <h3 style={{ fontSize: 14, marginBottom: 4 }}>Vista previa del rótulo</h3>
            <div className="print-sheet" style={{ padding: 16, fontSize: 12.5 }}>
              <strong style={{ display: "block", fontSize: 15 }}>{c.tituloPlano || "Sin título"}</strong>
              <p className="mono" style={{ color: "var(--ink-soft)", marginTop: 4 }}>{proyecto.evento.nombre}</p>
              <div className="mono" style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4, color: "var(--ink-soft)" }}>
                <span>Organizador: {c.autor || "—"}</span>
                <span>Ubicación: {c.ubicacion || "—"}{c.municipio ? `, ${c.municipio}` : ""}{c.provincia ? `, ${c.provincia}` : ""}</span>
                <span>Fecha: {c.fechaEvento ? formatearFecha(c.fechaEvento) : "—"} {c.horario ? `· ${c.horario}` : ""}</span>
                <span>Escala: {c.escala || "—"} · Plano: {c.numeroPlano || "—"} · Versión: {c.version || "—"}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
