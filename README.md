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

Copiar `.env.example` a `.env.local` si querés apuntar `OVERPASS_API_URL` a
otra instancia de Overpass — no es obligatorio, la base geográfica
(Pantalla 09) usa por defecto la API pública de OpenStreetMap, que es
gratuita y no pide cuenta ni clave.

## Qué es un prototipo funcional y qué es un placeholder

- **Funcional hoy:** proyectos, editor con arrastrar y soltar, capas,
  propiedades, deshacer/rehacer, guardado automático, revisión, exportación
  por impresión, base geográfica real con OpenStreetMap.
- **Placeholder documentado:** `app/api/proyectos`, `app/api/planos`,
  `app/api/archivos` y `app/api/exportacion/pdf` (backend real y PDF
  generado en servidor — hoy se exporta vía impresión del navegador),
  autenticación real. `app/api/openstreetmap/*` es la excepción: ya llama a
  datos reales. Cada placeholder tiene comentarios en el código señalando
  dónde y cómo reemplazarlo — ver también PRD §22 "Etapas de desarrollo".
