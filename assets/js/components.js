const headerTemplate = '/partials/header.html';
const footerTemplate = '/partials/footer.html';

async function replaceWithPartial(selector, url) {
  const holder = document.querySelector(selector);
  if (!holder) return;
  try {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Partial unavailable');
    holder.innerHTML = await response.text();
  } catch {
    // The server-rendered fallback remains usable on direct or offline visits.
  }
}

function setCurrentPage() {
  const normalized = `${location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/'}/`.replace('//', '/');
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const href = new URL(link.href).pathname;
    const target = `${href.replace(/index\.html$/, '').replace(/\/$/, '') || '/'}/`.replace('//', '/');
    if (target === normalized) link.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('[data-menu-panel]').forEach((panel) => {
    if (panel.querySelector('[aria-current="page"]')) panel.previousElementSibling?.classList.add('has-current');
  });
}

function enableNavigation() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  const closeMenus = (except) => document.querySelectorAll('[data-menu-button]').forEach((button) => {
    if (button !== except) { button.setAttribute('aria-expanded', 'false'); document.getElementById(button.getAttribute('aria-controls'))?.classList.remove('is-open'); }
  });
  document.querySelectorAll('[data-menu-button]').forEach((button) => button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeMenus(button); button.setAttribute('aria-expanded', String(open)); panel?.classList.toggle('is-open', open);
  }));
  document.addEventListener('click', (event) => { if (!event.target.closest('.nav-group')) closeMenus(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const expanded = document.querySelector('[data-menu-button][aria-expanded="true"]');
      if (expanded) { closeMenus(); expanded.focus(); }
      else if (nav.classList.contains('is-open')) { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    }
  });
}

function normalizeBreadcrumbs() {
  if (location.pathname === '/') return;
  document.querySelectorAll('p.breadcrumb').forEach((paragraph) => {
    const nav = document.createElement('nav'); nav.className = 'breadcrumb'; nav.setAttribute('aria-label', 'Breadcrumb');
    nav.innerHTML = paragraph.innerHTML; nav.setAttribute('aria-current', 'page'); paragraph.replaceWith(nav);
  });
}

async function start() {
  await Promise.all([replaceWithPartial('[data-header]', headerTemplate), replaceWithPartial('[data-footer]', footerTemplate)]);
  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
  setCurrentPage();
  enableNavigation();
  normalizeBreadcrumbs();
}

start();
