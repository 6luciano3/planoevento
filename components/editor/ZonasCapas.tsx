import { Store, Droplets, HeartPulse, Zap, Car, Trees, MapPin, type LucideIcon } from "lucide-react";
import { metrosAIsometrico, type ConfigIsometrica } from "@/editor/geometry/isometric";
import type { ZonaCapa } from "@/editor/geometry/zonas";

const ICONO_POR_NOMBRE: Record<string, LucideIcon> = {
  Stands: Store,
  Servicios: Droplets,
  Emergencias: HeartPulse,
  Electricidad: Zap,
  Estacionamiento: Car,
  Vegetación: Trees,
};

interface ZonasCapasProps {
  zonas: ZonaCapa[];
  config: ConfigIsometrica;
}

/**
 * Fondo de color por zona detrás de los símbolos de una misma capa — el
 * cartelito de "Artesanías" / "Expositores" de un mapa de feria ilustrado,
 * en vez del lienzo técnico plano. Compartido por EditorCanvas.tsx
 * (interactivo) y PlanoSvg.tsx (exportación/impresión).
 */
export function ZonasCapas({ zonas, config }: ZonasCapasProps) {
  return (
    <g pointerEvents="none">
      {zonas.map((zona) => {
        const Icono = ICONO_POR_NOMBRE[zona.nombre] ?? MapPin;
        const esquinasM = [
          { x: zona.x, y: zona.y },
          { x: zona.x + zona.ancho, y: zona.y },
          { x: zona.x + zona.ancho, y: zona.y + zona.alto },
          { x: zona.x, y: zona.y + zona.alto },
        ];
        const puntos = esquinasM.map((p) => metrosAIsometrico(p, config));
        const puntosStr = puntos.map((p) => `${p.x},${p.y}`).join(" ");
        // Esquina más "arriba" en pantalla del rombo — ahí va la etiqueta.
        const anclaEtiqueta = puntos.reduce((a, b) => (b.y < a.y ? b : a));
        const anchoEtiqueta = Math.min(140, 20 + zona.nombre.length * 8);

        return (
          <g key={zona.capaId}>
            <polygon points={puntosStr} fill={zona.color} fillOpacity={0.16} stroke={zona.color} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="5 4" />
            <rect x={anclaEtiqueta.x - anchoEtiqueta / 2} y={anclaEtiqueta.y - 13} width={anchoEtiqueta} height={26} rx={13} fill={zona.color} />
            <g transform={`translate(${anclaEtiqueta.x - anchoEtiqueta / 2 + 10} ${anclaEtiqueta.y})`}>
              <Icono size={13} color="#fff" x={-6.5} y={-6.5} />
            </g>
            <text x={anclaEtiqueta.x - anchoEtiqueta / 2 + 24} y={anclaEtiqueta.y + 4.5} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#fff">
              {zona.nombre}
            </text>
          </g>
        );
      })}
    </g>
  );
}
