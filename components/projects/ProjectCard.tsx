"use client";

import Link from "next/link";
import { Copy, Trash2 } from "lucide-react";
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
    <article className="project-card">
      <div className="project-card-thumb" aria-hidden="true">
        <svg viewBox="0 0 100 70">
          <rect x="0" y="0" width="100" height="70" fill="var(--good-soft)" />
          <circle cx="10" cy="10" r="4" fill="var(--good)" opacity="0.55" />
          <circle cx="92" cy="14" r="3.5" fill="var(--good)" opacity="0.55" />
          <circle cx="8" cy="58" r="3" fill="var(--good)" opacity="0.55" />
          <circle cx="94" cy="60" r="4" fill="var(--good)" opacity="0.55" />
          <rect x="16" y="22" width="13" height="11" rx="1.5" fill="var(--accent)" opacity="0.85" />
          <rect x="31" y="22" width="13" height="11" rx="1.5" fill="var(--accent)" opacity="0.85" />
          <rect x="46" y="22" width="13" height="11" rx="1.5" fill="var(--accent)" opacity="0.85" />
          <rect x="16" y="37" width="13" height="11" rx="1.5" fill="var(--accent)" opacity="0.85" />
          <rect x="31" y="37" width="13" height="11" rx="1.5" fill="var(--accent)" opacity="0.85" />
          <rect x="46" y="37" width="13" height="11" rx="1.5" fill="var(--accent)" opacity="0.85" />
          <circle cx="72" cy="28" r="5" fill="var(--info)" opacity="0.85" />
          <rect x="66" y="40" width="12" height="8" rx="1.5" fill="var(--danger)" opacity="0.75" />
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
          <button className="icon-btn" title="Duplicar" onClick={() => onDuplicar(proyecto.id)}>
            <Copy size={16} />
          </button>
          <button className="icon-btn icon-btn-danger" title="Eliminar" onClick={() => onEliminar(proyecto.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
