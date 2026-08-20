"use client";

import { useParams } from "next/navigation";
import type { DragEvent } from "react";
import { useEditor } from "@/hooks/useEditor";
import { useAutosave } from "@/hooks/useAutosave";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { SymbolLibrary } from "@/components/editor/SymbolLibrary";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { LayersPanel } from "@/components/editor/LayersPanel";
import { useRef } from "react";

/** Pantalla 15 — Editor principal. Ensambla toolbar, biblioteca, lienzo, propiedades y capas. */
export default function EditorPrincipalPage() {
  const { proyectoId } = useParams<{ proyectoId: string }>();
  const { proyecto } = useEditor(proyectoId);
  const estadoGuardado = useAutosave();
  useKeyboardShortcuts();

  // El propio lienzo administra su drop-zone; acá solo necesitamos el
  // iniciador de arrastre para conectarlo con la biblioteca lateral.
  const lienzoRefDummy = useRef<HTMLDivElement>(null);
  const { iniciarArrastre } = useDragAndDrop(lienzoRefDummy);

  if (!proyecto) {
    return <div className="editor-canvas-empty">Cargando plano…</div>;
  }

  return (
    <div className="editor-shell">
      <EditorToolbar proyectoId={proyectoId} proyectoNombre={proyecto.evento.nombre || proyecto.nombre} estadoGuardado={estadoGuardado} />
      <div className="editor-body">
        <SymbolLibrary onArrastrarInicio={(e: DragEvent<HTMLElement>, id: string) => iniciarArrastre(e, id)} />
        <EditorCanvas />
        <div className="editor-right-column">
          <PropertiesPanel />
          <LayersPanel />
        </div>
      </div>
    </div>
  );
}
