"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, Plus, Printer } from "lucide-react";
import { useLayers } from "@/hooks/useLayers";
import { useEditorStore } from "@/store/editor-store";

/** Panel de capas — Pantalla 18 (PRD §14, HU-ORG-27). */
export function LayersPanel() {
  const { capas, alternarVisibilidad, alternarBloqueo, actualizarCapa, crearCapa, eliminarCapa, ocultarTodas, bloquearTodas, restablecerCapas } =
    useLayers();
  const capaActivaId = useEditorStore((s) => s.capaActivaId);
  const setCapaActiva = useEditorStore((s) => s.setCapaActiva);
  const [busqueda, setBusqueda] = useState("");
  const [nombreNueva, setNombreNueva] = useState("");
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);
  const [expandidaId, setExpandidaId] = useState<string | null>(null);

  const ordenadas = [...capas]
    .sort((a, b) => a.orden - b.orden)
    .filter((c) => c.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()));

  function alCrear(e: React.FormEvent) {
    e.preventDefault();
    if (!nombreNueva.trim()) return;
    crearCapa(nombreNueva);
    setNombreNueva("");
  }

  function alEliminar(id: string) {
    const res = eliminarCapa(id);
    setErrorEliminar(res.ok ? null : res.motivo ?? "No se pudo eliminar la capa.");
  }

  return (
    <div className="layers-panel">
      <div className="layers-panel-head">
        <h4>Capas del plano</h4>
        <span className="field-hint">{capas.length} capas</span>
      </div>

      <form className="layer-new-form" onSubmit={alCrear}>
        <input
          className="input"
          placeholder="Nueva capa…"
          value={nombreNueva}
          onChange={(e) => setNombreNueva(e.target.value)}
        />
        <button type="submit" className="icon-btn" title="Crear capa">
          <Plus size={16} />
        </button>
      </form>

      <input
        className="input"
        type="search"
        placeholder="Buscar capa…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: 8 }}
      />

      {errorEliminar ? <p className="form-error" style={{ marginBottom: 8 }}>{errorEliminar}</p> : null}

      <ul>
        {ordenadas.map((capa) => {
          const esActiva = capa.id === capaActivaId;
          const expandida = capa.id === expandidaId;
          return (
            <li key={capa.id} className="layer-row-wrap">
              <div
                className={`layer-row ${esActiva ? "layer-row-active" : ""}`}
                onClick={() => {
                  setCapaActiva(capa.id);
                  setExpandidaId(expandida ? null : capa.id);
                }}
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
              </div>

              {expandida ? (
                <div className="layer-detail">
                  <div className="field">
                    <label>Nombre de la capa</label>
                    <input className="input" value={capa.nombre} onChange={(e) => actualizarCapa(capa.id, { nombre: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Color de capa</label>
                    <input
                      className="color-swatch-custom"
                      type="color"
                      value={capa.color}
                      onChange={(e) => actualizarCapa(capa.id, { color: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Transparencia ({capa.transparencia}%)</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={capa.transparencia}
                      onChange={(e) => actualizarCapa(capa.id, { transparencia: Number(e.target.value) })}
                    />
                  </div>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={capa.incluirEnImpresion}
                      onChange={(e) => actualizarCapa(capa.id, { incluirEnImpresion: e.target.checked })}
                    />
                    <Printer size={14} /> <span>Incluir al imprimir/exportar</span>
                  </label>
                  {!capa.esBase ? (
                    <button className="btn btn-outline btn-danger" style={{ marginTop: 6 }} onClick={() => alEliminar(capa.id)}>
                      Eliminar capa
                    </button>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
        {ordenadas.length === 0 ? <p className="field-hint">Ninguna capa coincide con la búsqueda.</p> : null}
      </ul>

      <div className="layer-bulk-actions">
        <button className="btn btn-ghost" onClick={ocultarTodas}>
          Ocultar todas
        </button>
        <button className="btn btn-ghost" onClick={bloquearTodas}>
          Bloquear todas
        </button>
        <button className="btn btn-ghost" onClick={restablecerCapas}>
          Restablecer
        </button>
      </div>
    </div>
  );
}
