import { NextResponse } from "next/server";

/**
 * RF-01/RF-02/RF-20. Placeholder: el prototipo persiste en localStorage
 * (services/project.service.ts), así que esta ruta todavía no la usa
 * ningún componente. Queda lista para el día que haya una base real: mover
 * aquí el cuerpo de project.service.ts y hacer que ese archivo llame a
 * `fetch("/api/proyectos")` en vez de a `lib/storage.ts`.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Backend no implementado todavía. Ver docs/PRD-PlanoEvento.md §22." },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "Backend no implementado todavía. Ver docs/PRD-PlanoEvento.md §22." },
    { status: 501 }
  );
}
