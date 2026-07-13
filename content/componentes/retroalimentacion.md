# Retroalimentación

Comunicar al usuario el resultado de sus acciones y el estado del sistema. La **Global Components Library** incluye `Toast` y `Section Message`, cada uno para un momento distinto.

## Previsualización

<div class="ds-preview ds-col">
<p class="ds-caption">Toast</p>
<div class="ds-toast ds-toast--success"><span class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg></span> Cita agendada correctamente <span class="act">Deshacer</span></div>
<div class="ds-toast ds-toast--danger"><span class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h.01"/></svg></span> No pudimos guardar los cambios</div>
</div>

<div class="ds-preview ds-col">
<p class="ds-caption">Section Message</p>
<div class="ds-msg ds-msg--info"><span class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg></span><div><strong>Información</strong>Tu sesión se cerrará automáticamente tras 15 minutos de inactividad.</div></div>
<div class="ds-msg ds-msg--success"><span class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg></span><div><strong>Todo en orden</strong>Tus datos se guardaron correctamente.</div></div>
<div class="ds-msg ds-msg--warning"><span class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v5M12 17h.01"/></svg></span><div><strong>Atención</strong>Tu plan vence en 3 días. Renuévalo para no perder cobertura.</div></div>
<div class="ds-msg ds-msg--danger"><span class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h.01"/></svg></span><div><strong>Error</strong>No se pudo procesar el pago. Revisa los datos de tu tarjeta.</div></div>
</div>

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
