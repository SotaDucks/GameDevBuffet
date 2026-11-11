/* 将浏览器里的卡片改动叠加到站点资源上。 */
window.ResourceCards = (function () {
  var prefix = 'gamedevbuffet:cards:v1:';

  // 美术拆分后继续使用原分组的存储键，保留浏览器里的卡片改动。
  function areaPrefix(area) {
    return prefix + (area === 'art-2d' || area === 'art-3d' ? 'art' : area) + ':';
  }

  function storageKey(area, group) { return areaPrefix(area) + group.id; }

  function read(key) {
    try {
      var saved = JSON.parse(window.localStorage.getItem(key));
      if (saved && Array.isArray(saved.added) && Array.isArray(saved.removed) && Array.isArray(saved.order)) {
        return saved;
      }
    } catch (e) { /* 存储不可读时仍可浏览原有资源。 */ }
    return { added: [], removed: [], order: [] };
  }

  function webURL(value) {
    try {
      var url = new URL(value);
      if (url.protocol === 'https:' || url.protocol === 'http:') return url;
    } catch (e) { /* 无效的资源链接。 */ }
    return null;
  }

  function platformFor(hostname) {
    if (/(^|\.)youtube\.com$|^youtu\.be$/.test(hostname)) return 'youtube';
    if (/(^|\.)bilibili\.com$|^b23\.tv$/.test(hostname)) return 'bilibili';
    if (/(^|\.)github\.com$/.test(hostname)) return 'github';
    if (/(^|\.)miro\.com$/.test(hostname)) return 'miro';
    return 'website';
  }

  function merge(group, saved) {
    var byId = new Map();
    var removed = new Set(saved.removed);
    group.items.forEach(function (item) {
      if (!removed.has(item.id)) byId.set(item.id, item);
    });
    saved.added.forEach(function (item) {
      var url = item && webURL(item.url);
      if (!url || typeof item.id !== 'string' || typeof item.title !== 'string' || byId.has(item.id)) return;
      byId.set(item.id, {
        id: item.id, title: item.title, url: url.href, type: 'resource',
        platform: platformFor(url.hostname), desc: typeof item.desc === 'string' ? item.desc : '',
        custom: true
      });
    });

    var ordered = [];
    saved.order.forEach(function (id) {
      if (byId.has(id)) {
        ordered.push(byId.get(id));
        byId.delete(id);
      }
    });
    return ordered.concat(Array.from(byId.values()));
  }

  function apply(area, data) {
    return Object.assign({}, data, {
      groups: data.groups.map(function (group) {
        return Object.assign({}, group, { items: merge(group, read(storageKey(area, group))) });
      })
    });
  }

  function update(area, group, change) {
    var key = storageKey(area, group);
    var saved = read(key);
    if (!change(saved, merge(group, saved))) return false;
    window.localStorage.setItem(key, JSON.stringify(saved));
    return true;
  }

  function add(area, group, fields) {
    var id = 'custom-' + Array.from(crypto.getRandomValues(new Uint32Array(4)), function (value) {
      return value.toString(36);
    }).join('-');
    return update(area, group, function (saved) {
      saved.added.push(Object.assign({ id: id }, fields));
      return true;
    });
  }

  function remove(area, group, id) {
    return update(area, group, function (saved, items) {
      var item = items.find(function (candidate) { return candidate.id === id; });
      if (!item) return false;
      if (item.custom) {
        saved.added = saved.added.filter(function (candidate) { return candidate && candidate.id !== id; });
      } else {
        saved.removed.push(id);
      }
      saved.order = saved.order.filter(function (candidate) { return candidate !== id; });
      return true;
    });
  }

  function move(area, group, id, targetId) {
    return update(area, group, function (saved, items) {
      var order = items.map(function (item) { return item.id; });
      var from = order.indexOf(id), to = order.indexOf(targetId);
      if (from < 0 || to < 0 || from === to) return false;
      order.splice(from, 1);
      order.splice(to, 0, id);
      saved.order = order;
      return true;
    });
  }

  function affectsArea(key, area) { return key === null || key.startsWith(areaPrefix(area)); }

  /* 自动封面单独缓存，异步取图不会修改卡片的新增、删除或排序记录。 */
  var coverPrefix = 'gamedevbuffet:cover:v1:';
  var pendingCovers = new Map();

  function youtubeChannel(url) {
    if (!/(^|\.)youtube\.com$/.test(url.hostname)) return '';
    var parts = url.pathname.split('/').filter(Boolean);
    var channel = parts[0] && parts[0].startsWith('@') ? parts[0].slice(1) :
      ['channel', 'user', 'c'].includes(parts[0]) ? parts[1] : '';
    try { return decodeURIComponent(channel || ''); }
    catch (e) { return ''; }
  }

  function coverCandidates(url) {
    var channel = youtubeChannel(url);
    // 频道使用独立缓存键，让此前缓存的网站图标自动失效。
    var key = coverPrefix + (channel ? 'youtube-channel-v2:' + encodeURIComponent(channel) : url.href);
    try {
      var cached = JSON.parse(window.localStorage.getItem(key));
      if (cached && cached.expires > Date.now() && Array.isArray(cached.images)) {
        return Promise.resolve(cached.images.filter(function (image) { return image && webURL(image.url); }));
      }
    } catch (e) { /* 缓存不可用时重新取图。 */ }
    if (pendingCovers.has(key)) return pendingCovers.get(key);

    var task = findCovers(url).then(function (result) {
      try {
        window.localStorage.setItem(key, JSON.stringify({
          images: result.images, expires: Date.now() + (result.found ? 7 * 86400000 : 10 * 60000)
        }));
      } catch (e) { /* 缓存写入失败不影响图片显示。 */ }
      return result.images;
    }).finally(function () { pendingCovers.delete(key); });
    pendingCovers.set(key, task);
    return task;
  }

  async function findCovers(url) {
    var channel = youtubeChannel(url);
    if (channel) {
      return { images: [{
        url: 'https://unavatar.io/youtube/' + encodeURIComponent(channel) + '?fallback=false', contain: true
      }], found: true };
    }
    var images = [], found = false;
    var videoId = '';
    if (url.hostname === 'youtu.be') videoId = url.pathname.split('/')[1];
    if (/(^|\.)youtube(?:-nocookie)?\.com$/.test(url.hostname)) {
      videoId = url.searchParams.get('v') || (/^\/(shorts|embed|live)\/([^/]+)/.exec(url.pathname) || [])[2];
    }
    if (/^[\w-]{11}$/.test(videoId || '')) {
      images.push({ url: 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg', contain: false });
      found = true;
    } else {
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 12000);
      try {
        var response = await fetch('https://api.microlink.io/?url=' + encodeURIComponent(url.href), {
          signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer'
        });
        if (response.ok) {
          var result = await response.json();
          var data = result.status === 'success' && result.data;
          if (data && data.image && webURL(data.image.url)) {
            images.push({ url: data.image.url, contain: false });
            found = true;
          }
          if (data && data.logo && webURL(data.logo.url)) {
            images.push({ url: data.logo.url, contain: true });
          }
        }
      } catch (e) { /* 网络、跨域或服务限流时继续尝试站点图标。 */ }
      finally { clearTimeout(timeout); }
    }
    images.push({ url: url.origin + '/favicon.ico', contain: true });
    images.push({ url: 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(url.hostname) + '&sz=128', contain: true });
    return { images: images, found: found };
  }

  function coverHTML(item, domain) {
    return window.ISO.titleCard(item.title, domain || '') +
      '<img class="cover-image" data-resource-url="' + window.ISO.esc(item.url) +
      '" alt="' + window.ISO.esc(item.title + '资源图片') + '" referrerpolicy="no-referrer" decoding="async" hidden>';
  }

  function loadCovers(container) {
    container.querySelectorAll('img[data-resource-url]').forEach(function (img) {
      var url = webURL(img.dataset.resourceUrl);
      if (!url) return;
      coverCandidates(url).then(function (images) {
        if (!img.isConnected) return;
        var next = 0, timeout;
        function attempt() {
          clearTimeout(timeout);
          if (!img.isConnected || next === images.length) {
            img.onload = img.onerror = null;
            return;
          }
          var image = images[next++];
          img.classList.toggle('is-avatar', !!image.contain);
          timeout = setTimeout(attempt, 8000);
          img.src = image.url;
        }
        img.onload = function () {
          if (img.naturalWidth < 16) { attempt(); return; }
          clearTimeout(timeout);
          img.onload = img.onerror = null;
          img.hidden = false;
          var fallback = img.parentNode.querySelector('.title-card');
          if (fallback) fallback.hidden = true;
        };
        img.onerror = attempt;
        attempt();
      });
    });
  }

  return { apply: apply, add: add, remove: remove, move: move, webURL: webURL, affectsArea: affectsArea,
    coverHTML: coverHTML, loadCovers: loadCovers };
})();
