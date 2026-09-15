import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'};
http.createServer((req,res)=>{
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch {res.writeHead(400);return res.end();}
  let file=path.resolve(root,'.'+pathname);
  if (!file.startsWith(root+path.sep) && file!==root) {res.writeHead(403);return res.end();}
  if (pathname.endsWith('/')) file=path.join(file,'index.html');
  if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404,{'Content-Type':'text/html'});return res.end(fs.existsSync('404.html')?fs.readFileSync('404.html'):'Not found');}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});fs.createReadStream(file).pipe(res);
}).listen(8765,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8765'));
