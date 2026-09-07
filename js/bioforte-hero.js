/* =========================================================
   Bioforte — Hero dinâmico (rotação de serviços)
   - Lista real de serviços extraída de um <script type="application/json">
   - Reserva altura para o maior termo (sem layout shift)
   - Rotação com fade + movimento vertical curto
   - Respeita prefers-reduced-motion (conteúdo estático)
   - Scroll suave para âncoras internas do hero
   Sem dependências. Funciona mesmo sem JS (mostra o 1º termo).
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var dataScript = document.getElementById('bio-hero-services');
  var rotator = document.querySelector('.bio-hero-rotator');
  if (!rotator || !dataScript) return;
  var word = rotator.querySelector('.bio-hero-word');
  if (!word) return;

  var terms;
  try {
    terms = JSON.parse(dataScript.textContent);
  } catch (err) {
    return;
  }
  if (Object.prototype.toString.call(terms) !== '[object Array]') return;
  terms = terms
    .map(function (t) { return String(t).trim(); })
    .filter(Boolean);
  if (!terms.length) return;

  var first = (word.textContent || '').trim();
  if (terms[0] !== first) {
    terms = [first].concat(terms.filter(function (t) { return t !== first; }));
  }

  function measure() {
    var maxH = 0;
    rotator.classList.add('is-measuring');
    for (var i = 0; i < terms.length; i++) {
      word.textContent = terms[i];
      if (word.offsetHeight > maxH) maxH = word.offsetHeight;
    }
    word.textContent = first;
    rotator.classList.remove('is-measuring');
    rotator.style.minHeight = maxH + 'px';
  }

  measure();
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 200);
  });

  if (reduceMotion) return; // conteúdo estático, sem rotação

  function swap(next) {
    word.classList.add('bio-hero-word--out');
    setTimeout(function () {
      word.textContent = next;
      word.classList.remove('bio-hero-word--out');
      word.classList.add('bio-hero-word--in');
      void word.offsetWidth;
      word.classList.remove('bio-hero-word--in');
    }, 300);
  }

  var idx = 0;
  setInterval(function () {
    idx = (idx + 1) % terms.length;
    swap(terms[idx]);
  }, 3400);

  /* Scroll suave para âncoras internas do hero */
  var anchors = document.querySelectorAll('.bio-hero a[href^="#"]');
  for (var a = 0; a < anchors.length; a++) {
    anchors[a].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  }
})();