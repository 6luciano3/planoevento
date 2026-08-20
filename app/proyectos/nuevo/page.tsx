"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { WizardSteps } from "@/components/layout/WizardSteps";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { useProjectStore } from "@/store/project-store";
import type { Evento } from "@/types/project";
import type { Predio } from "@/types/location";

/** Pantalla 06 — Nuevo proyecto, paso 1 de 4 del asistente. */
export default function NuevoProyectoPage() {
  const router = useRouter();
  const crear = useProjectStore((s) => s.crear);

  function alCrear(evento: Evento, predio: Partial<Predio>) {
    const proyecto = crear(evento, predio);
    router.push(`/proyectos/${proyecto.id}/ubicacion?wizard=1`);
  }

  return (
    <>
      <AppHeader volverA="/proyectos" volverLabel="Mis planos" />
      <div className="app-shell">
        <WizardSteps actual={1} />
        <h1>Nuevo proyecto</h1>
        <p className="sub-lede">Completá los datos básicos del evento y del lugar donde se realizará.</p>
        <ProjectForm onCrear={alCrear} />
      </div>
    </>
  );
}
