# PRD - PlanoEvento

## 1. Información general
- **Nombre del producto:** PlanoEvento
- **Tipo de producto:** Aplicación web independiente
- **Versión del documento:** 1.0
- **Estado:** Definición inicial del MVP
- **Usuarios principales:** Organizadores de eventos, ferias y festivales
- **Plataforma inicial:** Aplicación web para computadoras
- **Entorno recomendado:** Navegadores modernos en Windows 11

## 2. Descripción del producto
PlanoEvento es una aplicación web independiente que permite a un organizador crear el plano técnico de un evento, feria o festival.

El organizador podrá importar información topográfica o cartográfica, definir el área del evento y distribuir visualmente todos los elementos necesarios mediante una biblioteca de objetos configurados para arrastrar y soltar.

El resultado final será un plano preparado para imprimir o exportar en PDF y presentar ante la municipalidad u otro organismo responsable de aprobar el evento.

PlanoEvento no administrará inscripciones, proveedores, entradas, ventas, pagos ni el funcionamiento general del evento. Su objetivo se limita exclusivamente a la creación, revisión y exportación del plano.

## 3. Problema
Actualmente, muchos organizadores elaboran los planos de sus eventos utilizando programas de diseño genéricos, archivos de imágenes, documentos de oficina o planos realizados manualmente. Esto produce diferentes problemas:

- Los elementos no conservan una escala uniforme.
- No existe una simbología normalizada.
- Las salidas de emergencia pueden quedar incorrectamente señalizadas.
- Resulta difícil modificar la distribución.
- No se pueden reutilizar fácilmente planos anteriores.
- Los archivos presentados pueden tener poca calidad.
- La municipalidad puede solicitar correcciones.
- La preparación del plano depende de conocimientos técnicos de diseño o arquitectura.

PlanoEvento busca simplificar este proceso mediante un editor especializado para eventos.

## 4. Objetivo general
Permitir que un organizador pueda crear, editar, revisar, imprimir y exportar en PDF el plano de un evento o feria, utilizando herramientas visuales sencillas y elementos previamente configurados.

## 5. Objetivos específicos
- Crear proyectos de planos independientes.
- Definir los datos principales del evento.
- Localizar el predio donde se realizará.
- Incorporar información obtenida mediante TopoExport.
- Importar un plano, imagen o archivo propio.
- Configurar las dimensiones y la escala.
- Utilizar plantillas de distribución.
- Dibujar sectores y áreas.
- Arrastrar elementos desde una biblioteca.
- Modificar posición, rotación, tamaño y propiedades.
- Organizar los elementos mediante capas.
- Incorporar vegetación existente o planificada.
- Crear una leyenda automática.
- Completar el rótulo técnico del plano.
- Revisar información obligatoria.
- Imprimir el plano.
- Exportar el plano en formato PDF.

## 6. Alcance del MVP
1. Registro e inicio de sesión.
2. Administración básica de proyectos.
3. Creación y configuración del plano.
4. Localización del predio.
5. Integración inicial con TopoExport.
6. Importación de imágenes o planos propios.
7. Calibración de medidas.
8. Configuración del papel y de la escala.
9. Selección de plantillas.
10. Editor gráfico del plano.
11. Biblioteca de elementos arrastrables.
12. Herramientas básicas de dibujo y medición.
13. Administración de capas.
14. Configuración individual de elementos.
15. Rótulo técnico.
16. Leyenda automática.
17. Revisión del plano.
18. Impresión y exportación a PDF.

## 7. Fuera del alcance
- Gestión municipal de expedientes.
- Aprobación digital del plano.
- Firma digital municipal.
- Gestión de permisos.
- Administración de feriantes.
- Inscripción de expositores.
- Contratación de proveedores.
- Venta de entradas.
- Marketplace.
- Pagos o facturación.
- Gestión operativa del evento.
- Seguimiento de emergencias en tiempo real.
- Control de acceso al evento.
- Reserva o asignación comercial de stands.
- Presentación automática del expediente ante la municipalidad.

El organizador descargará o imprimirá el plano y realizará la presentación por los medios establecidos por cada municipio.

## 8. Usuarios

### 8.1 Organizador
Es la persona responsable de preparar el plano del evento. Podrá: crear proyectos, definir el predio, importar información, diseñar la distribución, colocar elementos, revisar el plano, imprimirlo y exportarlo en PDF.

### 8.2 Colaborador
Usuario opcional autorizado por el organizador para participar en la elaboración del plano. Se considera para una versión posterior; no es obligatorio para el MVP.

## 9. Propuesta de valor
PlanoEvento permitirá que una persona sin experiencia avanzada en programas de arquitectura pueda generar un plano claro, ordenado y presentable. La principal diferencia frente a una herramienta de dibujo tradicional será la biblioteca especializada de componentes para eventos: para colocar un tacho de basura, el usuario solamente deberá seleccionarlo en la biblioteca, arrastrarlo hasta el plano y soltarlo en la ubicación correspondiente.

## 10. Integración con TopoExport
TopoExport se incorpora durante la definición de la ubicación y la base geográfica del proyecto.

**Flujo propuesto:**
1. El usuario crea un proyecto.
2. Indica la dirección o coordenadas del predio.
3. Selecciona la opción **Obtener terreno con TopoExport**.
4. PlanoEvento envía o prepara los parámetros necesarios.
5. TopoExport genera la información topográfica disponible.
6. El usuario importa el archivo generado.
7. PlanoEvento lo coloca como capa base.
8. El usuario ajusta posición, orientación y escala.
9. La capa queda bloqueada para evitar modificaciones accidentales.
10. Sobre esa base se desarrolla el plano del evento.

**Información que podría incorporarse:** límites del terreno, curvas de nivel, elevaciones, caminos, construcciones existentes, referencias geográficas, imagen aérea, coordenadas, orientación norte, datos del relieve.

La integración definitiva dependerá de los formatos, servicios y condiciones técnicas ofrecidas por TopoExport.

## 11. Biblioteca de elementos
Paleta lateral organizada por categorías; cada elemento se arrastra y suelta sobre el plano.

- **11.1 Infraestructura:** stand, carpa, gazebo, escenario, depósito, oficina, casilla, punto de información, vestuario, cabina técnica, torre de sonido, pantalla, generador eléctrico.
- **11.2 Servicios sanitarios:** baño para hombres, baño para mujeres, baño inclusivo, baño accesible, baño químico, lavamanos, punto de agua potable.
- **11.3 Accesos y circulación:** entrada principal, entrada secundaria, salida, salida de emergencia, acceso vehicular, acceso peatonal, camino interno, calle de servicio, sendero accesible, rampa, escalera, portón, valla, cerco, molinete.
- **11.4 Seguridad y emergencias:** puesto de atención médica, ambulancia, bomberos, extintor, hidrante, punto de evacuación, punto de encuentro, ruta de evacuación, salida de emergencia, puesto de seguridad, cámara de seguridad, iluminación de emergencia.
- **11.5 Residuos y limpieza:** tacho de basura, contenedor, punto de reciclaje, residuos orgánicos, residuos reciclables, residuos peligrosos, área de limpieza.
- **11.6 Gastronomía:** puesto gastronómico, food truck, parrilla, cocina, barra, área de mesas, cámara frigorífica, punto de gas, punto de agua.
- **11.7 Estacionamiento:** general, accesible, motos, bicicletas, proveedores, ambulancias, zona de carga y descarga.
- **11.8 Vegetación:** planta ornamental, arbusto, cantero, palmera, árbol pequeño/mediano/grande/frondoso/nativo/existente/a conservar, área verde, césped, jardín. Los árboles pueden representar el diámetro aproximado de su copa.
- **11.9 Señalización:** cartel de entrada/salida, información, prohibido el paso, baños, emergencias, punto de encuentro, accesibilidad, estacionamiento, numeración de sectores.

## 12. Herramientas del editor
Seleccionar, arrastrar, mover, rotar, duplicar, copiar, pegar, eliminar, deshacer, rehacer, acercar, alejar, ajustar a pantalla, dibujar línea/polilínea/rectángulo/círculo/polígono, crear área, agregar texto, agregar medida, medir distancia, alinear elementos, distribuir elementos, agrupar, desagrupar, bloquear, desbloquear, mostrar cuadrícula, ajustar a cuadrícula, activar guías, configurar escala.

## 13. Propiedades de los elementos
Nombre, código, categoría, posición horizontal/vertical, ancho, largo, altura informativa, rotación, color, transparencia, capacidad, cantidad, número de stand, estado, observaciones, capa, bloqueo, visibilidad en impresión. Para árboles, además: tipo de árbol, diámetro del tronco, diámetro aproximado de copa, árbol existente o proyectado, árbol que debe conservarse.

## 14. Capas del plano
Capas iniciales: base topográfica, imagen aérea, límites del predio, construcciones existentes, infraestructura temporal, stands, gastronomía, sanitarios, accesos, circulación, seguridad, emergencias, evacuación, electricidad, agua, residuos, estacionamiento, vegetación, cotas y medidas, textos, leyenda, rótulo. Cada capa puede mostrarse, ocultarse, bloquearse, desbloquearse, cambiar de orden e incluirse o excluirse de la impresión.

## 15. Reglas de validación
Antes de exportar, revisión automática sobre: nombre del proyecto, ubicación del evento, escala del plano, orientación norte, límites del predio, al menos una entrada y una salida, salidas de emergencia identificadas, rutas de evacuación visibles, puesto médico identificado cuando corresponda, baños identificados, elementos en la leyenda, datos obligatorios del rótulo, elementos dentro del área imprimible, resolución adecuada para PDF.

Las validaciones son advertencias de preparación. No reemplazan los criterios técnicos o legales establecidos por cada municipalidad.

## 16. Pantallas definitivas
| N.º | Pantalla | Función |
|---|---|---|
| 1 | Inicio | Presentar PlanoEvento y permitir comenzar |
| 2 | Crear cuenta | Registrar al organizador |
| 3 | Iniciar sesión | Acceder a los proyectos |
| 4 | Recuperar contraseña | Recuperar el acceso |
| 5 | Mis proyectos | Listar y administrar planos |
| 6 | Nuevo proyecto | Crear un plano |
| 7 | Datos del proyecto | Editar los datos del evento |
| 8 | Ubicación del predio | Localizar el terreno |
| 9 | Configuración de TopoExport | Preparar la información topográfica |
| 10 | Resultado de importación | Revisar la base obtenida |
| 11 | Importar plano propio | Cargar una imagen o plano |
| 12 | Calibrar plano | Relacionar una medida real con el archivo |
| 13 | Papel y escala | Configurar formato, orientación y escala |
| 14 | Plantillas | Seleccionar una distribución inicial |
| 15 | Editor principal | Diseñar el plano |
| 16 | Propiedades del elemento | Configurar el objeto seleccionado |
| 17 | Biblioteca de elementos | Buscar y arrastrar componentes |
| 18 | Capas | Organizar y controlar la información |
| 19 | Rótulo | Completar los datos técnicos |
| 20 | Leyenda | Configurar símbolos y referencias |
| 21 | Revisión del plano | Detectar advertencias y datos faltantes |
| 22 | Imprimir y exportar | Generar la presentación final |

> **Nota de implementación (prototipo actual):** las pantallas 8 a 14 se
> resolvieron como pasos de un único asistente (`app/proyectos/nuevo`) en
> vez de rutas separadas, y las pantallas 16/18/19/20 son paneles dentro del
> Editor principal (§16 del documento "Pantallas necesarias de la
> aplicación" ya anticipaba esta simplificación). Ver `docs/pantallas.md`.

## 18. Requisitos funcionales
RF-01 a RF-20: crear/editar/eliminar proyectos, guardar datos del evento, localizar el predio, incorporar TopoExport, importar imágenes/planos propios, calibrar mediante distancia conocida, configurar papel/orientación/escala, proporcionar plantillas, herramientas básicas de dibujo, arrastrar elementos, mover/rotar/duplicar/eliminar objetos, modificar propiedades, incluir plantas y árboles, administrar capas, generar leyenda, completar rótulo, validaciones previas, imprimir, exportar a PDF, conservar proyectos para edición posterior.

## 19. Requisitos no funcionales
- **RNF-01 Usabilidad:** utilizable sin conocimientos avanzados de arquitectura.
- **RNF-02 Rendimiento:** selección/movimiento/rotación fluidos.
- **RNF-03 Compatibilidad:** Chrome, Edge y Firefox actuales.
- **RNF-04 Resolución:** editor optimizado inicialmente para computadoras.
- **RNF-05 Seguridad:** proyectos de un usuario no accesibles por otros.
- **RNF-06 Persistencia:** cambios guardados periódicamente.
- **RNF-07 Recuperación:** evitar pérdida de trabajo ante cierre accidental.
- **RNF-08 Calidad de impresión:** textos, líneas y símbolos legibles en PDF.
- **RNF-09 Escalabilidad:** permitir agregar nuevos objetos a la biblioteca.
- **RNF-10 Accesibilidad:** contrastes adecuados, textos legibles, controles identificables.

## 20. Exportación e impresión
Tamaño (A4/A3/A2/A1), orientación, escala, márgenes, rótulo, leyenda, capas visibles, calidad de exportación, fecha y número de versión. El resultado debe poder imprimirse directamente, guardarse como PDF, descargarse y volver a generarse tras una modificación.

## 21. Criterios de éxito del MVP
Que un organizador pueda: crear un proyecto, ubicar el predio, incorporar una base geográfica o un plano propio, configurar las medidas, arrastrar elementos, distribuir stands y servicios, identificar entradas y salidas, representar emergencias y evacuación, colocar tachos/plantas/árboles, crear una leyenda, completar el rótulo, revisar el plano e imprimirlo o descargarlo en PDF.

## 22. Etapas de desarrollo
1. **Prototipo visual** — pantallas, navegación, editor visual inicial, biblioteca de objetos, simulación de arrastrar y soltar, vista previa de impresión. *(Estado actual del código en este repositorio.)*
2. **Editor funcional** — persistencia real de proyectos (hoy: localStorage), herramientas de dibujo, medidas reales, escala, capas, propiedades, deshacer/rehacer, guardado automático.
3. **TopoExport e importaciones** — análisis técnico del servicio, credenciales, integración con la API, importación de archivos, ajuste geográfico, control de errores.
4. **PDF técnico** — configuración de papel, escala de impresión, rótulo, leyenda, validaciones, exportación de alta calidad.

## 23. Riesgos
Que TopoExport no ofrezca una API pública adecuada; que los formatos exportados requieran conversiones adicionales; que cada municipalidad solicite datos diferentes; que la escala se pierda al imprimir desde determinados navegadores; que planos muy grandes afecten el rendimiento; que el usuario confunda una validación del sistema con una aprobación municipal; que las imágenes de base no contengan medidas confiables.

## 24. Consideración legal y administrativa
PlanoEvento es una herramienta de preparación documental. No garantiza la aprobación del plano ni reemplaza la revisión de arquitectos, técnicos, bomberos, defensa civil, organismos de seguridad o autoridades municipales. Cada organizador es responsable de verificar los requisitos vigentes en la jurisdicción donde se realice el evento.

## 25. Resultado esperado
Crear proyecto → establecer ubicación → incorporar base → diseñar distribución → colocar elementos → revisar → imprimir o exportar en PDF. El producto está enfocado exclusivamente en ayudar al organizador a preparar el plano que deberá presentar para solicitar la aprobación de su evento o feria.
