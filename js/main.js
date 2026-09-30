(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const mobileQuery = window.matchMedia('(max-width: 680px)');

  root.classList.add('js-ready');

  const closeMenu = (returnFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !isOpen);
      if (!isOpen && mobileQuery.matches) nav.querySelector('a')?.focus();
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && mobileQuery.matches) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
      if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true' && mobileQuery.matches) {
        const links = [...nav.querySelectorAll('a')];
        const first = links[0];
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggle.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.focus();
        }
      }
    });

    mobileQuery.addEventListener('change', () => closeMenu());
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  const door = document.querySelector('[data-door]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));

    if (door) {
      const doorObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            door.classList.add('is-visible');
            observer.unobserve(door);
          }
        });
      }, { threshold: 0.2 });
      doorObserver.observe(door);
    }
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    door?.classList.add('is-visible');
  }

  let ticking = false;
  const updateGrowth = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    root.style.setProperty('--growth-progress', progress.toFixed(4));
    if (door && door.classList.contains('is-visible')) {
      door.classList.toggle('is-opening', progress > 0.82);
    }
    ticking = false;
  };

  const requestGrowthUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateGrowth);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestGrowthUpdate, { passive: true });
  window.addEventListener('resize', requestGrowthUpdate, { passive: true });
  updateGrowth();
})();
