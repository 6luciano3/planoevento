# PlanoEvento

Editor de planos para eventos, ferias y festivales. Ver `docs/PRD-PlanoEvento.md`
para el producto completo y `docs/pantallas.md` para el estado de cada pantalla.

## Empezar

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

El prototipo funciona de punta a punta sin backend: crear cuenta → nuevo
plano → arrastrar componentes en el editor → revisar → exportar a PDF. Los
datos se guardan en el `localStorage` del navegador (`lib/storage.ts`); no
hace falta configurar base de datos para probarlo.

## Estructura del proyecto

| Carpeta | Contenido |
|---|---|
| `app/` | Pantallas y rutas (App Router de Next.js) |
| `components/` | Componentes de UI, layout, proyectos y editor |
| `editor/` | Núcleo del editor: estado, geometría, herramientas, comandos, snapping |
| `symbols/` | Catálogo completo de la biblioteca de componentes (PRD §11) |
| `store/` | Estado global (Zustand): proyectos, editor, capas, símbolos, historial |
| `services/` | Capa de datos — hoy sobre `localStorage`, con la firma lista para un backend real |
| `hooks/` | Hooks de React que conectan componentes con los stores/servicios |
| `types/` | Tipos TypeScript compartidos |
| `config/` | Datos de configuración: tamaños de hoja, escalas, capas iniciales, reglas de revisión |
| `database/schema.ts` | Esquema objetivo para cuando exista una base de datos real |
| `public/symbols/` | SVG de los componentes que se arrastran al plano |
| `docs/` | PRD, historias de usuario y mapeo de pantallas |

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar cuando haya credenciales
reales de TopoExport. Sin ellas, `services/topoexport.service.ts` simula el
flujo de consulta e importación para poder probar la Pantalla de ubicación.

## Qué es un prototipo funcional y qué es un placeholder

- **Funcional hoy:** proyectos, editor con arrastrar y soltar, capas,
  propiedades, deshacer/rehacer, guardado automático, revisión, exportación
  por impresión.
- **Placeholder documentado:** `app/api/*` (backend real), autenticación
  real, integración real con TopoExport, generación de PDF en servidor. Cada
  uno tiene comentarios en el código señalando dónde y cómo reemplazarlos —
  ver también PRD §22 "Etapas de desarrollo".
