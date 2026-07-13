# Color

La paleta de color transmite la personalidad de la marca y organiza la información. Todos los colores del producto provienen de estos tokens: nunca se usan valores sueltos.

:::info
Los valores de esta página son un punto de partida. Actualízalos con la paleta real de tu librería de Figma y, si quieres, embebe el frame de la paleta con la directiva `::figma <url>` (ver [Librería de Figma](#/recursos/figma)).
:::

## Colores de marca

| Token | Valor | Uso |
| --- | --- | --- |
| `color-primary` | `#5B5BD6` | Acciones principales, enlaces, elementos activos |
| `color-primary-hover` | `#4646C6` | Estado hover de acciones principales |
| `color-primary-soft` | `#EEEEFC` | Fondos suaves de elementos primarios |

## Neutrales

| Token | Valor | Uso |
| --- | --- | --- |
| `color-text` | `#1A1A2E` | Texto principal |
| `color-text-muted` | `#61616E` | Texto secundario y descripciones |
| `color-surface` | `#FFFFFF` | Fondo de tarjetas y superficies elevadas |
| `color-background` | `#F7F7F9` | Fondo general de la aplicación |
| `color-border` | `#E4E4EA` | Bordes y divisores |

## Colores semánticos

Comunican estado y resultado. Se usan solo para su significado, nunca por estética.

| Token | Valor | Significado |
| --- | --- | --- |
| `color-success` | `#1A9E5C` | Operación completada, estados positivos |
| `color-warning` | `#D97706` | Atención requerida, acciones con consecuencias |
| `color-danger` | `#D6455B` | Errores, acciones destructivas |
| `color-info` | `#2563EB` | Información neutra y ayudas |

## Reglas de uso

:::do
Usa los pares de tokens definidos (texto sobre fondo) — ya están verificados para cumplir contraste **WCAG AA** (4.5:1 en texto normal, 3:1 en texto grande).
:::

:::dont
No uses el color como único indicador de estado. Un error debe comunicarse con color **y** un icono o mensaje de texto.
:::

:::dont
No crees variaciones de color ajustando opacidad o luminosidad a mano. Si necesitas un matiz nuevo, propónlo como token.
:::

## Accesibilidad

- Texto normal sobre fondo: contraste mínimo **4.5:1**.
- Texto grande (≥18px bold o ≥24px regular): mínimo **3:1**.
- Elementos de interfaz (bordes de inputs, iconos funcionales): mínimo **3:1**.
- Verifica combinaciones nuevas con una herramienta de contraste antes de proponerlas.
