/* ============================================================
   aseed — store.js (Agent STORE)
   Client-side listing: category filter / search / sort /
   favorites-only, all re-rendered in place.
   Depends on: js/products.js (ASEED_PRODUCTS, ASEED_CATEGORIES,
   aseedYen) and js/cart.js (AseedFav). Everything guarded.
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

    /* ---------- category chips ---------- */
    function renderCats() {
      if (!catList) return;
      catList.innerHTML = "";
      categories.forEach(function (c) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cat-chip" + (state.cat === c.key ? " is-active" : "");
        btn.textContent = c.label;
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

    /* ---------- card ---------- */
    function buildCard(p) {
      var li = document.createElement("li");
      li.className = "p-card";

      var a = document.createElement("a");
      a.className = "p-card-link";
      a.href = "product.html?id=" + encodeURIComponent(p.id);

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
      media.appendChild(fav);

      var info = document.createElement("div");
      info.className = "p-card-info";

      var brand = document.createElement("p");
      brand.className = "p-card-brand";
      brand.textContent = "aseed";

      var name = document.createElement("h2");
      name.className = "p-card-name";
      name.textContent = p.name;

      var price = document.createElement("p");
      price.className = "p-card-price";
      price.textContent = yen(p.price);

      info.appendChild(brand);
      info.appendChild(name);
      info.appendChild(price);

      a.appendChild(media);
      a.appendChild(info);
      li.appendChild(a);
      return li;
    }

    /* ---------- render ---------- */
    function render() {
      var items = visibleItems();
      grid.innerHTML = "";
      var frag = document.createDocumentFragment();
      items.forEach(function (p) { frag.appendChild(buildCard(p)); });
      grid.appendChild(frag);

      if (countEl) countEl.textContent = String(items.length);
      if (emptyEl) emptyEl.hidden = items.length > 0;
      grid.hidden = items.length === 0;
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
