import { formatTb } from './storage-units.mjs';

const number = (value, min, max, name, errors) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    errors[name] = `Enter a value from ${min} to ${max}.`;
    return 0;
  }
  return parsed;
};

export function calculateBackup(kind, input) {
  const errors = {};
  const data = number(input.data, 0.01, 100000, 'data', errors);
  const rate = number(input.rate, 0, 100, 'rate', errors);
  const period = number(input.period, 1, 120, 'period', errors);
  const copies = number(input.copies, 1, 10, 'copies', errors);
  const speed = kind === 'recovery' ? number(input.speed, 1, 100000, 'speed', errors) : 0;
  if (Object.keys(errors).length) return { errors };

  const changed = data * (rate / 100) * period * 0.55;
  let title, summary, metrics, rows, note;
  if (kind === 'recovery') {
    const hours = (data * 8 * 1000 * 1000) / (speed * 3600) + period / 60;
    title = `Plan roughly ${hours.toFixed(1)} hours end to end`;
    summary = 'Includes transfer plus the setup and verification minutes you entered.';
    metrics = [['Restore size', formatTb(data)], ['Transfer speed', `${speed} Mbps`], ['Verification delay', `${period} minutes`]];
    rows = [['Transfer', `${(hours - period / 60).toFixed(1)} hours`, 'Assumes effective throughput'], ['Preparation and checks', `${period} minutes`, 'Do not omit this stage'], ['Bottleneck', 'Slowest stage', 'Improve the limiting source, link, or destination']];
    note = 'Actual restore time depends on source, destination, contention, and recovery procedure.';
  } else if (kind === 'frequency') {
    const schedule = period <= 1 ? 'Continuous or hourly protection' : period <= 24 ? 'Daily automated backup' : 'Weekly schedule plus event triggers';
    title = schedule;
    summary = 'The interval is chosen from your stated maximum acceptable data loss.';
    metrics = [['Recovery point objective', `${period} hours`], ['Changed data rate', `${rate}%`], ['Data scope', formatTb(data)]];
    rows = [['Regular schedule', schedule, 'Automate when devices and destination are available'], ['Event triggers', 'Before major changes', 'Run a separate backup before migration or replacement'], ['Missed run', 'Alert and retry', 'Do not silently treat a missed run as protected']];
    note = 'Formal business requirements may require a documented risk assessment.';
  } else if (kind === 'verify') {
    title = 'Use a layered backup verification schedule';
    summary = 'Verification confirms that a copy can actually restore, not merely that a job reported success.';
    metrics = [['Critical data', formatTb(data)], ['Test window', `${period} days`], ['Destinations', copies]];
    rows = [['Daily', 'Job and capacity review', 'Confirm recent backup completion'], ['Monthly', 'Sample restore', 'Open representative files from each destination'], ['Quarterly', 'Recovery drill', 'Record owner, timing, result, and corrective action']];
    note = 'No calendar integration is created; copy this schedule into your own runbook.';
  } else {
    const reserve = data + changed;
    const target = kind === 'offsite' ? reserve * copies : reserve;
    title = kind === 'topology' ? 'Close the independent-copy gap' : `Allocate ${formatTb(target)} for the plan`;
    summary = 'The estimate combines protected data with a transparent changed-data reserve; it does not promise compression savings.';
    metrics = [['Protected data', formatTb(data)], ['Changed-data reserve', formatTb(changed)], ['Target capacity', formatTb(target)]];
    rows = [['Primary data', formatTb(data), 'Keep the production copy available'], ['Independent local copy', formatTb(reserve), 'Separate target or account'], ['Offsite component', formatTb(target), 'Separate location or service'], ['Policy', '3-2-1 starting point', 'Adapt for recovery needs and real constraints']];
    note = 'Snapshots and RAID improve local recovery but do not replace an independent copy.';
  }
  return { errors, result: { title, summary, metrics, rows, note } };
}

function render(result) {
  document.querySelector('[data-result-title]').textContent = result.title;
  document.querySelector('[data-result-summary]').textContent = result.summary;
  document.querySelector('[data-result-metrics]').innerHTML = result.metrics.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join('');
  document.querySelector('[data-result-rows]').innerHTML = result.rows.map(([label, value, action]) => `<tr><td>${label}</td><td>${value}</td><td>${action}</td></tr>`).join('');
  document.querySelector('[data-result-note]').textContent = result.note;
  document.querySelector('[data-tool-results]').hidden = false;
}

const form = typeof document === 'undefined' ? null : document.querySelector('[data-backup-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const output = calculateBackup(form.dataset.tool, Object.fromEntries(new FormData(form)));
    form.querySelectorAll('[data-error]').forEach((node) => { node.textContent = ''; });
    if (Object.keys(output.errors).length) {
      Object.entries(output.errors).forEach(([name, message]) => { const target = form.querySelector(`[data-error="${name}"]`); if (target) target.textContent = message; });
      return;
    }
    render(output.result);
  });
  document.querySelector('[data-reset-tool]')?.addEventListener('click', () => { form.reset(); document.querySelector('[data-tool-results]').hidden = true; });
  document.querySelector('[data-copy-results]')?.addEventListener('click', () => navigator.clipboard.writeText(`${document.title}\n${document.querySelector('[data-result-title]').textContent}\n${document.querySelector('[data-result-summary]').textContent}\n${document.querySelector('[data-result-note]').textContent}\n${location.href}`));
  document.querySelector('[data-print-results]')?.addEventListener('click', () => print());
}
