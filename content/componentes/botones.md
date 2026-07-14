# Botones

Los botones ejecutan acciones. Su jerarquía visual comunica la importancia relativa de cada acción en la pantalla. La **Global Components Library** incluye dos familias: `Button` (con etiqueta) e `Icon Button` (solo icono).

:::info
Los botones de abajo están construidos con los tokens reales (modo Pacífico) y se muestran sobre fondo blanco. Para ver el frame de Figma, embébelo con `::figma <url del frame de Button>`.
:::

## Previsualización

<div class="ds-preview">
<p class="ds-caption">Variantes de jerarquía</p>
<button class="ds-btn ds-btn--primary">Primary</button>
<button class="ds-btn ds-btn--secondary">Secondary</button>
<button class="ds-btn ds-btn--neutral">Neutral</button>
<button class="ds-btn ds-btn--ghost">Ghost</button>
<button class="ds-btn ds-btn--highlight">Highlight</button>
<button class="ds-btn ds-btn--error">Error</button>
</div>

<div class="ds-preview">
<p class="ds-caption">Tamaños (Large · Medium · Small)</p>
<button class="ds-btn ds-btn--primary ds-btn--lg">Agendar cita</button>
<button class="ds-btn ds-btn--primary">Agendar cita</button>
<button class="ds-btn ds-btn--primary ds-btn--sm">Agendar cita</button>
</div>

<div class="ds-preview">
<p class="ds-caption">Estados y con icono</p>
<button class="ds-btn ds-btn--primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>Con icono</button>
<button class="ds-btn ds-btn--primary is-loading"><span class="ds-spin"></span>Cargando</button>
<button class="ds-btn ds-btn--primary is-disabled" disabled>Deshabilitado</button>
</div>

<div class="ds-preview">
<p class="ds-caption">Icon Button</p>
<button class="ds-iconbtn ds-iconbtn--primary" aria-label="Añadir"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
<button class="ds-iconbtn ds-iconbtn--secondary" aria-label="Editar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
<button class="ds-iconbtn ds-iconbtn--neutral" aria-label="Más opciones"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg></button>
<button class="ds-iconbtn ds-iconbtn--ghost" aria-label="Cerrar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
<button class="ds-iconbtn ds-iconbtn--danger" aria-label="Eliminar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>
</div>

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
- **Focus** muestra un anillo visible de 2px (nunca se elimina el outline). Aplica a **todas** las variantes por igual, incluida **Ghost**.
- **Hover** en las variantes con relleno oscurece ligeramente el fondo. En **Ghost** —que parte de fondo transparente— el hover pinta un relleno sutil con `Fill/neutral/low`, de modo que se lea como accionable y no como texto deshabilitado.
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
