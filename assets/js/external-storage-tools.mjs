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

const driveLabels = {
  sata25: '2.5-inch SATA drive',
  sata35: '3.5-inch SATA hard drive',
  m2sata: 'M.2 SATA SSD',
  m2nvme: 'M.2 NVMe SSD'
};

const enclosureLabels = {
  sata25: '2.5-inch SATA enclosure',
  sata35: '3.5/2.5-inch SATA enclosure',
  m2sata: 'M.2 SATA-only enclosure',
  m2nvme: 'M.2 NVMe-only enclosure',
  m2dual: 'dual-protocol M.2 enclosure'
};

export function calculateCompatibility(input) {
  const errors = {};
  if (!Object.hasOwn(driveLabels, input.driveType)) errors.driveType = 'Choose a supported drive type.';
  if (!Object.hasOwn(enclosureLabels, input.enclosureType)) errors.enclosureType = 'Choose a supported enclosure type.';
  addError(errors, input, 'driveLength', 'M.2 drive length', { minimum: 2230, maximum: 22110, integer: true });
  addError(errors, input, 'maxLength', 'Maximum enclosure M.2 length', { minimum: 2230, maximum: 22110, integer: true });
  if (!['yes', 'no'].includes(input.externalPower)) errors.externalPower = 'Choose whether external power is available.';
  if (Object.keys(errors).length) return { errors };

  const driveType = input.driveType;
  const enclosureType = input.enclosureType;
  const isM2 = driveType.startsWith('m2');
  let mechanicalFit = false;
  let protocolFit = false;
  if (driveType === 'sata25') mechanicalFit = ['sata25', 'sata35'].includes(enclosureType);
  if (driveType === 'sata35') mechanicalFit = enclosureType === 'sata35';
  if (isM2) mechanicalFit = enclosureType.startsWith('m2') && number(input.driveLength) <= number(input.maxLength);
  if (driveType === 'sata25' || driveType === 'sata35') protocolFit = ['sata25', 'sata35'].includes(enclosureType);
  if (driveType === 'm2sata') protocolFit = ['m2sata', 'm2dual'].includes(enclosureType);
  if (driveType === 'm2nvme') protocolFit = ['m2nvme', 'm2dual'].includes(enclosureType);
  const powerReady = driveType !== 'sata35' || input.externalPower === 'yes';
  const blockers = [];
  if (!mechanicalFit) blockers.push(isM2 && enclosureType.startsWith('m2') ? 'M.2 module length exceeds the documented enclosure limit' : 'drive and enclosure form factors do not match');
  if (!protocolFit) blockers.push('drive protocol is not supported by the enclosure bridge');
  if (!powerReady) blockers.push('a 3.5-inch hard drive needs an enclosure with its own power supply');
  return { result: {
    driveLabel: driveLabels[driveType], enclosureLabel: enclosureLabels[enclosureType], mechanicalFit, protocolFit, powerReady,
    compatible: mechanicalFit && protocolFit && powerReady, blockers,
    lengthNote: isM2 ? `${number(input.driveLength)} module checked against ${number(input.maxLength)} enclosure limit` : 'M.2 length does not apply to this drive type'
  } };
}

export function calculateBottleneck(input) {
  const errors = {};
  for (const [key, label] of [['driveRead', 'Drive read speed'], ['driveWrite', 'Drive write speed']]) addError(errors, input, key, label, { minimum: 1, maximum: 50000 });
  for (const [key, label] of [['enclosureGbps', 'Enclosure data rate'], ['portGbps', 'Host port data rate'], ['cableGbps', 'Cable data rate']]) addError(errors, input, key, label, { minimum: .48, maximum: 120 });
  addError(errors, input, 'hubGbps', 'Hub or dock data rate', { minimum: 0, maximum: 120, allowZero: true });
  addError(errors, input, 'efficiency', 'Planning efficiency', { minimum: 10, maximum: 100 });
  if (Object.keys(errors).length) return { errors };

  const components = [
    ['Enclosure bridge', number(input.enclosureGbps)],
    ['Host port', number(input.portGbps)],
    ['Cable', number(input.cableGbps)]
  ];
  if (number(input.hubGbps) > 0) components.push(['Hub or dock upstream', number(input.hubGbps)]);
  const lineRateGbps = Math.min(...components.map(([, rate]) => rate));
  const pathBottlenecks = components.filter(([, rate]) => Math.abs(rate - lineRateGbps) < 1e-9).map(([label]) => label);
  const payloadCeilingMBps = lineRateGbps * 1000 / 8 * number(input.efficiency) / 100;
  const readCeilingMBps = Math.min(number(input.driveRead), payloadCeilingMBps);
  const writeCeilingMBps = Math.min(number(input.driveWrite), payloadCeilingMBps);
  const readLimit = number(input.driveRead) <= payloadCeilingMBps ? 'Drive sustained read' : pathBottlenecks.join(' + ');
  const writeLimit = number(input.driveWrite) <= payloadCeilingMBps ? 'Drive sustained write' : pathBottlenecks.join(' + ');
  return { result: { lineRateGbps, payloadCeilingMBps, readCeilingMBps, writeCeilingMBps, readLimit, writeLimit, pathBottlenecks, efficiency: number(input.efficiency) } };
}

export function calculatePower(input) {
  const errors = {};
  addError(errors, input, 'availableW', 'Available USB power', { minimum: .5, maximum: 1000 });
  addError(errors, input, 'reserve', 'Power reserve', { minimum: 0, maximum: 50, allowZero: true });
  addError(errors, input, 'devices', 'Storage device count', { minimum: 1, maximum: 64, integer: true });
  addError(errors, input, 'steadyW', 'Per-device operating power', { minimum: .1, maximum: 100 });
  addError(errors, input, 'startupW', 'Per-device startup or peak power', { minimum: .1, maximum: 200 });
  addError(errors, input, 'otherW', 'Other connected-device power', { minimum: 0, maximum: 500, allowZero: true });
  addError(errors, input, 'ports', 'Powered downstream ports', { minimum: 1, maximum: 64, integer: true });
  if (Object.keys(errors).length) return { errors };

  const usableW = number(input.availableW) * (1 - number(input.reserve) / 100);
  const peakPerDevice = Math.max(number(input.steadyW), number(input.startupW));
  const steadyLoadW = number(input.devices) * number(input.steadyW) + number(input.otherW);
  const peakLoadW = number(input.devices) * peakPerDevice + number(input.otherW);
  const powerReady = peakLoadW <= usableW;
  const portsReady = number(input.devices) <= number(input.ports);
  const maxByPower = Math.max(0, Math.floor((usableW - number(input.otherW)) / peakPerDevice));
  const maxDevices = Math.min(number(input.ports), maxByPower);
  return { result: {
    usableW, steadyLoadW, peakLoadW, powerReady, portsReady, ready: powerReady && portsReady,
    powerMarginW: usableW - peakLoadW, portMargin: number(input.ports) - number(input.devices), maxDevices
  } };
}

export function calculateTopology(input) {
  const errors = {};
  for (const [key, label, maximum] of [['directPorts', 'Reserved direct storage ports', 16], ['highDevices', 'High-throughput device count', 64], ['lowDevices', 'Low-throughput device count', 64], ['hubPorts', 'Downstream ports per hub', 32], ['hubLinks', 'Available hub upstream links', 16]]) {
    addError(errors, input, key, label, { minimum: key === 'hubPorts' ? 1 : 0, maximum, integer: true, allowZero: key !== 'hubPorts' });
  }
  addError(errors, input, 'highMBps', 'High-throughput target', { minimum: 1, maximum: 50000 });
  addError(errors, input, 'lowMBps', 'Low-throughput target', { minimum: .1, maximum: 5000 });
  addError(errors, input, 'hubGbps', 'Upstream rate per hub', { minimum: .48, maximum: 120 });
  addError(errors, input, 'efficiency', 'Shared-link efficiency', { minimum: 10, maximum: 100 });
  if (number(input.highDevices) === 0 && number(input.lowDevices) === 0) errors.highDevices = 'Enter at least one storage device.';
  if (Object.keys(errors).length) return { errors };

  const directUsed = Math.min(number(input.directPorts), number(input.highDevices));
  const sharedHigh = number(input.highDevices) - directUsed;
  const sharedDevices = sharedHigh + number(input.lowDevices);
  const sharedDemandGbps = (sharedHigh * number(input.highMBps) + number(input.lowDevices) * number(input.lowMBps)) * 8 / 1000;
  const capacityPerHubGbps = number(input.hubGbps) * number(input.efficiency) / 100;
  const availableSharedGbps = number(input.hubLinks) * capacityPerHubGbps;
  const availableSharedPorts = number(input.hubLinks) * number(input.hubPorts);
  const linksByPorts = sharedDevices ? Math.ceil(sharedDevices / number(input.hubPorts)) : 0;
  const linksByBandwidth = sharedDemandGbps ? Math.ceil(sharedDemandGbps / capacityPerHubGbps) : 0;
  const requiredHubLinks = Math.max(linksByPorts, linksByBandwidth);
  const portsReady = sharedDevices <= availableSharedPorts;
  const bandwidthReady = sharedDemandGbps <= availableSharedGbps + 1e-9;
  return { result: {
    directUsed, sharedHigh, sharedDevices, sharedDemandGbps, capacityPerHubGbps, availableSharedGbps,
    availableSharedPorts, requiredHubLinks, portsReady, bandwidthReady, ready: portsReady && bandwidthReady,
    linkShortfall: Math.max(0, requiredHubLinks - number(input.hubLinks))
  } };
}

export function calculateTroubleshooter(input) {
  const errors = {};
  addError(errors, input, 'expectedMBps', 'Documented or measured direct speed', { minimum: 1, maximum: 50000 });
  addError(errors, input, 'measuredMBps', 'Current measured speed', { minimum: .1, maximum: 50000 });
  addError(errors, input, 'negotiatedGbps', 'Negotiated connection rate', { minimum: .48, maximum: 120 });
  addError(errors, input, 'efficiency', 'Planning efficiency', { minimum: 10, maximum: 100 });
  if (!['direct', 'shared'].includes(input.path)) errors.path = 'Choose direct or shared connection.';
  if (!['documented', 'unknown', 'below'].includes(input.cable)) errors.cable = 'Choose the cable evidence available.';
  if (!['sequential', 'small'].includes(input.workload)) errors.workload = 'Choose the benchmark workload.';
  if (!['yes', 'no'].includes(input.thermal)) errors.thermal = 'Choose whether speed falls after warming.';
  if (!['yes', 'no'].includes(input.busy)) errors.busy = 'Choose whether either drive is busy or nearly full.';
  if (Object.keys(errors).length) return { errors };

  const linkCeilingMBps = number(input.negotiatedGbps) * 1000 / 8 * number(input.efficiency) / 100;
  const planningCeilingMBps = Math.min(number(input.expectedMBps), linkCeilingMBps);
  const achievedPercent = number(input.measuredMBps) / planningCeilingMBps * 100;
  const actions = [];
  if (input.cable !== 'documented') actions.push(input.cable === 'below' ? 'Replace the known lower-rate cable or adapter before changing the drive.' : 'Verify the cable data-rate marking or test with a certified known-good cable.');
  if (linkCeilingMBps < number(input.expectedMBps) * .9) actions.push('Move to a port and connection mode that negotiates the rate required by the drive and enclosure.');
  if (input.path === 'shared') actions.push('Disconnect other dock or hub traffic and repeat the test on a direct host port.');
  if (input.workload === 'small') actions.push('Repeat with one large sequential file so metadata and file-count overhead are separated from the link.');
  if (input.thermal === 'yes') actions.push('Repeat from a cool start and inspect enclosure cooling, SSD temperature, and cache-exhaustion behavior.');
  if (input.busy === 'yes') actions.push('Retest with idle source and destination devices and adequate free space.');
  if (actions.length === 0 && achievedPercent < 80) actions.push('Benchmark the drive internally or in a known-good enclosure, then test each port and cable one at a time.');
  if (actions.length === 0) actions.push('Record this result as a direct-path baseline and compare future shared configurations against it.');
  const status = achievedPercent >= 80 ? 'Within the planning range' : linkCeilingMBps < number(input.expectedMBps) * .9 ? 'Connection rate is the first constraint' : 'Isolate the path before replacing hardware';
  return { result: {
    measuredMBps: number(input.measuredMBps), expectedMBps: number(input.expectedMBps),
    linkCeilingMBps, planningCeilingMBps, achievedPercent, status, actions
  } };
}

const formatRate = (value) => `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} MB/s`;
const formatWatts = (value) => `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} W`;

function viewModel(type, result) {
  if (type === 'compatibility') return {
    title: result.compatible ? 'The documented drive and enclosure fit' : 'Resolve the compatibility blockers first',
    summary: `${result.driveLabel} checked against ${result.enclosureLabel}. ${result.compatible ? 'Mechanical, protocol, and power checks pass.' : result.blockers.join('; ')}.`,
    metrics: [['Mechanical fit', result.mechanicalFit ? 'Pass' : 'Blocked'], ['Protocol fit', result.protocolFit ? 'Pass' : 'Blocked'], ['Power readiness', result.powerReady ? 'Pass' : 'Blocked'], ['Overall', result.compatible ? 'Compatible' : 'Not ready']],
    rows: [['Drive', result.driveLabel], ['Enclosure', result.enclosureLabel], ['Length check', result.lengthNote]],
    note: 'Confirm connector keying, supported module lengths, bridge protocol, maximum capacity, and power requirements in both product manuals before purchase.'
  };
  if (type === 'bottleneck') return {
    title: `${formatRate(result.readCeilingMBps)} read and ${formatRate(result.writeCeilingMBps)} write ceiling`,
    summary: `The slowest documented link is ${result.lineRateGbps} Gbps. At ${result.efficiency}% planning efficiency, its payload ceiling is ${formatRate(result.payloadCeilingMBps)}.`,
    metrics: [['Path line rate', `${result.lineRateGbps} Gbps`], ['Payload ceiling', formatRate(result.payloadCeilingMBps)], ['Read ceiling', formatRate(result.readCeilingMBps)], ['Write ceiling', formatRate(result.writeCeilingMBps)]],
    rows: [['Read limiter', result.readLimit], ['Write limiter', result.writeLimit], ['Slowest link component', result.pathBottlenecks.join(' + ')]],
    note: 'The result is a ceiling from user-entered sustained drive speeds and documented link rates, not a benchmark promise.'
  };
  if (type === 'power') return {
    title: result.ready ? 'Power and downstream ports cover the device set' : 'Use fewer devices or a stronger powered path',
    summary: `${formatWatts(result.peakLoadW)} peak demand is checked against ${formatWatts(result.usableW)} after reserve.`,
    metrics: [['Usable power', formatWatts(result.usableW)], ['Steady load', formatWatts(result.steadyLoadW)], ['Peak load', formatWatts(result.peakLoadW)], ['Maximum identical devices', result.maxDevices]],
    rows: [['Power check', result.powerReady ? 'Pass' : `Short by ${formatWatts(Math.abs(result.powerMarginW))}`], ['Port check', result.portsReady ? 'Pass' : `Short by ${Math.abs(result.portMargin)} port(s)`]],
    note: 'Use the hub, dock, host, and drive documentation for available output and startup demand. A power calculation cannot detect poor cables or voltage drop.'
  };
  if (type === 'topology') return {
    title: result.ready ? 'The proposed direct and shared layout fits' : `${result.linkShortfall} additional equivalent hub link(s) are required`,
    summary: `${result.directUsed} high-throughput device(s) stay direct; ${result.sharedDevices} device(s) share ${result.availableSharedPorts} downstream positions.`,
    metrics: [['Direct high-speed devices', result.directUsed], ['Shared devices', result.sharedDevices], ['Shared demand', `${result.sharedDemandGbps.toFixed(2)} Gbps`], ['Required hub links', result.requiredHubLinks]],
    rows: [['Downstream port capacity', result.portsReady ? 'Pass' : 'Insufficient'], ['Shared upstream capacity', result.bandwidthReady ? 'Pass' : 'Insufficient'], ['Available shared payload', `${result.availableSharedGbps.toFixed(2)} Gbps`]],
    note: 'This allocation reserves direct ports for high-throughput storage. Displays, Ethernet, charging, and other dock traffic need their own documented allowance.'
  };
  return {
    title: result.status,
    summary: `${formatRate(result.measuredMBps)} measured against a ${formatRate(result.planningCeilingMBps)} planning ceiling.`,
    metrics: [['Planning ceiling', formatRate(result.planningCeilingMBps)], ['Link payload ceiling', formatRate(result.linkCeilingMBps)], ['Achieved', `${result.achievedPercent.toFixed(1)}% of planning ceiling`], ['Checks generated', result.actions.length]],
    rows: result.actions.map((action, index) => [`${index + 1}`, action]),
    note: 'Change one component at a time and keep the same benchmark. Stop testing a device that disconnects, overheats, smells abnormal, or contains the only copy of important data.'
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

const calculators = {
  compatibility: calculateCompatibility,
  bottleneck: calculateBottleneck,
  power: calculatePower,
  topology: calculateTopology,
  troubleshooter: calculateTroubleshooter
};

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-external-storage-form]').forEach((form) => {
    const type = form.dataset.externalStorageForm;
    const target = form.closest('.tool-layout')?.querySelector('[data-external-storage-results]');
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
