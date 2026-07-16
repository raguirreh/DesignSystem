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
  let overrides = {}; // textos sobrescritos por el admin (Supabase)

  /* ---------- Tema ----------
     Interfaz siempre en modo claro; el dark mode se retiró del sitio. */

  /* ---------- Utilidades ---------- */
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // Quita acentos y pasa a minúsculas para búsqueda tolerante.
  function normalize(str) {
    return str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* ---------- Set de iconos (Blister) ----------
     Fuente única de iconografía del sistema (estilo Material Symbols:
     outline, trazo 2px, currentColor). Se consume desde un solo lugar:
     dsIcon(name). Lo usan las tarjetas del home, la directiva ::icons
     de la página de Iconografía y cualquier uso futuro.
  ---------------------------------------------- */
  var DS_ICON_PATHS = {
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    palette: '<circle cx="12" cy="12" r="9.5"/><circle cx="8.5" cy="10" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="15.5" cy="10" r="1"/><path d="M12 21.5a2 2 0 0 1 0-4h1.2a2.3 2.3 0 0 0 2.3-2.3c0-1.2 1-2.2 2.2-2.2H19"/>',
    puzzle: '<path d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.2 2.2 0 1 1 0 4.4H2V19a2 2 0 0 0 2 2h3.8v-1.5a2.2 2.2 0 1 1 4.4 0V21H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5Z"/>',
    package: '<path d="M21 8v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"/><path d="M2 4h20l-1.5 4H3.5L2 4z"/><path d="M10 12h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    home: '<path d="M3 9.5 12 3l9 6.5V21H3z"/><path d="M9 21v-6h6v6"/>',
    person: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>',
    settings: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.4"/><circle cx="8" cy="17" r="2.4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
  };
  function dsIcon(name, size) {
    var p = DS_ICON_PATHS[name];
    if (!p) return escapeHtml(name || ""); // respaldo si no está en el set
    var s = size || 24;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
  }
  function iconGallery() {
    return '<div class="icon-gallery">' +
      Object.keys(DS_ICON_PATHS).map(function (n) {
        return '<figure class="icon-tile">' + dsIcon(n, 24) + '<figcaption>' + n + "</figcaption></figure>";
      }).join("") + "</div>";
  }

  /* ---------- Preprocesado de Markdown ----------
     Directivas propias antes de pasar por marked:
       ::figma <url>            → iframe embebido de Figma
       :::do / :::dont / :::info … :::  → callouts
       `#RRGGBB` dentro del texto → muestra de color automática (post-render)
  ---------------------------------------------- */
  function preprocess(md) {
    // Galería del set de iconos (consume el registro dsIcon)
    md = md.replace(/^::icons[ \t]*$/gm, () => iconGallery());

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

  /* ---------- Sobrescrituras de contenido (editor de admin) ---------- */
  async function loadOverrides() {
    overrides = {};
    const sbc = window.__dsSupabase;
    if (!sbc) return;
    try {
      const res = await sbc.from("content_overrides").select("key, content");
      if (res.data) res.data.forEach((r) => { overrides[r.key] = r.content; });
    } catch (e) { /* sin overrides: se usa el contenido base */ }
  }

  async function saveOverride(key, content) {
    const sbc = window.__dsSupabase;
    if (!sbc) throw new Error("Sin conexión");
    const res = await sbc.from("content_overrides").upsert({
      key: key, content: content, updated_by: window.__dsUserEmail || null, updated_at: new Date().toISOString(),
    });
    if (res.error) throw res.error;
    overrides[key] = content;
  }

  async function resetOverride(key) {
    const sbc = window.__dsSupabase;
    if (!sbc) throw new Error("Sin conexión");
    const res = await sbc.from("content_overrides").delete().eq("key", key);
    if (res.error) throw res.error;
    delete overrides[key];
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
  document.getElementById("themekit-trigger").addEventListener("click", () => openThemeKit());
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape" && !overlay.hidden) closeSearch();
  });

  /* ---------- Vistas ---------- */
  function homeText(key, fallback) {
    return overrides["home:" + key] != null ? overrides["home:" + key] : fallback;
  }

  function renderHome() {
    const s = manifest.site;
    const eyebrow = homeText("eyebrow", s.tagline || "Design System");
    const title = homeText("title", "¿Qué necesitas saber hoy?");
    const subtitle = homeText("subtitle", s.description || "");
    // Atajos del hero: navegan a la página interna correspondiente.
    const sectionRoute = (secSlug) => {
      const sec = manifest.sections.find((s) => s.slug === secSlug);
      return sec && sec.pages.length ? "#/" + sec.slug + "/" + sec.pages[0].slug : null;
    };
    const pageRoute = (secSlug, pageSlug) => {
      const sec = manifest.sections.find((s) => s.slug === secSlug);
      const pg = sec && sec.pages.find((p) => p.slug === pageSlug);
      return pg ? "#/" + secSlug + "/" + pageSlug : null;
    };
    const chips = [
      { label: "Componentes", href: sectionRoute("componentes") },
      { label: "Tokens", href: pageRoute("fundamentos", "arquitectura-tokens") },
      { label: "Tipografía", href: pageRoute("fundamentos", "tipografia") },
    ]
      .filter((c) => c.href)
      .map((c) => '<a class="chip" href="' + c.href + '">' + escapeHtml(c.label) + "</a>")
      .join("");
    const cards = manifest.sections
      .map((section) =>
        '<a class="section-card reveal" href="#/' + section.slug + "/" + section.pages[0].slug + '">' +
        '<span class="card-icon">' + dsIcon(section.icon, 24) + "</span>" +
        "<h3>" + escapeHtml(section.title) + "</h3>" +
        "<p>" + escapeHtml(section.description || "") + "</p>" +
        '<span class="card-count">' + section.pages.length + (section.pages.length === 1 ? " página" : " páginas") + " →</span></a>"
      )
      .join("");

    app.innerHTML =
      '<section class="hero">' +
      (window.__dsIsAdmin ? '<button class="edit-btn edit-btn--hero" id="edit-home" type="button">✏️ Editar textos</button>' : "") +
      "<h1>" + escapeHtml(title) + "</h1>" +
      '<p class="hero-sub">' + escapeHtml(subtitle) + "</p>" +
      '<button class="hero-search" type="button" id="hero-search">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>' +
      '<span class="hero-search-ph">Busca componentes, colores, principios…</span>' +
      '<span class="hero-search-btn">Buscar</span></button>' +
      '<div class="hero-chips">' + chips + "</div></section>" +
      '<section class="home-sections"><h2>Explora la documentación</h2><div class="card-grid">' + cards + "</div></section>";

    document.getElementById("hero-search").addEventListener("click", () => openSearch());
    if (window.__dsIsAdmin) {
      document.getElementById("edit-home").addEventListener("click", openHomeEditor);
    }
    setupReveal();
    setActiveNav(null);
  }

  /* Revela elementos .reveal al entrar en el viewport (respeta reduced-motion) */
  function setupReveal() {
    const els = app.querySelectorAll(".reveal");
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const el = e.target;
          const idx = Array.prototype.indexOf.call(els, el);
          el.style.animationDelay = Math.min(idx, 8) * 0.07 + "s";
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  function openHomeEditor() {
    const s = manifest.site;
    const fields = [
      { k: "eyebrow", label: "Etiqueta superior", val: homeText("eyebrow", s.tagline || "") },
      { k: "title", label: "Título principal", val: homeText("title", "¿Qué necesitas saber hoy?") },
      { k: "subtitle", label: "Subtítulo", val: homeText("subtitle", s.description || "") },
    ];
    openEditor({
      title: "Editar textos de la portada",
      body:
        '<div class="editor-fields">' +
        fields.map((f) =>
          '<label class="editor-label">' + escapeHtml(f.label) +
          (f.k === "subtitle"
            ? '<textarea class="editor-input" data-key="home:' + f.k + '" rows="3">' + escapeHtml(f.val) + "</textarea>"
            : '<input class="editor-input" data-key="home:' + f.k + '" value="' + escapeHtml(f.val) + '" />') +
          "</label>"
        ).join("") + "</div>",
      onSave: async (root) => {
        const inputs = root.querySelectorAll(".editor-input");
        for (const el of inputs) await saveOverride(el.dataset.key, el.value);
      },
      onReset: async () => {
        for (const f of fields) await resetOverride("home:" + f.k);
      },
      after: renderHome,
    });
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

    const overrideKey = sectionSlug + "/" + pageSlug;
    let md;
    if (overrides[overrideKey] != null) {
      md = overrides[overrideKey];
    } else {
      try {
        md = await fetchPage(sectionSlug, pageSlug);
      } catch (e) {
        return renderNotFound();
      }
    }
    const isOverridden = overrides[overrideKey] != null;

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

    const editBar = window.__dsIsAdmin
      ? '<div class="edit-bar"><button class="edit-btn" id="edit-doc" type="button">✏️ Editar esta página</button>' +
        (isOverridden ? '<span class="edit-flag">Texto personalizado</span>' : "") + "</div>"
      : "";

    app.innerHTML =
      '<div class="doc-layout"><aside class="sidebar" id="doc-sidebar">' +
        '<button class="sidebar-toggle" id="sidebar-toggle" type="button" aria-expanded="false" aria-controls="sidebar-scroll">' +
          dsIcon("menu", 18) + "<span>En esta sección</span>" +
          '<span class="sidebar-toggle-chev">' + dsIcon("chevron", 16) + "</span>" +
        "</button>" +
        '<div class="sidebar-scroll" id="sidebar-scroll">' + sidebar + "</div>" +
      "</aside>" +
      '<article class="doc-content"><p class="doc-breadcrumb">' + escapeHtml(section.title) + " / " + escapeHtml(page.title) + "</p>" +
      editBar +
      '<div class="doc-body">' + renderMarkdown(md) + "</div>" + pager + "</article></div>";

    var sbToggle = document.getElementById("sidebar-toggle");
    if (sbToggle) {
      sbToggle.addEventListener("click", function () {
        var sb = document.getElementById("doc-sidebar");
        var open = sb.classList.toggle("open");
        sbToggle.setAttribute("aria-expanded", String(open));
      });
    }

    if (window.__dsIsAdmin) {
      document.getElementById("edit-doc").addEventListener("click", function () {
        openDocEditor(section, page, overrideKey, md);
      });
    }
    setActiveNav(sectionSlug);
    window.scrollTo(0, 0);
  }

  function openDocEditor(section, page, key, md) {
    openEditor({
      title: "Editar: " + section.title + " / " + page.title,
      wide: true,
      body:
        '<p class="editor-hint">Puedes usar Markdown. La vista previa se actualiza al escribir.</p>' +
        '<div class="editor-split">' +
        '<textarea class="editor-md" id="editor-md" spellcheck="false">' + escapeHtml(md) + "</textarea>" +
        '<div class="editor-preview doc-body" id="editor-preview"></div>' +
        "</div>",
      onMount: (root) => {
        const ta = root.querySelector("#editor-md");
        const pv = root.querySelector("#editor-preview");
        const upd = () => { pv.innerHTML = renderMarkdown(ta.value); };
        ta.addEventListener("input", upd);
        upd();
      },
      onSave: async (root) => {
        await saveOverride(key, root.querySelector("#editor-md").value);
      },
      onReset: async () => { await resetOverride(key); },
      after: () => renderDoc(section.slug, page.slug),
    });
  }

  /* ---------- Editor genérico (modal) ---------- */
  function openEditor(opts) {
    const modal = document.createElement("div");
    modal.className = "editor-overlay";
    modal.innerHTML =
      '<div class="editor-backdrop" data-close></div>' +
      '<div class="editor-panel' + (opts.wide ? " editor-panel--wide" : "") + '" role="dialog" aria-modal="true">' +
      '<div class="editor-head"><h2>' + escapeHtml(opts.title) + '</h2><button class="editor-x" data-close aria-label="Cerrar">✕</button></div>' +
      '<div class="editor-content">' + opts.body + "</div>" +
      '<p class="editor-msg" id="editor-msg" hidden></p>' +
      '<div class="editor-actions">' +
      '<button class="editor-reset" id="editor-reset" type="button">Restablecer al original</button>' +
      '<span style="flex:1"></span>' +
      '<button class="editor-cancel" data-close type="button">Cancelar</button>' +
      '<button class="editor-save" id="editor-save" type="button">Guardar cambios</button>' +
      "</div></div>";
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", close));
    if (opts.onMount) opts.onMount(modal);

    const msg = modal.querySelector("#editor-msg");
    function showMsg(t, kind) { msg.hidden = false; msg.textContent = t; msg.className = "editor-msg " + (kind || ""); }

    modal.querySelector("#editor-save").addEventListener("click", async function () {
      const btn = this; btn.disabled = true; btn.textContent = "Guardando…";
      try {
        await opts.onSave(modal);
        close();
        if (opts.after) opts.after();
      } catch (e) {
        showMsg("No se pudo guardar: " + (e.message || e), "err");
        btn.disabled = false; btn.textContent = "Guardar cambios";
      }
    });
    modal.querySelector("#editor-reset").addEventListener("click", async function () {
      if (!confirm("¿Restablecer al texto original? Se perderá la personalización.")) return;
      const btn = this; btn.disabled = true;
      try {
        await opts.onReset(modal);
        close();
        if (opts.after) opts.after();
      } catch (e) { showMsg("No se pudo restablecer: " + (e.message || e), "err"); btn.disabled = false; }
    });
  }

  function renderNotFound() {
    document.body.classList.remove("view-home");
    app.innerHTML =
      '<section class="hero"><h1>Página no encontrada</h1>' +
      '<p class="hero-sub">El contenido que buscas no existe o fue movido.</p>' +
      '<p><a href="#/">← Volver al inicio</a></p></section>';
  }

  function setActiveNav(sectionSlug) {
    document.querySelectorAll("#header-nav a").forEach((a) => {
      a.classList.toggle("active", a.dataset.section === sectionSlug);
    });
    // En el landing (sin sección) se oculta el buscador del navbar; el hero
    // ya trae su propio buscador. En las internas se mantiene.
    document.body.classList.toggle("view-home", sectionSlug == null);
  }

  /* ============================================================
     Kit de tema descargable (piloto Sanna · Tsana · Pacífico)
     Genera un .zip con los tokens resueltos para la marca elegida
     + todos los fundamentos, reglas y componentes documentados,
     más un brief para que un agente (Claude) construya el piloto
     manteniendo la consistencia del sistema. Todo se deriva de los
     tokens y contenidos reales del propio design system.
     ============================================================ */

  // Marcas disponibles (las claves coinciden con las de tokens.json).
  var THEME_BRANDS = [
    { key: "Pacifico", name: "Pacífico", desc: "Marca principal de Pacífico Salud. Primario turquesa, secundario magenta." },
    { key: "Sanna", name: "Sanna", desc: "Verde como color primario, morado como secundario." },
    { key: "Tsana", name: "Tsana", desc: "Morado como color primario, verde como secundario." },
  ];

  var _tokensData = null;
  async function loadTokensData() {
    if (_tokensData) return _tokensData;
    var res = await fetch("content/data/tokens.json");
    if (!res.ok) throw new Error("No se pudo cargar tokens.json");
    _tokensData = await res.json();
    return _tokensData;
  }

  // Devuelve el contenido de una página respetando las ediciones del admin.
  async function getPageContent(sectionSlug, pageSlug) {
    var key = sectionSlug + "/" + pageSlug;
    if (overrides[key] != null) return overrides[key];
    return fetchPage(sectionSlug, pageSlug);
  }

  // "Fill/brand/primary/medium" → "--fill-brand-primary-medium"
  function tokenToVar(name) {
    return "--" + name.trim().toLowerCase().replace(/[\/\s]+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  function pxVal(t) { return typeof t.px === "number" ? t.px + "px" : null; }

  // Construye tokens.css (variables CSS resueltas para la marca).
  function buildTokensCss(data, brand) {
    var lines = [];
    lines.push("/* Blister · tokens resueltos para el tema «" + brand + "»");
    lines.push("   Generado desde el design system de " + (data.brand || "Pacífico Salud") + ".");
    lines.push("   Colores semánticos en el modo " + brand + "; dimensiones compartidas.");
    lines.push("   No edites los valores a mano: provienen de los tokens del sistema. */");
    lines.push(":root {");
    lines.push("  /* Color semántico (rol/familia/variante/intensidad) — modo " + brand + " */");
    (data.semantic_color || []).forEach(function (t) {
      var v = t[brand];
      if (v) lines.push("  " + tokenToVar(t.name) + ": " + v + ";");
    });
    lines.push("");
    lines.push("  /* Tipografía */");
    (data.typography_sizes || []).forEach(function (t) {
      var v = pxVal(t); if (v) lines.push("  " + tokenToVar(t.name) + ": " + v + ";");
    });
    lines.push("");
    lines.push("  /* Espaciado, radios y grosores */");
    (data.sizes || []).forEach(function (t) {
      var v = pxVal(t); if (v) lines.push("  " + tokenToVar(t.name) + ": " + v + ";");
    });
    lines.push("");
    lines.push("  /* Escala base */");
    (data.scale || []).forEach(function (t) {
      var v = pxVal(t); if (v) lines.push("  " + tokenToVar(t.name) + ": " + v + ";");
    });
    lines.push("}");
    lines.push("");
    return lines.join("\n");
  }

  // Construye tokens.json resuelto (name → valor) para la marca.
  function buildTokensJson(data, brand) {
    var color = {};
    (data.semantic_color || []).forEach(function (t) { if (t[brand]) color[t.name] = t[brand]; });
    var primitives = {};
    (data.primitives_color || []).forEach(function (t) { primitives[t.name] = t.value; });
    var typography = {};
    (data.typography_sizes || []).forEach(function (t) { if (typeof t.px === "number") typography[t.name] = t.px; });
    var dimensions = {};
    (data.sizes || []).forEach(function (t) { if (typeof t.px === "number") dimensions[t.name] = t.px; });
    var scale = {};
    (data.scale || []).forEach(function (t) { if (typeof t.px === "number") scale[t.name] = t.px; });
    return JSON.stringify({
      theme: brand,
      brand: data.brand || "Pacífico Salud",
      note: "Colores semánticos resueltos para el modo " + brand + ". Consúmelos por su rol; no uses primitivos ni hex sueltos.",
      color: color,
      primitives_color: primitives,
      typography_sizes: typography,
      spacing_and_radii: dimensions,
      scale: scale,
    }, null, 2);
  }

  // Extrae los callouts :::do / :::dont de un markdown como reglas.
  function extractRules(md) {
    var rules = [];
    var re = /^:::(do|dont)(?:[ \t]+([^\n]*))?\n([\s\S]*?)^:::[ \t]*$/gm;
    var m;
    while ((m = re.exec(md))) {
      rules.push({ kind: m[1], title: (m[2] || "").trim(), body: m[3].trim() });
    }
    return rules;
  }

  // Documento agregado con todas las reglas «Hacer / Evitar» del sistema.
  function buildRulesDoc(pages) {
    var out = ["# Reglas de diseño (Blister)", "",
      "Reglas extraídas de la documentación del design system. Respétalas para",
      "mantener la consistencia en cualquier piloto.", ""];
    pages.forEach(function (p) {
      var rules = extractRules(p.md);
      if (!rules.length) return;
      out.push("## " + p.section + " · " + p.title);
      out.push("");
      rules.forEach(function (r) {
        var label = r.kind === "do" ? "✅ Hacer" : "🚫 Evitar";
        out.push("- **" + label + (r.title ? " — " + r.title : "") + "**: " + r.body.replace(/\n+/g, " "));
      });
      out.push("");
    });
    return out.join("\n");
  }

  // Índice de componentes documentados (para uso presente y futuro).
  function buildComponentsIndex() {
    var sec = manifest.sections.find(function (s) { return s.slug === "componentes"; });
    var out = ["# Componentes disponibles", "",
      "Lista viva de los componentes documentados en Blister. Un piloto solo",
      "debe usar componentes de esta lista; si falta alguno, se documenta antes",
      "de construirlo. Cada ficha (en `componentes/<slug>.md`) trae anatomía,",
      "variantes, estados y buenas prácticas.", ""];
    if (sec) {
      sec.pages.forEach(function (p) {
        out.push("## " + p.title + "  \n`componentes/" + p.slug + ".md`");
        if (p.description) out.push("\n" + p.description);
        if (p.keywords && p.keywords.length) out.push("\n_Palabras clave: " + p.keywords.join(", ") + "._");
        out.push("");
      });
    }
    return out.join("\n");
  }

  function buildReadme(data, brand, comps) {
    return [
      "# Blister — Kit de tema «" + brand + "»",
      "",
      "Kit de arranque para pilotar un producto de **" + (data.brand || "Pacífico Salud") +
        "** con el tema **" + brand + "**, usando los tokens, principios y componentes",
      "reales del design system Blister. Todo lo que hay aquí se deriva del propio",
      "sistema: no contiene valores inventados.",
      "",
      "## Qué incluye",
      "",
      "```",
      "tokens/tokens.css      Variables CSS con el color semántico resuelto para " + brand,
      "tokens/tokens.json     Los mismos tokens en JSON (color, tipografía, espaciado, radios)",
      "fundamentos/           Principios, arquitectura de tokens, color, tipografía, espaciado, iconografía",
      "componentes/           Ficha de cada componente documentado + _index.md",
      "reglas-de-diseno.md    Todas las reglas «Hacer / Evitar» del sistema, agregadas",
      "CLAUDE.md              Brief para construir el piloto con un agente manteniendo consistencia",
      "```",
      "",
      "## Cómo usar los tokens",
      "",
      "1. Importa `tokens/tokens.css` en tu proyecto y consume las variables por su rol:",
      "",
      "   ```css",
      "   .cta { background: var(--fill-brand-primary-medium); color: var(--text-neutral-xlow); }",
      "   .card { border: var(--border-width-small) solid var(--stroke-neutral-low); border-radius: var(--border-radio-small); }",
      "   ```",
      "",
      "2. Nunca escribas un hex suelto: si un color no existe como token, no debe usarse.",
      "3. Emplea `Surface/*` para fondos, `Text/*` para texto, `Stroke/*` para bordes e",
      "   `Icons/*` para iconos — el emparejamiento de intensidades ya cumple contraste.",
      "",
      "## Consistencia",
      "",
      "Antes de dar por bueno un piloto, revísalo contra `reglas-de-diseno.md` y",
      "`fundamentos/principios.md`. Usa únicamente componentes de `componentes/`",
      "(" + comps + " documentados). Cambiar de marca es cambiar de tema: la estructura,",
      "los principios y los componentes son los mismos para Sanna, Tsana y Pacífico.",
      "",
    ].join("\n");
  }

  function buildClaudeMd(data, brand, comps) {
    return [
      "# Brief para agente — piloto Blister, tema «" + brand + "»",
      "",
      "Vas a ayudar a construir un piloto de **" + (data.brand || "Pacífico Salud") +
        "** con el tema **" + brand + "** sobre el design system Blister. Este kit es tu",
      "fuente de verdad. Tu objetivo es que el piloto sea **consistente** con el sistema.",
      "",
      "## Reglas no negociables",
      "",
      "1. **Solo tokens.** Toma todo color, tamaño, espaciado y radio de `tokens/tokens.css`",
      "   o `tokens/tokens.json`. Prohibido hardcodear hex o píxeles sueltos.",
      "2. **Solo componentes documentados.** Usa exclusivamente los de `componentes/`",
      "   (" + comps + " disponibles; ver `componentes/_index.md`). Si necesitas uno que no",
      "   existe, decláralo y documéntalo antes de construirlo — no improvises.",
      "3. **Respeta los principios.** Sigue `fundamentos/principios.md` y las reglas de",
      "   `reglas-de-diseno.md` (todas las de «Hacer / Evitar»).",
      "4. **Color por rol.** `Surface/*` para fondos, `Text/*` para texto, `Stroke/*` para",
      "   bordes, `Icons/*` para iconos. No uses primitivos (`Blue/medium`) directamente.",
      "5. **No comuniques estado solo con color** (acompaña con icono o texto).",
      "6. **El tema no cambia la estructura.** Sanna, Tsana y Pacífico comparten componentes,",
      "   principios y arquitectura; solo cambian los valores de color de marca.",
      "",
      "## Cómo empezar",
      "",
      "1. Lee `README.md`, `fundamentos/arquitectura-tokens.md` y `fundamentos/principios.md`.",
      "2. Importa `tokens/tokens.css` y define la base tipográfica (Roboto) y el espaciado.",
      "3. Maqueta con los componentes de `componentes/` respetando su anatomía y estados.",
      "4. Antes de entregar, valida contra el checklist de abajo.",
      "",
      "## Checklist de consistencia",
      "",
      "- [ ] Ningún color/tamaño fuera de los tokens del kit.",
      "- [ ] Solo componentes documentados, con sus variantes y estados correctos.",
      "- [ ] Foco visible (anillo 2px) en todos los controles interactivos.",
      "- [ ] Contraste correcto usando el emparejamiento de intensidades de los tokens.",
      "- [ ] Estados comunicados con color **y** icono/texto.",
      "- [ ] Cumple los principios de `fundamentos/principios.md`.",
      "",
    ].join("\n");
  }

  /* ----- Escritor de ZIP en JS puro (método store, sin dependencias) ----- */
  var CRC_TABLE = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(bytes) {
    var crc = ~0;
    for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xff];
    return (~crc) >>> 0;
  }
  function makeZip(files) {
    var enc = new TextEncoder();
    var chunks = [], offset = 0;
    function u16(n) { return new Uint8Array([n & 0xff, (n >>> 8) & 0xff]); }
    function u32(n) { return new Uint8Array([n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]); }
    function push(a) { chunks.push(a); offset += a.length; }
    var recs = [];
    files.forEach(function (f) {
      var nameBytes = enc.encode(f.name);
      var data = enc.encode(f.content);
      var crc = crc32(data), local = offset;
      push(u32(0x04034b50)); push(u16(20)); push(u16(0x0800)); push(u16(0));
      push(u16(0)); push(u16(0)); push(u32(crc)); push(u32(data.length)); push(u32(data.length));
      push(u16(nameBytes.length)); push(u16(0)); push(nameBytes); push(data);
      recs.push({ nameBytes: nameBytes, crc: crc, size: data.length, local: local });
    });
    var cdStart = offset;
    recs.forEach(function (r) {
      push(u32(0x02014b50)); push(u16(20)); push(u16(20)); push(u16(0x0800)); push(u16(0));
      push(u16(0)); push(u16(0)); push(u32(r.crc)); push(u32(r.size)); push(u32(r.size));
      push(u16(r.nameBytes.length)); push(u16(0)); push(u16(0)); push(u16(0)); push(u16(0));
      push(u32(0)); push(u32(r.local)); push(r.nameBytes);
    });
    var cdSize = offset - cdStart;
    push(u32(0x06054b50)); push(u16(0)); push(u16(0)); push(u16(recs.length)); push(u16(recs.length));
    push(u32(cdSize)); push(u32(cdStart)); push(u16(0));
    var total = 0; chunks.forEach(function (c) { total += c.length; });
    var out = new Uint8Array(total), p = 0;
    chunks.forEach(function (c) { out.set(c, p); p += c.length; });
    return out;
  }

  // Reúne todos los recursos y dispara la descarga del .zip para la marca.
  async function downloadThemeKit(brand, onProgress) {
    var data = await loadTokensData();
    var root = "blister-theme-" + brand.toLowerCase() + "/";
    var files = [];

    // Fundamentos + componentes: se descargan del propio contenido.
    var fundamentosSlugs = ["principios", "arquitectura-tokens", "color", "tipografia", "espaciado", "iconografia"];
    var compsSection = manifest.sections.find(function (s) { return s.slug === "componentes"; });
    var compSlugs = compsSection ? compsSection.pages.map(function (p) { return p.slug; }) : [];
    var comps = compSlugs.length;

    var collected = []; // para reglas agregadas
    var titleOf = function (slug, sectionSlug) {
      var sec = manifest.sections.find(function (s) { return s.slug === sectionSlug; });
      var pg = sec && sec.pages.find(function (p) { return p.slug === slug; });
      return pg ? pg.title : slug;
    };

    for (var i = 0; i < fundamentosSlugs.length; i++) {
      try {
        var fmd = await getPageContent("fundamentos", fundamentosSlugs[i]);
        files.push({ name: root + "fundamentos/" + fundamentosSlugs[i] + ".md", content: fmd });
        collected.push({ section: "Fundamentos", title: titleOf(fundamentosSlugs[i], "fundamentos"), md: fmd });
      } catch (e) { /* omitir si falta */ }
      if (onProgress) onProgress();
    }
    for (var j = 0; j < compSlugs.length; j++) {
      try {
        var cmd = await getPageContent("componentes", compSlugs[j]);
        files.push({ name: root + "componentes/" + compSlugs[j] + ".md", content: cmd });
        collected.push({ section: "Componentes", title: titleOf(compSlugs[j], "componentes"), md: cmd });
      } catch (e) { /* omitir si falta */ }
      if (onProgress) onProgress();
    }

    // Tokens resueltos, índices y briefs generados.
    files.push({ name: root + "tokens/tokens.css", content: buildTokensCss(data, brand) });
    files.push({ name: root + "tokens/tokens.json", content: buildTokensJson(data, brand) });
    files.push({ name: root + "componentes/_index.md", content: buildComponentsIndex() });
    files.push({ name: root + "reglas-de-diseno.md", content: buildRulesDoc(collected) });
    files.push({ name: root + "README.md", content: buildReadme(data, brand, comps) });
    files.push({ name: root + "CLAUDE.md", content: buildClaudeMd(data, brand, comps) });

    var zip = makeZip(files);
    var blob = new Blob([zip], { type: "application/zip" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "blister-theme-" + brand.toLowerCase() + ".zip";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    return files.length;
  }

  /* ----- Modal: elegir el tema del piloto ----- */
  async function openThemeKit() {
    var modal = document.createElement("div");
    modal.className = "editor-overlay themekit-overlay";
    // Swatches provisionales; se rellenan al cargar tokens.json.
    modal.innerHTML =
      '<div class="editor-backdrop" data-close></div>' +
      '<div class="editor-panel themekit-panel" role="dialog" aria-modal="true" aria-label="Descargar tema">' +
      '<div class="editor-head"><h2>¿Qué tema va a tener tu piloto?</h2>' +
      '<button class="editor-x" data-close aria-label="Cerrar">✕</button></div>' +
      '<div class="editor-content">' +
      '<p class="themekit-intro">Elige la marca. Descargarás un kit con los tokens de ese tema y todos los principios, reglas y componentes del sistema para pilotear con consistencia.</p>' +
      '<div class="themekit-grid" id="themekit-grid">' +
      THEME_BRANDS.map(function (b) {
        return '<button class="tk-card" type="button" data-brand="' + b.key + '">' +
          '<span class="tk-swatches" data-brand-sw="' + b.key + '"><i class="tk-sw tk-sw-1"></i><i class="tk-sw tk-sw-2"></i></span>' +
          '<span class="tk-name">' + escapeHtml(b.name) + "</span>" +
          '<span class="tk-desc">' + escapeHtml(b.desc) + "</span>" +
          '<span class="tk-cta">Descargar kit ↓</span></button>';
      }).join("") +
      "</div>" +
      '<p class="themekit-msg" id="themekit-msg" hidden></p>' +
      "</div></div>";
    document.body.appendChild(modal);
    var close = function () { modal.remove(); };
    modal.querySelectorAll("[data-close]").forEach(function (el) { el.addEventListener("click", close); });
    var onKey = function (e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); } };
    document.addEventListener("keydown", onKey);
    var msg = modal.querySelector("#themekit-msg");
    function showMsg(t, kind) { msg.hidden = false; msg.textContent = t; msg.className = "themekit-msg " + (kind || ""); }

    // Rellena los swatches con los colores reales de cada marca.
    loadTokensData().then(function (data) {
      var byName = {};
      (data.semantic_color || []).forEach(function (t) { byName[t.name] = t; });
      THEME_BRANDS.forEach(function (b) {
        var el = modal.querySelector('[data-brand-sw="' + b.key + '"]');
        if (!el) return;
        var pri = byName["Fill/brand/primary/medium"];
        var sec = byName["Fill/brand/secondary/medium"];
        if (pri && pri[b.key]) el.querySelector(".tk-sw-1").style.background = pri[b.key];
        if (sec && sec[b.key]) el.querySelector(".tk-sw-2").style.background = sec[b.key];
      });
    }).catch(function () { /* sin swatches: el kit sigue funcionando */ });

    modal.querySelector("#themekit-grid").addEventListener("click", async function (e) {
      var card = e.target.closest(".tk-card");
      if (!card) return;
      var brand = card.dataset.brand;
      var cta = card.querySelector(".tk-cta");
      var original = cta.textContent;
      card.disabled = true;
      cta.textContent = "Preparando…";
      try {
        var n = await downloadThemeKit(brand, function () { /* progreso simple */ });
        cta.textContent = "¡Descargado! ✓";
        showMsg("Kit de «" + brand + "» generado con " + n + " archivos. Descomprime el .zip y empieza por README.md.", "ok");
        setTimeout(function () { cta.textContent = original; card.disabled = false; }, 2500);
      } catch (err) {
        cta.textContent = original;
        card.disabled = false;
        showMsg("No se pudo generar el kit: " + (err.message || err), "err");
      }
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

  // El arranque lo dispara el gate de acceso (auth.js) una vez validado
  // el usuario. Si no hay gate de auth cargado, arranca directamente.
  let started = false;
  window.__startDocs = function () {
    if (started) return;
    started = true;
    loadManifest()
      .then(loadOverrides)
      .then(() => {
        route();
        buildSearchIndex();
      })
      .catch((err) => {
        app.innerHTML = '<div class="loading">Error al cargar la documentación: ' + escapeHtml(err.message) + "</div>";
      });
  };

  if (!window.__DS_AUTH__) {
    window.__startDocs();
  }
})();
