"use client";

import { useCapas, actualizarCapa, alternarVisibilidad, alternarBloqueo } from "@/store/layer-store";

export function useLayers() {
  const capas = useCapas();
  return { capas, actualizarCapa, alternarVisibilidad, alternarBloqueo };
}
