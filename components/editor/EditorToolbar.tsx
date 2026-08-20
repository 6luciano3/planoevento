"use client";

import Link from "next/link";
import { Undo2, Redo2, ZoomIn, ZoomOut, Grid3x3, Eye, FileDown } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { EDITOR_CONFIG } from "@/config/editor.config";
import type { EstadoGuardado } from "@/hooks/useAutosave";

interface EditorToolbarProps {
  proyectoId: string;
  proyectoNombre: string;
  estadoGuardado: EstadoGuardado;
}

const ETIQUETA_GUARDADO: Record<EstadoGuardado, string> = {
  guardado: "Guardado",
  guardando: "Guardando…",
  sin_cambios: "Sin cambios pendientes",
};

/** Barra superior del editor — Pantalla 15, sección "Barra superior" del PRD. */
export function EditorToolbar({ proyectoId, proyectoNombre, estadoGuardado }: EditorToolbarProps) {
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);
  const mostrarCuadricula = useEditorStore((s) => s.mostrarCuadricula);
  const toggleCuadricula = useEditorStore((s) => s.toggleCuadricula);
  const deshacer = useEditorStore((s) => s.deshacer);
  const rehacer = useEditorStore((s) => s.rehacer);

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-left">
        <Link className="link-btn" href="/proyectos">
          ← Mis planos
        </Link>
        <strong className="editor-toolbar-title">{proyectoNombre}</strong>
        <span className="autosave-pill">{ETIQUETA_GUARDADO[estadoGuardado]}</span>
      </div>

      <div className="editor-toolbar-center">
        <button className="icon-btn" onClick={deshacer} title="Deshacer (Ctrl+Z)">
          <Undo2 size={17} />
        </button>
        <button className="icon-btn" onClick={rehacer} title="Rehacer (Ctrl+Shift+Z)">
          <Redo2 size={17} />
        </button>
        <span className="toolbar-sep" />
        <button className="icon-btn" onClick={() => setZoom(Math.max(EDITOR_CONFIG.zoomMin, zoom - EDITOR_CONFIG.zoomStep))} title="Alejar">
          <ZoomOut size={17} />
        </button>
        <span className="zoom-value mono">{Math.round(zoom * 100)}%</span>
        <button className="icon-btn" onClick={() => setZoom(Math.min(EDITOR_CONFIG.zoomMax, zoom + EDITOR_CONFIG.zoomStep))} title="Acercar">
          <ZoomIn size={17} />
        </button>
        <button className={`icon-btn ${mostrarCuadricula ? "icon-btn-active" : ""}`} onClick={toggleCuadricula} title="Mostrar cuadrícula">
          <Grid3x3 size={17} />
        </button>
      </div>

      <div className="editor-toolbar-right">
        <Link className="link-btn" href={`/proyectos/${proyectoId}/revision`}>
          <Eye size={16} /> Revisar plano
        </Link>
        <Link className="btn btn-solid" href={`/proyectos/${proyectoId}/exportar`}>
          <FileDown size={16} /> Exportar PDF
        </Link>
      </div>
    </div>
  );
}
