# Arquitectura de tokens

Los *design tokens* son la unidad mínima del sistema: cada color, tamaño o medida es un token con nombre. La documentación, Figma y el código comparten estos mismos nombres, de modo que "primario" significa lo mismo en todas partes.

## Tres capas

El sistema se organiza en tres niveles. Cada capa referencia a la anterior mediante *alias*, nunca valores sueltos.

```
Primitivos          →   Semánticos          →   Modos de marca
(el valor crudo)        (el propósito)          (qué marca aplica)

Blue/medium #0099CC  →  Fill/brand/primary/   →  Pacífico → Blue
                        medium                   Sanna    → Green
                                                 Tsana   → Purple
```

### 1. Primitivos — *el valor*

La paleta bruta, sin significado de uso. Son 50 colores en 10 familias, cada una con 5 intensidades: `xhigh`, `high`, `medium`, `low`, `xlow`.

```
Blue/xhigh   #003840
Blue/high    #007499
Blue/medium  #0099CC
Blue/low     #79C2E4
Blue/xlow    #F2F9FD
```

Un primitivo nunca se usa directamente en un componente: solo lo referencian los tokens semánticos.

### 2. Semánticos — *el propósito*

Describen **para qué** sirve un color, no cuál es. Se agrupan por rol y siguen un patrón consistente:

```
[Rol] / [familia] / [variante] / [intensidad]

Fill/brand/primary/medium
Text/neutral/xhigh
Stroke/status/danger/medium
Surface/status/success/xlow
```

- **Rol:** `Fill` (rellenos), `Text` (texto), `Icons` (iconos), `Stroke` (bordes), `Surface` (superficies).
- **Familia:** `brand` (primary / secondary), `neutral`, `status` (danger / warning / success / informative).
- **Intensidad:** `xhigh` → `xlow`.

### 3. Modos de marca — *qué marca aplica*

Los tokens semánticos de marca (`brand/*`) se resuelven distinto según el **modo**: Sanna, Tsana o Pacífico. Los tokens `neutral` y `status` son compartidos: se ven igual en las tres marcas.

| Token | Pacífico | Sanna | Tsana |
| --- | --- | --- | --- |
| `Fill/brand/primary/medium` | `#0099CC` | `#01A355` | `#5D59EF` |
| `Fill/brand/secondary/medium` | `#E02667` | `#5D59EF` | `#01A355` |
| `Text/neutral/xhigh` | `#121314` | `#121314` | `#121314` |
| `Fill/status/danger/medium` | `#DC3B31` | `#DC3B31` | `#DC3B31` |

## Colecciones en Figma

En la **Core Tokens Library** los tokens viven en estas colecciones de variables:

| Colección | Contenido | Modos |
| --- | --- | --- |
| **Primitives Colors** | 50 colores base | Value |
| **Core color variables** | 175 tokens semánticos de color | Sanna · Tsana · Pacífico |
| **Primitive Typography** | 8 tamaños de fuente | Mode 1 |
| **Primitives Scale** | 15 pasos de escala numérica | Mode 1 |
| **Core Sizes** | Espaciado, radios y grosores | Mode 1 |

## Reglas de oro

:::do
Usa siempre el token semántico más específico para el propósito (`Fill/brand/primary/medium`), no el primitivo (`Blue/medium`). Así el cambio de marca y los ajustes de paleta se propagan solos.
:::

:::dont
No referencies primitivos directamente en componentes ni escribas valores hex a mano. Rompe el soporte multimarca y desconecta el componente del sistema.
:::
