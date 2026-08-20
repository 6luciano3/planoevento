import type { DefinicionSimbolo } from "@/types/symbol";
import type { ObjetoPlano } from "@/types/editor";
import type { Punto } from "@/types/location";
import { obtenerSimbolo } from "./symbol-catalog";

let contador = 0;
function nuevoId(): string {
  contador += 1;
  return `obj-${Date.now().toString(36)}-${contador}`;
}

/**
 * Crea un ObjetoPlano a partir de una definición de la biblioteca, en la
 * posición donde el usuario soltó el símbolo — HU-ORG-21.
 */
export function crearObjetoDesdeSimbolo(
  simboloId: string,
  posicion: Punto,
  capaId: string,
  siguienteNumero: number
): ObjetoPlano | null {
  const def: DefinicionSimbolo | undefined = obtenerSimbolo(simboloId);
  if (!def) return null;

  const codigo = def.prefijo ? `${def.prefijo}-${String(siguienteNumero).padStart(2, "0")}` : undefined;

  return {
    id: nuevoId(),
    simboloId: def.id,
    tipo: "simbolo",
    codigo,
    nombreVisible: def.nombre,
    capaId,
    posicion,
    anchoM: def.defaultWidth,
    largoM: def.defaultHeight,
    rotacionGrados: 0,
    color: "#C2410C",
    transparencia: 100,
    ordenVisual: siguienteNumero,
    visible: true,
    bloqueado: false,
    mostrarNombre: false,
    mostrarMedidas: false,
  };
}
