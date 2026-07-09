/* aseed — product data (Agent DATA)
   Exposes: window.ASEED_PRODUCTS, window.ASEED_CATEGORIES, window.aseedYen(n)
   Plain script, no modules. */
(function () {
  "use strict";

  var ASEED_PRODUCTS = [
    /* ---- OUTER ×3 (p01–p03) ---- */
    {
      id: "as-001",
      no: 1,
      line: 0,
      name: "RAW-EDGE WOOL COAT",
      nameJa: "ロウエッジ ウールコート",
      category: "outer",
      price: 176000,
      colors: ["BLACK", "ECRU"],
      sizes: ["1", "2", "3"],
      desc: "解体と再構築。裁ち落としたままの裾が、完成という概念を静かに拒む。圧縮ウールの深い量感に、仮縫いのステッチだけが痕跡として残る。",
      isNew: true,
      releaseAt: "2026-06-20",
      image: "assets/img/p01.svg"
    },
    {
      id: "as-002",
      no: 2,
      line: 1,
      name: "OVERSIZED TRENCH COAT",
      nameJa: "オーバーサイズ トレンチコート",
      category: "outer",
      price: 143000,
      colors: ["ECRU", "BLACK"],
      sizes: ["1", "2", "3"],
      desc: "誰かの記憶にあるトレンチを、二回り大きく複製した。肩線は落ち、匿名の輪郭だけが街に残る。",
      isNew: false,
      releaseAt: "2026-03-14",
      image: "assets/img/p02.svg"
    },
    {
      id: "as-003",
      no: 3,
      line: 2,
      name: "PADDED LINER COAT",
      nameJa: "パデッド ライナーコート",
      category: "outer",
      price: 118800,
      colors: ["BLACK", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "本来は内側にあるべきライナーを、外套として独立させた。裏地の美しさは、隠されている必要がない。",
      isNew: false,
      releaseAt: "2026-02-27",
      image: "assets/img/p03.svg"
    },

    /* ---- JACKET ×3 (p04–p06) ---- */
    {
      id: "as-004",
      no: 4,
      line: 2,
      name: "DECONSTRUCTED BLAZER",
      nameJa: "デコンストラクテッド ブレザー",
      category: "jacket",
      price: 96800,
      colors: ["BLACK"],
      sizes: ["1", "2", "3"],
      desc: "芯地と肩パッドを取り去り、テーラリングの骨格だけを残した。正装の記号が、着る人の身体に従属しはじめる。",
      isNew: true,
      releaseAt: "2026-06-12",
      image: "assets/img/p04.svg"
    },
    {
      id: "as-005",
      no: 5,
      line: 0,
      name: "INSIDE-OUT WORK JACKET",
      nameJa: "インサイドアウト ワークジャケット",
      category: "jacket",
      price: 85800,
      colors: ["ECRU", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "縫い代、パイピング、ポケット袋。服の内側で働いていた構造を、そのまま表として提示する一着。",
      isNew: false,
      releaseAt: "2026-04-03",
      image: "assets/img/p05.svg"
    },
    {
      id: "as-006",
      no: 6,
      line: 1,
      name: "COLLARLESS SHIRT JACKET",
      nameJa: "カラーレス シャツジャケット",
      category: "jacket",
      price: 74800,
      colors: ["WHITE", "BLACK"],
      sizes: ["1", "2", "3"],
      desc: "襟を削除したとき、シャツとジャケットの境界も消えた。名づけられない服として、日常の隣に置く。",
      isNew: false,
      releaseAt: "2026-03-28",
      image: "assets/img/p06.svg"
    },

    /* ---- KNIT ×3 (p07–p09) ---- */
    {
      id: "as-007",
      no: 7,
      line: 4,
      name: "DRIVER'S KNIT ZIP-UP",
      nameJa: "ドライバーズ ニットジップアップ",
      category: "knit",
      price: 52800,
      colors: ["BLACK", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "首元まで引き上げたジップが、顔の匿名性をわずかに約束する。低番手ウールの畦編みが、沈黙のような量感をつくる。",
      isNew: true,
      releaseAt: "2026-06-18",
      image: "assets/img/p07.svg"
    },
    {
      id: "as-008",
      no: 8,
      line: 4,
      name: "INVERTED-SEAM CREW KNIT",
      nameJa: "インヴァーテッドシーム クルーニット",
      category: "knit",
      price: 38500,
      colors: ["ECRU", "BLACK", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "リンキングの継ぎ目を外側に反転させた。工程の痕跡は欠点ではなく、その服が編まれた時間の証明である。",
      isNew: false,
      releaseAt: "2026-04-24",
      image: "assets/img/p08.svg"
    },
    {
      id: "as-009",
      no: 9,
      line: 4,
      name: "DISTORTED RIB TURTLENECK",
      nameJa: "ディストーテッド リブタートル",
      category: "knit",
      price: 30800,
      colors: ["WHITE", "BLACK"],
      sizes: ["1", "2", "3"],
      desc: "編み目の密度を意図的に揺らし、機械編みに手の気配を混入させた。歪みは、均質さへの小さな抵抗として首元に立つ。",
      isNew: false,
      releaseAt: "2026-02-13",
      image: "assets/img/p09.svg"
    },

    /* ---- SHIRT ×3 (p10–p12) ---- */
    {
      id: "as-010",
      no: 10,
      line: 3,
      name: "NAMELESS POPLIN SHIRT",
      nameJa: "ネームレス ポプリンシャツ",
      category: "shirt",
      price: 28600,
      colors: ["WHITE"],
      sizes: ["1", "2", "3"],
      desc: "ラベルを外した跡だけが背中に残る。名前のない白いシャツが、着る人の輪郭だけを語る。",
      isNew: true,
      releaseAt: "2026-06-25",
      image: "assets/img/p10.svg"
    },
    {
      id: "as-011",
      no: 11,
      line: 3,
      name: "DOUBLE-CUFF BAND COLLAR SHIRT",
      nameJa: "ダブルカフ バンドカラーシャツ",
      category: "shirt",
      price: 24200,
      colors: ["WHITE", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "襟を最小限まで削ぎ、袖口だけに儀式性を残した。省略と過剰、その二つの操作がひとつの服の中で釣り合う。",
      isNew: false,
      releaseAt: "2026-03-06",
      image: "assets/img/p11.svg"
    },
    {
      id: "as-012",
      no: 12,
      line: 0,
      name: "RECONSTRUCTED PANEL SHIRT",
      nameJa: "リコンストラクテッド パネルシャツ",
      category: "shirt",
      price: 36300,
      colors: ["WHITE", "ECRU"],
      sizes: ["1", "2", "3"],
      desc: "複数のデッドストックシャツを解体し、一枚に縫い直した。それぞれの過去が、境界線として身体の上に地図を描く。",
      isNew: true,
      releaseAt: "2026-06-05",
      image: "assets/img/p12.svg"
    },

    /* ---- CUT&SEWN ×3 (p13–p15) ---- */
    {
      id: "as-013",
      no: 13,
      line: 1,
      name: "HEAVY JERSEY TEE",
      nameJa: "ヘビージャージー Tシャツ",
      category: "cutsewn",
      price: 12100,
      colors: ["WHITE", "BLACK", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "目付の重い度詰め天竺が、Tシャツを構築物へと変える。装飾はなく、布の重力だけがデザインとして機能する。",
      isNew: false,
      releaseAt: "2026-02-20",
      image: "assets/img/p13.svg"
    },
    {
      id: "as-014",
      no: 14,
      line: 2,
      name: "LABELLESS PACK TEE",
      nameJa: "ラベルレス パックTシャツ",
      category: "cutsewn",
      price: 9900,
      colors: ["WHITE", "BLACK"],
      sizes: ["1", "2", "3"],
      desc: "ブランドネームを一切持たない、無記名の一枚。服が誰のものでもなくなったとき、はじめて着る人のものになる。",
      isNew: false,
      releaseAt: "2026-01-30",
      image: "assets/img/p14.svg"
    },
    {
      id: "as-015",
      no: 15,
      line: 1,
      name: "LONG SLEEVE MOCK NECK",
      nameJa: "ロングスリーブ モックネック",
      category: "cutsewn",
      price: 16500,
      colors: ["BLACK", "ECRU"],
      sizes: ["1", "2", "3"],
      desc: "首を覆うか、覆わないか。その中間に立ち止まった襟が、匿名の顔つきをつくる。袖は手の甲まで、長く。",
      isNew: true,
      releaseAt: "2026-06-08",
      image: "assets/img/p15.svg"
    },

    /* ---- PANTS ×3 (p16–p18) ---- */
    {
      id: "as-016",
      no: 16,
      line: 2,
      name: "WIDE TAILORED TROUSERS",
      nameJa: "ワイドテーラード トラウザーズ",
      category: "pants",
      price: 35200,
      colors: ["BLACK", "GREY"],
      sizes: ["1", "2", "3"],
      desc: "床すれすれで止まる裾が、歩幅ごとに影を引きずる。クリースは一本、それ以外のすべてを削除した。",
      isNew: false,
      releaseAt: "2026-03-20",
      image: "assets/img/p16.svg"
    },
    {
      id: "as-017",
      no: 17,
      line: 1,
      name: "CURVED-SEAM EASY PANTS",
      nameJa: "カーブドシーム イージーパンツ",
      category: "pants",
      price: 28600,
      colors: ["ECRU", "BLACK"],
      sizes: ["1", "2", "3"],
      desc: "直線ではなく、身体の湾曲に沿って縫い目を引き直した。楽であることは、思想の放棄ではない。",
      isNew: false,
      releaseAt: "2026-04-10",
      image: "assets/img/p17.svg"
    },
    {
      id: "as-018",
      no: 18,
      line: 5,
      name: "PAINTER WORK PANTS",
      nameJa: "ペインター ワークパンツ",
      category: "pants",
      price: 41800,
      colors: ["ECRU", "BLACK"],
      sizes: ["1", "2", "3"],
      desc: "アトリエの床に落ちた白いペンキを、意匠として定着させた。労働の痕跡が、そのまま装飾の代わりを務める。",
      isNew: false,
      releaseAt: "2026-05-02",
      image: "assets/img/p18.svg"
    },

    /* ---- DENIM ×2 (p19–p20) ---- */
    {
      id: "as-019",
      no: 19,
      line: 5,
      name: "BLEACHED 5-POCKET DENIM",
      nameJa: "ブリーチド 5ポケットデニム",
      category: "denim",
      price: 39600,
      colors: ["GREY", "WHITE"],
      sizes: ["1", "2", "3"],
      desc: "インディゴを限界まで抜き、デニムから青という記号を奪った。残ったのは綾織の骨格と、五つのポケットの記憶だけ。",
      isNew: false,
      releaseAt: "2026-05-15",
      image: "assets/img/p19.svg"
    },
    {
      id: "as-020",
      no: 20,
      line: 5,
      name: "RAW SELVEDGE DENIM",
      nameJa: "ロウ セルヴィッジデニム",
      category: "denim",
      price: 33000,
      colors: ["BLACK"],
      sizes: ["1", "2", "3"],
      desc: "黒く染めた未洗いのセルヴィッジ。穿く人の生活だけが、この服を完成へ近づけることを許されている。",
      isNew: false,
      releaseAt: "2026-02-06",
      image: "assets/img/p20.svg"
    },

    /* ---- BAG ×2 (p21–p22) ---- */
    {
      id: "as-021",
      no: 21,
      line: 6,
      name: "FLAT LEATHER TOTE",
      nameJa: "フラット レザートート",
      category: "bag",
      price: 68200,
      colors: ["BLACK"],
      sizes: ["FREE"],
      desc: "マチを持たない一枚のレザーは、中身の輪郭をそのまま外形として引き受ける。鞄はここで、持ち主の生活の断面図になる。",
      isNew: true,
      releaseAt: "2026-06-22",
      image: "assets/img/p21.svg"
    },
    {
      id: "as-022",
      no: 22,
      line: 6,
      name: "CANVAS SAC BAG",
      nameJa: "キャンバス サックバッグ",
      category: "bag",
      price: 46200,
      colors: ["ECRU", "BLACK"],
      sizes: ["FREE"],
      desc: "穀物袋の構造をそのまま借用した、装飾のない袋。用途が形を決め、形が用途へ還る循環だけがある。",
      isNew: false,
      releaseAt: "2026-03-12",
      image: "assets/img/p22.svg"
    },

    /* ---- SHOES ×1 (p23) ---- */
    {
      id: "as-023",
      no: 23,
      line: 7,
      name: "GERMAN TRAINER SNEAKERS",
      nameJa: "ジャーマントレーナー スニーカー",
      category: "shoes",
      price: 71500,
      colors: ["WHITE", "BLACK"],
      sizes: ["40", "41", "42", "43"],
      desc: "軍用トレーニングシューズという匿名の原型を、白いレザーで静かに引用した。歴史は踵に、未来はつま先に。",
      isNew: false,
      releaseAt: "2026-04-17",
      image: "assets/img/p23.svg"
    },

    /* ---- ACCESSORY ×1 (p24) ---- */
    {
      id: "as-024",
      no: 24,
      line: 8,
      name: "UNSIGNED SILVER RING",
      nameJa: "アンサインド シルバーリング",
      category: "accessory",
      price: 18700,
      colors: ["GREY"],
      sizes: ["FREE"],
      desc: "刻印を持たない銀の環。署名を消すことで、輪郭だけが残る。",
      isNew: true,
      releaseAt: "2026-06-28",
      image: "assets/img/p24.svg"
    }
  ];

  var ASEED_CATEGORIES = [
    { key: "all", label: "ALL" },
    { key: "outer", label: "OUTER" },
    { key: "jacket", label: "JACKET" },
    { key: "knit", label: "KNIT" },
    { key: "shirt", label: "SHIRT" },
    { key: "cutsewn", label: "CUT&SEWN" },
    { key: "pants", label: "PANTS" },
    { key: "denim", label: "DENIM" },
    { key: "bag", label: "BAG" },
    { key: "shoes", label: "SHOES" },
    { key: "accessory", label: "ACCESSORY" }
  ];

  /* "¥128,000" — ja-JP grouped digits with yen sign */
  function aseedYen(n) {
    var num = Number(n);
    if (!isFinite(num)) num = 0;
    try {
      return "¥" + Math.round(num).toLocaleString("ja-JP");
    } catch (e) {
      return "¥" + String(Math.round(num));
    }
  }

  window.ASEED_PRODUCTS = ASEED_PRODUCTS;
  window.ASEED_CATEGORIES = ASEED_CATEGORIES;
  window.aseedYen = aseedYen;
})();
