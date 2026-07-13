/* ============================================================
   Design System Docs — app
   Router por hash + renderizado de Markdown + buscador global.
   El contenido vive en /content/*.md y la navegación en
   /content/manifest.json — no hace falta tocar este archivo
   para añadir o editar páginas.
   ============================================================ */

(function () {
  "use strict";

  const app = document.getElementById("app");
  let manifest = null;
  let searchIndex = []; // [{ route, section, title, description, text, keywords }]
  let indexReady = false;

  /* ---------- Tema ---------- */
  const savedTheme = localStorage.getItem("ds-theme");
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.dataset.theme = "dark";
  }
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("ds-theme", next);
  });

  /* ---------- Utilidades ---------- */
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Quita acentos y pasa a minúsculas para búsqueda tolerante.
  function normalize(str) {
    return str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* ---------- Preprocesado de Markdown ----------
     Directivas propias antes de pasar por marked:
       ::figma <url>            → iframe embebido de Figma
       :::do / :::dont / :::info … :::  → callouts
       `#RRGGBB` dentro del texto → muestra de color automática (post-render)
  ---------------------------------------------- */
  function preprocess(md) {
    // Embeds de Figma
    md = md.replace(/^::figma[ \t]+(\S+)[ \t]*$/gm, (_, url) => {
      const embedUrl = "https://www.figma.com/embed?embed_host=share&url=" + encodeURIComponent(url);
      return (
        '<div class="figma-embed"><iframe src="' + escapeHtml(embedUrl) + '" allowfullscreen loading="lazy"></iframe>' +
        '<div class="figma-embed-footer"><span>Vista en vivo desde Figma</span>' +
        '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">Abrir en Figma ↗</a></div></div>'
      );
    });

    // Callouts :::do / :::dont / :::info
    md = md.replace(/^:::(do|dont|info)(?:[ \t]+([^\n]*))?\n([\s\S]*?)^:::[ \t]*$/gm, (_, kind, title, body) => {
      const titles = { do: "✅ Hacer", dont: "🚫 Evitar", info: "💡 Nota" };
      const heading = title || titles[kind];
      const bodyHtml = marked.parse(body.trim());
      return (
        '<div class="callout callout-' + kind + '"><span class="callout-title">' +
        escapeHtml(heading) + "</span>" + bodyHtml + "</div>"
      );
    });

    return md;
  }

  function renderMarkdown(md) {
    let html = marked.parse(preprocess(md));
    // Muestras de color junto a códigos hex: <code>#5B5BD6</code>
    html = html.replace(/<code>(#(?:[0-9a-fA-F]{3}){1,2})<\/code>/g, (_, hex) => {
      return '<code><span class="color-dot" style="background:' + hex + '"></span>' + hex + "</code>";
    });
    return html;
  }

  // Texto plano de un markdown, para el índice de búsqueda.
  function markdownToText(md) {
    return md
      .replace(/^::figma\s+\S+$/gm, " ")
      .replace(/^:::\w*.*$/gm, " ")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#>*_`|:-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* ---------- Contenido cifrado (sitio privado) ----------
     Si existe content.enc.json (generado por tools/encrypt-content.mjs
     en el despliegue), todo el contenido está cifrado con AES-256-GCM.
     Se pide la contraseña al cargar y se descifra en el navegador.
  -------------------------------------------------------- */
  function fromB64(str) {
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  }

  async function decryptBundle(bundle, password) {
    const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: fromB64(bundle.salt), iterations: bundle.iterations, hash: "SHA-256" },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(bundle.iv) }, key, fromB64(bundle.data));
    return JSON.parse(new TextDecoder().decode(plain));
  }

  function applyBundle(payload) {
    manifest = payload.manifest;
    for (const rel in payload.pages) pageCache["content/" + rel + ".md"] = payload.pages[rel];
  }

  function askPassword(bundle) {
    return new Promise((resolve) => {
      app.innerHTML =
        '<section class="lock-screen"><div class="lock-card">' +
        '<span class="brand-mark lock-mark">◈</span>' +
        "<h1>Documentación privada</h1>" +
        "<p>Introduce la contraseña para acceder al design system.</p>" +
        '<form id="lock-form"><input type="password" id="lock-input" placeholder="Contraseña" autocomplete="current-password" autofocus />' +
        '<button type="submit">Entrar</button></form>' +
        '<p class="lock-error" id="lock-error" hidden>Contraseña incorrecta. Inténtalo de nuevo.</p>' +
        "</div></section>";
      const form = document.getElementById("lock-form");
      const input = document.getElementById("lock-input");
      const error = document.getElementById("lock-error");
      input.focus();
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = form.querySelector("button");
        btn.disabled = true;
        btn.textContent = "Comprobando…";
        try {
          const payload = await decryptBundle(bundle, input.value);
          sessionStorage.setItem("ds-pass", input.value);
          resolve(payload);
        } catch (err) {
          error.hidden = false;
          input.value = "";
          input.focus();
          btn.disabled = false;
          btn.textContent = "Entrar";
        }
      });
    });
  }

  async function loadEncrypted() {
    let bundle;
    if (window.__DS_ENC__) {
      // Build de un solo archivo cifrado (window.__DS_ENC__ incrustado).
      bundle = window.__DS_ENC__;
    } else {
      const res = await fetch("content.enc.json");
      if (!res.ok) return false;
      bundle = await res.json();
    }
    const saved = sessionStorage.getItem("ds-pass");
    if (saved) {
      try {
        applyBundle(await decryptBundle(bundle, saved));
        return true;
      } catch (e) {
        sessionStorage.removeItem("ds-pass");
      }
    }
    applyBundle(await askPassword(bundle));
    return true;
  }

  /* ---------- Carga de contenido ---------- */
  async function loadManifest() {
    // Build de un solo archivo (preview): el contenido va inline y no se
    // usa fetch. Ver tools/build-preview.mjs.
    if (window.__DS_INLINE__) {
      applyBundle(window.__DS_INLINE__);
      applySiteMeta();
      return;
    }
    if (window.__DS_ENC__) {
      await loadEncrypted();
      applySiteMeta();
      return;
    }
    const res = await fetch("content/manifest.json");
    if (!res.ok) {
      if (await loadEncrypted()) { applySiteMeta(); return; }
      throw new Error("No se pudo cargar el contenido");
    }
    manifest = await res.json();
    applySiteMeta();
  }

  function applySiteMeta() {
    document.title = manifest.site.title;
    document.querySelector(".brand-name").textContent = manifest.site.title;
    document.getElementById("footer-text").textContent = manifest.site.title + " · Documentación viva";
    if (manifest.site.figmaUrl) {
      const link = document.getElementById("footer-figma-link");
      link.href = manifest.site.figmaUrl;
      link.hidden = false;
    }
    const nav = document.getElementById("header-nav");
    nav.innerHTML = manifest.sections
      .map((s) => '<a href="#/' + s.slug + "/" + s.pages[0].slug + '" data-section="' + s.slug + '">' + escapeHtml(s.title) + "</a>")
      .join("");
  }

  const pageCache = {};
  async function fetchPage(section, page) {
    const path = "content/" + section + "/" + page + ".md";
    if (!pageCache[path]) {
      const res = await fetch(path);
      if (!res.ok) throw new Error("Página no encontrada: " + path);
      pageCache[path] = await res.text();
    }
    return pageCache[path];
  }

  // Construye el índice de búsqueda descargando todo el contenido en segundo plano.
  async function buildSearchIndex() {
    const jobs = [];
    for (const section of manifest.sections) {
      for (const page of section.pages) {
        jobs.push(
          fetchPage(section.slug, page.slug).then((md) => {
            searchIndex.push({
              route: "#/" + section.slug + "/" + page.slug,
              section: section.title,
              title: page.title,
              description: page.description || "",
              keywords: (page.keywords || []).join(" "),
              text: markdownToText(md),
            });
          }).catch(() => {})
        );
      }
    }
    await Promise.all(jobs);
    indexReady = true;
  }

  /* ---------- Búsqueda ---------- */
  function search(query) {
    const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return [];
    const results = [];
    for (const doc of searchIndex) {
      const nTitle = normalize(doc.title);
      const nDesc = normalize(doc.description);
      const nKeywords = normalize(doc.keywords);
      const nText = normalize(doc.text);
      let score = 0;
      let matchedAll = true;
      for (const term of terms) {
        let termScore = 0;
        if (nTitle.includes(term)) termScore += 30;
        if (nKeywords.includes(term)) termScore += 15;
        if (nDesc.includes(term)) termScore += 10;
        const occurrences = nText.split(term).length - 1;
        termScore += Math.min(occurrences, 5) * 2;
        if (termScore === 0) { matchedAll = false; break; }
        score += termScore;
      }
      if (matchedAll) results.push({ doc, score });
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 10).map((r) => r.doc);
  }

  function snippetFor(doc, query) {
    const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
    const nText = normalize(doc.text);
    let pos = -1;
    for (const term of terms) {
      pos = nText.indexOf(term);
      if (pos !== -1) break;
    }
    if (pos === -1) return doc.description;
    const start = Math.max(0, pos - 40);
    let snippet = doc.text.slice(start, start + 130);
    if (start > 0) snippet = "…" + snippet;
    return snippet;
  }

  function highlight(text, query) {
    let safe = escapeHtml(text);
    for (const term of normalize(query).split(/\s+/).filter((t) => t.length > 1)) {
      // Busca el término ignorando acentos sobre el texto escapado.
      const pattern = term.split("").map((ch) => {
        const escaped = ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return "aeiouncAEIOUNC".includes(ch) ? "[" + escaped + "\\u00c0-\\u00ff]" : escaped;
      }).join("");
      try {
        safe = safe.replace(new RegExp("(" + pattern + ")", "gi"), "<mark>$1</mark>");
      } catch (e) { /* patrón inválido: sin resaltado */ }
    }
    return safe;
  }

  /* ---------- UI del buscador ---------- */
  const overlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  let selectedIdx = -1;

  function openSearch(prefill) {
    overlay.hidden = false;
    searchInput.value = prefill || "";
    searchInput.focus();
    renderResults();
  }
  function closeSearch() {
    overlay.hidden = true;
    selectedIdx = -1;
  }

  function renderResults() {
    const query = searchInput.value.trim();
    selectedIdx = -1;
    if (!query) {
      searchResults.innerHTML = '<p class="search-hint">Escribe para buscar en toda la documentación: componentes, colores, principios, tokens…</p>';
      return;
    }
    if (!indexReady) {
      searchResults.innerHTML = '<p class="search-hint">Preparando el índice de búsqueda…</p>';
      setTimeout(renderResults, 300);
      return;
    }
    const docs = search(query);
    if (!docs.length) {
      searchResults.innerHTML = '<p class="search-empty">Sin resultados para «' + escapeHtml(query) + '». Prueba con otro término.</p>';
      return;
    }
    searchResults.innerHTML = docs
      .map((doc) =>
        '<a class="search-result" href="' + doc.route + '">' +
        '<span class="result-section">' + escapeHtml(doc.section) + "</span>" +
        '<div class="result-title">' + highlight(doc.title, query) + "</div>" +
        '<div class="result-snippet">' + highlight(snippetFor(doc, query), query) + "</div></a>"
      )
      .join("");
  }

  function moveSelection(delta) {
    const items = Array.from(searchResults.querySelectorAll(".search-result"));
    if (!items.length) return;
    selectedIdx = (selectedIdx + delta + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle("selected", i === selectedIdx));
    items[selectedIdx].scrollIntoView({ block: "nearest" });
  }

  searchInput.addEventListener("input", renderResults);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); moveSelection(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveSelection(-1); }
    else if (e.key === "Enter") {
      const items = searchResults.querySelectorAll(".search-result");
      const target = items[selectedIdx] || items[0];
      if (target) { location.hash = target.getAttribute("href"); closeSearch(); }
    }
  });
  searchResults.addEventListener("click", (e) => {
    if (e.target.closest(".search-result")) closeSearch();
  });
  overlay.querySelectorAll("[data-close-search]").forEach((el) => el.addEventListener("click", closeSearch));
  document.getElementById("search-trigger").addEventListener("click", () => openSearch());
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape" && !overlay.hidden) closeSearch();
  });

  /* ---------- Vistas ---------- */
  function renderHome() {
    const s = manifest.site;
    const chips = (s.quickSearches || [])
      .map((q) => '<button class="chip" type="button" data-query="' + escapeHtml(q) + '">' + escapeHtml(q) + "</button>")
      .join("");
    const cards = manifest.sections
      .map((section) =>
        '<a class="section-card" href="#/' + section.slug + "/" + section.pages[0].slug + '">' +
        '<span class="card-icon">' + (section.icon || "📄") + "</span>" +
        "<h3>" + escapeHtml(section.title) + "</h3>" +
        "<p>" + escapeHtml(section.description || "") + "</p>" +
        '<span class="card-count">' + section.pages.length + (section.pages.length === 1 ? " página" : " páginas") + " →</span></a>"
      )
      .join("");

    app.innerHTML =
      '<section class="hero">' +
      '<span class="hero-eyebrow">' + escapeHtml(s.tagline || "Design System") + "</span>" +
      "<h1>¿Qué necesitas saber hoy?</h1>" +
      '<p class="hero-sub">' + escapeHtml(s.description || "") + "</p>" +
      '<button class="hero-search" type="button" id="hero-search">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>' +
      "<span>Busca componentes, colores, principios…</span><kbd>⌘K</kbd></button>" +
      '<div class="hero-chips">' + chips + "</div></section>" +
      '<section class="home-sections"><h2>Explora la documentación</h2><div class="card-grid">' + cards + "</div></section>";

    document.getElementById("hero-search").addEventListener("click", () => openSearch());
    app.querySelectorAll(".chip").forEach((chip) =>
      chip.addEventListener("click", () => openSearch(chip.dataset.query))
    );
    setActiveNav(null);
  }

  function flatPages() {
    const flat = [];
    for (const section of manifest.sections) {
      for (const page of section.pages) flat.push({ section, page });
    }
    return flat;
  }

  async function renderDoc(sectionSlug, pageSlug) {
    const section = manifest.sections.find((s) => s.slug === sectionSlug);
    const page = section && section.pages.find((p) => p.slug === pageSlug);
    if (!page) return renderNotFound();

    let md;
    try {
      md = await fetchPage(sectionSlug, pageSlug);
    } catch (e) {
      return renderNotFound();
    }

    const sidebar = manifest.sections
      .map((s) =>
        '<div class="sidebar-group"><p class="group-title">' + escapeHtml(s.title) + "</p>" +
        s.pages
          .map((p) => {
            const route = "#/" + s.slug + "/" + p.slug;
            const active = s.slug === sectionSlug && p.slug === pageSlug ? " class=\"active\"" : "";
            return "<a" + active + ' href="' + route + '">' + escapeHtml(p.title) + "</a>";
          })
          .join("") +
        "</div>"
      )
      .join("");

    const flat = flatPages();
    const idx = flat.findIndex((f) => f.section.slug === sectionSlug && f.page.slug === pageSlug);
    const prev = flat[idx - 1];
    const next = flat[idx + 1];
    const pager =
      '<nav class="doc-pager">' +
      (prev
        ? '<a class="pager-prev" href="#/' + prev.section.slug + "/" + prev.page.slug + '"><span class="pager-label">← Anterior</span><span class="pager-title">' + escapeHtml(prev.page.title) + "</span></a>"
        : "<span></span>") +
      (next
        ? '<a class="pager-next" href="#/' + next.section.slug + "/" + next.page.slug + '"><span class="pager-label">Siguiente →</span><span class="pager-title">' + escapeHtml(next.page.title) + "</span></a>"
        : "") +
      "</nav>";

    app.innerHTML =
      '<div class="doc-layout"><aside class="sidebar">' + sidebar + "</aside>" +
      '<article class="doc-content"><p class="doc-breadcrumb">' + escapeHtml(section.title) + " / " + escapeHtml(page.title) + "</p>" +
      '<div class="doc-body">' + renderMarkdown(md) + "</div>" + pager + "</article></div>";

    setActiveNav(sectionSlug);
    window.scrollTo(0, 0);
  }

  function renderNotFound() {
    app.innerHTML =
      '<section class="hero"><h1>Página no encontrada</h1>' +
      '<p class="hero-sub">El contenido que buscas no existe o fue movido.</p>' +
      '<p><a href="#/">← Volver al inicio</a></p></section>';
  }

  function setActiveNav(sectionSlug) {
    document.querySelectorAll("#header-nav a").forEach((a) => {
      a.classList.toggle("active", a.dataset.section === sectionSlug);
    });
  }

  /* ---------- Router ---------- */
  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (!hash) return renderHome();
    const [sectionSlug, pageSlug] = hash.split("/");
    if (sectionSlug && pageSlug) return renderDoc(sectionSlug, pageSlug);
    // #/seccion → primera página de la sección
    const section = manifest.sections.find((s) => s.slug === sectionSlug);
    if (section) { location.hash = "#/" + section.slug + "/" + section.pages[0].slug; return; }
    renderNotFound();
  }

  window.addEventListener("hashchange", route);

  loadManifest()
    .then(() => {
      route();
      buildSearchIndex();
    })
    .catch((err) => {
      app.innerHTML = '<div class="loading">Error al cargar la documentación: ' + escapeHtml(err.message) + "</div>";
    });
})();
