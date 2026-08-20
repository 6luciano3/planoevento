import type { ProyectoPlano } from "@/types/project";
import type { ItemLeyenda } from "@/types/plan";

/** Genera la leyenda automáticamente a partir de los objetos colocados — HU-ORG-35. */
export function generarLeyenda(proyecto: ProyectoPlano): ItemLeyenda[] {
  const conteos = new Map<string, { nombre: string; codigo: string; cantidad: number }>();

  for (const objeto of proyecto.objetos) {
    if (!objeto.codigo) continue;
    const prefijo = objeto.codigo.split("-")[0];
    const previo = conteos.get(prefijo);
    if (previo) {
      previo.cantidad += 1;
    } else {
      conteos.set(prefijo, { nombre: objeto.nombreVisible, codigo: prefijo, cantidad: 1 });
    }
  }

  const ocultos = new Set(proyecto.leyendaOcultos ?? []);

  return Array.from(conteos.entries()).map(([prefijo, info]) => ({
    id: prefijo,
    simbolo: prefijo,
    codigo: info.codigo,
    nombre: info.nombre,
    cantidad: info.cantidad,
    visible: !ocultos.has(prefijo),
  }));
}
