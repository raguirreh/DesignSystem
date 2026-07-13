# Campos de texto

Los campos de texto permiten al usuario introducir y editar información. Son la base de todos los formularios del producto.

:::info
Embebe aquí el componente real desde Figma con `::figma <url del frame>` para mostrar todas las variantes en vivo.
:::

## Anatomía

1. **Etiqueta**: siempre visible, encima del campo. Estilo `body-small`, peso 500.
2. **Contenedor**: altura 40px, borde `color-border`, radio `radius-sm`, padding `space-3`.
3. **Texto de ayuda** (opcional): debajo del campo, estilo `caption`, color `color-text-muted`.
4. **Mensaje de error**: sustituye al texto de ayuda, color `color-danger`, con icono.
5. **Icono o prefijo** (opcional): dentro del contenedor, alineado a la izquierda.

## Estados

| Estado | Tratamiento |
| --- | --- |
| Default | Borde `color-border` |
| Focus | Borde `color-primary` + anillo de foco de 2px |
| Error | Borde `color-danger` + mensaje con icono |
| Deshabilitado | Fondo `color-background`, texto atenuado |
| Solo lectura | Sin borde interactivo, texto seleccionable |

## Validación

- Valida **al salir del campo** (blur), no con cada tecla: evita gritar errores mientras la persona aún escribe.
- El mensaje de error dice **cómo corregirlo**, no solo que está mal: *"El correo debe incluir @"* en lugar de *"Correo inválido"*.
- Al corregir el error, el mensaje desaparece inmediatamente.

## Reglas de uso

:::do
Usa siempre etiqueta visible. La etiqueta nunca se sustituye por el placeholder: el placeholder desaparece al escribir y la persona pierde la referencia.
:::

:::dont
No uses placeholder como única etiqueta, ni marques campos opcionales y obligatorios a la vez: marca solo los opcionales con "(opcional)".
:::

## Accesibilidad

- Cada campo tiene su `label` asociado programáticamente.
- Los mensajes de error se anuncian a lectores de pantalla (`aria-describedby` + `aria-invalid`).
- El campo es operable por teclado y su anillo de foco es visible.
