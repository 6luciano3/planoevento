"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { obtenerProyecto } from "@/services/project.service";
import { ejecutarRevision } from "@/config/validation-rules";
import { useEffect, useState } from "react";
import type { ProyectoPlano } from "@/types/project";
import type { CategoriaRevision, ItemRevision } from "@/types/plan";

const CATEGORIAS: { id: CategoriaRevision; label: string }[] = [
  { id: "documento", label: "Datos del documento" },
  { id: "distribucion", label: "Distribución del evento" },
  { id: "seguridad", label: "Seguridad y salida" },
];

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
  const porCategoria = (cat: CategoriaRevision): ItemRevision[] => items.filter((i) => i.categoria === cat);

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

        <div className="review-groups">
          {CATEGORIAS.map(({ id, label }) => {
            const deLaCategoria = porCategoria(id);
            if (deLaCategoria.length === 0) return null;
            const completos = deLaCategoria.filter((i) => i.completado).length;
            return (
              <div className="review-group" key={id}>
                <div className="review-group-head">
                  <h3>{label}</h3>
                  <span className="mono">
                    {completos}/{deLaCategoria.length}
                  </span>
                </div>
                <div className="review-list">
                  {deLaCategoria.map((item) => (
                    <div key={item.id} className={`review-item ${item.completado ? "review-item-ok" : "review-item-warn"}`}>
                      <div>
                        <strong>{item.descripcion}</strong>
                        <p>{item.completado ? "Correcto." : item.mensaje}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
