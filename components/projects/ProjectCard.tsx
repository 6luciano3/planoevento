import Link from "next/link";
import type { ProyectoPlano } from "@/types/project";
import { formatearFechaHora } from "@/lib/formatters";
import { ESTADOS_PROYECTO_LABEL } from "@/lib/constants";

interface ProjectCardProps {
  proyecto: ProyectoPlano;
  onDuplicar: (id: string) => void;
  onEliminar: (id: string) => void;
}

/** Pantalla 05 — "Mis planos": una tarjeta por proyecto. */
export function ProjectCard({ proyecto, onDuplicar, onEliminar }: ProjectCardProps) {
  return (
    <article className="project-card ticked">
      <span className="tick-bl"></span>
      <span className="tick-br"></span>
      <div className="project-card-thumb" aria-hidden="true">
        <svg viewBox="0 0 100 70">
          <rect x="4" y="4" width="92" height="62" fill="none" stroke="var(--line-strong)" strokeDasharray="3 3" />
          <rect x="16" y="16" width="14" height="12" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.8" />
          <rect x="34" y="16" width="14" height="12" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.8" />
          <rect x="52" y="16" width="14" height="12" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="0.8" />
          <circle cx="24" cy="46" r="4" fill="none" stroke="var(--good)" strokeWidth="0.8" />
          <circle cx="70" cy="46" r="4" fill="none" stroke="var(--ink-faint)" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="project-card-body">
        <span className={`badge badge-${proyecto.estado.toLowerCase()}`}>{ESTADOS_PROYECTO_LABEL[proyecto.estado]}</span>
        <h3>{proyecto.evento.nombre || proyecto.nombre}</h3>
        <p className="project-card-meta">
          {proyecto.predio.localidad || "Sin ubicación"} · {formatearFechaHora(proyecto.fechaModificacion)}
        </p>
        <div className="project-card-actions">
          <Link className="btn btn-outline" href={`/proyectos/${proyecto.id}/editor`}>
            Abrir plano
          </Link>
          <button className="btn btn-ghost" onClick={() => onDuplicar(proyecto.id)}>
            Duplicar
          </button>
          <button className="btn btn-ghost btn-danger" onClick={() => onEliminar(proyecto.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
