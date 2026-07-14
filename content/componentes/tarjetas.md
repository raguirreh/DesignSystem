# Tarjetas

Las `Cards` agrupan información relacionada en un contenedor delimitado y accionable. La librería incluye variantes como **Person card** (personas) y **CardDiscipline** (especialidades/contenido).

## Previsualización

<div class="ds-preview">
<div class="ds-card">
<div class="ds-card-person">
<span class="ds-avatar ds-avatar--lg">AR</span>
<div><h4>Ana Ramírez</h4><p>Cardiología · Sede Lima</p></div>
</div>
</div>
<div class="ds-card">
<div class="ds-card-media"></div>
<h4>Medicina preventiva</h4>
<p>Chequeos y programas para cuidar tu salud antes de que aparezcan problemas.</p>
</div>
</div>

## Variantes

| Variante | Uso |
| --- | --- |
| **Person card** | Presenta a una persona (avatar, nombre, rol, acción) |
| **Content / Discipline** | Destaca una categoría, especialidad o contenido con media + texto |
| **Clicable** | Toda la tarjeta navega a un destino |

## Anatomía

1. **Contenedor**: `Surface/neutral/xlow`, borde `Stroke/neutral/low`, radio `border radio/medium`, padding `Spacing/large`.
2. **Media** (opcional): imagen o color a sangre en la parte superior.
3. **Título** (`heading-3`) + **descripción** (`body-small`, `Text/neutral/medium`).
4. **Acciones / metadatos** en la parte inferior.

## Reglas de uso

:::do
Una tarjeta = un concepto. Título claro, descripción corta (2–3 líneas) y una acción evidente. En una retícula, mantén la misma altura.
:::

:::dont
No anides tarjetas dentro de tarjetas. Si la tarjeta es clicable, no pongas otros elementos interactivos dentro que compitan por el clic.
:::

## Accesibilidad

- La tarjeta clicable se implementa con un enlace real que describe su destino.
- El orden de lectura sigue la jerarquía visual (título antes que metadatos).
- Imágenes informativas con `alt`; decorativas con `alt=""`.
