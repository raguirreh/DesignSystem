# Librería de Figma

La librería de Figma es la fuente visual del design system. Esta documentación y la librería evolucionan juntas: cada cambio publicado en Figma debería reflejarse aquí.

## Conectar tu librería a esta documentación

1. Abre el archivo de tu design system en Figma.
2. Copia la URL del archivo (o de un frame concreto con clic derecho → **Copy link to selection**).
3. Añade la URL principal en `content/manifest.json`, campo `site.figmaUrl` — aparecerá un enlace directo en el pie de página del sitio.

## Embeber diseños en cualquier página

Esta documentación soporta embeds en vivo de Figma, como zeroheight. En cualquier archivo Markdown de `content/`, añade una línea con la directiva `::figma` seguida de la URL:

```
::figma https://www.figma.com/design/XXXXXX/Mi-Design-System?node-id=1-2
```

Esto renderiza el frame dentro de la página, siempre actualizado con la última versión publicada:

- Funciona con URLs de archivos, frames y prototipos.
- El visitante necesita permiso de visualización sobre el archivo (o el archivo debe ser público con enlace).
- Debajo del embed aparece un enlace para abrirlo directamente en Figma.

:::info
**Consejo**: crea en Figma frames "de documentación" (paleta, escala tipográfica, catálogo de un componente con todas sus variantes) y embébelos en la página correspondiente. Así la documentación visual nunca queda desactualizada.
:::

## Buenas prácticas de la librería

- **Publica con notas de versión**: cada publicación de la librería describe qué cambió; copia esas notas al [Changelog](#/recursos/changelog).
- **Nombra componentes con el mismo nombre** que usa esta documentación y el código.
- **Usa variantes y propiedades** en lugar de componentes duplicados.
- **Archiva con intención**: los componentes obsoletos se marcan como *deprecated* antes de eliminarse.
