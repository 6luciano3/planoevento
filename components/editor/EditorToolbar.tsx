"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Eye,
  FileDown,
  MapPin,
  FileText,
  List,
  MousePointer2,
  Hand,
  Minus,
  Spline,
  Square,
  Circle,
  Pentagon,
  Type,
  Ruler,
  LayoutGrid,
  Library,
  SlidersHorizontal,
} from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { EDITOR_CONFIG } from "@/config/editor.config";
import { HERRAMIENTAS } from "@/editor/tools";
import { DistributeModal } from "./DistributeModal";
import type { HerramientaEditor } from "@/types/editor";
import type { EstadoGuardado } from "@/hooks/useAutosave";

interface EditorToolbarProps {
  proyectoId: string;
  proyectoNombre: string;
  estadoGuardado: EstadoGuardado;
  panelMovil?: "biblioteca" | "propiedades" | null;
  onToggleBiblioteca?: () => void;
  onTogglePropiedades?: () => void;
}

const ETIQUETA_GUARDADO: Record<EstadoGuardado, string> = {
  guardado: "Guardado",
  guardando: "Guardando…",
  sin_cambios: "Sin cambios pendientes",
};

const ICONO_HERRAMIENTA: Record<HerramientaEditor, typeof MousePointer2> = {
  seleccionar: MousePointer2,
  mover: Hand,
  linea: Minus,
  polilinea: Spline,
  rectangulo: Square,
  circulo: Circle,
  poligono: Pentagon,
  texto: Type,
  medir: Ruler,
};

/** Barra superior del editor — Pantalla 15, sección "Barra superior" del PRD. */
export function EditorToolbar({ proyectoId, proyectoNombre, estadoGuardado, panelMovil, onToggleBiblioteca, onTogglePropiedades }: EditorToolbarProps) {
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);
  const mostrarCuadricula = useEditorStore((s) => s.mostrarCuadricula);
  const toggleCuadricula = useEditorStore((s) => s.toggleCuadricula);
  const deshacer = useEditorStore((s) => s.deshacer);
  const rehacer = useEditorStore((s) => s.rehacer);
  const herramienta = useEditorStore((s) => s.herramienta);
  const setHerramienta = useEditorStore((s) => s.setHerramienta);
  const escalaNumerica = useEditorStore((s) => s.proyecto?.plano.escalaNumerica);
  const [distribuirAbierto, setDistribuirAbierto] = useState(false);

  return (
    <>
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <Link className="link-btn" href="/proyectos">
            ← Mis planos
          </Link>
          <strong className="editor-toolbar-title">{proyectoNombre}</strong>
          <span className="autosave-pill">{ETIQUETA_GUARDADO[estadoGuardado]}</span>
        </div>

        <div className="editor-toolbar-right">
          <Link className="link-btn" href={`/proyectos/${proyectoId}/ubicacion`} title="Ubicación">
            <MapPin size={16} /> <span className="editor-toolbar-link-label">Ubicación</span>
          </Link>
          <Link className="link-btn" href={`/proyectos/${proyectoId}/rotulo`} title="Rótulo">
            <FileText size={16} /> <span className="editor-toolbar-link-label">Rótulo</span>
          </Link>
          <Link className="link-btn" href={`/proyectos/${proyectoId}/leyenda`} title="Leyenda">
            <List size={16} /> <span className="editor-toolbar-link-label">Leyenda</span>
          </Link>
          <Link className="link-btn" href={`/proyectos/${proyectoId}/revision`} title="Revisar plano">
            <Eye size={16} /> <span className="editor-toolbar-link-label">Revisar plano</span>
          </Link>
          <Link className="btn btn-solid" href={`/proyectos/${proyectoId}/exportar`} title="Exportar PDF">
            <FileDown size={16} /> <span className="editor-toolbar-link-label">Exportar PDF</span>
          </Link>
        </div>
      </div>

      <div className="editor-tools-bar">
        <button
          className={`icon-btn editor-mobile-toggle ${panelMovil === "biblioteca" ? "icon-btn-active" : ""}`}
          onClick={onToggleBiblioteca}
          title="Biblioteca de componentes"
        >
          <Library size={17} />
        </button>

        <div className="editor-tools-group">
          {HERRAMIENTAS.map((h) => {
            const Icono = ICONO_HERRAMIENTA[h.id];
            return (
              <button
                key={h.id}
                className={`icon-btn ${herramienta === h.id ? "icon-btn-active" : ""}`}
                onClick={() => setHerramienta(h.id)}
                title={`${h.label}${h.atajo ? ` (${h.atajo})` : ""}`}
              >
                <Icono size={17} />
              </button>
            );
          })}
        </div>

        <span className="toolbar-sep" />

        <button className="icon-btn" onClick={deshacer} title="Deshacer (Ctrl+Z)">
          <Undo2 size={17} />
        </button>
        <button className="icon-btn" onClick={rehacer} title="Rehacer (Ctrl+Shift+Z)">
          <Redo2 size={17} />
        </button>
        <button className={`icon-btn ${mostrarCuadricula ? "icon-btn-active" : ""}`} onClick={toggleCuadricula} title="Mostrar cuadrícula">
          <Grid3x3 size={17} />
        </button>
        <button className="icon-btn" onClick={() => setDistribuirAbierto(true)} title="Distribuir y numerar elementos">
          <LayoutGrid size={17} />
        </button>

        <span className="toolbar-sep" />

        {escalaNumerica ? <span className="scale-value mono">1:{escalaNumerica}</span> : null}
        <button className="icon-btn" onClick={() => setZoom(Math.max(EDITOR_CONFIG.zoomMin, zoom - EDITOR_CONFIG.zoomStep))} title="Alejar">
          <ZoomOut size={17} />
        </button>
        <span className="zoom-value mono">{Math.round(zoom * 100)}%</span>
        <button className="icon-btn" onClick={() => setZoom(Math.min(EDITOR_CONFIG.zoomMax, zoom + EDITOR_CONFIG.zoomStep))} title="Acercar">
          <ZoomIn size={17} />
        </button>

        <button
          className={`icon-btn editor-mobile-toggle ${panelMovil === "propiedades" ? "icon-btn-active" : ""}`}
          onClick={onTogglePropiedades}
          title="Propiedades y capas"
        >
          <SlidersHorizontal size={17} />
        </button>
      </div>

      {distribuirAbierto ? <DistributeModal onCerrar={() => setDistribuirAbierto(false)} /> : null}
    </>
  );
}
