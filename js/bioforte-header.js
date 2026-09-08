/* =========================================================
   Bioforte — Cabeçalho compartilhado (topbar + menu)
   - Submenus desktop: hover complementar + clique/teclado
   - Painel móvel: foco contido, Escape, clique fora, scroll lock
   - aria-expanded sincronizado
   Sem dependências; respeita prefers-reduced-motion.
   ========================================================= */
(function () {
  'use strict';

  var header = document.getElementById('header');
  if (!header || !header.classList.contains('bf-header')) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var burger = header.querySelector('.bf-burger');
  var panel = header.querySelector('.bf-mobile');
  var backdrop = header.querySelector('.bf-mobile-backdrop');
  var closeBtn = header.querySelector('.bf-mobile-close');
  var subs = Array.prototype.slice.call(header.querySelectorAll('.bf-has-sub'));
  var mSubs = Array.prototype.slice.call(header.querySelectorAll('.bf-m-sub'));

  /* ---------- Desktop: submenus ---------- */
  function closeDesktop() {
    subs.forEach(function (li) {
      li.classList.remove('is-open', 'is-hover');
      var c = li.querySelector('.bf-caret');
      if (c) c.setAttribute('aria-expanded', 'false');
    });
  }

  function openDesktop(li) {
    closeDesktop();
    li.classList.add('is-open');
    var c = li.querySelector('.bf-caret');
    if (c) c.setAttribute('aria-expanded', 'true');
  }

  function toggleDesktop(li) {
    if (li.classList.contains('is-open')) {
      li.classList.remove('is-open', 'is-hover');
      var c = li.querySelector('.bf-caret');
      if (c) c.setAttribute('aria-expanded', 'false');
    } else {
      openDesktop(li);
    }
  }

  header.querySelectorAll('.bf-caret').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = btn.closest('.bf-has-sub');
      if (li) toggleDesktop(li);
    });

    btn.addEventListener('keydown', function (e) {
      var li = btn.closest('.bf-has-sub');
      if (!li) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDesktop(li);
        var first = li.querySelector('.bf-sub a');
        if (first) first.focus();
      } else if (e.key === 'Escape') {
        if (li.classList.contains('is-open')) {
          toggleDesktop(li);
          btn.focus();
        }
      }
    });
  });

  var openTimer = null;
  var closeTimer = null;
  subs.forEach(function (li) {
    li.addEventListener('mouseenter', function () {
      if (window.innerWidth < 1200) return;
      clearTimeout(closeTimer);
      openTimer = setTimeout(function () {
        openDesktop(li);
      }, 110);
    });
    li.addEventListener('mouseleave', function () {
      clearTimeout(openTimer);
      closeTimer = setTimeout(function () {
        li.classList.remove('is-open', 'is-hover');
        var c = li.querySelector('.bf-caret');
        if (c) c.setAttribute('aria-expanded', 'false');
      }, 180);
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest && !e.target.closest('.bf-has-sub')) {
      closeDesktop();
    }
  });

  /* ---------- Móvel: painel ---------- */
  var lastFocused = null;

  function mobileFocusables() {
    if (!panel) return [];
    return Array.prototype.slice.call(
      panel.querySelectorAll('a[href], button:not([disabled])')
    ).filter(function (el) {
      return el.offsetParent !== null;
    });
  }

  function openMobile() {
    if (!panel) return;
    lastFocused = document.activeElement;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.classList.add('is-open');
    if (backdrop) backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeMobile() {
    if (!panel || !panel.classList.contains('is-open')) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.classList.remove('is-open');
    if (backdrop) backdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) {
        closeMobile();
      } else {
        openMobile();
      }
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);

  /* Acordeão móvel */
  mSubs.forEach(function (li) {
    var t = li.querySelector('.bf-m-toggle');
    if (!t) return;
    t.addEventListener('click', function () {
      var wasOpen = li.classList.contains('is-open');
      mSubs.forEach(function (x) {
        x.classList.remove('is-open');
        var b = x.querySelector('.bf-m-toggle');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        li.classList.add('is-open');
        t.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Foco contido no painel */
  if (panel) {
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var els = mobileFocusables();
      if (!els.length) return;
      var first = els[0];
      var last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !panel.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (panel && panel.classList.contains('is-open')) {
      closeMobile();
    } else {
      var open = header.querySelector('.bf-has-sub.is-open');
      if (open) {
        closeDesktop();
        var c = open.querySelector('.bf-caret');
        if (c) c.focus();
      }
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1200) {
      closeMobile();
      closeDesktop();
    }
  });

  if (reduceMotion && panel) {
    panel.style.transition = 'none';
  }
})();