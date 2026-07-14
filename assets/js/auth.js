/* ============================================================
   Control de acceso con Supabase — conectado a la misma base de
   usuarios que FOCUS: cualquier cuenta de FOCUS entra directo aquí,
   sin allowlist ni aprobación aparte (no hay roles en Blister).
   El contenido de la documentación solo arranca (window.__startDocs)
   cuando el usuario tiene sesión.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.__DS_AUTH__;
  if (!CFG || !window.supabase) return; // sin config → app.js arranca solo

  // Oculta la documentación hasta validar acceso (evita parpadeo)
  document.body.classList.add("auth-locked");

  var sb = window.supabase.createClient(CFG.url, CFG.key);
  var currentUser = null;

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
  function lastEmail() {
    try { return localStorage.getItem("ds-last-email") || ""; } catch (e) { return ""; }
  }

  function renderLogin(mode) {
    mode = mode || "login";
    var remembered = lastEmail();
    var initials = (remembered || "?").slice(0, 2).toUpperCase();
    var quick = (mode === "login" && remembered)
      ? '<button type="button" class="auth-quick" id="auth-quick">' +
          '<span class="auth-avatar">' + esc(initials) + '</span>' +
          '<span class="auth-quick-txt">Continuar como<b>' + esc(remembered) + '</b></span>' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>' +
        '</button>' +
        '<button type="button" class="auth-otheracct" id="auth-other">Usar otra cuenta</button>'
      : "";
    overlay.innerHTML =
      '<div class="auth-card">' +
        '<div class="auth-brand"><img class="auth-mark" src="assets/img/blister-iso.svg" alt="Blister" /><span class="auth-brandname">Blister · Design System</span></div>' +
        '<div class="auth-tabs">' +
          '<button class="auth-tab" data-mode="login">Iniciar sesión</button>' +
          '<button class="auth-tab" data-mode="register">Registrarse</button>' +
        '</div>' +
        quick +
        '<form class="auth-form" id="auth-form">' +
          '<label class="auth-label">Email corporativo' +
            '<input type="email" id="auth-email" autocomplete="email" placeholder="nombre@pacifico.com.pe" required />' +
          '</label>' +
          '<label class="auth-label">Contraseña' +
            '<div class="auth-pass-wrap">' +
              '<input type="password" id="auth-pass" autocomplete="current-password" placeholder="••••••••" required minlength="6" />' +
              '<button type="button" class="auth-eye" id="auth-eye" aria-label="Mostrar contraseña" aria-pressed="false">' +
                '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>' +
              '</button>' +
            '</div>' +
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
    var passLabel = passEl.closest(".auth-label");
    var submit = overlay.querySelector("#auth-submit");
    var msg = overlay.querySelector("#auth-msg");

    if (mode === "register") {
      submit.textContent = "Crear cuenta";
      passEl.setAttribute("autocomplete", "new-password");
      passLabel.childNodes[0].nodeValue = "Crea una contraseña";
    }

    // Prellenar con el último correo usado y enfocar la contraseña
    if (mode === "login" && remembered) {
      emailEl.value = remembered;
      setTimeout(function () { passEl.focus(); }, 30);
    }

    // Ojo: mostrar / ocultar contraseña
    var eye = overlay.querySelector("#auth-eye");
    if (eye) {
      eye.addEventListener("click", function () {
        var show = passEl.type === "password";
        passEl.type = show ? "text" : "password";
        eye.setAttribute("aria-pressed", String(show));
        eye.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
        eye.innerHTML = show
          ? '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.16 3.19M6.6 6.6A17.8 17.8 0 0 0 2 12s3.5 7 10 7a9.1 9.1 0 0 0 5.4-1.6M1 1l22 22M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>'
          : '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
        passEl.focus();
      });
    }

    // Acceso rápido con el último correo
    var quickBtn = overlay.querySelector("#auth-quick");
    if (quickBtn) quickBtn.addEventListener("click", function () { passEl.focus(); });
    var otherBtn = overlay.querySelector("#auth-other");
    if (otherBtn) otherBtn.addEventListener("click", function () {
      try { localStorage.removeItem("ds-last-email"); } catch (e) {}
      renderLogin("login");
      overlay.querySelector("#auth-email").focus();
    });

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
        // Recordar el correo para el acceso rápido la próxima vez
        try { localStorage.setItem("ds-last-email", email); } catch (e) {}
        if (mode === "register") {
          showMsg("Cuenta creada. Si te pedimos confirmar el correo, revísalo y luego inicia sesión.", "ok");
          submit.disabled = false;
          submit.textContent = prev;
        }
        // Si hay sesión, onAuthStateChange concede el acceso directamente.
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

  /* ---------- Conceder acceso ---------- */
  function grant(session) {
    currentUser = session.user;
    overlay.innerHTML = "";
    document.body.classList.remove("auth-locked");
    injectHeaderAccount();
    // Exponer para el editor de contenido (app.js) — sin roles, disponible
    // para cualquier usuario con sesión.
    window.__dsSupabase = sb;
    window.__dsIsAdmin = true;
    window.__dsUserEmail = currentUser.email;
    if (window.__startDocs) window.__startDocs();
  }

  /* ---------- Chip de usuario en el header ---------- */
  function injectHeaderAccount() {
    var actions = document.querySelector(".header-actions");
    if (!actions || document.getElementById("auth-account")) return;
    var wrap = document.createElement("div");
    wrap.id = "auth-account";
    wrap.className = "auth-account";
    var initials = (currentUser.email || "?").slice(0, 2).toUpperCase();
    wrap.innerHTML =
      '<span class="auth-chip" title="' + esc(currentUser.email) + '"><span class="auth-avatar">' + esc(initials) + '</span></span>' +
      '<button class="auth-signout" id="auth-signout-h" type="button" title="Cerrar sesión"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg></button>';
    actions.appendChild(wrap);
    wrap.querySelector("#auth-signout-h").addEventListener("click", function () { sb.auth.signOut(); });
  }

  /* ---------- Arranque ---------- */
  sb.auth.getSession().then(function (res) {
    var session = res.data.session;
    if (session) grant(session); else renderLogin("login");
  });

  sb.auth.onAuthStateChange(function (event, session) {
    if (event === "SIGNED_IN" && session) {
      grant(session);
    } else if (event === "SIGNED_OUT") {
      currentUser = null;
      var acc = document.getElementById("auth-account"); if (acc) acc.remove();
      document.body.classList.add("auth-locked");
      renderLogin("login");
    }
  });
})();
