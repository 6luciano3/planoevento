# Iconos de interfaz

Los iconos de la interfaz (guardar, capas, zoom, deshacer, etc.) no se
guardan como archivos acá: se importan directamente desde `lucide-react`
en los componentes que los usan (ver `components/editor/EditorToolbar.tsx`
y `components/editor/LayersPanel.tsx`), como recomienda el PRD. Esta carpeta
queda reservada para un ícono propio (favicon, isotipo) si en algún momento
se reemplaza el `data:image/svg+xml` inline de `app/layout.tsx`.
