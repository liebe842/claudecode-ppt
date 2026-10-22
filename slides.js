(function () {
  var root = document.documentElement;
  var deck = document.getElementById('deck');
  var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  var total = slides.length;
  var W = 1920, H = 1080;
  var prev = document.getElementById('prev'), next = document.getElementById('next');
  var prog = document.getElementById('prog'), count = document.getElementById('count');
  var toc = document.getElementById('toc'), tocBtn = document.getElementById('tocBtn'), scrim = document.getElementById('scrim');
  var notesBar = document.getElementById('notesBar');
  var idx = 0;

  // 차시 전환 — 새 차시가 생기면 여기에 한 줄 추가
  var LESSONS = [
    { id: '1', href: 'index.html', label: '1차시' },
    { id: '2', href: 'lesson2.html', label: '2차시' }
  ];
  var current = root.dataset.lesson;
  function lessonSwitch() {
    var box = document.createElement('div'); box.className = 'lesson-switch';
    LESSONS.forEach(function (l) {
      var a = document.createElement('a'); a.href = l.href; a.textContent = l.label;
      if (l.id === current) { a.className = 'on'; a.setAttribute('aria-current', 'page'); }
      box.appendChild(a);
    });
    return box;
  }
  var ctl = document.querySelector('.ctl');
  ctl.insertBefore(lessonSwitch(), ctl.firstChild);
  var tocHead = toc.querySelector('.panel-head');
  tocHead.parentNode.insertBefore(lessonSwitch(), tocHead.nextSibling).classList.add('in-panel');

  // 목록 만들기
  var tocList = document.getElementById('tocList'), lastPart = null, tocItems = [];
  slides.forEach(function (s, i) {
    var part = s.dataset.part || '';
    if (part !== lastPart) { var h = document.createElement('h3'); h.textContent = part; tocList.appendChild(h); lastPart = part; }
    var b = document.createElement('button'); b.type = 'button';
    b.innerHTML = '<span>' + (i + 1) + '</span>';
    b.appendChild(document.createTextNode(s.dataset.title || ''));
    b.addEventListener('click', function () { show(i); closePanels(); });
    tocList.appendChild(b); tocItems.push(b);
  });

  function renderNotes() {
    var s = slides[idx], n = s.dataset.notes;
    notesBar.innerHTML = '';
    var w = document.createElement('p'); w.className = 'where'; w.textContent = (idx + 1) + '. ' + (s.dataset.title || '');
    var p = document.createElement('p');
    if (n) p.textContent = n; else { p.className = 'empty'; p.textContent = '이 슬라이드에는 노트가 없어요.'; }
    notesBar.appendChild(w); notesBar.appendChild(p);
  }

  function show(n) {
    idx = Math.max(0, Math.min(total - 1, n));
    slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    prev.disabled = idx === 0;
    next.disabled = idx === total - 1;
    prog.style.width = ((idx + 1) / total * 100) + '%';
    count.textContent = (idx + 1) + ' / ' + total;
    tocItems.forEach(function (b, i) { b.classList.toggle('on', i === idx); });
    renderNotes();
    if (location.hash !== '#' + (idx + 1)) { try { history.replaceState(null, '', '#' + (idx + 1)); } catch (e) {} }
  }

  // 패널
  function openToc() { toc.classList.add('on'); scrim.classList.add('on'); tocBtn.setAttribute('aria-expanded', 'true'); var on = tocList.querySelector('.on'); if (on) on.scrollIntoView({ block: 'center' }); }
  function closePanels() { toc.classList.remove('on'); scrim.classList.remove('on'); tocBtn.setAttribute('aria-expanded', 'false'); }
  function toggleToc() { if (toc.classList.contains('on')) closePanels(); else openToc(); }
  function toggleNotes() { notesBar.classList.toggle('on'); }
  tocBtn.addEventListener('click', toggleToc);
  scrim.addEventListener('click', closePanels);
  document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closePanels); });
  document.getElementById('notesBtn').addEventListener('click', toggleNotes);

  prev.addEventListener('click', function () { show(idx - 1); });
  next.addEventListener('click', function () { show(idx + 1); });

  // 화면 모드
  var KEY = 'claudecode-basic-theme';
  function setTheme(t) { root.dataset.theme = t; try { localStorage.setItem(KEY, t); } catch (e) {} }
  try { var saved = localStorage.getItem(KEY); if (saved) root.dataset.theme = saved; } catch (e) {}
  function toggleTheme() { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); }
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);

  // 전체화면
  function toggleFullscreen() {
    if (document.fullscreenElement) { if (document.exitFullscreen) document.exitFullscreen(); }
    else if (root.requestFullscreen) root.requestFullscreen().catch(function () {});
  }
  document.getElementById('fsBtn').addEventListener('click', toggleFullscreen);

  // 키보드
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target && e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Spacebar') {
      e.preventDefault(); show(idx + 1);
    } else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); show(idx - 1); }
    else if (k === 'Home') { e.preventDefault(); show(0); }
    else if (k === 'End') { e.preventDefault(); show(total - 1); }
    else if (k === 'Escape') { closePanels(); notesBar.classList.remove('on'); }
    else if (k === 'f' || k === 'F') { toggleFullscreen(); }
    else if (k === 'n' || k === 'N') { toggleNotes(); }
    else if (k === 'l' || k === 'L') { toggleToc(); }
    else if (k === 'd' || k === 'D') { toggleTheme(); }
  });
  // 버튼 클릭 후 Space가 버튼을 다시 누르지 않도록
  document.querySelectorAll('button').forEach(function (b) { b.addEventListener('mouseup', function () { b.blur(); }); });

  // 터치 넘기기
  var sx = null, sy = null, stage = document.getElementById('stage');
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? idx + 1 : idx - 1);
    sx = null;
  }, { passive: true });

  // 조작 버튼: 마우스를 멈추면 숨김
  var idleTimer = null;
  function wake() {
    document.body.classList.remove('idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { if (!toc.classList.contains('on')) document.body.classList.add('idle'); }, 2500);
  }
  addEventListener('mousemove', wake); addEventListener('touchstart', wake, { passive: true }); wake();

  // 16:9 맞춤 축소
  function fit() {
    var m = document.fullscreenElement ? 0 : 12;
    var w = Math.max(0, innerWidth - m * 2), h = Math.max(0, innerHeight - m * 2);
    var s = Math.min(w / W, h / H);
    var x = (innerWidth - W * s) / 2, y = (innerHeight - H * s) / 2;
    deck.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
  }
  addEventListener('resize', fit); document.addEventListener('fullscreenchange', fit); fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  // 이미지 자리: img/ 폴더에 data-img 파일이 있으면 자동 교체
  document.querySelectorAll('.placeholder[data-img]').forEach(function (ph) {
    var img = new Image();
    img.onload = function () { ph.classList.add('has-img'); ph.textContent = ''; img.alt = ''; ph.appendChild(img); };
    img.src = 'img/' + ph.dataset.img;
  });

  // 복사 버튼: 코드 원문 그대로 복사
  document.querySelectorAll('.copy-btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var box = b.closest('.term, .inline-cmd');
      var text = box.querySelector('code').textContent;
      function done() {
        b.textContent = '복사됨!'; b.classList.add('ok');
        setTimeout(function () { b.textContent = '복사'; b.classList.remove('ok'); }, 1500);
      }
      function fallback() {
        var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        ta.remove(); done();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    });
  });

  // URL 해시(#12)로 바로 열기
  function fromHash() { var n = parseInt(location.hash.slice(1), 10); return isNaN(n) ? null : n - 1; }
  addEventListener('hashchange', function () { var n = fromHash(); if (n !== null && n !== idx) show(n); });
  var start = fromHash();
  show(start === null ? 0 : start);
})();
