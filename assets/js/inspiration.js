/* 资源分区 · 共用页面渲染 */
(function () {
  var data = window.RESOURCE_PAGE || window.INSPIRATION, ISO = window.ISO;
  if (!data || !ISO) return;

  var PLATFORM = {
    youtube: { label: 'YouTube', host: 'youtube.com' },
    bilibili: { label: 'Bilibili', host: 'bilibili.com' },
    website: { label: '网站', host: '' },
    github: { label: 'GitHub', host: 'github.com' },
    docs: { label: '文档', host: '' },
    miro: { label: '资料板', host: 'miro.com' }
  };
  var KIND = { channel: '频道', video: '视频', playlist: '播放列表', tool: '工具', docs: '文档', resource: '资源', reference: '资料' };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel) { return document.querySelector(sel); }

  /* ---------- 统计 ---------- */
  var all = [];
  data.groups.forEach(function (g) { g.items.forEach(function (it) { all.push(it); }); });
  var platforms = {};
  all.forEach(function (it) { platforms[it.platform] = true; });
  $('#stat-items').textContent = all.length;
  $('#stat-platforms').textContent = Object.keys(platforms).length;
  $('#stat-groups').textContent = data.groups.length;

  /* ---------- 首屏大楼 ---------- */
  var art = $('#hero-art');
  var heroGroups = data.heroGroups ? data.groups.filter(function (g) { return data.heroGroups.indexOf(g.id) !== -1; }) : data.groups;
  art.innerHTML = ISO.building(heroGroups.map(function (g) {
    return { id: g.id, no: g.no, label: g.title, count: g.items.length };
  }));
  if (heroGroups.length < data.groups.length) {
    art.insertAdjacentHTML('beforeend', '<p class="hero-caption">更多路线见下方分组导航 ↓</p>');
  }
  var floors = Array.prototype.slice.call(art.querySelectorAll('.floor'));
  var lit = -1, timer = null, paused = false;
  function light(i) {
    lit = i;
    floors.forEach(function (el, k) { el.classList.toggle('is-lit', k === i); });
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function start() {
    if (reduce || timer) return;
    timer = setInterval(function () { if (!paused) light((lit + 1) % floors.length); }, 2400);
  }
  floors.forEach(function (el, k) {
    el.addEventListener('mouseenter', function () { paused = true; light(k); });
    el.addEventListener('focus', function () { paused = true; light(k); });
    el.addEventListener('mouseleave', function () { paused = false; });
    el.addEventListener('blur', function () { paused = false; });
  });
  light(0);
  start();

  /* ---------- 卡片 ---------- */
  function cardHTML(it) {
    var pf = PLATFORM[it.platform] || { label: it.platform, host: '' };
    var domain = pf.host;
    try { domain = new URL(it.url).hostname.replace(/^www\./, ''); } catch (e) { /* 使用平台名称 */ }
    // .svg 缩略图是同步脚本生成的文字封面，改用跟随主题的 HTML 版本。
    var art = ISO.isTitleCard(it.thumbnail)
      ? ISO.titleCard(it.title, domain)
      : it.thumbnail ? '<img class="cover-image' + (it.thumbnailFit === 'contain' ? ' is-avatar' : '') + '" src="' + esc(it.thumbnail) + '" alt="' + esc(it.title + (it.type === 'video' ? '视频封面' : '资源图片')) + '" loading="lazy" decoding="async" width="480" height="270">' : '';
    return '' +
      '<a class="card' + (it.hot ? ' hot' : '') + '" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer"' +
      ' data-platform="' + esc(it.platform) + '" data-hot="' + (it.hot ? '1' : '0') + '"' +
      ' data-text="' + esc((it.title + ' ' + (it.orig || '') + ' ' + it.desc + ' ' + (it.note || '')).toLowerCase()) + '">' +
        '<div class="cover' + (it.thumbnail ? ' has-thumbnail' : '') + '">' + ISO.cover(ISO.hash(it.id)) + art +
          '<div class="chips"><span class="tag">' + esc(pf.label) + '</span></div>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-meta"><span class="kind">' + esc(KIND[it.type] || '') + '</span>' +
            (it.hot ? '<span class="badge-hot">强烈推荐</span>' : '') + '</div>' +
          '<h3>' + esc(it.title) + '</h3>' +
          (it.orig && it.orig !== it.title ? '<p class="orig">' + esc(it.orig) + '</p>' : '') +
          '<p class="desc">' + esc(it.desc) + '</p>' +
          (it.note ? '<p class="note">' + esc(it.note) + '</p>' : '') +
        '</div>' +
        '<div class="card-foot"><span>' + esc(domain) + '</span><span class="go">打开 ↗</span></div>' +
      '</a>';
  }

  var host = $('#groups');
  host.innerHTML = data.groups.map(function (g) {
    return '' +
      '<section class="group" id="' + esc(g.id) + '" aria-labelledby="h-' + esc(g.id) + '">' +
        '<header class="group-head">' +
          '<span class="group-no">' + esc(g.no) + '</span>' +
          '<h2 id="h-' + esc(g.id) + '">' + esc(g.title) + '</h2>' +
          '<p class="group-hint">' + esc(g.hint) + '</p>' +
        '</header>' +
        (g.note ? '<aside class="learning-note"><p>' + esc(g.note) + '</p></aside>' : '') +
        '<div class="grid' + (g.wide ? ' wide' : '') + '">' + g.items.map(cardHTML).join('') + '</div>' +
      '</section>';
  }).join('');

  var jumps = $('#group-links');
  if (jumps) jumps.innerHTML = data.groups.map(function (g) {
    return '<a class="chip" href="#' + esc(g.id) + '">' + esc(g.title) + '</a>';
  }).join('');

  // 图片不可用时露出原有线稿，避免显示破图图标。
  Array.prototype.forEach.call(host.querySelectorAll('.cover-image'), function (img) {
    img.addEventListener('error', function () { img.hidden = true; });
    if (img.complete && img.naturalWidth === 0) img.hidden = true;
  });

  /* ---------- 筛选 ---------- */
  var state = { platform: 'all', hot: false, q: '' };
  var cards = Array.prototype.slice.call(host.querySelectorAll('.card'));
  var sections = Array.prototype.slice.call(host.querySelectorAll('.group'));
  var countEl = $('#count'), emptyEl = $('#empty');

  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (state.platform === 'all' || c.dataset.platform === state.platform) &&
               (!state.hot || c.dataset.hot === '1') &&
               (!state.q || c.dataset.text.indexOf(state.q) !== -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    sections.forEach(function (s) { s.hidden = !s.querySelector('.card:not([hidden])'); });
    countEl.textContent = '显示 ' + shown + ' / ' + cards.length + ' 条';
    emptyEl.hidden = shown !== 0;
  }

  var platformChips = Array.prototype.slice.call(document.querySelectorAll('[data-platform-chip]'));
  platformChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.platform = chip.getAttribute('data-platform-chip');
      platformChips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      apply();
    });
  });
  var hotChip = $('#chip-hot');
  if (hotChip) hotChip.addEventListener('click', function () {
    state.hot = !state.hot;
    hotChip.setAttribute('aria-pressed', state.hot ? 'true' : 'false');
    apply();
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); apply(); });
  apply();
})();
