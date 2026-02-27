(function () {
  'use strict';

  var currentLang = localStorage.getItem('portfolio-lang') || 'ar';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    var dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');

    document.querySelectorAll('[data-lang-ar][data-lang-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-lang-' + lang) || el.textContent;
    });
  }

  function initLangToggle() {
    setLanguage(currentLang);
    document.querySelectorAll('.lang-toggle .lang-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        document.querySelectorAll('.lang-toggle .lang-option').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
      });
    });
  }

  function initReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('revealed'); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      a.addEventListener('click', function (e) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* —— رابط الإيميل مباشر (mailto) —— */
  function initEmailLink() {
    var contactSection = document.getElementById('contact');
    var emailLink = document.getElementById('email-link');
    if (!contactSection || !emailLink) return;
    var email = contactSection.getAttribute('data-email') || '';
    if (email) emailLink.href = 'mailto:' + email;
  }

  /* —— زر العودة للأعلى —— */
  function initScrollTop() {
    var scrollBtn = document.getElementById('scroll-top');
    if (!scrollBtn) return;
    function onScroll() {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* —— تمييز قسم الشريط النشط عند التمرير —— */
  function initNavActive() {
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    var sections = [];
    navLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ id: id, link: a, el: section });
    });
    function updateActive() {
      var y = window.scrollY + 120;
      var current = null;
      sections.forEach(function (s) {
        var top = s.el.offsetTop;
        var height = s.el.offsetHeight;
        if (y >= top && y < top + height) current = s.link;
      });
      navLinks.forEach(function (link) { link.classList.remove('active'); });
      if (current) current.classList.add('active');
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  initLangToggle();
  initReveal();
  initSmoothScroll();
  initEmailLink();
  initScrollTop();
  initNavActive();
})();
