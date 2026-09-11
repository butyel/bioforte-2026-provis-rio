/* =========================================================
   Bioforte — core leve (substitui o bundle legado do tema)
   - Reveal on scroll (.reveal.active) para as seções da Home
   - Lightbox de foto (data-fancybox="...")
   - Carrossel de logos de clientes (.clients-slider)
   - Scroll-up discreto
   - Smooth scroll para âncoras
   - Newsletter: envio via /api/subscribe (Vercel Serverless)
   Sem dependências; respeita prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal:not(.active)');
  function applyReveal() {
    var vh = window.innerHeight;
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < vh - 60) {
        el.classList.add('active');
      }
    });
  }
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach(function (el) { el.classList.add('active'); });
    } else {
      applyReveal();
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { applyReveal(); ticking = false; });
      }, { passive: true });
      window.addEventListener('resize', applyReveal);
    }
  }

  /* ---------- Lightbox minimalista (data-fancybox) ---------- */
  var overlay = null;
  function closeLightbox() {
    if (overlay) { overlay.remove(); overlay = null; }
    document.removeEventListener('keydown', lightboxKey, true);
    document.body.classList.remove('bf-lightbox-open');
  }
  function lightboxKey(e) {
    if (e.key === 'Escape') closeLightbox();
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[data-fancybox]') : null;
    if (!link) return;
    e.preventDefault();
    var href = link.getAttribute('href');
    if (!href) return;
    if (href.indexOf('#') === 0) return;
    var cap = link.getAttribute('data-caption') || link.getAttribute('aria-label') || '';
    overlay = document.createElement('div');
    overlay.className = 'bf-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', cap || 'Imagem ampliada');
    overlay.innerHTML =
      '<button type="button" class="bf-lightbox-close" aria-label="Fechar imagem">&times;</button>' +
      '<img src="' + href.replace(/"/g, '&quot;') + '" alt="' + (cap.replace(/"/g, '&quot;')) + '" decoding="async">' +
      (cap ? '<p class="bf-lightbox-caption">' + cap + '</p>' : '');
    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay || ev.target.classList.contains('bf-lightbox-close')) closeLightbox();
    });
    document.body.appendChild(overlay);
    document.body.classList.add('bf-lightbox-open');
    document.addEventListener('keydown', lightboxKey, true);
    overlay.querySelector('.bf-lightbox-close').focus();
  }, true);

  /* ---------- Carrossel de logos de clientes ---------- */
  var slider = document.querySelector('.clients-slider');
  if (slider) {
    var items = Array.prototype.slice.call(slider.children);
    if (items.length) {
      items.forEach(function (item) { item.classList.add('cloned'); slider.appendChild(item.cloneNode(true)); });
      if (reduceMotion) {
        slider.style.overflowX = 'auto';
      } else {
        slider.classList.add('is-animated');
      }
    }
  }

  /* ---------- Scroll up ---------- */
  var upBtn = null;
  function maybeUp() {
    var el = document.documentElement;
    if (el.scrollTop > 300 || document.body.scrollTop > 300) {
      if (!upBtn) {
        upBtn = document.createElement('button');
        upBtn.type = 'button';
        upBtn.id = 'scrollUp';
        upBtn.setAttribute('aria-label', 'Voltar ao topo');
        upBtn.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>';
        upBtn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
        document.body.appendChild(upBtn);
      }
      upBtn.classList.add('show');
    } else if (upBtn) {
      upBtn.classList.remove('show');
    }
  }
  if (document.querySelector('.boxed-layout')) {
    window.addEventListener('scroll', maybeUp, { passive: true });
    maybeUp();
  }

  /* ---------- Smooth scroll em âncoras internas ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
    e.preventDefault();
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, { passive: true });
})();