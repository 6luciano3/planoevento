"use client";

import { Search } from "lucide-react";
import { useMemo, type DragEvent } from "react";
import { buscarSimbolos, SYMBOL_CATALOG } from "@/symbols/symbol-catalog";
import { CATEGORIAS } from "@/symbols/symbol-types";
import { useSymbolStore } from "@/store/symbol-store";
import type { CategoriaSimbolo } from "@/types/symbol";

interface SymbolLibraryProps {
  onArrastrarInicio: (event: DragEvent<HTMLElement>, simboloId: string) => void;
}

/** Paleta izquierda del editor — Pantalla 17 "Biblioteca de elementos" (HU-ORG-19/20/21). */
export function SymbolLibrary({ onArrastrarInicio }: SymbolLibraryProps) {
  const { busqueda, categoriaActiva, setBusqueda, setCategoria, registrarUso } = useSymbolStore();

  const resultados = useMemo(() => {
    if (busqueda.trim()) return buscarSimbolos(busqueda);
    if (categoriaActiva === "todas") return Object.values(SYMBOL_CATALOG).flat();
    return SYMBOL_CATALOG[categoriaActiva as CategoriaSimbolo];
  }, [busqueda, categoriaActiva]);

  return (
    <aside className="symbol-library">
      <div className="symbol-search">
        <Search size={15} />
        <input
          type="search"
          placeholder="Buscar componente…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="symbol-categories">
        <button className={categoriaActiva === "todas" ? "chip chip-active" : "chip"} onClick={() => setCategoria("todas")}>
          Todas
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            className={categoriaActiva === c.id ? "chip chip-active" : "chip"}
            onClick={() => setCategoria(c.id)}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      <div className="symbol-grid">
        {resultados.map((simbolo) => (
          <button
            key={simbolo.id}
            className="symbol-item"
            draggable
            onDragStart={(e) => {
              onArrastrarInicio(e, simbolo.id);
              registrarUso(simbolo.id);
            }}
            title={`${simbolo.nombre} · ${simbolo.defaultWidth}×${simbolo.defaultHeight} m`}
          >
            <span className="symbol-item-swatch" aria-hidden="true" />
            <span className="symbol-item-label">{simbolo.nombre}</span>
          </button>
        ))}
        {resultados.length === 0 ? <p className="symbol-empty">No se encontraron componentes.</p> : null}
      </div>
    </aside>
  );
}
