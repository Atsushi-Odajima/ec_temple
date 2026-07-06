/* ==========================================================================
   aseed — product.js (Agent PRODUCT)
   Product detail page. Depends on js/products.js (ASEED_PRODUCTS,
   ASEED_CATEGORIES, aseedYen) and js/cart.js (AseedCart, AseedFav).
   All access is guarded — the page degrades to ITEM NOT FOUND if data
   is unavailable.
   ========================================================================== */

(function () {
  "use strict";

  var LINE_NAMES = {
    0: "ARTISANAL",
    1: "WOMEN",
    2: "MEN",
    3: "SHIRTING",
    4: "KNIT",
    5: "DENIM & WORK",
    6: "OBJECTS",
    7: "FOOTWEAR",
    8: "SILVER & ACCESSORY",
    9: "EDITIONS"
  };

  function $(id) { return document.getElementById(id); }

  function yen(n) {
    if (typeof window.aseedYen === "function") return window.aseedYen(n);
    return "¥" + Number(n).toLocaleString("ja-JP");
  }

  function categoryLabel(key) {
    var cats = window.ASEED_CATEGORIES;
    if (Array.isArray(cats)) {
      for (var i = 0; i < cats.length; i++) {
        if (cats[i] && cats[i].key === key) return cats[i].label;
      }
    }
    return String(key || "").toUpperCase();
  }

  function showNotFound() {
    var nf = $("notFound");
    var detail = $("productDetail");
    if (nf) nf.hidden = false;
    if (detail) detail.hidden = true;
    document.title = "aseed — ITEM NOT FOUND";
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var products = Array.isArray(window.ASEED_PRODUCTS) ? window.ASEED_PRODUCTS : [];
  var product = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i] && products[i].id === id) { product = products[i]; break; }
  }

  if (!product) {
    showNotFound();
    return;
  }

  /* ---- state ---------------------------------------------------------- */

  var state = {
    color: (product.colors && product.colors.length === 1) ? product.colors[0] : null,
    size: (product.sizes && product.sizes.length === 1) ? product.sizes[0] : null,
    qty: 1
  };
  var QTY_MIN = 1;
  var QTY_MAX = 9;
  var addedTimer = null;
  var toastTimer = null;

  /* ---- static render --------------------------------------------------- */

  document.title = "aseed — " + product.name;

  var detail = $("productDetail");
  if (detail) detail.hidden = false;

  var img = $("productImage");
  if (img) {
    img.src = product.image;
    img.alt = product.name + " — " + (product.nameJa || "");
  }

  var crumb = $("breadcrumbCategory");
  if (crumb) {
    crumb.textContent = categoryLabel(product.category);
    crumb.href = "store.html?cat=" + encodeURIComponent(product.category);
  }

  var nameEl = $("productName");
  if (nameEl) nameEl.textContent = product.name;

  var nameJaEl = $("productNameJa");
  if (nameJaEl) nameJaEl.textContent = product.nameJa || "";

  var lineEl = $("productLine");
  if (lineEl) {
    var lineName = LINE_NAMES[product.line];
    lineEl.textContent = "LINE " + product.line + (lineName ? " — " + lineName : "");
  }

  var priceEl = $("productPrice");
  if (priceEl) priceEl.textContent = yen(product.price);

  var descEl = $("productDesc");
  if (descEl) descEl.textContent = product.desc || "";

  /* ---- option selectors ------------------------------------------------ */

  function renderOptions(containerId, values, kind) {
    var container = $(containerId);
    if (!container) return;
    container.textContent = "";
    (values || []).forEach(function (value) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.value = value;
      btn.setAttribute("aria-pressed", "false");
      if (kind === "color") {
        var sw = document.createElement("span");
        sw.className = "swatch swatch--" + String(value).toLowerCase();
        sw.setAttribute("aria-hidden", "true");
        btn.appendChild(sw);
      }
      btn.appendChild(document.createTextNode(value));
      btn.addEventListener("click", function () {
        state[kind] = value;
        syncOptions(containerId, kind);
        syncAddButton();
      });
      container.appendChild(btn);
    });
    syncOptions(containerId, kind);
  }

  function syncOptions(containerId, kind) {
    var container = $(containerId);
    if (!container) return;
    var btns = container.querySelectorAll(".option-btn");
    for (var j = 0; j < btns.length; j++) {
      var on = btns[j].dataset.value === state[kind];
      btns[j].classList.toggle("is-selected", on);
      btns[j].setAttribute("aria-pressed", on ? "true" : "false");
    }
    var valueEl = $(kind === "color" ? "colorValue" : "sizeValue");
    if (valueEl) valueEl.textContent = state[kind] ? "— " + state[kind] : "";
  }

  renderOptions("colorOptions", product.colors, "color");
  renderOptions("sizeOptions", product.sizes, "size");

  /* ---- qty stepper ------------------------------------------------------ */

  function syncQty() {
    var v = $("qtyValue");
    if (v) v.textContent = String(state.qty);
    var minus = $("qtyMinus");
    var plus = $("qtyPlus");
    if (minus) minus.disabled = state.qty <= QTY_MIN;
    if (plus) plus.disabled = state.qty >= QTY_MAX;
  }

  var qtyMinus = $("qtyMinus");
  var qtyPlus = $("qtyPlus");
  if (qtyMinus) qtyMinus.addEventListener("click", function () {
    if (state.qty > QTY_MIN) { state.qty--; syncQty(); }
  });
  if (qtyPlus) qtyPlus.addEventListener("click", function () {
    if (state.qty < QTY_MAX) { state.qty++; syncQty(); }
  });
  syncQty();

  /* ---- add to cart ------------------------------------------------------ */

  var addBtn = $("addToCart");
  var hintEl = $("selectHint");

  function syncAddButton() {
    var ready = !!(state.color && state.size);
    if (addBtn && !addBtn.classList.contains("is-added")) {
      addBtn.disabled = !ready;
    }
    if (hintEl) hintEl.textContent = ready ? "" : "カラーとサイズを選択してください";
  }
  syncAddButton();

  function showToast() {
    var toast = $("cartToast");
    if (!toast) return;
    toast.classList.add("is-shown");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-shown");
    }, 3500);
  }

  if (addBtn) {
    addBtn.addEventListener("click", function () {
      if (!state.color || !state.size) return;
      if (window.AseedCart && typeof window.AseedCart.add === "function") {
        window.AseedCart.add(product.id, {
          size: state.size,
          color: state.color,
          qty: state.qty
        });
      }
      addBtn.classList.add("is-added");
      addBtn.textContent = "ADDED ✓";
      addBtn.disabled = true;
      if (addedTimer) clearTimeout(addedTimer);
      addedTimer = setTimeout(function () {
        addBtn.classList.remove("is-added");
        addBtn.textContent = "ADD TO CART";
        syncAddButton();
      }, 1500);
      showToast();
    });
  }

  /* ---- favorites -------------------------------------------------------- */

  var favBtn = $("favToggle");

  function syncFav() {
    if (!favBtn) return;
    var has = !!(window.AseedFav && typeof window.AseedFav.has === "function" &&
                 window.AseedFav.has(product.id));
    favBtn.classList.toggle("is-active", has);
    favBtn.setAttribute("aria-pressed", has ? "true" : "false");
    var heart = favBtn.querySelector(".fav-heart");
    var text = favBtn.querySelector(".fav-text");
    if (heart) heart.textContent = has ? "♥" : "♡";
    if (text) text.textContent = has ? "ADDED TO FAVORITES" : "ADD TO FAVORITES";
  }

  if (favBtn) {
    favBtn.addEventListener("click", function () {
      if (window.AseedFav && typeof window.AseedFav.toggle === "function") {
        window.AseedFav.toggle(product.id);
      }
      syncFav();
    });
  }
  syncFav();

  /* ---- related items ---------------------------------------------------- */

  var related = products.filter(function (p) {
    return p && p.category === product.category && p.id !== product.id;
  }).slice(0, 4);

  var relatedSection = $("relatedSection");
  var relatedGrid = $("relatedGrid");
  if (related.length && relatedSection && relatedGrid) {
    relatedSection.hidden = false;
    related.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "related-card";
      a.href = "product.html?id=" + encodeURIComponent(p.id);

      var fig = document.createElement("figure");
      var im = document.createElement("img");
      im.src = p.image;
      im.alt = p.name;
      im.loading = "lazy";
      fig.appendChild(im);
      a.appendChild(fig);

      var brand = document.createElement("p");
      brand.className = "rc-brand";
      brand.textContent = "aseed";
      a.appendChild(brand);

      var nm = document.createElement("p");
      nm.className = "rc-name";
      nm.textContent = p.name;
      a.appendChild(nm);

      var pr = document.createElement("p");
      pr.className = "rc-price";
      pr.textContent = yen(p.price);
      a.appendChild(pr);

      relatedGrid.appendChild(a);
    });
  }
})();
