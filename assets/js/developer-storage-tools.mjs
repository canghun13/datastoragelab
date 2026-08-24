const number = (value) => Number(value);
const finite = (value) => Number.isFinite(number(value));

function errorFor(value, label, { minimum = 0, maximum = Infinity, integer = false, allowZero = false } = {}) {
  const parsed = number(value);
  if (!finite(value) || parsed < minimum || (!allowZero && parsed === 0) || parsed > maximum) {
    const range = maximum < Infinity ? ` between ${minimum} and ${maximum}` : ` at least ${minimum}`;
    return `${label} must be${range}.`;
  }
  if (integer && !Number.isInteger(parsed)) return `${label} must be a whole number.`;
  return '';
}

const addError = (errors, input, key, label, options) => {
  const message = errorFor(input[key], label, options);
  if (message) errors[key] = message;
};

export function calculateLfs(input) {
  const errors = {};
  addError(errors, input, 'currentGB', 'Current LFS storage', { minimum: 0, maximum: 10000000, allowZero: true });
  addError(errors, input, 'changedGB', 'New or changed LFS data per release', { minimum: 0, maximum: 1000000, allowZero: true });
  addError(errors, input, 'releasesMonth', 'Releases per month', { minimum: 0, maximum: 100000, allowZero: true });
  addError(errors, input, 'retentionMonths', 'Version retention', { minimum: 1, maximum: 1200 });
  addError(errors, input, 'horizonMonths', 'Planning horizon', { minimum: 1, maximum: 1200, integer: true });
  addError(errors, input, 'checkoutGB', 'LFS payload per full download', { minimum: 0, maximum: 10000000, allowZero: true });
  addError(errors, input, 'downloadsMonth', 'Full LFS downloads per month', { minimum: 0, maximum: 10000000, allowZero: true });
  addError(errors, input, 'storageQuotaGB', 'Storage quota', { minimum: .01, maximum: 100000000 });
  addError(errors, input, 'bandwidthQuotaGB', 'Monthly bandwidth quota', { minimum: .01, maximum: 100000000 });
  if (Object.keys(errors).length) return { errors };

  const monthlyGrowthGB = number(input.changedGB) * number(input.releasesMonth);
  const retainedGrowthMonths = Math.min(number(input.retentionMonths), number(input.horizonMonths));
  const projectedStorageGB = number(input.currentGB) + monthlyGrowthGB * retainedGrowthMonths;
  const monthlyBandwidthGB = number(input.checkoutGB) * number(input.downloadsMonth);
  const storageHeadroomGB = number(input.storageQuotaGB) - projectedStorageGB;
  const bandwidthHeadroomGB = number(input.bandwidthQuotaGB) - monthlyBandwidthGB;
  const monthsToStorageQuota = monthlyGrowthGB > 0
    ? Math.max(0, (number(input.storageQuotaGB) - number(input.currentGB)) / monthlyGrowthGB)
    : Infinity;
  const maxDownloads = number(input.checkoutGB) > 0 ? Math.floor(number(input.bandwidthQuotaGB) / number(input.checkoutGB)) : Infinity;
  return { result: {
    monthlyGrowthGB, projectedStorageGB, monthlyBandwidthGB, storageHeadroomGB, bandwidthHeadroomGB,
    monthsToStorageQuota, maxDownloads, storageReady: storageHeadroomGB >= 0, bandwidthReady: bandwidthHeadroomGB >= 0,
    horizonMonths: number(input.horizonMonths), retainedGrowthMonths
  } };
}

export function calculateArtifacts(input) {
  const errors = {};
  addError(errors, input, 'artifactGB', 'Stored artifact size per run', { minimum: .000001, maximum: 1000000 });
  addError(errors, input, 'runsDay', 'Artifact-producing runs per day', { minimum: .01, maximum: 10000000 });
  addError(errors, input, 'retentionDays', 'Retention period', { minimum: 1, maximum: 3650, integer: true });
  addError(errors, input, 'currentOtherGB', 'Other quota usage', { minimum: 0, maximum: 10000000, allowZero: true });
  addError(errors, input, 'quotaGB', 'Artifact quota', { minimum: .01, maximum: 100000000 });
  addError(errors, input, 'reservePercent', 'Quota reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (Object.keys(errors).length) return { errors };

  const dailyIngestGB = number(input.artifactGB) * number(input.runsDay);
  const rollingArtifactGB = dailyIngestGB * number(input.retentionDays);
  const usableQuotaGB = number(input.quotaGB) * (1 - number(input.reservePercent) / 100) - number(input.currentOtherGB);
  const headroomGB = usableQuotaGB - rollingArtifactGB;
  const maxRetentionDays = dailyIngestGB > 0 ? Math.max(0, Math.floor(usableQuotaGB / dailyIngestGB)) : Infinity;
  const expirationsDayGB = dailyIngestGB;
  return { result: {
    dailyIngestGB, rollingArtifactGB, usableQuotaGB, headroomGB, maxRetentionDays, expirationsDayGB,
    ready: headroomGB >= 0, retentionDays: number(input.retentionDays)
  } };
}

export function calculateCache(input) {
  const errors = {};
  addError(errors, input, 'entryGB', 'Average cache entry size', { minimum: .000001, maximum: 1000000 });
  addError(errors, input, 'jobsDay', 'Cache-eligible jobs per day', { minimum: .01, maximum: 10000000 });
  addError(errors, input, 'newKeyPercent', 'New cache-key rate', { minimum: 0, maximum: 100, allowZero: true });
  addError(errors, input, 'desiredDays', 'Desired cache lifetime', { minimum: 1, maximum: 3650, integer: true });
  addError(errors, input, 'currentOtherGB', 'Other cache usage', { minimum: 0, maximum: 10000000, allowZero: true });
  addError(errors, input, 'quotaGB', 'Cache quota', { minimum: .01, maximum: 100000000 });
  addError(errors, input, 'reservePercent', 'Quota reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (Object.keys(errors).length) return { errors };

  const newEntriesDay = number(input.jobsDay) * number(input.newKeyPercent) / 100;
  const churnGBDay = newEntriesDay * number(input.entryGB);
  const desiredCacheGB = churnGBDay * number(input.desiredDays);
  const usableQuotaGB = number(input.quotaGB) * (1 - number(input.reservePercent) / 100) - number(input.currentOtherGB);
  const effectiveDays = churnGBDay > 0 ? Math.max(0, usableQuotaGB / churnGBDay) : Infinity;
  const supportedEntries = number(input.entryGB) > 0 ? Math.max(0, Math.floor(usableQuotaGB / number(input.entryGB))) : Infinity;
  const headroomGB = usableQuotaGB - desiredCacheGB;
  return { result: {
    newEntriesDay, churnGBDay, desiredCacheGB, usableQuotaGB, effectiveDays, supportedEntries, headroomGB,
    ready: headroomGB >= 0, desiredDays: number(input.desiredDays)
  } };
}

export function calculateRegistry(input) {
  const errors = {};
  addError(errors, input, 'imageGB', 'Compressed image size', { minimum: .000001, maximum: 1000000 });
  addError(errors, input, 'sharedPercent', 'Shared layer percentage', { minimum: 0, maximum: 99.9, allowZero: true });
  addError(errors, input, 'imagesDay', 'New images per repository per day', { minimum: .01, maximum: 1000000 });
  addError(errors, input, 'repositories', 'Repositories', { minimum: 1, maximum: 100000, integer: true });
  addError(errors, input, 'retentionDays', 'Tagged image retention', { minimum: 1, maximum: 3650, integer: true });
  addError(errors, input, 'gcDelayDays', 'Unreferenced layer GC delay', { minimum: 0, maximum: 3650, allowZero: true });
  addError(errors, input, 'quotaGB', 'Registry quota', { minimum: .01, maximum: 100000000 });
  addError(errors, input, 'reservePercent', 'Quota reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (!['namespace', 'repository'].includes(input.dedupeScope)) errors.dedupeScope = 'Choose a supported deduplication scope.';
  if (Object.keys(errors).length) return { errors };

  const repositories = number(input.repositories);
  const sharedLayerGB = number(input.imageGB) * number(input.sharedPercent) / 100;
  const uniqueLayerGB = number(input.imageGB) - sharedLayerGB;
  const sharedCopies = input.dedupeScope === 'namespace' ? 1 : repositories;
  const baseLayerGB = sharedLayerGB * sharedCopies;
  const retainedImages = number(input.imagesDay) * repositories * number(input.retentionDays);
  const retainedUniqueGB = uniqueLayerGB * retainedImages;
  const pendingGcImages = number(input.imagesDay) * repositories * number(input.gcDelayDays);
  const pendingGcGB = uniqueLayerGB * pendingGcImages;
  const projectedStorageGB = baseLayerGB + retainedUniqueGB + pendingGcGB;
  const usableQuotaGB = number(input.quotaGB) * (1 - number(input.reservePercent) / 100);
  const headroomGB = usableQuotaGB - projectedStorageGB;
  return { result: {
    sharedLayerGB, uniqueLayerGB, baseLayerGB, retainedImages, retainedUniqueGB, pendingGcGB,
    projectedStorageGB, usableQuotaGB, headroomGB, ready: headroomGB >= 0
  } };
}

export function calculateRunner(input) {
  const errors = {};
  for (const [key, label] of [['checkoutGB', 'Repository checkout'], ['lfsGB', 'LFS payload'], ['dependenciesGB', 'Dependencies'], ['cacheGB', 'Restored cache'], ['buildGB', 'Build output'], ['tempGB', 'Temporary job space']]) {
    addError(errors, input, key, label, { minimum: 0, maximum: 1000000, allowZero: true });
  }
  addError(errors, input, 'concurrency', 'Concurrent jobs', { minimum: 1, maximum: 100000, integer: true });
  addError(errors, input, 'totalDiskGB', 'Runner disk capacity', { minimum: .01, maximum: 100000000 });
  addError(errors, input, 'occupiedGB', 'OS and persistent usage', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'reservePercent', 'Free-space reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (number(input.occupiedGB) >= number(input.totalDiskGB)) errors.occupiedGB = 'OS and persistent usage must be smaller than runner disk capacity.';
  if (Object.keys(errors).length) return { errors };

  const perJobGB = ['checkoutGB', 'lfsGB', 'dependenciesGB', 'cacheGB', 'buildGB', 'tempGB']
    .reduce((sum, key) => sum + number(input[key]), 0);
  const usableWorkspaceGB = number(input.totalDiskGB) * (1 - number(input.reservePercent) / 100) - number(input.occupiedGB);
  const peakWorkspaceGB = perJobGB * number(input.concurrency);
  const headroomGB = usableWorkspaceGB - peakWorkspaceGB;
  const maxConcurrency = perJobGB > 0 ? Math.max(0, Math.floor(usableWorkspaceGB / perJobGB)) : Infinity;
  const minimumDiskGB = (number(input.occupiedGB) + peakWorkspaceGB) / (1 - number(input.reservePercent) / 100);
  return { result: {
    perJobGB, usableWorkspaceGB, peakWorkspaceGB, headroomGB, maxConcurrency, minimumDiskGB,
    ready: headroomGB >= 0, concurrency: number(input.concurrency)
  } };
}

const formatGB = (value) => {
  if (!Number.isFinite(value)) return 'No finite limit';
  return value >= 1000
    ? `${(value / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} TB`
    : `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} GB`;
};
const formatDays = (value) => Number.isFinite(value) ? `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} days` : 'No churn limit';
const formatMonths = (value) => Number.isFinite(value) ? `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} months` : 'No growth limit';

function viewModel(type, result) {
  if (type === 'lfs') return {
    title: result.storageReady && result.bandwidthReady ? 'The LFS plan fits both entered quotas' : 'Storage or download demand exceeds the entered quota',
    summary: `${formatGB(result.projectedStorageGB)} is projected across the ${result.horizonMonths}-month horizon and ${formatGB(result.monthlyBandwidthGB)} is downloaded in a typical month.`,
    metrics: [['Projected storage', formatGB(result.projectedStorageGB)], ['Monthly downloads', formatGB(result.monthlyBandwidthGB)], ['Storage headroom', formatGB(result.storageHeadroomGB)], ['Bandwidth headroom', formatGB(result.bandwidthHeadroomGB)]],
    rows: [['New stored versions per month', formatGB(result.monthlyGrowthGB)], ['Growth months represented', result.retainedGrowthMonths], ['Quota crossing at current growth', formatMonths(result.monthsToStorageQuota)], ['Full downloads within quota', Number.isFinite(result.maxDownloads) ? result.maxDownloads : 'No payload entered']],
    note: 'Enter the quotas and billable behavior documented for your host. Some CI downloads and repeated downloads can consume LFS bandwidth differently by platform.'
  };
  if (type === 'artifacts') return {
    title: result.ready ? 'The requested artifact retention fits the reserved quota' : `Reduce retention to about ${result.maxRetentionDays} days or add capacity`,
    summary: `${formatGB(result.dailyIngestGB)} enters the artifact store each day, producing ${formatGB(result.rollingArtifactGB)} at steady retention.`,
    metrics: [['Daily artifact ingest', formatGB(result.dailyIngestGB)], ['Rolling artifacts', formatGB(result.rollingArtifactGB)], ['Usable artifact quota', formatGB(result.usableQuotaGB)], ['Quota headroom', formatGB(result.headroomGB)]],
    rows: [['Requested retention', `${result.retentionDays} days`], ['Maximum modeled retention', Number.isFinite(result.maxRetentionDays) ? `${result.maxRetentionDays} days` : 'No ingest limit'], ['Daily expirations at steady state', formatGB(result.expirationsDayGB)]],
    note: 'The model assumes a stable daily producing-run rate and immediate expiry after the selected retention period. Failed jobs and protected releases need separate policy evidence.'
  };
  if (type === 'cache') return {
    title: result.ready ? 'The quota preserves the desired cache window' : `The modeled cache window falls to ${formatDays(result.effectiveDays)}`,
    summary: `${result.newEntriesDay.toFixed(1)} new cache keys add ${formatGB(result.churnGBDay)} per day before eviction or expiry.`,
    metrics: [['Daily key churn', `${result.newEntriesDay.toFixed(1)} entries`], ['Daily storage churn', formatGB(result.churnGBDay)], ['Desired cache footprint', formatGB(result.desiredCacheGB)], ['Quota headroom', formatGB(result.headroomGB)]],
    rows: [['Usable cache quota', formatGB(result.usableQuotaGB)], ['Effective cache window', formatDays(result.effectiveDays)], ['Entries supported', result.supportedEntries]],
    note: 'This is a capacity and key-churn model. It does not predict build-time savings or guarantee that a retained key will match a future job.'
  };
  if (type === 'registry') return {
    title: result.ready ? 'The registry retention plan fits the reserved quota' : 'Retention plus pending garbage collection exceeds the quota',
    summary: `${result.retainedImages.toLocaleString(undefined, { maximumFractionDigits: 1 })} retained images use shared layers once per entered deduplication scope and unique layers per image.`,
    metrics: [['Projected registry', formatGB(result.projectedStorageGB)], ['Retained unique layers', formatGB(result.retainedUniqueGB)], ['Pending garbage collection', formatGB(result.pendingGcGB)], ['Quota headroom', formatGB(result.headroomGB)]],
    rows: [['Shared base layers', formatGB(result.baseLayerGB)], ['Unique layer size per image', formatGB(result.uniqueLayerGB)], ['Usable quota after reserve', formatGB(result.usableQuotaGB)]],
    note: 'Deleting a tag is not always the same as reclaiming a blob. Confirm actual deduplication and garbage-collection behavior for the registry in use.'
  };
  return {
    title: result.ready ? 'The runner disk covers the concurrent job peak' : `Limit concurrency to ${result.maxConcurrency} or increase workspace capacity`,
    summary: `${formatGB(result.perJobGB)} per job becomes ${formatGB(result.peakWorkspaceGB)} at ${result.concurrency} simultaneous jobs.`,
    metrics: [['Per-job peak', formatGB(result.perJobGB)], ['Concurrent peak', formatGB(result.peakWorkspaceGB)], ['Usable workspace', formatGB(result.usableWorkspaceGB)], ['Workspace headroom', formatGB(result.headroomGB)]],
    rows: [['Maximum modeled concurrency', result.maxConcurrency], ['Minimum disk at selected reserve', formatGB(result.minimumDiskGB)]],
    note: 'Measure a representative job from checkout through cleanup. Container images, daemon caches, logs, and abandoned workspaces must be included in persistent usage when they are not per-job inputs.'
  };
}

function render(target, type, result) {
  const model = viewModel(type, result);
  target.hidden = false;
  target.querySelector('[data-result-title]').textContent = model.title;
  target.querySelector('[data-result-summary]').textContent = model.summary;
  target.querySelector('[data-result-metrics]').innerHTML = model.metrics.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join('');
  target.querySelector('[data-result-rows]').innerHTML = model.rows.map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`).join('');
  target.querySelector('[data-result-note]').textContent = model.note;
}

const calculators = { lfs: calculateLfs, artifacts: calculateArtifacts, cache: calculateCache, registry: calculateRegistry, runner: calculateRunner };

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-developer-storage-form]').forEach((form) => {
    const type = form.dataset.developerStorageForm;
    const target = form.closest('.tool-layout')?.querySelector('[data-developer-storage-results]');
    if (!target || !calculators[type]) return;
    const calculate = ({ focus = false } = {}) => {
      const output = calculators[type](Object.fromEntries(new FormData(form)));
      form.querySelectorAll('[data-error]').forEach((node) => { node.textContent = ''; });
      form.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute('aria-invalid'));
      if (output.errors) {
        Object.entries(output.errors).forEach(([key, message]) => {
          form.querySelector(`[data-error="${key}"]`)?.replaceChildren(message);
          const control = form.elements.namedItem(key);
          if (control instanceof HTMLElement) control.setAttribute('aria-invalid', 'true');
        });
        target.hidden = true;
        return;
      }
      render(target, type, output.result);
      if (focus) target.focus();
    };
    form.addEventListener('submit', (event) => { event.preventDefault(); calculate({ focus: true }); });
    form.addEventListener('input', () => { if (!target.hidden) calculate(); });
    form.addEventListener('change', () => { if (!target.hidden) calculate(); });
    form.querySelector('[data-reset-tool]')?.addEventListener('click', () => {
      form.reset(); target.hidden = true;
      form.querySelectorAll('[data-error]').forEach((node) => { node.textContent = ''; });
      form.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute('aria-invalid'));
    });
    target.querySelector('[data-copy-results]')?.addEventListener('click', async () => {
      const status = target.querySelector('[data-copy-status]');
      try { await navigator.clipboard.writeText(`${document.title}\n${target.innerText}\n${location.href}`); status.textContent = 'Results copied.'; }
      catch { status.textContent = 'Copy was unavailable; select the result text instead.'; }
    });
    target.querySelector('[data-print-results]')?.addEventListener('click', () => print());
  });
}
