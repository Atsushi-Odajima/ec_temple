import fs from 'node:fs';
import path from 'node:path';
import { renderPage } from '../js/render.mjs';
import { products } from '../js/catalog.mjs';
import { images,heroImage } from '../js/image-manifest.mjs';
import { escapeHtml as e } from '../js/core.mjs';
const preview=process.argv.includes('--preview');
const origin=JSON.parse(fs.readFileSync('data/site.json','utf8')).publicUrl.replace(/\/$/,'');
const pages=['index','store','product','cart','checkout','order','lookbook','about','contact','guide','shipping','legal','privacy','terms','case-study','404'];
const titles={index:'aseed — Quiet forms. Everyday life.',store:'コレクション — aseed',product:'商品詳細 — aseed',cart:'ショッピングバッグ — aseed',checkout:'購入手続き — aseed',order:'デモ注文完了 — aseed',lookbook:'Lookbook — aseed',about:'Our story — aseed',contact:'お問い合わせ — aseed',guide:'ご利用ガイド — aseed',shipping:'配送・返品・交換 — aseed',legal:'特定商取引法に基づく表記 — aseed',privacy:'プライバシーポリシー — aseed',terms:'利用規約 — aseed','case-study':'aseed / 制作事例 — Atsushi Odajima','404':'ページが見つかりません — aseed'};
function documentFor(page,id='') {
 const p=products.find(p=>p.id===id);
 const title=p?`${p.nameJa} — aseed`:titles[page];
 const description=p?p.desc:'aseed — 余白を纏う。25点のアパレルコンセプトと、日常のためのワードローブ。日本語・英語で体験できるポートフォリオ用ストア。';
 const file=p?`product-${id}.html`:`${page}.html`;
 const ctx={page,lang:'ja',id,cart:[],favorites:[],query:'',category:'all',sort:'featured',selection:{},checkout:{step:0,delivery:{},payment:'card-demo'}};
 const hide=['cart','checkout','order','404','product'].includes(page)&&!id;
 return `<!DOCTYPE html>\n<html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta name="theme-color" content="#faf9f6">${hide?'<meta name="robots" content="noindex,follow">':''}<link rel="canonical" href="${origin}/${page==='index'?'':file}"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="css/atelier.css">${page==='index'?`<link rel="preload" as="image" href="${heroImage}">`:''}<script type="module" src="js/app.mjs"></script></head><body data-page="${page}" ${id?`data-product="${id}"`:''}><div id="site-content">${renderPage(ctx)}</div><dialog class="drawer" id="cart-dialog" aria-labelledby="cart-title"></dialog><dialog class="zoom-dialog" id="zoom-dialog" aria-label="商品写真の拡大 / Enlarged product image"></dialog><div class="toast" id="toast" hidden role="status" aria-live="polite"></div><noscript><div class="notice">お買い物機能・英語表示にはJavaScriptが必要です。Please enable JavaScript to use shopping features and switch languages.</div></noscript></body></html>\n`;
}
for(const page of pages)fs.writeFileSync(`${page}.html`,documentFor(page));
for(const p of products)fs.writeFileSync(`product-${p.id}.html`,documentFor('product',p.id));
if(preview){console.log('Preview pages generated.');process.exit(0);}
for(const p of products){if(!images[p.id]?.front)throw new Error(`Missing primary photograph: ${p.id}`);for(const color of p.colors)if(!images[p.id]?.colors?.[color]?.front)throw new Error(`Missing color photo: ${p.id} ${color}`);}
for(const id of ['as-001','as-004','as-007','as-010','as-016','as-025'])for(const view of ['front','back','model','detail'])if(!images[id]?.[view])throw new Error(`Missing featured view ${id} ${view}`);
const required=new Set([heroImage,...Object.values(images).flatMap(entry=>Object.values(entry.colors).flatMap(views=>Object.values(views)))]);
for(const file of required)if(!fs.existsSync(file))throw new Error(`Missing asset ${file}`);
fs.mkdirSync('dist',{recursive:true});
for(const dir of ['css','js','assets','data'])fs.cpSync(dir,path.join('dist',dir),{recursive:true});
for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html')))if(!file.startsWith('concept'))fs.copyFileSync(file,path.join('dist',file));
for(const file of ['robots.txt','sitemap.xml','_headers'])if(fs.existsSync(file))fs.copyFileSync(file,path.join('dist',file));
const sitemapPages=pages.filter(p=>!['product','cart','checkout','order','404'].includes(p)).map(p=>p==='index'?'':`${p}.html`).concat(products.map(p=>`product-${p.id}.html`));
fs.writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapPages.map(p=>`<url><loc>${origin}/${p}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync('robots.txt',`User-agent: *\nAllow: /\nDisallow: /checkout.html\nDisallow: /cart.html\nDisallow: /order.html\nSitemap: ${origin}/sitemap.xml\n`);
fs.copyFileSync('sitemap.xml','dist/sitemap.xml');fs.copyFileSync('robots.txt','dist/robots.txt');
const broken=[];for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(path.join('dist',file),'utf8');for(const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)){const target=match[1].split(/[?#]/)[0];if(!target||/^(?:https?:|data:|mailto:)/.test(target))continue;if(!fs.existsSync(path.join('dist',target)))broken.push(`${file}: ${target}`);}}
if(broken.length)throw new Error(`Broken references:\n${broken.join('\n')}`);
console.log(`Build complete: ${pages.length+products.length} HTML pages, ${required.size} photographic assets. All local references resolved.`);
