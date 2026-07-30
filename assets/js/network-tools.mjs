import { formatTb } from './storage-units.mjs';

const numeric = (input, name, min, max, errors) => {
  const value = Number(input[name]);
  if (!Number.isFinite(value) || value < min || value > max) { errors[name] = `Enter a value from ${min} to ${max}.`; return 0; }
  return value;
};
const hours = (tb, mbps) => (tb * 8_000_000) / (mbps * 3600);
const duration = (value) => value >= 48 ? `${(value / 24).toFixed(1)} days` : `${value.toFixed(1)} hours`;
const tier = (mbps) => mbps <= 900 ? '1GbE' : mbps <= 2250 ? '2.5GbE' : mbps <= 4500 ? '5GbE' : '10GbE';

export function calculateNetwork(kind, input) {
  const errors = {};
  const data = numeric(input, 'data', .001, 100000, errors);
  let title, summary, metrics, rows, note;
  if (kind === 'cloud') {
    const upload = numeric(input, 'upload', .1, 100000, errors), download = numeric(input, 'download', .1, 100000, errors), efficiency = numeric(input, 'efficiency', 20, 100, errors), throttle = numeric(input, 'throttle', 0, 100000, errors), active = numeric(input, 'active', .25, 24, errors);
    if (Object.keys(errors).length) return { errors };
    const effectiveUpload = Math.min(upload * efficiency / 100, throttle || Infinity), effectiveDownload = download * efficiency / 100;
    const uploadHours = hours(data, effectiveUpload), downloadHours = hours(data, effectiveDownload);
    title = `Initial upload: ${duration(uploadHours)}`;
    summary = `A full restore is about ${duration(downloadHours)} at the same ${efficiency}% practical-efficiency assumption.`;
    metrics = [['Data set', formatTb(data)], ['Effective upload', `${effectiveUpload.toFixed(1)} Mbps`], ['Calendar upload time', `${duration(uploadHours / active * 24)}`]];
    rows = [['Initial cloud upload', duration(uploadHours), `${active} active hours/day`], ['Full cloud restore', duration(downloadHours), 'Download path estimate'], ['Bottleneck', effectiveUpload < effectiveDownload ? 'Upload path' : 'Download path', 'Seed or hybrid recovery may help']];
    note = 'Internet plans are asymmetric; protocol overhead, service policies, and competing traffic change the real range.';
  } else if (kind === 'local') {
    const link = numeric(input, 'link', 1, 100000, errors), source = numeric(input, 'source', 1, 100000, errors), destination = numeric(input, 'destination', 1, 100000, errors), efficiency = numeric(input, 'efficiency', 20, 100, errors);
    if (Object.keys(errors).length) return { errors };
    const effective = Math.min(link * efficiency / 100, source, destination), estimate = hours(data, effective);
    title = `Plan ${duration(estimate)} for the transfer`;
    summary = `The practical path is limited to ${effective.toFixed(1)} Mbps, not the fastest advertised component.`;
    metrics = [['Data set', formatTb(data)], ['Practical throughput', `${effective.toFixed(1)} Mbps`], ['Best-case link', `${(link / 8).toFixed(1)} MB/s`]];
    rows = [['Link after overhead', `${(link * efficiency / 100).toFixed(1)} Mbps`, `${efficiency}% of link rate`], ['Source limit', `${source} Mbps`, source <= effective ? 'Current bottleneck' : 'Above path limit'], ['Destination limit', `${destination} Mbps`, destination <= effective ? 'Current bottleneck' : 'Above path limit']];
    note = 'Small files, Wi-Fi contention, encryption, disks, and other users can lower practical throughput.';
  } else if (kind === 'window') {
    const windowHours = numeric(input, 'window', .25, 168, errors), source = numeric(input, 'source', 1, 100000, errors), destination = numeric(input, 'destination', 1, 100000, errors), link = numeric(input, 'link', 1, 100000, errors), overhead = numeric(input, 'overhead', 0, 80, errors);
    if (Object.keys(errors).length) return { errors };
    const effective = Math.min(source, destination, link) * (1 - overhead / 100), needed = data * 8_000_000 / (windowHours * 3600), finish = hours(data, effective), margin = windowHours - finish;
    title = margin >= 0 ? `Fits with ${margin.toFixed(1)} hours to spare` : `Misses the window by ${Math.abs(margin).toFixed(1)} hours`;
    summary = `The job needs ${needed.toFixed(1)} Mbps effective throughput; this path estimates ${effective.toFixed(1)} Mbps.`;
    metrics = [['Changed data', formatTb(data)], ['Available window', `${windowHours} hours`], ['Predicted finish', duration(finish)]];
    rows = [['Required effective rate', `${needed.toFixed(1)} Mbps`, 'Before overhead'], ['Practical path rate', `${effective.toFixed(1)} Mbps`, 'Slowest component after overhead'], ['Window result', margin >= 0 ? 'Pass' : 'Fail', margin >= 0 ? 'Keep monitoring growth' : 'Adjust schedule or bottleneck']];
    note = 'Use changed data for recurring jobs; the first full backup usually requires a separate plan.';
  } else if (kind === 'tier') {
    const users = numeric(input, 'users', 1, 1000, errors), perUser = numeric(input, 'perUser', 1, 100000, errors), storage = numeric(input, 'storage', 1, 100000, errors), efficiency = numeric(input, 'efficiency', 20, 100, errors);
    if (Object.keys(errors).length) return { errors };
    const demand = users * perUser, required = Math.max(demand, storage) / (efficiency / 100), recommendation = tier(required);
    title = `${recommendation} is the practical starting tier`;
    summary = `Peak work is ${demand.toFixed(0)} Mbps; the storage path and protocol reserve point to ${recommendation}.`;
    metrics = [['Peak client demand', `${demand.toFixed(0)} Mbps`], ['Storage capability', `${storage} Mbps`], ['Recommended tier', recommendation]];
    rows = [['1GbE', 'Practical ~700–900 Mbps', required <= 900 ? 'Could fit' : 'Below target'], ['2.5GbE', 'Practical ~1.8–2.25 Gbps', required <= 2250 ? 'Could fit' : 'Below target'], ['10GbE', 'Practical ~7–9 Gbps', required <= 9000 ? 'Supports target' : 'Validate every path']];
    note = 'A faster NIC alone cannot overcome slow storage, switches, cabling, Wi-Fi, or a shared uplink.';
  } else if (kind === 'concurrent') {
    const users = numeric(input, 'users', 1, 1000, errors), ratio = numeric(input, 'ratio', 1, 100, errors), perUser = numeric(input, 'perUser', 1, 100000, errors), uplink = numeric(input, 'uplink', 1, 100000, errors), efficiency = numeric(input, 'efficiency', 20, 100, errors);
    if (Object.keys(errors).length) return { errors };
    const active = users * ratio / 100, demand = active * perUser, practical = uplink * efficiency / 100, reserve = practical - demand;
    title = reserve >= 0 ? `${reserve.toFixed(0)} Mbps shared-path reserve` : `${Math.abs(reserve).toFixed(0)} Mbps shared-path shortfall`;
    summary = `${active.toFixed(1)} concurrent users need about ${demand.toFixed(0)} Mbps against ${practical.toFixed(0)} Mbps practical uplink throughput.`;
    metrics = [['Concurrent users', active.toFixed(1)], ['Aggregate demand', `${demand.toFixed(0)} Mbps`], ['Suggested tier', tier(demand / (efficiency / 100))]];
    rows = [['Client workload', `${perUser} Mbps each`, 'Use a measured or conservative assumption'], ['Uplink after overhead', `${practical.toFixed(0)} Mbps`, 'Shared-path ceiling'], ['Oversubscription', reserve >= 0 ? 'Within plan' : 'Over target', reserve >= 0 ? 'Leave room for bursts' : 'Increase path capacity or limit concurrency']];
    note = 'Concurrent demand is an estimate; not every user is continuously transferring at the peak rate.';
  } else {
    const bitrate = numeric(input, 'bitrate', 1, 100000, errors), streams = numeric(input, 'streams', 1, 1000, errors), editors = numeric(input, 'editors', 1, 1000, errors), storage = numeric(input, 'storage', 1, 100000, errors), headroom = numeric(input, 'headroom', 0, 200, errors);
    if (Object.keys(errors).length) return { errors };
    const demand = bitrate * streams * editors, target = demand * (1 + headroom / 100), linkTarget = target / .8;
    title = `${tier(linkTarget)} networking target for the stated streams`;
    summary = `${demand.toFixed(0)} Mbps sustained media demand becomes a ${target.toFixed(0)} Mbps target with headroom.`;
    metrics = [['Sustained media demand', `${demand.toFixed(0)} Mbps`], ['Headroom target', `${target.toFixed(0)} Mbps`], ['Storage capability', `${storage} Mbps`]];
    rows = [['Per-editor streams', `${streams}`, `${bitrate} Mbps per stream`], ['Client/link target', tier(linkTarget), 'Assumes ~80% practical link efficiency'], ['Primary limit', storage < target ? 'Storage throughput' : 'Network path', storage < target ? 'Validate disks/cache/proxies' : 'Validate NIC, switch, and cabling']];
    note = 'Codec, proxy workflow, application behavior, storage IOPS, and latency can limit editing even when the link is fast enough.';
  }
  return { errors, result: { title, summary, metrics, rows, note } };
}

function render(result) {
  document.querySelector('[data-result-title]').textContent = result.title;
  document.querySelector('[data-result-summary]').textContent = result.summary;
  document.querySelector('[data-result-metrics]').innerHTML = result.metrics.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join('');
  document.querySelector('[data-result-rows]').innerHTML = result.rows.map(([label, value, detail]) => `<tr><td>${label}</td><td>${value}</td><td>${detail}</td></tr>`).join('');
  document.querySelector('[data-result-note]').textContent = result.note;
  document.querySelector('[data-tool-results]').hidden = false;
}
const form = typeof document === 'undefined' ? null : document.querySelector('[data-network-form]');
if (form) {
  form.addEventListener('submit', (event) => { event.preventDefault(); const output = calculateNetwork(form.dataset.tool, Object.fromEntries(new FormData(form))); form.querySelectorAll('[data-error]').forEach((node) => { node.textContent = ''; }); if (Object.keys(output.errors).length) { Object.entries(output.errors).forEach(([name, message]) => { const target = form.querySelector(`[data-error="${name}"]`); if (target) target.textContent = message; }); return; } render(output.result); });
  document.querySelector('[data-reset-tool]')?.addEventListener('click', () => { form.reset(); document.querySelector('[data-tool-results]').hidden = true; });
  document.querySelector('[data-copy-results]')?.addEventListener('click', () => navigator.clipboard.writeText(`${document.title}\nInputs: ${[...new FormData(form)].map(([key, value]) => `${key}: ${value}`).join(', ')}\n${document.querySelector('[data-result-title]').textContent}\n${document.querySelector('[data-result-summary]').textContent}\n${document.querySelector('[data-result-note]').textContent}\n${location.href}`));
  document.querySelector('[data-print-results]')?.addEventListener('click', () => print());
}
