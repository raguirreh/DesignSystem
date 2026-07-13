#!/usr/bin/env node
/**
 * Genera un preview de un solo archivo HTML autocontenido (CSS, JS,
 * marked y todo el contenido inline, sin fetch ni contraseña) para
 * revisar el sitio como Artifact. No se usa en producción.
 *
 * Uso: node tools/build-preview.mjs <archivo-salida.html>
 */
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2] || "preview.html";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const manifest = JSON.parse(read("content/manifest.json"));
const pages = {};
for (const section of manifest.sections) {
  for (const page of section.pages) {
    const rel = section.slug + "/" + page.slug;
    pages[rel] = read("content/" + rel + ".md");
  }
}

const css = read("assets/css/style.css");
const marked = read("assets/js/vendor/marked.min.js");
const app = read("assets/js/app.js");

// Cuerpo del index.html sin doctype/head y sin las etiquetas <script>/<link>.
let body = read("index.html")
  .replace(/[\s\S]*?<body>/, "")
  .replace(/<\/body>[\s\S]*/, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .trim();

const bundle = JSON.stringify({ manifest, pages }).replace(/</g, "\\u003c");

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${manifest.site.title} — Preview</title>
<style>${css}</style>
</head>
<body>
${body}
<script>${marked}</script>
<script>window.__DS_INLINE__ = ${bundle};</script>
<script>${app}</script>
</body>
</html>`;

fs.writeFileSync(out, html);
console.log("Preview generado →", out, `(${(html.length / 1024).toFixed(0)} KB)`);
