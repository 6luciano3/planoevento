"use client";

import { useState, useCallback } from "react";
import type { CapaTopoId, ResultadoImportacionTopo } from "@/types/topoexport";
import type { Predio, Coordenadas } from "@/types/location";
import * as osmService from "@/services/openstreetmap.service";

type PredioParaConsulta = Pick<Predio, "latitud" | "longitud"> & { limite?: Coordenadas[] };

/** Flujo de la Pantalla 09 — Plano base con OpenStreetMap (HU-ORG-09). */
export function useOpenStreetMap(predio: PredioParaConsulta) {
  const [consultando, setConsultando] = useState(false);
  const [capasDisponibles, setCapasDisponibles] = useState<CapaTopoId[]>([]);
  const [resultado, setResultado] = useState<ResultadoImportacionTopo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const consultar = useCallback(async () => {
    setConsultando(true);
    const { capas, error: err } = await osmService.consultarDisponibilidad(predio);
    setCapasDisponibles(capas);
    setError(err ?? null);
    setConsultando(false);
  }, [predio]);

  const importar = useCallback(
    async (capasSeleccionadas: CapaTopoId[]) => {
      setConsultando(true);
      const res = await osmService.importarCapas(predio, capasSeleccionadas);
      setResultado(res);
      setConsultando(false);
      return res;
    },
    [predio]
  );

  return { consultando, capasDisponibles, resultado, error, consultar, importar };
}
