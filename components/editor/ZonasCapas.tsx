import { Store, Droplets, HeartPulse, Zap, Car, Trees, MapPin, type LucideIcon } from "lucide-react";
import { metrosAPixeles } from "@/editor/geometry/scale";
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
  zoom: number;
}

/**
 * Fondo de color por zona detrás de los símbolos de una misma capa — el
 * cartelito de "Artesanías" / "Expositores" de un mapa de feria ilustrado,
 * en vez del lienzo técnico plano. Compartido por EditorCanvas.tsx
 * (interactivo) y PlanoSvg.tsx (exportación/impresión).
 */
export function ZonasCapas({ zonas, zoom }: ZonasCapasProps) {
  return (
    <g pointerEvents="none">
      {zonas.map((zona) => {
        const Icono = ICONO_POR_NOMBRE[zona.nombre] ?? MapPin;
        const x = metrosAPixeles(zona.x, zoom);
        const y = metrosAPixeles(zona.y, zoom);
        const ancho = metrosAPixeles(zona.ancho, zoom);
        const alto = metrosAPixeles(zona.alto, zoom);
        const radio = Math.min(18, ancho / 8, alto / 8);
        const anchoEtiqueta = Math.min(ancho - 12, 20 + zona.nombre.length * 8);

        return (
          <g key={zona.capaId}>
            <rect x={x} y={y} width={ancho} height={alto} rx={radio} fill={zona.color} fillOpacity={0.12} stroke={zona.color} strokeOpacity={0.45} strokeWidth={1.5} strokeDasharray="5 4" />
            <rect x={x + 10} y={y - 13} width={anchoEtiqueta} height={26} rx={13} fill={zona.color} />
            <g transform={`translate(${x + 20} ${y})`}>
              <Icono size={13} color="#fff" x={-6.5} y={-6.5} />
            </g>
            <text x={x + 34} y={y + 4.5} fontFamily="Inter, sans-serif" fontWeight={700} fontSize={12} fill="#fff">
              {zona.nombre}
            </text>
          </g>
        );
      })}
    </g>
  );
}
