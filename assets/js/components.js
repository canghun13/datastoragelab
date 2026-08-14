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

function integrateSsdEntryPoints() {
  const path = location.pathname;
  if (path === '/') {
    const heading = [...document.querySelectorAll('.section-heading h2')].find((node) => node.textContent.includes('complete recovery plan'));
    const grid = heading?.closest('section')?.querySelector('.card-grid');
    if (grid && !grid.querySelector('[data-ssd-home-card]')) grid.insertAdjacentHTML('beforeend', '<article class="card" data-ssd-home-card><h3>SSD Endurance hub</h3><p>Convert SSD endurance ratings, model NAS and VM write workloads, and track remaining write budget.</p><a class="text-link" href="/tools/ssd-endurance/">Plan SSD endurance</a></article>');
  }
  const related = {
    '/tools/nas-configuration/': ['SSD endurance planning', '/tools/ssd-endurance/', 'Model cache and workload writes after choosing a NAS design.'],
    '/tools/cost-power/': ['SSD endurance planning', '/tools/ssd-endurance/', 'Use measured write trends before funding a replacement reserve.'],
    '/tools/nas-configuration/hdd-vs-ssd-storage-planner/': ['SSD endurance planning', '/tools/ssd-endurance/', 'After selecting SSD as a tier, test its write endurance and class.'],
    '/tools/cost-power/drive-replacement-reserve-calculator/': ['SSD Remaining Endurance Planner', '/tools/ssd-endurance/ssd-remaining-endurance-planner/', 'Turn a measured threshold into a documented replacement review.'],
    '/guides/hdd-vs-ssd-for-bulk-storage/': ['SSD endurance guide', '/guides/ssd-endurance-for-nas-cache-vms-backups/', 'Continue from media choice to SSD write workload and endurance planning.']
  };
  const item = related[path];
  const main = document.querySelector('main');
  if (item && main && !main.querySelector('[data-ssd-related]')) main.insertAdjacentHTML('beforeend', `<section class="section tint" data-ssd-related><div class="container prose"><h2>Continue SSD planning</h2><p>${item[2]} <a href="${item[1]}">${item[0]}</a>.</p></div></section>`);
}

function integrateFieldMediaEntryPoints() {
  const path = location.pathname;
  if (path === '/') {
    const grid = document.querySelector('.scenario-grid');
    if (grid && !grid.querySelector('[data-field-media-home-card]')) {
      grid.insertAdjacentHTML('beforeend', '<article class="scenario" data-field-media-home-card><strong>Field production</strong><p>Camera cards, verified offloads, portable copies, and release timing need one capture-to-copy plan. <a href="/tools/field-media/">Plan field media</a>.</p></article>');
    }
  }
  const related = {
    '/tools/storage-needs/creator-media-storage-planner/': ['Field Media Offload Planning', '/tools/field-media/', 'Before archive ingest, plan the camera cards, portable copies, verification window, and safe source release.'],
    '/tools/network-performance/video-editing-network-planner/': ['Media Offload Time Planner', '/tools/field-media/media-offload-time-planner/', 'Model the capture-to-portable-drive path separately from the post-production editing network.'],
    '/guides/3-2-1-backup-explained/': ['Field Media Offload Workflow', '/guides/field-media-offload-verification-workflow/', 'Apply independent-copy thinking to camera media before it reaches the studio archive.']
  };
  const item = related[path];
  const main = document.querySelector('main');
  if (item && main && !main.querySelector('[data-field-media-related]')) {
    main.insertAdjacentHTML('beforeend', `<section class="section tint" data-field-media-related><div class="container prose"><h2>Continue field media planning</h2><p>${item[2]} <a href="${item[1]}">${item[0]}</a>.</p></div></section>`);
  }
}

function integrateExternalStorageEntryPoints() {
  const path = location.pathname;
  if (path === '/') {
    const grid = document.querySelector('.scenario-grid');
    if (grid && !grid.querySelector('[data-external-storage-home-card]')) {
      grid.insertAdjacentHTML('beforeend', '<article class="scenario" data-external-storage-home-card><strong>External storage setup</strong><p>Match a drive and enclosure, check cable and port limits, reserve USB power, and preserve a direct benchmark. <a href="/tools/external-storage/">Plan the connection</a>.</p></article>');
    }
  }
  const related = {
    '/tools/field-media/media-offload-time-planner/': ['External Storage Bottleneck Planner', '/tools/external-storage/connection-bottleneck-planner/', 'Turn the measured reader and destination path into a component-by-component enclosure, cable, port, and hub ceiling.'],
    '/tools/cost-power/das-vs-nas-cost-calculator/': ['External Storage Connection Planning', '/tools/external-storage/', 'Before pricing DAS, confirm enclosure fit, host ports, shared power, and the expected direct-path rate.'],
    '/tools/network-performance/local-network-transfer-time-calculator/': ['External Storage Performance Troubleshooter', '/tools/external-storage/performance-troubleshooter/', 'Isolate a slow USB or Thunderbolt endpoint before attributing the complete transfer result to the network.']
  };
  const item = related[path];
  const main = document.querySelector('main');
  if (item && main && !main.querySelector('[data-external-storage-related]')) {
    main.insertAdjacentHTML('beforeend', `<section class="section tint" data-external-storage-related><div class="container prose"><h2>Continue external storage planning</h2><p>${item[2]} <a href="${item[1]}">${item[0]}</a>.</p></div></section>`);
  }
}

async function start() {
  await Promise.all([replaceWithPartial('[data-header]', headerTemplate), replaceWithPartial('[data-footer]', footerTemplate)]);
  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
  setCurrentPage();
  enableNavigation();
  normalizeBreadcrumbs();
  integrateSsdEntryPoints();
  integrateFieldMediaEntryPoints();
  integrateExternalStorageEntryPoints();
}

start();
