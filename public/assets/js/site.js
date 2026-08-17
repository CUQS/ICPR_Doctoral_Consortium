(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const savedTheme = localStorage.getItem('hoi-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  root.dataset.theme = savedTheme || (prefersDark ? 'dark' : 'light');
  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('hoi-theme', next);
  });

  const menuToggle = document.querySelector('#menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('open');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav?.classList.toggle('open', !isOpen);
  });
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const progress = document.querySelector('.scroll-progress span');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const navLinks = [...document.querySelectorAll('.primary-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));

  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      projectCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  const posterDialog = document.querySelector('#poster-dialog');
  const openPoster = document.querySelector('#open-poster');
  const closePoster = document.querySelector('#close-poster');
  const openDialog = () => {
    if (!posterDialog) return;
    posterDialog.showModal();
    document.body.classList.add('modal-open');
  };
  const closeDialog = () => {
    posterDialog?.close();
    document.body.classList.remove('modal-open');
  };
  openPoster?.addEventListener('click', openDialog);
  closePoster?.addEventListener('click', closeDialog);
  posterDialog?.addEventListener('click', (event) => {
    if (event.target === posterDialog) closeDialog();
  });
  posterDialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));
})();
