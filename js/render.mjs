import { header,footer,home,store,product,cartPage,lookbook,about,notFound } from './views.mjs';
import { infoPage,caseStudy,contact } from './info.mjs';
import { checkout,receipt } from './checkout.mjs';
export function mainContent(ctx) {
 const routes={index:home,store,product,cart:cartPage,lookbook,about,checkout,order:receipt};
 if(routes[ctx.page])return routes[ctx.page](ctx);
 if(['legal','privacy','terms','shipping','guide'].includes(ctx.page))return infoPage(ctx.page,ctx.lang);
 if(ctx.page==='case-study')return caseStudy(ctx.lang);
 if(ctx.page==='contact')return contact(ctx.lang);
 return notFound(ctx.lang);
}
export function renderPage(ctx) {return header(ctx)+`<main id="main" tabindex="-1">${mainContent(ctx)}</main>`+footer(ctx.lang);}
