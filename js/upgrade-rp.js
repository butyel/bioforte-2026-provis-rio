/* =========================================================
   Bioforte — Upgrade Ribeirão Preto (interações leves)
   Diagnóstico, FAQ accordion, reveal on scroll, CTA mobile.
   Sem dependências externas; respeito a prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- FAQ Accordion (delegação) ---------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.rp-accordion button') : null;
    if (!btn) return;
    var acc = btn.closest('.rp-accordion');
    var body = acc.querySelector('.rp-a-body');
    var isOpen = acc.classList.contains('is-open');
    if (isOpen) {
      acc.classList.remove('is-open');
      if (body) body.style.maxHeight = '0px';
    } else {
      acc.classList.add('is-open');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }
  });

  /* ---------- Diagnóstico: conteúdo contextual ---------- */
  var dxOptions = document.querySelectorAll('.rp-dx-option');
  var dxResult = document.getElementById('rp-dx-result');
  if (dxResult) {
    dxOptions.forEach(function (opt) {
      opt.addEventListener('click', function () {
        dxOptions.forEach(function (o) { o.classList.remove('is-active'); });
        opt.classList.add('is-active');
        var key = opt.getAttribute('data-pest');
        var all = dxResult.querySelectorAll('.rp-dx-slot');
        all.forEach(function (s) { s.style.display = 'none'; });
        var target = dxResult.querySelector('.rp-dx-slot[data-slot="' + key + '"]');
        if (target) {
          target.style.display = 'block';
          dxResult.classList.add('is-open');
          if (!reduceMotion) dxResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  /* ---------- Reveal on scroll (Intestação leve) ---------- */
  var revealEls = document.querySelectorAll('.rp-reveal');
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
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- CTA mobile: não cobrir FAQ/serviços (espaço reservado no body) ---------- */
  var mCta = document.querySelector('.rp-mobile-cta');
  if (mCta && window.innerWidth <= 767 && !document.body.classList.contains('rp-has-mobile-cta')) {
    document.body.classList.add('rp-has-mobile-cta');
  }
})();