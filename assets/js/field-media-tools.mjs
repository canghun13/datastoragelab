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

const usableCapacity = (capacity, usablePercent, reservePercent) =>
  number(capacity) * number(usablePercent) / 100 * (1 - number(reservePercent) / 100);

export function calculateCards(input) {
  const errors = {};
  addError(errors, input, 'cameras', 'Camera count', { minimum: 1, maximum: 20, integer: true });
  addError(errors, input, 'photos', 'Photos per camera', { minimum: 0, maximum: 1000000, integer: true, allowZero: true });
  addError(errors, input, 'photoMB', 'Average photo size', { minimum: .1, maximum: 1000 });
  addError(errors, input, 'videoMinutes', 'Video minutes per camera', { minimum: 0, maximum: 100000, allowZero: true });
  addError(errors, input, 'bitrate', 'Video bitrate', { minimum: .1, maximum: 20000 });
  addError(errors, input, 'slots', 'Recorded card copies', { minimum: 1, maximum: 2, integer: true });
  addError(errors, input, 'cardGB', 'Card capacity', { minimum: 1, maximum: 4000 });
  addError(errors, input, 'usable', 'Usable card percentage', { minimum: 50, maximum: 100 });
  addError(errors, input, 'reserve', 'Card reserve', { minimum: 0, maximum: 50, allowZero: true });
  addError(errors, input, 'spares', 'Spare cards per camera', { minimum: 0, maximum: 5, integer: true, allowZero: true });
  if (number(input.photos) === 0 && number(input.videoMinutes) === 0) errors.photos = 'Enter photos, video minutes, or both.';
  if (Object.keys(errors).length) return { errors };

  const photoGB = number(input.photos) * number(input.photoMB) / 1000;
  const videoGB = number(input.videoMinutes) * 60 * number(input.bitrate) / 8000;
  const perCameraGB = photoGB + videoGB;
  const safeCardGB = usableCapacity(input.cardGB, input.usable, input.reserve);
  const cardsPerSlot = Math.ceil(perCameraGB / safeCardGB);
  const workingCards = cardsPerSlot * number(input.cameras) * number(input.slots);
  const spareCards = number(input.spares) * number(input.cameras);
  return { result: {
    perCameraGB,
    primaryGB: perCameraGB * number(input.cameras),
    recordedGB: perCameraGB * number(input.cameras) * number(input.slots),
    safeCardGB,
    cardsPerSlot,
    workingCards,
    spareCards,
    totalCards: workingCards + spareCards,
    slots: number(input.slots),
    cameras: number(input.cameras)
  } };
}

export function calculateOffload(input) {
  const errors = {};
  addError(errors, input, 'dataGB', 'Data to offload', { minimum: .1, maximum: 1000000 });
  addError(errors, input, 'cards', 'Card count', { minimum: 1, maximum: 10000, integer: true });
  addError(errors, input, 'readers', 'Reader count', { minimum: 1, maximum: 64, integer: true });
  addError(errors, input, 'readerSpeed', 'Measured reader speed', { minimum: .1, maximum: 20000 });
  addError(errors, input, 'destinations', 'Destination count', { minimum: 1, maximum: 3, integer: true });
  addError(errors, input, 'destinationSpeed', 'Destination write speed', { minimum: .1, maximum: 50000 });
  addError(errors, input, 'verifySpeed', 'Verification read speed', { minimum: .1, maximum: 50000 });
  addError(errors, input, 'efficiency', 'Workflow efficiency', { minimum: 10, maximum: 100 });
  if (!['none', 'inline', 'reread'].includes(input.verify)) errors.verify = 'Choose a supported verification method.';
  if (Object.keys(errors).length) return { errors };

  const activeReaders = Math.min(number(input.cards), number(input.readers));
  const sourceRate = activeReaders * number(input.readerSpeed);
  const rawCopyRate = Math.min(sourceRate, number(input.destinationSpeed));
  const copyRate = rawCopyRate * number(input.efficiency) / 100;
  const copySeconds = number(input.dataGB) * 1000 / copyRate;
  let verifySeconds = 0;
  if (input.verify === 'inline') verifySeconds = copySeconds * .1;
  if (input.verify === 'reread') {
    const verifyRate = Math.min(number(input.destinationSpeed), number(input.verifySpeed)) * number(input.efficiency) / 100;
    verifySeconds = number(input.dataGB) * 1000 * number(input.destinations) / verifyRate;
  }
  return { result: {
    activeReaders,
    sourceRate,
    copyRate,
    copySeconds,
    verifySeconds,
    totalSeconds: copySeconds + verifySeconds,
    waves: Math.ceil(number(input.cards) / number(input.readers)),
    bottleneck: sourceRate <= number(input.destinationSpeed) ? 'Card readers' : 'Destination write path',
    destinations: number(input.destinations),
    verify: input.verify
  } };
}

export function calculateDriveKit(input) {
  const errors = {};
  addError(errors, input, 'dailyGB', 'Daily ingest', { minimum: .1, maximum: 1000000 });
  addError(errors, input, 'days', 'Shoot days', { minimum: 1, maximum: 3650, integer: true });
  addError(errors, input, 'copies', 'Independent field copies', { minimum: 2, maximum: 3, integer: true });
  addError(errors, input, 'driveTB', 'Drive capacity', { minimum: .1, maximum: 1000 });
  addError(errors, input, 'usable', 'Usable drive percentage', { minimum: 50, maximum: 100 });
  addError(errors, input, 'reserve', 'Drive reserve', { minimum: 0, maximum: 50, allowZero: true });
  addError(errors, input, 'spares', 'Unassigned spare drives', { minimum: 0, maximum: 8, integer: true, allowZero: true });
  if (Object.keys(errors).length) return { errors };

  const payloadGB = number(input.dailyGB) * number(input.days);
  const safeDriveGB = usableCapacity(number(input.driveTB) * 1000, input.usable, input.reserve);
  const drivesPerCopy = Math.ceil(payloadGB / safeDriveGB);
  const assignedDrives = drivesPerCopy * number(input.copies);
  return { result: {
    payloadGB,
    protectedGB: payloadGB * number(input.copies),
    safeDriveGB,
    drivesPerCopy,
    assignedDrives,
    spareDrives: number(input.spares),
    totalDrives: assignedDrives + number(input.spares),
    averageFillPercent: payloadGB / (drivesPerCopy * safeDriveGB) * 100,
    daysPerDrive: safeDriveGB / number(input.dailyGB),
    copies: number(input.copies),
    driveTB: number(input.driveTB)
  } };
}

export function calculateRotation(input) {
  const errors = {};
  addError(errors, input, 'dailyGB', 'Daily capture', { minimum: .1, maximum: 1000000 });
  addError(errors, input, 'cardGB', 'Card capacity', { minimum: 1, maximum: 4000 });
  addError(errors, input, 'usable', 'Usable card percentage', { minimum: 50, maximum: 100 });
  addError(errors, input, 'reserve', 'Card reserve', { minimum: 0, maximum: 50, allowZero: true });
  addError(errors, input, 'verifiedHours', 'Verified offload duration', { minimum: .01, maximum: 240 });
  addError(errors, input, 'windowHours', 'Available offload window', { minimum: .01, maximum: 24 });
  addError(errors, input, 'holdDays', 'Extra card hold days', { minimum: 0, maximum: 60, integer: true, allowZero: true });
  addError(errors, input, 'ownedCards', 'Cards already owned', { minimum: 0, maximum: 10000, integer: true, allowZero: true });
  if (Object.keys(errors).length) return { errors };

  const safeCardGB = usableCapacity(input.cardGB, input.usable, input.reserve);
  const cardsPerDay = Math.ceil(number(input.dailyGB) / safeCardGB);
  const processingDays = Math.ceil(number(input.verifiedHours) / number(input.windowHours));
  const backlogDays = Math.max(0, processingDays - 1);
  const rotationDays = 1 + number(input.holdDays) + backlogDays;
  const requiredCards = cardsPerDay * rotationDays;
  const difference = number(input.ownedCards) - requiredCards;
  return { result: {
    safeCardGB,
    cardsPerDay,
    processingDays,
    backlogDays,
    rotationDays,
    requiredCards,
    ownedCards: number(input.ownedCards),
    difference,
    status: difference >= 0 ? 'Ready' : 'Shortfall',
    releaseHours: rotationDays * 24
  } };
}

const formatGB = (gb) => gb >= 1000
  ? `${(gb / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} TB`
  : `${gb.toLocaleString(undefined, { maximumFractionDigits: 1 })} GB`;
const formatDuration = (seconds) => {
  const hours = seconds / 3600;
  if (hours >= 24) return `${(hours / 24).toLocaleString(undefined, { maximumFractionDigits: 2 })} days`;
  if (hours >= 1) return `${hours.toLocaleString(undefined, { maximumFractionDigits: 2 })} hours`;
  return `${(seconds / 60).toLocaleString(undefined, { maximumFractionDigits: 1 })} minutes`;
};

function viewModel(type, result) {
  if (type === 'cards') return {
    title: `Pack ${result.totalCards} cards for the planned capture`,
    summary: `${result.workingCards} working cards cover ${result.cameras} camera(s) and ${result.slots} recorded copy path(s); ${result.spareCards} are held as unassigned spares.`,
    metrics: [['Total kit', `${result.totalCards} cards`], ['Cards per slot', result.cardsPerSlot], ['Primary capture', formatGB(result.primaryGB)], ['Recorded payload', formatGB(result.recordedGB)]],
    rows: [['Safe capacity per card', formatGB(result.safeCardGB)], ['Working cards', result.workingCards], ['Spare cards', result.spareCards]],
    note: 'The result reserves capacity but does not certify card speed, camera compatibility, or media reliability.'
  };
  if (type === 'offload') return {
    title: `${formatDuration(result.totalSeconds)} planned offload window`,
    summary: `${result.activeReaders} reader(s) operate across ${result.waves} wave(s). The modeled limiting stage is ${result.bottleneck.toLowerCase()}.`,
    metrics: [['Copy time', formatDuration(result.copySeconds)], ['Verification time', formatDuration(result.verifySeconds)], ['Effective copy rate', `${result.copyRate.toFixed(1)} MB/s`], ['Destinations', result.destinations]],
    rows: [['Aggregate source rate', `${result.sourceRate.toFixed(1)} MB/s`], ['Modeled bottleneck', result.bottleneck], ['Card waves', result.waves]],
    note: result.verify === 'reread' ? 'Full re-read verification is modeled conservatively as one destination after another.' : 'Inline checksum overhead is an estimate; benchmark the exact application, reader, card, cable, and destination path.'
  };
  if (type === 'drive') return {
    title: `Pack ${result.totalDrives} physical drives`,
    summary: `Assign ${result.drivesPerCopy} drive(s) to each of ${result.copies} independent field copies, then keep ${result.spareDrives} drive(s) unassigned.`,
    metrics: [['Drives per copy', result.drivesPerCopy], ['Assigned drives', result.assignedDrives], ['Trip payload', formatGB(result.payloadGB)], ['Protected writes', formatGB(result.protectedGB)]],
    rows: [['Safe capacity per drive', formatGB(result.safeDriveGB)], ['Average planned fill', `${result.averageFillPercent.toFixed(1)}%`], ['Approximate days per drive', result.daysPerDrive.toFixed(1)]],
    note: 'Different copies must remain on different physical devices and, when feasible, in separate bags or custody paths.'
  };
  return {
    title: result.status === 'Ready' ? 'The owned card pool covers the rotation' : `${Math.abs(result.difference)} more cards are required`,
    summary: `${result.cardsPerDay} card(s) are consumed per capture day and remain unavailable for ${result.rotationDays} rotation day(s).`,
    metrics: [['Required cards', result.requiredCards], ['Owned cards', result.ownedCards], ['Cards per day', result.cardsPerDay], ['Rotation days', result.rotationDays]],
    rows: [['Safe capacity per card', formatGB(result.safeCardGB)], ['Processing days', result.processingDays], ['Backlog allowance', `${result.backlogDays} day(s)`], ['Earliest conservative release', `${result.releaseHours} hours after capture cycle starts`]],
    note: 'A card becomes reusable only after the stated verified-copy and hold policy is complete; elapsed time alone is not proof of a good copy.'
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

const calculators = { cards: calculateCards, offload: calculateOffload, drive: calculateDriveKit, rotation: calculateRotation };

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-field-media-form]').forEach((form) => {
    const type = form.dataset.fieldMediaForm;
    const target = form.closest('.tool-layout')?.querySelector('[data-field-media-results]');
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
