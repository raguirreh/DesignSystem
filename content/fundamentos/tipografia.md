# Tipografía

La tipografía construye la jerarquía de la información. Una escala limitada y consistente hace que las pantallas se lean solas.

## Familia tipográfica

| Uso | Familia | Fallback |
| --- | --- | --- |
| Interfaz y texto | Inter | system-ui, sans-serif |
| Código y datos técnicos | JetBrains Mono | ui-monospace, monospace |

:::info
Sustituye estas familias por las de tu marca. Mantén siempre un *fallback* de sistema para garantizar el renderizado mientras carga la fuente.
:::

## Escala tipográfica

La escala usa una progresión limitada: cada nivel tiene un propósito claro y no se crean tamaños intermedios.

| Token | Tamaño / Interlineado | Peso | Uso |
| --- | --- | --- | --- |
| `display` | 40px / 48px | 800 | Titulares de portada y momentos clave |
| `heading-1` | 32px / 40px | 700 | Título principal de página |
| `heading-2` | 24px / 32px | 700 | Secciones dentro de una página |
| `heading-3` | 18px / 26px | 600 | Subsecciones y títulos de tarjetas |
| `body` | 16px / 24px | 400 | Texto general |
| `body-small` | 14px / 20px | 400 | Texto secundario, metadatos |
| `caption` | 12px / 16px | 500 | Etiquetas, ayudas y notas |

## Reglas de uso

:::do
Usa los estilos de texto publicados en Figma y sus tokens equivalentes en código. La jerarquía debe poder leerse quitando el color: solo con tamaño y peso.
:::

:::dont
No apliques tamaños fuera de la escala ni combines más de dos pesos en un mismo bloque de contenido.
:::

## Buenas prácticas de legibilidad

- Longitud de línea ideal: **45–75 caracteres** por línea en texto corrido.
- Evita texto en mayúsculas sostenidas para más de 2–3 palabras.
- Alineación a la izquierda por defecto; el texto centrado solo en titulares cortos.
- El interlineado del cuerpo de texto nunca baja de **1.4**.
