# Campos de texto

Los campos de texto permiten introducir y editar información. Son la base de todos los formularios. La **Global Components Library** incluye `Input / Text Field` y `Input / Select`, ambos con la misma matriz de estados y tamaños.

:::info
Los campos de abajo están construidos con los tokens reales (modo Pacífico) sobre fondo blanco. Para ver el frame de Figma, embébelo con `::figma <url del frame de Input>`.
:::

## Previsualización

<div class="ds-preview">
<div class="ds-field">
<label class="ds-label">Correo electrónico</label>
<div class="ds-input"><span class="ph">nombre@correo.com</span></div>
<span class="ds-help">Te enviaremos la confirmación aquí.</span>
</div>
<div class="ds-field">
<label class="ds-label">Correo electrónico</label>
<div class="ds-input is-focus"><span>ana@pacifico.pe</span></div>
<span class="ds-help">Focus</span>
</div>
<div class="ds-field">
<label class="ds-label">Correo electrónico</label>
<div class="ds-input is-error"><span>ana.pacifico.pe</span></div>
<span class="ds-help err"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h.01"/></svg>El correo debe incluir @.</span>
</div>
</div>

<div class="ds-preview">
<div class="ds-field">
<label class="ds-label">Deshabilitado</label>
<div class="ds-input is-disabled"><span class="ph">No editable</span></div>
</div>
<div class="ds-field">
<label class="ds-label">Sede <span class="req">*</span></label>
<div class="ds-input"><span>Lima</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
<span class="ds-help">Select</span>
</div>
</div>

## Estados

Los nombres corresponden a las variantes de la librería:

| Estado | Tratamiento |
| --- | --- |
| **Default** | Borde `Stroke/neutral/low` |
| **Hover** | Borde `Stroke/neutral/medium` |
| **Focus** | Borde `Stroke/brand/primary/medium` + anillo de foco 2px |
| **Disabled** | Fondo atenuado, texto `Text/neutral/medium`, sin interacción |
| **Error** | Borde `Stroke/status/danger/medium` + mensaje con icono |

> La librería también parametriza tamaño (**SM**…), presencia de icono, texto de ayuda y estado obligatorio como propiedades del componente.

## Anatomía

1. **Etiqueta:** siempre visible, encima del campo. `Sizes/s` (14), peso 500.
2. **Contenedor:** radio `border radio/small` (8px), borde `border width/small` (1px), padding `Spacing/small` (12px).
3. **Texto de ayuda** (opcional): debajo, `Sizes/xs` (12), color `Text/neutral/medium`.
4. **Mensaje de error:** sustituye a la ayuda, color `Text/status/danger/medium`, con icono.
5. **Icono / prefijo** (opcional): dentro del contenedor.

## Select

Mismo contenedor y estados que el Text Field, pero abre una lista de opciones. Úsalo para elegir **una** opción de un conjunto conocido y acotado; para muchas opciones o búsqueda libre, usa el patrón de búsqueda.

## Validación

- Valida **al salir del campo** (blur), no con cada tecla.
- El error dice **cómo corregirlo**: *"El correo debe incluir @"*, no *"Correo inválido"*.
- Al corregir, el mensaje desaparece de inmediato.

## Reglas de uso

:::do
Usa siempre etiqueta visible. El placeholder es un ejemplo del formato esperado, nunca la etiqueta.
:::

:::dont
No uses el placeholder como única etiqueta, ni marques a la vez campos obligatorios y opcionales: marca solo los opcionales con "(opcional)".
:::

## Accesibilidad

- Cada campo tiene su `label` asociado programáticamente.
- Los errores se anuncian a lectores de pantalla (`aria-describedby` + `aria-invalid`).
- Operable por teclado, con anillo de foco visible.
