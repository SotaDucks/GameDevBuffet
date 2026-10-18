/* 默认深色，手动切换后记住选择。放在 <head> 里，避免页面闪烁。 */
(function () {
  var root = document.documentElement;
  root.setAttribute('data-theme', 'dark');
  try {
    var saved = localStorage.getItem('gdb-theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* 隐私模式等情况下读不到，忽略 */ }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') || 'dark';
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('gdb-theme', next); } catch (e) { /* 忽略 */ }
    });
  });
})();
