/* =====================================================================
 *  旅行小册子 · 版权与防滥用前端模块
 *  设计取舍：
 *    不做「禁止右键 / 禁止复制」——那既挡不住专业采集，又会激怒真实读者
 *    （旅游攻略里最常被复制的就是行程与票价，堵住等于赶客）。
 *    改采「让抄袭者顺便替你带回来源」：复制即自动追加署名与原文链接，
 *    使盗用内容天然携带一条指回本站的外链。
 * ===================================================================*/
(function () {
  'use strict';

  /* ---------- 1. 明暗底色自适应 ----------
   * 站上存在两类页面：深色渐变底（目的地页）与浅色底（普通页）。
   * 硬编码配色会让其中一类不可读，故解析 body 背景自行判断。 */
  function detectTheme() {
    var st = window.getComputedStyle(document.body);
    var bg = st.backgroundColor || '';
    var nums = bg.match(/[\d.]+/g);
    if (nums && nums.length >= 3) {
      var a = nums.length > 3 ? parseFloat(nums[3]) : 1;
      if (a > 0.5) {
        var lum = 0.299 * parseFloat(nums[0]) +
                  0.587 * parseFloat(nums[1]) +
                  0.114 * parseFloat(nums[2]);
        return lum >= 170 ? 'light' : 'dark';
      }
    }
    /* 背景透明或半透明：本站目的地页用渐变图打底，按深色处理 */
    var img = st.backgroundImage || '';
    return /gradient|url\(/.test(img) ? 'dark' : 'light';
  }

  function applyTheme() {
    var theme = detectTheme();
    var els = document.querySelectorAll('.tp-pro');
    for (var i = 0; i < els.length; i++) {
      var c = els[i].classList;
      c.remove('tp-pro--light');
      c.remove('tp-pro--dark');
      c.add('tp-pro--' + theme);
    }
  }

  /* ---------- 2. 复制时自动追加来源署名 ----------
   * 仅对成段文本生效（阈值 60 个非空白字符），
   * 避免复制链接、地名、价格时添乱。 */
  document.addEventListener('copy', function (e) {
    try {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed) { return; }
      var raw = String(sel);
      if (!raw.replace(/\s/g, '').length) { return; }
      if (raw.replace(/\s/g, '').length < 60) { return; }

      var url = location.href.split('#')[0];
      var note = '\n\n—— 以上内容来自「旅行小册子」（' + location.hostname + '）' +
                 '\n原文链接：' + url +
                 '\n版权归原作者所有，转载请注明出处。';

      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', raw + note);
        e.preventDefault();
      }
    } catch (err) { /* 剪贴板不可用时保持默认行为，不影响用户正常复制 */ }
  });

  /* ---------- 3. 图片拖拽保护 ----------
   * 拖到桌面即可存图，是图片被搬走成本最低的路径。
   * 注意：不拦 <picture>/srcset，也不加水印，避免破坏视觉与 srcset 适配。 */
  document.addEventListener('dragstart', function (e) {
    var t = e.target;
    if (t && (t.tagName === 'IMG' || t.tagName === 'PICTURE')) {
      e.preventDefault();
    }
  });

  function sealImages() {
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].getAttribute('draggable') !== 'true') {
        imgs[i].setAttribute('draggable', 'false');
      }
    }
  }

  /* ---------- 4. 控制台版权提示 ----------
   * 纯提示性质。采集者打开控制台调试时能看见，起一定的法律威慑。 */
  (function () {
    var brand = '旅行小册子 · worldstip.com';
    var notice = '本站内容为原创整理，受著作权法保护。\n' +
                 '禁止批量采集、镜像转载；如需转载请注明出处并保留原文链接。';
    try {
      console.log('%c' + brand, 'color:#d9a441;font-weight:700;font-size:14px');
      console.log('%c' + notice, 'color:#8a939c;font-size:12px');
    } catch (err) { /* 部分环境 console 不可用 */ }
  })();

  /* ---------- 初始化：兼容 defer 与动态插入的情况 ---------- */
  function init() {
    applyTheme();
    sealImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', function () {
    applyTheme();
    sealImages();
  });
})();
