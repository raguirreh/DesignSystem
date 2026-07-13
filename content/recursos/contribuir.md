# Cómo contribuir

El design system pertenece a todo el equipo. Cualquiera puede proponer mejoras, reportar inconsistencias o pedir nuevos componentes.

## Cuándo proponer algo nuevo

Antes de proponer un componente o patrón nuevo, comprueba:

1. **¿Ya existe?** Busca en esta documentación (⌘K) y en la librería de Figma.
2. **¿Se resuelve con variantes?** Quizá el componente existente necesita una propiedad más, no un componente nuevo.
3. **¿Se repite?** Un patrón entra al sistema cuando aparece en **2–3 contextos distintos**. Un caso único vive mejor como solución local.

## Proceso de propuesta

1. **Abre un issue** en este repositorio describiendo el problema (no la solución): qué necesitas resolver, en qué contexto y por qué lo existente no sirve.
2. **Explora la solución** en Figma en una rama o archivo de trabajo, siguiendo los [principios de diseño](#/fundamentos/principios).
3. **Revisión**: el equipo revisa la propuesta — consistencia, accesibilidad, casos límite.
4. **Publicación**: el componente se publica en la librería de Figma, se documenta aquí y se anota en el [Changelog](#/recursos/changelog).

## Cómo editar esta documentación

Toda la documentación vive en la carpeta `content/` de este repositorio como archivos Markdown:

1. Edita o crea el archivo `.md` correspondiente.
2. Si añades una página nueva, regístrala en `content/manifest.json` (título, slug, descripción y palabras clave para el buscador).
3. Abre un pull request. Al fusionarse, el sitio se actualiza automáticamente.

:::info
Las palabras clave (`keywords`) del manifest alimentan el buscador. Añade los sinónimos con los que el equipo buscaría esa página (por ejemplo, "input" para *Campos de texto*).
:::
