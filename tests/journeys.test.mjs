import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM,VirtualConsole } from 'jsdom';
let serial=0;
async function mount(page,{id='',cart=[],query=''}={}) {
 const errors=[],navigation=[];
 const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',error=>errors.push(error.message));
 const dom=new JSDOM(`<!doctype html><html lang="ja"><head><title>aseed</title><meta name="description"></head><body data-page="${page}" data-product="${id}"><div id="site-content"></div><dialog id="cart-dialog"></dialog><dialog id="zoom-dialog"></dialog><div id="toast" hidden></div></body></html>`,{url:`https://example.com/${page}.html${query}`,virtualConsole});
 const w=dom.window;
 w.localStorage.setItem('aseed.bag.v2',JSON.stringify(cart));
 w.HTMLElement.prototype.scrollIntoView=function(){};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
 w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 w.scrollTo=()=>{};
 for(const [key,value] of Object.entries({window:w,document:w.document,history:w.history,FormData:w.FormData,navigator:{clipboard:{writeText:async()=>{}}},location:{get search(){return w.location.search},get href(){return w.location.href},assign(value){navigation.push(value)},reload(){}}}))Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
 await import(`../js/app.mjs?journey=${++serial}`);
 const q=selector=>{const el=w.document.querySelector(selector);assert.ok(el,`Element exists: ${selector}`);return el;};
 const click=selector=>q(selector).click();
 const change=(selector,value)=>{const el=q(selector);if(el.type==='radio'||el.type==='checkbox')el.checked=true;else el.value=value;el.dispatchEvent(new w.Event('change',{bubbles:true}));};
 const submit=selector=>q(selector).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
 return {w,errors,navigation,q,click,change,submit,close:()=>w.close()};
}
test('product interaction requires size, adds selected variant, preserves selection across language switch',async()=>{
 const app=await mount('product',{id:'as-025'});
 app.submit('#product-form');assert.match(app.q('#product-error').textContent,/サイズ/);
 app.change('[name="size"][value="2"]');app.submit('#product-form');
 assert.equal(app.q('#cart-dialog').open,true);
 assert.deepEqual(JSON.parse(app.w.localStorage.getItem('aseed.bag.v2')),[{id:'as-025',color:'WHITE',size:'2',qty:1}]);
 app.click('[data-action="close-cart"]');app.click('[data-action="language"]');
 assert.equal(app.w.document.documentElement.lang,'en');assert.equal(app.q('[name="size"][value="2"]').checked,true);
 app.click('.save-detail');assert.deepEqual(JSON.parse(app.w.localStorage.getItem('aseed.saved.v2')),['as-025']);
 assert.deepEqual(app.errors,[]);app.close();
});
test('checkout supports validation, sample data, editing and completion without persisting address information',async()=>{
 const cart=[{id:'as-025',color:'WHITE',size:'2',qty:1}];
 const app=await mount('checkout',{cart});
 app.submit('#delivery-form');assert.equal(app.q('[name="email"]').getAttribute('aria-invalid'),'true');
 app.click('[data-action="sample-delivery"]');app.submit('#delivery-form');assert.ok(app.q('#payment-form'));
 app.submit('#payment-form');assert.ok(app.q('#review-form'));assert.match(app.q('#main').textContent,/14,000/);
 app.click('[data-action="checkout-step"][data-step="0"]');assert.equal(app.q('[name="email"]').value,'demo@example.com');
 app.submit('#delivery-form');app.submit('#payment-form');
 app.q('[name="reviewConsent"]').checked=true;app.submit('#review-form');
 const receipt=JSON.parse(app.w.sessionStorage.getItem('aseed.receipt.v2'));
 assert.equal(receipt.total,14000);assert.equal(receipt.items.length,1);assert.ok(receipt.id.startsWith('DEMO-'));
 assert.ok(!JSON.stringify(receipt).includes('demo@example.com'));assert.ok(!JSON.stringify(receipt).includes('Demo street'));
 assert.deepEqual(JSON.parse(app.w.localStorage.getItem('aseed.bag.v2')),[]);assert.equal(app.navigation[0],'order.html?lang=ja');
 app.submit('#review-form');assert.equal(app.navigation.length,1,'Duplicate submission is ignored');
 assert.deepEqual(app.errors,[]);app.close();
});
test('contact demo validates and displays a truthful non-delivery result without storing form contents',async()=>{
 const app=await mount('contact');app.submit('#contact-form');assert.equal(app.q('[name="name"]').getAttribute('aria-invalid'),'true');
 app.click('[data-action="sample-contact"]');app.q('[name="consent"]').checked=true;app.submit('#contact-form');
 assert.match(app.q('#contact-content').textContent,/実際には送信されていません/);
 assert.ok(!JSON.stringify(app.w.localStorage).includes('demo@example.com'));assert.equal(app.w.sessionStorage.length,0);
 app.click('[data-action="reset-contact"]');assert.equal(app.q('[name="email"]').value,'');
 assert.deepEqual(app.errors,[]);app.close();
});
test('cart quantity changes recalculate shipping and removal produces an actionable empty state',async()=>{
 const app=await mount('cart',{cart:[{id:'as-025',color:'WHITE',size:'2',qty:2}]});assert.match(app.q('.order-summary').textContent,/800/);
 app.click('[data-action="quantity"][data-delta="1"]');assert.match(app.q('.order-summary').textContent,/無料/);assert.match(app.q('.order-summary').textContent,/39,600/);
 app.click('[data-action="remove"]');assert.match(app.q('#cart-content').textContent,/バッグはまだ空/);assert.equal(app.q('[data-bag-count]').textContent,'0');
 assert.deepEqual(app.errors,[]);app.close();
});
