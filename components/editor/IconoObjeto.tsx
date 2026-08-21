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
