/* =========================================================================
   js/specimen.js — aseed SPECIMEN shared interaction library
   window.AseedFX = { scramble, kinetic, stitch, reveal, odometer }
   Auto-initialises: [data-scramble] hover/focus decode, [data-kinetic]
   cursor-repelled letters, .reveal intersection reveals, stitch progress
   rail (skipped when body.no-stitch or narrow viewports).
   All effects disabled under prefers-reduced-motion.
   ========================================================================= */
(function () {
  "use strict";

  var REDUCED = false;
  try {
    REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  var GLYPHS = "aseed/—·|01ASD";

  /* ---- text scramble ---------------------------------------------------- */

  function scramble(el, duration) {
    if (REDUCED || !el) return;
    var orig = el.getAttribute("data-fx-orig");
    if (orig === null) {
      orig = el.textContent;
      el.setAttribute("data-fx-orig", orig);
    }
    if (el._fxTimer) clearInterval(el._fxTimer);
    var dur = duration || 520;
    var start = performance.now();
    el._fxTimer = setInterval(function () {
      var t = (performance.now() - start) / dur;
      if (t >= 1) {
        clearInterval(el._fxTimer);
        el._fxTimer = null;
        el.textContent = orig;
        return;
      }
      var solved = Math.floor(orig.length * t);
      var out = "";
      for (var i = 0; i < orig.length; i++) {
        var ch = orig.charAt(i);
        if (ch === " " || i < solved) out += ch;
        else out += GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      }
      el.textContent = out;
    }, 34);
  }

  function bindScramble(root) {
    var els = (root || document).querySelectorAll("[data-scramble]");
    for (var i = 0; i < els.length; i++) {
      (function (el) {
        if (el._fxBound) return;
        el._fxBound = true;
        el.addEventListener("mouseenter", function () { scramble(el); });
        el.addEventListener("focus", function () { scramble(el); });
      })(els[i]);
    }
  }

  /* ---- kinetic letters (repel from cursor, spring back) ----------------- */

  var kineticSets = [];
  var kineticRaf = null;

  function kinetic(el) {
    if (!el || el._fxKinetic) return;
    el._fxKinetic = true;
    var text = el.textContent;
    el.textContent = "";
    el.setAttribute("aria-label", text);
    var letters = [];
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement("span");
      span.className = "k-letter";
      span.setAttribute("aria-hidden", "true");
      span.textContent = text.charAt(i);
      el.appendChild(span);
      letters.push({ el: span, x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0 });
    }
    if (REDUCED) return;
    kineticSets.push({ root: el, letters: letters });
    if (kineticSets.length === 1) {
      window.addEventListener("pointermove", onKineticMove, { passive: true });
    }
  }

  var pointerX = -9999;
  var pointerY = -9999;

  function onKineticMove(e) {
    pointerX = e.clientX;
    pointerY = e.clientY;
    if (!kineticRaf) kineticRaf = requestAnimationFrame(kineticFrame);
  }

  function kineticFrame() {
    kineticRaf = null;
    var active = false;
    var RANGE = 150;
    for (var s = 0; s < kineticSets.length; s++) {
      var set = kineticSets[s];
      for (var i = 0; i < set.letters.length; i++) {
        var L = set.letters[i];
        var rect = L.el.getBoundingClientRect();
        var cx = rect.left + rect.width / 2 - L.x;
        var cy = rect.top + rect.height / 2 - L.y;
        var dx = cx - pointerX;
        var dy = cy - pointerY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var tx = 0, ty = 0, tr = 0;
        if (dist < RANGE && dist > 0.01) {
          var f = (RANGE - dist) / RANGE;
          tx = (dx / dist) * f * 46;
          ty = (dy / dist) * f * 46;
          tr = (dx > 0 ? 1 : -1) * f * 7;
        }
        L.vx = (L.vx + (tx - L.x) * 0.12) * 0.82;
        L.vy = (L.vy + (ty - L.y) * 0.12) * 0.82;
        L.vr = (L.vr + (tr - L.r) * 0.12) * 0.82;
        L.x += L.vx;
        L.y += L.vy;
        L.r += L.vr;
        if (Math.abs(L.x) > 0.05 || Math.abs(L.y) > 0.05 || Math.abs(L.vx) > 0.05 || Math.abs(L.vy) > 0.05) {
          active = true;
          L.el.style.transform =
            "translate(" + L.x.toFixed(2) + "px," + L.y.toFixed(2) + "px) rotate(" + L.r.toFixed(2) + "deg)";
        } else if (L.el.style.transform) {
          L.x = L.y = L.r = 0;
          L.el.style.transform = "";
        }
      }
    }
    if (active) kineticRaf = requestAnimationFrame(kineticFrame);
  }

  /* ---- stitch scroll-progress rail -------------------------------------- */

  function stitch() {
    if (document.body.classList.contains("no-stitch")) return;
    if (window.innerWidth < 768) return;
    if (document.querySelector(".fx-stitch")) return;
    var rail = document.createElement("div");
    rail.className = "fx-stitch";
    rail.setAttribute("aria-hidden", "true");
    rail.innerHTML = '<span class="fx-stitch__fill"></span><span class="fx-stitch__needle"></span>';
    document.body.appendChild(rail);
    var fill = rail.firstChild;
    var needle = rail.lastChild;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      fill.style.height = (p * 100).toFixed(2) + "%";
      needle.style.top = "calc(" + (p * 100).toFixed(2) + "% - 4px)";
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---- reveal on scroll -------------------------------------------------- */

  function reveal() {
    if (!("IntersectionObserver" in window) || REDUCED) return;
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    document.documentElement.classList.add("has-reveal");
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-visible");
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12 });
    for (var i = 0; i < els.length; i++) io.observe(els[i]);
  }

  /* ---- odometer digits --------------------------------------------------- */

  function odometer(el) {
    if (!el || el._fxOdo) return;
    el._fxOdo = true;
    var text = el.textContent;
    if (REDUCED) return;
    el.setAttribute("aria-label", text);
    el.classList.add("odo");
    el.textContent = "";
    var strip = "0123456789";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var col = document.createElement("span");
      col.setAttribute("aria-hidden", "true");
      if (strip.indexOf(ch) === -1) {
        col.className = "odo__static";
        col.textContent = ch;
      } else {
        col.className = "odo__col";
        var inner = document.createElement("span");
        inner.className = "odo__reel";
        for (var d = 0; d < 10; d++) {
          var digit = document.createElement("span");
          digit.textContent = String(d);
          inner.appendChild(digit);
        }
        col.appendChild(inner);
        inner.style.transform = "translateY(0)";
        (function (reel, target, idx) {
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              reel.style.transitionDelay = (idx * 55) + "ms";
              reel.style.transform = "translateY(-" + target + "em)";
            });
          });
        })(inner, strip.indexOf(ch), i);
      }
      el.appendChild(col);
    }
  }

  /* ---- boot --------------------------------------------------------------- */

  function init() {
    bindScramble(document);
    var kin = document.querySelectorAll("[data-kinetic]");
    for (var i = 0; i < kin.length; i++) kinetic(kin[i]);
    stitch();
    reveal();
  }

  window.AseedFX = {
    scramble: scramble,
    bindScramble: bindScramble,
    kinetic: kinetic,
    stitch: stitch,
    reveal: reveal,
    odometer: odometer
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
