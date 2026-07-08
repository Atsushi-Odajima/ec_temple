/* ==========================================================================
   aseed — product.js (Agent PRODUCT — SPECIMEN redesign)
   Product detail page. Depends on js/products.js (ASEED_PRODUCTS,
   ASEED_CATEGORIES, aseedYen), js/cart.js (AseedCart, AseedFav) and
   js/specimen.js (AseedFX — optional, all calls guarded).
   The page degrades to ITEM NOT FOUND if data is unavailable.
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

  /* shared SPECIMEN category → material map */
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

  function $(id) { return document.getElementById(id); }

  function yen(n) {
    if (typeof window.aseedYen === "function") return window.aseedYen(n);
    return "¥" + Number(n).toLocaleString("ja-JP");
  }

  function pad2(n) {
    var v = Math.floor(Number(n));
    if (!isFinite(v) || v < 0) v = 0;
    return (v < 10 ? "0" : "") + v;
  }

  function fx() {
    return window.AseedFX || null;
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

  function lineText(line) {
    var nm = LINE_NAMES[line];
    return String(line) + (nm ? " — " + nm : "");
  }

  function materialText(category) {
    return MATERIALS[category] || "—";
  }

  /* set text on a [data-scramble] element without fighting a running fx:
     stop any scramble timer and refresh its cached original text */
  function setScrambleText(el, text) {
    if (!el) return;
    if (el._fxTimer) {
      clearInterval(el._fxTimer);
      el._fxTimer = null;
    }
    el.textContent = text;
    el.setAttribute("data-fx-orig", text);
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

  /* specimen plate annotations */
  var plateCode = $("plateCode");
  if (plateCode) plateCode.textContent = String(product.id || "").toUpperCase();

  var plateCaption = $("plateCaption");
  if (plateCaption) plateCaption.textContent = "aseed / no." + pad2(product.no);

  var plateCat = $("plateCat");
  if (plateCat) plateCat.textContent = categoryLabel(product.category);

  var plateNum = $("plateNum");
  if (plateNum) plateNum.textContent = pad2(product.no);

  var crumb = $("breadcrumbCategory");
  if (crumb) {
    crumb.textContent = categoryLabel(product.category);
    crumb.href = "store.html?cat=" + encodeURIComponent(product.category);
  }

  var nameEl = $("productName");
  if (nameEl) nameEl.textContent = product.name;

  var nameJaEl = $("productNameJa");
  if (nameJaEl) nameJaEl.textContent = product.nameJa || "";

  /* mono spec strip: NO. / LINE / MATERIAL */
  var specNoEl = $("specNo");
  if (specNoEl) specNoEl.textContent = pad2(product.no);

  var lineEl = $("productLine");
  if (lineEl) lineEl.textContent = lineText(product.line);

  var materialEl = $("specMaterial");
  if (materialEl) materialEl.textContent = materialText(product.category);

  var priceEl = $("productPrice");
  if (priceEl) {
    priceEl.textContent = yen(product.price);
    if (fx() && typeof fx().odometer === "function") fx().odometer(priceEl);
  }

  var descEl = $("productDesc");
  if (descEl) descEl.textContent = product.desc || "";

  /* ---- option selectors — square specimen tags -------------------------- */

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
      setScrambleText(addBtn, "ADDED ✓");
      addBtn.disabled = true;
      if (addedTimer) clearTimeout(addedTimer);
      addedTimer = setTimeout(function () {
        addBtn.classList.remove("is-added");
        setScrambleText(addBtn, "ADD TO CART");
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

  /* ---- related items — spec-card flip cards ------------------------------ */

  function specDl(rows) {
    var dl = document.createElement("dl");
    rows.forEach(function (row) {
      var dt = document.createElement("dt");
      dt.textContent = row[0];
      var dd = document.createElement("dd");
      dd.textContent = row[1];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    return dl;
  }

  function buildSpecCard(p) {
    var href = "product.html?id=" + encodeURIComponent(p.id);

    var card = document.createElement("article");
    card.className = "spec-card related-card";

    var inner = document.createElement("div");
    inner.className = "spec-card__inner";

    /* front — artwork + name + price */
    var front = document.createElement("a");
    front.className = "spec-card__face rc-front";
    front.href = href;
    front.setAttribute("aria-label", p.name + " — " + yen(p.price));

    var no = document.createElement("span");
    no.className = "rc-no";
    no.setAttribute("aria-hidden", "true");
    var noL = document.createElement("span");
    noL.textContent = "NO." + pad2(p.no);
    var noR = document.createElement("span");
    noR.textContent = String(p.id || "").toUpperCase();
    no.appendChild(noL);
    no.appendChild(noR);
    front.appendChild(no);

    var fig = document.createElement("figure");
    fig.className = "rc-figure";
    var im = document.createElement("img");
    im.src = p.image;
    im.alt = p.name;
    im.loading = "lazy";
    im.width = 600;
    im.height = 800;
    fig.appendChild(im);
    front.appendChild(fig);

    var nm = document.createElement("span");
    nm.className = "rc-name";
    nm.textContent = p.name;
    front.appendChild(nm);

    var pr = document.createElement("span");
    pr.className = "rc-price";
    pr.textContent = yen(p.price);
    front.appendChild(pr);

    /* back — mono spec sheet */
    var back = document.createElement("div");
    back.className = "spec-card__face spec-card__back";
    back.appendChild(specDl([
      ["品番", String(p.id || "").toUpperCase()],
      ["LINE", lineText(p.line)],
      ["MATERIAL", materialText(p.category)],
      ["ORIGIN", "ATELIER, TOKYO"]
    ]));

    var foot = document.createElement("div");
    foot.className = "rc-back-foot";
    var st = document.createElement("span");
    st.className = "stitches";
    st.setAttribute("aria-hidden", "true");
    st.innerHTML = "<i></i><i></i><i></i><i></i>";
    var view = document.createElement("a");
    view.className = "rc-view";
    view.href = href;
    view.setAttribute("data-scramble", "");
    view.textContent = "VIEW →";
    foot.appendChild(st);
    foot.appendChild(view);
    back.appendChild(foot);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    return { card: card, price: pr };
  }

  var related = products.filter(function (p) {
    return p && p.category === product.category && p.id !== product.id;
  }).slice(0, 4);

  var relatedSection = $("relatedSection");
  var relatedGrid = $("relatedGrid");
  if (related.length && relatedSection && relatedGrid) {
    relatedSection.hidden = false;
    var priceEls = [];
    related.forEach(function (p) {
      var built = buildSpecCard(p);
      relatedGrid.appendChild(built.card);
      priceEls.push(built.price);
    });

    /* roll related prices when they enter the viewport */
    if (fx() && typeof fx().odometer === "function" &&
        "IntersectionObserver" in window) {
      var oio = new IntersectionObserver(function (entries) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) {
            fx().odometer(entries[k].target);
            oio.unobserve(entries[k].target);
          }
        }
      }, { threshold: 0.35 });
      priceEls.forEach(function (el) { oio.observe(el); });
    }
  }

  /* ---- bind scramble on dynamically rendered nodes ----------------------- */

  if (fx() && typeof fx().bindScramble === "function") {
    fx().bindScramble(document);
  }
})();
