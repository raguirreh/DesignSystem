# Tablas

La `Tabla` (Table / Cell) presenta datos estructurados en filas y columnas para escanear, comparar y actuar. Es la base de listados, reportes y paneles.

## Previsualización

<div class="ds-preview">
<div class="ds-table-wrap">
<table class="ds-table">
<thead><tr><th>Afiliado</th><th>Plan</th><th>Estado</th><th>Vence</th></tr></thead>
<tbody>
<tr><td>Ana Ramírez</td><td>Salud Total</td><td><span class="ds-tag ds-tag--success">Activo</span></td><td>12/2026</td></tr>
<tr><td>Luis Torres</td><td>Salud Preferente</td><td><span class="ds-tag ds-tag--warning">Por vencer</span></td><td>07/2026</td></tr>
<tr><td>María Gómez</td><td>Salud Total</td><td><span class="ds-tag ds-tag--danger">Vencido</span></td><td>06/2026</td></tr>
</tbody>
</table>
</div>
</div>

## Anatomía

1. **Encabezado (th)**: nombres de columna, `Sizes/xs` en mayúsculas, sobre `Surface/neutral/xlow`.
2. **Celdas (td)**: contenido alineado según su tipo (texto a la izquierda, números a la derecha).
3. **Fila**: separada por `Stroke/neutral/low`; hover sutil para seguir la lectura.
4. **Estados en celda**: usa `Tag` para estado y `Icon Button`/menú para acciones por fila.

## Buenas prácticas

- Alinea los **números a la derecha** y usa cifras tabulares para que las columnas cuadren.
- Mantén una sola acción primaria por fila; agrupa el resto en un menú (⋯).
- Para muchos datos, combina con **Pagination** o carga progresiva, y permite **ordenar** por columna.

## Reglas de uso

:::do
Muestra primero las columnas que el usuario necesita para decidir. Comunica el estado con `Tag` (color **+** texto), no solo color.
:::

:::dont
No metas tablas muy anchas sin scroll horizontal contenido, ni uses tablas para maquetar (eso es layout, no datos).
:::

## Accesibilidad

- Usa `<table>` semántica con `<th scope="col">` (y `scope="row"` si aplica).
- El orden de lectura sigue el visual; las acciones por fila tienen nombre accesible.
- La tabla ancha hace scroll dentro de su contenedor, no rompe la página.
