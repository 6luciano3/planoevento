import type { ObjetoPlantilla, PlantillaPlano } from "@/types/template";

/**
 * 15 plantillas de plano — Pantalla 14 "Plantillas" (PRD, extensión).
 * Las coordenadas están en el sistema de metros del lienzo del editor
 * (60m de ancho x 40m de alto, ver ANCHO_PREDIO_M/ALTO_PREDIO_M en
 * components/editor/EditorCanvas.tsx). `capa` debe coincidir con un
 * `nombre` de CAPAS_INICIALES (config/layer-presets.ts).
 *
 * Usan símbolos isométricos donde existe un equivalente cargado en el
 * catálogo (Fases 1-5) y símbolos planos donde no — mezclar ambos estilos
 * es la norma en el resto de la app, no una inconsistencia a corregir acá.
 * `anchoM`/`largoM` no distorsiona un ícono isométrico (su relación de
 * aspecto real viene de `aspectoIcono` del catálogo, no de estos valores);
 * la suma `anchoM + largoM` solo controla la escala del dibujo — ver
 * `centroYEscalaSimbolo` en editor/geometry/isometric.ts.
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

/** Igual que `fila`, pero rotando entre varios símbolos para que la hilera no se vea repetitiva. */
function filaVariada(simboloIds: string[], capa: string, xInicio: number, y: number, cantidad: number, espaciado: number, opts: Opts = {}): ObjetoPlantilla[] {
  return Array.from({ length: cantidad }, (_, i) => ({ simboloId: simboloIds[i % simboloIds.length], capa, x: xInicio + i * espaciado, y, ...opts }));
}

/** Igual que `grilla`, pero rotando entre varios símbolos. */
function grillaVariada(
  simboloIds: string[],
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
  let i = 0;
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      out.push({ simboloId: simboloIds[i % simboloIds.length], capa, x: xInicio + c * espX, y: yInicio + f * espY, ...opts });
      i++;
    }
  }
  return out;
}

function uno(simboloId: string, capa: string, x: number, y: number, opts: Opts = {}): ObjetoPlantilla {
  return { simboloId, capa, x, y, ...opts };
}

/** Kit de accesos, sanitarios y seguridad presente en todas las plantillas — perímetro del predio. */
const BASE_SERVICIOS: ObjetoPlantilla[] = [
  uno("entrada-principal-portico", "Circulación", 25, 36),
  uno("iso-salida-emergencia", "Circulación", 3, 38),
  uno("iso-salida-emergencia", "Circulación", 56, 38),
  uno("bano-mujeres", "Servicios", 4, 35),
  uno("bano-hombres", "Servicios", 7, 35),
  uno("bano-accesible", "Servicios", 10, 35),
  uno("iso-enfermeria", "Emergencias", 48, 33),
  uno("iso-puesto-seguridad", "Emergencias", 53, 34),
  uno("matafuego", "Emergencias", 2, 20),
  uno("matafuego", "Emergencias", 58, 20),
  uno("matafuego", "Emergencias", 30, 3),
  uno("iso-punto-encuentro", "Emergencias", 30, 37),
  uno("iso-papelero-urbano-negro", "Servicios", 15, 35),
  uno("iso-papelero-urbano-negro", "Servicios", 45, 35),
  uno("iso-papelero-urbano-negro", "Servicios", 30, 18),
  uno("iso-senal-informacion", "Servicios", 24, 35),
  uno("flecha-norte", "Textos", 57, 2, { anchoM: 2, largoM: 2 }),
  uno("modulo-estacionamiento-accesible", "Estacionamiento", 1, 2),
  uno("modulo-estacionamiento-bicicletas", "Estacionamiento", 6, 2),
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
      ...grillaVariada(
        ["stand-de-artesanias", "stand-de-artesanias-2", "stand-de-artesanias-3", "stand-de-artesanias-4", "ceramica-y-decoracion", "bijouterie", "textiles-y-tejidos", "velas-y-aromatizantes"],
        "Stands",
        6,
        8,
        6,
        3,
        8,
        7
      ),
      ...fila("jardinera", "Vegetación", 6, 30, 4, 12),
      uno("iso-puesto-informacion", "Servicios", 29, 29),
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
      ...fila("food-truck-stand", "Stands", 4, 8, 8, 6.5),
      ...grilla("mesa-sombrilla", "Stands", 8, 16, 5, 2, 9, 6),
      uno("barra", "Stands", 4, 28, { anchoM: 6, largoM: 2 }),
      uno("parrilla-stand", "Servicios", 46, 27),
      uno("parrilla-stand", "Servicios", 50, 27),
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
      ...grillaVariada(
        ["libros-literatura-general", "literatura-infantil", "libros-usados", "editorial-independiente", "comics-y-novelas-graficas", "publicaciones-universitarias", "feria-de-libro-1", "feria-de-libro-2", "feria-de-libro-3", "feria-de-libro-4", "material-educativo"],
        "Stands",
        6,
        8,
        6,
        2,
        8,
        7
      ),
      uno("iso-escenario-modular", "Servicios", 42, 8),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 55, 9),
      ...grilla("mesa-picnic", "Stands", 8, 25, 4, 1, 9, 0),
      uno("iso-puesto-informacion", "Servicios", 29, 29),
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
      ...grillaVariada(
        ["emprendedor-accesorios-y-bijouterie", "emprendedor-alimentos-artesanales", "emprendedor-ceramica-y-diseno", "emprendedor-cosmetica-natural", "emprendedor-indumentaria", "emprendedor-plantas-y-macetas", "emprendedor-textiles-y-decoracion", "emprendedor-velas-y-aromas"],
        "Stands",
        5,
        8,
        8,
        3,
        6.5,
        7
      ),
      uno("iso-puesto-informacion", "Servicios", 29, 29),
      uno("iso-puesto-informacion", "Servicios", 8, 29),
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
      uno("iso-escenario-principal", "Servicios", 46, 10),
      uno("iso-oficina-organizacion", "Servicios", 47, 22),
      uno("modulo-carga-descarga", "Estacionamiento", 2, 29),
      uno("modulo-carga-descarga", "Estacionamiento", 52, 29),
      ...fila("modulo-darsena-proveedores", "Estacionamiento", 20, 31, 3, 9),
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
      uno("iso-escenario-principal-cubierto", "Servicios", 17, 6, { anchoM: 20, largoM: 10 }),
      uno("iso-torre-megafonia", "Electricidad", 15, 8),
      uno("iso-torre-megafonia", "Electricidad", 43, 8),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 29, 17),
      uno("pantalla", "Servicios", 10, 10, { anchoM: 4, largoM: 3 }),
      uno("pantalla", "Servicios", 48, 10, { anchoM: 4, largoM: 3 }),
      uno("iso-generador-electrico-portatil", "Electricidad", 4, 6),
      uno("iso-generador-electrico-portatil", "Electricidad", 56, 6),
      uno("vestuario", "Servicios", 29, 3, { anchoM: 6, largoM: 2.5 }),
      ...fila("food-truck-stand", "Stands", 6, 26, 6, 8),
      ...fila("bebedero", "Servicios", 10, 32, 4, 12),
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
      uno("arbol-nativo-sombra", "Vegetación", 27, 15, { anchoM: 6, largoM: 6 }),
      ...filaVariada(["velas-y-aromatizantes", "bijouterie", "textiles-y-tejidos", "ceramica-y-decoracion", "quiosco", "indumentaria-y-accesorios"], "Stands", 6, 8, 6, 8),
      ...filaVariada(["stand-de-productores", "stand-institucional", "cosmetica-natural", "emprendedor-textiles-y-decoracion", "emprendedor-velas-y-aromas", "gastronomia"], "Stands", 6, 26, 6, 8),
      ...fila("food-truck-stand", "Stands", 6, 33, 3, 10),
      ...grilla("mesa-sombrilla", "Stands", 40, 20, 2, 2, 7, 6),
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
      ...grillaVariada(["carpa-de-exposicion", "stand-institucional", "material-educativo", "ceramica-y-decoracion"], "Stands", 6, 8, 5, 3, 10, 8, { anchoM: 7, largoM: 6 }),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 55, 9),
      uno("iso-puesto-informacion", "Servicios", 29, 31),
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
      uno("iso-salon-conferencias", "Servicios", 18, 5, { anchoM: 16, largoM: 8 }),
      ...grillaVariada(["stand-institucional", "stand-tecnologico", "stand-de-productores", "gran-pabellon-ferial-con-multiples-expositores"], "Stands", 6, 16, 6, 3, 8, 7),
      ...grilla("mesa-picnic", "Stands", 10, 32, 4, 1, 10, 0),
      uno("iso-oficina-organizacion", "Servicios", 4, 6),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 55, 8),
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
      ...grillaVariada(["stand-tecnologico", "stand-institucional", "dron-de-agricultura-de-precision", "riego-inteligente"], "Stands", 6, 8, 6, 3, 8, 7),
      uno("pantalla", "Servicios", 8, 8, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 46, 8, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 8, 22, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 46, 22, { anchoM: 2, largoM: 2 }),
      uno("iso-escenario-modular", "Servicios", 44, 25, { anchoM: 10, largoM: 6 }),
      uno("iso-torre-megafonia", "Electricidad", 42, 27),
      uno("iso-torre-megafonia", "Electricidad", 58, 27),
      uno("iso-puesto-informacion", "Servicios", 29, 31),
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
      ...grillaVariada(["indumentaria-y-accesorios", "libros-usados", "textiles-y-tejidos", "bijouterie", "quiosco"], "Stands", 4, 8, 8, 4, 6, 6, { anchoM: 2, largoM: 2 }),
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
      ...grilla("mesa-sombrilla", "Stands", 8, 16, 5, 3, 9, 6),
      ...fila("food-truck-stand", "Stands", 6, 33, 4, 10),
      uno("camara-frigorifica", "Servicios", 52, 8),
      uno("camara-frigorifica", "Servicios", 56, 8),
      uno("iso-escenario-principal", "Servicios", 44, 12, { anchoM: 10, largoM: 6 }),
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
      ...grillaVariada(["stand-de-productores", "stand-institucional", "material-educativo", "cosmetica-natural"], "Stands", 6, 8, 6, 3, 8, 7),
      uno("iso-enfermeria", "Emergencias", 29, 8),
      ...fila("bebedero", "Servicios", 10, 30, 3, 14),
      ...grilla("mesa-picnic", "Stands", 10, 32, 4, 1, 10, 0),
      uno("iso-escenario-modular", "Servicios", 44, 10),
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
      ...grillaVariada(["quiosco", "material-educativo", "velas-y-aromatizantes", "bijouterie"], "Stands", 6, 8, 6, 2, 8, 7),
      ...filaVariada(["puesto-gastronomico", "panificados-y-chipa", "hamburguesas-y-papas-fritas", "pasteleria-y-cafe", "puesto-de-bebidas"], "Stands", 6, 24, 5, 9),
      uno("iso-escenario-modular", "Servicios", 44, 10, { anchoM: 8, largoM: 4 }),
      ...grilla("mesa-picnic", "Stands", 44, 20, 2, 2, 6, 5),
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
      ...grilla("modulo-estacionamiento-general-vacio", "Estacionamiento", 46, 8, 2, 6, 6, 4),
      uno("iso-oficina-organizacion", "Servicios", 6, 32),
      uno("pantalla", "Servicios", 14, 32, { anchoM: 3, largoM: 2 }),
      uno("iso-escenario-principal", "Servicios", 6, 22, { anchoM: 14, largoM: 6 }),
    ],
  },
];

export function obtenerPlantilla(id: string): PlantillaPlano | undefined {
  return PLANTILLAS_PLANO.find((p) => p.id === id);
}
