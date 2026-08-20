import type { LucideIcon } from "lucide-react";
import {
  Utensils,
  Palette,
  Shirt,
  ShoppingBasket,
  Sprout,
  Wine,
  Coffee,
  Croissant,
  Beef,
  CakeSlice,
  Gem,
  Hammer,
  BookOpen,
  Music,
  HeartPulse,
  Landmark,
} from "lucide-react";

export type TipoStandId = keyof typeof TIPOS_STAND;

export interface TipoStandDef {
  nombre: string;
  icono: LucideIcon;
  color: string;
}

/** Rubros de stand — reutilizable en la landing y en la biblioteca del editor (PRD §11.6/§13). */
export const TIPOS_STAND = {
  gastronomia: { nombre: "Gastronomía", icono: Utensils, color: "#F97316" },
  artesanias: { nombre: "Artesanías", icono: Palette, color: "#8B5CF6" },
  indumentaria: { nombre: "Indumentaria", icono: Shirt, color: "#EC4899" },
  productos_regionales: { nombre: "Productos regionales", icono: ShoppingBasket, color: "#A16207" },
  agricultura: { nombre: "Agricultura", icono: Sprout, color: "#16A34A" },
  bebidas: { nombre: "Bebidas", icono: Wine, color: "#7C3AED" },
  cafe_infusiones: { nombre: "Café e infusiones", icono: Coffee, color: "#92400E" },
  panificados: { nombre: "Panificados", icono: Croissant, color: "#D97706" },
  carnes_parrilla: { nombre: "Carnes y parrilla", icono: Beef, color: "#DC2626" },
  reposteria: { nombre: "Dulces y repostería", icono: CakeSlice, color: "#DB2777" },
  joyeria: { nombre: "Joyería", icono: Gem, color: "#0891B2" },
  oficios: { nombre: "Oficios", icono: Hammer, color: "#475569" },
  libros_cultura: { nombre: "Libros y cultura", icono: BookOpen, color: "#2563EB" },
  musica: { nombre: "Música", icono: Music, color: "#9333EA" },
  salud_bienestar: { nombre: "Salud y bienestar", icono: HeartPulse, color: "#E11D48" },
  institucional: { nombre: "Institucional", icono: Landmark, color: "#0369A1" },
} satisfies Record<string, TipoStandDef>;

export const LISTA_TIPOS_STAND: (TipoStandDef & { id: TipoStandId })[] = Object.entries(TIPOS_STAND).map(
  ([id, def]) => ({ id: id as TipoStandId, ...def })
);
