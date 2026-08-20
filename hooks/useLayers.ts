"use client";

import {
  useCapas,
  actualizarCapa,
  alternarVisibilidad,
  alternarBloqueo,
  crearCapa,
  eliminarCapa,
  ocultarTodas,
  bloquearTodas,
  restablecerCapas,
} from "@/store/layer-store";

export function useLayers() {
  const capas = useCapas();
  return {
    capas,
    actualizarCapa,
    alternarVisibilidad,
    alternarBloqueo,
    crearCapa,
    eliminarCapa,
    ocultarTodas,
    bloquearTodas,
    restablecerCapas,
  };
}
