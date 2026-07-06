# aseed — Brand Site & Online Store

Margiela に着想を得た白黒基調のアパレルブランド「aseed」のコンセプトサイト。
静的な HTML / CSS / Vanilla JS のみで構成され、ビルド不要・外部リソース不要で動作します。

## ページ構成

| ページ | 内容 |
|---|---|
| `index.html` | TOP — 文字少なめのミニマルなブランドページ(黒ヒーロー、コレクション、MAISON、STORE 導線) |
| `store.html` | ONLINE STORE — ZOZOTOWN ライクな商品一覧(検索・カテゴリ・並び替え・お気に入り) |
| `product.html?id=as-001` | 商品詳細 — カラー/サイズ選択、数量、カート追加、関連商品 |
| `cart.html` | カート — 数量変更、送料計算(¥30,000 以上で送料無料)、デモ購入モーダル |
| `about.html` | MAISON — ブランド哲学、LINES 0–9、アトリエ情報 |

## 起動方法

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 実装メモ

- 商品データ: `js/products.js`(全 24 アイテム、ライン番号 0–9 で分類)
- カート / お気に入り: `js/cart.js`(localStorage 永続化、`aseed:cartchange` イベント)
- デザインシステム: `css/style.css`(デザイントークン、共通ヘッダー/フッター、フォーステッチモチーフ)
- 商品画像: `assets/img/p01–p24.svg`(手描きのフラットな仕様画スタイル、モノクロ)
- 本サイトはコンセプトデモです。実際の注文処理は行われません。
