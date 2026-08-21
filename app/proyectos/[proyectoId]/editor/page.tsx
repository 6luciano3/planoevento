"use client";

import { useParams } from "next/navigation";
import { useEditor } from "@/hooks/useEditor";
import { useAutosave } from "@/hooks/useAutosave";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useDragStore } from "@/store/drag-store";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { SymbolLibrary } from "@/components/editor/SymbolLibrary";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { LayersPanel } from "@/components/editor/LayersPanel";
import { DragGhost } from "@/components/editor/DragGhost";
import { useEffect, useState } from "react";

type PanelMovil = "biblioteca" | "propiedades" | null;

/** Pantalla 15 — Editor principal. Ensambla toolbar, biblioteca, lienzo, propiedades y capas. */
export default function EditorPrincipalPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const { proyecto } = useEditor(proyectoId);
  const estadoGuardado = useAutosave();
  useKeyboardShortcuts();
  const [panelMovil, setPanelMovil] = useState<PanelMovil>(null);

  // Al empezar a arrastrar un símbolo (mouse o touch) se cierra el panel
  // móvil de la biblioteca para que se vea el lienzo por debajo.
  const arrastrando = useDragStore((s) => s.simboloId);
  useEffect(() => {
    if (arrastrando) setPanelMovil(null);
  }, [arrastrando]);

  if (!proyecto) {
    return <div className="editor-canvas-empty">Cargando plano…</div>;
  }

  function alternarPanel(panel: Exclude<PanelMovil, null>) {
    setPanelMovil((actual) => (actual === panel ? null : panel));
  }

  return (
    <div className="editor-shell">
      <EditorToolbar
        proyectoId={proyectoId}
        proyectoNombre={proyecto.evento.nombre || proyecto.nombre}
        estadoGuardado={estadoGuardado}
        panelMovil={panelMovil}
        onToggleBiblioteca={() => alternarPanel("biblioteca")}
        onTogglePropiedades={() => alternarPanel("propiedades")}
      />
      <div className="editor-body">
        <SymbolLibrary abierto={panelMovil === "biblioteca"} />
        <EditorCanvas />
        <div className={`editor-right-column ${panelMovil === "propiedades" ? "panel-abierto" : ""}`}>
          <PropertiesPanel />
          <LayersPanel />
        </div>
        {panelMovil ? <div className="editor-panel-backdrop" onClick={() => setPanelMovil(null)} /> : null}
      </div>
      <DragGhost />
    </div>
  );
}
