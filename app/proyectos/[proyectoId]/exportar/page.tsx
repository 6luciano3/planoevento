"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { obtenerProyecto } from "@/services/project.service";
import { generarLeyenda } from "@/services/plan.service";
import { exportarComoPdf } from "@/services/pdf.service";
import { formatearFecha } from "@/lib/formatters";
import type { ProyectoPlano } from "@/types/project";

/** Pantalla 22 — Vista previa, PDF e impresión (RF-18, RF-19, HU-ORG-38/39). */
export default function ExportarPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  const leyenda = generarLeyenda(proyecto);

  return (
    <>
      <div className="no-print">
        <AppHeader volverA={`/proyectos/${proyectoId}/revision`} volverLabel="Volver a revisión" />
        <div className="app-shell-head wrap" style={{ paddingTop: 24 }}>
          <div>
            <h1>Vista previa, PDF e impresión</h1>
            <p className="sub-lede">Así se verá exactamente el documento final.</p>
          </div>
          <button className="btn btn-solid btn-lg" onClick={exportarComoPdf}>
            Descargar PDF / Imprimir
          </button>
        </div>
      </div>

      <div className="print-sheet" style={{ maxWidth: 900, margin: "0 auto 60px", padding: 32 }}>
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

        <div className="editor-canvas-empty" style={{ border: "1px dashed var(--line-strong)", textAlign: "center", padding: 40 }}>
          [ Plano general — {proyecto.objetos.length} elementos colocados ]
        </div>

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

        <footer style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-faint)" }} className="mono">
          <span>Autor: {proyecto.plano.caratula.autor || "—"}</span>
          <span>Elaborado: {formatearFecha(proyecto.plano.caratula.fechaElaboracion)}</span>
        </footer>
      </div>
    </>
  );
}
