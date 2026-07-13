# Design System — Documentación

Sitio de documentación del design system, estilo [zeroheight](https://zeroheight.com): fundamentos, principios de diseño, componentes y recursos, con un buscador global como página principal (*¿Qué necesitas saber hoy?*).

Es un sitio 100% estático — sin build, sin dependencias que instalar — listo para publicarse en GitHub Pages.

## Estructura

```
├── index.html                  # Shell de la aplicación (una sola página)
├── assets/
│   ├── css/style.css           # Estilos (tema claro/oscuro)
│   └── js/app.js               # Router, renderizado Markdown y buscador
└── content/
    ├── manifest.json           # Navegación, metadatos y palabras clave de búsqueda
    ├── empezando/*.md
    ├── fundamentos/*.md
    ├── componentes/*.md
    └── recursos/*.md
```

## Editar contenido

1. Edita cualquier archivo `.md` de `content/` — es Markdown estándar.
2. Para **añadir una página**, crea el `.md` y regístrala en `content/manifest.json` con título, `slug`, descripción y `keywords` (los sinónimos alimentan el buscador).
3. Para **añadir una sección**, añade un bloque nuevo en `sections` del manifest y crea su carpeta en `content/`.

### Directivas especiales en Markdown

| Directiva | Resultado |
| --- | --- |
| `::figma <url>` | Embebe el frame/archivo de Figma en vivo dentro de la página |
| `:::do` … `:::` | Bloque verde "✅ Hacer" |
| `:::dont` … `:::` | Bloque rojo "🚫 Evitar" |
| `:::info` … `:::` | Bloque de nota informativa |
| `` `#5B5BD6` `` | Los códigos hex en código inline muestran una muestra de color automática |

## Conectar tu Figma

- Pon la URL de tu librería en `content/manifest.json` → `site.figmaUrl` (aparece en el pie de página).
- Embebe cualquier frame con `::figma <url>` (clic derecho en Figma → *Copy link to selection*). Guía completa en la página **Recursos → Librería de Figma** del propio sitio.

## Ver en local

```bash
npx serve .        # o: python3 -m http.server 8000
```

(El sitio carga el contenido con `fetch`, así que necesita servirse por HTTP; abrir `index.html` directamente desde el disco no funciona.)

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` despliega automáticamente en cada push a `main`. Solo hay que activarlo una vez:

1. En GitHub: **Settings → Pages → Source → GitHub Actions**.
2. Haz merge a `main`. El sitio quedará en `https://<usuario>.github.io/DesignSystem/`.
