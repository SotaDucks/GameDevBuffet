"""从已读取的 Miro 快照生成资源数据与静态分区页面；不运行测试。"""
from pathlib import Path
import html
import json
import re
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

ROOT = Path(__file__).resolve().parents[1]
BOARD = 'https://miro.com/app/board/uXjVJhRcRPg=/'
tree = ET.parse(ROOT / 'assets/data/miro-board.svg').getroot()
nodes = {n.get('data-miro-id'): n for n in tree.iter() if n.get('data-miro-id')}

def clean_url(url):
    p = urlsplit(html.unescape(url))
    query = [(k, v) for k, v in parse_qsl(p.query) if k in ('v', 'list', 'index', 'p', 't', 'lang', 'tab', 'moveToWidget')]
    return urlunsplit((p.scheme, p.netloc, p.path, urlencode(query), p.fragment))

def item(key, title, url, desc, note='', kind=None):
    url = clean_url(url)
    host = urlsplit(url).netloc
    platform = 'youtube' if 'youtube.com' in host else 'bilibili' if 'bilibili.com' in host and '/video/' in url else 'github' if host == 'github.com' else 'miro' if host == 'miro.com' else 'website'
    kind = kind or ('video' if '/watch?' in url or '/video/' in url else 'channel' if 'youtube.com/@' in url else 'tool')
    if kind == 'docs' and platform == 'website': platform = 'docs'
    return dict(id=key, title=title, url=url, desc=desc, note=note, type=kind, platform=platform)

def widget(wid, title, desc, note='', kind=None):
    n = nodes[wid]
    return item('miro-' + wid, title or n.get('data-title', '资料'), n.get('data-url'), desc, note, kind)

def group(key, title, hint, items, note=''):
    return dict(id=key, title=title, hint=hint, items=items, note=note)

ai = [group('editors', 'AI 编程工具', '熟悉 Unity 基础后，挑选一个工具开始。', [
    widget('3458764650956889459', 'Cursor', '资料板收录的 AI 代码编辑器与 Agent 入口。'),
    widget('3458764650957238017', 'TRAE', '资料板收录的 AI 编程工具，前往网站了解和下载。'),
    widget('3458764665762169179', 'Google Antigravity', '资料板收录的 Google AI 开发工具入口。'),
    widget('3458764673185976160', 'Codex', '资料板收录的 OpenAI 编程工具入口。')
], '资料板的学习顺序：先跟完几期 Unity 教程，建立基础认识，再开始使用 AI 编程工具。')]

art = [
 group('draw-2d', '2D 美术资产 · 手搓', '手绘、数字绘画与像素画，适合持续积累。', [
    item('drawing', '手绘与数字绘画', BOARD+'?moveToWidget=3458764650942402690', '从手绘或熟悉的数字绘画工具开始制作素材。', '资料板提醒：绘画没有速成，需要长期练习。', 'reference'),
    item('aseprite', 'Aseprite', 'https://www.aseprite.org/', '资料板收录的像素画与逐帧动画制作软件。', '可从官网或 Steam 获取；零基础同学需要预留练习时间。'),
    widget('3458764650942658101', 'Aseprite 二十分钟快速上手', '学习 Aseprite 的基础操作，作为像素画练习的起点。'),
    item('photoshop', 'Adobe Photoshop', 'https://www.adobe.com/products/photoshop.html', '已有 Photoshop 基础的同学可以用熟悉的工具制作游戏素材。'),
    item('illustrator', 'Adobe Illustrator', 'https://www.adobe.com/products/illustrator.html', '已有矢量设计基础的同学可使用 Illustrator 制作美术素材。'),
    widget('3458764666875728934', '用 Photoshop 制作精灵图', '学习为 Unity 游戏制作 Sprite Sheet（精灵图集）。')
 ]),
 group('generate-2d', '2D 美术资产 · AI 路线', '资料板中的图像生成工具与入门教程。', [
    item('nano-banana', 'Nano Banana / Google AI Studio', 'https://aistudio.google.com/', '从资料板提供的 AI Studio 入口探索图像生成。'),
    item('midjourney', 'Midjourney', 'https://www.midjourney.com/explore?tab=video_top', '资料板收录的图像生成工具与作品浏览入口。'),
    widget('3458764650944315203', 'Midjourney 零基础入门教程', '资料板收录的 2025 版教程，从基础操作开始学习。')
 ], '资料板提示：AI 生成结果需要筛选与调整；工具的可用功能、费用和访问条件以网站当前说明为准。'),
 group('animate-2d', '2D 动画 · 手搓', '从骨骼绑定、权重到逐帧动画。', [
    item('spine', 'Spine', 'https://esotericsoftware.com/', '用于 2D 骨骼绑定与动画制作，资料板建议先学骨骼、权重和动画。'),
    widget('3458764650938795934', 'Spine：网格、权重与走路动画', '从教程的第 4 集开始学习网格和权重。'),
    item('unity-animation', 'Unity 2D Animation', 'https://docs.unity3d.com/Packages/com.unity.2d.animation@latest', 'Unity 2D 骨骼动画套件的官方文档入口。', '选择与你的 Unity 和包版本匹配的文档。', 'docs'),
    widget('3458764650939631537', '不依赖 Photoshop 的 Unity 2D 绑定', '学习 Unity 中的 2D 角色绑定与动画制作。'),
    widget('3458764650940705625', 'Aseprite：像素逐帧动画入门', '同一套像素画工具也能用于逐帧动画；操作之外仍需绘画积累。')
 ]),
 group('ai-animation-2d', '2D 动画 · AI 路线', '生成图像或视频，再整理为可用的动画帧。', [
    item('gpt-image', 'GPT Image / ChatGPT', 'https://chatgpt.com/', '资料板提供的图像生成入口，可用于探索角色与画面。'),
    widget('3458764650941983568', 'AI 游戏人物帧序列工作流', '资料板收录的角色帧序列教程，工作流入口在视频置顶区。'),
    item('video-sprites', '用视频模型制作精灵图', BOARD+'?moveToWidget=3458764673185909075', '查看资料板内嵌的工作流文档。', '该文档保留在原板中，点击查看原始资料。', 'reference'),
    item('jimeng', '即梦', 'https://jimeng.jianying.com/', '资料板列出的 AI 图像和视频工具之一。'),
    widget('3458764665702493794', '可灵 Kling AI', '资料板收录的 AI 图像与视频生成工具。'),
    item('tapnow', 'Tapnow', BOARD+'?moveToWidget=3458764665702493873', '资料板列出的另一项创作工具。', '板上没有提供外部链接，此卡片定位到原板条目。', 'reference')
 ], '资料板提醒：AI 工具变化快，结果可能不稳定，工作流需要结合自己的素材调整。'),
 group('model-3d', '3D 美术资产 · 手搓', 'Blender 建模与模型、材质导入 Unity。', [
    item('blender', 'Blender', 'https://www.blender.org/', '资料板推荐的 3D 创作工具，可从官网或 Steam 获取。', '导出前留意面数、面朝向和拓扑。'),
    widget('3458764650946081426', 'Blender → Unity：模型导出', '处理导出中的坐标轴、缩放和贴图打包问题。'),
    widget('3458764650946081906', 'Blender → Unity：材质与贴图导出', '学习将 Blender 材质和贴图带入 Unity。')
 ]),
 group('generate-3d', '3D 美术资产 · 资产与 AI', '先获得模型，再处理拓扑、材质和引擎导入。', [
    item('asset-store', 'Unity Asset Store', 'https://assetstore.unity.com/', '查找可用于原型的模型、场景与成套资产。', '选择与项目渲染管线匹配的资源，并查看资源自身的使用许可。', 'resource'),
    widget('3458764650947471083', '资产变紫色？材质与 URP 转换教程', '资料板重点标记的材质兼容问题教程。'),
    item('tripo', 'Tripo AI', 'https://www.tripo3d.ai/', '资料板列出的 3D 模型生成工具之一。'),
    item('meshy', 'Meshy', 'https://www.meshy.ai/', '资料板列出的 3D 模型生成工具之一。'),
    item('sam3d', 'SAM 3D', 'https://github.com/facebookresearch/sam-3d-objects', '资料板列出的 SAM 3D 项目入口。'),
    item('hunyuan', '混元 3D', 'https://3d.hunyuan.tencent.com/', '资料板列出的 3D 生成工具之一。'),
    widget('3458764665762007323', 'Rodin / Hyper3D', '资料板补充的 3D 模型生成工具。'),
    widget('3458764650948227483', '生成模型的 Blender → Unity 中转', '得到模型后，参考模型导出教程整理并导入 Unity。'),
    widget('3458764650948227532', '生成模型的材质与贴图导出', '继续处理模型材质、贴图与 Unity 导入。')
 ], '资料板提醒：生成模型适合快速原型，但 UV、布线和输出稳定性可能需要额外处理。'),
 group('animate-3d', '3D 动画 · 半手搓', 'Mixamo 动作、骨骼适配与 Cascadeur 制作。', [
    widget('3458764650956889670', 'Mixamo', '资料板收录的角色与动作资源入口。'),
    widget('3458764650949079162', 'Unity 动画与 Mixamo · 基础篇', '学习将 Mixamo 模型与动画导入 Unity。'),
    widget('3458764650949316444', '给自己的模型绑定 Mixamo 动画', '资料板重点标记：将动作应用到自己的模型，再导入 Unity。'),
    item('cascadeur', 'Cascadeur', 'https://cascadeur.com/', '资料板收录的 3D 动画制作工具。', '资料板提醒：导入的模型需要先绑好骨骼。'),
    widget('3458764650950210816', 'Cascadeur：制作第一个动画', '资料板推荐的官方入门教程。')
 ]),
 group('ready-animation', '3D 动画 · 现成资源', '从附带动画的资产开始搭建原型。', [
    item('animated-assets', '带动画的 Unity 资产', 'https://assetstore.unity.com/', '资料板提醒：部分 3D 资源已经包含动画，可结合项目需求选择。', '下载前查看动画列表、适用角色和渲染管线。', 'resource')
 ]),
 group('rigging-extra', '角色与绑定补充', '资料板在主分区周围补充的角色制作工具。', [
    item('lpc', 'Universal LPC Spritesheet Generator', 'https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/#sex=male&body=Body_color_light&head=Human_male_light&expression=Neutral_light', '组合像素人物部件并生成角色精灵图。'),
    widget('3458764665773567716', 'Auto-Rig Pro 角色绑定教程', '资料板建议：Mixamo 无法处理角色骨骼时，可了解这条绑定路线。'),
    widget('3458764668085839550', 'Rokoko Create', '资料板补充的文字生成骨骼动画工具入口。'),
    widget('3458764669152866682', 'Anything World', '资料板补充：非人类生物的模型与动画处理入口。')
 ])
]

xr = [
 group('headset', '头显开发教程', '先从完整教程理解头显开发流程。', [
    widget('3458764668079073589', 'Valem Tutorials', '资料板推荐的头显开发教程频道，适合持续学习。')]),
 group('ar', 'AR 识别与平面', '资料板中的图案、空间和平面识别方向。', [
    widget('3458764673068663122', 'Vuforia Ground Plane', '资料板提供的 Vuforia 平面识别文档入口。', kind='docs')]),
 group('quest', 'Meta Quest 环境配置', '配置前留意工具、引擎和设备版本。', [
    widget('3458764673185976292', 'Meta Quest · Unity 环境配置', '资料板提供的官方 Unity 开发环境配置文档。', '原板使用 Oculus 文档地址；若页面迁移，请从官方文档目录继续查找对应版本。', 'docs'),
    widget('3458764673509207630', 'Quest 连接与登录问题参考', '资料板收录的 Bilibili 图文资料，供连接和登录问题排查参考。', '资料板特别提醒：头显与 PC 端登录账号需要一致。', 'reference')
 ], '资料板包含旧的网络排查与 hosts 配置记录。原始记录可在板中查看；这里保留资料入口，具体配置应结合当前环境判断。')
]

tools = [
 group('capture-audio', '录屏、声音与配音', '记录画面、编辑声音，为游戏准备音视频素材。', [
    widget('3458764671119475662', 'ScreenToGif', '录屏与动画帧编辑；资料板也推荐用它提取 Sprite Animation。'),
    widget('3458764671119556121', 'Audacity', '资料板收录的录音与声音编辑工具。'),
    widget('3458764673185976920', '讯飞智作', '资料板收录的文字转语音与配音服务入口。'),
    widget('3458764673508929796', 'ElevenLabs', '资料板补充的 AI 配音工具。')]),
 group('visual-tools', '姿势、地图与像素化', '快速制作参考图和程序化素材。', [
    widget('3458764671119631919', 'JustSketchMe', '摆放角色人偶姿势，作为绘画、图像和视频创作参考。'),
    widget('3458764671119696344', 'Mapgen2 岛屿地图生成器', 'Red Blob Games 的程序化岛屿地图工具。'),
    widget('3458764671119696805', 'Pixel It', '将图像转换成像素化效果的工具。')]),
 group('effects', '动画、Shader 与天空盒', '为界面与场景补上视觉表现。', [
    widget('3458764674052857059', 'React Bits', '资料板收录的前端动画组件资源。'),
    widget('3458764676207191618', 'ShaderLibrary', '资料板收录的开源 Shader 库。'),
    widget('3458764676219768456', 'Shader 学习文档 · 连连看对应节点', '板上位于 ShaderLibrary 上方的配套学习文档。', kind='docs'),
    widget('3458764676381018796', 'FreeStylized 天空盒', '资料板收录的风格化天空盒资源入口。', kind='resource')]),
 group('generators', 'AI 素材与 3D 工具', '资料板后续补充的图像、精灵和 3D 工具。', [
    widget('3458764676743741409', 'TripoSplat', '从单张图像生成 3D Gaussian 的开源项目。'),
    widget('3458764678128978992', 'Holopix AI', '资料板收录的 AI 游戏美术生成网站。'),
    widget('3458764680847661611', 'Anything World / Everything Universe', '资料板补充的 AI 3D 动画相关工具。'),
    widget('3458764681510570149', 'Sprite Maker', '资料板收录的开源 AI 精灵图制作工具。')])
]

# 作品与风格参考统一由 inspiration-data.js 维护，不在美术区重复生成。
pages = {
 'ai-coding': dict(no='03', title='AI 编程区', short='AI 编程', en='AI Coding', lead='先建立 Unity 基础，再让 AI 加入你的开发流程。这里整理了资料板收录的四个编程工具，选择一个开始动手。', groups=ai, source='3458764650956513989'),
 'art': dict(no='04', title='游戏美术区', short='美术', en='Game Art', lead='从一张角色图，到一个能动起来的模型。按 2D / 3D、素材 / 动画选择路线，手工制作、现成资产与 AI 工具都在这里。', groups=art, heroGroups=['draw-2d','animate-2d','model-3d','animate-3d'], source='3458764650951988035'),
 'xr': dict(no='05', title='XR 教程', short='XR', en='XR', lead='把游戏带到头显和现实空间中。从头显开发教程、AR 平面识别，到 Meta Quest 的环境配置，按需要选择入口。', groups=xr, source='3458764668079073272'),
 'tools': dict(no='06', title='好用小工具', short='工具', en='Useful Tools', lead='录一段演示、配一段声音、生成一张地图。把开发中顺手的小工具收在一起，需要时就来拿。', groups=tools, source='3458764671119475373')
}

# 板外补充的 Unity 视频也归入现有页面。
unity_extra = [
 widget('3458764666878093088', 'Unity 2D 视差背景效果', '用 100 秒了解 2D 视差背景效果，为场景增加层次。'),
 widget('3458764667082968799', 'Unity 角色控制器与 Locomotion', '资料板补充的角色控制与移动动画方案介绍。')
]

jobs = []
cache_path=ROOT/'assets/data/image-sources.json'
image_cache=json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else {}
def cached_image(it):
    cached=image_cache.get(it['id'], {})
    if cached.get('thumbnail') and (ROOT/cached['thumbnail']).exists():
        it.update({k:v for k,v in cached.items() if k in ('thumbnail','thumbnailFit')})
for page in pages.values():
 for i, g in enumerate(page['groups'], 1):
  g['no'] = str(i).zfill(2)
  for it in g['items']:
   it['thumbnail'] = 'assets/images/resources/' + it['id'] + '.svg'
   cached_image(it)
   jobs.append(it)
for it in unity_extra:
 it['thumbnail'] = 'assets/images/resources/' + it['id'] + '.svg'
 cached_image(it)
 jobs.append(it)

def write_data(name, page):
 (ROOT / ('assets/js/' + name + '-data.js')).write_text('/* 内容整理自游戏开发自助餐 Miro 板；修改 groups 可维护资源。 */\nwindow.RESOURCE_PAGE = '+json.dumps(page,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')

for name,page in pages.items(): write_data(name,page)

unity_path = ROOT / 'assets/js/unity-data.js'
unity_text = unity_path.read_text(encoding='utf-8')
# 使用独立补充数据，避免重写用户已维护的原有五条教程。
extra_group=group('unity-extra','补充教程','继续探索场景效果与角色控制。',unity_extra)
extra_group['no']='06'
(ROOT/'assets/js/unity-extra.js').write_text('/* Miro 板外补充教程 */\nwindow.RESOURCE_PAGE.groups.push('+json.dumps(extra_group,ensure_ascii=False,indent=2)+');\n',encoding='utf-8')

areas=[('inspiration','灵感刷刷区',15),('unity','Unity 引擎区',8)]+[(key,p['title'],sum(len(g['items']) for g in p['groups'])) for key,p in pages.items()]
def nav(active):
 return '\n'.join('        <a '+('class="is-active" aria-current="page" ' if key==active else '')+'href="'+key+'.html">'+title+'<sup>'+str(count)+'</sup></a>' for key,title,count in areas)

template=(ROOT/'unity.html').read_text(encoding='utf-8')
for name,p in pages.items():
 text=template
 text=re.sub(r'<title>.*?</title>','<title>'+p['title']+' · 游戏开发自助餐</title>',text)
 text=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="'+html.escape(p['lead'],quote=True)+'">',text)
 text=text.replace('游戏开发自助餐<em>· Unity</em>','游戏开发自助餐<em>· '+p['short']+'</em>')
 text=re.sub(r'(<nav class="area-nav"[^>]*>).*?(</nav>)',lambda m:m[1]+'\n'+nav(name)+'\n      '+m[2],text,flags=re.S)
 text=text.replace('Area 02 / Unity','Area '+p['no']+' / '+p['en']).replace('<h1>Unity 引擎区</h1>','<h1>'+p['title']+'</h1>')
 text=re.sub(r'<p class="lead">.*?</p>','<p class="lead">'+p['lead']+'</p>',text)
 count=sum(len(g['items']) for g in p['groups'])
 platforms=sorted({it['platform'] for g in p['groups'] for it in g['items']})
 text=re.sub(r'(<b id="stat-items">).*?(</b>)',lambda m:m[1]+str(count)+m[2],text)
 text=re.sub(r'(<b id="stat-platforms">).*?(</b>)',lambda m:m[1]+str(len(platforms))+m[2],text).replace('个平台','类来源')
 text=re.sub(r'(<b id="stat-groups">).*?(</b>)',lambda m:m[1]+str(len(p['groups']))+m[2],text).replace('个学习阶段','个分组')
 text=re.sub(r'<nav class="learning-path".*?</aside>','<nav class="group-links" id="group-links" aria-label="分组直达"></nav>',text,flags=re.S)
 labels={'website':'网站','docs':'文档','github':'GitHub','miro':'原板资料','bilibili':'Bilibili','youtube':'YouTube'}
 buttons='\n'.join('        <button class="chip" type="button" data-platform-chip="'+x+'" aria-pressed="false">'+labels[x]+'</button>' for x in platforms)
 text=re.sub(r'        <button class="chip" type="button" data-platform-chip="bilibili".*?(?=        <label)',lambda m:buttons+'\n',text,flags=re.S)
 text=text.replace('搜索教程、2D、3D 或素材…','搜索名称、用途或提醒…').replace('搜索教程','搜索资源').replace('筛选教程','筛选资源').replace('没有符合条件的教程','没有符合条件的资源').replace('查看教程列表','查看资源列表')
 text=text.replace('moveToWidget=3458764650951988857','moveToWidget='+p['source'])
 text=text.replace('assets/js/unity-data.js','assets/js/'+name+'-data.js')
 text=text.replace('  <script src="assets/js/unity-extra.js"></script>\n','')
 (ROOT/(name+'.html')).write_text(text,encoding='utf-8')

for name in ['index','inspiration','unity']:
 path=ROOT/(name+'.html');text=path.read_text(encoding='utf-8')
 text=re.sub(r'(<nav class="area-nav"[^>]*>).*?(</nav>)',lambda m:m[1]+'\n'+nav(name)+'\n      '+m[2],text,flags=re.S)
 if name=='index':text=text.replace('已开放 2 个','已开放 6 个').replace('更多分区陆续上线','6 个分区 · 自由取用')
 if name=='unity' and 'unity-extra.js' not in text:text=text.replace('<script src="assets/js/unity-data.js"></script>','<script src="assets/js/unity-data.js"></script>\n  <script src="assets/js/unity-extra.js"></script>')
 if name=='unity':
  text=re.sub(r'(<b id="stat-items">).*?(</b>)',lambda m:m[1]+'8'+m[2],text)
  text=re.sub(r'(<b id="stat-groups">).*?(</b>)',lambda m:m[1]+'6'+m[2],text)
 path.write_text(text,encoding='utf-8')

path=ROOT/'assets/js/index.js';text=path.read_text(encoding='utf-8')
for key,title,count in areas:
 if key in pages:
  text=re.sub(r"(\{ no: '[^']+', id: '"+re.escape(key)+r"', title: '[^']+', desc: '[^']*') \}",lambda m:m[1]+", href: '"+key+".html', live: true, count: "+str(count)+" }",text)
for key,title,count in areas:
 text=re.sub(r"(href: '"+re.escape(key)+r"\.html', live: true, count: )\d+",lambda m:m[1]+str(count),text)
path.write_text(text,encoding='utf-8')
# 保留不由本脚本生成的灵感区与 Unity 主数据的图片任务。
jobs_path=ROOT/'assets/data/resource-images.json'
previous_jobs=json.loads(jobs_path.read_text(encoding='utf-8')) if jobs_path.exists() else []
generated_ids={it['id'] for it in jobs}
jobs.extend(it for it in previous_jobs if it['id'] not in generated_ids)
jobs_path.write_text(json.dumps(jobs,ensure_ascii=False,indent=2),encoding='utf-8')
print('Generated pages:', ', '.join(name+': '+str(sum(len(g['items']) for g in p['groups'])) for name,p in pages.items()))
