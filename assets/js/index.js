/* 首页（菜单）渲染 */
(function () {
  var ISO = window.ISO;
  if (!ISO) return;

  var AREAS = [
    { no: '01', id: 'inspiration', title: '灵感刷刷区', desc: '游戏设计频道、Game Jam 精选、作品与视觉风格参考。', href: 'inspiration.html', live: true, count: 15 },
    { no: '02', id: 'unity', title: 'Unity 引擎区', desc: 'Unity 下载安装、零基础入门，2D / 3D 上手路线与开发架构实践。', href: 'unity.html', live: true, count: 8 },
    { no: '03', id: 'ai-coding', title: 'AI 编程区', desc: 'Cursor、TRAE、Antigravity、Codex 等 AI 编程工具。', href: 'ai-coding.html', live: true, count: 4 },
    { no: '04', id: 'art', title: '游戏美术区', desc: '2D / 3D 美术资产与动画：手搓与 AI 两条路线。', href: 'art.html', live: true, count: 42 },
    { no: '05', id: 'xr', title: 'XR 教程', desc: '头显开发、AR 图案 / 空间 / 平面识别，以及 Meta Quest 环境配置。', href: 'xr.html', live: true, count: 4 },
    { no: '06', id: 'tools', title: '好用小工具', desc: '录屏、配音、地图生成、像素化等实用小工具。', href: 'tools.html', live: true, count: 15 }
  ];

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
      '<text class="t0" text-anchor="middle" x="' + c[0].toFixed(1) + '" y="' + (c[1] + 4).toFixed(1) + '">' + o.a.no + '</text>';
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
  document.getElementById('tiles').innerHTML = AREAS.map(function (a) {
    var inner = '' +
      '<div class="cover">' + ISO.cover(ISO.hash(a.id)) + '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta"><span class="tile-no">AREA ' + a.no + '</span></div>' +
        '<h3>' + a.title + '</h3>' +
        '<p class="desc">' + a.desc + '</p>' +
      '</div>' +
      '<div class="card-foot">' +
        (a.live ? '<span class="status live">已开放 · ' + a.count + ' 条</span>' : '<span class="status">筹备中</span>') +
        '<span class="go">' + (a.live ? '进入 →' : '敬请期待') + '</span>' +
      '</div>';
    return a.live
      ? '<a class="card hot" href="' + a.href + '">' + inner + '</a>'
      : '<div class="card soon" aria-disabled="true">' + inner + '</div>';
  }).join('');
})();
