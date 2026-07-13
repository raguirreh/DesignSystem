# Avatares

El `Avatar` representa a una persona o entidad con su imagen o iniciales. La **Global Components Library** incluye variantes de tamaño e indicador de estado (con/sin punto de conexión).

## Previsualización

<div class="ds-preview">
<p class="ds-caption">Tamaños (Small · Medium · Large)</p>
<span class="ds-avatar ds-avatar--sm">AR</span>
<span class="ds-avatar">AR</span>
<span class="ds-avatar ds-avatar--lg">AR</span>
</div>

<div class="ds-preview">
<p class="ds-caption">Con indicador de estado</p>
<span class="ds-avatar-wrap"><span class="ds-avatar">MG</span><span class="dot"></span></span>
<span class="ds-avatar-wrap"><span class="ds-avatar ds-avatar--lg">JP</span><span class="dot"></span></span>
</div>

## Anatomía

1. **Contenedor:** círculo, tamaño según variante (Small 28 · Medium 40 · Large 56).
2. **Contenido:** imagen recortada al círculo o, si no hay, las **iniciales** sobre fondo de marca (`Surface/brand/primary/xhigh`).
3. **Indicador** (opcional): punto de estado (`Fill/status/success`) con borde blanco, esquina inferior derecha.

## Reglas de uso

:::do
Usa iniciales como respaldo cuando no hay foto: 1–2 caracteres, legibles. Mantén el mismo tamaño de avatar dentro de una misma lista.
:::

:::dont
No metas texto largo ni iconos complejos dentro del avatar, ni uses avatares de distinto tamaño en la misma fila.
:::

## Accesibilidad

- Si el avatar es una imagen, incluye `alt` con el nombre de la persona.
- El indicador de estado no debe ser el único medio de comunicar disponibilidad: acompáñalo con texto cuando sea relevante.
