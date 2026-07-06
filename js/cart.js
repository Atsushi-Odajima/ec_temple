/* aseed — cart / favorites / shared header behavior (Agent DATA)
   Exposes: window.AseedCart, window.AseedFav
   localStorage keys: aseed.cart.v1 / aseed.fav.v1
   Also owns: #menuToggle (body.nav-open + aria-expanded),
              #siteHeader .is-scrolled at scrollY > 10,
              [data-cart-count] auto-update + 'aseed:cartchange' event.
   Plain script, no modules. Everything guarded — no console errors on any page. */
(function () {
  "use strict";

  var CART_KEY = "aseed.cart.v1";
  var FAV_KEY = "aseed.fav.v1";

  /* ---------- storage helpers (guarded: private mode / disabled storage) ---------- */

  function readJSON(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable — keep working in-memory */
    }
  }

  /* ---------- cart ---------- */

  function loadCart() {
    var items = readJSON(CART_KEY, []);
    if (!Array.isArray(items)) return [];
    var clean = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!it || typeof it !== "object") continue;
      if (typeof it.id !== "string" || !it.id) continue;
      var size = it.size == null ? "" : String(it.size);
      var color = it.color == null ? "" : String(it.color);
      var qty = Math.floor(Number(it.qty));
      if (!isFinite(qty) || qty < 1) continue;
      clean.push({
        key: it.id + "|" + size + "|" + color,
        id: it.id,
        size: size,
        color: color,
        qty: qty
      });
    }
    return clean;
  }

  var cartItems = loadCart();

  function persistCart() {
    writeJSON(CART_KEY, cartItems);
  }

  function findProduct(id) {
    var list = window.ASEED_PRODUCTS;
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === id) return list[i];
    }
    return null;
  }

  function cartCount() {
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) total += cartItems[i].qty;
    return total;
  }

  function notifyChange() {
    /* update every [data-cart-count] on the page */
    try {
      var nodes = document.querySelectorAll("[data-cart-count]");
      var n = cartCount();
      for (var i = 0; i < nodes.length; i++) nodes[i].textContent = String(n);
    } catch (e) { /* no-op */ }

    /* dispatch document event 'aseed:cartchange' */
    try {
      var ev;
      if (typeof window.CustomEvent === "function") {
        ev = new CustomEvent("aseed:cartchange", {
          detail: { count: cartCount(), items: AseedCart.items() }
        });
      } else {
        ev = document.createEvent("CustomEvent");
        ev.initCustomEvent("aseed:cartchange", false, false, {
          count: cartCount(),
          items: AseedCart.items()
        });
      }
      document.dispatchEvent(ev);
    } catch (e) { /* no-op */ }
  }

  var AseedCart = {
    /* add(id, {size, color, qty=1}) — merges same id+size+color */
    add: function (id, opts) {
      if (typeof id !== "string" || !id) return;
      opts = opts || {};
      var size = opts.size == null ? "" : String(opts.size);
      var color = opts.color == null ? "" : String(opts.color);
      var qty = Math.floor(Number(opts.qty == null ? 1 : opts.qty));
      if (!isFinite(qty) || qty < 1) qty = 1;
      var key = id + "|" + size + "|" + color;

      var found = null;
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].key === key) { found = cartItems[i]; break; }
      }
      if (found) {
        found.qty += qty;
      } else {
        cartItems.push({ key: key, id: id, size: size, color: color, qty: qty });
      }
      persistCart();
      notifyChange();
    },

    /* items() -> [{key, id, size, color, qty}] (copies) */
    items: function () {
      var out = [];
      for (var i = 0; i < cartItems.length; i++) {
        var it = cartItems[i];
        out.push({ key: it.key, id: it.id, size: it.size, color: it.color, qty: it.qty });
      }
      return out;
    },

    /* updateQty(key, qty) — qty<=0 removes the line */
    updateQty: function (key, qty) {
      var q = Math.floor(Number(qty));
      if (!isFinite(q)) return;
      if (q <= 0) {
        AseedCart.remove(key);
        return;
      }
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].key === key) {
          cartItems[i].qty = q;
          persistCart();
          notifyChange();
          return;
        }
      }
    },

    remove: function (key) {
      var next = [];
      var changed = false;
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].key === key) { changed = true; continue; }
        next.push(cartItems[i]);
      }
      if (changed) {
        cartItems = next;
        persistCart();
        notifyChange();
      }
    },

    clear: function () {
      cartItems = [];
      persistCart();
      notifyChange();
    },

    /* count() — total quantity across lines */
    count: cartCount,

    /* subtotal() — needs window.ASEED_PRODUCTS; unknown ids count as 0 */
    subtotal: function () {
      var total = 0;
      for (var i = 0; i < cartItems.length; i++) {
        var p = findProduct(cartItems[i].id);
        if (p && isFinite(Number(p.price))) total += Number(p.price) * cartItems[i].qty;
      }
      return total;
    }
  };

  /* ---------- favorites ---------- */

  function loadFav() {
    var ids = readJSON(FAV_KEY, []);
    if (!Array.isArray(ids)) return [];
    var clean = [];
    for (var i = 0; i < ids.length; i++) {
      if (typeof ids[i] === "string" && ids[i] && clean.indexOf(ids[i]) === -1) {
        clean.push(ids[i]);
      }
    }
    return clean;
  }

  var favIds = loadFav();

  var AseedFav = {
    /* toggle(id) -> true if now favorited, false if removed */
    toggle: function (id) {
      if (typeof id !== "string" || !id) return false;
      var idx = favIds.indexOf(id);
      var on;
      if (idx === -1) {
        favIds.push(id);
        on = true;
      } else {
        favIds.splice(idx, 1);
        on = false;
      }
      writeJSON(FAV_KEY, favIds);
      return on;
    },

    has: function (id) {
      return favIds.indexOf(id) !== -1;
    },

    all: function () {
      return favIds.slice();
    }
  };

  window.AseedCart = AseedCart;
  window.AseedFav = AseedFav;

  /* ---------- shared header behavior ---------- */

  function initHeader() {
    /* menu toggle: body.nav-open + aria-expanded */
    var toggle = document.getElementById("menuToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    /* close overlay menu when a nav link is chosen (harmless if nav absent) */
    var nav = document.getElementById("siteNav");
    if (nav) {
      nav.addEventListener("click", function (e) {
        var t = e.target;
        while (t && t !== nav) {
          if (t.tagName === "A") {
            document.body.classList.remove("nav-open");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
            break;
          }
          t = t.parentNode;
        }
      });
    }

    /* scroll state: .is-scrolled on #siteHeader when scrollY > 10 */
    var header = document.getElementById("siteHeader");
    if (header) {
      var ticking = false;
      var applyScroll = function () {
        ticking = false;
        var y = window.scrollY != null ? window.scrollY : window.pageYOffset || 0;
        if (y > 10) header.classList.add("is-scrolled");
        else header.classList.remove("is-scrolled");
      };
      window.addEventListener("scroll", function () {
        if (!ticking) {
          ticking = true;
          if (typeof window.requestAnimationFrame === "function") {
            window.requestAnimationFrame(applyScroll);
          } else {
            applyScroll();
          }
        }
      }, { passive: true });
      applyScroll();
    }
  }

  function onReady() {
    initHeader();
    notifyChange(); /* paint [data-cart-count] + initial aseed:cartchange */
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
