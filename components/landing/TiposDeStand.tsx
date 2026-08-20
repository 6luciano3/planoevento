import Link from "next/link";
import { LISTA_TIPOS_STAND } from "@/config/tipos-stand";

/** Landing — rubros de stand que ofrece la biblioteca del editor (config/tipos-stand.ts). */
export function TiposDeStand() {
  return (
    <div className="rubro-grid">
      {LISTA_TIPOS_STAND.map(({ id, nombre, icono: Icono, color }) => (
        <Link className="rubro-item" href="/proyectos/nuevo" key={id}>
          <span className="rubro-icon" style={{ background: `${color}1F`, color }}>
            <Icono size={22} />
          </span>
          <span>{nombre}</span>
        </Link>
      ))}
    </div>
  );
}
