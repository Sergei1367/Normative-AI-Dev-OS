(function () {
  'use strict';

  /* ---- Scroll Reveal ---- */
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealThreshold = 120;

    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - revealThreshold) {
        el.classList.add('reveal--visible');
      }
    });
  }

  /* ---- Header scroll effect ---- */
  const header = document.querySelector('.header');

  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    checkReveal();
  }

  /* ---- Mobile Menu ---- */
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', function () {
      burgerBtn.classList.toggle('active');
      mainNav.classList.toggle('header__nav--open');
    });

    document.querySelectorAll('.header__link').forEach(function (link) {
      link.addEventListener('click', function () {
        burgerBtn.classList.remove('active');
        mainNav.classList.remove('header__nav--open');
      });
    });
  }

  /* ---- Copy Email ---- */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copiedHint = document.getElementById('copiedHint');

  if (copyBtn && copiedHint) {
    copyBtn.addEventListener('click', function () {
      const email = 's06621848@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showCopied();
        }).catch(function () {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });

    function fallbackCopy(text) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showCopied();
      } catch (e) {}
      document.body.removeChild(textarea);
    }

    function showCopied() {
      copiedHint.classList.add('cta__copied--visible');
      setTimeout(function () {
        copiedHint.classList.remove('cta__copied--visible');
      }, 2000);
    }
  }

  /* ---- Events ---- */
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', checkReveal, { passive: true });
  window.addEventListener('load', function () {
    checkReveal();
    handleScroll();
  });
})();
