/* 资源分区 · 共用页面渲染 */
(function () {
  var baseData = window.RESOURCE_PAGE || window.INSPIRATION, ISO = window.ISO;
  var store = window.ResourceCards;
  if (!baseData || !ISO || !store) return;

  var PLATFORM = {
    youtube: { label: 'YouTube', host: 'youtube.com' },
    bilibili: { label: 'Bilibili', host: 'bilibili.com' },
    website: { label: '网站', host: '' },
    github: { label: 'GitHub', host: 'github.com' },
    docs: { label: '文档', host: '' },
    miro: { label: '资料板', host: 'miro.com' }
  };
  var KIND = { channel: '频道', video: '视频', playlist: '播放列表', tool: '工具', docs: '文档', resource: '资源', reference: '资料' };

  var esc = ISO.esc;
  function $(sel) { return document.querySelector(sel); }

  var activeArea = $('.area-nav [aria-current="page"]');
  var area = store.areaId(activeArea.href);
  var data, editing = false;

  /* ---------- 统计与首屏大楼 ---------- */
  var art = $('#hero-art');
  var floors = [], floorCounts = '', lit = 0, paused = false;
  function light(i) {
    lit = i;
    floors.forEach(function (el, k) { el.classList.toggle('is-lit', k === i); });
  }

  function renderStats() {
    var all = data.groups.flatMap(function (g) { return g.items; });
    var platforms = new Set(all.map(function (it) { return it.platform; }));
    $('#stat-items').textContent = all.length;
    $('#stat-platforms').textContent = platforms.size;
    $('#stat-groups').textContent = data.groups.length;
    activeArea.querySelector('sup').textContent = all.length;
    syncPlatformChips(platforms);

    var heroGroups = data.heroGroups ? data.groups.filter(function (g) { return data.heroGroups.includes(g.id); }) : data.groups;
    var counts = heroGroups.map(function (g) { return g.items.length; }).join(',');
    if (counts === floorCounts) return;
    floorCounts = counts;
    art.innerHTML = ISO.building(heroGroups.map(function (g) {
      return { id: g.id, no: g.no, label: g.title, count: g.items.length };
    }));
    if (heroGroups.length < data.groups.length) {
      art.insertAdjacentHTML('beforeend', '<p class="hero-caption">更多路线见下方分组导航 ↓</p>');
    }
    floors = Array.from(art.querySelectorAll('.floor'));
    floors.forEach(function (el, k) {
      el.addEventListener('mouseenter', function () { paused = true; light(k); });
      el.addEventListener('focus', function () { paused = true; light(k); });
      el.addEventListener('mouseleave', function () { paused = false; });
      el.addEventListener('blur', function () { paused = false; });
    });
    paused = false;
    light(lit);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () { if (!paused && floors.length) light((lit + 1) % floors.length); }, 2400);
  }

  /* ---------- 卡片 ---------- */
  function cardHTML(it) {
    var pf = PLATFORM[it.platform] || { label: it.platform, host: '' };
    var domain = pf.host;
    try { domain = new URL(it.url).hostname.replace(/^www\./, ''); } catch (e) { /* 使用平台名称 */ }
    // .svg 缩略图是同步脚本生成的文字封面，改用跟随主题的 HTML 版本。
    var art = it.custom ? store.coverHTML(it, domain) : ISO.isTitleCard(it.thumbnail)
      ? ISO.titleCard(it.title, domain)
      : it.thumbnail ? '<img class="cover-image' + (it.thumbnailFit === 'contain' ? ' is-avatar' : '') + '" src="' + esc(it.thumbnail) + '" alt="' + esc(it.title + (it.type === 'video' ? '视频封面' : '资源图片')) + '" loading="lazy" decoding="async" width="480" height="270">' : '';
    return '' +
      '<a class="card' + (it.hot ? ' hot' : '') + '" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="cover' + (art ? ' has-thumbnail' : '') + '">' + ISO.cover(ISO.hash(it.id)) + art +
          '<div class="chips"><span class="tag">' + esc(pf.label) + '</span></div>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-meta"><span class="kind">' + esc(KIND[it.type] || '') + '</span>' +
            (it.hot ? '<span class="badge-hot">强烈推荐</span>' : '') + '</div>' +
          '<h3>' + esc(it.title) + '</h3>' +
          (it.orig && it.orig !== it.title ? '<p class="orig">' + esc(it.orig) + '</p>' : '') +
          (it.desc ? '<p class="desc">' + esc(it.desc) + '</p>' : '') +
          (it.note ? '<p class="note">' + esc(it.note) + '</p>' : '') +
        '</div>' +
        '<div class="card-foot"><span>' + esc(domain) + '</span><span class="go">打开 ↗</span></div>' +
      '</a>';
  }

  var host = $('#groups');
  function itemHTML(it, index, items) {
    var controls = editing ?
      '<div class="card-actions">' +
        '<span class="card-drag" aria-hidden="true" title="拖拽排序">⠿ 拖动</span>' +
        '<button class="chip" type="button" data-action="up" aria-label="上移「' + esc(it.title) + '」" title="上移"' + (index === 0 ? ' disabled' : '') + '>↑</button>' +
        '<button class="chip" type="button" data-action="down" aria-label="下移「' + esc(it.title) + '」" title="下移"' + (index === items.length - 1 ? ' disabled' : '') + '>↓</button>' +
        '<button class="chip card-delete" type="button" data-action="delete" aria-label="删除「' + esc(it.title) + '」">删除</button>' +
      '</div>' : '';
    return '<article class="resource-item" data-id="' + esc(it.id) + '" data-platform="' + esc(it.platform) +
      '" data-hot="' + (it.hot ? '1' : '0') + '" data-text="' +
      esc([it.title, it.orig, it.desc, it.note].join(' ').toLowerCase()) + '">' + cardHTML(it) + controls + '</article>';
  }

  function renderGroups() {
    host.innerHTML = data.groups.map(function (g) {
      return '' +
        '<section class="group" id="' + esc(g.id) + '" aria-labelledby="h-' + esc(g.id) + '">' +
          '<header class="group-head">' +
            '<span class="group-no">' + esc(g.no) + '</span>' +
            '<h2 id="h-' + esc(g.id) + '" tabindex="-1">' + esc(g.title) + '</h2>' +
            '<p class="group-hint">' + esc(g.hint) + '</p>' +
          '</header>' +
          (g.note ? '<aside class="learning-note"><p>' + esc(g.note) + '</p></aside>' : '') +
          '<div class="grid' + (g.wide ? ' wide' : '') + '">' + g.items.map(itemHTML).join('') + '</div>' +
          (!g.items.length && editing ? '<p class="group-empty">此分组还没有卡片。</p>' : '') +
        '</section>';
    }).join('');

    // 图片不可用时露出原有线稿，避免显示破图图标。
    host.querySelectorAll('.cover-image:not([data-resource-url])').forEach(function (img) {
      img.addEventListener('error', function () { img.hidden = true; });
      if (img.complete && img.naturalWidth === 0) img.hidden = true;
    });
    store.loadCovers(host);
    applyFilters();
  }

  var jumps = $('#group-links');
  if (jumps) jumps.innerHTML = baseData.groups.map(function (g) {
    return '<a class="chip" href="#' + esc(g.id) + '">' + esc(g.title) + '</a>';
  }).join('');

  /* ---------- 筛选 ---------- */
  var state = { platform: 'all', hot: false, q: '' };
  var toolbar = $('.toolbar'), hotChip = $('#chip-hot');
  var countEl = $('#count'), emptyEl = $('#empty');
  var filteredEmptyText = emptyEl.textContent;

  function syncPlatformChips(platforms) {
    toolbar.querySelectorAll('[data-added-platform]').forEach(function (chip) {
      if (!platforms.has(chip.dataset.platformChip)) {
        if (state.platform === chip.dataset.platformChip) state.platform = 'all';
        chip.remove();
      }
    });
    Object.keys(PLATFORM).forEach(function (platform) {
      if (!platforms.has(platform) || toolbar.querySelector('[data-platform-chip="' + platform + '"]')) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'chip';
      button.dataset.platformChip = platform;
      button.dataset.addedPlatform = '';
      button.textContent = PLATFORM[platform].label;
      toolbar.insertBefore(button, toolbar.querySelector('.tb-sep, .search'));
    });
  }

  function applyFilters() {
    var cards = host.querySelectorAll('.resource-item');
    var shown = 0;
    cards.forEach(function (c) {
      var ok = editing || ((state.platform === 'all' || c.dataset.platform === state.platform) &&
                           (!state.hot || c.dataset.hot === '1') &&
                           (!state.q || c.dataset.text.includes(state.q)));
      c.hidden = !ok;
      if (ok) shown++;
    });
    host.querySelectorAll('.group').forEach(function (s) { s.hidden = !editing && !s.querySelector('.resource-item:not([hidden])'); });
    countEl.textContent = editing ? '共 ' + cards.length + ' 张卡片' : '显示 ' + shown + ' / ' + cards.length + ' 条';
    emptyEl.textContent = cards.length ? filteredEmptyText : '这个分区还没有卡片。';
    emptyEl.hidden = editing || shown !== 0;
    toolbar.querySelectorAll('[data-platform-chip]').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.dataset.platformChip === state.platform));
    });
  }

  toolbar.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-platform-chip]');
    if (!chip) return;
    state.platform = chip.dataset.platformChip;
    applyFilters();
  });
  if (hotChip) hotChip.addEventListener('click', function () {
    state.hot = !state.hot;
    hotChip.setAttribute('aria-pressed', String(state.hot));
    applyFilters();
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); applyFilters(); });

  /* ---------- 卡片管理 ---------- */
  host.insertAdjacentHTML('beforebegin',
    '<div class="resource-bar">' +
      '<button class="chip" id="manage-cards" type="button" aria-controls="groups" aria-expanded="false">管理卡片</button>' +
      '<button class="chip chip-primary" id="add-card" type="button" hidden>＋ 添加卡片</button>' +
      '<button class="chip" id="export-cards" type="button" hidden>导出发布文件</button>' +
    '</div>' +
    '<p class="manage-help" id="manage-help" hidden>拖动把手或点击 ↑ ↓ 可在组内排序。改动保存在当前浏览器，发布时可导出全部分区的改动。</p>' +
    '<p class="manage-status" id="manage-status" role="status"></p>' +
    '<dialog class="card-dialog" id="card-dialog" aria-labelledby="card-dialog-title">' +
      '<form id="card-form">' +
        '<h2 id="card-dialog-title">添加卡片</h2>' +
        '<label>标题<input name="title" required maxlength="120" autofocus></label>' +
        '<label>链接<input name="url" type="url" placeholder="https://" required maxlength="2048"></label>' +
        '<p class="manage-help">添加后自动获取网页封面，失败时尝试站点图标。</p>' +
        '<label>分组<select name="group">' + baseData.groups.map(function (g) {
          return '<option value="' + esc(g.id) + '">' + esc(g.title) + '</option>';
        }).join('') + '</select></label>' +
        '<label>简介（选填）<textarea name="desc" rows="3" maxlength="400"></textarea></label>' +
        '<p class="manage-status" id="card-form-status" role="alert"></p>' +
        '<div class="dialog-actions"><button class="chip" type="button" id="cancel-card">取消</button>' +
          '<button class="chip chip-primary" type="submit">添加</button></div>' +
      '</form>' +
    '</dialog>');
  $('.resource-bar').prepend(countEl);

  var manageBtn = $('#manage-cards'), addBtn = $('#add-card'), status = $('#manage-status');
  var exportBtn = $('#export-cards');
  var dialog = $('#card-dialog'), form = $('#card-form'), formStatus = $('#card-form-status');
  var titleInput = form.elements.namedItem('title'), urlInput = form.elements.namedItem('url');

  function refresh() {
    data = store.apply(area, baseData);
    renderStats();
    renderGroups();
  }

  function save(change, message) {
    var changed;
    try { changed = change(); }
    catch (e) {
      (dialog.open ? formStatus : status).textContent = '浏览器无法保存卡片改动。';
      return false;
    }
    refresh();
    status.textContent = changed ? message : '卡片已在其他页面更新，请重试。';
    return changed;
  }

  manageBtn.addEventListener('click', function () {
    editing = !editing;
    manageBtn.textContent = editing ? '完成' : '管理卡片';
    manageBtn.setAttribute('aria-expanded', String(editing));
    toolbar.hidden = editing;
    addBtn.hidden = !editing;
    exportBtn.hidden = !editing;
    $('#manage-help').hidden = !editing;
    status.textContent = '';
    renderGroups();
  });

  exportBtn.addEventListener('click', function () {
    try {
      var file = new Blob([store.exportPublished()], { type: 'text/javascript;charset=utf-8' });
      var url = URL.createObjectURL(file);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'published-cards.js';
      link.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      status.textContent = '已导出发布文件。替换项目 assets/js 下的同名文件后提交部署。';
    } catch (e) { status.textContent = '浏览器无法读取卡片改动。'; }
  });

  addBtn.addEventListener('click', function () {
    form.reset();
    formStatus.textContent = '';
    titleInput.setCustomValidity('');
    urlInput.setCustomValidity('');
    dialog.showModal();
  });
  $('#cancel-card').addEventListener('click', function () { dialog.close(); });
  form.addEventListener('input', function (e) { e.target.setCustomValidity(''); formStatus.textContent = ''; });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = titleInput.value.trim();
    var url = store.webURL(urlInput.value.trim());
    if (!title) titleInput.setCustomValidity('请输入卡片标题。');
    if (!url) urlInput.setCustomValidity('请输入以 https:// 或 http:// 开头的链接。');
    if (!form.reportValidity()) return;

    var group = baseData.groups.find(function (g) { return g.id === form.elements.namedItem('group').value; });
    var fields = { title: title, url: url.href, desc: form.elements.namedItem('desc').value.trim() };
    if (save(function () { return store.add(area, group, fields); }, '已将「' + title + '」添加到' + group.title + '。')) dialog.close();
  });

  function focusCardAction(groupId, id, action) {
    var section = document.getElementById(groupId);
    var item = Array.from(section.querySelectorAll('.resource-item')).find(function (el) { return el.dataset.id === id; });
    var button = item && (item.querySelector('[data-action="' + action + '"]:enabled') || item.querySelector('[data-action]:enabled'));
    (button || section.querySelector('h2')).focus();
  }

  function moveCard(source, target, action) {
    var groupId = source.closest('.group').id;
    var group = baseData.groups.find(function (g) { return g.id === groupId; });
    var title = source.querySelector('h3').textContent;
    var position = Array.from(target.parentNode.children).indexOf(target) + 1;
    if (save(function () { return store.move(area, group, source.dataset.id, target.dataset.id); },
        '已将「' + title + '」移到第 ' + position + ' 位。') && action) {
      focusCardAction(groupId, source.dataset.id, action);
    }
  }

  host.addEventListener('click', function (e) {
    var button = e.target.closest('[data-action]');
    if (!button) return;
    var item = button.closest('.resource-item'), action = button.dataset.action;
    if (action !== 'delete') {
      moveCard(item, action === 'up' ? item.previousElementSibling : item.nextElementSibling, action);
      return;
    }
    var title = item.querySelector('h3').textContent;
    if (!window.confirm('删除「' + title + '」？')) return;
    var groupId = item.closest('.group').id;
    var group = baseData.groups.find(function (g) { return g.id === groupId; });
    var neighbor = item.nextElementSibling || item.previousElementSibling;
    if (save(function () { return store.remove(area, group, item.dataset.id); }, '已删除「' + title + '」。')) {
      focusCardAction(groupId, neighbor && neighbor.dataset.id, 'delete');
    }
  });

  /* ---------- 鼠标和触屏拖拽 ---------- */
  var drag = null;
  function trackDrop(x, y) {
    var hovered = document.elementFromPoint(x, y);
    var target = hovered && hovered.closest('.resource-item');
    if (target === drag.source || (target && target.parentNode !== drag.source.parentNode)) target = null;
    if (target === drag.target) return;
    if (drag.target) drag.target.classList.remove('drop-target');
    drag.target = target;
    if (target) target.classList.add('drop-target');
  }

  function autoScroll() {
    drag.frame = 0;
    var edge = 64, bottom = window.innerHeight - edge;
    var offset = drag.y < edge ? drag.y - edge : Math.max(0, drag.y - bottom);
    var atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
    if (!offset || (offset > 0 && atBottom) || (offset < 0 && window.scrollY <= 0)) return;
    window.scrollBy({ top: Math.sign(offset) * Math.min(20, Math.ceil(Math.abs(offset) / 4)), behavior: 'instant' });
    trackDrop(drag.x, drag.y);
    drag.frame = requestAnimationFrame(autoScroll);
  }

  function stopDrag() {
    if (!drag) return;
    cancelAnimationFrame(drag.frame);
    drag.source.classList.remove('is-dragging');
    if (drag.target) drag.target.classList.remove('drop-target');
    drag = null;
  }

  host.addEventListener('pointerdown', function (e) {
    var handle = e.target.closest('.card-drag');
    if (!handle || !e.isPrimary || e.button !== 0) return;
    handle.setPointerCapture(e.pointerId);
    drag = { id: e.pointerId, source: handle.closest('.resource-item'), target: null,
      startX: e.clientX, startY: e.clientY, active: false, frame: 0 };
  });
  host.addEventListener('pointermove', function (e) {
    if (!drag || drag.id !== e.pointerId) return;
    if (!drag.active) {
      if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 6) return;
      drag.active = true;
      drag.source.classList.add('is-dragging');
    }
    drag.x = e.clientX;
    drag.y = e.clientY;
    trackDrop(drag.x, drag.y);
    if (!drag.frame) drag.frame = requestAnimationFrame(autoScroll);
  });
  host.addEventListener('pointerup', function (e) {
    if (!drag || drag.id !== e.pointerId) return;
    if (drag.active) trackDrop(e.clientX, e.clientY);
    var source = drag.source, target = drag.target;
    stopDrag();
    if (target) moveCard(source, target);
  });
  ['pointercancel', 'lostpointercapture'].forEach(function (event) {
    host.addEventListener(event, function (e) { if (drag && drag.id === e.pointerId) stopDrag(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') stopDrag(); });
  host.addEventListener('dragstart', function (e) { if (editing) e.preventDefault(); });
  window.addEventListener('storage', function (e) {
    if (!store.affectsArea(e.key, area)) return;
    stopDrag();
    refresh();
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) refresh(); });

  refresh();
})();
