import type { ObjetoPlantilla, PlantillaPlano } from "@/types/template";

/**
 * 15 plantillas de plano — Pantalla 14 "Plantillas" (PRD, extensión).
 * Las coordenadas están en el sistema de metros del lienzo del editor
 * (60m de ancho x 40m de alto, ver ANCHO_PREDIO_M/ALTO_PREDIO_M en
 * components/editor/EditorCanvas.tsx). `capa` debe coincidir con un
 * `nombre` de CAPAS_INICIALES (config/layer-presets.ts).
 */

type Opts = Partial<Pick<ObjetoPlantilla, "anchoM" | "largoM" | "rotacionGrados">>;

function fila(simboloId: string, capa: string, xInicio: number, y: number, cantidad: number, espaciado: number, opts: Opts = {}): ObjetoPlantilla[] {
  return Array.from({ length: cantidad }, (_, i) => ({ simboloId, capa, x: xInicio + i * espaciado, y, ...opts }));
}

function grilla(
  simboloId: string,
  capa: string,
  xInicio: number,
  yInicio: number,
  columnas: number,
  filas: number,
  espX: number,
  espY: number,
  opts: Opts = {}
): ObjetoPlantilla[] {
  const out: ObjetoPlantilla[] = [];
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      out.push({ simboloId, capa, x: xInicio + c * espX, y: yInicio + f * espY, ...opts });
    }
  }
  return out;
}

function uno(simboloId: string, capa: string, x: number, y: number, opts: Opts = {}): ObjetoPlantilla {
  return { simboloId, capa, x, y, ...opts };
}

/** Kit de accesos, sanitarios y seguridad presente en todas las plantillas — perímetro del predio. */
const BASE_SERVICIOS: ObjetoPlantilla[] = [
  uno("entrada-principal", "Circulación", 27, 39, { anchoM: 6, largoM: 1 }),
  uno("salida-emergencia", "Circulación", 3, 39, { anchoM: 3, largoM: 1 }),
  uno("salida-emergencia", "Circulación", 54, 39, { anchoM: 3, largoM: 1 }),
  uno("bano-mujeres", "Servicios", 4, 35),
  uno("bano-hombres", "Servicios", 7, 35),
  uno("bano-accesible", "Servicios", 10, 35),
  uno("atencion-medica", "Emergencias", 50, 35),
  uno("puesto-seguridad", "Emergencias", 54, 35),
  uno("matafuego", "Emergencias", 2, 20),
  uno("matafuego", "Emergencias", 58, 20),
  uno("matafuego", "Emergencias", 30, 3),
  uno("punto-encuentro", "Emergencias", 30, 37),
  uno("tacho-basura", "Servicios", 15, 35),
  uno("tacho-basura", "Servicios", 45, 35),
  uno("tacho-basura", "Servicios", 30, 18),
  uno("cartel-informacion", "Servicios", 24, 35),
  uno("flecha-norte", "Textos", 57, 2, { anchoM: 2, largoM: 2 }),
  uno("estacionamiento-accesible", "Estacionamiento", 1, 1, { anchoM: 4, largoM: 3 }),
  uno("estacionamiento-bicicletas", "Estacionamiento", 6, 1, { anchoM: 3, largoM: 2 }),
];

export const PLANTILLAS_PLANO: PlantillaPlano[] = [
  {
    id: "feria-artesanias",
    nombre: "Feria de artesanías",
    tipoEvento: "FERIA",
    descripcion: "Puestos de artesanos en pasillos regulares, con canteros decorativos y punto de informes.",
    icono: "Store",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 6, 3, 8, 7, { anchoM: 3, largoM: 3 }),
      ...fila("cantero", "Vegetación", 6, 30, 4, 12, { anchoM: 2, largoM: 2 }),
      uno("punto-informacion", "Servicios", 30, 30),
    ],
  },
  {
    id: "feria-gastronomica",
    nombre: "Feria gastronómica y food trucks",
    tipoEvento: "EVENTO_GASTRONOMICO",
    descripcion: "Fila de food trucks, área de mesas compartida, barra y punto de gas y frío para los puesteros.",
    icono: "UtensilsCrossed",
    objetos: [
      ...BASE_SERVICIOS,
      ...fila("food-truck", "Stands", 4, 8, 8, 6.5, { anchoM: 5, largoM: 3 }),
      ...grilla("area-mesas", "Stands", 8, 16, 5, 2, 9, 6, { anchoM: 4, largoM: 3 }),
      uno("barra", "Stands", 4, 28, { anchoM: 6, largoM: 2 }),
      uno("parrilla", "Servicios", 46, 28),
      uno("parrilla", "Servicios", 50, 28),
      uno("camara-frigorifica", "Servicios", 54, 28),
      uno("punto-gas", "Servicios", 4, 32),
      uno("punto-gas", "Servicios", 50, 32),
      uno("punto-agua-gastro", "Servicios", 8, 32),
    ],
  },
  {
    id: "feria-libro",
    nombre: "Feria del libro",
    tipoEvento: "EVENTO_CULTURAL",
    descripcion: "Stands de editoriales, escenario para charlas y presentaciones, y rincón de lectura con mesas.",
    icono: "BookOpen",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 6, 2, 8, 7, { anchoM: 3, largoM: 3 }),
      uno("escenario", "Servicios", 42, 8, { anchoM: 12, largoM: 6 }),
      uno("cabina-tecnica", "Electricidad", 55, 10),
      ...grilla("area-mesas", "Stands", 8, 25, 4, 1, 9, 0, { anchoM: 4, largoM: 2 }),
      uno("punto-informacion", "Servicios", 30, 30),
    ],
  },
  {
    id: "feria-emprendedores",
    nombre: "Feria de emprendedores",
    tipoEvento: "FERIA",
    descripcion: "Muchos stands chicos y densos, pensados para emprendimientos locales con bajo presupuesto de espacio.",
    icono: "Rocket",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 5, 8, 8, 3, 6.5, 7, { anchoM: 2.5, largoM: 2.5 }),
      uno("punto-informacion", "Servicios", 30, 30),
      uno("punto-informacion", "Servicios", 8, 30),
    ],
  },
  {
    id: "exposicion-rural",
    nombre: "Exposición rural y ganadera",
    tipoEvento: "EXPOSICION",
    descripcion: "Corrales delimitados con vallado, pista central, oficina de jurado y zona de carga y descarga.",
    icono: "Wheat",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("valla", "Predio", 6, 8, 5, 3, 9, 7, { anchoM: 6, largoM: 5 }),
      uno("escenario", "Servicios", 46, 10, { anchoM: 10, largoM: 8, rotacionGrados: 0 }),
      uno("oficina", "Servicios", 46, 22, { anchoM: 6, largoM: 4 }),
      uno("carga-descarga", "Estacionamiento", 2, 30, { anchoM: 6, largoM: 3 }),
      uno("carga-descarga", "Estacionamiento", 52, 30, { anchoM: 6, largoM: 3 }),
      ...fila("estacionamiento-proveedores", "Estacionamiento", 20, 32, 3, 6, { anchoM: 4, largoM: 2 }),
    ],
  },
  {
    id: "festival-musica",
    nombre: "Festival de música",
    tipoEvento: "FESTIVAL",
    descripcion: "Escenario principal con torres de sonido y pantallas, backstage, generadores y food trucks.",
    icono: "Music",
    objetos: [
      ...BASE_SERVICIOS,
      uno("escenario", "Servicios", 18, 6, { anchoM: 22, largoM: 8 }),
      uno("torre-sonido", "Electricidad", 15, 8),
      uno("torre-sonido", "Electricidad", 43, 8),
      uno("cabina-tecnica", "Electricidad", 29, 17),
      uno("pantalla", "Servicios", 10, 10, { anchoM: 4, largoM: 3 }),
      uno("pantalla", "Servicios", 48, 10, { anchoM: 4, largoM: 3 }),
      uno("generador-electrico", "Electricidad", 4, 6),
      uno("generador-electrico", "Electricidad", 56, 6),
      uno("vestuario", "Servicios", 29, 3, { anchoM: 6, largoM: 2.5 }),
      ...fila("food-truck", "Stands", 6, 26, 6, 8, { anchoM: 5, largoM: 3 }),
      ...fila("punto-agua-potable", "Servicios", 10, 32, 4, 12),
      ...fila("iluminacion-emergencia", "Emergencias", 4, 22, 2, 52),
    ],
  },
  {
    id: "feria-navidena",
    nombre: "Feria navideña",
    tipoEvento: "FERIA",
    descripcion: "Stands de regalos y comida alrededor de un árbol central, con zona de mesas para las familias.",
    icono: "Gift",
    objetos: [
      ...BASE_SERVICIOS,
      uno("arbol-grande", "Vegetación", 29, 17, { anchoM: 5, largoM: 5 }),
      ...fila("stand", "Stands", 6, 8, 6, 8, { anchoM: 3, largoM: 3 }),
      ...fila("stand", "Stands", 6, 26, 6, 8, { anchoM: 3, largoM: 3 }),
      ...fila("food-truck", "Stands", 6, 33, 3, 10, { anchoM: 5, largoM: 3 }),
      ...grilla("area-mesas", "Stands", 40, 20, 2, 2, 7, 6, { anchoM: 4, largoM: 3 }),
    ],
  },
  {
    id: "muestra-arte",
    nombre: "Muestra de arte y exposición",
    tipoEvento: "EXPOSICION",
    descripcion: "Salas amplias para exhibir obras, sala audiovisual con cabina técnica y punto de informes.",
    icono: "Palette",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 5, 3, 10, 8, { anchoM: 7, largoM: 6 }),
      uno("cabina-tecnica", "Electricidad", 55, 10),
      uno("punto-informacion", "Servicios", 30, 32),
    ],
  },
  {
    id: "congreso-empresarial",
    nombre: "Congreso y expo empresarial",
    tipoEvento: "OTRO",
    descripcion: "Auditorio para la apertura, stands de sponsors y zona de mesas para networking.",
    icono: "Building2",
    objetos: [
      ...BASE_SERVICIOS,
      uno("escenario", "Servicios", 20, 6, { anchoM: 18, largoM: 7 }),
      ...grilla("stand", "Stands", 6, 16, 6, 3, 8, 7, { anchoM: 3, largoM: 3 }),
      ...grilla("area-mesas", "Stands", 10, 32, 4, 1, 10, 0, { anchoM: 4, largoM: 2 }),
      uno("oficina", "Servicios", 4, 6, { anchoM: 5, largoM: 4 }),
      uno("cabina-tecnica", "Electricidad", 55, 8),
    ],
  },
  {
    id: "feria-tecnologia",
    nombre: "Feria de tecnología",
    tipoEvento: "EXPOSICION",
    descripcion: "Stands de expositores con pantallas de demostración y escenario para presentaciones en vivo.",
    icono: "Cpu",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 6, 3, 8, 7, { anchoM: 3, largoM: 3 }),
      uno("pantalla", "Servicios", 8, 8, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 46, 8, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 8, 22, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 46, 22, { anchoM: 2, largoM: 2 }),
      uno("escenario", "Servicios", 44, 26, { anchoM: 12, largoM: 6 }),
      uno("torre-sonido", "Electricidad", 42, 28),
      uno("torre-sonido", "Electricidad", 58, 28),
      uno("punto-informacion", "Servicios", 30, 32),
    ],
  },
  {
    id: "mercado-pulgas",
    nombre: "Mercado de pulgas / feria americana",
    tipoEvento: "FERIA",
    descripcion: "Muchos puestos chicos y pegados entre sí, pensados para vender ropa y objetos usados.",
    icono: "ShoppingBag",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 4, 8, 8, 4, 6, 6, { anchoM: 2, largoM: 2 }),
    ],
  },
  {
    id: "festival-cervecero",
    nombre: "Festival cervecero",
    tipoEvento: "FESTIVAL",
    descripcion: "Barras de cerveza artesanal, food trucks, mesas comunitarias y un escenario para bandas en vivo.",
    icono: "Beer",
    objetos: [
      ...BASE_SERVICIOS,
      ...fila("barra", "Stands", 6, 8, 6, 8, { anchoM: 5, largoM: 2.5 }),
      ...grilla("area-mesas", "Stands", 8, 16, 5, 3, 9, 6, { anchoM: 4, largoM: 3 }),
      ...fila("food-truck", "Stands", 6, 33, 4, 10, { anchoM: 5, largoM: 3 }),
      uno("camara-frigorifica", "Servicios", 52, 8),
      uno("camara-frigorifica", "Servicios", 56, 8),
      uno("escenario", "Servicios", 44, 12, { anchoM: 10, largoM: 6 }),
    ],
  },
  {
    id: "feria-mascotas",
    nombre: "Feria de mascotas",
    tipoEvento: "EXPOSICION",
    descripcion: "Stands de productos para mascotas, posta veterinaria, bebederos y escenario para concursos.",
    icono: "PawPrint",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 6, 3, 8, 7, { anchoM: 3, largoM: 3 }),
      uno("atencion-medica", "Emergencias", 30, 8, { anchoM: 4, largoM: 3 }),
      ...fila("punto-agua-potable", "Servicios", 10, 30, 3, 14),
      ...grilla("area-mesas", "Stands", 10, 32, 4, 1, 10, 0, { anchoM: 3, largoM: 2 }),
      uno("escenario", "Servicios", 44, 10, { anchoM: 10, largoM: 6 }),
    ],
  },
  {
    id: "kermes-escolar",
    nombre: "Kermés escolar",
    tipoEvento: "EVENTO_CULTURAL",
    descripcion: "Juegos y puestos solidarios organizados por grado, con puestos de comida y un escenario chico.",
    icono: "PartyPopper",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 6, 2, 8, 7, { anchoM: 3, largoM: 3 }),
      ...fila("puesto-gastronomico", "Stands", 6, 24, 5, 9, { anchoM: 4, largoM: 3 }),
      uno("escenario", "Servicios", 44, 10, { anchoM: 10, largoM: 5 }),
      ...grilla("area-mesas", "Stands", 44, 20, 2, 2, 6, 5, { anchoM: 3, largoM: 2 }),
    ],
  },
  {
    id: "feria-automotriz",
    nombre: "Feria automotriz",
    tipoEvento: "EXPOSICION",
    descripcion: "Grandes espacios para exhibir vehículos, playón de estacionamiento y escenario de presentación.",
    icono: "Car",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("stand", "Stands", 6, 8, 4, 3, 13, 8, { anchoM: 10, largoM: 6 }),
      ...grilla("estacionamiento-general", "Estacionamiento", 46, 8, 2, 6, 6, 4, { anchoM: 4, largoM: 2.5 }),
      uno("oficina", "Servicios", 6, 32, { anchoM: 5, largoM: 3 }),
      uno("pantalla", "Servicios", 14, 32, { anchoM: 3, largoM: 2 }),
      uno("escenario", "Servicios", 6, 24, { anchoM: 14, largoM: 6 }),
    ],
  },
];

export function obtenerPlantilla(id: string): PlantillaPlano | undefined {
  return PLANTILLAS_PLANO.find((p) => p.id === id);
}
