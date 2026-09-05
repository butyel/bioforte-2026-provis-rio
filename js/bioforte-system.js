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

  /* ---- Centro de Dúvidas: accordion + busca + hash ---- */
  var faqItems = document.querySelectorAll('.bio-faq-item');
  if (faqItems.length) {
    // accordion
    document.addEventListener('click', function (e) {
      var q = e.target.closest ? e.target.closest('.bio-faq-q') : null;
      if (!q) return;
      var item = q.closest('.bio-faq-item');
      if (!item) return;
      var a = item.querySelector('.bio-faq-a');
      var open = item.classList.contains('is-open');
      if (open) {
        item.classList.remove('is-open');
        if (a) a.style.maxHeight = '0px';
      } else {
        item.classList.add('is-open');
        if (a) a.style.maxHeight = a.scrollHeight + 'px';
      }
    });

    // busca
    var faqSearch = document.getElementById('bio-faq-search');
    if (faqSearch) {
      faqSearch.addEventListener('input', function () {
        var term = faqSearch.value.trim().toLowerCase();
        faqItems.forEach(function (it) {
          var txt = (it.getAttribute('data-search') || '').toLowerCase();
          it.classList.toggle('is-hidden', term && txt.indexOf(term) === -1);
        });
        document.querySelectorAll('.bio-faq-group').forEach(function (g) {
          g.classList.toggle('is-empty', term && !Array.from(g.querySelectorAll('.bio-faq-item')).some(function (i) { return !i.classList.contains('is-hidden'); }));
        });
      });
    }

    // hash: abre o item e rola até ele
    function openHash() {
      if (!location.hash) return;
      var target = document.getElementById(location.hash.slice(1));
      if (target && target.classList.contains('bio-faq-item')) {
        target.classList.add('is-open');
        var a = target.querySelector('.bio-faq-a');
        if (a) a.style.maxHeight = a.scrollHeight + 'px';
        setTimeout(function () {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }, 60);
      }
    }
    openHash();
    window.addEventListener('hashchange', openHash);
  }

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