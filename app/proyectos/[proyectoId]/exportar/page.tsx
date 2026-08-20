"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { obtenerProyecto, guardarProyecto } from "@/services/project.service";
import { generarLeyenda } from "@/services/plan.service";
import { exportarComoPdf } from "@/services/pdf.service";
import { formatearFecha } from "@/lib/formatters";
import { PAPER_SIZES } from "@/config/paper-sizes";
import type { ProyectoPlano } from "@/types/project";
import type { TamanoHoja, Orientacion } from "@/types/plan";

type Apariencia = "color" | "grises" | "byn";

const FILTRO_APARIENCIA: Record<Apariencia, string> = {
  color: "none",
  grises: "grayscale(1)",
  byn: "grayscale(1) contrast(1.6)",
};

/** Pantalla 22 — Vista previa, PDF e impresión (RF-18, RF-19, HU-ORG-38/39). */
export default function ExportarPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);
  const [apariencia, setApariencia] = useState<Apariencia>("color");
  const [incluirCaratula, setIncluirCaratula] = useState(true);
  const [incluirLeyenda, setIncluirLeyenda] = useState(true);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  const leyenda = generarLeyenda(proyecto);

  function actualizarHoja(cambios: Partial<ProyectoPlano["plano"]["hoja"]>) {
    setProyecto((actual) => {
      if (!actual) return actual;
      const actualizado = { ...actual, plano: { ...actual.plano, hoja: { ...actual.plano.hoja, ...cambios } } };
      guardarProyecto(actualizado);
      return actualizado;
    });
  }

  return (
    <>
      <div className="no-print">
        <AppHeader volverA={`/proyectos/${proyectoId}/revision`} volverLabel="Volver a revisión" />
        <div className="app-shell-head wrap" style={{ paddingTop: 24 }}>
          <div>
            <h1>Vista previa, PDF e impresión</h1>
            <p className="sub-lede">Así se verá exactamente el documento final.</p>
          </div>
        </div>
      </div>

      <div className="export-layout wrap">
        <div className="print-sheet" style={{ filter: FILTRO_APARIENCIA[apariencia] }}>
          {incluirCaratula ? (
            <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20 }}>{proyecto.plano.caratula.tituloPlano}</h2>
                <p className="mono" style={{ color: "var(--ink-soft)", marginTop: 4 }}>{proyecto.evento.nombre}</p>
              </div>
              <div className="mono" style={{ textAlign: "right", fontSize: 12, color: "var(--ink-soft)" }}>
                <div>Escala {proyecto.plano.caratula.escala}</div>
                <div>Hoja {proyecto.plano.hoja.tamano} · {proyecto.plano.hoja.orientacion.toLowerCase()}</div>
              </div>
            </header>
          ) : null}

          <div
            className="editor-canvas-empty"
            style={{
              border: "1px dashed var(--line-strong)",
              textAlign: "center",
              padding: 40,
              backgroundImage: proyecto.plano.hoja.mostrarCuadricula
                ? "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)"
                : "none",
              backgroundSize: "24px 24px",
            }}
          >
            [ Plano general — {proyecto.objetos.length} elementos colocados ]
          </div>

          {incluirLeyenda ? (
            <section style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 14, marginBottom: 10 }}>Referencias</h3>
              {leyenda.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--ink-faint)" }}>Todavía no hay elementos con código en el plano.</p>
              ) : (
                <table className="mono" style={{ width: "100%", fontSize: 12.5, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ textAlign: "left", borderBottom: "1px solid var(--line)" }}>
                      <th style={{ padding: "6px 8px" }}>Código</th>
                      <th style={{ padding: "6px 8px" }}>Referencia</th>
                      <th style={{ padding: "6px 8px" }}>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leyenda.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid var(--line)" }}>
                        <td style={{ padding: "6px 8px" }}>{item.codigo}</td>
                        <td style={{ padding: "6px 8px" }}>{item.nombre}</td>
                        <td style={{ padding: "6px 8px" }}>{item.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ) : null}

          {incluirCaratula ? (
            <footer style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-faint)" }} className="mono">
              <span>Autor: {proyecto.plano.caratula.autor || "—"}</span>
              <span>Elaborado: {formatearFecha(proyecto.plano.caratula.fechaElaboracion)}</span>
            </footer>
          ) : null}
        </div>

        <aside className="export-config no-print">
          <h3 style={{ fontSize: 14, marginBottom: 4 }}>Configuración de salida</h3>

          <div className="field">
            <label>Tamaño de hoja</label>
            <select
              className="input"
              value={proyecto.plano.hoja.tamano}
              onChange={(e) => {
                const tamano = e.target.value as TamanoHoja;
                const def = PAPER_SIZES.find((p) => p.id === tamano);
                if (!def) return;
                const horizontal = proyecto.plano.hoja.orientacion === "HORIZONTAL";
                actualizarHoja({ tamano, anchoMm: horizontal ? def.heightMm : def.widthMm, altoMm: horizontal ? def.widthMm : def.heightMm });
              }}
            >
              {PAPER_SIZES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Orientación</label>
            <div className="properties-grid-2">
              {(["HORIZONTAL", "VERTICAL"] as Orientacion[]).map((o) => (
                <button
                  key={o}
                  type="button"
                  className={`wizard-source-card ${proyecto.plano.hoja.orientacion === o ? "wizard-source-card-active" : ""}`}
                  style={{ padding: 10 }}
                  onClick={() => {
                    const { anchoMm, altoMm } = proyecto.plano.hoja;
                    actualizarHoja({ orientacion: o, anchoMm: altoMm, altoMm: anchoMm });
                  }}
                >
                  <strong style={{ fontSize: 13 }}>{o === "HORIZONTAL" ? "Horizontal" : "Vertical"}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Apariencia</label>
            <select className="input" value={apariencia} onChange={(e) => setApariencia(e.target.value as Apariencia)}>
              <option value="color">Color</option>
              <option value="grises">Escala de grises</option>
              <option value="byn">Blanco y negro</option>
            </select>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={proyecto.plano.hoja.mostrarCuadricula}
              onChange={(e) => actualizarHoja({ mostrarCuadricula: e.target.checked })}
            />
            <span>Mostrar cuadrícula</span>
          </label>
          <label className="checkbox-row">
            <input type="checkbox" checked={incluirCaratula} onChange={(e) => setIncluirCaratula(e.target.checked)} />
            <span>Incluir carátula</span>
          </label>
          <label className="checkbox-row">
            <input type="checkbox" checked={incluirLeyenda} onChange={(e) => setIncluirLeyenda(e.target.checked)} />
            <span>Incluir leyenda</span>
          </label>

          <button className="btn btn-solid btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={exportarComoPdf}>
            Descargar PDF / Imprimir
          </button>
        </aside>
      </div>
    </>
  );
}
