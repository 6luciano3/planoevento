export const STORAGE_KEYS = {
  proyectos: "planoevento:proyectos",
  sesion: "planoevento:sesion",
} as const;

export const TIPOS_EVENTO: { id: string; label: string }[] = [
  { id: "FERIA", label: "Feria" },
  { id: "FESTIVAL", label: "Festival" },
  { id: "EXPOSICION", label: "Exposición" },
  { id: "EVENTO_CULTURAL", label: "Evento cultural" },
  { id: "EVENTO_GASTRONOMICO", label: "Evento gastronómico" },
  { id: "EVENTO_DEPORTIVO", label: "Evento deportivo" },
  { id: "OTRO", label: "Otro" },
];

export const ESTADOS_PROYECTO_LABEL: Record<string, string> = {
  BORRADOR: "Borrador",
  COMPLETO: "Completo",
  EXPORTADO: "Exportado",
};
