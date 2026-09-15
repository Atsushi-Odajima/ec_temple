export const SHIPPING_FEE = 800;
export const FREE_SHIPPING_MIN = 30000;
export const MAX_QUANTITY = 9;
export function yen(value, lang = 'ja') { return new Intl.NumberFormat(lang === 'ja' ? 'ja-JP' : 'en-US', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(value); }
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
export const itemKey = (id, color, size) => [id,color,size].join('|');
export function stockFor(product, color, size) { return product?.stock?.[color]?.[size] ?? 0; }
export function cleanCart(raw, products) {
  if (!Array.isArray(raw)) return [];
  const result = new Map();
  for (const item of raw) {
    const p = products.find(p => p.id === item?.id);
    if (!p || !p.colors.includes(item.color) || !p.sizes.includes(item.size)) continue;
    const max = Math.min(MAX_QUANTITY, stockFor(p,item.color,item.size));
    const qty = Number(item.qty);
    if (!Number.isSafeInteger(qty) || qty < 1 || max < 1) continue;
    const key = itemKey(p.id,item.color,item.size);
    result.set(key, { id:p.id, color:item.color, size:item.size, qty:Math.min(max,qty+(result.get(key)?.qty || 0)) });
  }
  return [...result.values()];
}
export function totals(items, products) {
  const valid = cleanCart(items,products);
  const subtotal = valid.reduce((sum,item) => sum + products.find(p=>p.id===item.id).price * item.qty,0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  return { subtotal,shipping,total:subtotal+shipping,count:valid.reduce((n,i)=>n+i.qty,0),remaining:Math.max(0,FREE_SHIPPING_MIN-subtotal) };
}
export function addItem(items, product, color, size, qty, products) {
  if (!product || !product.colors.includes(color) || !product.sizes.includes(size)) return {ok:false,error:'selection'};
  if (!Number.isInteger(qty) || qty<1) return {ok:false,error:'quantity'};
  const existing = cleanCart(items,products);
  const row = existing.find(i=>itemKey(i.id,i.color,i.size)===itemKey(product.id,color,size));
  if ((row?.qty||0)+qty > Math.min(MAX_QUANTITY,stockFor(product,color,size))) return {ok:false,error:'stock'};
  if (row) row.qty+=qty; else existing.push({id:product.id,color,size,qty});
  return {ok:true,items:existing};
}
export function validateDelivery(data) {
  const errors = {};
  if (!String(data.name||'').trim()) errors.name='required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email||''))) errors.email='email';
  if (!/^\d{3}-?\d{4}$/.test(String(data.postal||''))) errors.postal='postal';
  for (const key of ['prefecture','city','address']) if (!String(data[key]||'').trim()) errors[key]='required';
  return errors;
}
export function validateContact(data) {
  const errors={};
  if (!String(data.name||'').trim()) errors.name='required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email||''))) errors.email='email';
  if (!['product','order','collaboration','website'].includes(data.topic)) errors.topic='required';
  if (String(data.message||'').trim().length<10) errors.message='message';
  if (!data.consent) errors.consent='consent';
  return errors;
}
export function readStorage(storage,key,fallback) { try { const value=storage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
export function writeStorage(storage,key,value) { try { storage.setItem(key,JSON.stringify(value)); return true; } catch { return false; } }
