/* 等角（isometric）绘图小工具：用 SVG 画细线方块、楼层和封面。 */
window.ISO = (function () {
  var C = Math.sqrt(3) / 2;
  var f = function (n) { return (Math.round(n * 10) / 10).toString(); };

  /* 世界坐标 (x, y, z) → 屏幕坐标。x 向右下，y 向左下，z 向上。 */
  function proj(s, ox, oy) {
    return function (x, y, z) {
      z = z || 0;
      return [ox + (x - y) * C * s, oy + (x + y) * 0.5 * s - z * s];
    };
  }
  function pts(a) { return a.map(function (p) { return f(p[0]) + ',' + f(p[1]); }).join(' '); }

  /* 一个长方体：左面、右面、顶面（从后往前画） */
  function box(p, x0, y0, z0, w, d, h, cls) {
    var x1 = x0 + w, y1 = y0 + d, z1 = z0 + h;
    var top = [p(x0, y0, z1), p(x1, y0, z1), p(x1, y1, z1), p(x0, y1, z1)];
    var left = [p(x0, y1, z1), p(x1, y1, z1), p(x1, y1, z0), p(x0, y1, z0)];
    var right = [p(x1, y0, z1), p(x1, y1, z1), p(x1, y1, z0), p(x1, y0, z0)];
    return '<g class="ibox ' + (cls || '') + '">' +
      '<polygon class="f-left" points="' + pts(left) + '"/>' +
      '<polygon class="f-right" points="' + pts(right) + '"/>' +
      '<polygon class="f-top" points="' + pts(top) + '"/></g>';
  }

  /* 平面上的细网格线 */
  function gridLines(p, x0, y0, w, d, z, cls) {
    var out = '', i, a, b;
    for (i = 0; i <= w; i++) { a = p(x0 + i, y0, z); b = p(x0 + i, y0 + d, z); out += 'M' + f(a[0]) + ',' + f(a[1]) + 'L' + f(b[0]) + ',' + f(b[1]); }
    for (i = 0; i <= d; i++) { a = p(x0, y0 + i, z); b = p(x0 + w, y0 + i, z); out += 'M' + f(a[0]) + ',' + f(a[1]) + 'L' + f(b[0]) + ',' + f(b[1]); }
    return '<path class="' + (cls || 'grid-line') + '" d="' + out + '"/>';
  }
  function diamond(p, x0, y0, w, d, z, cls) {
    return '<polygon class="' + (cls || 'base-edge') + '" points="' + pts([p(x0, y0, z), p(x0 + w, y0, z), p(x0 + w, y0 + d, z), p(x0, y0 + d, z)]) + '"/>';
  }

  /* 可复现的伪随机数 */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  /* 卡片封面：6×6 的小"城市"，最高的两块是悬停时会亮的灯 */
  function cover(seed) {
    var n = 6, s = 11, p = proj(s, 96, 36), r = rng(seed), cells = [], x, y, i;
    for (x = 0; x < n; x++) for (y = 0; y < n; y++) cells.push([x, y]);
    for (i = cells.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = cells[i]; cells[i] = cells[j]; cells[j] = t; }
    var k = 7 + Math.floor(r() * 3);
    var picks = cells.slice(0, k).map(function (c) { return { x: c[0], y: c[1], h: 0.5 + Math.round(r() * 20) / 10 }; });
    var tall = picks.slice().sort(function (a, b) { return b.h - a.h; });
    tall[0].tgt = true; tall[1].tgt = true;
    picks.sort(function (a, b) { return (a.x + a.y) - (b.x + b.y) || a.h - b.h; });
    var out = '<svg viewBox="0 0 192 108" aria-hidden="true" focusable="false">' +
      gridLines(p, 0, 0, n, n, 0) + diamond(p, 0, 0, n, n, 0);
    picks.forEach(function (b) { out += box(p, b.x + 0.12, b.y + 0.12, 0, 0.76, 0.76, b.h, b.tgt ? 'tgt' : ''); });
    return out + '</svg>';
  }

  /* 首屏"大楼"：每层对应一个分组，层上的小方块数 = 该组资源数 */
  function building(floors, opts) {
    opts = opts || {};
    var n = 6, s = 20, gap = 4.5, t = 0.45, ch = 0.8;
    var count = floors.length;
    var zTop = (count - 1) * gap + t + ch;
    var ox = 140, oy = Math.ceil(zTop * s) + 12;
    var W = 540, H = oy + n * s + 12;
    var p = proj(s, ox, oy);
    var rows = {
      1: [2], 2: [1, 3], 3: [1, 2, 3], 4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4]
    };
    var line = [[5, 1], [4, 2], [3, 3], [2, 4], [1, 5]];
    var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="分区大楼示意图，每一层对应一个分组" focusable="false">';

    /* 四根贯穿的虚线立柱 */
    [[0, 0], [n, 0], [n, n], [0, n]].forEach(function (c) {
      var a = p(c[0], c[1], 0), b = p(c[0], c[1], (count - 1) * gap + t);
      out += '<line class="pillar" x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '"/>';
    });

    for (var i = count - 1; i >= 0; i--) {            // 从最下面一层开始画
      var fl = floors[i];
      var z0 = (count - 1 - i) * gap;
      var rv = p(n, 0, z0 + t);                        // 顶面最右的角，用来拉引线
      out += '<a class="floor" data-i="' + i + '" href="#' + fl.id + '" aria-label="' + fl.label + '，共 ' + fl.count + ' 条，点击跳转">';
      out += '<g class="slab-wrap">' + box(p, 0, 0, z0, n, n, t, 'slab') + gridLines(p, 0, 0, n, n, z0 + t) + '</g>';
      var idx = rows[fl.count] || rows[5];
      var cubes = idx.map(function (ci) { return line[ci]; }).sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]); });
      cubes.forEach(function (c) { out += box(p, c[0] + 0.1, c[1] + 0.1, z0 + t, 0.8, 0.8, ch, 'cube'); });
      var lx = ox + n * C * s + 46;
      out += '<path class="leader" d="M' + f(rv[0] + 10) + ',' + f(rv[1]) + 'L' + f(lx - 10) + ',' + f(rv[1]) + '"/>';
      out += '<circle class="leader-dot" cx="' + f(rv[0] + 10) + '" cy="' + f(rv[1]) + '" r="2.5"/>';
      out += '<text class="t0" x="' + f(lx) + '" y="' + f(rv[1] - 8) + '">' + fl.no + '</text>';
      out += '<text class="t1" x="' + f(lx) + '" y="' + f(rv[1] + 10) + '">' + fl.label + '</text>';
      out += '<text class="t2" x="' + f(lx) + '" y="' + f(rv[1] + 28) + '">' + fl.count + ' 条资源</text>';
      out += '</a>';
    }
    return out + '</svg>';
  }

  return { proj: proj, pts: pts, box: box, gridLines: gridLines, diamond: diamond, rng: rng, hash: hash, cover: cover, building: building, C: C };
})();
