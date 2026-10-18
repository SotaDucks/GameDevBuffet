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

  /* ---------- 首屏：关卡地图。6 座浮空小岛按 01 → 06 用一条小路串起来 ---------- */
  (function () {
    var s = 18, A = 2.4, H = 0.6, PAD = 1, PH = 0.22, h2 = A / 2;
    var raw = ISO.proj(s, 0, 0), bb = [Infinity, Infinity, -Infinity, -Infinity];
    function grow(x, y) { bb[0] = Math.min(bb[0], x); bb[1] = Math.min(bb[1], y); bb[2] = Math.max(bb[2], x); bb[3] = Math.max(bb[3], y); }
    function p(x, y, z) { var q = raw(x, y, z); grow(q[0], q[1]); return q; }
    function f(n) { return n.toFixed(1); }
    function pt(q) { return f(q[0]) + ',' + f(q[1]); }
    function textW(t) { var w = 0; for (var i = 0; i < t.length; i++) w += /[⺀-鿿]/.test(t[i]) ? 12 : t[i] === ' ' ? 3.5 : 7.2; return w; }
    function trail(seg, d) { return '<path class="trail" data-seg="' + seg + '" d="' + d + '"/>'; }

    /* 屏幕横向 u、纵深 v 换算成世界坐标：01 在左下，之后上下交替、一路向右 */
    var nodes = AREAS.map(function (a, i) {
      var u = (i - 2.5) * 3.6, v = i % 2 ? 0 : 13;
      return { a: a, i: i, up: i % 2 === 1, v: v, x: (u + v) / 2, y: (v - u) / 2 };
    });
    /* 岛的进出口：上下相邻的岛，从前角 / 后角接出小路 */
    function corner(n, dv) { return [n.x + dv * h2, n.y + dv * h2]; }
    nodes.forEach(function (n, i) {
      n.inV = i ? corner(n, -Math.sign(n.v - nodes[i - 1].v)) : [n.x - h2, n.y + h2];   // 01 从左角进
      n.outV = i < nodes.length - 1 ? corner(n, Math.sign(nodes[i + 1].v - n.v)) : null;
    });

    /* 气泡标签：上排在岛的上方、尖角朝下；下排在岛的下方、尖角朝上 */
    function bubble(x, y, w, h, cx, down) {
      var r = 4, b = y + h;
      var topEdge = down ? 'H' + f(x + w - r) : 'H' + f(cx - 4) + 'L' + f(cx) + ',' + f(y - 4) + 'L' + f(cx + 4) + ',' + f(y) + 'H' + f(x + w - r);
      var botEdge = down ? 'H' + f(cx + 4) + 'L' + f(cx) + ',' + f(b + 4) + 'L' + f(cx - 4) + ',' + f(b) + 'H' + f(x + r) : 'H' + f(x + r);
      return 'M' + f(x + r) + ',' + f(y) + topEdge + 'Q' + f(x + w) + ',' + f(y) + ' ' + f(x + w) + ',' + f(y + r) +
        'V' + f(b - r) + 'Q' + f(x + w) + ',' + f(b) + ' ' + f(x + w - r) + ',' + f(b) + botEdge +
        'Q' + f(x) + ',' + f(b) + ' ' + f(x) + ',' + f(b - r) + 'V' + f(y + r) + 'Q' + f(x) + ',' + f(y) + ' ' + f(x + r) + ',' + f(y) + 'Z';
    }

    function island(n) {
      var x0 = n.x - h2, y0 = n.y - h2, c = p(n.x, n.y, 0), last = n.i === nodes.length - 1;
      var r = ISO.rng(ISO.hash(n.a.id));
      var out = '<a class="lvl" data-i="' + n.i + '" style="--i:' + n.i + '" href="' + n.a.href + '" aria-label="' + esc(n.a.no + ' ' + n.a.title) + '">';
      out += ISO.box(p, x0, y0, -H, A, A, H, 'slab') + ISO.diamond(p, x0 + .22, y0 + .22, A - .44, A - .44, 0, 'rim');
      /* 岛面上的一小段路：进口 → 中心 → 出口 */
      out += trail(n.i, 'M' + pt(p(n.inV[0], n.inV[1], 0)) + 'L' + pt(c));
      if (n.outV) out += trail(n.i + 1, 'M' + pt(c) + 'L' + pt(p(n.outV[0], n.outV[1], 0)));
      /* 左右两角的小方块当作树木 */
      out += ISO.box(p, x0 + .2, y0 + A - .7, 0, .5, .5, .4 + r() * .8, 'prop');
      var rh = .4 + r() * .8;
      if (last) {
        var fb = p(x0 + A - .45, y0 + .45, 0), ft = p(x0 + A - .45, y0 + .45, 1.9);
        out += '<line class="flag-pole" x1="' + f(fb[0]) + '" y1="' + f(fb[1]) + '" x2="' + f(ft[0]) + '" y2="' + f(ft[1]) + '"/>' +
          '<polygon class="flag" points="' + pt(ft) + ' ' + f(ft[0] + 15) + ',' + f(ft[1] + 5) + ' ' + f(ft[0]) + ',' + f(ft[1] + 10) + '"/>';
      } else {
        out += ISO.box(p, x0 + A - .7, y0 + .2, 0, .5, .5, rh, 'prop');
      }
      out += '<g class="pad-lift">' + ISO.box(p, n.x - PAD / 2, n.y - PAD / 2, 0, PAD, PAD, PH, 'cube pad') + '</g>';
      /* 标签 */
      var name = n.a.short, w = 9 + 12.5 + 6 + textW(name) + 9, th = 22;
      var tx = c[0] - w / 2;
      var ty = n.up ? c[1] - 2.1 * s - th : p(n.x + h2, n.y + h2, -H)[1] + 0.55 * s;
      grow(tx, ty - 4); grow(tx + w, ty + th + 4);
      out += '<g class="lvl-tag"><path d="' + bubble(tx, ty, w, th, c[0], n.up) + '"/>' +
        '<text class="lvl-no" x="' + f(tx + 9) + '" y="' + f(ty + 15) + '">' + n.a.no + '</text>' +
        '<text class="lvl-name" x="' + f(tx + 27.5) + '" y="' + f(ty + 15.5) + '">' + esc(name) + '</text></g>';
      return out + '</a>';
    }

    var body = '';
    /* 由远到近画：先上排，再下排 */
    nodes.slice().sort(function (a, b) { return a.v - b.v || a.i - b.i; }).forEach(function (n) { body += island(n); });

    /* 岛与岛之间的小路（画在岛之后，才能盖住近处岛的侧面） */
    var K = 2.2, bridges = '';
    var n0 = nodes[0], st = [n0.inV[0] - 2.2, n0.inV[1] + 2.2], sp = p(st[0], st[1], 0);
    bridges += trail(0, 'M' + pt(sp) + 'L' + pt(p(n0.inV[0], n0.inV[1], 0)));
    bridges += '<text class="map-cap" text-anchor="end" x="' + f(sp[0] - 6) + '" y="' + f(sp[1] + 3) + '">START</text>';
    grow(sp[0] - 42, sp[1]);
    for (var i = 1; i < nodes.length; i++) {
      var a = nodes[i - 1].outV, b = nodes[i].inV, dv = Math.sign(nodes[i].v - nodes[i - 1].v);
      bridges += trail(i, 'M' + pt(p(a[0], a[1], 0)) + 'C' + pt(p(a[0] + dv * K, a[1] + dv * K, 0)) + ' ' +
        pt(p(b[0] - dv * K, b[1] - dv * K, 0)) + ' ' + pt(p(b[0], b[1], 0)));
    }

    /* 小宝石 = 当前所在关卡，悬停哪关就跳到哪关 */
    var GEM = nodes.map(function (n) { return p(n.x, n.y, PH + 0.8); });
    var gem = '<g class="gem" aria-hidden="true"><ellipse class="gem-shadow" cx="0" cy="' + f(0.8 * s) + '" rx="5" ry="2"/>' +
      '<g class="gem-bob"><polygon class="gem-l" points="0,-7 0,7 -5,0"/><polygon class="gem-r" points="0,-7 5,0 0,7"/></g></g>';

    var pad = 8, vb = [bb[0] - pad, bb[1] - pad, bb[2] - bb[0] + pad * 2, bb[3] - bb[1] + pad * 2].map(f).join(' ');
    var el = document.getElementById('hero-art');
    el.innerHTML = '<svg viewBox="' + vb + '" role="group" aria-label="关卡地图：6 个分区按 01 到 06 排成一条路线" focusable="false">' +
      body + '<g class="bridges">' + bridges + '</g>' + gem + '</svg>';

    var svg = el.querySelector('svg'), gemEl = svg.querySelector('.gem');
    var lvls = svg.querySelectorAll('.lvl'), trails = svg.querySelectorAll('.trail');
    function setActive(k) {
      Array.prototype.forEach.call(lvls, function (l) {
        var j = +l.getAttribute('data-i');
        l.classList.toggle('is-lit', j === k);
        l.classList.toggle('is-done', j < k);
      });
      Array.prototype.forEach.call(trails, function (t) { t.classList.toggle('is-on', +t.getAttribute('data-seg') <= k); });
      gemEl.style.transform = 'translate(' + f(GEM[k][0]) + 'px,' + f(GEM[k][1]) + 'px)';
    }
    Array.prototype.forEach.call(lvls, function (l) {
      var j = +l.getAttribute('data-i');
      l.addEventListener('mouseenter', function () { setActive(j); });
      l.addEventListener('focus', function () { setActive(j); });
      l.addEventListener('blur', function () { setActive(0); });
    });
    svg.addEventListener('mouseleave', function () { setActive(0); });
    setActive(0);
  })();

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
