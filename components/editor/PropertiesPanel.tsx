"use client";

import { useEditorStore } from "@/store/editor-store";
import { useLayers } from "@/hooks/useLayers";
import { FUENTES_TEXTO } from "@/config/fonts";

const COLORES_PRESET = ["#16A34A", "#EA580C", "#2563EB", "#7C3AED", "#DC2626", "#475569"];

/** Panel derecho — Pantalla 16 "Propiedades del elemento" (PRD §13). */
export function PropertiesPanel() {
  const proyecto = useEditorStore((s) => s.proyecto);
  const seleccionId = useEditorStore((s) => s.seleccionId);
  const actualizarPropiedades = useEditorStore((s) => s.actualizarPropiedades);
  const eliminarSeleccionado = useEditorStore((s) => s.eliminarSeleccionado);
  const duplicarSeleccionado = useEditorStore((s) => s.duplicarSeleccionado);
  const { capas } = useLayers();

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

      <section className="properties-section">
        <h4>Identificación</h4>
        {objeto.codigo ? (
          <div className="field">
            <label>Código</label>
            <p className="mono properties-code">{objeto.codigo}</p>
          </div>
        ) : null}
        <div className="field">
          <label>Nombre visible</label>
          <input
            className="input"
            value={objeto.nombreVisible}
            onChange={(e) => actualizarPropiedades(objeto.id, { nombreVisible: e.target.value })}
          />
        </div>
      </section>

      {objeto.tipo === "texto" ? (
        <section className="properties-section">
          <h4>Texto</h4>
          <div className="field">
            <label>Contenido</label>
            <input
              className="input"
              value={objeto.contenido ?? ""}
              onChange={(e) => actualizarPropiedades(objeto.id, { contenido: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Tipografía</label>
            <select
              className="input"
              value={objeto.fontFamily ?? FUENTES_TEXTO[0].fontFamily}
              onChange={(e) => actualizarPropiedades(objeto.id, { fontFamily: e.target.value })}
            >
              {FUENTES_TEXTO.map((f) => (
                <option key={f.id} value={f.fontFamily} style={{ fontFamily: f.fontFamily }}>
                  {f.nombre}
                </option>
              ))}
            </select>
          </div>
        </section>
      ) : null}

      <section className="properties-section">
        <h4>Posición y dimensiones</h4>
        <div className="properties-grid-2">
          <div className="field">
            <label>X (m)</label>
            <input
              className="input"
              type="number"
              step={0.1}
              value={Math.round(objeto.posicion.x * 10) / 10}
              onChange={(e) => actualizarPropiedades(objeto.id, { posicion: { ...objeto.posicion, x: Number(e.target.value) } })}
            />
          </div>
          <div className="field">
            <label>Y (m)</label>
            <input
              className="input"
              type="number"
              step={0.1}
              value={Math.round(objeto.posicion.y * 10) / 10}
              onChange={(e) => actualizarPropiedades(objeto.id, { posicion: { ...objeto.posicion, y: Number(e.target.value) } })}
            />
          </div>
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
      </section>

      <section className="properties-section">
        <h4>Presentación</h4>
        <div className="field">
          <label>Color</label>
          <div className="color-swatch-row">
            {COLORES_PRESET.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-swatch-btn ${objeto.color === c ? "color-swatch-btn-active" : ""}`}
                style={{ background: c }}
                onClick={() => actualizarPropiedades(objeto.id, { color: c })}
                aria-label={c}
              />
            ))}
            <input
              className="color-swatch-custom"
              type="color"
              value={objeto.color}
              onChange={(e) => actualizarPropiedades(objeto.id, { color: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label>Opacidad ({objeto.transparencia}%)</label>
          <input
            type="range"
            min={10}
            max={100}
            value={objeto.transparencia}
            onChange={(e) => actualizarPropiedades(objeto.id, { transparencia: Number(e.target.value) })}
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
      </section>

      <section className="properties-section">
        <h4>Organización</h4>
        <div className="field">
          <label>Capa</label>
          <select
            className="input"
            value={objeto.capaId}
            onChange={(e) => actualizarPropiedades(objeto.id, { capaId: e.target.value })}
          >
            {capas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={objeto.bloqueado}
            onChange={(e) => actualizarPropiedades(objeto.id, { bloqueado: e.target.checked })}
          />
          <span>Bloquear posición</span>
        </label>
      </section>

      <section className="properties-section">
        <h4>Acciones</h4>
        <div className="properties-actions">
          <button className="btn btn-outline" onClick={duplicarSeleccionado}>
            Duplicar
          </button>
          <button className="btn btn-outline btn-danger" onClick={eliminarSeleccionado}>
            Eliminar
          </button>
        </div>
      </section>
    </aside>
  );
}
