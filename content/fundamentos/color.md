# Color

El color transmite la identidad de la marca y organiza la información. Todo color del producto proviene de un **token**; los valores sueltos no existen en el sistema. Si aún no lo has leído, empieza por [Arquitectura de tokens](#/fundamentos/arquitectura-tokens).

## Paleta primitiva

50 colores base en 10 familias, cada una con 5 intensidades (`xhigh` → `xlow`). Son la materia prima: los referencian los tokens semánticos, no los componentes.

### Neutrales — Black

<div class="swatch-strip"><div class="sw"><i style="background:#121314"></i><em>xhigh</em></div><div class="sw"><i style="background:#2E2F33"></i><em>high</em></div><div class="sw"><i style="background:#6A6C74"></i><em>medium</em></div><div class="sw"><i style="background:#F0F1F2"></i><em>low</em></div><div class="sw"><i style="background:#FDFDFD"></i><em>xlow</em></div></div>

| Intensidad | Valor |
| --- | --- |
| xhigh | `#121314` |
| high | `#2E2F33` |
| medium | `#6A6C74` |
| low | `#F0F1F2` |
| xlow | `#FDFDFD` |

### Blue (primario Pacífico)

<div class="swatch-strip"><div class="sw"><i style="background:#003840"></i><em>xhigh</em></div><div class="sw"><i style="background:#007499"></i><em>high</em></div><div class="sw"><i style="background:#0099CC"></i><em>medium</em></div><div class="sw"><i style="background:#79C2E4"></i><em>low</em></div><div class="sw"><i style="background:#F2F9FD"></i><em>xlow</em></div></div>

| Intensidad | Valor |
| --- | --- |
| xhigh | `#003840` |
| high | `#007499` |
| medium | `#0099CC` |
| low | `#79C2E4` |
| xlow | `#F2F9FD` |

### Pink · Green · Purple (marca)

<div class="swatch-strip-group"><span class="swatch-strip-label">Pink</span><div class="swatch-strip"><div class="sw"><i style="background:#40001B"></i><em>xhigh</em></div><div class="sw"><i style="background:#9F0140"></i><em>high</em></div><div class="sw"><i style="background:#E02667"></i><em>medium</em></div><div class="sw"><i style="background:#EF8DA9"></i><em>low</em></div><div class="sw"><i style="background:#FEF4F6"></i><em>xlow</em></div></div></div>
<div class="swatch-strip-group"><span class="swatch-strip-label">Green</span><div class="swatch-strip"><div class="sw"><i style="background:#00230C"></i><em>xhigh</em></div><div class="sw"><i style="background:#00652C"></i><em>high</em></div><div class="sw"><i style="background:#01A355"></i><em>medium</em></div><div class="sw"><i style="background:#77D296"></i><em>low</em></div><div class="sw"><i style="background:#D6F5DF"></i><em>xlow</em></div></div></div>
<div class="swatch-strip-group"><span class="swatch-strip-label">Purple</span><div class="swatch-strip"><div class="sw"><i style="background:#101332"></i><em>xhigh</em></div><div class="sw"><i style="background:#323693"></i><em>high</em></div><div class="sw"><i style="background:#5D59EF"></i><em>medium</em></div><div class="sw"><i style="background:#A2ADFB"></i><em>low</em></div><div class="sw"><i style="background:#F3F2FF"></i><em>xlow</em></div></div></div>

| Familia | xhigh | high | medium | low | xlow |
| --- | --- | --- | --- | --- | --- |
| **Pink** | `#40001B` | `#9F0140` | `#E02667` | `#EF8DA9` | `#FEF4F6` |
| **Green** | `#00230C` | `#00652C` | `#01A355` | `#77D296` | `#D6F5DF` |
| **Purple** | `#101332` | `#323693` | `#5D59EF` | `#A2ADFB` | `#F3F2FF` |

### Estados — Ruby · Amber · Jade · Sapphire

<div class="swatch-strip-group"><span class="swatch-strip-label">Ruby · Danger</span><div class="swatch-strip"><div class="sw"><i style="background:#541C1C"></i><em>xhigh</em></div><div class="sw"><i style="background:#B3261E"></i><em>high</em></div><div class="sw"><i style="background:#DC3B31"></i><em>medium</em></div><div class="sw"><i style="background:#F37C72"></i><em>low</em></div><div class="sw"><i style="background:#FDEAEA"></i><em>xlow</em></div></div></div>
<div class="swatch-strip-group"><span class="swatch-strip-label">Amber · Warning</span><div class="swatch-strip"><div class="sw"><i style="background:#4A2A0F"></i><em>xhigh</em></div><div class="sw"><i style="background:#A65400"></i><em>high</em></div><div class="sw"><i style="background:#DF670C"></i><em>medium</em></div><div class="sw"><i style="background:#F7B66A"></i><em>low</em></div><div class="sw"><i style="background:#FFF3E6"></i><em>xlow</em></div></div></div>
<div class="swatch-strip-group"><span class="swatch-strip-label">Jade · Success</span><div class="swatch-strip"><div class="sw"><i style="background:#0B3D33"></i><em>xhigh</em></div><div class="sw"><i style="background:#137A66"></i><em>high</em></div><div class="sw"><i style="background:#1FA78D"></i><em>medium</em></div><div class="sw"><i style="background:#4DDDC0"></i><em>low</em></div><div class="sw"><i style="background:#CCF5EA"></i><em>xlow</em></div></div></div>
<div class="swatch-strip-group"><span class="swatch-strip-label">Sapphire · Informative</span><div class="swatch-strip"><div class="sw"><i style="background:#1B2D3A"></i><em>xhigh</em></div><div class="sw"><i style="background:#0253C6"></i><em>high</em></div><div class="sw"><i style="background:#237CF3"></i><em>medium</em></div><div class="sw"><i style="background:#85B8FD"></i><em>low</em></div><div class="sw"><i style="background:#E9F2FF"></i><em>xlow</em></div></div></div>
<div class="swatch-strip-group"><span class="swatch-strip-label">Topaz · Acento</span><div class="swatch-strip"><div class="sw"><i style="background:#31301A"></i><em>xhigh</em></div><div class="sw"><i style="background:#835D03"></i><em>high</em></div><div class="sw"><i style="background:#B78803"></i><em>medium</em></div><div class="sw"><i style="background:#F7CF41"></i><em>low</em></div><div class="sw"><i style="background:#FFF5D2"></i><em>xlow</em></div></div></div>

| Familia | Uso | xhigh | high | medium | low | xlow |
| --- | --- | --- | --- | --- | --- | --- |
| **Ruby** | Danger | `#541C1C` | `#B3261E` | `#DC3B31` | `#F37C72` | `#FDEAEA` |
| **Amber** | Warning | `#4A2A0F` | `#A65400` | `#DF670C` | `#F7B66A` | `#FFF3E6` |
| **Jade** | Success | `#0B3D33` | `#137A66` | `#1FA78D` | `#4DDDC0` | `#CCF5EA` |
| **Sapphire** | Informative | `#1B2D3A` | `#0253C6` | `#237CF3` | `#85B8FD` | `#E9F2FF` |
| **Topaz** | Acento | `#31301A` | `#835D03` | `#B78803` | `#F7CF41` | `#FFF5D2` |

## Tokens semánticos

Es lo que usas al diseñar y construir. Se nombran por **rol / familia / variante / intensidad** y hay 5 roles: `Fill`, `Text`, `Icons`, `Stroke`, `Surface`. Los valores de abajo son del modo **Pacífico**.

### Marca (cambia según Sanna · Tsana · Pacífico)

| Token | Pacífico | Sanna | Tsana |
| --- | --- | --- | --- |
| `brand/primary/xhigh` | `#003840` | `#00230C` | `#101332` |
| `brand/primary/medium` | `#0099CC` | `#01A355` | `#5D59EF` |
| `brand/primary/xlow` | `#F2F9FD` | `#D6F5DF` | `#F3F2FF` |
| `brand/secondary/medium` | `#E02667` | `#5D59EF` | `#01A355` |

> El prefijo de rol (`Fill/`, `Text/`, `Stroke/`…) antecede a estos nombres. Por ejemplo `Fill/brand/primary/medium` para un relleno, `Text/brand/primary/medium` para texto.

### Neutrales (compartidos entre marcas)

| Token | Valor | Uso típico |
| --- | --- | --- |
| `neutral/xhigh` | `#121314` | Texto principal, énfasis máximo |
| `neutral/high` | `#2E2F33` | Texto de cuerpo |
| `neutral/medium` | `#6A6C74` | Texto secundario, iconos |
| `neutral/low` | `#F0F1F2` | Bordes, divisores, fondos sutiles |
| `neutral/xlow` | `#FDFDFD` | Superficies |

### Estados (compartidos entre marcas)

| Token | medium | xlow (fondo) | Significado |
| --- | --- | --- | --- |
| `status/danger` | `#DC3B31` | `#FDEAEA` | Error, acción destructiva |
| `status/warning` | `#DF670C` | `#FFF3E6` | Atención, consecuencias |
| `status/success` | `#1FA78D` | `#CCF5EA` | Operación completada |
| `status/informative` | `#237CF3` | `#E9F2FF` | Información neutra |

## Reglas de uso

:::do
Usa el token semántico del rol correcto: `Surface/*` para fondos, `Text/*` para texto, `Stroke/*` para bordes, `Icons/*` para iconos. El emparejamiento correcto de intensidades ya está pensado para cumplir contraste.
:::

:::dont
No uses un primitivo (`Blue/medium`) directamente ni mezcles roles (por ejemplo un token de `Surface` como color de texto). Rompe la coherencia y el soporte multimarca.
:::

:::dont
No comuniques estado solo con color. Acompaña siempre con icono o texto (danger = color **+** icono de error).
:::
