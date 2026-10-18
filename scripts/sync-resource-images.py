"""获取资源原站的封面；网站没有可用图片时制作带名称和域名的本地文字封面。"""
from pathlib import Path
from urllib.parse import urlsplit, urljoin, parse_qs
from html.parser import HTMLParser
import concurrent.futures
import html
import json
import re
import urllib.request

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/images/resources'
OUT.mkdir(parents=True,exist_ok=True)
jobs=json.loads((ROOT/'assets/data/resource-images.json').read_text(encoding='utf-8'))

class Metadata(HTMLParser):
 def __init__(self): super().__init__(); self.images=[]; self.icons=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta' and a.get('property',a.get('name','')) in ('og:image','twitter:image') and a.get('content'):self.images.append(a['content'])
  if tag=='link' and 'icon' in a.get('rel','').split() and a.get('href'):self.icons.append(a['href'])

def read(url):
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Referer':'https://www.bilibili.com/' if 'bilibili' in url or 'hdslb' in url else url})
 with urllib.request.urlopen(req,timeout=14) as res:return res.read(6_000_000),res.headers.get('Content-Type','')

def fallback(it):
 title=it['title']; domain=urlsplit(it['url']).netloc.removeprefix('www.')
 lines=[title[i:i+22] for i in range(0,min(len(title),66),22)]
 texts=''.join('<text x="32" y="'+str(116+i*35)+'" font-size="25" fill="#eceae4">'+html.escape(s)+'</text>' for i,s in enumerate(lines))
 svg='<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#12141a"/><path d="M32 55H608M32 282H608" stroke="#3a3f4b"/><text x="32" y="38" fill="#ffc46b" font-family="sans-serif" font-size="13">GAME DEV BUFFET / RESOURCE</text><g font-family="sans-serif">'+texts+'<text x="32" y="317" font-size="16" fill="#a9a69d">'+html.escape(domain)+'</text></g></svg>'
 path=OUT/(it['id']+'.svg');path.write_text(svg,encoding='utf-8')
 return str(path.relative_to(ROOT)).replace('\\','/')

def save(it):
 fallback_path=fallback(it)
 result={'thumbnail':fallback_path, 'imageSource':'local-title-card'}
 candidates=[]
 try:
  u=it['url'];q=parse_qs(urlsplit(u).query)
  if it['platform']=='youtube' and 'v' in q:
   candidates=[('https://i.ytimg.com/vi/'+q['v'][0]+'/hqdefault.jpg',False)]
  elif it['platform']=='bilibili':
   bvid=re.search(r'BV[0-9A-Za-z]+',u).group()
   raw,_=read('https://api.bilibili.com/x/web-interface/view?bvid='+bvid)
   pic=json.loads(raw)['data']['pic'].replace('http:','https:');candidates=[(pic,False)]
  elif it['platform']!='miro':
   raw,_=read(u);meta=Metadata();meta.feed(raw.decode('utf-8',errors='replace'))
   candidates=[(urljoin(u,x),False) for x in meta.images[:2]]+[(urljoin(u,x),True) for x in meta.icons[-2:]]
  for image_url,icon in candidates:
   try:
    raw,ct=read(image_url)
    if raw[:3]==b'\xff\xd8\xff':ext='.jpg'
    elif raw[:8]==b'\x89PNG\r\n\x1a\n':ext='.png'
    elif raw[:4]==b'RIFF' and raw[8:12]==b'WEBP':ext='.webp'
    elif raw[:6] in (b'GIF87a',b'GIF89a'):ext='.gif'
    elif raw[:4]==b'\x00\x00\x01\x00':ext='.ico'
    else:continue
    path=OUT/(it['id']+ext);path.write_bytes(raw)
    result={'thumbnail':str(path.relative_to(ROOT)).replace('\\','/'),'imageSource':image_url}
    if icon or it['type']=='channel':result['thumbnailFit']='contain'
    break
   except Exception:continue
 except Exception:pass
 return it['id'],result

cache_path=ROOT/'assets/data/image-sources.json'
results=json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else {}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for key,result in pool.map(save,jobs):
  results[key]=result
  print(key, 'image' if result['imageSource']!='local-title-card' else 'title card',flush=True)

# 数据文件使用已获取的本地图片，不依赖运行时请求第三方服务。
for path in (ROOT/'assets/js').glob('*-data.js'):
 if path.stem in ('unity-data','inspiration-data'):continue
 text=path.read_text(encoding='utf-8');prefix,body=text.split('window.RESOURCE_PAGE = ',1)
 data=json.loads(body.rstrip().removesuffix(';'))
 for group in data['groups']:
  for it in group['items']:
   if it['id'] in results:it.update({k:v for k,v in results[it['id']].items() if k!='imageSource'})
 path.write_text(prefix+'window.RESOURCE_PAGE = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')

path=ROOT/'assets/js/unity-extra.js';text=path.read_text(encoding='utf-8')
body=text.split('groups.push(',1)[1].rstrip().removesuffix(');')
data=json.loads(body)
for it in data['items']:
 if it['id'] in results:it.update({k:v for k,v in results[it['id']].items() if k!='imageSource'})
path.write_text('/* Miro 板外补充教程 */\nwindow.RESOURCE_PAGE.groups.push('+json.dumps(data,ensure_ascii=False,indent=2)+');\n',encoding='utf-8')
(ROOT/'assets/data/image-sources.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
