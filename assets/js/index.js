/* 首页（菜单）渲染 */
(function () {
  var ISO = window.ISO;
  if (!ISO) return;

  /* tags：卡片上的子路线标签（保持一行）；picks：代表资源 id，前三条同时作为封面拼贴 */
  var AREAS = [
    { no: '01', id: 'inspiration', title: '灵感刷刷区', short: '灵感', desc: '游戏设计频道、Game Jam 精选、作品与视觉风格参考。', href: 'inspiration.html', live: true, count: 15,
      tags: ['频道', 'Game Jam', '设计', '视觉参考'],
      picks: ['hundred-games', 'jam-2025', 'gmtk'] },
    { no: '02', id: 'unity', title: 'Unity 引擎区', short: 'Unity', desc: 'Unity 下载安装、零基础入门，2D / 3D 上手路线与开发架构实践。', href: 'unity.html', live: true, count: 8,
      tags: ['入门', '2D 路线', '3D 路线', '架构'],
      picks: ['unity-beginners', 'unity-movement', 'unity-starter-assets'] },
    { no: '03', id: 'ai-coding', title: 'AI 编程区', short: 'AI 编程', desc: 'Cursor、TRAE、Antigravity、Codex 等 AI 编程工具。', href: 'ai-coding.html', live: true, count: 4,
      tags: ['AI 编辑器', '编程智能体'],
      picks: ['miro-3458764650957238017', 'miro-3458764650956889459', 'miro-3458764673185976160'] },
    { no: '04', id: 'art', title: '游戏美术区', short: '美术', desc: '2D / 3D 美术资产与动画：手搓与 AI 两条路线。', href: 'art.html', live: true, count: 42,
      tags: ['2D 素材', '3D 建模', '动画', 'AI 路线'],
      picks: ['blender', 'miro-3458764650942658101', 'cascadeur'] },
    { no: '05', id: 'xr', title: 'XR 教程', short: 'XR', desc: '头显开发、AR 图案 / 空间 / 平面识别，以及 Meta Quest 环境配置。', href: 'xr.html', live: true, count: 4,
      tags: ['头显开发', 'AR 识别', 'Quest 配置'],
      picks: ['miro-3458764668079073589', 'miro-3458764673068663122', 'miro-3458764673185976292'] },
    { no: '06', id: 'tools', title: '好用小工具', short: '工具', desc: '录屏、配音、地图生成、像素化等实用小工具。', href: 'tools.html', live: true, count: 15,
      tags: ['录屏配音', 'Shader', 'AI 素材'],
      picks: ['miro-3458764671119696344', 'miro-3458764673508929796', 'miro-3458764671119631919'] }
  ];

  /* 各分区的数据文件。它们都写入同一个全局变量，所以按顺序逐个加载、逐个取走。 */
  var SOURCES = {
    inspiration: ['inspiration-data.js'],
    unity: ['unity-data.js', 'unity-extra.js'],
    'ai-coding': ['ai-coding-data.js'],
    art: ['art-data.js'],
    xr: ['xr-data.js'],
    tools: ['tools-data.js']
  };
  var PF = { youtube: 'YouTube', bilibili: 'B站', website: '网站', github: 'GitHub', docs: '文档', miro: '资料板' };
  var esc = ISO.esc;

  /* ---------- 首屏：6 块"餐盘"，已开放的亮着 ---------- */
  var s = 22, p = ISO.proj(s, 112, 34), size = 2.1, step = 2.55, art = '';
  art += '<svg viewBox="0 0 290 190" role="group" aria-label="六个分区示意图" focusable="false">';
  var order = [];
  AREAS.forEach(function (a, i) { order.push({ a: a, c: i % 3, r: Math.floor(i / 3) }); });
  order.sort(function (u, v) { return (u.c + u.r) - (v.c + v.r) || u.r - v.r; });
  order.forEach(function (o) {
    var x0 = o.c * step, y0 = o.r * step;
    var c = p(x0 + size / 2, y0 + size / 2, 0.5);
    var inner = '<g class="slab-wrap">' + ISO.box(p, x0, y0, 0, size, size, 0.5, 'slab') + '</g>' +
      '<text class="t0" text-anchor="middle" x="' + c[0].toFixed(1) + '" y="' + (c[1] - 3).toFixed(1) + '">' + o.a.no + '</text>' +
      '<text class="slot-name" text-anchor="middle" x="' + c[0].toFixed(1) + '" y="' + (c[1] + 11).toFixed(1) + '">' + o.a.short + '</text>';
    art += o.a.live
      ? '<a class="slot is-lit" href="' + o.a.href + '" aria-label="' + o.a.title + '">' + inner + '</a>'
      : '<g class="slot" aria-label="' + o.a.title + '（筹备中）">' + inner + '</g>';
  });
  art += '</svg>';
  document.getElementById('hero-art').innerHTML = art;

  /* 悬停时临时点亮 */
  Array.prototype.forEach.call(document.querySelectorAll('#hero-art .slot'), function (el) {
    el.addEventListener('mouseenter', function () { el.classList.add('is-lit'); });
    el.addEventListener('mouseleave', function () { if (!el.getAttribute('href')) el.classList.remove('is-lit'); });
  });

  /* ---------- 菜单卡片 ---------- */
  /* 先用配置画出卡片；分区数据加载后再换上拼贴封面和代表资源。加载失败时保留线稿封面和简介。 */
  var tiles = document.getElementById('tiles');
  tiles.innerHTML = AREAS.map(function (a) {
    var inner = '' +
      '<div class="cover" data-cover>' + ISO.cover(ISO.hash(a.id)) + '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta"><span class="tile-no">AREA ' + a.no + '</span></div>' +
        '<h3>' + a.title + '</h3>' +
        '<div class="tile-tags">' + a.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div data-picks><p class="desc">' + a.desc + '</p></div>' +
      '</div>' +
      '<div class="card-foot">' +
        (a.live ? '<span class="status live" data-sum>' + a.count + ' 条</span>' : '<span class="status">筹备中</span>') +
        '<span class="go">' + (a.live ? '进入 →' : '敬请期待') + '</span>' +
      '</div>';
    return a.live
      ? '<a class="card" href="' + a.href + '" data-area="' + a.id + '">' + inner + '</a>'
      : '<div class="card soon" aria-disabled="true">' + inner + '</div>';
  }).join('');

  function host(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  }
  function cell(it) {
    var body = ISO.isTitleCard(it.thumbnail) || !it.thumbnail
      ? ISO.titleCard(it.title, '')
      : '<img class="cover-image' + (it.thumbnailFit === 'contain' ? ' is-avatar' : '') + '" src="' + esc(it.thumbnail) + '" alt="" data-name="' + esc(it.title) + '" loading="lazy" decoding="async">';
    return '<div class="cell">' + body + '</div>';
  }

  function fill(a, data) {
    var card = tiles.querySelector('[data-area="' + a.id + '"]');
    if (!card || !data) return;
    var byId = {}, total = 0;
    data.groups.forEach(function (g) { g.items.forEach(function (it) { byId[it.id] = it; total++; }); });
    var picks = a.picks.map(function (id) { return byId[id]; }).filter(Boolean);
    if (!picks.length) return;

    var cover = card.querySelector('[data-cover]');
    cover.classList.add('collage');
    cover.innerHTML = picks.slice(0, 3).map(cell).join('') +
      (total > picks.length ? '<span class="more">+' + (total - picks.length) + '</span>' : '');
    Array.prototype.forEach.call(cover.querySelectorAll('img'), function (img) {
      img.addEventListener('error', function () { img.outerHTML = ISO.titleCard(img.getAttribute('data-name'), ''); });
    });

    card.querySelector('[data-picks]').innerHTML = '<ul class="tile-picks">' + picks.map(function (it) {
      return '<li><span class="name">' + esc(it.title) + '</span><span class="pf">' + esc(PF[it.platform] || host(it.url)) + '</span></li>';
    }).join('') + '</ul>';
    card.querySelector('[data-sum]').textContent = total + ' 条 · ' + data.groups.length + ' 组';
    return total;
  }

  function load(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.src = 'assets/js/' + src;
      el.onload = resolve;
      el.onerror = reject;
      document.body.appendChild(el);
    });
  }

  var sumEl = document.getElementById('menu-sum'), grand = 0;
  AREAS.reduce(function (chain, a) {
    return chain.then(function () {
      window.RESOURCE_PAGE = undefined;
      window.INSPIRATION = undefined;
      return SOURCES[a.id].reduce(function (c, src) { return c.then(function () { return load(src); }); }, Promise.resolve())
        .then(function () { grand += fill(a, window.RESOURCE_PAGE || window.INSPIRATION) || 0; })
        .catch(function () { /* 这个分区保留默认卡片 */ });
    });
  }, Promise.resolve()).then(function () {
    if (sumEl && grand) sumEl.textContent = AREAS.length + ' 个分区 · 共 ' + grand + ' 条资源';
  });
})();
