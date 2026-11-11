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
  // Mobile Menu
  // ——————————————————————————————————————————
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileNav  = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
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
  // Hero Animation #5 — Cascade then Typewriter
  // ——————————————————————————————————————————
  (function () {
    if (window.innerWidth < 769) return;

    var eyebrow = document.querySelector('.hero__eyebrow');
    var hero    = document.querySelector('.hero');
    if (!eyebrow || !hero) return;

    var fullText = eyebrow.textContent.trim();
    eyebrow.textContent = '';

    // Wait for cascade to finish (~2.4s), then type the eyebrow
    setTimeout(function () {
      eyebrow.classList.add('is-typing');
      var i = 0;
      function typeChar() {
        if (i < fullText.length) {
          eyebrow.textContent += fullText[i++];
          setTimeout(typeChar, 48);
        } else {
          eyebrow.classList.remove('is-typing');
          hero.classList.add('hero--typed');
        }
      }
      typeChar();
    }, 2400);
  })();

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
