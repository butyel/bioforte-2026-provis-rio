/* =========================================================
   Bioforte — Sistema de componentes (interações leves)
   Busca e filtros da Central de Pragas, reveal on scroll.
   Sem dependências; respeita prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Central de Pragas: busca + filtros ---- */
  var search = document.getElementById('bp-search');
  var chips = document.querySelectorAll('.bio-filter-chip');
  var cards = document.querySelectorAll('.bio-hub-card');
  var emptyMsg = document.getElementById('bp-empty');

  function apply() {
    if (!cards.length) return;
    var term = (search ? search.value.trim().toLowerCase() : '');
    var activeCat = document.querySelector('.bio-filter-chip.is-active');
    var cat = activeCat ? activeCat.getAttribute('data-cat') : 'todas';
    var visible = 0;

    cards.forEach(function (card) {
      var text = (card.getAttribute('data-search') || '').toLowerCase();
      var cardCat = card.getAttribute('data-cat') || '';
      var matchesTerm = !term || text.indexOf(term) !== -1;
      var matchesCat = cat === 'todas' || cardCat === cat;
      var show = matchesTerm && matchesCat;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    if (emptyMsg) {
      emptyMsg.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  if (search) search.addEventListener('input', apply);
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      apply();
      if (search && term) { /* mantém termo */ }
    });
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.bio-reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }
})();