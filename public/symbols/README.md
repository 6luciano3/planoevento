# Símbolos del plano

SVG en vista superior (no frontal) para que representen correctamente la
distribución espacial sobre el lienzo — ver PRD, sección "2. Elementos
colocados sobre el plano".

## Estado actual
Ya están dibujados los símbolos que usa la demo del editor:

- `stands/stand-simple.svg`, `stands/escenario.svg`
- `accesos/entrada.svg`, `accesos/salida.svg`, `accesos/salida-emergencia.svg`
- `sanitarios/bano-accesible.svg`
- `emergencias/primeros-auxilios.svg`, `emergencias/extintor.svg`
- `residuos/tacho-basura.svg`
- `vegetacion/arbol-mediano.svg`
- `senalizacion/flecha-norte.svg`

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
