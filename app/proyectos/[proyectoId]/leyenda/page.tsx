"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { obtenerProyecto, guardarProyecto } from "@/services/project.service";
import { generarLeyenda } from "@/services/plan.service";
import type { ProyectoPlano } from "@/types/project";

/** Pantalla 20 — Leyenda (PRD §16, "Configurar símbolos y referencias", HU-ORG-35). */
export default function LeyendaPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  const leyenda = generarLeyenda(proyecto);

  function alternar(id: string) {
    setProyecto((actual) => {
      if (!actual) return actual;
      const ocultos = new Set(actual.leyendaOcultos ?? []);
      if (ocultos.has(id)) ocultos.delete(id);
      else ocultos.add(id);
      const actualizado = { ...actual, leyendaOcultos: Array.from(ocultos) };
      guardarProyecto(actualizado);
      return actualizado;
    });
  }

  const visibles = leyenda.filter((i) => i.visible).length;

  return (
    <>
      <AppHeader volverA={`/proyectos/${proyectoId}/editor`} volverLabel="Volver al editor" />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Leyenda</h1>
            <p className="sub-lede">
              Se genera automáticamente a partir de los elementos con código en el plano. Ocultá las referencias que
              no quieras que aparezcan en el PDF.
            </p>
          </div>
          <span className="badge badge-completo">
            {visibles}/{leyenda.length} visibles
          </span>
        </div>

        {leyenda.length === 0 ? (
          <div className="empty-state">
            <p>Todavía no hay elementos con código en el plano. Arrastrá componentes desde la biblioteca del editor.</p>
          </div>
        ) : (
          <table className="mono" style={{ width: "100%", maxWidth: 760, fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--line)" }}>
                <th style={{ padding: "8px" }}>Mostrar</th>
                <th style={{ padding: "8px" }}>Código</th>
                <th style={{ padding: "8px" }}>Referencia</th>
                <th style={{ padding: "8px" }}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {leyenda.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--line)", opacity: item.visible ? 1 : 0.5 }}>
                  <td style={{ padding: "8px" }}>
                    <button className="icon-btn icon-btn-sm" onClick={() => alternar(item.id)} title={item.visible ? "Ocultar" : "Mostrar"}>
                      {item.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </td>
                  <td style={{ padding: "8px" }}>{item.codigo}</td>
                  <td style={{ padding: "8px", fontFamily: '"Inter", sans-serif' }}>{item.nombre}</td>
                  <td style={{ padding: "8px" }}>{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="form-actions" style={{ marginTop: 24, maxWidth: 760 }}>
          <span className="field-hint">Los cambios se guardan automáticamente.</span>
        </div>
      </div>
    </>
  );
}
