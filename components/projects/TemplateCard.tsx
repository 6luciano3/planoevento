"use client";

import {
  Store, UtensilsCrossed, BookOpen, Rocket, Wheat, Music, Gift, Palette,
  Building2, Cpu, ShoppingBag, Beer, PawPrint, PartyPopper, Car, LayoutTemplate, type LucideIcon,
} from "lucide-react";
import type { ObjetoPlantilla, PlantillaPlano } from "@/types/template";
import { CAPAS_INICIALES } from "@/config/layer-presets";

const ICONOS: Record<string, LucideIcon> = {
  Store, UtensilsCrossed, BookOpen, Rocket, Wheat, Music, Gift, Palette,
  Building2, Cpu, ShoppingBag, Beer, PawPrint, PartyPopper, Car,
};

const COLOR_POR_CAPA = new Map(CAPAS_INICIALES.map((c) => [c.nombre, c.color]));
const ANCHO_PREDIO_M = 60;
const ALTO_PREDIO_M = 40;

interface TemplateCardProps {
  plantilla: PlantillaPlano;
  onElegir: (plantilla: PlantillaPlano) => void;
}

/** Pantalla 14 — una tarjeta de plantilla con vista previa a escala de los símbolos ya ubicados. */
export function TemplateCard({ plantilla, onElegir }: TemplateCardProps) {
  const Icono = ICONOS[plantilla.icono] ?? LayoutTemplate;
  const objetosConForma = plantilla.objetos.filter((o): o is ObjetoPlantilla => !("tipo" in o));
  const cantidadStands = objetosConForma.filter((o) => o.capa === "Stands").length;

  return (
    <article className="project-card">
      <div className="project-card-thumb" aria-hidden="true">
        <svg viewBox={`0 0 ${ANCHO_PREDIO_M} ${ALTO_PREDIO_M}`}>
          <rect x={0} y={0} width={ANCHO_PREDIO_M} height={ALTO_PREDIO_M} fill="var(--paper-alt)" />
          {objetosConForma.map((o, i) => (
            <rect
              key={i}
              x={o.x}
              y={o.y}
              width={o.anchoM ?? 2}
              height={o.largoM ?? 2}
              fill={COLOR_POR_CAPA.get(o.capa) ?? "var(--ink-faint)"}
              opacity={0.85}
              rx={0.3}
            />
          ))}
        </svg>
      </div>
      <div className="project-card-body">
        <span className="badge badge-plantilla">
          <Icono size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />
          {plantilla.objetos.length} elementos
        </span>
        <h3>{plantilla.nombre}</h3>
        <p className="project-card-meta">{cantidadStands > 0 ? `${cantidadStands} stands · ` : ""}60m x 40m</p>
        <p className="field-hint">{plantilla.descripcion}</p>
        <div className="project-card-actions">
          <button className="btn btn-solid" onClick={() => onElegir(plantilla)}>
            Usar esta plantilla
          </button>
        </div>
      </div>
    </article>
  );
}
