/* ============================================================
   Control de acceso con Supabase.
   - Login/registro con email + contraseña (estilo Pacífico).
   - Solo entran los correos que el admin haya añadido (allowlist
     reforzada en la base de datos).
   - Panel de administración para gestionar los correos.
   El contenido de la documentación solo arranca (window.__startDocs)
   cuando el usuario tiene acceso.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.__DS_AUTH__;
  if (!CFG || !window.supabase) return; // sin config → app.js arranca solo

  // Oculta la documentación hasta validar acceso (evita parpadeo)
  document.body.classList.add("auth-locked");

  var sb = window.supabase.createClient(CFG.url, CFG.key);
  var currentUser = null, currentRole = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Overlay ---------- */
  var overlay = document.createElement("div");
  overlay.className = "auth-overlay";
  document.body.appendChild(overlay);

  function redirectURL() { return location.origin + location.pathname; }

  /* ---------- Pantalla de login ---------- */
  function renderLogin(mode) {
    mode = mode || "login";
    overlay.innerHTML =
      '<div class="auth-card">' +
        '<div class="auth-brand"><span class="auth-mark">◈</span><span class="auth-brandname">Pacífico · Design System</span></div>' +
        '<div class="auth-tabs">' +
          '<button class="auth-tab" data-mode="login">Iniciar sesión</button>' +
          '<button class="auth-tab" data-mode="register">Registrarse</button>' +
        '</div>' +
        '<form class="auth-form" id="auth-form">' +
          '<label class="auth-label">Email corporativo' +
            '<input type="email" id="auth-email" autocomplete="email" placeholder="nombre@pacifico.com.pe" required />' +
          '</label>' +
          '<label class="auth-label">Contraseña' +
            '<input type="password" id="auth-pass" autocomplete="current-password" placeholder="••••••••" required minlength="6" />' +
          '</label>' +
          '<div class="auth-row">' +
            '<label class="auth-check"><input type="checkbox" id="auth-remember" checked /> Recordarme</label>' +
            '<button type="button" class="auth-link" id="auth-forgot">¿Olvidaste tu contraseña?</button>' +
          '</div>' +
          '<button type="submit" class="auth-submit" id="auth-submit">Entrar</button>' +
          '<p class="auth-msg" id="auth-msg" hidden></p>' +
        '</form>' +
        '<p class="auth-help">¿Problemas para ingresar? Contacta a tu lead o administrador.</p>' +
        '<p class="auth-footer">Pacífico Salud · Experiencia y Diseño</p>' +
      '</div>';

    var tabs = overlay.querySelectorAll(".auth-tab");
    tabs.forEach(function (t) {
      t.classList.toggle("active", t.dataset.mode === mode);
      t.addEventListener("click", function () { renderLogin(t.dataset.mode); });
    });

    var form = overlay.querySelector("#auth-form");
    var emailEl = overlay.querySelector("#auth-email");
    var passEl = overlay.querySelector("#auth-pass");
    var passLabel = passEl.parentElement;
    var submit = overlay.querySelector("#auth-submit");
    var msg = overlay.querySelector("#auth-msg");

    if (mode === "register") {
      submit.textContent = "Crear cuenta";
      passEl.setAttribute("autocomplete", "new-password");
      passLabel.childNodes[0].nodeValue = "Crea una contraseña";
    }

    function showMsg(text, kind) {
      msg.hidden = false;
      msg.textContent = text;
      msg.className = "auth-msg " + (kind || "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = emailEl.value.trim().toLowerCase();
      var pass = passEl.value;
      submit.disabled = true;
      var prev = submit.textContent;
      submit.textContent = "Un momento…";
      msg.hidden = true;

      var op = mode === "register"
        ? sb.auth.signUp({ email: email, password: pass, options: { emailRedirectTo: redirectURL() } })
        : sb.auth.signInWithPassword({ email: email, password: pass });

      op.then(function (res) {
        if (res.error) {
          var m = res.error.message || "";
          if (/Invalid login credentials/i.test(m)) {
            showMsg("Correo o contraseña incorrectos.", "err");
          } else if (/Email not confirmed/i.test(m)) {
            showMsg("Debes confirmar tu correo antes de entrar. Revisa tu bandeja.", "err");
          } else if (/User already registered/i.test(m)) {
            showMsg("Ese correo ya tiene una cuenta. Inicia sesión.", "err");
          } else {
            showMsg(m, "err");
          }
          submit.disabled = false;
          submit.textContent = prev;
          return;
        }
        if (mode === "register") {
          showMsg("Cuenta creada. Tu acceso queda pendiente de aprobación de un administrador. Si te pedimos confirmar el correo, revísalo primero.", "ok");
          submit.disabled = false;
          submit.textContent = prev;
        }
        // Si hay sesión, onAuthStateChange evaluará el acceso (aprobado o pendiente).
      });
    });

    overlay.querySelector("#auth-forgot").addEventListener("click", function () {
      var email = emailEl.value.trim().toLowerCase();
      if (!email) { showMsg("Escribe tu correo y volvemos a intentarlo.", "err"); return; }
      sb.auth.resetPasswordForEmail(email, { redirectTo: redirectURL() }).then(function () {
        showMsg("Si el correo tiene acceso, te enviamos un enlace para restablecer la contraseña.", "ok");
      });
    });
  }

  /* ---------- Autenticado pero aún sin acceso aprobado ---------- */
  function renderPending(email, status) {
    var rejected = status === "rejected";
    overlay.innerHTML =
      '<div class="auth-card">' +
        '<div class="auth-brand"><span class="auth-mark">◈</span><span class="auth-brandname">Pacífico · Design System</span></div>' +
        '<h2 class="auth-title">' + (rejected ? "Solicitud rechazada" : "Solicitud en revisión") + "</h2>" +
        '<p class="auth-help">' +
          (rejected
            ? "La solicitud de acceso de <strong>" + esc(email) + "</strong> fue rechazada. Si crees que es un error, contacta a tu administrador."
            : "La cuenta <strong>" + esc(email) + "</strong> está <strong>pendiente de aprobación</strong>. Te avisaremos cuando un administrador apruebe tu acceso.") +
        "</p>" +
        '<button class="auth-submit" id="auth-signout">Cerrar sesión</button>' +
        '<p class="auth-footer">Pacífico Salud · Experiencia y Diseño</p>' +
      "</div>";
    overlay.querySelector("#auth-signout").addEventListener("click", function () {
      sb.auth.signOut();
    });
  }

  /* ---------- Evaluar acceso ---------- */
  function evaluate(session) {
    currentUser = session.user;
    var email = (session.user.email || "").toLowerCase();
    return sb.from("allowed_emails")
      .select("role")
      .eq("email", email)
      .maybeSingle()
      .then(function (res) {
        if (res.data) {
          currentRole = res.data.role;
          grant();
          return;
        }
        // No aprobado todavía: consultar el estado de su solicitud
        return sb.from("access_requests").select("status").eq("email", email).maybeSingle()
          .then(function (r2) {
            renderPending(session.user.email, r2.data && r2.data.status);
          });
      });
  }

  function grant() {
    overlay.innerHTML = "";
    document.body.classList.remove("auth-locked");
    injectHeaderAccount();
    // Exponer para el editor de contenido (app.js)
    window.__dsSupabase = sb;
    window.__dsIsAdmin = currentRole === "admin";
    window.__dsUserEmail = currentUser.email;
    if (window.__startDocs) window.__startDocs();
  }

  /* ---------- Chip de usuario + admin en el header ---------- */
  function injectHeaderAccount() {
    var actions = document.querySelector(".header-actions");
    if (!actions || document.getElementById("auth-account")) return;
    var wrap = document.createElement("div");
    wrap.id = "auth-account";
    wrap.className = "auth-account";
    var initials = (currentUser.email || "?").slice(0, 2).toUpperCase();
    wrap.innerHTML =
      (currentRole === "admin"
        ? '<button class="auth-admin-btn" id="auth-admin" type="button" title="Administrar accesos"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Accesos</span></button>'
        : "") +
      '<span class="auth-chip" title="' + esc(currentUser.email) + '"><span class="auth-avatar">' + esc(initials) + '</span></span>' +
      '<button class="auth-signout" id="auth-signout-h" type="button" title="Cerrar sesión"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg></button>';
    actions.appendChild(wrap);
    wrap.querySelector("#auth-signout-h").addEventListener("click", function () { sb.auth.signOut(); });
    if (currentRole === "admin") {
      wrap.querySelector("#auth-admin").addEventListener("click", openAdmin);
    }
  }

  /* ---------- Panel de administración ---------- */
  function openAdmin() {
    var modal = document.createElement("div");
    modal.className = "admin-overlay";
    modal.innerHTML =
      '<div class="admin-backdrop" data-close></div>' +
      '<div class="admin-panel" role="dialog" aria-modal="true" aria-label="Administrar accesos">' +
        '<div class="admin-head"><h2>Administrar accesos</h2><button class="admin-close" data-close aria-label="Cerrar">✕</button></div>' +
        '<div class="admin-body">' +
          '<div class="admin-section">' +
            '<h3 class="admin-subtitle">Solicitudes pendientes <span class="admin-badge" id="admin-req-count" hidden>0</span></h3>' +
            '<div class="admin-req-list" id="admin-req-list"><p class="admin-loading">Cargando…</p></div>' +
          '</div>' +
          '<div class="admin-section">' +
            '<h3 class="admin-subtitle">Añadir directamente</h3>' +
            '<form class="admin-add" id="admin-add">' +
              '<input type="email" id="admin-new-email" placeholder="correo@pacifico.com.pe" required />' +
              '<select id="admin-new-role"><option value="member">Miembro</option><option value="admin">Admin</option></select>' +
              '<button type="submit">Añadir</button>' +
            '</form>' +
            '<p class="admin-msg" id="admin-msg" hidden></p>' +
          '</div>' +
          '<div class="admin-section">' +
            '<h3 class="admin-subtitle">Con acceso</h3>' +
            '<div class="admin-list" id="admin-list"><p class="admin-loading">Cargando…</p></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () { modal.remove(); });
    });

    var listEl = modal.querySelector("#admin-list");
    var msgEl = modal.querySelector("#admin-msg");
    function showMsg(t, kind) { msgEl.hidden = false; msgEl.textContent = t; msgEl.className = "admin-msg " + (kind || ""); }

    function load() {
      listEl.innerHTML = '<p class="admin-loading">Cargando…</p>';
      sb.from("allowed_emails").select("email, role, full_name, created_at").order("created_at", { ascending: true })
        .then(function (res) {
          if (res.error) { listEl.innerHTML = '<p class="admin-loading">Error: ' + esc(res.error.message) + "</p>"; return; }
          if (!res.data.length) { listEl.innerHTML = '<p class="admin-loading">Aún no hay correos.</p>'; return; }
          listEl.innerHTML = res.data.map(function (r) {
            var isMe = r.email === (currentUser.email || "").toLowerCase();
            return '<div class="admin-item">' +
              '<span class="admin-email">' + esc(r.email) + (isMe ? ' <span class="admin-you">tú</span>' : "") + "</span>" +
              '<span class="admin-role admin-role--' + esc(r.role) + '">' + (r.role === "admin" ? "Admin" : "Miembro") + "</span>" +
              (isMe ? '<span class="admin-del-spacer"></span>' :
                '<button class="admin-del" data-email="' + esc(r.email) + '" title="Quitar acceso">✕</button>') +
              "</div>";
          }).join("");
          listEl.querySelectorAll(".admin-del").forEach(function (b) {
            b.addEventListener("click", function () {
              var email = b.dataset.email;
              if (!confirm("¿Quitar el acceso de " + email + "?")) return;
              sb.from("allowed_emails").delete().eq("email", email).then(function (res) {
                if (res.error) showMsg(res.error.message, "err"); else load();
              });
            });
          });
        });
    }

    // ---- Solicitudes pendientes ----
    var reqList = modal.querySelector("#admin-req-list");
    var reqCount = modal.querySelector("#admin-req-count");

    function loadRequests() {
      sb.from("access_requests").select("email, full_name, created_at")
        .eq("status", "pending").order("created_at", { ascending: true })
        .then(function (res) {
          if (res.error) { reqList.innerHTML = '<p class="admin-loading">Error: ' + esc(res.error.message) + "</p>"; return; }
          var rows = res.data || [];
          reqCount.hidden = rows.length === 0;
          reqCount.textContent = rows.length;
          if (!rows.length) { reqList.innerHTML = '<p class="admin-empty">No hay solicitudes pendientes.</p>'; return; }
          reqList.innerHTML = rows.map(function (r) {
            return '<div class="admin-item admin-req">' +
              '<span class="admin-email">' + esc(r.email) + "</span>" +
              '<button class="admin-approve" data-email="' + esc(r.email) + '">Aprobar</button>' +
              '<button class="admin-reject" data-email="' + esc(r.email) + '">Rechazar</button>' +
              "</div>";
          }).join("");
          reqList.querySelectorAll(".admin-approve").forEach(function (b) {
            b.addEventListener("click", function () {
              var email = b.dataset.email;
              b.disabled = true;
              // Aprobar = añadir a la lista de accesos + marcar la solicitud
              sb.from("allowed_emails").insert({ email: email, role: "member", invited_by: currentUser.email })
                .then(function (r1) {
                  if (r1.error && !/duplicate|already exists/i.test(r1.error.message)) {
                    showMsg(r1.error.message, "err"); b.disabled = false; return;
                  }
                  sb.from("access_requests").update({ status: "approved", decided_at: new Date().toISOString(), decided_by: currentUser.email }).eq("email", email)
                    .then(function () { showMsg("Acceso aprobado para " + email + ".", "ok"); loadRequests(); load(); });
                });
            });
          });
          reqList.querySelectorAll(".admin-reject").forEach(function (b) {
            b.addEventListener("click", function () {
              var email = b.dataset.email;
              if (!confirm("¿Rechazar la solicitud de " + email + "?")) return;
              sb.from("access_requests").update({ status: "rejected", decided_at: new Date().toISOString(), decided_by: currentUser.email }).eq("email", email)
                .then(function (res) { if (res.error) showMsg(res.error.message, "err"); else { showMsg("Solicitud rechazada.", "ok"); loadRequests(); } });
            });
          });
        });
    }

    modal.querySelector("#admin-add").addEventListener("submit", function (e) {
      e.preventDefault();
      var email = modal.querySelector("#admin-new-email").value.trim().toLowerCase();
      var role = modal.querySelector("#admin-new-role").value;
      sb.from("allowed_emails").insert({ email: email, role: role, invited_by: currentUser.email }).then(function (res) {
        if (res.error) {
          showMsg(/duplicate|already exists/i.test(res.error.message) ? "Ese correo ya está en la lista." : res.error.message, "err");
        } else {
          showMsg("Acceso concedido a " + email + ".", "ok");
          modal.querySelector("#admin-new-email").value = "";
          load();
        }
      });
    });

    loadRequests();
    load();
  }

  /* ---------- Arranque ---------- */
  sb.auth.getSession().then(function (res) {
    var session = res.data.session;
    if (session) evaluate(session); else renderLogin("login");
  });

  sb.auth.onAuthStateChange(function (event, session) {
    if (event === "SIGNED_IN" && session) {
      evaluate(session);
    } else if (event === "SIGNED_OUT") {
      currentUser = null; currentRole = null;
      var acc = document.getElementById("auth-account"); if (acc) acc.remove();
      document.body.classList.add("auth-locked");
      renderLogin("login");
    }
  });
})();
