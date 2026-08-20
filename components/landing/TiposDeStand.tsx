import {
  Utensils,
  Palette,
  Shirt,
  ShoppingBasket,
  Sprout,
  Coffee,
  Gem,
} from "lucide-react";

const RUBROS = [
  { Icono: Utensils, etiqueta: "Gastronomía y food trucks" },
  { Icono: Palette, etiqueta: "Arte y manualidades" },
  { Icono: Shirt, etiqueta: "Indumentaria y textiles" },
  { Icono: ShoppingBasket, etiqueta: "Almacén y productos regionales" },
  { Icono: Sprout, etiqueta: "Vivero y plantas" },
  { Icono: Coffee, etiqueta: "Cafetería y desayunos" },
  { Icono: Gem, etiqueta: "Bijouterie y accesorios" },
];

/** Landing — rubros típicos que se arman con la biblioteca de stands. */
export function TiposDeStand() {
  return (
    <div className="rubro-grid">
      {RUBROS.map(({ Icono, etiqueta }) => (
        <div className="rubro-item" key={etiqueta}>
          <span className="rubro-icon">
            <Icono size={22} />
          </span>
          <span>{etiqueta}</span>
        </div>
      ))}
    </div>
  );
}
