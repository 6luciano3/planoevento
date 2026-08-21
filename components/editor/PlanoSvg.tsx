"use client";

import type { ObjetoPlano } from "@/types/editor";
import type { CapaPlano } from "@/types/layer";
import { metrosAPixeles } from "@/editor/geometry/scale";
import { obtenerSimbolo } from "@/symbols/symbol-catalog";
import { IconoObjeto } from "./IconoObjeto";
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
 * misma lógica de render por tipo que EditorCanvas.tsx, reutilizada por la
 * vista de exportación/impresión (Pantalla 22) para que el PDF muestre el
 * plano real y no un cartel de texto.
 */
export function PlanoSvg({ objetos, capas, mostrarCuadricula = true, soloImprimibles = false }: PlanoSvgProps) {
  const anchoPx = metrosAPixeles(ANCHO_PREDIO_M, 1);
  const altoPx = metrosAPixeles(ALTO_PREDIO_M, 1);

  const capaVisible = (capaId: string) => {
    const capa = capas.find((c) => c.id === capaId);
    if (!capa) return true;
    return soloImprimibles ? capa.visible && capa.incluirEnImpresion : capa.visible;
  };

  return (
    <svg viewBox={`0 0 ${anchoPx} ${altoPx}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Plano del evento">
      {mostrarCuadricula ? (
        <defs>
          <pattern id="grid-print" width={metrosAPixeles(1, 1)} height={metrosAPixeles(1, 1)} patternUnits="userSpaceOnUse">
            <path d={`M ${metrosAPixeles(1, 1)} 0 L 0 0 0 ${metrosAPixeles(1, 1)}`} fill="none" stroke="var(--grid)" strokeWidth="1" />
          </pattern>
        </defs>
      ) : null}
      <rect width={anchoPx} height={altoPx} fill={mostrarCuadricula ? "url(#grid-print)" : "transparent"} />
      <rect x={4} y={4} width={anchoPx - 8} height={altoPx - 8} fill="none" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="6 5" />

      {objetos.map((objeto) => {
        if (!objeto.visible || !capaVisible(objeto.capaId)) return null;
        const xPx = metrosAPixeles(objeto.posicion.x, 1);
        const yPx = metrosAPixeles(objeto.posicion.y, 1);
        const wPx = metrosAPixeles(objeto.anchoM, 1);
        const hPx = metrosAPixeles(objeto.largoM, 1);
        const transform = `translate(${xPx} ${yPx}) rotate(${objeto.rotacionGrados} ${wPx / 2} ${hPx / 2})`;

        if (objeto.tipo === "linea" || objeto.tipo === "polilinea" || objeto.tipo === "poligono") {
          const puntosPx = (objeto.puntos ?? []).map((p) => `${metrosAPixeles(p.x, 1)},${metrosAPixeles(p.y, 1)}`).join(" ");
          const cerrado = objeto.tipo === "poligono";
          const Forma = cerrado ? "polygon" : "polyline";
          return (
            <g key={objeto.id} transform={transform}>
              <Forma
                points={puntosPx}
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
          return (
            <g key={objeto.id} transform={transform}>
              <ellipse cx={wPx / 2} cy={hPx / 2} rx={wPx / 2} ry={hPx / 2} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={1.2} />
            </g>
          );
        }

        if (objeto.tipo === "rectangulo") {
          return (
            <g key={objeto.id} transform={transform}>
              <rect width={wPx} height={hPx} fill={objeto.color} fillOpacity={(objeto.transparencia / 100) * 0.22} stroke={objeto.color} strokeWidth={1.2} />
            </g>
          );
        }

        if (objeto.tipo === "texto") {
          return (
            <g key={objeto.id} transform={transform}>
              <text x={0} y={metrosAPixeles(1, 1)} fontFamily={objeto.fontFamily || FUENTE_TEXTO_DEFECTO} fontSize={metrosAPixeles(1.1, 1)} fill={objeto.color} opacity={objeto.transparencia / 100}>
                {objeto.contenido}
              </text>
            </g>
          );
        }

        const def = objeto.simboloId ? obtenerSimbolo(objeto.simboloId) : undefined;
        return (
          <g key={objeto.id} transform={transform}>
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
