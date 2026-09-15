"""Encode generated photographs for delivery, without altering their content."""
import json, pathlib, re, sys
from PIL import Image
root=pathlib.Path(__file__).resolve().parents[1]
manifest_path=pathlib.Path(sys.argv[1])
entries=json.loads(manifest_path.read_text(encoding='utf-8-sig'))
out=root/'assets'/'photos'
out.mkdir(parents=True,exist_ok=True)
data={}
provenance=[]
primary={p['id']:p['colors'][0] for p in json.loads((root/'data'/'original-products.json').read_text(encoding='utf-8'))}
primary['as-025']='WHITE'
for entry in entries:
    src=pathlib.Path(entry['path'])
    if not src.exists(): continue
    key=entry['key']
    name='hero' if key=='hero-editorial' else key
    dest=out/(name+'.webp')
    if not dest.exists() or src.stat().st_mtime>dest.stat().st_mtime:
        im=Image.open(src).convert('RGB')
        im.thumbnail((1920,1920) if key=='hero-editorial' else (1200,1600),Image.Resampling.LANCZOS)
        im.save(dest,'WEBP',quality=87,method=6)
    rel='assets/photos/'+dest.name
    match=re.match(r'(as-\d{3})',key)
    if match:
        pid=entry.get('productId') or match[1]
        view=entry.get('view') or next((v for v in ['front','back','model','detail'] if v in key),'front')
        color=entry.get('color') or next((c for c in ['BLACK','WHITE','ECRU','GREY'] if c.lower() in key),primary[pid])
        item=data.setdefault(pid,{'colors':{}})
        item['colors'].setdefault(color,{})[view]=rel
        if color==primary[pid]: item[view]=rel
    provenance.append({'file':rel,'method':'built-in image_gen','prompt':entry['prompt'],'note':'AI-generated concept imagery; not manufactured products.'})
(root/'js'/'image-manifest.mjs').write_text('export const images = '+json.dumps(data,ensure_ascii=False,indent=2)+';\nexport const heroImage = "assets/photos/hero.webp";\n',encoding='utf-8')
(root/'data'/'image-provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Imported {len(provenance)} images for {len(data)} products.')
