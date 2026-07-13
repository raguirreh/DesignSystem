# Espaciado y medidas

Un sistema de medidas predecible crea ritmo visual y elimina decisiones arbitrarias. Todo se construye sobre una **escala base** (colección *Primitives Scale*) que luego se referencia con nombres semánticos (colección *Core Sizes*).

## Escala base — Primitives Scale

El valor crudo, en píxeles. El espaciado, los radios y los grosores apuntan a estos pasos.

| Token | px | Token | px |
| --- | --- | --- | --- |
| `Scale/none` | 0 | `Scale/500` | 24 |
| `Scale/25` | 1 | `Scale/600` | 32 |
| `Scale/50` | 2 | `Scale/700` | 48 |
| `Scale/100` | 4 | `Scale/800` | 64 |
| `Scale/200` | 8 | `Scale/900` | 80 |
| `Scale/300` | 12 | `Scale/1000` | 96 |
| `Scale/400` | 16 | `Scale/1100` | 160 |
| | | `Scale/round` | 500 |

## Espaciado — Core Sizes

Nombres semánticos para separación interna y entre elementos. Estos son los que usas al diseñar.

| Token | Referencia | px |
| --- | --- | --- |
| `Spacing/none` | Scale/none | 0 |
| `Spacing/2xsmall` | Scale/100 | 4 |
| `Spacing/xsmall` | Scale/200 | 8 |
| `Spacing/small` | Scale/300 | 12 |
| `Spacing/medium` | Scale/400 | 16 |
| `Spacing/large` | Scale/500 | 24 |
| `Spacing/xlarge` | Scale/600 | 32 |
| `Spacing/2xlarge` | Scale/700 | 48 |
| `Spacing/3xlarge` | Scale/800 | 64 |
| `Spacing/4xlarge` | Scale/900 | 80 |
| `Spacing/5xlarge` | Scale/1000 | 96 |
| `Spacing/6xlarge` | Scale/1100 | 160 |

## Radios de borde

| Token | Referencia | px |
| --- | --- | --- |
| `border radio/none` | Scale/none | 0 |
| `border radio/small` | Scale/200 | 8 |
| `border radio/medium` | Scale/400 | 16 |
| `border radio/large` | Scale/500 | 24 |
| `border radio/circular` | Scale/round | 500 (píldora / círculo) |

## Grosores de borde

| Token | Referencia | px |
| --- | --- | --- |
| `border width/none` | Scale/none | 0 |
| `border width/small` | Scale/25 | 1 |
| `border width/medium` | Scale/50 | 2 |

## Principio de proximidad

El espaciado comunica relación: lo relacionado va junto, lo independiente se separa.

- Dentro de un grupo: `Spacing/xsmall` a `Spacing/small` (8–12).
- Entre grupos relacionados: `Spacing/medium` a `Spacing/large` (16–24).
- Entre bloques independientes: `Spacing/xlarge` o más (32+).

:::do
Elige siempre el token de la escala más cercano a lo que necesitas. Si dudas entre dos, usa el mayor: el aire favorece la lectura.
:::

:::dont
No uses valores fuera de la escala (10, 18, 25…). Si un caso real lo exige de forma recurrente, propón añadir el token.
:::
