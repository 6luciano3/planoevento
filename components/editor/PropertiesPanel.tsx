"use client";

import { useEditorStore } from "@/store/editor-store";

/** Panel derecho — Pantalla 16 "Propiedades del elemento" (PRD §13). */
export function PropertiesPanel() {
  const proyecto = useEditorStore((s) => s.proyecto);
  const seleccionId = useEditorStore((s) => s.seleccionId);
  const actualizarPropiedades = useEditorStore((s) => s.actualizarPropiedades);
  const eliminarSeleccionado = useEditorStore((s) => s.eliminarSeleccionado);
  const duplicarSeleccionado = useEditorStore((s) => s.duplicarSeleccionado);

  const objeto = proyecto?.objetos.find((o) => o.id === seleccionId);

  if (!objeto) {
    return (
      <aside className="properties-panel">
        <p className="properties-empty">Seleccioná un elemento del plano para ver y editar sus propiedades.</p>
      </aside>
    );
  }

  return (
    <aside className="properties-panel">
      <h3>{objeto.nombreVisible}</h3>
      {objeto.codigo ? <p className="mono properties-code">{objeto.codigo}</p> : null}

      <div className="field">
        <label>Nombre visible</label>
        <input
          className="input"
          value={objeto.nombreVisible}
          onChange={(e) => actualizarPropiedades(objeto.id, { nombreVisible: e.target.value })}
        />
      </div>

      <div className="properties-grid-2">
        <div className="field">
          <label>Ancho (m)</label>
          <input
            className="input"
            type="number"
            step={0.1}
            value={objeto.anchoM}
            onChange={(e) => actualizarPropiedades(objeto.id, { anchoM: Number(e.target.value) })}
          />
        </div>
        <div className="field">
          <label>Largo (m)</label>
          <input
            className="input"
            type="number"
            step={0.1}
            value={objeto.largoM}
            onChange={(e) => actualizarPropiedades(objeto.id, { largoM: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="field">
        <label>Rotación ({objeto.rotacionGrados}°)</label>
        <input
          type="range"
          min={0}
          max={359}
          value={objeto.rotacionGrados}
          onChange={(e) => actualizarPropiedades(objeto.id, { rotacionGrados: Number(e.target.value) })}
        />
      </div>

      <div className="field">
        <label>Color</label>
        <input
          className="input"
          type="color"
          value={objeto.color}
          onChange={(e) => actualizarPropiedades(objeto.id, { color: e.target.value })}
        />
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={objeto.mostrarNombre}
          onChange={(e) => actualizarPropiedades(objeto.id, { mostrarNombre: e.target.checked })}
        />
        <span>Mostrar nombre en el plano</span>
      </label>
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={objeto.mostrarMedidas}
          onChange={(e) => actualizarPropiedades(objeto.id, { mostrarMedidas: e.target.checked })}
        />
        <span>Mostrar medidas</span>
      </label>
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={objeto.bloqueado}
          onChange={(e) => actualizarPropiedades(objeto.id, { bloqueado: e.target.checked })}
        />
        <span>Bloquear</span>
      </label>

      <div className="properties-actions">
        <button className="btn btn-outline" onClick={duplicarSeleccionado}>
          Duplicar
        </button>
        <button className="btn btn-outline btn-danger" onClick={eliminarSeleccionado}>
          Eliminar
        </button>
      </div>
    </aside>
  );
}
