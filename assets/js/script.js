(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const nav = document.getElementById('navigation');
  const menu = document.getElementById('menu-toggle');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.firstElementChild.src = `assets/icons/${open ? 'x' : 'menu'}.svg`;
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 681px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  const themeButton = document.getElementById('theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let explicitTheme = null;
  try { explicitTheme = localStorage.getItem('portfolio-theme'); } catch (_) { /* Storage can be disabled. */ }
  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    themeButton.firstElementChild.src = `assets/icons/${theme === 'dark' ? 'sun' : 'moon'}.svg`;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  applyTheme(explicitTheme === 'dark' || explicitTheme === 'light' ? explicitTheme : (systemTheme.matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    explicitTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(explicitTheme);
    try { localStorage.setItem('portfolio-theme', explicitTheme); } catch (_) { /* The theme still works without persistence. */ }
  });
  systemTheme.addEventListener('change', (event) => { if (!explicitTheme) applyTheme(event.matches ? 'dark' : 'light'); });

  const papers = [...document.querySelectorAll('.publication')];
  const statusButtons = [...document.querySelectorAll('[data-status].filter')];
  const search = document.getElementById('research-search');
  let selectedStatus = 'published';
  const updateResearch = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    papers.forEach((paper) => {
      const matches = (selectedStatus === 'all' || paper.dataset.status === selectedStatus) && paper.textContent.toLocaleLowerCase().includes(query);
      paper.hidden = !matches;
      if (matches) visible++;
    });
    document.getElementById('research-count').textContent = `${visible} of ${papers.length} research works`;
    document.getElementById('research-empty').hidden = visible !== 0;
    statusButtons.forEach((button) => {
      const active = button.dataset.status === selectedStatus;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };
  statusButtons.forEach((button) => button.addEventListener('click', () => {
    selectedStatus = button.dataset.status;
    updateResearch();
  }));
  search.addEventListener('input', updateResearch);
  document.getElementById('reset-research').addEventListener('click', () => {
    selectedStatus = 'all';
    search.value = '';
    updateResearch();
    search.focus();
  });
  updateResearch();

  const projects = [...document.querySelectorAll('.project')];
  const projectButtons = [...document.querySelectorAll('.project-filter')];
  projectButtons.forEach((button) => button.addEventListener('click', () => {
    let visible = 0;
    projects.forEach((project) => {
      project.hidden = button.dataset.category !== 'all' && project.dataset.category !== button.dataset.category;
      if (!project.hidden) visible++;
    });
    projectButtons.forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.getElementById('project-count').textContent = `${visible} of ${projects.length} projects`;
  }));

  // Preserve incoming links to the previous portfolio's section IDs.
  const aliases = { 'all-projects': 'projects', 'research-papers': 'research', 'experience': 'about', 'education': 'about', 'impact': 'work' };
  const resolveLegacyAnchor = () => {
    const target = aliases[location.hash.slice(1)];
    if (!target) return;
    history.replaceState(null, '', `#${target}`);
    document.getElementById(target).scrollIntoView();
  };
  resolveLegacyAnchor();
  window.addEventListener('hashchange', resolveLegacyAnchor);
  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    links.forEach((link) => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }

  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (![...form.querySelectorAll('input, textarea')].every((input) => input.value.trim())) {
      formStatus.textContent = 'Please complete each field before sending.';
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    if (button.disabled) return;
    button.disabled = true;
    formStatus.textContent = 'Sending your message...';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('Message submission failed');
      form.reset();
      formStatus.textContent = 'Your message was sent. Thank you for getting in touch.';
    } catch (error) {
      formStatus.textContent = error.name === 'AbortError'
        ? 'The request timed out; delivery could not be confirmed. You can email aravindaraman14@gmail.com directly.'
        : 'Your message could not be sent. Please try again or email aravindaraman14@gmail.com directly.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
    }
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
