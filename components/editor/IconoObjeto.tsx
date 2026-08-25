"use client";

import { useState } from "react";

/**
 * No todos los ~90 componentes del catálogo tienen su SVG dibujado todavía
 * (ver public/symbols/README.md). Si el archivo no existe, mostrar el
 * ícono roto del navegador se ve peor que el rectángulo de color con el
 * código — así que se cae a eso ante un error de carga. Lo usan tanto
 * EditorCanvas.tsx (lienzo interactivo) como PlanoSvg.tsx (vista de
 * exportación/impresión).
 */
export function IconoObjeto({ src, width, height, opacity, color, seleccionado = false }: {
  src: string;
  width: number;
  height: number;
  opacity: number;
  color: string;
  seleccionado?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <rect
        width={width}
        height={height}
        fill={color}
        fillOpacity={opacity * 0.22}
        stroke={color}
        strokeWidth={seleccionado ? 2 : 1.2}
      />
    );
  }
  return <image href={src} width={width} height={height} opacity={opacity} onError={() => setError(true)} />;
}

/** Todos los PNG isométricos nuevos (public/symbols/<Categoría>/…) comparten este lienzo. */
const ISO_ASSET_ASPECT = 1536 / 1024;

/**
 * Variante para los símbolos con `estiloIcono: "isometrico"` — a diferencia
 * de `IconoObjeto`, no estira la imagen a un ancho×alto arbitrario: mantiene
 * la proporción real del PNG y la ancla en su centro-inferior (convención
 * estándar de sprites isométricos), que es el punto que le pasa
 * `centroYEscalaSimbolo` en `editor/geometry/isometric.ts`.
 */
export function IconoObjetoIsometrico({
  src,
  anchorXPx,
  anchorYPx,
  displayWidthPx,
  opacity,
  color,
  seleccionado = false,
}: {
  src: string;
  anchorXPx: number;
  anchorYPx: number;
  displayWidthPx: number;
  opacity: number;
  color: string;
  seleccionado?: boolean;
}) {
  const [error, setError] = useState(false);
  const displayHeightPx = displayWidthPx / ISO_ASSET_ASPECT;
  const x = anchorXPx - displayWidthPx / 2;
  const y = anchorYPx - displayHeightPx;

  if (error) {
    return (
      <rect
        x={x}
        y={y}
        width={displayWidthPx}
        height={displayHeightPx}
        fill={color}
        fillOpacity={opacity * 0.22}
        stroke={color}
        strokeWidth={seleccionado ? 2 : 1.2}
      />
    );
  }
  return (
    <image
      href={encodeURI(src)}
      x={x}
      y={y}
      width={displayWidthPx}
      height={displayHeightPx}
      opacity={opacity}
      preserveAspectRatio="xMidYMax slice"
      onError={() => setError(true)}
    />
  );
}
