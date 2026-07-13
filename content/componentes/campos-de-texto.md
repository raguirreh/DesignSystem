# Campos de texto

Los campos de texto permiten introducir y editar información. Son la base de todos los formularios. La **Global Components Library** incluye `Input / Text Field` y `Input / Select`, ambos con la misma matriz de estados y tamaños.

:::info
Embebe el componente real con `::figma <url del frame de Input>` para ver todas las combinaciones de estado en vivo.
:::

## Estados

Los nombres corresponden a las variantes de la librería:

| Estado | Tratamiento |
| --- | --- |
| **Default** | Borde `Stroke/neutral/low` |
| **Hover** | Borde `Stroke/neutral/medium` |
| **Focus** | Borde `Stroke/brand/primary/medium` + anillo de foco 2px |
| **Disabled** | Fondo atenuado, texto `Text/neutral/medium`, sin interacción |
| **Error** | Borde `Stroke/status/danger/medium` + mensaje con icono |

> La librería también parametriza tamaño (**SM**…), presencia de icono, texto de ayuda y estado obligatorio como propiedades del componente.

## Anatomía

1. **Etiqueta:** siempre visible, encima del campo. `Sizes/s` (14), peso 500.
2. **Contenedor:** radio `border radio/small` (8px), borde `border width/small` (1px), padding `Spacing/small` (12px).
3. **Texto de ayuda** (opcional): debajo, `Sizes/xs` (12), color `Text/neutral/medium`.
4. **Mensaje de error:** sustituye a la ayuda, color `Text/status/danger/medium`, con icono.
5. **Icono / prefijo** (opcional): dentro del contenedor.

## Select

Mismo contenedor y estados que el Text Field, pero abre una lista de opciones. Úsalo para elegir **una** opción de un conjunto conocido y acotado; para muchas opciones o búsqueda libre, usa el patrón de búsqueda.

## Validación

- Valida **al salir del campo** (blur), no con cada tecla.
- El error dice **cómo corregirlo**: *"El correo debe incluir @"*, no *"Correo inválido"*.
- Al corregir, el mensaje desaparece de inmediato.

## Reglas de uso

:::do
Usa siempre etiqueta visible. El placeholder es un ejemplo del formato esperado, nunca la etiqueta.
:::

:::dont
No uses el placeholder como única etiqueta, ni marques a la vez campos obligatorios y opcionales: marca solo los opcionales con "(opcional)".
:::

## Accesibilidad

- Cada campo tiene su `label` asociado programáticamente.
- Los errores se anuncian a lectores de pantalla (`aria-describedby` + `aria-invalid`).
- Operable por teclado, con anillo de foco visible.
