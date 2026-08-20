# Pantallas — estado en este repositorio

Mapeo entre las 22 pantallas del PRD y las rutas reales del prototipo Next.js.
Varias pantallas del documento original se consolidaron en un mismo archivo
cuando eran, en la práctica, pasos de un mismo flujo o paneles de una sola
pantalla — el propio documento de referencia ("Pantallas necesarias de la
aplicación") ya lo anticipaba en su sección final.

| # | Pantalla (PRD) | Ruta en el código | Estado |
|---|---|---|---|
| 1 | Inicio | `app/page.tsx` | ✅ Completa |
| 2 | Crear cuenta | `app/auth/registro/page.tsx` | ✅ Completa (auth simulada) |
| 3 | Iniciar sesión | `app/auth/iniciar-sesion/page.tsx` | ✅ Completa (auth simulada) |
| 4 | Recuperar contraseña | `app/auth/recuperar-acceso/page.tsx` | ✅ Completa (sin envío de correo real) |
| 5 | Mis proyectos | `app/proyectos/page.tsx` | ✅ Completa |
| 6 | Nuevo proyecto | `app/proyectos/nuevo/page.tsx` | ✅ Completa |
| 7 | Datos del proyecto | *(pendiente de ruta propia)* | ⏳ Editar vía `services/project.service.ts#guardarProyecto` |
| 8 | Ubicación del predio | `app/proyectos/[proyectoId]/ubicacion/page.tsx` | ✅ Completa — Leaflet + OpenStreetMap (buscar dirección, marcar punto, dibujar límite); paso 2/4 del asistente |
| 9 | Configuración de TopoExport | `app/proyectos/[proyectoId]/plano-base/page.tsx` | ✅ Completa — paso 3/4 del asistente, selección real de capas (`hooks/useTopoExport.ts`) |
| 10 | Resultado de importación | `app/proyectos/[proyectoId]/plano-base/page.tsx` (mismo paso) | ✅ Muestra el aviso real cuando TopoExport no está configurado en vez de simular éxito |
| 11 | Importar plano propio | `app/proyectos/[proyectoId]/plano-base/page.tsx` (mismo paso) | ✅ Completa — `services/file.service.ts` |
| 12 | Calibrar plano | *(pendiente de ruta propia)* | ⏳ `editor/geometry/scale.ts#calcularFactorEscala` listo; falta la UI |
| 13 | Papel y escala | `app/proyectos/[proyectoId]/exportar/page.tsx` (panel "Configuración de salida") | ✅ Completa — edita `plano.hoja` de verdad (tamaño, orientación, cuadrícula) |
| 14 | Plantillas | *(fuera del MVP, ver PRD §16)* | ⏳ Extensión |
| 15 | Editor principal | `app/proyectos/[proyectoId]/editor/page.tsx` | ✅ Completa y funcional (drag & drop real, 9 herramientas seleccionables, distribuir y numerar) |
| 16 | Propiedades del elemento | `components/editor/PropertiesPanel.tsx` (panel dentro del editor) | ✅ Completa — secciones Identificación/Posición/Presentación/Organización/Acciones |
| 17 | Biblioteca de elementos | `components/editor/SymbolLibrary.tsx` (panel dentro del editor) | ✅ Completa |
| 18 | Capas | `components/editor/LayersPanel.tsx` (panel dentro del editor) | ✅ Completa — color/transparencia/imprimible por capa, crear/eliminar, buscar |
| 19 | Rótulo | `app/proyectos/[proyectoId]/rotulo/page.tsx` | ✅ Completa — formulario de `plano.caratula` con vista previa en vivo |
| 20 | Leyenda | `app/proyectos/[proyectoId]/leyenda/page.tsx` | ✅ Completa — ocultar/mostrar referencias, respetado por la exportación |
| 21 | Revisión del plano | `app/proyectos/[proyectoId]/revision/page.tsx` | ✅ Completa — checklist agrupado por categoría |
| 22 | Imprimir y exportar | `app/proyectos/[proyectoId]/exportar/page.tsx` | ✅ Completa — panel de configuración de salida (tamaño, apariencia, qué incluir) + `window.print()` |

## Cómo correr el prototipo

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`. Los proyectos se guardan en el `localStorage`
del navegador (ver `lib/storage.ts`) — no hace falta base de datos para
probar el flujo completo: crear cuenta → nuevo plano → arrastrar
componentes → revisar → exportar.
