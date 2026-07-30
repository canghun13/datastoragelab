import { compoundGrowth, withHeadroom } from './storage-growth.mjs';
import { gbToTb, formatTb, formatTib, tbToTib } from './storage-units.mjs';

const number = (value, min, max, label, errors) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) { errors[label] = `Enter a value from ${min} to ${max}.`; return 0; }
  return parsed;
};

export function calculateTool(kind, input) {
  const errors = {};
  const current = number(input.current, .01, 100000, 'current', errors);
  const rate = number(input.rate, 0, 300, 'rate', errors);
  const years = number(input.years, 1, 20, 'years', errors);
  const headroom = number(input.headroom, 0, 200, 'headroom', errors);
  if (Object.keys(errors).length) return { errors };
  if (kind === 'growth') {
    const future = input.method === 'amount' ? current + number(input.amount, 0, 100000, 'amount', errors) * years : compoundGrowth(current, rate, years);
    const target = withHeadroom(future, headroom);
    return { errors, result: { title: `Reserve ${formatTb(target)} by year ${years}`, summary: `Your ${formatTb(current)} starting point becomes ${formatTb(future)} before the ${headroom}% capacity reserve.`, metrics: [['Future data', formatTb(future)], ['Purchase target', formatTb(target)], ['Binary display', formatTib(tbToTib(target))]], details: `Review capacity once a year. A target is usable capacity, not the raw label capacity of a protected array.`, rows: Array.from({ length: years }, (_, index) => [index + 1, formatTb(input.method === 'amount' ? current + Number(input.amount) * (index + 1) : compoundGrowth(current, rate, index + 1)), formatTb(withHeadroom(input.method === 'amount' ? current + Number(input.amount) * (index + 1) : compoundGrowth(current, rate, index + 1), headroom))]) } };
  }
  if (kind === 'creator') {
    const work = number(input.work, 1, 100000, 'work', errors);
    const copies = number(input.copies, 1, 5, 'copies', errors);
    const ingest = gbToTb(current * work);
    const archive = compoundGrowth(ingest, rate, years);
    const target = withHeadroom(archive * copies, headroom);
    return { errors, result: { title: `Plan ${formatTb(target)} across archive copies`, summary: `${input.mode === 'video' ? 'Video' : 'Photo'} production produces about ${formatTb(ingest)} per working period; the archive projection includes copies and headroom.`, metrics: [['Ingest per period', formatTb(ingest)], ['Archive at horizon', formatTb(archive)], ['Backup allocation', formatTb(target - withHeadroom(archive, headroom))]], details: 'Keep fast working media separate from long-term archive and from independently stored backup copies.', rows: [['Working tier', formatTb(withHeadroom(ingest, 25)), 'Fast SSD or fast shared storage'], ['Archive tier', formatTb(withHeadroom(archive, headroom)), 'Bulk capacity with protection'], ['Independent copies', formatTb(target), `${copies} total archive copies`]] } };
  }
  if (kind === 'backup') {
    const devices = number(input.work, 1, 500, 'work', errors);
    const retention = number(input.retention, 1, 60, 'retention', errors);
    const protectedData = current * devices;
    const versions = protectedData * (rate / 100) * retention * .55;
    const target = withHeadroom(protectedData + versions, headroom);
    return { errors, result: { title: `Allocate ${formatTb(target)} for a versioned backup target`, summary: `${devices} device(s) hold ${formatTb(protectedData)} of used data. The estimate reserves space for retained changed versions.`, metrics: [['Initial full backup', formatTb(protectedData)], ['Version reserve', formatTb(versions)], ['Target in TiB', formatTib(tbToTib(target))]], details: 'This is capacity for one independent backup target. Keep another copy offsite or otherwise physically separate for important data.', rows: [['Full backup', formatTb(protectedData), 'Initial capture'], ['Version history', formatTb(versions), `${retention}-month retention estimate`], ['Target size', formatTb(target), `Includes ${headroom}% reserve`]] } };
  }
  if (kind === 'office') {
    const users = number(input.work, 1, 100, 'work', errors);
    const concurrent = number(input.concurrent, 1, 100, 'concurrent', errors);
    const future = compoundGrowth(current, rate, years);
    const usable = withHeadroom(future, headroom);
    const bays = usable > 24 || users > 12 ? 4 : 2;
    const drives = Math.ceil(usable / (bays - 1));
    return { errors, result: { title: `Specify ${bays} bays with ${Math.ceil(drives / 2) * 2} TB minimum drives`, summary: `${users} users and ${concurrent} concurrent users need ${formatTb(usable)} usable capacity at the planning horizon.`, metrics: [['Projected shared data', formatTb(future)], ['Usable target', formatTb(usable)], ['Network tier', concurrent > 8 ? '2.5GbE minimum' : '1GbE baseline']], details: 'Use redundant storage for availability and schedule independently recoverable backups. Validate workload applications and recovery targets before purchase.', rows: [['Primary array', formatTb(usable), `${bays}-bay, one-drive protection planning layout`], ['Local backup', formatTb(withHeadroom(future, 30)), 'Separate target and account'], ['Offsite copy', formatTb(withHeadroom(future, 15)), 'Prioritize business-critical data']] } };
  }
  if (kind === 'media') {
    const additions = number(input.work, 0, 100000, 'work', errors);
    const copies = number(input.copies, 1, 5, 'copies', errors);
    const currentTb = gbToTb(current);
    const future = currentTb + gbToTb(additions * years);
    const target = withHeadroom(future, headroom);
    return { errors, result: { title: `Choose ${formatTb(target)} usable primary capacity`, summary: `The library begins at ${formatTb(currentTb)} and reaches about ${formatTb(future)} after planned additions.`, metrics: [['Current library', formatTb(currentTb)], ['Future library', formatTb(future)], ['Backup capacity', formatTb(target * (copies - 1))]], details: 'Use this only for media you may lawfully store and back up. A library target does not include streaming-service catalogs or unverified future formats.', rows: [['Primary library', formatTb(target), `Includes ${headroom}% reserve`], ['Backup copies', formatTb(target * (copies - 1)), `${copies - 1} additional independent copy/copies`], ['Expansion trigger', formatTb(target * .8), 'Plan before 80% used capacity']] } };
  }
  return { errors: { current: 'Unknown tool.' } };
}

function htmlRows(rows) { return rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join(''); }
function render(result) {
  document.querySelector('[data-result-title]').textContent = result.title;
  document.querySelector('[data-result-summary]').textContent = result.summary;
  document.querySelector('[data-result-metrics]').innerHTML = result.metrics.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join('');
  document.querySelector('[data-result-details]').textContent = result.details;
  document.querySelector('[data-result-rows]').innerHTML = htmlRows(result.rows);
  document.querySelector('[data-tool-results]').hidden = false;
}
const form = typeof document === 'undefined' ? null : document.querySelector('[data-phase2-form]');
if (form) {
  const kind = form.dataset.tool;
  form.addEventListener('submit', (event) => { event.preventDefault(); const { errors, result } = calculateTool(kind, Object.fromEntries(new FormData(form))); form.querySelectorAll('[data-error]').forEach((node) => node.textContent = ''); form.querySelectorAll('[aria-invalid]').forEach((node) => node.removeAttribute('aria-invalid')); if (Object.keys(errors).length) { Object.entries(errors).forEach(([field, message]) => { form.elements[field]?.setAttribute('aria-invalid', 'true'); form.querySelector(`[data-error="${field}"]`)?.append(message); }); form.elements[Object.keys(errors)[0]]?.focus(); return; } render(result); document.querySelector('[data-tool-results]').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  document.querySelector('[data-reset-tool]')?.addEventListener('click', () => { form.reset(); document.querySelector('[data-tool-results]').hidden = true; form.elements.current.focus(); });
  document.querySelector('[data-copy-results]')?.addEventListener('click', async () => { const text = `${document.title}\n\n${document.querySelector('[data-result-title]').textContent}\n${document.querySelector('[data-result-summary]').textContent}\n${[...document.querySelectorAll('[data-result-metrics] .metric')].map((item) => item.innerText).join('\n')}\n\n${document.querySelector('[data-result-details]').textContent}\nSource: ${location.href}`; const status = document.querySelector('[data-copy-status]'); try { await navigator.clipboard.writeText(text); status.textContent = 'Results copied as plain text.'; } catch { status.textContent = 'Copy was unavailable; select the visible result text instead.'; } });
  document.querySelector('[data-print-results]')?.addEventListener('click', () => print());
}
