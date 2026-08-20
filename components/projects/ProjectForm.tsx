"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TIPOS_EVENTO } from "@/lib/constants";
import type { Evento } from "@/types/project";
import type { Predio } from "@/types/location";

interface ProjectFormProps {
  onCrear: (evento: Evento, predio: Partial<Predio>) => void;
}

/** Pantalla 02/06 — "Nuevo proyecto": datos del evento y del predio. */
export function ProjectForm({ onCrear }: ProjectFormProps) {
  const [evento, setEvento] = useState<Evento>({
    nombre: "",
    tipo: "FERIA",
    organizador: "",
    documentoOrganizador: "",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "09:00",
    horaFin: "22:00",
    asistentesEstimados: 0,
  });

  const [predio, setPredio] = useState<Partial<Predio>>({
    nombre: "",
    provincia: "",
    municipio: "",
    localidad: "",
    direccion: "",
    superficieM2: 0,
  });

  function enviar(e: FormEvent) {
    e.preventDefault();
    onCrear(evento, predio);
  }

  return (
    <form className="project-form" onSubmit={enviar}>
      <fieldset>
        <legend>Datos del evento</legend>
        <div className="form-grid">
          <Input label="Nombre del evento" required value={evento.nombre} onChange={(e) => setEvento({ ...evento, nombre: e.target.value })} />
          <Select
            label="Tipo de evento"
            options={TIPOS_EVENTO.map((t) => ({ value: t.id, label: t.label }))}
            value={evento.tipo}
            onChange={(e) => setEvento({ ...evento, tipo: e.target.value as Evento["tipo"] })}
          />
          <Input label="Organizador" required value={evento.organizador} onChange={(e) => setEvento({ ...evento, organizador: e.target.value })} />
          <Input label="CUIT o documento" value={evento.documentoOrganizador} onChange={(e) => setEvento({ ...evento, documentoOrganizador: e.target.value })} />
          <Input label="Fecha de inicio" type="date" required value={evento.fechaInicio} onChange={(e) => setEvento({ ...evento, fechaInicio: e.target.value })} />
          <Input label="Fecha de finalización" type="date" value={evento.fechaFin} onChange={(e) => setEvento({ ...evento, fechaFin: e.target.value })} />
          <Input label="Hora de inicio" type="time" value={evento.horaInicio} onChange={(e) => setEvento({ ...evento, horaInicio: e.target.value })} />
          <Input label="Hora de finalización" type="time" value={evento.horaFin} onChange={(e) => setEvento({ ...evento, horaFin: e.target.value })} />
          <Input
            label="Asistentes estimados"
            type="number"
            min={0}
            value={evento.asistentesEstimados}
            onChange={(e) => setEvento({ ...evento, asistentesEstimados: Number(e.target.value) })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Datos del lugar</legend>
        <div className="form-grid">
          <Input label="Nombre del predio" required value={predio.nombre} onChange={(e) => setPredio({ ...predio, nombre: e.target.value })} />
          <Input label="Provincia" required value={predio.provincia} onChange={(e) => setPredio({ ...predio, provincia: e.target.value })} />
          <Input label="Municipio" required value={predio.municipio} onChange={(e) => setPredio({ ...predio, municipio: e.target.value })} />
          <Input label="Localidad" value={predio.localidad} onChange={(e) => setPredio({ ...predio, localidad: e.target.value })} />
          <Input label="Dirección" value={predio.direccion} onChange={(e) => setPredio({ ...predio, direccion: e.target.value })} />
          <Input
            label="Superficie aproximada (m²)"
            type="number"
            min={0}
            value={predio.superficieM2}
            onChange={(e) => setPredio({ ...predio, superficieM2: Number(e.target.value) })}
          />
        </div>
      </fieldset>

      <div className="form-actions">
        <Button type="submit" size="lg">
          Continuar al editor
        </Button>
      </div>
    </form>
  );
}
