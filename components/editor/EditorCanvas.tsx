"use client";

import { useRef, useState, useCallback, type PointerEvent as ReactPointerEvent } from "react";
import { useEditorStore } from "@/store/editor-store";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { metrosAPixeles, pixelesAMetros } from "@/editor/geometry/scale";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";

const ANCHO_PREDIO_M = 60;
const ALTO_PREDIO_M = 40;

/**
 * Pantalla 15 — Editor principal. Lienzo SVG interactivo: recibe símbolos
 * arrastrados desde la biblioteca (HU-ORG-21) y permite moverlos, cada capa
 * respeta su visibilidad/bloqueo.
 */
export function EditorCanvas() {
  const lienzoRef = useRef<HTMLDivElement>(null);
  const { permitirSoltar, soltar } = useDragAndDrop(lienzoRef);

  const proyecto = useEditorStore((s) => s.proyecto);
  const zoom = useEditorStore((s) => s.zoom);
  const mostrarCuadricula = useEditorStore((s) => s.mostrarCuadricula);
  const seleccionId = useEditorStore((s) => s.seleccionId);
  const seleccionar = useEditorStore((s) => s.seleccionar);
  const moverObjeto = useEditorStore((s) => s.moverObjeto);

  const [arrastrandoId, setArrastrandoId] = useState<string | null>(null);
  const offsetRef = useRef({ dxM: 0, dyM: 0 });

  const anchoPx = metrosAPixeles(ANCHO_PREDIO_M, zoom);
  const altoPx = metrosAPixeles(ALTO_PREDIO_M, zoom);

  const capaVisible = useCallback(
    (capaId: string) => proyecto?.capas.find((c) => c.id === capaId)?.visible ?? true,
    [proyecto]
  );
  const capaBloqueada = useCallback(
    (capaId: string) => proyecto?.capas.find((c) => c.id === capaId)?.bloqueada ?? false,
    [proyecto]
  );

  function alPresionarObjeto(event: ReactPointerEvent<SVGGElement>, objetoId: string, posM: { x: number; y: number }) {
    event.stopPropagation();
    const capaId = proyecto?.objetos.find((o) => o.id === objetoId)?.capaId;
    if (capaId && capaBloqueada(capaId)) {
      seleccionar(objetoId);
      return;
    }
    seleccionar(objetoId);
    if (!lienzoRef.current) return;
    const rect = lienzoRef.current.getBoundingClientRect();
    const punteroM = {
      x: pixelesAMetros(event.clientX - rect.left, zoom),
      y: pixelesAMetros(event.clientY - rect.top, zoom),
    };
    offsetRef.current = { dxM: punteroM.x - posM.x, dyM: punteroM.y - posM.y };
    setArrastrandoId(objetoId);
  }

  function alMoverPuntero(event: ReactPointerEvent<HTMLDivElement>) {
    if (!arrastrandoId || !lienzoRef.current) return;
    const rect = lienzoRef.current.getBoundingClientRect();
    const punteroM = {
      x: pixelesAMetros(event.clientX - rect.left, zoom),
      y: pixelesAMetros(event.clientY - rect.top, zoom),
    };
    moverObjeto(arrastrandoId, {
      x: Math.max(0, punteroM.x - offsetRef.current.dxM),
      y: Math.max(0, punteroM.y - offsetRef.current.dyM),
    });
  }

  if (!proyecto) {
    return <div className="editor-canvas-empty">Cargando plano…</div>;
  }

  return (
    <div
      ref={lienzoRef}
      className="editor-canvas"
      onDragOver={permitirSoltar}
      onDrop={soltar}
      onPointerMove={alMoverPuntero}
      onPointerUp={() => setArrastrandoId(null)}
      onPointerLeave={() => setArrastrandoId(null)}
      onClick={() => seleccionar(null)}
    >
      <svg width={anchoPx} height={altoPx} role="img" aria-label="Plano del evento">
        {mostrarCuadricula ? (
          <defs>
            <pattern id="grid" width={metrosAPixeles(1, zoom)} height={metrosAPixeles(1, zoom)} patternUnits="userSpaceOnUse">
              <path d={`M ${metrosAPixeles(1, zoom)} 0 L 0 0 0 ${metrosAPixeles(1, zoom)}`} fill="none" stroke="var(--grid)" strokeWidth="1" />
            </pattern>
          </defs>
        ) : null}
        <rect width={anchoPx} height={altoPx} fill={mostrarCuadricula ? "url(#grid)" : "transparent"} />
        <rect x={4} y={4} width={anchoPx - 8} height={altoPx - 8} fill="none" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="6 5" />

        {proyecto.objetos.map((objeto) => {
          if (!capaVisible(objeto.capaId)) return null;
          const def = objeto.simboloId ? obtenerSimbolo(objeto.simboloId) : undefined;
          const xPx = metrosAPixeles(objeto.posicion.x, zoom);
          const yPx = metrosAPixeles(objeto.posicion.y, zoom);
          const wPx = metrosAPixeles(objeto.anchoM, zoom);
          const hPx = metrosAPixeles(objeto.largoM, zoom);
          const seleccionado = seleccionId === objeto.id;

          return (
            <g
              key={objeto.id}
              transform={`translate(${xPx} ${yPx}) rotate(${objeto.rotacionGrados} ${wPx / 2} ${hPx / 2})`}
              onPointerDown={(e) => alPresionarObjeto(e, objeto.id, objeto.posicion)}
              style={{ cursor: capaBloqueada(objeto.capaId) ? "not-allowed" : "grab" }}
            >
              {def ? (
                <image href={def.icono} width={wPx} height={hPx} opacity={objeto.transparencia / 100} />
              ) : (
                <rect
                  width={wPx}
                  height={hPx}
                  fill={objeto.color}
                  fillOpacity={(objeto.transparencia / 100) * 0.22}
                  stroke={objeto.color}
                  strokeWidth={seleccionado ? 2 : 1.2}
                />
              )}
              {objeto.codigo ? (
                <text
                  x={wPx / 2}
                  y={def ? hPx + 12 : hPx / 2 + 3}
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize={Math.max(8, Math.min(11, wPx / 4))}
                  fill={def ? "var(--ink)" : objeto.color}
                >
                  {objeto.codigo}
                </text>
              ) : null}
              {seleccionado ? (
                <rect width={wPx} height={hPx} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
