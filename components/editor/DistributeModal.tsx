"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SYMBOL_CATALOG, obtenerSimbolo } from "@/symbols/symbol-catalog";
import { useEditorStore } from "@/store/editor-store";

const TODOS_LOS_SIMBOLOS = Object.values(SYMBOL_CATALOG).flat();

interface DistributeModalProps {
  onCerrar: () => void;
}

/** Pantalla "Distribuir y numerar elementos" — HU-ORG-28/29 (fila o cuadrícula con numeración automática). */
export function DistributeModal({ onCerrar }: DistributeModalProps) {
  const distribuirSimbolo = useEditorStore((s) => s.distribuirSimbolo);
  const [simboloId, setSimboloId] = useState(TODOS_LOS_SIMBOLOS[0]?.id ?? "");
  const [filas, setFilas] = useState(2);
  const [columnas, setColumnas] = useState(5);
  const [sepH, setSepH] = useState(1.5);
  const [sepV, setSepV] = useState(4);
  const [creado, setCreado] = useState<number | null>(null);

  const def = obtenerSimbolo(simboloId);
  const total = Math.max(0, filas) * Math.max(0, columnas);

  function crear() {
    const cantidad = distribuirSimbolo(simboloId, { x: 4, y: 4 }, filas, columnas, sepH, sepV);
    setCreado(cantidad);
    setTimeout(onCerrar, 900);
  }

  return (
    <div className="modal-backdrop" onClick={onCerrar}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Distribuir y numerar elementos</h3>
          <button className="icon-btn" onClick={onCerrar} title="Cerrar">
            <X size={18} />
          </button>
        </div>
        <p className="sub-lede" style={{ marginBottom: 16 }}>
          Creá una fila o cuadrícula de componentes con separación uniforme.
        </p>

        <div className="field">
          <label>Componente</label>
          <select className="input" value={simboloId} onChange={(e) => setSimboloId(e.target.value)}>
            {TODOS_LOS_SIMBOLOS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre} · {s.defaultWidth}×{s.defaultHeight} m
              </option>
            ))}
          </select>
        </div>

        <div className="properties-grid-2">
          <div className="field">
            <label>Filas</label>
            <input className="input" type="number" min={1} max={20} value={filas} onChange={(e) => setFilas(Number(e.target.value))} />
          </div>
          <div className="field">
            <label>Columnas</label>
            <input className="input" type="number" min={1} max={20} value={columnas} onChange={(e) => setColumnas(Number(e.target.value))} />
          </div>
          <div className="field">
            <label>Separación horizontal (m)</label>
            <input className="input" type="number" step={0.1} min={0} value={sepH} onChange={(e) => setSepH(Number(e.target.value))} />
          </div>
          <div className="field">
            <label>Separación vertical (m)</label>
            <input className="input" type="number" step={0.1} min={0} value={sepV} onChange={(e) => setSepV(Number(e.target.value))} />
          </div>
        </div>

        {def ? (
          <p className="field-hint" style={{ marginTop: 4 }}>
            Ocupa aproximadamente {(columnas * (def.defaultWidth + sepH) - sepH).toFixed(1)}×
            {(filas * (def.defaultHeight + sepV) - sepV).toFixed(1)} m · numeración {def.prefijo}-01 a {def.prefijo}-
            {String(total).padStart(2, "0")}.
          </p>
        ) : null}

        <div className="form-actions" style={{ marginTop: 20 }}>
          <button className="btn btn-outline" onClick={onCerrar}>
            Cancelar
          </button>
          <button className="btn btn-solid" onClick={crear} disabled={total < 1 || !simboloId}>
            {creado !== null ? `Se crearon ${creado}` : `Crear ${total} elementos`}
          </button>
        </div>
      </div>
    </div>
  );
}
