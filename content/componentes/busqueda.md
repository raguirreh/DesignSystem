# Búsqueda

El componente `Search` permite al usuario encontrar contenido escribiendo términos. Es un campo especializado con icono de lupa y comportamiento de filtrado.

## Previsualización

<div class="ds-preview ds-col">
<div class="ds-search">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
<input placeholder="Buscar afiliados, citas, documentos…" />
</div>
<div class="ds-search" style="color:var(--n-xhigh)">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
<input value="cardiología" />
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-medium)" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
</div>
</div>

## Anatomía

1. **Contenedor**: campo con radio `border radio/circular` (píldora) o `small`, borde `Stroke/neutral/low`.
2. **Icono de lupa**: a la izquierda, `Icons/neutral/medium`.
3. **Texto/placeholder**: describe qué se puede buscar.
4. **Botón limpiar** (opcional): aparece al escribir para vaciar el campo.

## Comportamiento

- Filtra **al escribir** (con un pequeño *debounce*) o al pulsar Enter, según el contexto.
- Muestra resultados o un estado "sin resultados" claro.
- Recuerda búsquedas recientes cuando aporta valor.

## Reglas de uso

:::do
Escribe un placeholder que diga **qué** se puede buscar ("Buscar afiliados, citas…"), no solo "Buscar".
:::

:::dont
No uses la búsqueda como único medio para acceder a contenido clave: acompáñala de navegación y filtros.
:::
