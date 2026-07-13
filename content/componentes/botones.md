# Botones

Los botones ejecutan acciones. Su jerarquía visual comunica la importancia relativa de cada acción en la pantalla. La **Global Components Library** incluye dos familias: `Button` (con etiqueta) e `Icon Button` (solo icono).

:::info
Embebe el componente real con `::figma <url del frame de Button>` para mostrar las variantes en vivo. Los nombres de variante de abajo son los de la librería.
:::

## Button — variantes

| Variante | Token de relleno | Uso | Cuántos por vista |
| --- | --- | --- | --- |
| **Primary** | `Fill/brand/primary` | La acción principal del flujo | Solo uno |
| **Secondary** | `Fill/brand/secondary` | Acción alternativa destacada | Los necesarios |
| **Neutral** | `Fill/neutral` | Acciones de peso medio | Los necesarios |
| **Ghost** | transparente | Acciones de baja prioridad | Los necesarios |
| **Highlight** | énfasis de marca | Llamadas puntuales muy visibles | Con moderación |
| **Error** | `Fill/status/danger` | Acciones destructivas (eliminar) | Solo cuando aplica |

## Estados

Cada variante define los estados de la librería: **Default, Hover, (Focus), Loading** y deshabilitado.

- **Loading** reemplaza la etiqueta por un spinner y bloquea clics repetidos.
- **Focus** muestra un anillo visible de 2px (nunca se elimina el outline).
- Deshabilitado mantiene contraste legible (no menos de 3:1).

## Anatomía

1. **Contenedor:** altura por tamaño, radio `border radio/small` (8px), padding horizontal `Spacing/medium` (16px).
2. **Etiqueta:** `Sizes/m` (16) o `Sizes/s` (14) según tamaño, peso 600, token `Text/*` sobre el relleno.
3. **Icono** (opcional): antes o después de la etiqueta, separado por `Spacing/xsmall` (8px).

## Icon Button

Botón cuadrado de un solo icono, con las mismas variantes de jerarquía: **Primary, Secondary, Neutral, Ghost, Highlight, Danger**. Úsalo cuando el significado del icono es inequívoco (cerrar, más opciones, buscar) o el espacio es muy limitado (barras de herramientas, celdas de tabla).

## Redacción de etiquetas

:::do
Usa verbos que describan el resultado: **"Guardar cambios"**, **"Agendar cita"**, **"Enviar"**.
:::

:::dont
Evita etiquetas genéricas como "Aceptar", "OK" o "Sí": fuera de contexto no comunican qué va a pasar.
:::

## Reglas de uso

:::do
Una sola acción **Primary** por vista, en la posición más prominente, y mantén esa posición en todo el producto.
:::

:::dont
No uses dos botones Primary en la misma vista ni el Primary para acciones destructivas: para eso está la variante **Error**.
:::
