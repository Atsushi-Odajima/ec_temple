/* ============================================================
   aseed — cart-page.js (Agent CART)
   Renders cart.html: line items, order summary, THANK YOU modal.
   Depends on js/products.js (ASEED_PRODUCTS, aseedYen) and
   js/cart.js (AseedCart, 'aseed:cartchange'). Everything guarded.
   ============================================================ */
(function () {
  "use strict";

  var SHIPPING_FEE = 800;
  var FREE_SHIPPING_MIN = 30000;
  var QTY_MAX = 99;

  var content = document.getElementById("cartContent");
  var meta = document.getElementById("cartMeta");
  var modal = document.getElementById("checkoutModal");
  var modalBackdrop = document.getElementById("checkoutModalBackdrop");
  var modalClose = document.getElementById("checkoutModalClose");

  if (!content) return;

  /* ---------- helpers ---------- */

  function yen(n) {
    if (typeof window.aseedYen === "function") return window.aseedYen(n);
    return "¥" + Number(n || 0).toLocaleString("ja-JP");
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cart() {
    return window.AseedCart || null;
  }

  function productOf(id) {
    var list = window.ASEED_PRODUCTS;
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === id) return list[i];
    }
    return null;
  }

  /* ---------- rendering ---------- */

  function itemHtml(item, product) {
    var url = "product.html?id=" + encodeURIComponent(item.id);
    var lineTotal = product.price * item.qty;
    var key = esc(item.key);
    return (
      '<li class="cart-item" data-key="' + key + '">' +
        '<a class="cart-item__thumb" href="' + url + '" tabindex="-1" aria-hidden="true">' +
          '<img src="' + esc(product.image) + '" alt="" width="600" height="800">' +
        "</a>" +
        '<div class="cart-item__info">' +
          '<p class="cart-item__brand">aseed</p>' +
          '<a class="cart-item__name" href="' + url + '">' +
            '<span class="cart-item__name-en">' + esc(product.name) + "</span>" +
            '<span class="cart-item__name-ja">' + esc(product.nameJa) + "</span>" +
          "</a>" +
          '<p class="cart-item__variant">COLOR: ' + esc(item.color) + "　/　SIZE: " + esc(item.size) + "</p>" +
          '<p class="cart-item__unit">単価 ' + yen(product.price) + "</p>" +
        "</div>" +
        '<button type="button" class="cart-item__remove" data-act="remove" data-key="' + key + '" aria-label="' +
          esc(product.name) + ' を削除">×</button>' +
        '<div class="cart-item__foot">' +
          '<div class="qty-stepper" role="group" aria-label="数量">' +
            '<button type="button" class="qty-btn" data-act="dec" data-key="' + key + '" aria-label="数量を減らす">−</button>' +
            '<input class="qty-input" type="number" min="1" max="' + QTY_MAX + '" step="1" value="' + item.qty +
              '" data-key="' + key + '" aria-label="数量">' +
            '<button type="button" class="qty-btn" data-act="inc" data-key="' + key + '" aria-label="数量を増やす">＋</button>' +
          "</div>" +
          '<p class="cart-item__line-total">' + yen(lineTotal) + "</p>" +
        "</div>" +
      "</li>"
    );
  }

  function summaryHtml(subtotal) {
    var free = subtotal >= FREE_SHIPPING_MIN;
    var shipping = free ? 0 : SHIPPING_FEE;
    var total = subtotal + shipping;
    var html =
      '<aside class="order-summary" aria-label="注文内容">' +
        '<h2 class="order-summary__title">ORDER SUMMARY</h2>' +
        "<dl>" +
          '<div class="summary-row"><dt>小計</dt><dd>' + yen(subtotal) + "</dd></div>" +
          '<div class="summary-row"><dt>配送料</dt><dd>' +
            (free ? '<span class="ship-free">FREE</span>' : yen(SHIPPING_FEE)) +
          "</dd></div>" +
        "</dl>";
    if (!free) {
      html += '<p class="ship-hint">あと' + yen(FREE_SHIPPING_MIN - subtotal) +
        "で送料無料</p>";
    }
    html +=
        '<dl><div class="summary-row summary-row--total"><dt>合計（税込）</dt><dd>' +
          yen(total) + "</dd></div></dl>" +
        '<button type="button" class="checkout-btn" id="checkoutBtn">CHECKOUT</button>' +
        '<p class="summary-note">※ これはコンセプトストアのデモです。決済は発生しません。</p>' +
      "</aside>";
    return html;
  }

  function render() {
    var c = cart();
    var items = c && typeof c.items === "function" ? c.items() : [];
    var rows = [];
    var subtotal = 0;

    for (var i = 0; i < items.length; i++) {
      var product = productOf(items[i].id);
      if (!product) continue; // unknown id — skip defensively
      subtotal += product.price * items[i].qty;
      rows.push(itemHtml(items[i], product));
    }

    if (meta) {
      var count = c && typeof c.count === "function" ? c.count() : 0;
      meta.textContent = rows.length ? count + (count === 1 ? " ITEM" : " ITEMS") : "";
    }

    if (!rows.length) {
      content.innerHTML =
        '<div class="cart-empty">' +
          '<div class="stitches" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
          '<p class="cart-empty__text">カートは空です</p>' +
          '<a class="cart-empty__btn" href="store.html">ENTER STORE</a>' +
        "</div>";
      return;
    }

    content.innerHTML =
      '<div class="cart-layout">' +
        "<div>" +
          '<ul class="cart-items">' + rows.join("") + "</ul>" +
          '<a class="continue-link" href="store.html">← CONTINUE SHOPPING</a>' +
        "</div>" +
        summaryHtml(subtotal) +
      "</div>";
  }

  /* ---------- interactions (event delegation) ---------- */

  function qtyOf(key) {
    var c = cart();
    if (!c) return 0;
    var items = c.items();
    for (var i = 0; i < items.length; i++) {
      if (items[i].key === key) return items[i].qty;
    }
    return 0;
  }

  content.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-act]") : null;
    if (btn) {
      var c = cart();
      if (!c) return;
      var key = btn.getAttribute("data-key");
      var act = btn.getAttribute("data-act");
      if (act === "remove") {
        c.remove(key);
      } else if (act === "inc") {
        c.updateQty(key, Math.min(QTY_MAX, qtyOf(key) + 1));
      } else if (act === "dec") {
        c.updateQty(key, qtyOf(key) - 1); // qty<=0 removes per cart.js contract
      }
      return;
    }
    if (e.target && e.target.id === "checkoutBtn") {
      openModal();
    }
  });

  content.addEventListener("change", function (e) {
    var input = e.target;
    if (!input || !input.classList || !input.classList.contains("qty-input")) return;
    var c = cart();
    if (!c) return;
    var key = input.getAttribute("data-key");
    var qty = parseInt(input.value, 10);
    if (isNaN(qty)) qty = 1;
    qty = Math.max(1, Math.min(QTY_MAX, qty));
    c.updateQty(key, qty);
  });

  /* ---------- THANK YOU modal ---------- */

  var lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("checkout-modal-open");
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("checkout-modal-open");
    if (lastFocused && typeof lastFocused.focus === "function" &&
        document.contains(lastFocused)) {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      // Confirm: clear the cart, then close; cart.js dispatches
      // 'aseed:cartchange' on clear() which re-renders the page.
      var c = cart();
      if (c && typeof c.clear === "function") c.clear();
      closeModal();
    });
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  /* ---------- lifecycle ---------- */

  document.addEventListener("aseed:cartchange", render);
  render();
})();
