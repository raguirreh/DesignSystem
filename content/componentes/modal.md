# Modales y diálogos

El `Modal` interrumpe el flujo para mostrar contenido o pedir una decisión que requiere atención inmediata. Bloquea el fondo hasta que el usuario actúa o lo cierra.

## Previsualización

<div class="ds-preview">
<div class="ds-modal">
<div class="ds-modal-head"><h4>Cancelar cita</h4><button class="x">✕</button></div>
<div class="ds-modal-body">¿Seguro que quieres cancelar la cita del <strong>14 de julio, 10:30</strong>? Esta acción no se puede deshacer.</div>
<div class="ds-modal-foot">
<button class="ds-btn ds-btn--neutral">Volver</button>
<button class="ds-btn ds-btn--error">Sí, cancelar</button>
</div>
</div>
</div>

## Anatomía

1. **Overlay**: fondo oscurecido que atenúa la página y captura el foco.
2. **Contenedor**: superficie elevada, radio `border radio/medium`, sombra pronunciada.
3. **Encabezado**: título + botón de cerrar.
4. **Cuerpo**: contenido o mensaje.
5. **Pie**: acciones alineadas a la derecha; la primaria a la derecha del todo.

## Cuándo usarlo

| Tipo | Uso |
| --- | --- |
| **Confirmación** | Confirmar acciones con consecuencias (eliminar, cancelar) |
| **Formulario corto** | Capturar pocos datos sin salir del contexto |
| **Información** | Mostrar detalle que no justifica una página |

## Reglas de uso

:::do
Usa el modal solo para lo que **requiere** atención inmediata. Enfoca el primer elemento accionable al abrir y devuelve el foco al cerrar.
:::

:::dont
No anides modales ni los uses para contenido largo (usa una página). No bloquees el cierre con `Esc` o clic fuera salvo en pasos críticos.
:::

## Accesibilidad

- `role="dialog"` + `aria-modal="true"` y un `aria-label`/`aria-labelledby`.
- El foco queda **atrapado** dentro del modal mientras está abierto.
- `Esc` cierra (salvo flujos críticos); al cerrar, el foco vuelve al disparador.
