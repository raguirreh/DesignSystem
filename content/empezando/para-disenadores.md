# Para diseñadores

Guía rápida para empezar a diseñar con la librería del design system en Figma.

## 1. Activa la librería

1. Abre tu archivo de trabajo en Figma.
2. Ve a **Assets → Libraries** (o pulsa `Alt/Option + 3`).
3. Activa la librería del design system del equipo.
4. Los componentes, estilos de color y estilos de texto quedarán disponibles en el panel de Assets.

## 2. Usa siempre componentes y estilos publicados

:::do
Inserta componentes desde el panel de **Assets** y aplica los estilos de color y texto publicados. Así tus diseños se actualizan automáticamente cuando la librería evoluciona.
:::

:::dont
No hagas *detach* de componentes ni apliques colores o tipografías "a mano". Un componente desvinculado deja de recibir mejoras y rompe la consistencia.
:::

## 3. Si un componente no cubre tu caso

Antes de crear algo nuevo:

1. **Busca** en esta documentación (⌘K) por si existe un patrón que resuelva tu necesidad.
2. Revisa las **variantes** del componente: muchas veces la solución es una propiedad que no conocías.
3. Si de verdad no existe, sigue el proceso de [contribución](#/recursos/contribuir) para proponerlo.

## 4. Buenas prácticas en tus archivos

- Nombra tus frames y capas con intención: facilita el handoff a desarrollo.
- Usa los **tokens de espaciado** del sistema (múltiplos de 4) en lugar de valores arbitrarios.
- Verifica el **contraste de color** antes de entregar: los pares de tokens semánticos ya cumplen WCAG AA.
- Diseña siempre los **estados**: hover, focus, deshabilitado, error, vacío y cargando.

:::info
¿Dudas sobre qué componente usar? El buscador de esta documentación indexa todo el contenido: escribe el problema que quieres resolver (por ejemplo, "confirmar una acción destructiva") y encontrarás la guía correspondiente.
:::
