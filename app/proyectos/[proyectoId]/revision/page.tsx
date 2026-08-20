"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { obtenerProyecto } from "@/services/project.service";
import { ejecutarRevision } from "@/config/validation-rules";
import { useEffect, useState } from "react";
import type { ProyectoPlano } from "@/types/project";

/** Pantalla 21 — Revisión del plano (PRD §15, HU-ORG-36). Advierte, no aprueba. */
export default function RevisionPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const [proyecto, setProyecto] = useState<ProyectoPlano | null>(null);

  useEffect(() => {
    setProyecto(obtenerProyecto(proyectoId) ?? null);
  }, [proyectoId]);

  if (!proyecto) return <div className="editor-canvas-empty">Cargando…</div>;

  const items = ejecutarRevision(proyecto);
  const pendientes = items.filter((i) => !i.completado).length;

  return (
    <>
      <AppHeader volverA={`/proyectos/${proyectoId}/editor`} volverLabel="Volver al editor" />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Revisión del plano</h1>
            <p className="sub-lede">Comprobá que el documento tenga la información necesaria antes de exportarlo.</p>
          </div>
          <span className={pendientes === 0 ? "badge badge-completo" : "badge badge-borrador"}>
            {items.length - pendientes}/{items.length} completos
          </span>
        </div>

        <div className="review-list">
          {items.map((item) => (
            <div key={item.id} className={`review-item ${item.completado ? "review-item-ok" : "review-item-warn"}`}>
              <div>
                <strong>{item.descripcion}</strong>
                <p>{item.completado ? "Correcto." : item.mensaje}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="legal-strip" style={{ marginTop: 24, maxWidth: 760 }}>
          <p>
            Esta revisión verifica la presentación del documento. No certifica el cumplimiento de normativa ni
            garantiza su aprobación municipal.
          </p>
        </div>

        <div className="form-actions" style={{ marginTop: 24 }}>
          <Link className="btn btn-outline" href={`/proyectos/${proyectoId}/editor`}>
            Volver al editor
          </Link>
          <Link className="btn btn-solid" href={`/proyectos/${proyectoId}/exportar`}>
            Continuar a exportar
          </Link>
        </div>
      </div>
    </>
  );
}
