/* ============================================================
   aseed — store.js (Agent STORE) · SPECIMEN redesign
   Client-side listing: category filter / search / sort /
   favorites-only, re-rendered in place as .spec-card 3D flip
   cards (FRONT artwork + name/price, BACK mono spec sheet).
   Depends on: js/products.js (ASEED_PRODUCTS, ASEED_CATEGORIES,
   aseedYen), js/cart.js (AseedFav) and js/specimen.js
   (AseedFX.bindScramble / odometer). Everything guarded.
   ============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var products = window.ASEED_PRODUCTS;
    var categories = window.ASEED_CATEGORIES;
    if (!Array.isArray(products) || !Array.isArray(categories)) return;

    var grid = document.getElementById("storeGrid");
    var emptyEl = document.getElementById("storeEmpty");
    var countEl = document.getElementById("storeCount");
    var catList = document.getElementById("catList");
    var searchInput = document.getElementById("storeSearch");
    var sortSelect = document.getElementById("storeSort");
    var favToggle = document.getElementById("favToggle");
    if (!grid) return;

    var yen = typeof window.aseedYen === "function"
      ? window.aseedYen
      : function (n) { return "¥" + Number(n).toLocaleString("ja-JP"); };

    /* SPECIMEN shared category → material map (see spec) */
    var MATERIALS = {
      outer: "WOOL 100%",
      jacket: "WOOL 80% · NYLON 20%",
      knit: "WOOL 100%",
      shirt: "COTTON 100%",
      cutsewn: "COTTON 100%",
      pants: "WOOL 60% · POLYESTER 40%",
      denim: "COTTON 100%",
      bag: "COW LEATHER",
      shoes: "CALF LEATHER",
      accessory: "SILVER 925"
    };

    var state = {
      cat: "all",
      query: "",
      sort: "new",
      favOnly: false
    };

    /* --- read ?cat= on load --- */
    try {
      var params = new URLSearchParams(window.location.search);
      var cat = params.get("cat");
      if (cat && categories.some(function (c) { return c.key === cat; })) {
        state.cat = cat;
      }
    } catch (e) { /* very old browsers: keep default */ }

    /* ---------- helpers ---------- */
    function pad2(n) {
      n = Number(n) || 0;
      return (n < 10 ? "0" : "") + n;
    }

    function fx() {
      return window.AseedFX || null;
    }

    function bindScrambleIn(root) {
      var f = fx();
      if (f && typeof f.bindScramble === "function") f.bindScramble(root);
    }

    /* ---------- category chips (tiny mono tags) ---------- */
    function renderCats() {
      if (!catList) return;
      catList.innerHTML = "";
      categories.forEach(function (c) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cat-chip" + (state.cat === c.key ? " is-active" : "");
        btn.textContent = c.label;
        btn.setAttribute("data-scramble", "");
        btn.setAttribute("aria-pressed", state.cat === c.key ? "true" : "false");
        btn.addEventListener("click", function () {
          state.cat = c.key;
          renderCats();
          render();
          syncUrl();
        });
        li.appendChild(btn);
        catList.appendChild(li);
      });
      bindScrambleIn(catList);
    }

    function syncUrl() {
      if (!window.history || !window.history.replaceState) return;
      try {
        var url = state.cat === "all"
          ? window.location.pathname
          : window.location.pathname + "?cat=" + encodeURIComponent(state.cat);
        window.history.replaceState(null, "", url);
      } catch (e) { /* file:// etc. — non-fatal */ }
    }

    /* ---------- filtering / sorting ---------- */
    function favHas(id) {
      return !!(window.AseedFav && typeof window.AseedFav.has === "function" &&
        window.AseedFav.has(id));
    }

    function visibleItems() {
      var q = state.query.trim().toLowerCase();
      var items = products.filter(function (p) {
        if (state.cat !== "all" && p.category !== state.cat) return false;
        if (state.favOnly && !favHas(p.id)) return false;
        if (q) {
          var hay = (
            (p.name || "") + " " + (p.nameJa || "") + " " + (p.category || "")
          ).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });

      items = items.slice();
      if (state.sort === "price-asc") {
        items.sort(function (a, b) { return a.price - b.price; });
      } else if (state.sort === "price-desc") {
        items.sort(function (a, b) { return b.price - a.price; });
      } else {
        /* 新着順: releaseAt desc, stable tiebreak on no desc */
        items.sort(function (a, b) {
          var d = String(b.releaseAt || "").localeCompare(String(a.releaseAt || ""));
          return d !== 0 ? d : (b.no || 0) - (a.no || 0);
        });
      }
      return items;
    }

    /* ---------- spec sheet (back face) ---------- */
    function buildBack(p) {
      var back = document.createElement("div");
      /* __face gives it backface-visibility:hidden — required so the
         back sheet is invisible (not mirrored) until the card flips */
      back.className = "spec-card__face spec-card__back";
      /* purely visual duplicate of front data — hide from AT */
      back.setAttribute("aria-hidden", "true");

      var top = document.createElement("div");

      var no = document.createElement("p");
      no.className = "p-back-no";
      var noL = document.createElement("span");
      noL.textContent = "SPECIMEN";
      var noR = document.createElement("span");
      noR.textContent = "NO." + pad2(p.no);
      no.appendChild(noL);
      no.appendChild(noR);
      top.appendChild(no);

      var dl = document.createElement("dl");
      var rows = [
        ["品番", String(p.id || "").toUpperCase()],
        ["LINE", "LINE " + (p.line != null ? p.line : 0)],
        ["MATERIAL", MATERIALS[p.category] || "—"],
        ["ORIGIN", "ATELIER, TOKYO"]
      ];
      rows.forEach(function (row) {
        var dt = document.createElement("dt");
        dt.textContent = row[0];
        var dd = document.createElement("dd");
        dd.textContent = row[1];
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
      top.appendChild(dl);

      var bottom = document.createElement("div");
      bottom.className = "p-back-bottom";

      var stitches = document.createElement("span");
      stitches.className = "p-stitch4";
      for (var i = 0; i < 4; i++) stitches.appendChild(document.createElement("i"));

      var view = document.createElement("span");
      view.className = "p-view";
      var viewWord = document.createElement("span");
      viewWord.textContent = "VIEW";
      viewWord.setAttribute("data-scramble", "");
      var viewArr = document.createElement("span");
      viewArr.className = "p-view-arr";
      viewArr.textContent = "→";
      view.appendChild(viewWord);
      view.appendChild(viewArr);

      bottom.appendChild(stitches);
      bottom.appendChild(view);

      back.appendChild(top);
      back.appendChild(bottom);
      return back;
    }

    /* ---------- card ---------- */
    function buildCard(p, index) {
      var li = document.createElement("li");
      li.className = "p-card spec-card";
      li.style.animationDelay = Math.min(index * 28, 280) + "ms";

      var a = document.createElement("a");
      a.className = "p-card-link";
      a.href = "product.html?id=" + encodeURIComponent(p.id);

      /* mono annotation — outside the flipping inner */
      var meta = document.createElement("span");
      meta.className = "p-card-meta";
      meta.setAttribute("aria-hidden", "true");
      var metaNo = document.createElement("span");
      metaNo.textContent = "NO." + pad2(p.no);
      metaNo.setAttribute("data-scramble", "");
      var metaId = document.createElement("span");
      metaId.textContent = String(p.id || "").toUpperCase();
      metaId.setAttribute("data-scramble", "");
      meta.appendChild(metaNo);
      meta.appendChild(metaId);

      /* 3D flip inner */
      var inner = document.createElement("div");
      inner.className = "spec-card__inner";

      /* FRONT: artwork + NEW + name + price */
      var front = document.createElement("div");
      front.className = "spec-card__face p-card-front";

      var media = document.createElement("div");
      media.className = "p-card-media";

      var img = document.createElement("img");
      img.src = p.image;
      img.alt = p.name + " — " + (p.nameJa || "");
      img.loading = "lazy";
      img.width = 600;
      img.height = 800;
      media.appendChild(img);

      if (p.isNew) {
        var tag = document.createElement("span");
        tag.className = "p-tag-new";
        tag.textContent = "NEW";
        media.appendChild(tag);
      }

      var cap = document.createElement("div");
      cap.className = "p-card-cap";

      var name = document.createElement("h2");
      name.className = "p-card-name";
      name.textContent = p.name;
      if (p.nameJa) {
        var ja = document.createElement("small");
        ja.className = "p-card-name-ja";
        ja.textContent = p.nameJa;
        name.appendChild(ja);
      }

      var price = document.createElement("p");
      price.className = "p-card-price";
      price.textContent = yen(p.price);
      price.setAttribute("data-pid", p.id);

      cap.appendChild(name);
      cap.appendChild(price);

      front.appendChild(media);
      front.appendChild(cap);

      inner.appendChild(front);
      inner.appendChild(buildBack(p));

      a.appendChild(meta);
      a.appendChild(inner);
      li.appendChild(a);

      /* favorite heart — SIBLING of the link, outside the flipping
         inner: it never rotates and stays clickable at all times */
      var fav = document.createElement("button");
      fav.type = "button";
      fav.className = "p-fav" + (favHas(p.id) ? " is-active" : "");
      fav.textContent = favHas(p.id) ? "♥" : "♡";
      fav.setAttribute("aria-label", "お気に入りに追加: " + p.name);
      fav.setAttribute("aria-pressed", favHas(p.id) ? "true" : "false");
      fav.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (window.AseedFav && typeof window.AseedFav.toggle === "function") {
          window.AseedFav.toggle(p.id);
        }
        var on = favHas(p.id);
        fav.classList.toggle("is-active", on);
        fav.textContent = on ? "♥" : "♡";
        fav.setAttribute("aria-pressed", on ? "true" : "false");
        /* favorites-only view: removing a fav should drop the card */
        if (state.favOnly && !on) render();
      });
      li.appendChild(fav);

      return li;
    }

    /* ---------- odometer prices (roll once per product, on entry) ---- */
    var odoSeen = {};
    var priceIO = null;

    function observePrices() {
      var f = fx();
      if (!f || typeof f.odometer !== "function") return;
      if (!("IntersectionObserver" in window)) return;
      if (priceIO) priceIO.disconnect();
      priceIO = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          var el = entries[i].target;
          odoSeen[el.getAttribute("data-pid")] = true;
          f.odometer(el);
          priceIO.unobserve(el);
        }
      }, { threshold: 0.35 });
      var prices = grid.querySelectorAll(".p-card-price[data-pid]");
      for (var i = 0; i < prices.length; i++) {
        if (!odoSeen[prices[i].getAttribute("data-pid")]) priceIO.observe(prices[i]);
      }
    }

    /* ---------- render ---------- */
    function render() {
      var items = visibleItems();
      grid.innerHTML = "";
      var frag = document.createDocumentFragment();
      items.forEach(function (p, i) { frag.appendChild(buildCard(p, i)); });
      grid.appendChild(frag);

      if (countEl) countEl.textContent = String(items.length);
      if (emptyEl) emptyEl.hidden = items.length > 0;
      grid.hidden = items.length === 0;

      /* wire SPECIMEN fx on freshly rendered nodes */
      bindScrambleIn(grid);
      observePrices();
    }

    /* ---------- toolbar events ---------- */
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value;
        render();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        render();
      });
    }

    if (favToggle) {
      favToggle.addEventListener("click", function () {
        state.favOnly = !state.favOnly;
        favToggle.setAttribute("aria-pressed", state.favOnly ? "true" : "false");
        var heart = favToggle.querySelector(".fav-filter-heart");
        if (heart) heart.textContent = state.favOnly ? "♥" : "♡";
        render();
      });
    }

    renderCats();
    render();
  });
})();
