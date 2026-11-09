/* ============================================================
   Sean K Kennedy — main.js
   ============================================================ */

(function () {
  'use strict';

  // ——————————————————————————————————————————
  // Copyright year
  // ——————————————————————————————————————————
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ——————————————————————————————————————————
  // Back to Top — show near bottom of page
  // ——————————————————————————————————————————
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      var nearBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 200;
      backToTop.classList.toggle('is-visible', nearBottom);
    }, { passive: true });
  }

  // ——————————————————————————————————————————
  // Scroll CTA — hide on scroll
  // ——————————————————————————————————————————
  var scrollCta = document.querySelector('.scroll-cta');
  if (scrollCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        scrollCta.classList.add('is-hidden');
      } else {
        scrollCta.classList.remove('is-hidden');
      }
    }, { passive: true });
  }

  // ——————————————————————————————————————————
  // Reveal on scroll — IntersectionObserver
  // ——————————————————————————————————————————
  var reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

})();
