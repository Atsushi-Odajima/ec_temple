import fs from 'node:fs';
const original=JSON.parse(fs.readFileSync('data/original-products.json','utf8'));
const specs=[
  ['100% wool','ウール100%','Dry clean only.','ドライクリーニング。',[[112,61,54,59],[115,64,56,61],[118,67,58,63]],'A generous wool silhouette, finished with a quiet raw edge. Soft volume for the colder months.'],
  ['100% cotton','コットン100%','Professional cleaning.','専門店でのクリーニング。',[[114,62,56,57],[117,65,58,59],[120,68,60,61]],'A familiar trench, reconsidered in a generous proportion. A removable belt lets the silhouette move freely.'],
  ['100% nylon; polyester filling','表地ナイロン100%・中綿ポリエステル100%','Gentle professional cleaning.','専門店でのクリーニング。',[[96,60,52,59],[99,63,54,61],[102,66,56,63]],'The understated structure of a liner, made to be worn on its own. Light insulation and an easy shape.'],
  ['80% wool, 20% nylon','ウール80%・ナイロン20%','Dry clean only.','ドライクリーニング。',[[73,53,46,60],[75,56,48,62],[77,59,50,64]],'Relaxed tailoring with a soft shoulder and an unstructured body. A blazer that settles naturally around you.'],
  ['100% cotton','コットン100%','Cold gentle wash, line dry.','冷水で弱洗い・陰干し。',[[66,58,51,58],[69,61,53,60],[72,64,55,62]],'Workwear turned inside out. Exposed seams make the construction part of the surface.'],
  ['100% cotton','コットン100%','Cold gentle wash, line dry.','冷水で弱洗い・陰干し。',[[70,57,49,58],[73,60,51,60],[76,63,53,62]],'The weight of a jacket with the simplicity of a shirt. A clean collarless neckline leaves room for layers.'],
  ['100% wool','ウール100%','Dry clean; dry flat if wet.','ドライクリーニング・平干し。',[[64,52,44,61],[67,55,46,63],[70,58,48,65]],'A tactile rib knit with a tall collar and a full-length zip. Warmth without excess.'],
  ['100% wool','ウール100%','Dry clean; store folded.','ドライクリーニング・畳んで保管。',[[62,55,48,58],[65,58,50,60],[68,61,52,62]],'A familiar crew neck with outward-facing seams. The trace of making becomes a subtle detail.'],
  ['100% wool','ウール100%','Dry clean; store folded.','ドライクリーニング・畳んで保管。',[[63,47,41,61],[66,50,43,63],[69,53,45,65]],'Fine variations in rib texture soften the lines of a close-fitting turtleneck.'],
  ['100% cotton','コットン100%','Cold wash; warm iron.','冷水洗い・中温アイロン。',[[76,58,49,60],[79,61,51,62],[82,64,53,64]],'Crisp cotton poplin, a generous cut, and no unnecessary detail. The white shirt as a starting point.'],
  ['100% cotton','コットン100%','Cold wash; warm iron.','冷水洗い・中温アイロン。',[[73,55,46,63],[76,58,48,65],[79,61,50,67]],'A minimal band collar paired with extended cuffs. A little structure at the edges.'],
  ['100% cotton','コットン100%','Cold gentle wash.','冷水で弱洗い。',[[74,59,51,59],[77,62,53,61],[80,65,55,63]],'Subtle tonal panels reassemble the classic shirt into a different rhythm.'],
  ['100% heavyweight cotton','厚手コットン100%','Cold wash inside out; line dry.','裏返して冷水洗い・陰干し。',[[68,55,49,22],[71,58,51,23],[74,61,53,24]],'Dense cotton jersey gives a simple tee its shape. A substantial rib collar and an easy everyday fit.'],
  ['100% cotton','コットン100%','Cold wash inside out.','裏返して冷水洗い。',[[67,51,45,21],[70,54,47,22],[73,57,49,23]],'An unbranded cotton tee with a clean neckline. One understated layer to wear often.'],
  ['100% cotton','コットン100%','Cold wash; line dry.','冷水洗い・陰干し。',[[69,54,46,64],[72,57,48,66],[75,60,50,68]],'A softly raised neck and extended sleeves. An easy base layer with a considered proportion.'],
  ['60% wool, 40% polyester','ウール60%・ポリエステル40%','Dry clean only.','ドライクリーニング。',[[74,31,72,27],[78,32,74,28],[82,33,76,29]],'Wide legs and a single crease create a clean line in motion. Fluid tailoring for everyday wear.'],
  ['100% cotton','コットン100%','Cold gentle wash.','冷水で弱洗い。',[[70,33,68,23],[74,34,70,24],[78,35,72,25]],'A curved seam and a relaxed waist follow the body rather than constrain it.'],
  ['100% cotton canvas','コットンキャンバス100%','Cold wash separately.','冷水で単独洗い。',[[76,32,72,25],[80,33,74,26],[84,34,76,27]],'Utility pockets and a straight workwear leg in substantial cotton canvas.'],
  ['100% cotton denim','コットンデニム100%','Cold wash separately, line dry.','冷水で単独洗い・陰干し。',[[74,30,74,22],[78,31,76,23],[82,32,78,24]],'A pale grey wash reveals the texture of denim. Five pockets, a straight leg, and a lived-in surface.'],
  ['100% cotton selvedge denim','セルヴィッジコットン100%','Cold wash separately, no tumble dry.','冷水で単独洗い・乾燥機不可。',[[75,30,76,21],[79,31,78,22],[83,32,80,23]],'Raw black denim that changes with wear. A straight fit and a clean selvedge finish.'],
  ['Cow leather','牛革','Wipe with a soft dry cloth.','柔らかい乾いた布でお手入れ。',[[38,42,3,24]],'A flat leather tote that takes the shape of what it holds. Soft handles, a generous opening.'],
  ['100% cotton canvas','コットンキャンバス100%','Spot clean.','汚れた部分を優しく拭き取り。',[[36,40,12,30]],'An uncomplicated canvas bag with enough room for the everyday.'],
  ['Leather upper; rubber sole','アッパー牛革・ソールラバー','Leather brush and soft cloth.','レザー用ブラシ・柔らかい布でお手入れ。',[[25,27,9.5],[26,28,9.8],[27,29,10.1],[28,30,10.4]],'A low-profile trainer with leather panels and a flexible rubber sole.'],
  ['Sterling silver 925','シルバー925','Polish with a silver cloth.','シルバー用クロスで磨いてください。',[[18,4,1.5]],'A simple silver band with a softly brushed surface. An adjustable open shape.']
];
const features=['as-025','as-001','as-007','as-010','as-004','as-016'];
const products=original.map((p,index)=>{
 const s=specs[index];
 const kind=['pants','denim'].includes(p.category)?'bottom':p.category==='shoes'?'shoes':p.category==='bag'?'bag':p.category==='accessory'?'ring':'top';
 return {...p,descEn:s[5],material:{ja:s[1],en:s[0]},care:{ja:s[3],en:s[2]},measurements:s[4],measurementType:kind,featured:features.includes(p.id),stock:Object.fromEntries(p.colors.map((c,ci)=>[c,Object.fromEntries(p.sizes.map((s,si)=>[s,index===3&&si===2?0:4+((index+ci+si)%5)]))])),image:`assets/photos/${p.id}-front.webp`};
});
products.push({id:'as-025',no:25,line:1,name:'ASEED LOGO TEE',nameJa:'aseed ロゴTシャツ',category:'cutsewn',price:13200,colors:['WHITE','BLACK'],sizes:['1','2','3'],desc:'一枚で着る、そのためのロゴT。厚手のコットンに、aseedの文字を静かに配しました。少しゆとりのある身幅と、端正なネックライン。',descEn:'A signature, simply worn. Dense cotton, an easy silhouette, and the aseed wordmark printed across the chest.',isNew:true,releaseAt:'2026-09-15',material:{ja:'コットン100%・胸元プリント',en:'100% cotton; printed wordmark'},care:{ja:'裏返して冷水洗い・プリントへの直接アイロン不可。',en:'Cold wash inside out. Do not iron directly on the print.'},measurements:[[68,55,49,22],[71,58,51,23],[74,61,53,24]],measurementType:'top',featured:true,stock:{WHITE:{1:8,2:6,3:4},BLACK:{1:5,2:7,3:0}},image:'assets/photos/as-025-front.webp'});
fs.writeFileSync('js/catalog.mjs',`// Original 24 concepts retained; measurements and stock are clearly labelled demo data.\nexport const products = ${JSON.stringify(products,null,2)};\nexport const featuredIds = ${JSON.stringify(features)};\n`);
