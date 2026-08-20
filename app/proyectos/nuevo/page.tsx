"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { WizardSteps } from "@/components/layout/WizardSteps";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { useProjectStore } from "@/store/project-store";
import { obtenerPlantilla } from "@/config/plantillas";
import type { Evento } from "@/types/project";
import type { Predio } from "@/types/location";

function NuevoProyectoContenido() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const crear = useProjectStore((s) => s.crear);
  const crearDesdePlantilla = useProjectStore((s) => s.crearDesdePlantilla);

  const plantilla = obtenerPlantilla(searchParams.get("plantilla") ?? "");

  function alCrear(evento: Evento, predio: Partial<Predio>) {
    if (plantilla) {
      const proyecto = crearDesdePlantilla(plantilla, evento, predio);
      router.push(`/proyectos/${proyecto.id}/editor`);
      return;
    }
    const proyecto = crear(evento, predio);
    router.push(`/proyectos/${proyecto.id}/ubicacion?wizard=1`);
  }

  return (
    <>
      <AppHeader volverA={plantilla ? "/proyectos/plantillas" : "/proyectos"} volverLabel={plantilla ? "Plantillas" : "Mis planos"} />
      <div className="app-shell">
        {plantilla ? null : <WizardSteps actual={1} />}
        <h1>{plantilla ? `Nuevo plano — ${plantilla.nombre}` : "Nuevo proyecto"}</h1>
        <p className="sub-lede">
          {plantilla
            ? `Completá los datos del evento y arrancás directo en el editor con los ${plantilla.objetos.length} elementos de esta plantilla ya ubicados.`
            : "Completá los datos básicos del evento y del lugar donde se realizará."}
        </p>
        <ProjectForm onCrear={alCrear} />
      </div>
    </>
  );
}

/** Pantalla 06 — Nuevo proyecto, paso 1 de 4 del asistente (o creación directa desde una plantilla). */
export default function NuevoProyectoPage() {
  return (
    <Suspense fallback={null}>
      <NuevoProyectoContenido />
    </Suspense>
  );
}
