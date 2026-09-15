# aseed — Quiet forms. Everyday life.

A Japanese / English apparel concept store combining editorial art direction and a complete shopping demo.

ブランドの空気感と、最後まで使える買い物体験をひとつにした、アパレルECの自主制作ポートフォリオです。

![aseed — collection campaign](assets/photos/hero.webp)

## Explore / 体験する

- [Store / ストア](https://atsushi-odajima.github.io/ec_temple/)
- [Case study / 制作事例](https://atsushi-odajima.github.io/ec_temple/case-study.html)
- [English case study](https://atsushi-odajima.github.io/ec_temple/case-study.html?lang=en)

## The experience

- 25 apparel concepts, including the **aseed logo tee** in white and black.
- Consistent photographic imagery, colour-specific views, and front/back/styling/detail galleries for six featured pieces.
- Search, categories, sorting, saved items, and URL-based filter state.
- Product-specific materials, care, measurements and per-variant demo inventory.
- Device-local bag, quantity controls and automatic shipping calculations.
- Delivery → payment → review → completion, with editable details and downloadable demo summaries.
- A contact-form demo, client-care pages, commerce disclosure, privacy policy and terms.
- Japanese / English interface, responsive layouts, keyboard focus, native dialogs and reduced-motion support.
- A bilingual case study explaining design decisions, implementation and AI assistance.

## Demo scope / デモの範囲

**No real orders, payments, shipments or emails are processed.** Images are AI-generated concepts. Prices, stock, material specifications and measurements are sample data. No fictional seller address, telephone number or functioning sales mailbox is presented as real.

実注文・決済・配送・メール送信はありません。画像はAI生成、商品情報・在庫はサンプルです。フォームは入力例でお試しください。氏名・住所・メール・問い合わせ本文は保存・送信されず、入力画面のメモリ内だけで扱います。

Local storage retains language, product selections and saved product IDs. The tab session retains a demo reference and item totals without personal details. Clear controls are available on the privacy page.

## Run locally

Use Node.js **24.15 or later** (tested on 24.16). No production dependencies; jsdom is a development-only test dependency.

```sh
npm ci
npm run dev
# http://127.0.0.1:8765
npm test
npm run build
```

The build prerenders 41 HTML pages, checks every colour and featured gallery asset, validates local references, and writes static output to dist/.

## Structure

| Path | Purpose |
| --- | --- |
| js/core.mjs | Cart normalization, stock limits, totals and validation |
| js/catalog.mjs | 25 product concepts and per-item specifications |
| js/image-manifest.mjs | Product / colour / view mappings |
| js/views.mjs, js/info.mjs, js/checkout.mjs | Pages, policies and checkout |
| js/app.mjs | Client interactions and device-local state |
| css/atelier.css | Responsive editorial design system |
| tests/ | Domain, rendering and DOM interaction tests |
| assets/photos/ | Optimized generated photographs |
| data/image-provenance.json | Exact image prompts and generation mode |

The HTML / CSS / Vanilla JavaScript architecture is retained. Earlier implementation files and illustrations remain as reference; the published store uses the new modules and photographs.

## Validation

- Unit tests: shipping thresholds, inventory caps, invalid selections, malformed storage and input validation.
- Rendering tests: all routes and products in both languages.
- jsdom interaction tests: variant selection, language changes, cart actions, checkout editing/completion, duplicate-submit protection and the contact result. These are DOM tests, not visual browser tests.
- WebMCP checked in the supported preview: search, bag read/add/remove, sold-out and missing-item rejection.
- No unmeasured conversion uplift or invented customer endorsements are claimed.

## Authorship / 制作について

Personal project by **Atsushi Odajima**. Initial implementation used Claude Code; this redesign used Codex and built-in image generation for implementation, copy and assets. Brand direction, scope and acceptance were selected by the creator. AI assistance is disclosed in the case study.

## Before retail launch

Provide verified seller/contact details, actual product photographs/specifications, final commercial terms, server-side order/inventory validation, payment integration and verified email delivery. This site remains a portfolio demo.

References: [Consumer Affairs Agency](https://www.no-trouble.caa.go.jp/what/mailorder/) · [Personal Information Protection Commission](https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/)
