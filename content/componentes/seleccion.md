# Controles de selección

Permiten al usuario elegir entre opciones. La **Global Components Library** incluye tres: `Radio Button`, `Checkbox` y `Toggle`. Elegir el correcto es la mitad del trabajo.

## Previsualización

<div class="ds-preview">
<div class="ds-stack">
<p class="ds-caption">Radio Button</p>
<span class="ds-opt"><span class="ds-radio is-on"></span> Presencial</span>
<span class="ds-opt"><span class="ds-radio"></span> Teleconsulta</span>
<span class="ds-opt is-disabled"><span class="ds-radio"></span> A domicilio (no disponible)</span>
</div>
</div>

<div class="ds-preview">
<div class="ds-stack">
<p class="ds-caption">Checkbox</p>
<span class="ds-opt"><span class="ds-check is-on"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg></span> Acepto los términos</span>
<span class="ds-opt"><span class="ds-check"></span> Recibir recordatorios por correo</span>
</div>
</div>

<div class="ds-preview">
<p class="ds-caption">Toggle</p>
<span class="ds-opt"><span class="ds-toggle is-on"></span> Notificaciones activadas</span>
<span class="ds-opt"><span class="ds-toggle"></span> Modo ahorro</span>
</div>

## Cuándo usar cada uno

| Control | Úsalo para… | Regla mental |
| --- | --- | --- |
| **Radio Button** | Elegir **una** opción de un conjunto (2–7 visibles) | Opciones mutuamente excluyentes |
| **Checkbox** | Elegir **varias** opciones, o un sí/no independiente | Selección múltiple o consentimiento |
| **Toggle** | Activar/desactivar algo que surte efecto **al instante** | Un interruptor de ajuste |

:::do
Usa **Toggle** cuando el cambio se aplica inmediatamente (activar notificaciones). Usa **Checkbox** cuando la elección se confirma después con un botón (aceptar términos, seleccionar filas).
:::

:::dont
No uses radios para una sola opción (usa checkbox), ni checkboxes para opciones excluyentes (usa radios).
:::

## Anatomía y estados

Los tres comparten estructura: **control + etiqueta**, con la etiqueta siempre clicable.

| Estado | Tratamiento |
| --- | --- |
| No seleccionado | Borde `Stroke/neutral/medium` |
| Seleccionado | Relleno `Fill/brand/primary/medium` |
| Focus | Anillo de foco 2px |
| Disabled | Atenuado, sin interacción |
| Error | Borde `Stroke/status/danger/medium` (p. ej. checkbox obligatorio sin marcar) |

- Área de toque mínima de **24×24px** aunque el control se dibuje más pequeño.
- La etiqueta forma parte del objetivo de clic.

## Buenas prácticas

:::do
Ordena las opciones con lógica (frecuencia, alfabético o secuencia natural) y usa una sola columna cuando quepa: es más fácil de escanear.
:::

:::dont
No dejes grupos de radios sin una opción por defecto si el campo es obligatorio, salvo que "sin elegir" sea un estado válido y explícito.
:::

## Accesibilidad

- Agrupa radios/checkboxes relacionados con un `fieldset` + `legend`.
- El estado (marcado / no marcado) se comunica a lectores de pantalla, no solo con color.
- Todo el grupo es navegable y operable por teclado.
