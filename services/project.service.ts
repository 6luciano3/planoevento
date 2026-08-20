import type { ProyectoPlano, Evento } from "@/types/project";
import { leer, guardar } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { CAPAS_INICIALES } from "@/config/layer-presets";
import { getPaperSize } from "@/config/paper-sizes";

/**
 * CRUD de proyectos. Hoy persiste en localStorage; la firma de estas
 * funciones es la que debería conservar app/api/proyectos/route.ts cuando
 * pase a hablar con una base real (RF-01, RF-02, RF-20).
 */

function nuevoId(prefijo: string): string {
  return `${prefijo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function listarProyectos(): ProyectoPlano[] {
  return leer<ProyectoPlano[]>(STORAGE_KEYS.proyectos, []);
}

export function obtenerProyecto(id: string): ProyectoPlano | undefined {
  return listarProyectos().find((p) => p.id === id);
}

export function crearProyecto(evento: Evento, predioParcial: Partial<ProyectoPlano["predio"]>): ProyectoPlano {
  const ahora = new Date().toISOString();
  const hoja = getPaperSize("A1");

  const nuevo: ProyectoPlano = {
    id: nuevoId("proy"),
    nombre: evento.nombre || "Proyecto sin nombre",
    estado: "BORRADOR",
    fechaCreacion: ahora,
    fechaModificacion: ahora,
    evento,
    predio: {
      id: nuevoId("predio"),
      nombre: predioParcial.nombre ?? "",
      provincia: predioParcial.provincia ?? "",
      municipio: predioParcial.municipio ?? "",
      localidad: predioParcial.localidad ?? "",
      direccion: predioParcial.direccion ?? "",
      latitud: predioParcial.latitud ?? 0,
      longitud: predioParcial.longitud ?? 0,
      superficieM2: predioParcial.superficieM2 ?? 0,
      limite: predioParcial.limite ?? [],
    },
    base: { origen: "ninguna", capasTopo: [] },
    plano: {
      id: nuevoId("plano"),
      nombre: "Plano general",
      unidadMedida: "METRO",
      escalaNumerica: 500,
      fechaActualizacion: ahora,
      hoja: {
        tamano: "A1",
        orientacion: "HORIZONTAL",
        anchoMm: hoja.heightMm,
        altoMm: hoja.widthMm,
        margenSuperiorMm: 15,
        margenInferiorMm: 15,
        margenIzquierdoMm: 15,
        margenDerechoMm: 15,
        mostrarCuadricula: true,
        mostrarFondo: true,
      },
      caratula: {
        tituloPlano: "Plano general del evento",
        nombreEvento: evento.nombre,
        organizador: evento.organizador,
        documentoOrganizador: evento.documentoOrganizador,
        ubicacion: predioParcial.nombre ?? "",
        municipio: predioParcial.municipio ?? "",
        provincia: predioParcial.provincia ?? "",
        fechaEvento: evento.fechaInicio,
        horario: `${evento.horaInicio} a ${evento.horaFin}`,
        superficie: "",
        escala: "1:500",
        autor: evento.organizador,
        numeroPlano: "01",
        version: "01",
        fechaElaboracion: ahora,
        observaciones: "",
      },
    },
    capas: CAPAS_INICIALES.map((c) => ({ ...c, id: nuevoId("capa") })),
    objetos: [],
  };

  const proyectos = listarProyectos();
  guardar(STORAGE_KEYS.proyectos, [...proyectos, nuevo]);
  return nuevo;
}

export function guardarProyecto(actualizado: ProyectoPlano): void {
  const proyectos = listarProyectos();
  const conCambios = proyectos.map((p) =>
    p.id === actualizado.id ? { ...actualizado, fechaModificacion: new Date().toISOString() } : p
  );
  guardar(STORAGE_KEYS.proyectos, conCambios);
}

export function eliminarProyecto(id: string): void {
  guardar(STORAGE_KEYS.proyectos, listarProyectos().filter((p) => p.id !== id));
}

export function duplicarProyecto(id: string): ProyectoPlano | null {
  const original = obtenerProyecto(id);
  if (!original) return null;
  const ahora = new Date().toISOString();
  const copia: ProyectoPlano = {
    ...original,
    id: nuevoId("proy"),
    nombre: `${original.nombre} (copia)`,
    estado: "BORRADOR",
    fechaCreacion: ahora,
    fechaModificacion: ahora,
  };
  guardar(STORAGE_KEYS.proyectos, [...listarProyectos(), copia]);
  return copia;
}
