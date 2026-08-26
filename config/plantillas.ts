import type { ObjetoPlantilla, PlantillaPlano } from "@/types/template";

/**
 * 10 plantillas de plano — Pantalla 14 "Plantillas" (PRD, extensión).
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
 *
 * Todas comparten el mismo esqueleto profesional (BASE_SERVICIOS): acceso
 * principal enmarcado con cerco, promenade pavimentada con ramal hasta la
 * entrada (piezas reales de "Caminos peatonales pavimentados", no una capa
 * decorativa), 3 salidas de emergencia distribuidas, ruta y sanitario
 * accesibles, matafuegos en las 4 esquinas y cartelería/mobiliario/luminaria
 * repartidos a lo largo del recorrido — el contenido propio de cada
 * plantilla se ubica entre y=6 e y=26, dejando franca la franja y=27-38
 * donde vive ese esqueleto común.
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

/**
 * Promenade pavimentada este-oeste (y=30) con un ramal en T hasta la
 * entrada principal (x=26) — piezas reales de la herramienta "Camino"
 * (editor/tools/caminoAutoTile.ts), no un trazo decorativo. No existe pieza
 * `terminal-este/oeste` en el catálogo (límite conocido de la Fase 3), así
 * que los extremos de la promenade quedan sin tapa — se ve como un camino
 * que sigue más allá del predio, no como un corte.
 */
function corredorPrincipal(): ObjetoPlantilla[] {
  const piezas: ObjetoPlantilla[] = [];
  for (let x = 6; x <= 54; x += 4) {
    if (x === 26) continue;
    piezas.push(uno("camino-pavimentado-recta-este-oeste", "Circulación", x, 30));
  }
  piezas.push(uno("camino-pavimentado-t-sin-norte", "Circulación", 26, 30));
  piezas.push(uno("camino-pavimentado-terminal-sur", "Circulación", 26, 34));
  return piezas;
}

/** Esqueleto profesional presente en las 10 plantillas — ver comentario del archivo. */
const BASE_SERVICIOS: ObjetoPlantilla[] = [
  // Acceso principal enmarcado con cerco
  uno("entrada-principal-portico", "Circulación", 25, 36),
  uno("cerco-recto-este-oeste", "Predio", 18, 38),
  uno("cerco-recto-este-oeste", "Predio", 33, 38),
  uno("esquina-cerco-oeste-norte", "Predio", 16, 38),
  uno("esquina-cerco-norte-este", "Predio", 39, 38),

  // Promenade pavimentada principal + ramal de acceso
  ...corredorPrincipal(),

  // Salidas de emergencia — 3 distribuidas, no 2 enfrentadas
  uno("iso-salida-emergencia", "Circulación", 2, 34),
  uno("iso-salida-emergencia", "Circulación", 57, 34),
  uno("salida-emergencia-cerco", "Circulación", 26, 3),

  // Sanitarios y accesibilidad, cerca del ingreso
  uno("bano-mujeres", "Servicios", 4, 33),
  uno("bano-hombres", "Servicios", 7, 33),
  uno("bano-accesible", "Servicios", 10, 33),
  uno("modulo-estacionamiento-accesible", "Estacionamiento", 1, 2),
  uno("modulo-estacionamiento-bicicletas", "Estacionamiento", 6, 2),
  uno("iso-rampa-accesible", "Circulación", 20, 36),

  // Emergencias y seguridad — matafuegos en las 4 esquinas del predio
  uno("iso-enfermeria", "Emergencias", 48, 33),
  uno("iso-puesto-seguridad", "Emergencias", 53, 34),
  uno("matafuego", "Emergencias", 2, 3),
  uno("matafuego", "Emergencias", 58, 3),
  uno("matafuego", "Emergencias", 2, 37),
  uno("matafuego", "Emergencias", 58, 37),
  uno("iso-punto-encuentro", "Emergencias", 13, 37),

  // Orientación, luz y descanso a lo largo de la promenade
  uno("iso-senal-informacion", "Servicios", 22, 33),
  uno("iso-totem-direccional-multipanel", "Servicios", 32, 33),
  uno("flecha-norte", "Textos", 57, 2, { anchoM: 2, largoM: 2 }),
  uno("iso-papelero-urbano-negro", "Servicios", 14, 27),
  uno("iso-papelero-urbano-negro", "Servicios", 42, 27),
  uno("iso-farola-peatonal-negra", "Electricidad", 10, 27),
  uno("iso-farola-peatonal-negra", "Electricidad", 46, 27),
  uno("bebedero", "Servicios", 22, 27),
  uno("bebedero", "Servicios", 38, 27),
];

export const PLANTILLAS_PLANO: PlantillaPlano[] = [
  {
    id: "feria-artesanias",
    nombre: "Feria de artesanías",
    tipoEvento: "FERIA",
    descripcion: "Puestos de artesanos en filas regulares a los lados de una promenade pavimentada, con jardineras y punto de informes.",
    icono: "Store",
    objetos: [
      ...BASE_SERVICIOS,
      ...grillaVariada(
        ["stand-de-artesanias", "stand-de-artesanias-2", "stand-de-artesanias-3", "stand-de-artesanias-4", "ceramica-y-decoracion", "bijouterie", "textiles-y-tejidos", "velas-y-aromatizantes"],
        "Stands",
        6,
        6,
        6,
        3,
        8,
        6
      ),
      ...fila("jardinera", "Vegetación", 6, 25, 4, 12),
      uno("iso-puesto-informacion", "Servicios", 12, 25),
    ],
  },
  {
    id: "feria-gastronomica",
    nombre: "Feria gastronómica y food trucks",
    tipoEvento: "EVENTO_GASTRONOMICO",
    descripcion: "Fila de food trucks frente a la promenade, área de mesas compartida, barra y punto de gas y frío para los puesteros.",
    icono: "UtensilsCrossed",
    objetos: [
      ...BASE_SERVICIOS,
      ...fila("food-truck-stand", "Stands", 4, 7, 8, 6.5),
      ...grilla("mesa-sombrilla", "Stands", 8, 14, 5, 2, 9, 5.5),
      uno("barra", "Stands", 4, 25, { anchoM: 6, largoM: 2 }),
      uno("parrilla-stand", "Servicios", 46, 24),
      uno("parrilla-stand", "Servicios", 50, 24),
      uno("camara-frigorifica", "Servicios", 54, 25),
      uno("punto-gas", "Servicios", 4, 22),
      uno("punto-gas", "Servicios", 50, 22),
      uno("punto-agua-gastro", "Servicios", 8, 22),
    ],
  },
  {
    id: "feria-libro",
    nombre: "Feria del libro",
    tipoEvento: "EVENTO_CULTURAL",
    descripcion: "Stands de editoriales a los lados de la promenade, escenario para charlas y presentaciones, y rincón de lectura con mesas.",
    icono: "BookOpen",
    objetos: [
      ...BASE_SERVICIOS,
      ...grillaVariada(
        ["libros-literatura-general", "literatura-infantil", "libros-usados", "editorial-independiente", "comics-y-novelas-graficas", "publicaciones-universitarias", "feria-de-libro-1", "feria-de-libro-2", "feria-de-libro-3", "feria-de-libro-4", "material-educativo"],
        "Stands",
        6,
        6,
        6,
        2,
        8,
        7
      ),
      uno("iso-escenario-modular", "Servicios", 42, 6),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 55, 7),
      ...grilla("mesa-picnic", "Stands", 8, 22, 4, 1, 9, 0),
      uno("iso-puesto-informacion", "Servicios", 12, 25),
    ],
  },
  {
    id: "exposicion-rural",
    nombre: "Exposición rural y ganadera",
    tipoEvento: "EXPOSICION",
    descripcion: "Corrales delimitados con vallado a los lados de la promenade, pista central, oficina de jurado y zona de carga y descarga.",
    icono: "Wheat",
    objetos: [
      ...BASE_SERVICIOS,
      ...grilla("valla", "Predio", 6, 6, 5, 3, 9, 6.5, { anchoM: 6, largoM: 5 }),
      uno("iso-escenario-principal", "Servicios", 46, 8),
      uno("iso-oficina-organizacion", "Servicios", 47, 20),
      uno("modulo-carga-descarga", "Estacionamiento", 2, 25),
      uno("modulo-darsena-proveedores", "Estacionamiento", 18, 25),
    ],
  },
  {
    id: "festival-musica",
    nombre: "Festival de música",
    tipoEvento: "FESTIVAL",
    descripcion: "Escenario principal cubierto al fondo de la promenade, torres de sonido y pantallas, backstage, generadores y food trucks.",
    icono: "Music",
    objetos: [
      ...BASE_SERVICIOS,
      uno("iso-escenario-principal-cubierto", "Servicios", 17, 5, { anchoM: 20, largoM: 10 }),
      uno("iso-torre-megafonia", "Electricidad", 15, 7),
      uno("iso-torre-megafonia", "Electricidad", 43, 7),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 29, 16),
      uno("pantalla", "Servicios", 10, 9, { anchoM: 4, largoM: 3 }),
      uno("pantalla", "Servicios", 48, 9, { anchoM: 4, largoM: 3 }),
      uno("iso-generador-electrico-portatil", "Electricidad", 4, 5),
      uno("iso-generador-electrico-portatil", "Electricidad", 56, 5),
      uno("vestuario", "Servicios", 29, 2, { anchoM: 6, largoM: 2.5 }),
      ...fila("food-truck-stand", "Stands", 6, 22, 6, 8),
      ...fila("iluminacion-emergencia", "Emergencias", 4, 18, 2, 52),
    ],
  },
  {
    id: "congreso-empresarial",
    nombre: "Congreso y expo empresarial",
    tipoEvento: "OTRO",
    descripcion: "Auditorio para la apertura al fondo, stands de sponsors a los lados de la promenade y zona de mesas para networking.",
    icono: "Building2",
    objetos: [
      ...BASE_SERVICIOS,
      uno("iso-salon-conferencias", "Servicios", 18, 4, { anchoM: 16, largoM: 8 }),
      ...grillaVariada(["stand-institucional", "stand-tecnologico", "stand-de-productores", "gran-pabellon-ferial-con-multiples-expositores"], "Stands", 6, 14, 6, 2, 8, 7),
      ...grilla("mesa-picnic", "Stands", 10, 24, 4, 1, 10, 0),
      uno("iso-oficina-organizacion", "Servicios", 4, 5),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 55, 6),
    ],
  },
  {
    id: "feria-tecnologia",
    nombre: "Feria de tecnología",
    tipoEvento: "EXPOSICION",
    descripcion: "Stands de expositores a los lados de la promenade con pantallas de demostración y escenario para presentaciones en vivo.",
    icono: "Cpu",
    objetos: [
      ...BASE_SERVICIOS,
      ...grillaVariada(["stand-tecnologico", "stand-institucional", "dron-de-agricultura-de-precision", "riego-inteligente"], "Stands", 6, 6, 6, 2, 8, 7),
      uno("pantalla", "Servicios", 8, 6, { anchoM: 2, largoM: 2 }),
      uno("pantalla", "Servicios", 46, 6, { anchoM: 2, largoM: 2 }),
      uno("iso-escenario-modular", "Servicios", 44, 19, { anchoM: 10, largoM: 6 }),
      uno("iso-torre-megafonia", "Electricidad", 42, 21),
      uno("iso-torre-megafonia", "Electricidad", 58, 21),
      uno("iso-puesto-informacion", "Servicios", 12, 25),
    ],
  },
  {
    id: "festival-cervecero",
    nombre: "Festival cervecero",
    tipoEvento: "FESTIVAL",
    descripcion: "Barras de cerveza artesanal frente a la promenade, food trucks, mesas comunitarias y un escenario para bandas en vivo.",
    icono: "Beer",
    objetos: [
      ...BASE_SERVICIOS,
      ...fila("barra", "Stands", 6, 7, 6, 8, { anchoM: 5, largoM: 2.5 }),
      ...grilla("mesa-sombrilla", "Stands", 8, 14, 5, 2, 9, 5.5),
      ...fila("food-truck-stand", "Stands", 6, 24, 4, 10),
      uno("camara-frigorifica", "Servicios", 52, 7),
      uno("camara-frigorifica", "Servicios", 56, 7),
      uno("iso-escenario-principal", "Servicios", 44, 10, { anchoM: 10, largoM: 6 }),
    ],
  },
  {
    id: "feria-navidena",
    nombre: "Feria navideña",
    tipoEvento: "FERIA",
    descripcion: "Stands de regalos y comida a los lados de un árbol central, con zona de mesas para las familias frente a la promenade.",
    icono: "Gift",
    objetos: [
      ...BASE_SERVICIOS,
      uno("arbol-nativo-sombra", "Vegetación", 27, 14, { anchoM: 6, largoM: 6 }),
      ...filaVariada(["velas-y-aromatizantes", "bijouterie", "textiles-y-tejidos", "ceramica-y-decoracion", "quiosco", "indumentaria-y-accesorios"], "Stands", 6, 6, 6, 8),
      ...filaVariada(["stand-de-productores", "stand-institucional", "cosmetica-natural", "emprendedor-textiles-y-decoracion", "emprendedor-velas-y-aromas", "gastronomia"], "Stands", 6, 22, 6, 8),
      ...grilla("mesa-sombrilla", "Stands", 40, 14, 2, 2, 7, 5.5),
    ],
  },
  {
    id: "muestra-arte",
    nombre: "Muestra de arte y exposición",
    tipoEvento: "EXPOSICION",
    descripcion: "Salas amplias para exhibir obras a los lados de la promenade, sala audiovisual con cabina técnica y punto de informes.",
    icono: "Palette",
    objetos: [
      ...BASE_SERVICIOS,
      ...grillaVariada(["carpa-de-exposicion", "stand-institucional", "material-educativo", "ceramica-y-decoracion"], "Stands", 4, 6, 5, 2, 11, 10, { anchoM: 7, largoM: 6 }),
      uno("iso-modulo-tecnico-servicios", "Electricidad", 55, 7),
      uno("iso-puesto-informacion", "Servicios", 12, 25),
    ],
  },
];

export function obtenerPlantilla(id: string): PlantillaPlano | undefined {
  return PLANTILLAS_PLANO.find((p) => p.id === id);
}
