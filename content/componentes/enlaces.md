# Enlaces

Los `Links` navegan a otra ubicación o recurso. A diferencia de los botones (que ejecutan acciones), los enlaces **llevan a un sitio**.

## Previsualización

<div class="ds-preview ds-col">
<div class="ds-row">
<a href="#" class="ds-link">Enlace estándar</a>
<a href="#" class="ds-link ds-link--inline">Enlace subrayado</a>
<a href="#" class="ds-link ds-link--muted">Enlace secundario</a>
<a href="#" class="ds-link">Abrir en Figma <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg></a>
</div>
<p class="ds-caption" style="color:var(--n-high);font-size:14px">En un párrafo, el <a href="#" class="ds-link ds-link--inline">enlace en línea</a> se distingue por color y subrayado.</p>
</div>

## Enlace vs. botón

| Usa un **enlace** cuando… | Usa un **botón** cuando… |
| --- | --- |
| Navega a otra página o ancla | Ejecuta una acción (guardar, enviar) |
| Abre un recurso externo | Abre un modal o menú |
| Descarga un archivo | Cambia el estado de la app |

## Reglas de uso

:::do
Escribe textos de enlace descriptivos ("ver política de privacidad"), que tengan sentido fuera de contexto. Marca los externos con un icono y `rel="noopener"`.
:::

:::dont
Evita "haz clic aquí" o "aquí" como texto de enlace: no dice a dónde lleva y perjudica accesibilidad y SEO.
:::

## Accesibilidad

- El enlace es texto real dentro de `<a href>`, navegable por teclado, con foco visible.
- El color no es el único distintivo: en párrafos, subráyalo.
- Los enlaces externos anuncian que abren en una pestaña nueva.
