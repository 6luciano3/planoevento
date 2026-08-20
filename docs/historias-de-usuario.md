# Historias de Usuario — PlanoEvento

Ver también `docs/PRD-PlanoEvento.md`. Prioridad MVP salvo que se indique "Extensión".

## Módulo 1 — Acceso y proyectos
- **HU-ORG-01 — Registrarse.** Como organizador, quiero crear una cuenta para guardar y administrar mis planos. *(`app/auth/registro`)*
- **HU-ORG-02 — Iniciar sesión.** Como organizador, quiero iniciar sesión para acceder a mis proyectos guardados. *(`app/auth/iniciar-sesion`)*
- **HU-ORG-03 — Consultar mis planos.** Como organizador, quiero ver todos mis planos para abrirlos, duplicarlos, descargarlos o eliminarlos. *(`app/proyectos`)*
- **HU-ORG-04 — Crear un proyecto.** Como organizador, quiero crear un proyecto de plano para registrar los datos básicos del evento. *(`app/proyectos/nuevo`)*
- **HU-ORG-05 — Editar los datos del proyecto.** Como organizador, quiero modificar los datos del evento para corregirlos antes de generar el plano.
- **HU-ORG-06 — Duplicar un proyecto** *(Extensión).* Como organizador, quiero duplicar un plano existente para reutilizar la distribución en otro evento. *(`store/project-store.ts#duplicar`)*

## Módulo 2 — Ubicación y plano base
- **HU-ORG-07 — Buscar la ubicación del evento.** Dirección, localidad, coordenadas o selección manual en el mapa.
- **HU-ORG-08 — Delimitar el área de interés.** Dibujar un polígono, ver superficie y coordenadas.
- **HU-ORG-09 — Obtener el plano base con OpenStreetMap.** Consultar disponibilidad, elegir capas, importar como capas bloqueadas. *(`services/openstreetmap.service.ts`, `hooks/useOpenStreetMap.ts`)*
- **HU-ORG-10 — Administrar la base de OpenStreetMap.** Mostrar/ocultar, bloquear/desbloquear, transparencia, color, actualizar, eliminar.
- **HU-ORG-11 — Importar un plano propio.** PNG, JPG, PDF, SVG, GeoJSON. *(`services/file.service.ts`)*
- **HU-ORG-12 — Calibrar la escala de un archivo.** Marcar dos puntos, ingresar la distancia real, calcular el factor de escala. *(`editor/geometry/scale.ts#calcularFactorEscala`)*

## Módulo 3 — Hoja de trabajo
- **HU-ORG-13 — Configurar la hoja.** A4 a A0 o personalizado, orientación, márgenes, fondo, cuadrícula. *(`config/paper-sizes.ts`)*
- **HU-ORG-14 — Configurar la escala del plano.** Escalas sugeridas o ajuste automático. *(`config/scales.ts`)*

## Módulo 4 — Edición y dibujo
- **HU-ORG-15 — Dibujar elementos básicos.** Línea, polilínea, rectángulo, círculo, polígono, flecha, texto. *(`editor/tools/index.ts`)*
- **HU-ORG-16 — Medir distancias y superficies.** *(`editor/geometry/coordinates.ts`)*
- **HU-ORG-17 — Incorporar cotas.**
- **HU-ORG-18 — Agregar textos y referencias.**

## Módulo 5 — Biblioteca de componentes
- **HU-ORG-19 — Explorar la biblioteca.** Por categoría. *(`symbols/symbol-catalog.ts`, `components/editor/SymbolLibrary.tsx`)*
- **HU-ORG-20 — Buscar componentes.** *(`symbols/symbol-catalog.ts#buscarSimbolos`)*
- **HU-ORG-21 — Arrastrar componentes al plano.** ⭐ La Historia de Usuario central del producto. *(`hooks/useDragAndDrop.ts`, `symbols/symbol-factory.ts`, `components/editor/EditorCanvas.tsx`)*
- **HU-ORG-22 — Editar un componente colocado.** Mover, rotar, redimensionar, duplicar, renombrar, cambiar código/color, mostrar medidas, bloquear, eliminar. *(`components/editor/PropertiesPanel.tsx`)*
- **HU-ORG-23 — Colocar stands.**
- **HU-ORG-24 — Colocar servicios y emergencias.**
- **HU-ORG-25 — Colocar elementos de limpieza.**
- **HU-ORG-26 — Colocar plantas y árboles.** *(`symbols/categories/vegetacion.ts`)*

## Módulo 6 — Organización del plano
- **HU-ORG-27 — Administrar capas.** *(`store/layer-store.ts`, `components/editor/LayersPanel.tsx`)*
- **HU-ORG-28 — Distribuir componentes automáticamente.** Fila, cuadrícula, alinear, distribuir, repetir cada distancia.
- **HU-ORG-29 — Numerar componentes automáticamente.** Prefijo, número inicial, dígitos, sentido. *(`symbols/symbol-factory.ts`)*
- **HU-ORG-30 — Agrupar objetos** *(Extensión).*
- **HU-ORG-31 — Deshacer y rehacer.** *(`editor/core/HistoryManager.ts`, `hooks/useKeyboardShortcuts.ts`)*
- **HU-ORG-32 — Guardar automáticamente.** *(`hooks/useAutosave.ts`)*

## Módulo 7 — Carátula y leyenda
- **HU-ORG-33 — Completar la carátula.** *(`types/plan.ts#Caratula`)*
- **HU-ORG-34 — Incorporar orientación norte.** *(`symbols/categories/senalizacion.ts#flecha-norte`)*
- **HU-ORG-35 — Generar la leyenda.** *(`services/plan.service.ts#generarLeyenda`)*

## Módulo 8 — Revisión y salida
- **HU-ORG-36 — Revisar que el plano esté completo.** *(`config/validation-rules.ts`, `app/proyectos/[proyectoId]/revision`)*
- **HU-ORG-37 — Previsualizar el documento.**
- **HU-ORG-38 — Descargar el plano en PDF.** *(`services/pdf.service.ts`, `app/proyectos/[proyectoId]/exportar`)*
- **HU-ORG-39 — Imprimir el plano.**
- **HU-ORG-40 — Exportar como imagen** *(Extensión).*

## Historias del Administrador
- **HU-ADM-01 — Administrar categorías.** *(`symbols/symbol-types.ts`)*
- **HU-ADM-02 — Administrar componentes.** *(`symbols/categories/*.ts`)*
- **HU-ADM-03 — Administrar componentes de vegetación.**
- **HU-ADM-04 — Configurar la base geográfica.** Capas habilitadas, disponibilidad, errores. *(`.env.example`, `services/openstreetmap.service.ts`)* — a diferencia de TopoExport (pensado originalmente, requería cuenta paga), OpenStreetMap vía Overpass es gratis y no pide credenciales.

## Matriz resumida
| Módulo | HU | MVP | Extensión |
|---|---|---|---|
| Acceso y proyectos | 6 | 5 | 1 |
| Ubicación y base geográfica (OpenStreetMap) | 6 | 6 | 0 |
| Hoja de trabajo | 2 | 2 | 0 |
| Edición y dibujo | 4 | 4 | 0 |
| Biblioteca de componentes | 8 | 8 | 0 |
| Organización del plano | 6 | 5 | 1 |
| Carátula y leyenda | 3 | 3 | 0 |
| Revisión y salida | 5 | 3 | 2 |
| Administración | 4 | 4 | 0 |
| **Total** | **44** | **40** | **4** |
