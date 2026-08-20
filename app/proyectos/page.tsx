"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProject } from "@/hooks/useProject";

/** Pantalla 05 — Mis planos (HU-ORG-03). */
export default function MisProyectosPage() {
  const { proyectos, eliminar, duplicar } = useProject();

  return (
    <>
      <AppHeader />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Mis planos</h1>
            <p className="sub-lede">Administrá los planos de tus eventos y ferias.</p>
          </div>
          <Link className="btn btn-solid btn-lg" href="/proyectos/nuevo">
            + Nuevo plano
          </Link>
        </div>

        {proyectos.length === 0 ? (
          <div className="empty-state">
            <p>Todavía no creaste ningún plano.</p>
            <Link className="btn btn-solid" href="/proyectos/nuevo" style={{ marginTop: 16 }}>
              Crear mi primer plano
            </Link>
          </div>
        ) : (
          <div className="project-grid">
            {proyectos.map((p) => (
              <ProjectCard key={p.id} proyecto={p} onDuplicar={duplicar} onEliminar={eliminar} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
