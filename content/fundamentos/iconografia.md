# Iconografía

Los iconos refuerzan el significado y aceleran el reconocimiento visual. Un set consistente en trazo, tamaño y estilo mantiene la interfaz ordenada.

## Estilo

- **Trazo**: 1.5–2px constante, esquinas redondeadas.
- **Estilo**: outline por defecto; la variante rellena (filled) se reserva para estados activos o seleccionados.
- **Construcción**: sobre retícula de 24×24px con área viva de 20×20px.

:::info
Si tu set de iconos vive en Figma, embebe aquí el frame del catálogo con la directiva `::figma <url del frame>` para que el equipo siempre vea la versión actual.
:::

## Tamaños

| Token | Tamaño | Uso |
| --- | --- | --- |
| `icon-sm` | 16px | Dentro de texto, inputs y chips |
| `icon-md` | 20px | Botones y elementos de navegación |
| `icon-lg` | 24px | Tamaño por defecto en la interfaz |
| `icon-xl` | 32px | Estados vacíos e ilustrativos |

## Reglas de uso

:::do
Acompaña los iconos de acción con etiqueta de texto siempre que el espacio lo permita. Un icono solo es aceptable únicamente cuando su significado es universal (cerrar, buscar, configuración).
:::

:::dont
No mezcles iconos de sets distintos ni escales iconos a tamaños intermedios: el trazo pierde consistencia óptica.
:::

## Accesibilidad

- Icono **decorativo** (acompaña a un texto): ocúltalo de lectores de pantalla (`aria-hidden="true"`).
- Icono **funcional** (es la única etiqueta de un control): necesita nombre accesible (`aria-label`).
- Los iconos funcionales cumplen contraste mínimo **3:1** con su fondo.
