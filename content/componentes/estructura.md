# Estructura

Los componentes de estructura organizan el marco de la aplicación: `Navbar`, `Sidebar`, `Header` y `Footer`. Dan orientación constante y albergan la navegación principal.

## Navbar

Barra superior con la marca y la navegación principal.

<div class="ds-preview">
<nav class="ds-navbar">
<span class="brand">◈ Blister</span>
<a href="#" class="is-active">Inicio</a>
<a href="#">Afiliados</a>
<a href="#">Citas</a>
<span class="spacer"></span>
<span class="ds-avatar ds-avatar--sm">AR</span>
</nav>
</div>

## Sidebar

Navegación vertical para secciones de una aplicación.

<div class="ds-preview">
<aside class="ds-sidebar">
<div class="ds-side-item is-active"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5V21H3z"/></svg> Inicio</div>
<div class="ds-side-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Afiliados</div>
<div class="ds-side-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> Citas</div>
</aside>
</div>

## Footer

Pie con enlaces secundarios e información legal.

<div class="ds-preview">
<footer class="ds-footer">
<span>© 2026 Pacífico Salud · Blister Design System</span>
<span>Privacidad · Términos · Contacto</span>
</footer>
</div>

## Reglas de uso

:::do
Mantén la navegación principal **consistente** en todo el producto (mismo orden, misma posición). Marca claramente la ubicación actual (`is-active` / `aria-current`).
:::

:::dont
No dupliques la misma navegación en Navbar y Sidebar a la vez, ni escondas navegación esencial detrás de menús cuando hay espacio.
:::

## Responsividad

- **Navbar** colapsa en un menú (hamburguesa) en pantallas pequeñas.
- **Sidebar** se oculta o se convierte en cajón deslizable en móvil.
- El **Header** de página reduce su altura al hacer scroll cuando aporta.

## Accesibilidad

- Cada región usa su landmark: `<nav>`, `<header>`, `<footer>`, con `aria-label` cuando hay varias.
- La ubicación actual se marca con `aria-current="page"`.
- Todo es navegable por teclado, con foco visible y orden lógico.
