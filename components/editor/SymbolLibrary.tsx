"use client";

import { Search } from "lucide-react";
import { useMemo, useState, type DragEvent } from "react";
import { buscarSimbolos, SYMBOL_CATALOG } from "@/symbols/symbol-catalog";
import { CATEGORIAS } from "@/symbols/symbol-types";
import { useSymbolStore } from "@/store/symbol-store";
import type { CategoriaSimbolo } from "@/types/symbol";

interface SymbolLibraryProps {
  onArrastrarInicio: (event: DragEvent<HTMLElement>, simboloId: string) => void;
  /** En pantallas chicas, la biblioteca es un panel deslizable — true cuando está abierto. */
  abierto?: boolean;
}

/**
 * Muestra el SVG real del componente (public/symbols/…). Todavía no todos
 * los ~90 elementos del catálogo tienen su archivo dibujado (ver
 * public/symbols/README.md) — mientras no exista, cae en el cuadrado de
 * color en vez de mostrar el ícono roto del navegador.
 */
function SymbolSwatch({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error) return <span className="symbol-item-swatch" aria-hidden="true" />;
  return <img className="symbol-item-swatch" src={src} alt={alt} onError={() => setError(true)} />;
}

/** Paleta izquierda del editor — Pantalla 17 "Biblioteca de elementos" (HU-ORG-19/20/21). */
export function SymbolLibrary({ onArrastrarInicio, abierto = false }: SymbolLibraryProps) {
  const { busqueda, categoriaActiva, setBusqueda, setCategoria, registrarUso } = useSymbolStore();

  const resultados = useMemo(() => {
    if (busqueda.trim()) return buscarSimbolos(busqueda);
    if (categoriaActiva === "todas") return Object.values(SYMBOL_CATALOG).flat();
    return SYMBOL_CATALOG[categoriaActiva as CategoriaSimbolo];
  }, [busqueda, categoriaActiva]);

  return (
    <aside className={`symbol-library ${abierto ? "panel-abierto" : ""}`}>
      <div className="symbol-search">
        <div className="symbol-search-box">
          <Search size={15} />
          <input
            type="search"
            placeholder="Buscar componente…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
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
            <SymbolSwatch src={simbolo.icono} alt="" />
            <span className="symbol-item-label">{simbolo.nombre}</span>
          </button>
        ))}
        {resultados.length === 0 ? <p className="symbol-empty">No se encontraron componentes.</p> : null}
      </div>
    </aside>
  );
}
