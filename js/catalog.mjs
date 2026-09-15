// Original 24 concepts retained; measurements and stock are clearly labelled demo data.
export const products = [
  {
    "id": "as-001",
    "no": 1,
    "line": 0,
    "name": "RAW-EDGE WOOL COAT",
    "nameJa": "ロウエッジ ウールコート",
    "category": "outer",
    "price": 176000,
    "colors": [
      "BLACK",
      "ECRU"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "解体と再構築。裁ち落としたままの裾が、完成という概念を静かに拒む。圧縮ウールの深い量感に、仮縫いのステッチだけが痕跡として残る。",
    "isNew": true,
    "releaseAt": "2026-06-20",
    "image": "assets/photos/as-001-front.webp",
    "descEn": "A generous wool silhouette, finished with a quiet raw edge. Soft volume for the colder months.",
    "material": {
      "ja": "ウール100%",
      "en": "100% wool"
    },
    "care": {
      "ja": "ドライクリーニング。",
      "en": "Dry clean only."
    },
    "measurements": [
      [
        112,
        61,
        54,
        59
      ],
      [
        115,
        64,
        56,
        61
      ],
      [
        118,
        67,
        58,
        63
      ]
    ],
    "measurementType": "top",
    "featured": true,
    "stock": {
      "BLACK": {
        "1": 4,
        "2": 5,
        "3": 6
      },
      "ECRU": {
        "1": 5,
        "2": 6,
        "3": 7
      }
    }
  },
  {
    "id": "as-002",
    "no": 2,
    "line": 1,
    "name": "OVERSIZED TRENCH COAT",
    "nameJa": "オーバーサイズ トレンチコート",
    "category": "outer",
    "price": 143000,
    "colors": [
      "ECRU",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "誰かの記憶にあるトレンチを、二回り大きく複製した。肩線は落ち、匿名の輪郭だけが街に残る。",
    "isNew": false,
    "releaseAt": "2026-03-14",
    "image": "assets/photos/as-002-front.webp",
    "descEn": "A familiar trench, reconsidered in a generous proportion. A removable belt lets the silhouette move freely.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "専門店でのクリーニング。",
      "en": "Professional cleaning."
    },
    "measurements": [
      [
        114,
        62,
        56,
        57
      ],
      [
        117,
        65,
        58,
        59
      ],
      [
        120,
        68,
        60,
        61
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "ECRU": {
        "1": 5,
        "2": 6,
        "3": 7
      },
      "BLACK": {
        "1": 6,
        "2": 7,
        "3": 8
      }
    }
  },
  {
    "id": "as-003",
    "no": 3,
    "line": 2,
    "name": "PADDED LINER COAT",
    "nameJa": "パデッド ライナーコート",
    "category": "outer",
    "price": 118800,
    "colors": [
      "BLACK",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "本来は内側にあるべきライナーを、外套として独立させた。裏地の美しさは、隠されている必要がない。",
    "isNew": false,
    "releaseAt": "2026-02-27",
    "image": "assets/photos/as-003-front.webp",
    "descEn": "The understated structure of a liner, made to be worn on its own. Light insulation and an easy shape.",
    "material": {
      "ja": "表地ナイロン100%・中綿ポリエステル100%",
      "en": "100% nylon; polyester filling"
    },
    "care": {
      "ja": "専門店でのクリーニング。",
      "en": "Gentle professional cleaning."
    },
    "measurements": [
      [
        96,
        60,
        52,
        59
      ],
      [
        99,
        63,
        54,
        61
      ],
      [
        102,
        66,
        56,
        63
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "BLACK": {
        "1": 6,
        "2": 7,
        "3": 8
      },
      "GREY": {
        "1": 7,
        "2": 8,
        "3": 4
      }
    }
  },
  {
    "id": "as-004",
    "no": 4,
    "line": 2,
    "name": "DECONSTRUCTED BLAZER",
    "nameJa": "デコンストラクテッド ブレザー",
    "category": "jacket",
    "price": 96800,
    "colors": [
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "芯地と肩パッドを取り去り、テーラリングの骨格だけを残した。正装の記号が、着る人の身体に従属しはじめる。",
    "isNew": true,
    "releaseAt": "2026-06-12",
    "image": "assets/photos/as-004-front.webp",
    "descEn": "Relaxed tailoring with a soft shoulder and an unstructured body. A blazer that settles naturally around you.",
    "material": {
      "ja": "ウール80%・ナイロン20%",
      "en": "80% wool, 20% nylon"
    },
    "care": {
      "ja": "ドライクリーニング。",
      "en": "Dry clean only."
    },
    "measurements": [
      [
        73,
        53,
        46,
        60
      ],
      [
        75,
        56,
        48,
        62
      ],
      [
        77,
        59,
        50,
        64
      ]
    ],
    "measurementType": "top",
    "featured": true,
    "stock": {
      "BLACK": {
        "1": 7,
        "2": 8,
        "3": 0
      }
    }
  },
  {
    "id": "as-005",
    "no": 5,
    "line": 0,
    "name": "INSIDE-OUT WORK JACKET",
    "nameJa": "インサイドアウト ワークジャケット",
    "category": "jacket",
    "price": 85800,
    "colors": [
      "ECRU",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "縫い代、パイピング、ポケット袋。服の内側で働いていた構造を、そのまま表として提示する一着。",
    "isNew": false,
    "releaseAt": "2026-04-03",
    "image": "assets/photos/as-005-front.webp",
    "descEn": "Workwear turned inside out. Exposed seams make the construction part of the surface.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水で弱洗い・陰干し。",
      "en": "Cold gentle wash, line dry."
    },
    "measurements": [
      [
        66,
        58,
        51,
        58
      ],
      [
        69,
        61,
        53,
        60
      ],
      [
        72,
        64,
        55,
        62
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "ECRU": {
        "1": 8,
        "2": 4,
        "3": 5
      },
      "GREY": {
        "1": 4,
        "2": 5,
        "3": 6
      }
    }
  },
  {
    "id": "as-006",
    "no": 6,
    "line": 1,
    "name": "COLLARLESS SHIRT JACKET",
    "nameJa": "カラーレス シャツジャケット",
    "category": "jacket",
    "price": 74800,
    "colors": [
      "WHITE",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "襟を削除したとき、シャツとジャケットの境界も消えた。名づけられない服として、日常の隣に置く。",
    "isNew": false,
    "releaseAt": "2026-03-28",
    "image": "assets/photos/as-006-front.webp",
    "descEn": "The weight of a jacket with the simplicity of a shirt. A clean collarless neckline leaves room for layers.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水で弱洗い・陰干し。",
      "en": "Cold gentle wash, line dry."
    },
    "measurements": [
      [
        70,
        57,
        49,
        58
      ],
      [
        73,
        60,
        51,
        60
      ],
      [
        76,
        63,
        53,
        62
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "WHITE": {
        "1": 4,
        "2": 5,
        "3": 6
      },
      "BLACK": {
        "1": 5,
        "2": 6,
        "3": 7
      }
    }
  },
  {
    "id": "as-007",
    "no": 7,
    "line": 4,
    "name": "DRIVER'S KNIT ZIP-UP",
    "nameJa": "ドライバーズ ニットジップアップ",
    "category": "knit",
    "price": 52800,
    "colors": [
      "BLACK",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "首元まで引き上げたジップが、顔の匿名性をわずかに約束する。低番手ウールの畦編みが、沈黙のような量感をつくる。",
    "isNew": true,
    "releaseAt": "2026-06-18",
    "image": "assets/photos/as-007-front.webp",
    "descEn": "A tactile rib knit with a tall collar and a full-length zip. Warmth without excess.",
    "material": {
      "ja": "ウール100%",
      "en": "100% wool"
    },
    "care": {
      "ja": "ドライクリーニング・平干し。",
      "en": "Dry clean; dry flat if wet."
    },
    "measurements": [
      [
        64,
        52,
        44,
        61
      ],
      [
        67,
        55,
        46,
        63
      ],
      [
        70,
        58,
        48,
        65
      ]
    ],
    "measurementType": "top",
    "featured": true,
    "stock": {
      "BLACK": {
        "1": 5,
        "2": 6,
        "3": 7
      },
      "GREY": {
        "1": 6,
        "2": 7,
        "3": 8
      }
    }
  },
  {
    "id": "as-008",
    "no": 8,
    "line": 4,
    "name": "INVERTED-SEAM CREW KNIT",
    "nameJa": "インヴァーテッドシーム クルーニット",
    "category": "knit",
    "price": 38500,
    "colors": [
      "ECRU",
      "BLACK",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "リンキングの継ぎ目を外側に反転させた。工程の痕跡は欠点ではなく、その服が編まれた時間の証明である。",
    "isNew": false,
    "releaseAt": "2026-04-24",
    "image": "assets/photos/as-008-front.webp",
    "descEn": "A familiar crew neck with outward-facing seams. The trace of making becomes a subtle detail.",
    "material": {
      "ja": "ウール100%",
      "en": "100% wool"
    },
    "care": {
      "ja": "ドライクリーニング・畳んで保管。",
      "en": "Dry clean; store folded."
    },
    "measurements": [
      [
        62,
        55,
        48,
        58
      ],
      [
        65,
        58,
        50,
        60
      ],
      [
        68,
        61,
        52,
        62
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "ECRU": {
        "1": 6,
        "2": 7,
        "3": 8
      },
      "BLACK": {
        "1": 7,
        "2": 8,
        "3": 4
      },
      "GREY": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-009",
    "no": 9,
    "line": 4,
    "name": "DISTORTED RIB TURTLENECK",
    "nameJa": "ディストーテッド リブタートル",
    "category": "knit",
    "price": 30800,
    "colors": [
      "WHITE",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "編み目の密度を意図的に揺らし、機械編みに手の気配を混入させた。歪みは、均質さへの小さな抵抗として首元に立つ。",
    "isNew": false,
    "releaseAt": "2026-02-13",
    "image": "assets/photos/as-009-front.webp",
    "descEn": "Fine variations in rib texture soften the lines of a close-fitting turtleneck.",
    "material": {
      "ja": "ウール100%",
      "en": "100% wool"
    },
    "care": {
      "ja": "ドライクリーニング・畳んで保管。",
      "en": "Dry clean; store folded."
    },
    "measurements": [
      [
        63,
        47,
        41,
        61
      ],
      [
        66,
        50,
        43,
        63
      ],
      [
        69,
        53,
        45,
        65
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "WHITE": {
        "1": 7,
        "2": 8,
        "3": 4
      },
      "BLACK": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-010",
    "no": 10,
    "line": 3,
    "name": "NAMELESS POPLIN SHIRT",
    "nameJa": "ネームレス ポプリンシャツ",
    "category": "shirt",
    "price": 28600,
    "colors": [
      "WHITE"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "ラベルを外した跡だけが背中に残る。名前のない白いシャツが、着る人の輪郭だけを語る。",
    "isNew": true,
    "releaseAt": "2026-06-25",
    "image": "assets/photos/as-010-front.webp",
    "descEn": "Crisp cotton poplin, a generous cut, and no unnecessary detail. The white shirt as a starting point.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水洗い・中温アイロン。",
      "en": "Cold wash; warm iron."
    },
    "measurements": [
      [
        76,
        58,
        49,
        60
      ],
      [
        79,
        61,
        51,
        62
      ],
      [
        82,
        64,
        53,
        64
      ]
    ],
    "measurementType": "top",
    "featured": true,
    "stock": {
      "WHITE": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-011",
    "no": 11,
    "line": 3,
    "name": "DOUBLE-CUFF BAND COLLAR SHIRT",
    "nameJa": "ダブルカフ バンドカラーシャツ",
    "category": "shirt",
    "price": 24200,
    "colors": [
      "WHITE",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "襟を最小限まで削ぎ、袖口だけに儀式性を残した。省略と過剰、その二つの操作がひとつの服の中で釣り合う。",
    "isNew": false,
    "releaseAt": "2026-03-06",
    "image": "assets/photos/as-011-front.webp",
    "descEn": "A minimal band collar paired with extended cuffs. A little structure at the edges.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水洗い・中温アイロン。",
      "en": "Cold wash; warm iron."
    },
    "measurements": [
      [
        73,
        55,
        46,
        63
      ],
      [
        76,
        58,
        48,
        65
      ],
      [
        79,
        61,
        50,
        67
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "WHITE": {
        "1": 4,
        "2": 5,
        "3": 6
      },
      "GREY": {
        "1": 5,
        "2": 6,
        "3": 7
      }
    }
  },
  {
    "id": "as-012",
    "no": 12,
    "line": 0,
    "name": "RECONSTRUCTED PANEL SHIRT",
    "nameJa": "リコンストラクテッド パネルシャツ",
    "category": "shirt",
    "price": 36300,
    "colors": [
      "WHITE",
      "ECRU"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "複数のデッドストックシャツを解体し、一枚に縫い直した。それぞれの過去が、境界線として身体の上に地図を描く。",
    "isNew": true,
    "releaseAt": "2026-06-05",
    "image": "assets/photos/as-012-front.webp",
    "descEn": "Subtle tonal panels reassemble the classic shirt into a different rhythm.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水で弱洗い。",
      "en": "Cold gentle wash."
    },
    "measurements": [
      [
        74,
        59,
        51,
        59
      ],
      [
        77,
        62,
        53,
        61
      ],
      [
        80,
        65,
        55,
        63
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "WHITE": {
        "1": 5,
        "2": 6,
        "3": 7
      },
      "ECRU": {
        "1": 6,
        "2": 7,
        "3": 8
      }
    }
  },
  {
    "id": "as-013",
    "no": 13,
    "line": 1,
    "name": "HEAVY JERSEY TEE",
    "nameJa": "ヘビージャージー Tシャツ",
    "category": "cutsewn",
    "price": 12100,
    "colors": [
      "WHITE",
      "BLACK",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "目付の重い度詰め天竺が、Tシャツを構築物へと変える。装飾はなく、布の重力だけがデザインとして機能する。",
    "isNew": false,
    "releaseAt": "2026-02-20",
    "image": "assets/photos/as-013-front.webp",
    "descEn": "Dense cotton jersey gives a simple tee its shape. A substantial rib collar and an easy everyday fit.",
    "material": {
      "ja": "厚手コットン100%",
      "en": "100% heavyweight cotton"
    },
    "care": {
      "ja": "裏返して冷水洗い・陰干し。",
      "en": "Cold wash inside out; line dry."
    },
    "measurements": [
      [
        68,
        55,
        49,
        22
      ],
      [
        71,
        58,
        51,
        23
      ],
      [
        74,
        61,
        53,
        24
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "WHITE": {
        "1": 6,
        "2": 7,
        "3": 8
      },
      "BLACK": {
        "1": 7,
        "2": 8,
        "3": 4
      },
      "GREY": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-014",
    "no": 14,
    "line": 2,
    "name": "LABELLESS PACK TEE",
    "nameJa": "ラベルレス パックTシャツ",
    "category": "cutsewn",
    "price": 9900,
    "colors": [
      "WHITE",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "ブランドネームを一切持たない、無記名の一枚。服が誰のものでもなくなったとき、はじめて着る人のものになる。",
    "isNew": false,
    "releaseAt": "2026-01-30",
    "image": "assets/photos/as-014-front.webp",
    "descEn": "An unbranded cotton tee with a clean neckline. One understated layer to wear often.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "裏返して冷水洗い。",
      "en": "Cold wash inside out."
    },
    "measurements": [
      [
        67,
        51,
        45,
        21
      ],
      [
        70,
        54,
        47,
        22
      ],
      [
        73,
        57,
        49,
        23
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "WHITE": {
        "1": 7,
        "2": 8,
        "3": 4
      },
      "BLACK": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-015",
    "no": 15,
    "line": 1,
    "name": "LONG SLEEVE MOCK NECK",
    "nameJa": "ロングスリーブ モックネック",
    "category": "cutsewn",
    "price": 16500,
    "colors": [
      "BLACK",
      "ECRU"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "首を覆うか、覆わないか。その中間に立ち止まった襟が、匿名の顔つきをつくる。袖は手の甲まで、長く。",
    "isNew": true,
    "releaseAt": "2026-06-08",
    "image": "assets/photos/as-015-front.webp",
    "descEn": "A softly raised neck and extended sleeves. An easy base layer with a considered proportion.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水洗い・陰干し。",
      "en": "Cold wash; line dry."
    },
    "measurements": [
      [
        69,
        54,
        46,
        64
      ],
      [
        72,
        57,
        48,
        66
      ],
      [
        75,
        60,
        50,
        68
      ]
    ],
    "measurementType": "top",
    "featured": false,
    "stock": {
      "BLACK": {
        "1": 8,
        "2": 4,
        "3": 5
      },
      "ECRU": {
        "1": 4,
        "2": 5,
        "3": 6
      }
    }
  },
  {
    "id": "as-016",
    "no": 16,
    "line": 2,
    "name": "WIDE TAILORED TROUSERS",
    "nameJa": "ワイドテーラード トラウザーズ",
    "category": "pants",
    "price": 35200,
    "colors": [
      "BLACK",
      "GREY"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "床すれすれで止まる裾が、歩幅ごとに影を引きずる。クリースは一本、それ以外のすべてを削除した。",
    "isNew": false,
    "releaseAt": "2026-03-20",
    "image": "assets/photos/as-016-front.webp",
    "descEn": "Wide legs and a single crease create a clean line in motion. Fluid tailoring for everyday wear.",
    "material": {
      "ja": "ウール60%・ポリエステル40%",
      "en": "60% wool, 40% polyester"
    },
    "care": {
      "ja": "ドライクリーニング。",
      "en": "Dry clean only."
    },
    "measurements": [
      [
        74,
        31,
        72,
        27
      ],
      [
        78,
        32,
        74,
        28
      ],
      [
        82,
        33,
        76,
        29
      ]
    ],
    "measurementType": "bottom",
    "featured": true,
    "stock": {
      "BLACK": {
        "1": 4,
        "2": 5,
        "3": 6
      },
      "GREY": {
        "1": 5,
        "2": 6,
        "3": 7
      }
    }
  },
  {
    "id": "as-017",
    "no": 17,
    "line": 1,
    "name": "CURVED-SEAM EASY PANTS",
    "nameJa": "カーブドシーム イージーパンツ",
    "category": "pants",
    "price": 28600,
    "colors": [
      "ECRU",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "直線ではなく、身体の湾曲に沿って縫い目を引き直した。楽であることは、思想の放棄ではない。",
    "isNew": false,
    "releaseAt": "2026-04-10",
    "image": "assets/photos/as-017-front.webp",
    "descEn": "A curved seam and a relaxed waist follow the body rather than constrain it.",
    "material": {
      "ja": "コットン100%",
      "en": "100% cotton"
    },
    "care": {
      "ja": "冷水で弱洗い。",
      "en": "Cold gentle wash."
    },
    "measurements": [
      [
        70,
        33,
        68,
        23
      ],
      [
        74,
        34,
        70,
        24
      ],
      [
        78,
        35,
        72,
        25
      ]
    ],
    "measurementType": "bottom",
    "featured": false,
    "stock": {
      "ECRU": {
        "1": 5,
        "2": 6,
        "3": 7
      },
      "BLACK": {
        "1": 6,
        "2": 7,
        "3": 8
      }
    }
  },
  {
    "id": "as-018",
    "no": 18,
    "line": 5,
    "name": "PAINTER WORK PANTS",
    "nameJa": "ペインター ワークパンツ",
    "category": "pants",
    "price": 41800,
    "colors": [
      "ECRU",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "アトリエの床に落ちた白いペンキを、意匠として定着させた。労働の痕跡が、そのまま装飾の代わりを務める。",
    "isNew": false,
    "releaseAt": "2026-05-02",
    "image": "assets/photos/as-018-front.webp",
    "descEn": "Utility pockets and a straight workwear leg in substantial cotton canvas.",
    "material": {
      "ja": "コットンキャンバス100%",
      "en": "100% cotton canvas"
    },
    "care": {
      "ja": "冷水で単独洗い。",
      "en": "Cold wash separately."
    },
    "measurements": [
      [
        76,
        32,
        72,
        25
      ],
      [
        80,
        33,
        74,
        26
      ],
      [
        84,
        34,
        76,
        27
      ]
    ],
    "measurementType": "bottom",
    "featured": false,
    "stock": {
      "ECRU": {
        "1": 6,
        "2": 7,
        "3": 8
      },
      "BLACK": {
        "1": 7,
        "2": 8,
        "3": 4
      }
    }
  },
  {
    "id": "as-019",
    "no": 19,
    "line": 5,
    "name": "BLEACHED 5-POCKET DENIM",
    "nameJa": "ブリーチド 5ポケットデニム",
    "category": "denim",
    "price": 39600,
    "colors": [
      "GREY",
      "WHITE"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "インディゴを限界まで抜き、デニムから青という記号を奪った。残ったのは綾織の骨格と、五つのポケットの記憶だけ。",
    "isNew": false,
    "releaseAt": "2026-05-15",
    "image": "assets/photos/as-019-front.webp",
    "descEn": "A pale grey wash reveals the texture of denim. Five pockets, a straight leg, and a lived-in surface.",
    "material": {
      "ja": "コットンデニム100%",
      "en": "100% cotton denim"
    },
    "care": {
      "ja": "冷水で単独洗い・陰干し。",
      "en": "Cold wash separately, line dry."
    },
    "measurements": [
      [
        74,
        30,
        74,
        22
      ],
      [
        78,
        31,
        76,
        23
      ],
      [
        82,
        32,
        78,
        24
      ]
    ],
    "measurementType": "bottom",
    "featured": false,
    "stock": {
      "GREY": {
        "1": 7,
        "2": 8,
        "3": 4
      },
      "WHITE": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-020",
    "no": 20,
    "line": 5,
    "name": "RAW SELVEDGE DENIM",
    "nameJa": "ロウ セルヴィッジデニム",
    "category": "denim",
    "price": 33000,
    "colors": [
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "黒く染めた未洗いのセルヴィッジ。穿く人の生活だけが、この服を完成へ近づけることを許されている。",
    "isNew": false,
    "releaseAt": "2026-02-06",
    "image": "assets/photos/as-020-front.webp",
    "descEn": "Raw black denim that changes with wear. A straight fit and a clean selvedge finish.",
    "material": {
      "ja": "セルヴィッジコットン100%",
      "en": "100% cotton selvedge denim"
    },
    "care": {
      "ja": "冷水で単独洗い・乾燥機不可。",
      "en": "Cold wash separately, no tumble dry."
    },
    "measurements": [
      [
        75,
        30,
        76,
        21
      ],
      [
        79,
        31,
        78,
        22
      ],
      [
        83,
        32,
        80,
        23
      ]
    ],
    "measurementType": "bottom",
    "featured": false,
    "stock": {
      "BLACK": {
        "1": 8,
        "2": 4,
        "3": 5
      }
    }
  },
  {
    "id": "as-021",
    "no": 21,
    "line": 6,
    "name": "FLAT LEATHER TOTE",
    "nameJa": "フラット レザートート",
    "category": "bag",
    "price": 68200,
    "colors": [
      "BLACK"
    ],
    "sizes": [
      "FREE"
    ],
    "desc": "マチを持たない一枚のレザーは、中身の輪郭をそのまま外形として引き受ける。鞄はここで、持ち主の生活の断面図になる。",
    "isNew": true,
    "releaseAt": "2026-06-22",
    "image": "assets/photos/as-021-front.webp",
    "descEn": "A flat leather tote that takes the shape of what it holds. Soft handles, a generous opening.",
    "material": {
      "ja": "牛革",
      "en": "Cow leather"
    },
    "care": {
      "ja": "柔らかい乾いた布でお手入れ。",
      "en": "Wipe with a soft dry cloth."
    },
    "measurements": [
      [
        38,
        42,
        3,
        24
      ]
    ],
    "measurementType": "bag",
    "featured": false,
    "stock": {
      "BLACK": {
        "FREE": 4
      }
    }
  },
  {
    "id": "as-022",
    "no": 22,
    "line": 6,
    "name": "CANVAS SAC BAG",
    "nameJa": "キャンバス サックバッグ",
    "category": "bag",
    "price": 46200,
    "colors": [
      "ECRU",
      "BLACK"
    ],
    "sizes": [
      "FREE"
    ],
    "desc": "穀物袋の構造をそのまま借用した、装飾のない袋。用途が形を決め、形が用途へ還る循環だけがある。",
    "isNew": false,
    "releaseAt": "2026-03-12",
    "image": "assets/photos/as-022-front.webp",
    "descEn": "An uncomplicated canvas bag with enough room for the everyday.",
    "material": {
      "ja": "コットンキャンバス100%",
      "en": "100% cotton canvas"
    },
    "care": {
      "ja": "汚れた部分を優しく拭き取り。",
      "en": "Spot clean."
    },
    "measurements": [
      [
        36,
        40,
        12,
        30
      ]
    ],
    "measurementType": "bag",
    "featured": false,
    "stock": {
      "ECRU": {
        "FREE": 5
      },
      "BLACK": {
        "FREE": 6
      }
    }
  },
  {
    "id": "as-023",
    "no": 23,
    "line": 7,
    "name": "GERMAN TRAINER SNEAKERS",
    "nameJa": "ジャーマントレーナー スニーカー",
    "category": "shoes",
    "price": 71500,
    "colors": [
      "WHITE",
      "BLACK"
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43"
    ],
    "desc": "軍用トレーニングシューズという匿名の原型を、白いレザーで静かに引用した。歴史は踵に、未来はつま先に。",
    "isNew": false,
    "releaseAt": "2026-04-17",
    "image": "assets/photos/as-023-front.webp",
    "descEn": "A low-profile trainer with leather panels and a flexible rubber sole.",
    "material": {
      "ja": "アッパー牛革・ソールラバー",
      "en": "Leather upper; rubber sole"
    },
    "care": {
      "ja": "レザー用ブラシ・柔らかい布でお手入れ。",
      "en": "Leather brush and soft cloth."
    },
    "measurements": [
      [
        25,
        27,
        9.5
      ],
      [
        26,
        28,
        9.8
      ],
      [
        27,
        29,
        10.1
      ],
      [
        28,
        30,
        10.4
      ]
    ],
    "measurementType": "shoes",
    "featured": false,
    "stock": {
      "WHITE": {
        "40": 6,
        "41": 7,
        "42": 8,
        "43": 4
      },
      "BLACK": {
        "40": 7,
        "41": 8,
        "42": 4,
        "43": 5
      }
    }
  },
  {
    "id": "as-024",
    "no": 24,
    "line": 8,
    "name": "UNSIGNED SILVER RING",
    "nameJa": "アンサインド シルバーリング",
    "category": "accessory",
    "price": 18700,
    "colors": [
      "GREY"
    ],
    "sizes": [
      "FREE"
    ],
    "desc": "刻印を持たない銀の環。署名を消すことで、輪郭だけが残る。",
    "isNew": true,
    "releaseAt": "2026-06-28",
    "image": "assets/photos/as-024-front.webp",
    "descEn": "A simple silver band with a softly brushed surface. An adjustable open shape.",
    "material": {
      "ja": "シルバー925",
      "en": "Sterling silver 925"
    },
    "care": {
      "ja": "シルバー用クロスで磨いてください。",
      "en": "Polish with a silver cloth."
    },
    "measurements": [
      [
        18,
        4,
        1.5
      ]
    ],
    "measurementType": "ring",
    "featured": false,
    "stock": {
      "GREY": {
        "FREE": 7
      }
    }
  },
  {
    "id": "as-025",
    "no": 25,
    "line": 1,
    "name": "ASEED LOGO TEE",
    "nameJa": "aseed ロゴTシャツ",
    "category": "cutsewn",
    "price": 13200,
    "colors": [
      "WHITE",
      "BLACK"
    ],
    "sizes": [
      "1",
      "2",
      "3"
    ],
    "desc": "一枚で着る、そのためのロゴT。厚手のコットンに、aseedの文字を静かに配しました。少しゆとりのある身幅と、端正なネックライン。",
    "descEn": "A signature, simply worn. Dense cotton, an easy silhouette, and the aseed wordmark printed across the chest.",
    "isNew": true,
    "releaseAt": "2026-09-15",
    "material": {
      "ja": "コットン100%・胸元プリント",
      "en": "100% cotton; printed wordmark"
    },
    "care": {
      "ja": "裏返して冷水洗い・プリントへの直接アイロン不可。",
      "en": "Cold wash inside out. Do not iron directly on the print."
    },
    "measurements": [
      [
        68,
        55,
        49,
        22
      ],
      [
        71,
        58,
        51,
        23
      ],
      [
        74,
        61,
        53,
        24
      ]
    ],
    "measurementType": "top",
    "featured": true,
    "stock": {
      "WHITE": {
        "1": 8,
        "2": 6,
        "3": 4
      },
      "BLACK": {
        "1": 5,
        "2": 7,
        "3": 0
      }
    },
    "image": "assets/photos/as-025-front.webp"
  }
];
export const featuredIds = ["as-025","as-001","as-007","as-010","as-004","as-016"];
