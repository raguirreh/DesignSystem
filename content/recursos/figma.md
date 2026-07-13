# Librerías de Figma

El design system vive en dos librerías de Figma, la fuente visual de todo el sistema. Esta documentación y las librerías evolucionan juntas.

| Librería | Contiene |
| --- | --- |
| **B. Core Tokens Library** | Primitivos y tokens semánticos: color, tipografía, escala y medidas |
| **C. Global Components Library** | Componentes reutilizables (Button, Input, Radio, Toast…), que consumen los tokens |

## Conectar las librerías a esta documentación

1. Copia la URL de la librería en Figma (o de un frame con clic derecho → **Copy link to selection**).
2. Añade la URL principal en `content/manifest.json`, campo `site.figmaUrl` — aparecerá un enlace en el pie de página.

## Embeber diseños en cualquier página

Como zeroheight, esta documentación soporta embeds en vivo. En cualquier archivo de `content/`, añade una línea con la directiva `::figma` seguida de la URL:

```
::figma https://www.figma.com/design/XXXXXX/Global-Components?node-id=1-2
```

Esto renderiza el frame dentro de la página, siempre con la última versión publicada. Ideas de qué embeber:

- El frame de **paleta** en *Fundamentos → Color*.
- El **catálogo de un componente** (Button con todas sus variantes) en su página.
- El **set de iconos** en *Iconografía*.

:::info
El visitante necesita permiso de visualización sobre el archivo (o que el archivo sea público con enlace). Debajo de cada embed aparece un botón para abrirlo en Figma.
:::

## Buenas prácticas de las librerías

- **Tokens primero:** todo componente de la Global Components Library consume tokens de la Core Tokens Library; nunca valores sueltos.
- **Publica con notas de versión** y cópialas al [Changelog](#/recursos/changelog).
- **Mismo nombre** en Figma, documentación y código.
- **Usa variantes y propiedades** en lugar de componentes duplicados.
- **Deprecar antes de eliminar:** marca los componentes obsoletos como *deprecated* una versión antes de retirarlos.
