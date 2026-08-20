"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProject } from "@/hooks/useProject";
import type { EstadoProyecto } from "@/types/project";

const FILTROS_ESTADO: { id: EstadoProyecto | "TODOS"; label: string }[] = [
  { id: "TODOS", label: "Todos los estados" },
  { id: "BORRADOR", label: "Borrador" },
  { id: "COMPLETO", label: "Completo" },
  { id: "EXPORTADO", label: "PDF generado" },
];

/** Pantalla 05 — Mis planos (HU-ORG-03). */
export default function MisProyectosPage() {
  const { proyectos, eliminar, duplicar } = useProject();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<EstadoProyecto | "TODOS">("TODOS");

  const stats = useMemo(
    () => ({
      total: proyectos.length,
      borradores: proyectos.filter((p) => p.estado === "BORRADOR").length,
      completos: proyectos.filter((p) => p.estado === "COMPLETO").length,
      exportados: proyectos.filter((p) => p.estado === "EXPORTADO").length,
    }),
    [proyectos]
  );

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return proyectos.filter((p) => {
      const coincideEstado = filtroEstado === "TODOS" || p.estado === filtroEstado;
      const coincideTexto =
        !q ||
        p.evento.nombre.toLowerCase().includes(q) ||
        p.predio.localidad.toLowerCase().includes(q) ||
        p.predio.municipio.toLowerCase().includes(q);
      return coincideEstado && coincideTexto;
    });
  }, [proyectos, busqueda, filtroEstado]);

  return (
    <>
      <AppHeader />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Mis planos</h1>
            <p className="sub-lede">Administrá los planos de tus eventos y ferias.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link className="btn btn-outline btn-lg" href="/proyectos/plantillas">
              Elegir una plantilla
            </Link>
            <Link className="btn btn-solid btn-lg" href="/proyectos/nuevo">
              + Nuevo plano
            </Link>
          </div>
        </div>

        {proyectos.length === 0 ? (
          <div className="empty-state">
            <p>Todavía no creaste ningún plano.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
              <Link className="btn btn-solid" href="/proyectos/nuevo">
                Crear mi primer plano
              </Link>
              <Link className="btn btn-outline" href="/proyectos/plantillas">
                Empezar desde una plantilla
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="stats-row">
              <div className="stat-card">
                <strong>{stats.total}</strong>
                <span>Planos</span>
              </div>
              <div className="stat-card">
                <strong>{stats.borradores}</strong>
                <span>Borradores</span>
              </div>
              <div className="stat-card">
                <strong>{stats.completos}</strong>
                <span>Completos</span>
              </div>
              <div className="stat-card">
                <strong>{stats.exportados}</strong>
                <span>PDF generados</span>
              </div>
            </div>

            <div className="projects-toolbar">
              <input
                className="input"
                type="search"
                placeholder="Buscar por evento o ubicación…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <select
                className="input"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value as EstadoProyecto | "TODOS")}
              >
                {FILTROS_ESTADO.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {visibles.length === 0 ? (
              <p className="field-hint" style={{ marginTop: 20 }}>
                Ningún plano coincide con la búsqueda.
              </p>
            ) : (
              <div className="project-grid">
                {visibles.map((p) => (
                  <ProjectCard key={p.id} proyecto={p} onDuplicar={duplicar} onEliminar={eliminar} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
