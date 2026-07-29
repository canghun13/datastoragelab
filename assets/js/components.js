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
}

function enableNavigation() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

async function start() {
  await Promise.all([replaceWithPartial('[data-header]', headerTemplate), replaceWithPartial('[data-footer]', footerTemplate)]);
  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
  setCurrentPage();
  enableNavigation();
}

start();
