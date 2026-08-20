"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { useProjectStore } from "@/store/project-store";
import type { Evento } from "@/types/project";
import type { Predio } from "@/types/location";

/**
 * Pantalla 06 — Nuevo proyecto. Consolida en un único paso los datos del
 * evento y del predio (Pantallas 02, 03/08 y 09 del PRD son, en esta
 * versión del prototipo, configuraciones dentro del editor en vez de rutas
 * separadas — ver Panel de capas y Configurar hoja y escala allí).
 */
export default function NuevoProyectoPage() {
  const router = useRouter();
  const crear = useProjectStore((s) => s.crear);

  function alCrear(evento: Evento, predio: Partial<Predio>) {
    const proyecto = crear(evento, predio);
    router.push(`/proyectos/${proyecto.id}/editor`);
  }

  return (
    <>
      <AppHeader volverA="/proyectos" volverLabel="Mis planos" />
      <div className="app-shell">
        <h1>Nuevo proyecto</h1>
        <p className="sub-lede">Completá los datos básicos del evento y del lugar donde se realizará.</p>
        <ProjectForm onCrear={alCrear} />
      </div>
    </>
  );
}
