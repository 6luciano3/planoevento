"use client";

import type { ObjetoPlano } from "@/types/editor";
import type { CapaPlano } from "@/types/layer";
import { metrosAPixeles } from "@/editor/geometry/scale";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";
import { IconoObjeto, IconoObjetoIsometrico } from "./IconoObjeto";
import { ZonasCapas } from "./ZonasCapas";
import { calcularZonasPorCapa } from "@/editor/geometry/zonas";
import {
  metrosAIsometrico,
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

const ANCHO_PREDIO_M = 60;
const ALTO_PREDIO_M = 40;

interface PlanoSvgProps {
  objetos: ObjetoPlano[];
  capas: CapaPlano[];
  mostrarCuadricula?: boolean;
  /** Si es true, solo se dibujan las capas con `incluirEnImpresion` (vista de exportación/impresión). */
  soloImprimibles?: boolean;
}

/**
 * Dibuja los objetos de un plano como SVG estático, sin interacción — la
 * misma lógica de render por tipo que EditorCanvas.tsx (incluida la
 * proyección isométrica), reutilizada por la vista de exportación/impresión
 * (Pantalla 22) para que el PDF muestre el plano real y no un cartel de
 * texto.
 */
export function PlanoSvg({ objetos, capas, soloImprimibles = false }: PlanoSvgProps) {
  const config: ConfigIsometrica = {
    anchoPredioM: ANCHO_PREDIO_M,
    altoPredioM: ALTO_PREDIO_M,
    zoom: 1,
    paddingSuperiorPx: calcularPaddingSuperior(objetos, 1),
  };
  const { anchoPx, altoPx } = dimensionesLienzoIsometrico(config);

  const capaVisible = (capaId: string) => {
    const capa = capas.find((c) => c.id === capaId);
    if (!capa) return true;
    return soloImprimibles ? capa.visible && capa.incluirEnImpresion : capa.visible;
  };

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

  const objetosOrdenados = [...objetos].sort(compararProfundidad);

  return (
    <svg viewBox={`0 0 ${anchoPx} ${altoPx}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Plano del evento">
      <polygon points={esquinasPredioStr} fill="var(--iso-ground)" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="6 5" />
      <ZonasCapas zonas={calcularZonasPorCapa(objetos, capas)} config={config} />

      {objetosOrdenados.map((objeto) => {
        if (!objeto.visible || !capaVisible(objeto.capaId)) return null;

        if (objeto.tipo === "linea" || objeto.tipo === "polilinea" || objeto.tipo === "poligono") {
          const puntosPx = puntosFiguraProyectada(objeto, config);
          const puntosStr = puntosPx.map((p) => `${p.x},${p.y}`).join(" ");
          const cerrado = objeto.tipo === "poligono";
          const Forma = cerrado ? "polygon" : "polyline";
          return (
            <g key={objeto.id}>
              <Forma
                points={puntosStr}
                fill={cerrado ? objeto.color : "none"}
                fillOpacity={cerrado ? (objeto.transparencia / 100) * 0.22 : 0}
                stroke={objeto.color}
                strokeWidth={1.8}
                strokeOpacity={objeto.transparencia / 100}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
          );
        }

        if (objeto.tipo === "circulo") {
          const centro = metrosAIsometrico(
            { x: objeto.posicion.x + objeto.anchoM / 2, y: objeto.posicion.y + objeto.largoM / 2 },
            config
          );
          const { a, b, c, d } = matrizLineal(1);
          return (
            <g key={objeto.id} transform={`translate(${centro.x} ${centro.y}) matrix(${a} ${b} ${c} ${d} 0 0)`}>
              <ellipse cx={0} cy={0} rx={objeto.anchoM / 2} ry={objeto.largoM / 2} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
            </g>
          );
        }

        if (objeto.tipo === "rectangulo") {
          const esquinas = cajaProyectada(objeto, config);
          const puntosStr = esquinas.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <g key={objeto.id}>
              <polygon points={puntosStr} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={1.2} />
            </g>
          );
        }

        if (objeto.tipo === "texto") {
          const ancla = metrosAIsometrico(objeto.posicion, config);
          return (
            <g key={objeto.id}>
              <text x={ancla.x} y={ancla.y + metrosAPixeles(1, 1)} fontFamily={objeto.fontFamily || FUENTE_TEXTO_DEFECTO} fontSize={metrosAPixeles(1.1, 1)} fill={objeto.color} opacity={objeto.transparencia / 100}>
                {objeto.contenido}
              </text>
            </g>
          );
        }

        const def = objeto.simboloId ? obtenerSimbolo(objeto.simboloId) : undefined;

        if (def?.estiloIcono === "isometrico") {
          const { anchorXPx, anchorYPx, displayWidthPx } = centroYEscalaSimbolo(objeto, config);
          return (
            <g key={objeto.id}>
              <IconoObjetoIsometrico
                src={def.icono}
                anchorXPx={anchorXPx}
                anchorYPx={anchorYPx}
                displayWidthPx={displayWidthPx}
                aspect={def.aspectoIcono}
                opacity={objeto.transparencia / 100}
                color={objeto.color}
              />
              {objeto.codigo ? (
                <text x={anchorXPx} y={anchorYPx + 14} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={11} fill="var(--ink)">
                  {objeto.codigo}
                </text>
              ) : null}
            </g>
          );
        }

        const wPx = metrosAPixeles(objeto.anchoM, 1);
        const hPx = metrosAPixeles(objeto.largoM, 1);
        const anclaPlano = metrosAIsometrico(objeto.posicion, config);
        return (
          <g key={objeto.id} transform={`translate(${anclaPlano.x} ${anclaPlano.y}) rotate(${objeto.rotacionGrados} ${wPx / 2} ${hPx / 2})`}>
            {def ? (
              <IconoObjeto src={def.icono} width={wPx} height={hPx} opacity={objeto.transparencia / 100} color={objeto.color} />
            ) : (
              <rect width={wPx} height={hPx} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={1.2} />
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
          </g>
        );
      })}
    </svg>
  );
}
