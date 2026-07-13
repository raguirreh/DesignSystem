# Retroalimentación

Comunicar al usuario el resultado de sus acciones y el estado del sistema. La **Global Components Library** incluye `Toast` y `Section Message`, cada uno para un momento distinto.

## Toast vs. Section Message

| Componente | Cuándo | Duración |
| --- | --- | --- |
| **Toast** | Confirmar el resultado de una acción puntual | Temporal, se autodescarta |
| **Section Message** | Contexto o aviso persistente dentro de una sección | Permanece hasta resolverse |

## Toast

Notificación breve que aparece tras una acción (guardado, envío, error) y desaparece sola a los pocos segundos.

- **Posición:** consistente en todo el producto (habitualmente abajo o arriba a la derecha).
- **Contenido:** un mensaje corto y, opcionalmente, una acción ("Deshacer").
- **Tipos:** neutro, `success`, `warning`, `danger`, `informative` — con el icono y color del token de estado correspondiente.

:::do
Usa Toast para confirmar acciones ("Cita agendada"). Incluye "Deshacer" cuando la acción sea reversible y con consecuencias.
:::

:::dont
No metas información crítica solo en un Toast: desaparece. Si el usuario debe actuar o leerlo con calma, usa un Section Message o un diálogo.
:::

## Section Message

Bloque persistente que da contexto, advierte o informa dentro de una página o sección. Usa los tokens de estado para el color:

| Tipo | Superficie | Borde / icono |
| --- | --- | --- |
| Informative | `Surface/status/informative/xlow` | `#237CF3` |
| Success | `Surface/status/success/xlow` | `#1FA78D` |
| Warning | `Surface/status/warning/xlow` | `#DF670C` |
| Danger | `Surface/status/danger/xlow` | `#DC3B31` |

Anatomía: icono de estado + título opcional + mensaje + acción opcional, sobre superficie del estado con borde a juego.

## Redacción

:::do
Di qué pasó y, si hace falta, qué hacer: *"No pudimos guardar los cambios. Revisa tu conexión e inténtalo de nuevo."*
:::

:::dont
Evita mensajes vagos ("Algo salió mal") o disculpas sin información. El usuario necesita saber el estado y la salida.
:::

## Accesibilidad

- Los mensajes que aparecen dinámicamente se anuncian con `role="status"` (o `role="alert"` si son críticos).
- El color nunca es el único indicador: acompaña siempre con icono y texto.
