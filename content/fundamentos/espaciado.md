# Espaciado y retícula

Un sistema de espaciado predecible crea ritmo visual y elimina decisiones arbitrarias. Todo el espaciado del producto se construye sobre una **base de 4px**.

## Escala de espaciado

| Token | Valor | Uso típico |
| --- | --- | --- |
| `space-1` | 4px | Separación entre icono y texto |
| `space-2` | 8px | Espaciado interno compacto, gaps de chips |
| `space-3` | 12px | Padding de inputs y botones |
| `space-4` | 16px | Padding estándar de contenedores |
| `space-6` | 24px | Separación entre grupos relacionados |
| `space-8` | 32px | Separación entre bloques de contenido |
| `space-12` | 48px | Separación entre secciones de página |
| `space-16` | 64px | Márgenes de secciones principales |

:::do
Elige siempre el valor de la escala más cercano a lo que necesitas. Si dudas entre dos, usa el mayor: el aire favorece la lectura.
:::

:::dont
No uses valores fuera de la escala (10px, 18px, 25px…). Si un caso real lo exige repetidamente, propón añadir el token.
:::

## Retícula

- **Escritorio**: 12 columnas, gutter de 24px, ancho máximo de contenido 1200px.
- **Tablet**: 8 columnas, gutter de 16px.
- **Móvil**: 4 columnas, gutter de 16px, márgenes laterales de 16px.

## Principio de proximidad

El espaciado comunica relación: elementos relacionados van juntos, elementos independientes se separan.

- Dentro de un grupo: `space-2` a `space-3`.
- Entre grupos relacionados: `space-4` a `space-6`.
- Entre bloques independientes: `space-8` o más.

La regla práctica: **el espacio exterior de un elemento siempre es mayor que su espacio interior**.
