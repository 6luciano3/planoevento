"use client";

import { useState, useCallback } from "react";
import type { CapaTopoId, ResultadoImportacionTopo } from "@/types/topoexport";
import type { Predio } from "@/types/location";
import * as topoExportService from "@/services/topoexport.service";

/** Flujo de la Pantalla 04 — Configurar importación TopoExport (HU-ORG-09). */
export function useTopoExport(predio: Pick<Predio, "latitud" | "longitud">) {
  const [consultando, setConsultando] = useState(false);
  const [capasDisponibles, setCapasDisponibles] = useState<CapaTopoId[]>([]);
  const [resultado, setResultado] = useState<ResultadoImportacionTopo | null>(null);

  const consultar = useCallback(async () => {
    setConsultando(true);
    const { capas } = await topoExportService.consultarDisponibilidad(predio);
    setCapasDisponibles(capas);
    setConsultando(false);
  }, [predio]);

  const importar = useCallback(
    async (capasSeleccionadas: CapaTopoId[]) => {
      setConsultando(true);
      const res = await topoExportService.importarCapas(predio, capasSeleccionadas);
      setResultado(res);
      setConsultando(false);
      return res;
    },
    [predio]
  );

  return { consultando, capasDisponibles, resultado, consultar, importar };
}
