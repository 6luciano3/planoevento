# Símbolos del plano

SVG en vista superior (no frontal) para que representen correctamente la
distribución espacial sobre el lienzo — ver PRD, sección "2. Elementos
colocados sobre el plano".

## Estado actual
Símbolos ya dibujados a mano — la demo inicial:

- `stands/stand-simple.svg`, `stands/escenario.svg`
- `accesos/entrada.svg`, `accesos/salida.svg`, `accesos/salida-emergencia.svg`
- `emergencias/punto-encuentro.svg`
- `residuos/contenedor.svg`
- `senalizacion/flecha-norte.svg`

Además, 6 pictogramas tomados de SVG Repo (svgrepo.com), recoloreados donde
hacía falta para que se vean bien también en modo oscuro:

- `sanitarios/bano-quimico.svg`
- `estacionamiento/accesible.svg`
- `senalizacion/accesibilidad.svg`
- `emergencias/ruta-evacuacion.svg`
- `gastronomia/cocina.svg`

Y 29 íconos del set `fluent-emoji` de Iconify (Microsoft, licencia MIT,
`api.iconify.design`) — estilo glossy/a color que se acerca más a la
referencia visual del producto que el pictograma técnico de línea fina:

- `vegetacion/arbol-grande.svg`, `arbol-pequeno.svg` ← `deciduous-tree`
- `vegetacion/arbol-mediano.svg` ← `evergreen-tree`
- `vegetacion/palmera.svg` ← `palm-tree`
- `vegetacion/arbusto.svg`, `planta.svg`, `cantero.svg` ← `potted-plant`
- `estacionamiento/automovil.svg` ← `automobile`
- `estacionamiento/motocicleta.svg` ← `motor-scooter`
- `estacionamiento/bicicleta.svg` ← `bicycle`
- `stands/carpa.svg`, `infraestructura/gazebo.svg` ← `tent`
- `sanitarios/bano-hombres.svg` ← `mens-room`
- `sanitarios/bano-mujeres.svg` ← `womens-room`
- `sanitarios/bano-accesible.svg`, `bano-inclusivo.svg` ← `restroom`
- `gastronomia/area-mesas.svg` ← `fork-and-knife-with-plate`
- `gastronomia/puesto-gastronomico.svg` ← `hamburger`
- `gastronomia/food-truck.svg` ← `delivery-truck`
- `emergencias/extintor.svg` ← `fire-extinguisher`
- `emergencias/ambulancia.svg` ← `ambulance`
- `emergencias/primeros-auxilios.svg` ← `adhesive-bandage`
- `infraestructura/punto-informacion.svg` ← `information`
- `emergencias/puesto-seguridad.svg` ← `shield`
- `residuos/tacho-basura.svg` ← `wastebasket`
- `agua-gas/punto-agua.svg` ← `droplet`
- `electricidad/generador.svg` ← `electric-plug`
- `infraestructura/torre-sonido.svg` ← `loudspeaker`
- `infraestructura/pantalla.svg` ← `television`

Todos los demás componentes del catálogo (`symbols/categories/*.ts`) ya
tienen su `id`, categoría y ruta de ícono definidos — faltan sus archivos
`.svg`. `EditorCanvas.tsx` no depende de que el SVG exista: mientras no se
agregue, el objeto se sigue viendo en el lienzo como un rectángulo de color
con su código (ej. "TA-03"), así que la biblioteca es utilizable de punta a
punta ya mismo.

## Para agregar un símbolo nuevo
1. Dibujarlo en un viewBox `0 0 100 100`, vista superior.
2. Guardarlo en la subcarpeta de su categoría (debe coincidir con el campo
   `icono` de su `DefinicionSimbolo` en `symbols/categories/`).
3. Antes de usarlo en un plano definitivo, si es de seguridad/evacuación,
   revisar la señalización normalizada (ISO 7010, ISO 7001, Símbolo
   Internacional de Accesibilidad) mencionada en el PRD — no inventar
   pictogramas de seguridad.
