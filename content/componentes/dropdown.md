# Dropdown y menús

El `Dropdown` despliega una lista de opciones o acciones sobre un disparador. Se usa para menús de acciones, selección de opciones y menús contextuales.

## Previsualización

<div class="ds-preview ds-col">
<div class="ds-dropdown">
<div class="ds-dd-trigger">Acciones <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
<div class="ds-dd-menu">
<div class="ds-dd-item is-active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> Editar</div>
<div class="ds-dd-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4M12 2v14"/></svg> Compartir</div>
<div class="ds-dd-sep"></div>
<div class="ds-dd-item" style="color:var(--danger)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg> Eliminar</div>
</div>
</div>
</div>

## Anatomía

1. **Disparador**: botón o campo que abre el menú (`Icon Button`, `Button` o un `Input Select`).
2. **Panel**: contenedor flotante con sombra, radio `border radio/small`, sobre `Surface/neutral/xlow`.
3. **Ítems**: opción con icono opcional; estado hover con `Surface/brand/primary/xlow`.
4. **Separadores**: agrupan acciones relacionadas (p. ej. destructivas al final).

## Reglas de uso

:::do
Ordena los ítems por frecuencia de uso y agrupa las acciones destructivas al final, separadas por una línea.
:::

:::dont
No metas más de ~7 opciones sin agrupar ni uses el dropdown para navegación principal (para eso está Navbar/Tabs).
:::

## Accesibilidad

- El disparador expone `aria-haspopup` y `aria-expanded`.
- El menú es navegable con flechas; `Esc` lo cierra y devuelve el foco al disparador.
- Cada ítem es alcanzable por teclado.
