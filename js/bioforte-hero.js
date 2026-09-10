/* Rotação discreta, pausável e sem deslocar o conteúdo. Sem dependências. */
(function () {
  'use strict';
  var hero = document.querySelector('.bio-hero');
  var data = document.getElementById('bio-hero-services');
  var word = hero && hero.querySelector('.bio-hero-word');
  var rotator = hero && hero.querySelector('.bio-hero-rotator');
  if (!data || !word || !rotator) return;
  var terms;
  try { terms = JSON.parse(data.textContent); } catch (e) { return; }
  if (!Array.isArray(terms) || terms.length < 2) return;
  terms = terms.filter(function (term) { return typeof term === 'string' && term.trim(); });
  if (terms.length < 2) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var visible = true;
  var index = 0;
  var timer = null;
  var swapTimer = null;

  function measure() {
    var current = word.textContent;
    var height = parseFloat(window.getComputedStyle(rotator).fontSize) * 2.7;
    terms.forEach(function (term) {
      word.textContent = term;
      height = Math.max(height, word.offsetHeight);
    });
    word.textContent = current;
    rotator.style.minHeight = height + 'px';
  }
  function stop() {
    clearInterval(timer);
    clearTimeout(swapTimer);
    timer = null;
    word.classList.remove('bio-hero-word--out');
  }
  function update() {
    stop();
    if (motion.matches || document.hidden || !visible) return;
    timer = setInterval(function () {
      word.classList.add('bio-hero-word--out');
      swapTimer = setTimeout(function () {
        index = (index + 1) % terms.length;
        word.textContent = terms[index];
        word.classList.remove('bio-hero-word--out');
      }, 180);
    }, 4800);
  }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(rotator);
  else window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', update);
  if (motion.addEventListener) motion.addEventListener('change', update);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; update(); }).observe(hero);
  }
  update();
})();
