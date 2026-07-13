# Tags, Chips y Badges

Piezas pequeñas que etiquetan, filtran o cuentan. Se parecen, pero cumplen funciones distintas. La **Global Components Library** incluye `Tag`, `Chip`, `Badge` y `Promotional Tag`.

## Previsualización

<div class="ds-preview">
<p class="ds-caption">Tags de estado</p>
<span class="ds-tag">Neutral</span>
<span class="ds-tag ds-tag--success">Activo</span>
<span class="ds-tag ds-tag--warning">Pendiente</span>
<span class="ds-tag ds-tag--danger">Vencido</span>
<span class="ds-tag ds-tag--info">Informativo</span>
<span class="ds-tag ds-tag--brand">Nuevo</span>
</div>

<div class="ds-preview">
<p class="ds-caption">Chips (filtros)</p>
<span class="ds-chip is-on">Cardiología <span class="x">×</span></span>
<span class="ds-chip">Pediatría</span>
<span class="ds-chip">Dermatología</span>
</div>

<div class="ds-preview">
<p class="ds-caption">Badges (contadores)</p>
<span class="ds-badge-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg><span class="ds-badge">3</span></span>
<span class="ds-badge-wrap"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H5.2L4 17.3Z"/></svg><span class="ds-badge">99+</span></span>
</div>

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
