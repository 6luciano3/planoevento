"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { TemplateCard } from "@/components/projects/TemplateCard";
import { PLANTILLAS_PLANO } from "@/config/plantillas";
import type { PlantillaPlano } from "@/types/template";

/** Pantalla 14 — Plantillas: elegir una distribución inicial de feria o evento para empezar a editar. */
export default function PlantillasPage() {
  const router = useRouter();

  function elegir(plantilla: PlantillaPlano) {
    router.push(`/proyectos/nuevo?plantilla=${plantilla.id}`);
  }

  return (
    <>
      <AppHeader volverA="/proyectos" volverLabel="Mis planos" />
      <div className="app-shell">
        <div className="app-shell-head">
          <div>
            <h1>Plantillas de ferias y eventos</h1>
            <p className="sub-lede">
              Elegí una distribución inicial ya armada con stands, servicios y señalización — vas a poder mover,
              agregar o borrar cualquier elemento después, como en un plano en blanco.
            </p>
          </div>
        </div>

        <div className="project-grid">
          {PLANTILLAS_PLANO.map((p) => (
            <TemplateCard key={p.id} plantilla={p} onElegir={elegir} />
          ))}
        </div>
      </div>
    </>
  );
}
