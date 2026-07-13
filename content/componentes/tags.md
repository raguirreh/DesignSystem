# Tags, Chips y Badges

Piezas pequeñas que etiquetan, filtran o cuentan. Se parecen, pero cumplen funciones distintas. La **Global Components Library** incluye `Tag`, `Chip`, `Badge` y `Promotional Tag`.

## Cuál es cuál

| Componente | Función | ¿Interactivo? |
| --- | --- | --- |
| **Tag** | Etiqueta el estado o categoría de un elemento | No (informativo) |
| **Chip** | Filtro seleccionable o entrada removible | Sí |
| **Badge** | Contador o indicador sobre otro elemento (icono, avatar) | No |
| **Promotional Tag** | Destaca algo comercial (nuevo, oferta) | No |

## Tag — estados semánticos

Usa el color por su significado, con los tokens de estado:

| Tipo | Fondo | Texto / borde |
| --- | --- | --- |
| Neutral | `Surface/neutral/low` | `Text/neutral/high` |
| Success | `Surface/status/success/xlow` | `Text/status/success/high` |
| Warning | `Surface/status/warning/xlow` | `Text/status/warning/high` |
| Danger | `Surface/status/danger/xlow` | `Text/status/danger/high` |
| Informative | `Surface/status/informative/xlow` | `Text/status/informative/high` |

Anatomía: contenedor con radio `border radio/circular` (píldora), texto `Sizes/xs` (12), padding `Spacing/xsmall` (8px), con icono opcional.

## Chip — filtros

- **No seleccionado:** borde `Stroke/neutral/medium`, fondo transparente.
- **Seleccionado:** relleno `Fill/brand/primary/xlow`, borde y texto de marca.
- **Removible:** incluye un icono de cerrar al final que elimina el chip.

## Badge — contadores

Pequeño indicador que se posa sobre otro elemento (icono de notificaciones, avatar). Muestra un número o un punto de estado. Si el número supera 99, muestra `99+`.

## Reglas de uso

:::do
Reserva **Tag** para estado/categoría (informativo) y **Chip** para lo que el usuario puede accionar (filtrar, quitar). La diferencia de interacción debe ser evidente.
:::

:::dont
No uses tags como si fueran botones ni pongas texto largo dentro: son etiquetas cortas de 1–2 palabras.
:::
