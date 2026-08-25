"use client";

import { useRef, useState, useCallback, useEffect, useMemo, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import { useEditorStore } from "@/store/editor-store";
import { metrosAPixeles } from "@/editor/geometry/scale";
import { distanciaEntrePuntos } from "@/editor/geometry/coordinates";
import { aplicarGridSnap } from "@/editor/snapping/GridSnap";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";
import { IconoObjeto, IconoObjetoIsometrico } from "./IconoObjeto";
import { ZonasCapas } from "./ZonasCapas";
import { calcularZonasPorCapa } from "@/editor/geometry/zonas";
import {
  metrosAIsometrico,
  isometricoAMetros,
  dimensionesLienzoIsometrico,
  compararProfundidad,
  cajaProyectada,
  puntosFiguraProyectada,
  puntosProyectadosPoligono,
  centroYEscalaSimbolo,
  calcularPaddingSuperior,
  matrizLineal,
  type ConfigIsometrica,
} from "@/editor/geometry/isometric";
import { FUENTE_TEXTO_DEFECTO } from "@/config/fonts";
import { calcularPiezasCamino, TILE_M } from "@/editor/tools/caminoAutoTile";
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
    case "camino":
      return "Clic para cada punto del recorrido · doble clic para terminar (Esc para cancelar)";
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
 * El predio se ve en proyección isométrica (mapa ilustrado) en vez de plano
 * técnico — los datos siguen siendo x/y en metros, solo cambia cómo se
 * dibujan (ver editor/geometry/isometric.ts).
 */
export function EditorCanvas() {
  const lienzoRef = useRef<HTMLDivElement>(null);

  const proyecto = useEditorStore((s) => s.proyecto);
  const zoom = useEditorStore((s) => s.zoom);
  const ajustarACuadricula = useEditorStore((s) => s.ajustarACuadricula);
  const seleccionId = useEditorStore((s) => s.seleccionId);
  const seleccionar = useEditorStore((s) => s.seleccionar);
  const moverObjeto = useEditorStore((s) => s.moverObjeto);
  const herramienta = useEditorStore((s) => s.herramienta);
  const agregarFigura = useEditorStore((s) => s.agregarFigura);
  const familiaCaminoActiva = useEditorStore((s) => s.familiaCaminoActiva);
  const agregarCamino = useEditorStore((s) => s.agregarCamino);

  const config: ConfigIsometrica = useMemo(
    () => ({
      anchoPredioM: ANCHO_PREDIO_M,
      altoPredioM: ALTO_PREDIO_M,
      zoom,
      paddingSuperiorPx: calcularPaddingSuperior(proyecto?.objetos ?? [], zoom),
    }),
    [zoom, proyecto?.objetos]
  );

  const zonas = useMemo(() => (proyecto ? calcularZonasPorCapa(proyecto.objetos, proyecto.capas) : []), [proyecto]);
  const objetosOrdenados = useMemo(
    () => (proyecto ? [...proyecto.objetos].sort(compararProfundidad) : []),
    [proyecto]
  );

  const [arrastrandoId, setArrastrandoId] = useState<string | null>(null);
  const offsetRef = useRef({ dxM: 0, dyM: 0 });
  const panRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);

  const [dibujo, setDibujo] = useState<DibujoArrastre | null>(null);
  const [medicion, setMedicion] = useState<Medicion | null>(null);
  const [lineaInicio, setLineaInicio] = useState<Punto | null>(null);
  const [poligonoPuntos, setPoligonoPuntos] = useState<Punto[] | null>(null);
  const [caminoPuntos, setCaminoPuntos] = useState<Punto[] | null>(null);
  const [previewPunto, setPreviewPunto] = useState<Punto | null>(null);

  const { anchoPx, altoPx } = dimensionesLienzoIsometrico(config);

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
      const bruto = isometricoAMetros(
        { x: clientX - rect.left + scrollLeft, y: clientY - rect.top + scrollTop },
        config
      );
      return aplicarGridSnap(bruto, ajustarACuadricula);
    },
    [config, ajustarACuadricula]
  );

  // Cancelar cualquier dibujo en curso con Escape, y limpiarlo si cambia la herramienta activa.
  useEffect(() => {
    setDibujo(null);
    setMedicion(null);
    setLineaInicio(null);
    setPoligonoPuntos(null);
    setCaminoPuntos(null);
    setPreviewPunto(null);
  }, [herramienta]);

  useEffect(() => {
    function alPresionarTecla(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setDibujo(null);
      setMedicion(null);
      setLineaInicio(null);
      setPoligonoPuntos(null);
      setCaminoPuntos(null);
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
      return;
    }
    if (caminoPuntos && caminoPuntos.length > 0) {
      const p = posicionDesdeEvento(event.clientX, event.clientY);
      setPreviewPunto({ x: Math.round(p.x / TILE_M) * TILE_M, y: Math.round(p.y / TILE_M) * TILE_M });
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
      return;
    }

    if (herramienta === "camino") {
      const pAjustado = { x: Math.round(p.x / TILE_M) * TILE_M, y: Math.round(p.y / TILE_M) * TILE_M };
      setCaminoPuntos((prev) => [...(prev ?? []), pAjustado]);
      setPreviewPunto(pAjustado);
    }
  }

  function alDobleClicLienzo(event: ReactMouseEvent<HTMLDivElement>) {
    if (herramienta === "camino") {
      event.preventDefault();
      if (caminoPuntos && caminoPuntos.length >= 2) {
        const piezas = calcularPiezasCamino(caminoPuntos, familiaCaminoActiva, TILE_M);
        agregarCamino(piezas);
      }
      setCaminoPuntos(null);
      setPreviewPunto(null);
      return;
    }

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

  const esquinasPredio = puntosProyectadosPoligono(
    [
      { x: 0, y: 0 },
      { x: ANCHO_PREDIO_M, y: 0 },
      { x: ANCHO_PREDIO_M, y: ALTO_PREDIO_M },
      { x: 0, y: ALTO_PREDIO_M },
    ],
    config
  );
  const esquinasPredioStr = esquinasPredio.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      ref={lienzoRef}
      className="editor-canvas"
      style={cursor ? { cursor } : undefined}
      onPointerDown={alPresionarLienzo}
      onPointerMove={alMoverPuntero}
      onPointerUp={alSoltarPuntero}
      onPointerLeave={alSoltarPuntero}
      onClick={alHacerClicLienzo}
      onDoubleClick={alDobleClicLienzo}
    >
      {ayuda ? <div className="editor-canvas-hint">{ayuda}</div> : null}

      <svg width={anchoPx} height={altoPx} role="img" aria-label="Plano del evento">
        <polygon points={esquinasPredioStr} fill="var(--iso-ground)" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="6 5" />
        <ZonasCapas zonas={zonas} config={config} />

        {objetosOrdenados.map((objeto) => {
          if (!capaVisible(objeto.capaId)) return null;
          const seleccionado = seleccionId === objeto.id;
          const cursorObjeto = herramienta !== "seleccionar" ? undefined : capaBloqueada(objeto.capaId) ? "not-allowed" : "grab";

          const comun = {
            onPointerDown: (e: ReactPointerEvent<SVGGElement>) => alPresionarObjeto(e, objeto.id, objeto.posicion),
            onClick: (e: ReactMouseEvent<SVGGElement>) => {
              if (herramienta === "seleccionar") e.stopPropagation();
            },
            style: cursorObjeto ? { cursor: cursorObjeto } : undefined,
          };

          if (objeto.tipo === "linea" || objeto.tipo === "polilinea" || objeto.tipo === "poligono") {
            const puntosPx = puntosFiguraProyectada(objeto, config);
            const puntosStr = puntosPx.map((p) => `${p.x},${p.y}`).join(" ");
            const cerrado = objeto.tipo === "poligono";
            const Forma = cerrado ? "polygon" : "polyline";
            return (
              <g key={objeto.id} {...comun}>
                <Forma
                  points={puntosStr}
                  fill={cerrado ? objeto.color : "none"}
                  fillOpacity={cerrado ? (objeto.transparencia / 100) * 0.22 : 0}
                  stroke={objeto.color}
                  strokeWidth={seleccionado ? 2.5 : 1.8}
                  strokeOpacity={objeto.transparencia / 100}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {seleccionado ? <Forma points={puntosStr} fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          if (objeto.tipo === "circulo") {
            const centro = metrosAIsometrico(
              { x: objeto.posicion.x + objeto.anchoM / 2, y: objeto.posicion.y + objeto.largoM / 2 },
              config
            );
            const { a, b, c, d } = matrizLineal(zoom);
            const rx = objeto.anchoM / 2;
            const ry = objeto.largoM / 2;
            return (
              <g key={objeto.id} {...comun} transform={`translate(${centro.x} ${centro.y}) matrix(${a} ${b} ${c} ${d} 0 0)`}>
                <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={seleccionado ? 2 : 1.2} vectorEffect="non-scaling-stroke" />
                {seleccionado ? <ellipse cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" vectorEffect="non-scaling-stroke" /> : null}
              </g>
            );
          }

          if (objeto.tipo === "rectangulo") {
            const esquinas = cajaProyectada(objeto, config);
            const puntosStr = esquinas.map((p) => `${p.x},${p.y}`).join(" ");
            return (
              <g key={objeto.id} {...comun}>
                <polygon points={puntosStr} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={seleccionado ? 2 : 1.2} />
                {seleccionado ? <polygon points={puntosStr} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          if (objeto.tipo === "texto") {
            const ancla = metrosAIsometrico(objeto.posicion, config);
            const wPx = metrosAPixeles(objeto.anchoM, zoom);
            const hPx = metrosAPixeles(objeto.largoM, zoom);
            return (
              <g key={objeto.id} {...comun}>
                <text x={ancla.x} y={ancla.y + metrosAPixeles(1, zoom)} fontFamily={objeto.fontFamily || FUENTE_TEXTO_DEFECTO} fontSize={metrosAPixeles(1.1, zoom)} fill={objeto.color} opacity={objeto.transparencia / 100}>
                  {objeto.contenido}
                </text>
                {seleccionado ? <rect x={ancla.x - 4} y={ancla.y - 6} width={wPx + 8} height={hPx + 10} fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 2" /> : null}
              </g>
            );
          }

          const def = objeto.simboloId ? obtenerSimbolo(objeto.simboloId) : undefined;

          if (def?.estiloIcono === "isometrico") {
            const { anchorXPx, anchorYPx, displayWidthPx } = centroYEscalaSimbolo(objeto, config);
            return (
              <g key={objeto.id} {...comun}>
                <IconoObjetoIsometrico
                  src={def.icono}
                  anchorXPx={anchorXPx}
                  anchorYPx={anchorYPx}
                  displayWidthPx={displayWidthPx}
                  aspect={def.aspectoIcono}
                  opacity={objeto.transparencia / 100}
                  color={objeto.color}
                  seleccionado={seleccionado}
                />
                {objeto.codigo ? (
                  <text x={anchorXPx} y={anchorYPx + 14} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={11} fill="var(--ink)">
                    {objeto.codigo}
                  </text>
                ) : null}
                {seleccionado ? (
                  <ellipse cx={anchorXPx} cy={anchorYPx} rx={displayWidthPx / 2} ry={displayWidthPx / 4} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 2" />
                ) : null}
              </g>
            );
          }

          const wPx = metrosAPixeles(objeto.anchoM, zoom);
          const hPx = metrosAPixeles(objeto.largoM, zoom);
          const anclaPlano = metrosAIsometrico(objeto.posicion, config);
          return (
            <g
              key={objeto.id}
              {...comun}
              transform={`translate(${anclaPlano.x} ${anclaPlano.y}) rotate(${objeto.rotacionGrados} ${wPx / 2} ${hPx / 2})`}
            >
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
            {(() => {
              const xMin = Math.min(dibujo.inicio.x, dibujo.actual.x);
              const yMin = Math.min(dibujo.inicio.y, dibujo.actual.y);
              const anchoM = Math.abs(dibujo.actual.x - dibujo.inicio.x);
              const largoM = Math.abs(dibujo.actual.y - dibujo.inicio.y);
              if (dibujo.tipo === "rectangulo") {
                const esquinas = puntosProyectadosPoligono(
                  [
                    { x: xMin, y: yMin },
                    { x: xMin + anchoM, y: yMin },
                    { x: xMin + anchoM, y: yMin + largoM },
                    { x: xMin, y: yMin + largoM },
                  ],
                  config
                );
                return (
                  <polygon
                    points={esquinas.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="var(--accent-soft)"
                    stroke="var(--accent)"
                    strokeDasharray="4 3"
                    strokeWidth={1.5}
                  />
                );
              }
              const centro = metrosAIsometrico({ x: xMin + anchoM / 2, y: yMin + largoM / 2 }, config);
              const { a, b, c, d } = matrizLineal(zoom);
              return (
                <g transform={`translate(${centro.x} ${centro.y}) matrix(${a} ${b} ${c} ${d} 0 0)`}>
                  <ellipse cx={0} cy={0} rx={anchoM / 2} ry={largoM / 2} fill="var(--accent-soft)" stroke="var(--accent)" strokeDasharray="4 3" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })()}
          </g>
        ) : null}

        {medicion ? (
          (() => {
            const pInicio = metrosAIsometrico(medicion.inicio, config);
            const pActual = metrosAIsometrico(medicion.actual, config);
            const pMedio = metrosAIsometrico(
              { x: (medicion.inicio.x + medicion.actual.x) / 2, y: (medicion.inicio.y + medicion.actual.y) / 2 },
              config
            );
            return (
              <g pointerEvents="none">
                <line x1={pInicio.x} y1={pInicio.y} x2={pActual.x} y2={pActual.y} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 3" />
                <circle cx={pInicio.x} cy={pInicio.y} r={3} fill="var(--accent)" />
                <circle cx={pActual.x} cy={pActual.y} r={3} fill="var(--accent)" />
                <text x={pMedio.x} y={pMedio.y - 8} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={12} fontWeight={700} fill="var(--accent)">
                  {distanciaEntrePuntos(medicion.inicio, medicion.actual).toFixed(2)} m
                </text>
              </g>
            );
          })()
        ) : null}

        {lineaInicio && previewPunto ? (
          (() => {
            const pInicio = metrosAIsometrico(lineaInicio, config);
            const pActual = metrosAIsometrico(previewPunto, config);
            return (
              <g pointerEvents="none">
                <line x1={pInicio.x} y1={pInicio.y} x2={pActual.x} y2={pActual.y} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 3" />
              </g>
            );
          })()
        ) : null}

        {poligonoPuntos && poligonoPuntos.length > 0 ? (
          (() => {
            const puntos = puntosProyectadosPoligono([...poligonoPuntos, ...(previewPunto ? [previewPunto] : [])], config);
            const puntosVertices = puntosProyectadosPoligono(poligonoPuntos, config);
            return (
              <g pointerEvents="none">
                <polyline points={puntos.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 3" />
                {puntosVertices.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--accent)" />
                ))}
              </g>
            );
          })()
        ) : null}

        {caminoPuntos && caminoPuntos.length > 0 ? (
          (() => {
            const puntos = puntosProyectadosPoligono([...caminoPuntos, ...(previewPunto ? [previewPunto] : [])], config);
            const puntosVertices = puntosProyectadosPoligono(caminoPuntos, config);
            return (
              <g pointerEvents="none">
                <polyline points={puntos.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeDasharray="4 3" />
                {puntosVertices.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="var(--accent)" />
                ))}
              </g>
            );
          })()
        ) : null}
      </svg>
    </div>
  );
}
