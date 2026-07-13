# Tipografía

La tipografía construye la jerarquía de la información. La escala es limitada y con nombres semánticos: cada tamaño tiene un propósito y no se crean valores intermedios.

## Escala de tamaños

Colección **Primitive Typography** de la Core Tokens Library. Ocho tamaños, de `xs` a `4xl`:

| Token | Tamaño | Uso sugerido |
| --- | --- | --- |
| `Sizes/xs` | 12 px | Etiquetas, captions, metadatos |
| `Sizes/s` | 14 px | Texto secundario, ayudas |
| `Sizes/m` | 16 px | Texto de cuerpo (base) |
| `Sizes/l` | 24 px | Subtítulos, títulos de tarjeta |
| `Sizes/xl` | 32 px | Título de sección |
| `Sizes/2xl` | 48 px | Título de página |
| `Sizes/3xl` | 64 px | Titulares destacados |
| `Sizes/4xl` | 80 px | Momentos hero / portada |

> Los tamaños son primitivos numéricos: normalmente los consumes a través de estilos de texto de Figma que combinan tamaño + peso + interlineado.

## Jerarquía recomendada

| Nivel | Tamaño | Peso |
| --- | --- | --- |
| Display | `4xl` / `3xl` (80 / 64) | 800 |
| Título de página | `2xl` (48) | 700 |
| Sección | `xl` (32) | 700 |
| Subsección | `l` (24) | 600 |
| Cuerpo | `m` (16) | 400 |
| Secundario | `s` (14) | 400 |
| Caption | `xs` (12) | 500 |

## Reglas de uso

:::do
Usa los estilos de texto publicados en Figma y sus tokens equivalentes en código. La jerarquía debe leerse solo con tamaño y peso, incluso sin color.
:::

:::dont
No apliques tamaños fuera de la escala (por ejemplo 18 px o 20 px) ni combines más de dos pesos en un mismo bloque de contenido.
:::

## Legibilidad

- Longitud de línea ideal: **45–75 caracteres** en texto corrido.
- Interlineado del cuerpo: no baja de **1.4**.
- Alineación a la izquierda por defecto; centrado solo en titulares cortos.
- Evita mayúsculas sostenidas en más de 2–3 palabras.
