# Navegación

Componentes para orientar y mover al usuario por el producto. La **Global Components Library** incluye `Breadcrumb`, `Tabs` (Tab) y `Pagination`, además de Navbar y Sidebar.

## Breadcrumb

Muestra la ruta actual dentro de la jerarquía y permite volver atrás.

<div class="ds-preview">
<nav class="ds-breadcrumb">
<a href="#">Inicio</a><span class="sep">/</span>
<a href="#">Citas</a><span class="sep">/</span>
<span class="cur">Nueva cita</span>
</nav>
</div>

## Tabs

Alternan entre vistas relacionadas dentro de una misma pantalla.

<div class="ds-preview">
<div class="ds-tabs">
<span class="ds-tab is-on">Resumen</span>
<span class="ds-tab">Historial</span>
<span class="ds-tab">Documentos</span>
</div>
</div>

## Pagination

Divide colecciones largas en páginas navegables.

<div class="ds-preview">
<div class="ds-pagination">
<span class="ds-page" aria-label="Anterior"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg></span>
<span class="ds-page is-on">1</span>
<span class="ds-page">2</span>
<span class="ds-page">3</span>
<span class="ds-page">…</span>
<span class="ds-page">12</span>
<span class="ds-page" aria-label="Siguiente"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></span>
</div>
</div>

## Reglas de uso

:::do
Usa **Breadcrumb** en jerarquías profundas, **Tabs** para vistas hermanas de un mismo objeto y **Pagination** cuando el total de elementos es grande y conviene cargar por páginas.
:::

:::dont
No uses Tabs para pasos secuenciales (eso es un asistente/stepper) ni más de 5–6 pestañas visibles: si son muchas, replantea la estructura.
:::

## Accesibilidad

- Breadcrumb dentro de `<nav aria-label="Ruta">`; la página actual se marca con `aria-current="page"`.
- Las Tabs siguen el patrón ARIA de `tablist` / `tab` / `tabpanel` y son navegables con flechas.
- Los controles de Pagination tienen nombres accesibles ("Página siguiente", "Página 2").
