import Link from "next/link";

interface AppHeaderProps {
  titulo?: string;
  volverA?: string;
  volverLabel?: string;
}

/** Encabezado simple para las pantallas internas de la app (fuera de la landing). */
export function AppHeader({ titulo, volverA, volverLabel = "Volver" }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="wrap app-header-row">
        <Link className="brand" href="/">
          <svg className="brand-mark" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.4" />
            <path d="M13 4L13 8M13 18L13 22M4 13L8 13M18 13L22 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M13 5L15.4 12.6L13 21L10.6 12.6L13 5Z" fill="currentColor" />
          </svg>
          <span>PlanoEvento</span>
        </Link>
        {volverA ? (
          <Link className="link-btn" href={volverA}>
            ← {volverLabel}
          </Link>
        ) : null}
        {titulo ? <span className="app-header-title">{titulo}</span> : null}
      </div>
    </header>
  );
}
