"use client";

import { Eye, EyeOff, Lock, Unlock } from "lucide-react";
import { useLayers } from "@/hooks/useLayers";
import { useEditorStore } from "@/store/editor-store";

/** Panel de capas — Pantalla 18 (PRD §14, HU-ORG-27). */
export function LayersPanel() {
  const { capas, alternarVisibilidad, alternarBloqueo } = useLayers();
  const capaActivaId = useEditorStore((s) => s.capaActivaId);
  const setCapaActiva = useEditorStore((s) => s.setCapaActiva);

  const ordenadas = [...capas].sort((a, b) => a.orden - b.orden);

  return (
    <div className="layers-panel">
      <h4>Capas</h4>
      <ul>
        {ordenadas.map((capa) => (
          <li
            key={capa.id}
            className={`layer-row ${capa.id === capaActivaId ? "layer-row-active" : ""}`}
            onClick={() => !capa.esBase && setCapaActiva(capa.id)}
          >
            <span className="layer-color" style={{ background: capa.color }} aria-hidden="true" />
            <span className="layer-name">{capa.nombre}</span>
            <button
              className="icon-btn icon-btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                alternarVisibilidad(capa.id);
              }}
              title={capa.visible ? "Ocultar" : "Mostrar"}
            >
              {capa.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button
              className="icon-btn icon-btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                alternarBloqueo(capa.id);
              }}
              title={capa.bloqueada ? "Desbloquear" : "Bloquear"}
              disabled={capa.esBase}
            >
              {capa.bloqueada ? <Lock size={14} /> : <Unlock size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
