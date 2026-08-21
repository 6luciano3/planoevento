import type { ObjetoPlano } from "@/types/editor";
import type { CapaPlano } from "@/types/layer";

export interface ZonaCapa {
  capaId: string;
  nombre: string;
  color: string;
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

/** Capas estructurales que no representan una "zona" temática del predio. */
const CAPAS_SIN_ZONA = new Set(["Predio", "Circulación", "Textos", "Cotas y medidas", "Leyenda y rótulo"]);

const MARGEN_M = 1.4;

/**
 * Agrupa los símbolos colocados en un panel de fondo por capa — como los
 * carteles de color de "Artesanías" o "Expositores" de un mapa de feria
 * ilustrado. Si los objetos de una capa están muy dispersos (el panel
 * quedaría enorme y vacío), se omite esa capa en vez de dibujar un
 * rectángulo gigante sin sentido.
 */
export function calcularZonasPorCapa(objetos: ObjetoPlano[], capas: CapaPlano[]): ZonaCapa[] {
  const zonas: ZonaCapa[] = [];

  for (const capa of capas) {
    if (capa.esBase || CAPAS_SIN_ZONA.has(capa.nombre)) continue;
    const delaCapa = objetos.filter((o) => o.capaId === capa.id && o.visible && o.tipo === "simbolo");
    if (delaCapa.length < 2) continue;

    const minX = Math.min(...delaCapa.map((o) => o.posicion.x));
    const minY = Math.min(...delaCapa.map((o) => o.posicion.y));
    const maxX = Math.max(...delaCapa.map((o) => o.posicion.x + o.anchoM));
    const maxY = Math.max(...delaCapa.map((o) => o.posicion.y + o.largoM));
    const anchoBbox = maxX - minX;
    const altoBbox = maxY - minY;
    const areaBbox = anchoBbox * altoBbox;
    const areaObjetos = delaCapa.reduce((suma, o) => suma + o.anchoM * o.largoM, 0);

    // Objetos muy dispersos (ej. extintores en las esquinas) no forman una zona real.
    if (areaBbox > areaObjetos * 7) continue;

    zonas.push({
      capaId: capa.id,
      nombre: capa.nombre,
      color: capa.color,
      x: minX - MARGEN_M,
      y: minY - MARGEN_M,
      ancho: anchoBbox + MARGEN_M * 2,
      alto: altoBbox + MARGEN_M * 2,
    });
  }

  return zonas;
}
