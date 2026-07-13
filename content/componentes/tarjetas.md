# Tarjetas

Las tarjetas agrupan información relacionada en un contenedor delimitado. Facilitan escanear colecciones de contenido y actuar sobre cada elemento.

:::info
Embebe aquí el componente real desde Figma con `::figma <url del frame>`.
:::

## Anatomía

1. **Contenedor**: fondo `color-surface`, borde `color-border`, radio `radius-md`, padding `space-6`.
2. **Media** (opcional): imagen o ilustración a sangre en la parte superior.
3. **Título**: estilo `heading-3`.
4. **Descripción**: estilo `body-small`, color `color-text-muted`, máximo 2–3 líneas.
5. **Metadatos o acciones** (opcional): parte inferior de la tarjeta.

## Variantes

| Variante | Uso |
| --- | --- |
| **Estática** | Solo presenta información, sin interacción |
| **Clicable** | Toda la tarjeta navega a un destino |
| **Con acciones** | Contiene botones o menú de acciones propias |

## Comportamiento

- La tarjeta clicable eleva ligeramente su sombra en hover y muestra anillo de foco con teclado.
- Si la tarjeta es clicable, **no** contiene otros elementos interactivos dentro (los clics compiten); usa la variante con acciones en ese caso.
- En colecciones, todas las tarjetas de una retícula mantienen la misma altura visual.

## Reglas de uso

:::do
Una tarjeta = un concepto. Título claro, descripción corta y una acción evidente.
:::

:::dont
No anides tarjetas dentro de tarjetas ni las uses como simple decoración de bloques de texto largos: para eso está la jerarquía tipográfica.
:::

## Accesibilidad

- La tarjeta clicable se implementa con un enlace real que envuelve (o describe) el contenido.
- El orden de lectura sigue la jerarquía visual: título antes que metadatos.
- Las imágenes informativas llevan texto alternativo; las decorativas, `alt=""`.
