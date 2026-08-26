import type { ObjetoPlantilla, PlantillaPlano, TextoPlantilla } from "@/types/template";

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
 * Todas comparten el mismo esqueleto profesional (BASE_SERVICIOS): una
 * promenade pavimentada con ramal hasta la entrada (piezas reales de
 * "Caminos peatonales pavimentados", no una capa decorativa), 3 salidas de
 * emergencia distribuidas, ruta y sanitario accesibles, matafuegos a mitad
 * de cada borde y cartelería/mobiliario/luminaria repartidos en dos franjas
 * — el contenido propio de cada plantilla se ubica entre y=6 e y=26,
 * dejando franca la franja y=27-39 donde vive ese esqueleto común. La
 * proyección isométrica "aprieta" visualmente las 4 puntas del rombo del
 * predio, así que nada del esqueleto vive ahí.
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

/** Cartel de texto libre — para rotular una zona ("Artesanías regionales") como en un plano ilustrado real. */
function texto(contenido: string, x: number, y: number, color?: string): TextoPlantilla {
  return { tipo: "texto", contenido, capa: "Textos", x, y, color };
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
  for (let x = 10; x <= 50; x += 4) {
    if (x === 26) continue;
    piezas.push(uno("camino-pavimentado-recta-este-oeste", "Circulación", x, 30));
  }
  piezas.push(uno("camino-pavimentado-t-sin-norte", "Circulación", 26, 30));
  piezas.push(uno("camino-pavimentado-terminal-sur", "Circulación", 26, 34));
  return piezas;
}

/**
 * Esqueleto profesional presente en las 10 plantillas — ver comentario del
 * archivo. La proyección isométrica "aprieta" visualmente las 4 puntas del
 * rombo del predio (cerca de x/y = 0 o 60/40), así que nada de esto vive
 * ahí: la promenade (y=30-34) separa una franja norte angosta de faroles y
 * papeleros (y=27-29, pegada al contenido de cada plantilla) de la plaza de
 * acceso al sur (y=34-39, entrada/sanitarios/emergencias), y los matafuegos
 * van a la mitad de cada borde, no a las esquinas.
 */
const BASE_SERVICIOS: ObjetoPlantilla[] = [
  // Promenade pavimentada principal + ramal de acceso
  ...corredorPrincipal(),

  // Franja norte, pegada al contenido: orientación, luz y agua
  uno("iso-totem-direccional-multipanel", "Servicios", 26, 27),
  uno("iso-papelero-urbano-negro", "Servicios", 14, 28),
  uno("iso-papelero-urbano-negro", "Servicios", 42, 28),
  uno("iso-farola-peatonal-negra", "Electricidad", 18, 28),
  uno("iso-farola-peatonal-negra", "Electricidad", 38, 28),
  uno("bebedero", "Servicios", 30, 28),

  // Plaza de acceso al sur: salidas, sanitarios, rampa, entrada, estacionamiento y emergencias
  uno("iso-salida-emergencia", "Circulación", 4, 35),
  uno("bano-mujeres", "Servicios", 8, 35),
  uno("bano-hombres", "Servicios", 11, 35),
  uno("bano-accesible", "Servicios", 14, 35),
  uno("iso-rampa-accesible", "Circulación", 18, 36),
  uno("entrada-principal-portico", "Circulación", 25, 36),
  uno("iso-senal-informacion", "Servicios", 32, 35),
  uno("modulo-estacionamiento-accesible", "Estacionamiento", 36, 34),
  uno("modulo-estacionamiento-bicicletas", "Estacionamiento", 41, 35),
  uno("iso-enfermeria", "Emergencias", 45, 34),
  uno("iso-puesto-seguridad", "Emergencias", 50, 35),
  uno("iso-salida-emergencia", "Circulación", 55, 35),

  // Punto de encuentro, lejos del tumulto de la entrada
  uno("iso-punto-encuentro", "Emergencias", 2, 28),

  // Salida de emergencia trasera y matafuegos a mitad de cada borde
  uno("salida-emergencia-cerco", "Circulación", 26, 4),
  uno("matafuego", "Emergencias", 10, 4),
  uno("matafuego", "Emergencias", 48, 4),
  uno("matafuego", "Emergencias", 2, 18),
  uno("matafuego", "Emergencias", 58, 18),
  uno("flecha-norte", "Textos", 57, 2, { anchoM: 2, largoM: 2 }),
];

export const PLANTILLAS_PLANO: PlantillaPlano[] = [
  {
    id: "feria-artesanias",
    nombre: "Feria de artesanías",
    tipoEvento: "FERIA",
    descripcion: "Dos alas de puestos rotuladas por rubro, con una plaza central con fuente de agua entre ambas.",
    icono: "Store",
    objetos: [
      ...BASE_SERVICIOS,

      // Ala izquierda: artesanías tradicionales
      texto("Artesanías regionales", 4, 3, "#9A3412"),
      ...grillaVariada(["stand-de-artesanias", "stand-de-artesanias-2", "stand-de-artesanias-3", "stand-de-artesanias-4", "ceramica-y-decoracion", "textiles-y-tejidos"], "Stands", 6, 8, 2, 3, 7, 6),
      uno("jardinera", "Vegetación", 3, 8),
      uno("jardinera", "Vegetación", 3, 14),
      uno("jardinera", "Vegetación", 3, 20),

      // Ala derecha: emprendedores y diseño
      texto("Emprendedores y diseño", 38, 5, "#9A3412"),
      ...grillaVariada(["bijouterie", "velas-y-aromatizantes", "emprendedor-ceramica-y-diseno", "emprendedor-textiles-y-decoracion", "emprendedor-accesorios-y-bijouterie", "cosmetica-natural"], "Stands", 39, 8, 2, 3, 7, 6),
      uno("jardinera", "Vegetación", 53, 8),
      uno("jardinera", "Vegetación", 53, 14),
      uno("jardinera", "Vegetación", 53, 20),

      // Plaza central, entre las dos alas
      texto("Espacio central", 20, 8, "#166534"),
      uno("fuente-agua", "Servicios", 23, 12),
      uno("jardinera", "Vegetación", 19, 10),
      uno("jardinera", "Vegetación", 30, 10),
      uno("jardinera", "Vegetación", 19, 19),
      uno("jardinera", "Vegetación", 30, 19),
      uno("iso-puesto-informacion", "Servicios", 23, 20),
      uno("grupo-tres", "Servicios", 20, 16),
      uno("visitante-mapa", "Servicios", 30, 16),
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
