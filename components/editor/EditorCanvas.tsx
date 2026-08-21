"use client";

import { useRef, useState, useCallback, useEffect, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import { useEditorStore } from "@/store/editor-store";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { metrosAPixeles, pixelesAMetros } from "@/editor/geometry/scale";
import { distanciaEntrePuntos } from "@/editor/geometry/coordinates";
import { aplicarGridSnap } from "@/editor/snapping/GridSnap";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";
import { IconoObjeto } from "./IconoObjeto";
import { FUENTE_TEXTO_DEFECTO } from "@/config/fonts";
import type { Punto } from "@/types/location";
import type { HerramientaEditor } from "@/types/editor";

const ANCHO_PREDIO_M = 60;
const ALTO_PREDIO_M = 40;
const HERRAMIENTAS_ARRASTRE: HerramientaEditor[] = ["rectangulo", "circulo", "medir"];

type DibujoArrastre = { tipo: "rectangulo" | "circulo"; inicio: Punto; actual: Punto };
type Medicion = { inicio: Punto; actual: Punto };

function textoAyuda(herramienta: HerramientaEditor, hayLineaIniciada: boolean): string | null {
  switch (herramienta) {
    case "linea":
      return hayLineaIniciada ? "Clic para el punto final (Esc para cancelar)" : "Clic para el punto inicial de la línea";
    case "polilinea":
      return "Clic para cada punto · doble clic para terminar (mínimo 2 puntos, Esc para cancelar)";
    case "poligono":
      return "Clic para cada vértice · doble clic para cerrar la forma (mínimo 3 puntos, Esc para cancelar)";
    case "rectangulo":
      return "Arrastrá para dibujar el rectángulo";
    case "circulo":
      return "Arrastrá para dibujar el círculo";
    case "texto":
      return "Clic donde querés agregar el texto";
    case "medir":
      return "Arrastrá para medir una distancia";
    case "mover":
      return "Arrastrá para desplazar la vista";
    default:
      return null;
  }
}

/**
 * Pantalla 15 — Editor principal. Lienzo SVG interactivo: recibe símbolos
 * arrastrados desde la biblioteca (HU-ORG-21), permite moverlos y dibujar
 * figuras básicas con las herramientas de la barra superior (HU-ORG-15/16).
 */
export function EditorCanvas() {
  const lienzoRef = useRef<HTMLDivElement>(null);
  const { permitirSoltar, soltar } = useDragAndDrop(lienzoRef);

  const proyecto = useEditorStore((s) => s.proyecto);
  const zoom = useEditorStore((s) => s.zoom);
  const mostrarCuadricula = useEditorStore((s) => s.mostrarCuadricula);
  const ajustarACuadricula = useEditorStore((s) => s.ajustarACuadricula);
  const seleccionId = useEditorStore((s) => s.seleccionId);
  const seleccionar = useEditorStore((s) => s.seleccionar);
  const moverObjeto = useEditorStore((s) => s.moverObjeto);
  const herramienta = useEditorStore((s) => s.herramienta);
  const agregarFigura = useEditorStore((s) => s.agregarFigura);

  const [arrastrandoId, setArrastrandoId] = useState<string | null>(null);
  const offsetRef = useRef({ dxM: 0, dyM: 0 });
  const panRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);

  const [dibujo, setDibujo] = useState<DibujoArrastre | null>(null);
  const [medicion, setMedicion] = useState<Medicion | null>(null);
  const [lineaInicio, setLineaInicio] = useState<Punto | null>(null);
  const [poligonoPuntos, setPoligonoPuntos] = useState<Punto[] | null>(null);
  const [previewPunto, setPreviewPunto] = useState<Punto | null>(null);

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

  const posicionDesdeEvento = useCallback(
    (clientX: number, clientY: number): Punto => {
      const rect = lienzoRef.current!.getBoundingClientRect();
      const scrollLeft = lienzoRef.current!.scrollLeft;
      const scrollTop = lienzoRef.current!.scrollTop;
      const bruto = {
        x: pixelesAMetros(clientX - rect.left + scrollLeft, zoom),
        y: pixelesAMetros(clientY - rect.top + scrollTop, zoom),
      };
      return aplicarGridSnap(bruto, ajustarACuadricula);
    },
    [zoom, ajustarACuadricula]
  );

  // Cancelar cualquier dibujo en curso con Escape, y limpiarlo si cambia la herramienta activa.
  useEffect(() => {
    setDibujo(null);
    setMedicion(null);
    setLineaInicio(null);
    setPoligonoPuntos(null);
    setPreviewPunto(null);
  }, [herramienta]);

  useEffect(() => {
    function alPresionarTecla(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setDibujo(null);
      setMedicion(null);
      setLineaInicio(null);
      setPoligonoPuntos(null);
      setPreviewPunto(null);
    }
    window.addEventListener("keydown", alPresionarTecla);
    return () => window.removeEventListener("keydown", alPresionarTecla);
  }, []);

  function alPresionarObjeto(event: ReactPointerEvent<SVGGElement>, objetoId: string, posM: { x: number; y: number }) {
    if (herramienta !== "seleccionar") return; // dejar que el evento burbujee al lienzo para dibujar/paneo
    event.stopPropagation();
    const capaId = proyecto?.objetos.find((o) => o.id === objetoId)?.capaId;
    if (capaId && capaBloqueada(capaId)) {
      seleccionar(objetoId);
      return;
    }
    seleccionar(objetoId);
    if (!lienzoRef.current) return;
    const punteroM = posicionDesdeEvento(event.clientX, event.clientY);
    offsetRef.current = { dxM: punteroM.x - posM.x, dyM: punteroM.y - posM.y };
    setArrastrandoId(objetoId);
  }

  function alPresionarLienzo(event: ReactPointerEvent<HTMLDivElement>) {
    if (herramienta === "mover" && lienzoRef.current) {
      panRef.current = {
        x: event.clientX,
        y: event.clientY,
        scrollLeft: lienzoRef.current.scrollLeft,
        scrollTop: lienzoRef.current.scrollTop,
      };
      return;
    }
    if (!HERRAMIENTAS_ARRASTRE.includes(herramienta)) return;
    const p = posicionDesdeEvento(event.clientX, event.clientY);
    if (herramienta === "medir") setMedicion({ inicio: p, actual: p });
    else setDibujo({ tipo: herramienta as "rectangulo" | "circulo", inicio: p, actual: p });
  }

  function alMoverPuntero(event: ReactPointerEvent<HTMLDivElement>) {
    if (arrastrandoId && lienzoRef.current) {
      const punteroM = posicionDesdeEvento(event.clientX, event.clientY);
      moverObjeto(arrastrandoId, {
        x: Math.max(0, punteroM.x - offsetRef.current.dxM),
        y: Math.max(0, punteroM.y - offsetRef.current.dyM),
      });
      return;
    }
    if (panRef.current && lienzoRef.current) {
      lienzoRef.current.scrollLeft = panRef.current.scrollLeft - (event.clientX - panRef.current.x);
      lienzoRef.current.scrollTop = panRef.current.scrollTop - (event.clientY - panRef.current.y);
      return;
    }
    if (dibujo) {
      setDibujo({ ...dibujo, actual: posicionDesdeEvento(event.clientX, event.clientY) });
      return;
    }
    if (medicion) {
      setMedicion({ ...medicion, actual: posicionDesdeEvento(event.clientX, event.clientY) });
      return;
    }
    if (lineaInicio || (poligonoPuntos && poligonoPuntos.length > 0)) {
      setPreviewPunto(posicionDesdeEvento(event.clientX, event.clientY));
    }
  }

  function alSoltarPuntero() {
    if (panRef.current) {
      panRef.current = null;
      return;
    }
    if (dibujo) {
      const anchoM = Math.abs(dibujo.actual.x - dibujo.inicio.x);
      const largoM = Math.abs(dibujo.actual.y - dibujo.inicio.y);
      if (anchoM >= 0.3 && largoM >= 0.3) {
        agregarFigura({
          tipo: dibujo.tipo,
          posicion: { x: Math.min(dibujo.inicio.x, dibujo.actual.x), y: Math.min(dibujo.inicio.y, dibujo.actual.y) },
          anchoM,
          largoM,
        });
      }
      setDibujo(null);
      return;
    }
    setArrastrandoId(null);
  }

  function alHacerClicLienzo(event: ReactMouseEvent<HTMLDivElement>) {
    if (herramienta === "seleccionar") {
      seleccionar(null);
      return;
    }
    const p = posicionDesdeEvento(event.clientX, event.clientY);

    if (herramienta === "texto") {
      const texto = window.prompt("Texto a agregar en el plano:", "");
      if (texto && texto.trim()) {
        agregarFigura({ tipo: "texto", posicion: p, anchoM: Math.max(2, texto.trim().length * 0.5), largoM: 1.4, contenido: texto.trim() });
      }
      return;
    }

    if (herramienta === "linea") {
      if (!lineaInicio) {
        setLineaInicio(p);
        setPreviewPunto(p);
        return;
      }
      const dx = p.x - lineaInicio.x;
      const dy = p.y - lineaInicio.y;
      if (Math.hypot(dx, dy) >= 0.3) {
        agregarFigura({
          tipo: "linea",
          posicion: lineaInicio,
          puntos: [{ x: 0, y: 0 }, { x: dx, y: dy }],
          anchoM: Math.max(0.1, Math.abs(dx)),
          largoM: Math.max(0.1, Math.abs(dy)),
        });
      }
      setLineaInicio(null);
      setPreviewPunto(null);
      return;
    }

    if (herramienta === "polilinea" || herramienta === "poligono") {
      setPoligonoPuntos((prev) => [...(prev ?? []), p]);
      setPreviewPunto(p);
    }
  }

  function alDobleClicLienzo(event: ReactMouseEvent<HTMLDivElement>) {
    if (herramienta !== "polilinea" && herramienta !== "poligono") return;
    event.preventDefault();
    const minimo = herramienta === "poligono" ? 3 : 2;
    if (poligonoPuntos && poligonoPuntos.length >= minimo) {
      const inicio = poligonoPuntos[0];
      const relativos = poligonoPuntos.map((p) => ({ x: p.x - inicio.x, y: p.y - inicio.y }));
      const xs = relativos.map((p) => p.x);
      const ys = relativos.map((p) => p.y);
      agregarFigura({
        tipo: herramienta,
        posicion: inicio,
        puntos: relativos,
        anchoM: Math.max(0.1, Math.max(...xs) - Math.min(...xs)),
        largoM: Math.max(0.1, Math.max(...ys) - Math.min(...ys)),
      });
    }
    setPoligonoPuntos(null);
    setPreviewPunto(null);
  }

  if (!proyecto) {
    return <div className="editor-canvas-empty">Cargando plano…</div>;
  }

  const cursor =
    herramienta === "mover" ? "grab" : herramienta === "seleccionar" ? undefined : "crosshair";
  const ayuda = textoAyuda(herramienta, lineaInicio !== null);

  return (
    <div
      ref={lienzoRef}
      className="editor-canvas"
      style={cursor ? { cursor } : undefined}
      onDragOver={permitirSoltar}
      onDrop={soltar}
      onPointerDown={alPresionarLienzo}
      onPointerMove={alMoverPuntero}
      onPointerUp={alSoltarPuntero}
      onPointerLeave={alSoltarPuntero}
      onClick={alHacerClicLienzo}
      onDoubleClick={alDobleClicLienzo}
    >
      {ayuda ? <div className="editor-canvas-hint">{ayuda}</div> : null}

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
          const xPx = metrosAPixeles(objeto.posicion.x, zoom);
          const yPx = metrosAPixeles(objeto.posicion.y, zoom);
          const wPx = metrosAPixeles(objeto.anchoM, zoom);
          const hPx = metrosAPixeles(objeto.largoM, zoom);
          const seleccionado = seleccionId === objeto.id;
          const cursorObjeto = herramienta !== "seleccionar" ? undefined : capaBloqueada(objeto.capaId) ? "not-allowed" : "grab";

          const comun = {
            transform: `translate(${xPx} ${yPx}) rotate(${objeto.rotacionGrados} ${wPx / 2} ${hPx / 2})`,
            onPointerDown: (e: ReactPointerEvent<SVGGElement>) => alPresionarObjeto(e, objeto.id, objeto.posicion),
            onClick: (e: ReactMouseEvent<SVGGElement>) => {
              if (herramienta === "seleccionar") e.stopPropagation();
            },
            style: cursorObjeto ? { cursor: cursorObjeto } : undefined,
          };

          if (objeto.tipo === "linea" || objeto.tipo === "polilinea" || objeto.tipo === "poligono") {
            const puntosPx = (objeto.puntos ?? []).map((p) => `${metrosAPixeles(p.x, zoom)},${metrosAPixeles(p.y, zoom)}`).join(" ");
            const cerrado = objeto.tipo === "poligono";
            const Forma = cerrado ? "polygon" : "polyline";
            return (
              <g key={objeto.id} {...comun}>
                <Forma
                  points={puntosPx}
                  fill={cerrado ? objeto.color : "none"}
                  fillOpacity={cerrado ? (objeto.transparencia / 100) * 0.22 : 0}
                  stroke={objeto.color}
                  strokeWidth={seleccionado ? 2.5 : 1.8}
                  strokeOpacity={objeto.transparencia / 100}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {seleccionado ? <Forma points={puntosPx} fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          if (objeto.tipo === "circulo") {
            return (
              <g key={objeto.id} {...comun}>
                <ellipse cx={wPx / 2} cy={hPx / 2} rx={wPx / 2} ry={hPx / 2} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={seleccionado ? 2 : 1.2} />
                {seleccionado ? <ellipse cx={wPx / 2} cy={hPx / 2} rx={wPx / 2} ry={hPx / 2} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          if (objeto.tipo === "rectangulo") {
            return (
              <g key={objeto.id} {...comun}>
                <rect width={wPx} height={hPx} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={seleccionado ? 2 : 1.2} />
                {seleccionado ? <rect width={wPx} height={hPx} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          if (objeto.tipo === "texto") {
            return (
              <g key={objeto.id} {...comun}>
                <text x={0} y={metrosAPixeles(1, zoom)} fontFamily={objeto.fontFamily || FUENTE_TEXTO_DEFECTO} fontSize={metrosAPixeles(1.1, zoom)} fill={objeto.color} opacity={objeto.transparencia / 100}>
                  {objeto.contenido}
                </text>
                {seleccionado ? <rect x={-4} y={-6} width={wPx + 8} height={hPx + 10} fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          const def = objeto.simboloId ? obtenerSimbolo(objeto.simboloId) : undefined;
          return (
            <g key={objeto.id} {...comun}>
              {def ? (
                <IconoObjeto
                  src={def.icono}
                  width={wPx}
                  height={hPx}
                  opacity={objeto.transparencia / 100}
                  color={objeto.color}
                  seleccionado={seleccionado}
                />
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
              {seleccionado ? <rect width={wPx} height={hPx} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" /> : null}
            </g>
          );
        })}

        {dibujo ? (
          <g pointerEvents="none">
            {dibujo.tipo === "rectangulo" ? (
              <rect
                x={metrosAPixeles(Math.min(dibujo.inicio.x, dibujo.actual.x), zoom)}
                y={metrosAPixeles(Math.min(dibujo.inicio.y, dibujo.actual.y), zoom)}
                width={metrosAPixeles(Math.abs(dibujo.actual.x - dibujo.inicio.x), zoom)}
                height={metrosAPixeles(Math.abs(dibujo.actual.y - dibujo.inicio.y), zoom)}
                fill="var(--accent-soft)"
                stroke="var(--accent)"
                strokeDasharray="4 3"
                strokeWidth={1.5}
              />
            ) : (
              <ellipse
                cx={metrosAPixeles((dibujo.inicio.x + dibujo.actual.x) / 2, zoom)}
                cy={metrosAPixeles((dibujo.inicio.y + dibujo.actual.y) / 2, zoom)}
                rx={metrosAPixeles(Math.abs(dibujo.actual.x - dibujo.inicio.x) / 2, zoom)}
                ry={metrosAPixeles(Math.abs(dibujo.actual.y - dibujo.inicio.y) / 2, zoom)}
                fill="var(--accent-soft)"
                stroke="var(--accent)"
                strokeDasharray="4 3"
                strokeWidth={1.5}
              />
            )}
          </g>
        ) : null}

        {medicion ? (
          <g pointerEvents="none">
            <line
              x1={metrosAPixeles(medicion.inicio.x, zoom)}
              y1={metrosAPixeles(medicion.inicio.y, zoom)}
              x2={metrosAPixeles(medicion.actual.x, zoom)}
              y2={metrosAPixeles(medicion.actual.y, zoom)}
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
            <circle cx={metrosAPixeles(medicion.inicio.x, zoom)} cy={metrosAPixeles(medicion.inicio.y, zoom)} r={3} fill="var(--accent)" />
            <circle cx={metrosAPixeles(medicion.actual.x, zoom)} cy={metrosAPixeles(medicion.actual.y, zoom)} r={3} fill="var(--accent)" />
            <text
              x={metrosAPixeles((medicion.inicio.x + medicion.actual.x) / 2, zoom)}
              y={metrosAPixeles((medicion.inicio.y + medicion.actual.y) / 2, zoom) - 8}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize={12}
              fontWeight={700}
              fill="var(--accent)"
            >
              {distanciaEntrePuntos(medicion.inicio, medicion.actual).toFixed(2)} m
            </text>
          </g>
        ) : null}

        {lineaInicio && previewPunto ? (
          <g pointerEvents="none">
            <line
              x1={metrosAPixeles(lineaInicio.x, zoom)}
              y1={metrosAPixeles(lineaInicio.y, zoom)}
              x2={metrosAPixeles(previewPunto.x, zoom)}
              y2={metrosAPixeles(previewPunto.y, zoom)}
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
          </g>
        ) : null}

        {poligonoPuntos && poligonoPuntos.length > 0 ? (
          <g pointerEvents="none">
            <polyline
              points={[...poligonoPuntos, ...(previewPunto ? [previewPunto] : [])]
                .map((p) => `${metrosAPixeles(p.x, zoom)},${metrosAPixeles(p.y, zoom)}`)
                .join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
            {poligonoPuntos.map((p, i) => (
              <circle key={i} cx={metrosAPixeles(p.x, zoom)} cy={metrosAPixeles(p.y, zoom)} r={3} fill="var(--accent)" />
            ))}
          </g>
        ) : null}
      </svg>
    </div>
  );
}
