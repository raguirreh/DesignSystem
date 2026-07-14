# Iconografía

Los iconos refuerzan el significado y aceleran el reconocimiento visual. El sistema se apoya en **Material Symbols**, lo que garantiza un set amplio, consistente en trazo y con cobertura para casi cualquier necesidad.

## Estilo

- **Set:** Material Symbols (outline por defecto; variante rellena para estados activos/seleccionados).
- **Trazo:** constante, esquinas redondeadas.
- **Construcción:** retícula de 24×24px con área viva de 20×20px.

En la librería ya viven iconos como `search`, `close`, `person`, `check`, `info`, `warning`, `error`, `notifications`, `home`, `lock`, `visibility`, `filter_list`, `more_vert`, `arrow_back`, `expand_more`, `calendar` / `date_range`, `schedule`, entre muchos otros.

:::info
Embebe el catálogo real con `::figma <url del frame de iconos>` para que el equipo vea siempre el set actualizado y pueda copiar cada icono.
:::

## Set expuesto en el sitio

Este sitio de documentación consume los iconos desde un **único componente reutilizable** (`dsIcon`), de modo que las tarjetas del home, la navegación del sidebar y cualquier uso futuro tomen el trazo desde el mismo lugar en vez de repetir SVGs sueltos o emojis. Estos son los iconos disponibles hoy:

::icons

Cada icono se dibuja con `viewBox` 24×24, trazo de 2px y `currentColor`, así que hereda el color del token de texto o de acento del contexto donde se coloca.

## Tamaños

| Token | Tamaño | Uso |
| --- | --- | --- |
| `icon-sm` | 16px | Dentro de texto, inputs y chips |
| `icon-md` | 20px | Botones y navegación |
| `icon-lg` | 24px | Tamaño por defecto en interfaz |
| `icon-xl` | 32px | Estados vacíos e ilustrativos |

## Color

Usa los tokens del rol **Icons**: `Icons/neutral/*` para iconos funcionales neutros e `Icons/status/*` para iconos de estado (éxito, error, aviso). En superficies de marca, `Icons/brand/*`.

## Reglas de uso

:::do
Acompaña los iconos de acción con etiqueta de texto siempre que el espacio lo permita. Un icono solo es aceptable cuando su significado es universal (cerrar, buscar, más opciones).
:::

:::dont
No mezcles Material Symbols con iconos de otros sets ni escales iconos a tamaños intermedios: el trazo pierde consistencia óptica.
:::

## Accesibilidad

- Icono **decorativo** (acompaña texto): `aria-hidden="true"`.
- Icono **funcional** (única etiqueta de un control): necesita `aria-label`.
- Los iconos funcionales cumplen contraste mínimo **3:1** con su fondo (`Icons/*` sobre su superficie).
