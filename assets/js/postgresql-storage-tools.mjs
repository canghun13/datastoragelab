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

export function calculateVacuum(input) {
  const errors = {};
  addError(errors, input, 'currentHeapGB', 'Current table and TOAST size', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'currentIndexGB', 'Current index size', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'rewrittenHeapGB', 'Expected rewritten table size', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'rebuiltIndexGB', 'Expected rebuilt index size', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'concurrentGrowthGB', 'Concurrent growth allowance', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'freeDiskGB', 'Currently free disk space', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'reservePercent', 'Free-space reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (Object.keys(errors).length) return { errors };

  const currentFootprintGB = number(input.currentHeapGB) + number(input.currentIndexGB);
  const rewrittenFootprintGB = number(input.rewrittenHeapGB) + number(input.rebuiltIndexGB);
  const operationNeedGB = rewrittenFootprintGB + number(input.concurrentGrowthGB);
  const usableFreeGB = number(input.freeDiskGB) * (1 - number(input.reservePercent) / 100);
  const headroomGB = usableFreeGB - operationNeedGB;
  const potentialReclaimGB = Math.max(0, currentFootprintGB - rewrittenFootprintGB);
  const minimumFreeDiskGB = operationNeedGB / (1 - number(input.reservePercent) / 100);
  return { result: {
    currentFootprintGB, rewrittenFootprintGB, operationNeedGB, usableFreeGB, headroomGB,
    potentialReclaimGB, minimumFreeDiskGB, ready: headroomGB >= 0
  } };
}

export function calculateIndex(input) {
  const errors = {};
  addError(errors, input, 'newIndexGB', 'Expected new index output', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'indexesAtOnce', 'Indexes built at once', { minimum: 1, maximum: 100000, integer: true });
  addError(errors, input, 'tempWorkGB', 'Temporary sort and build workspace', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'writeGrowthGB', 'Concurrent write growth allowance', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'freeDiskGB', 'Currently free disk space', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'reservePercent', 'Free-space reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (!['create', 'reindex', 'concurrent'].includes(input.operation)) errors.operation = 'Choose a supported index operation.';
  if (Object.keys(errors).length) return { errors };

  const outputGB = number(input.newIndexGB) * number(input.indexesAtOnce);
  const operationNeedGB = outputGB + number(input.tempWorkGB) + number(input.writeGrowthGB);
  const usableFreeGB = number(input.freeDiskGB) * (1 - number(input.reservePercent) / 100);
  const headroomGB = usableFreeGB - operationNeedGB;
  const minimumFreeDiskGB = operationNeedGB / (1 - number(input.reservePercent) / 100);
  return { result: {
    operation: input.operation, outputGB, operationNeedGB, usableFreeGB, headroomGB,
    minimumFreeDiskGB, ready: headroomGB >= 0
  } };
}

export function calculateWal(input) {
  const errors = {};
  addError(errors, input, 'walRateGBHour', 'Measured WAL generation rate', { minimum: .000001, maximum: 10000000 });
  addError(errors, input, 'existingRetainedGB', 'WAL already retained', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'lagHours', 'Planned consumer lag or outage', { minimum: 0, maximum: 87600, allowZero: true });
  addError(errors, input, 'walDiskGB', 'Disk available to retained WAL', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'slotCapGB', 'Configured slot retention cap', { minimum: 0, maximum: 100000000, allowZero: true });
  addError(errors, input, 'reservePercent', 'WAL disk reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (number(input.existingRetainedGB) >= number(input.walDiskGB)) errors.existingRetainedGB = 'WAL already retained must be smaller than the WAL disk allocation.';
  if (Object.keys(errors).length) return { errors };

  const generatedGB = number(input.walRateGBHour) * number(input.lagHours);
  const projectedRetainedGB = number(input.existingRetainedGB) + generatedGB;
  const usableWalDiskGB = number(input.walDiskGB) * (1 - number(input.reservePercent) / 100);
  const diskHeadroomGB = usableWalDiskGB - projectedRetainedGB;
  const hoursToReserve = Math.max(0, (usableWalDiskGB - number(input.existingRetainedGB)) / number(input.walRateGBHour));
  const slotCapEnabled = number(input.slotCapGB) > 0;
  const slotHeadroomGB = slotCapEnabled ? number(input.slotCapGB) - projectedRetainedGB : Infinity;
  const hoursToSlotCap = slotCapEnabled
    ? Math.max(0, (number(input.slotCapGB) - number(input.existingRetainedGB)) / number(input.walRateGBHour))
    : Infinity;
  const safeLagHours = Math.min(hoursToReserve, hoursToSlotCap);
  const capReady = !slotCapEnabled || slotHeadroomGB >= 0;
  return { result: {
    generatedGB, projectedRetainedGB, usableWalDiskGB, diskHeadroomGB, hoursToReserve,
    slotCapEnabled, slotHeadroomGB, hoursToSlotCap, safeLagHours,
    ready: diskHeadroomGB >= 0 && capReady
  } };
}

export function calculateBaseBackup(input) {
  const errors = {};
  addError(errors, input, 'basePayloadGB', 'Base backup payload', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'throughputMBs', 'Effective backup throughput', { minimum: .001, maximum: 1000000 });
  addError(errors, input, 'walRateGBHour', 'WAL generated during backup', { minimum: 0, maximum: 10000000, allowZero: true });
  addError(errors, input, 'copies', 'Target backup copies', { minimum: 1, maximum: 100, integer: true });
  addError(errors, input, 'targetFreeGB', 'Free target storage', { minimum: .001, maximum: 100000000 });
  addError(errors, input, 'reservePercent', 'Target free-space reserve', { minimum: 0, maximum: 80, allowZero: true });
  if (Object.keys(errors).length) return { errors };

  const streamRateGBHour = number(input.throughputMBs) * 3.6;
  const netProgressGBHour = streamRateGBHour - number(input.walRateGBHour);
  const converges = netProgressGBHour > 0;
  const durationHours = converges ? number(input.basePayloadGB) / netProgressGBHour : Infinity;
  const walDuringBackupGB = converges ? number(input.walRateGBHour) * durationHours : Infinity;
  const perCopyGB = converges ? number(input.basePayloadGB) + walDuringBackupGB : Infinity;
  const totalTargetGB = perCopyGB * number(input.copies);
  const usableTargetGB = number(input.targetFreeGB) * (1 - number(input.reservePercent) / 100);
  const headroomGB = usableTargetGB - totalTargetGB;
  const minimumTargetFreeGB = totalTargetGB / (1 - number(input.reservePercent) / 100);
  return { result: {
    streamRateGBHour, netProgressGBHour, durationHours, walDuringBackupGB, perCopyGB,
    totalTargetGB, usableTargetGB, headroomGB, minimumTargetFreeGB,
    converges, ready: converges && headroomGB >= 0, copies: number(input.copies)
  } };
}

const formatGB = (value) => {
  if (!Number.isFinite(value)) return 'No finite result';
  return Math.abs(value) >= 1000
    ? `${(value / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} TB`
    : `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} GB`;
};
const formatHours = (value) => {
  if (!Number.isFinite(value)) return 'No finite limit';
  if (value >= 48) return `${(value / 24).toLocaleString(undefined, { maximumFractionDigits: 1 })} days`;
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} hours`;
};

function viewModel(type, result) {
  if (type === 'vacuum') return {
    title: result.ready ? 'The modeled VACUUM FULL rewrite fits the free-space boundary' : 'The rewrite does not fit while preserving the selected reserve',
    summary: `${formatGB(result.operationNeedGB)} of additional operation space is compared with ${formatGB(result.usableFreeGB)} of usable free disk.`,
    metrics: [['Operation working space', formatGB(result.operationNeedGB)], ['Usable free disk', formatGB(result.usableFreeGB)], ['Headroom', formatGB(result.headroomGB)], ['Potential reclaimed footprint', formatGB(result.potentialReclaimGB)]],
    rows: [['Current relation footprint', formatGB(result.currentFootprintGB)], ['Modeled rewritten footprint', formatGB(result.rewrittenFootprintGB)], ['Minimum current free disk', formatGB(result.minimumFreeDiskGB)]],
    note: 'This conservative preflight treats the entered rewritten table and index outputs as temporary additional files. Confirm tablespaces and measured relation sizes before scheduling the lock.'
  };
  if (type === 'index') {
    const labels = { create: 'CREATE INDEX', reindex: 'REINDEX', concurrent: 'concurrent index build' };
    return {
      title: result.ready ? `The ${labels[result.operation]} working set fits` : `Add free space or reduce simultaneous ${labels[result.operation]} work`,
      summary: `${formatGB(result.outputGB)} of new index output plus entered temporary work and write growth requires ${formatGB(result.operationNeedGB)}.`,
      metrics: [['New index output', formatGB(result.outputGB)], ['Peak additional need', formatGB(result.operationNeedGB)], ['Usable free disk', formatGB(result.usableFreeGB)], ['Headroom', formatGB(result.headroomGB)]],
      rows: [['Minimum current free disk', formatGB(result.minimumFreeDiskGB)], ['Operation mode', labels[result.operation]]],
      note: 'Existing indexes are already present on the filesystem and are not subtracted from free disk. Measure expected new index output and temporary work from a representative build when possible.'
    };
  }
  if (type === 'wal') return {
    title: result.ready ? 'The planned lag fits both WAL disk and slot-cap boundaries' : 'The planned lag reaches a WAL retention boundary',
    summary: `${formatGB(result.generatedGB)} is generated during the entered lag, producing ${formatGB(result.projectedRetainedGB)} of retained WAL.`,
    metrics: [['Projected retained WAL', formatGB(result.projectedRetainedGB)], ['Usable WAL disk', formatGB(result.usableWalDiskGB)], ['Disk headroom', formatGB(result.diskHeadroomGB)], ['Safe lag window', formatHours(result.safeLagHours)]],
    rows: [['Time to reserved disk boundary', formatHours(result.hoursToReserve)], ['Time to configured slot cap', result.slotCapEnabled ? formatHours(result.hoursToSlotCap) : 'No cap entered'], ['Slot-cap headroom', result.slotCapEnabled ? formatGB(result.slotHeadroomGB) : 'No cap entered']],
    note: 'The model uses a measured WAL byte rate. It does not predict burst behavior, archive failures, checkpoint effects, or whether exceeding a slot cap invalidates a consumer.'
  };
  return {
    title: !result.converges ? 'WAL generation equals or exceeds the modeled backup stream rate' : result.ready ? 'The base backup fits the target capacity and stream model' : 'The backup stream fits, but target capacity is insufficient',
    summary: result.converges ? `${formatGB(result.perCopyGB)} per copy includes ${formatGB(result.walDuringBackupGB)} generated while the base payload is streamed.` : 'Increase effective throughput or reduce source WAL generation before relying on this continuous-stream estimate.',
    metrics: [['Estimated duration', formatHours(result.durationHours)], ['WAL during backup', formatGB(result.walDuringBackupGB)], ['Total target footprint', formatGB(result.totalTargetGB)], ['Target headroom', formatGB(result.headroomGB)]],
    rows: [['Effective stream rate', `${result.streamRateGBHour.toLocaleString(undefined, { maximumFractionDigits: 2 })} GB/hour`], ['Net base progress', result.converges ? `${result.netProgressGBHour.toLocaleString(undefined, { maximumFractionDigits: 2 })} GB/hour` : 'No positive progress'], ['Backup copies', result.copies], ['Minimum current target free space', formatGB(result.minimumTargetFreeGB)]],
    note: 'Base payload and WAL rate must already reflect the chosen format and compression behavior. The equation assumes WAL shares the entered stream throughput and is retained with the backup.'
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

const calculators = { vacuum: calculateVacuum, index: calculateIndex, wal: calculateWal, basebackup: calculateBaseBackup };

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-postgresql-storage-form]').forEach((form) => {
    const type = form.dataset.postgresqlStorageForm;
    const target = form.closest('.tool-layout')?.querySelector('[data-postgresql-storage-results]');
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
