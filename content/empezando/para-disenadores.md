# Para diseñadores

Guía rápida para diseñar con las librerías del design system de Pacífico en Figma.

## 1. Activa las librerías

1. Abre tu archivo de trabajo en Figma.
2. Ve a **Assets → Libraries** (o pulsa `Alt/Option + 3`).
3. Activa **B. Core Tokens Library** y **C. Global Components Library**.
4. Los componentes, estilos y variables de token quedarán disponibles en el panel de Assets.

## 2. Elige la marca con los modos

El sistema es multimarca (Sanna · Tsana · **Pacífico**). No dupliques componentes por marca: usa los **modos** de las variables de color. Al cambiar el modo, los tokens `brand/*` adoptan los colores correctos automáticamente.

## 3. Usa siempre tokens y componentes publicados

:::do
Inserta componentes desde **Assets** y aplica los tokens de color, tipografía y medida publicados. Así tus diseños se actualizan cuando la librería evoluciona.
:::

:::dont
No hagas *detach* de componentes ni apliques colores o medidas "a mano". Un componente desvinculado deja de recibir mejoras y rompe el soporte multimarca.
:::

## 4. Si un componente no cubre tu caso

1. **Busca** en esta documentación (⌘K) por si existe ya un patrón.
2. Revisa las **variantes/propiedades** del componente: muchas veces la solución es una propiedad que no conocías (tamaño, estado, con/sin icono).
3. Si de verdad no existe, sigue el proceso de [contribución](#/recursos/contribuir).

## 5. Buenas prácticas

- Usa los **tokens de espaciado** (`Spacing/*`, múltiplos de la escala) en lugar de valores arbitrarios.
- Elige colores por su **token semántico** (`Fill/`, `Text/`, `Surface/`…), no por el primitivo.
- Verifica el **contraste**: los pares de tokens de intensidad ya están pensados para cumplir WCAG AA.
- Diseña siempre los **estados**: hover, focus, deshabilitado, error, vacío y cargando.

:::info
El buscador indexa toda la documentación: escribe el problema a resolver (por ejemplo, "confirmar una acción" o "elegir una opción") y encontrarás la guía y el componente adecuados.
:::
