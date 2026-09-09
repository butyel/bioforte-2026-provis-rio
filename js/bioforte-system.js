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
  function normalize(value) {
    value = value.toLowerCase();
    return value.normalize ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : value;
  }

  function apply() {
    if (!cards.length) return;
    var term = (search ? normalize(search.value.trim()) : '');
    var activeCat = document.querySelector('.bio-filter-chip.is-active');
    var cat = activeCat ? activeCat.getAttribute('data-cat') : 'todas';
    var visible = 0;

    cards.forEach(function (card) {
      var text = normalize(card.getAttribute('data-search') || card.textContent);
      var cardCat = card.getAttribute('data-cat') || '';
      var matchesTerm = !term || text.indexOf(term) !== -1;
      var matchesCat = cat === 'todas' || cardCat === cat;
      var show = matchesTerm && matchesCat;
      card.classList.toggle('is-hidden', !show);
      // Hide the grid column too, avoiding empty spaces between matching cards.
      var column = card.closest('.bio-hub-col');
      (column || card).hidden = !show;
      if (show) visible++;
    });

    if (emptyMsg) {
      emptyMsg.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  if (search) search.addEventListener('input', apply);
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      apply();
    });
  });
  chips.forEach(function (chip) { chip.setAttribute('aria-pressed', String(chip.classList.contains('is-active'))); });
  if (emptyMsg) emptyMsg.setAttribute('role', 'status');

  /* ---- Centro de Dúvidas: accordion + busca + hash ---- */
  var faqItems = document.querySelectorAll('.bio-faq-item');
  if (faqItems.length) {
    function setFaq(item, open) {
      item.classList.toggle('is-open', open);
      var question = item.querySelector('.bio-faq-q');
      var answer = item.querySelector('.bio-faq-a');
      if (question) question.setAttribute('aria-expanded', String(open));
      if (answer) { answer.hidden = !open; answer.style.maxHeight = ''; }
    }
    faqItems.forEach(function (item, i) {
      var question = item.querySelector('.bio-faq-q');
      var answer = item.querySelector('.bio-faq-a');
      if (question && answer) {
        answer.id = answer.id || 'bio-faq-answer-' + i;
        question.setAttribute('aria-controls', answer.id);
      }
      setFaq(item, item.classList.contains('is-open'));
    });
    // accordion
    document.addEventListener('click', function (e) {
      var q = e.target.closest ? e.target.closest('.bio-faq-q') : null;
      if (!q) return;
      var item = q.closest('.bio-faq-item');
      if (!item) return;
      setFaq(item, !item.classList.contains('is-open'));
    });

    // busca
    var faqSearch = document.getElementById('bio-faq-search');
    if (faqSearch) {
      var faqStatus = document.createElement('p');
      faqStatus.className = 'bio-search-status';
      faqStatus.setAttribute('role', 'status');
      faqStatus.hidden = true;
      faqSearch.closest('.bio-faq-search').insertAdjacentElement('afterend', faqStatus);
      faqSearch.addEventListener('input', function () {
        var term = normalize(faqSearch.value.trim());
        var count = 0;
        faqItems.forEach(function (it) {
          var txt = normalize(it.getAttribute('data-search') || it.textContent);
          var found = !term || txt.indexOf(term) !== -1;
          it.classList.toggle('is-hidden', !found);
          if (found) count++;
        });
        faqStatus.hidden = !term;
        faqStatus.textContent = count ? count + (count === 1 ? ' dúvida encontrada.' : ' dúvidas encontradas.') : 'Nenhuma dúvida encontrada. Tente outra palavra, como orçamento ou prevenção.';
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
        setFaq(target, true);
        setTimeout(function () {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }, 60);
      }
    }
    openHash();
    window.addEventListener('hashchange', openHash);
  }

  /* ---- Landing page de serviço: accordion FAQ (service-faq) ---- */
  var serviceFaq = document.querySelectorAll('.service-faq-item');
  if (serviceFaq.length) {
    function setServiceFaq(item, open) {
      item.classList.toggle('is-open', open);
      var question = item.querySelector('.service-faq-q');
      if (question) question.setAttribute('aria-expanded', String(open));
    }
    serviceFaq.forEach(function (item, i) {
      var question = item.querySelector('.service-faq-q');
      var answer = item.querySelector('.service-faq-a');
      if (question && answer) {
        answer.id = answer.id || 'service-faq-answer-' + i;
        question.setAttribute('aria-controls', answer.id);
      }
      setServiceFaq(item, item.classList.contains('is-open'));
      if (question) question.addEventListener('click', function () {
        setServiceFaq(item, !item.classList.contains('is-open'));
      });
    });
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
