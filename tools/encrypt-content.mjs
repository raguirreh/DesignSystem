#!/usr/bin/env node
/**
 * Cifra todo el contenido del sitio (manifest + páginas Markdown) en un
 * único content.enc.json protegido por contraseña (AES-256-GCM, clave
 * derivada con PBKDF2). Se ejecuta en el despliegue: el sitio publicado
 * no contiene ningún contenido en claro.
 *
 * Uso:  SITE_PASSWORD=... node tools/encrypt-content.mjs <directorio-salida>
 */
import fs from "node:fs";
import path from "node:path";

const subtle = globalThis.crypto.subtle;
const outDir = process.argv[2];
const password = process.env.SITE_PASSWORD;

if (!outDir || !password) {
  console.error("Uso: SITE_PASSWORD=... node tools/encrypt-content.mjs <directorio-salida>");
  process.exit(1);
}

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/manifest.json"), "utf8"));

const pages = {};
for (const section of manifest.sections) {
  for (const page of section.pages) {
    const rel = section.slug + "/" + page.slug;
    pages[rel] = fs.readFileSync(path.join(root, "content", rel + ".md"), "utf8");
  }
}

const payload = new TextEncoder().encode(JSON.stringify({ manifest, pages }));
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const iterations = 600000;

const baseKey = await subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await subtle.deriveKey(
  { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
  baseKey,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"]
);
const data = await subtle.encrypt({ name: "AES-GCM", iv }, key, payload);

const b64 = (buf) => Buffer.from(buf).toString("base64");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "content.enc.json"),
  JSON.stringify({ v: 1, iterations, salt: b64(salt), iv: b64(iv), data: b64(data) })
);
console.log("Contenido cifrado →", path.join(outDir, "content.enc.json"), `(${Object.keys(pages).length} páginas)`);
