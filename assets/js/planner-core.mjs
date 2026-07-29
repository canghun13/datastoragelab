const driveSizes = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 32];

const limits = {
  dataSize: [0.05, 5000], growthRate: [0, 200], years: [1, 15], devices: [1, 100],
  users: [1, 100], importantData: [1, 100], uploadMbps: [0.1, 10000], headroom: [10, 100]
};

export function validatePlannerInput(data) {
  const errors = {};
  for (const [field, [min, max]] of Object.entries(limits)) {
    const value = Number(data[field]);
    if (!Number.isFinite(value)) errors[field] = 'Enter a number.';
    else if (value < min || value > max) errors[field] = `Use a value from ${min} to ${max}.`;
  }
  if (!['short', 'balanced', 'long'].includes(data.retention)) errors.retention = 'Choose a retention level.';
  if (!['1', '2'].includes(String(data.localCopies))) errors.localCopies = 'Choose one or two local backup copies.';
  if (!['yes', 'no'].includes(data.offsite)) errors.offsite = 'Choose an offsite option.';
  if (!['single', 'dual', 'none'].includes(data.tolerance)) errors.tolerance = 'Choose a protection level.';
  if (!['starter', 'balanced', 'flexible'].includes(data.budget)) errors.budget = 'Choose a budget range.';
  if (!['1000', '2500', '10000'].includes(String(data.lanMbps))) errors.lanMbps = 'Choose a local network capability.';
  return errors;
}

function chooseDriveSize(requiredTb) {
  return driveSizes.find((size) => size >= requiredTb - 1e-9) ?? Math.ceil(requiredTb / 4) * 4;
}

function sizeArray(usableTb, tolerance, growthRate, years) {
  let bays = 4;
  let parity = 1;
  let raid = 'Single-parity protection';
  let failureText = 'One drive may fail without losing the array.';
  if (tolerance === 'dual') {
    bays = usableTb > 24 || growthRate >= 35 || years >= 7 ? 6 : 4;
    parity = 2;
    raid = 'Dual-parity protection';
    failureText = 'Two drives may fail, subject to the selected layout and implementation.';
  } else if (tolerance === 'none') {
    bays = usableTb > 12 || growthRate >= 30 ? 4 : 2;
    parity = 0;
    raid = 'No array-level redundancy';
    failureText = 'A drive failure can make data unavailable; independent backups are essential.';
  } else if (usableTb <= 7 && growthRate < 25 && years <= 5) {
    bays = 2;
    parity = 1;
    raid = 'Two-drive mirror';
    failureText = 'One drive may fail; expansion options are limited.';
  } else {
    bays = usableTb > 30 || growthRate >= 40 || years >= 8 ? 6 : 4;
  }
  const dataDrives = Math.max(1, bays - parity);
  const minimumDriveTb = chooseDriveSize(usableTb / dataDrives);
  return { bays, parity, dataDrives, minimumDriveTb, rawTb: bays * minimumDriveTb, raid, failureText };
}

function budgetBand(array, localCopies, offsite) {
  const capacityFactor = array.minimumDriveTb * array.bays;
  const low = Math.round((array.bays === 2 ? 380 : array.bays <= 4 ? 700 : 1050) + capacityFactor * 17 + localCopies * array.minimumDriveTb * 10 + (offsite ? 80 : 0));
  const high = Math.round(low * 1.45 + (array.bays >= 4 ? 170 : 90));
  return { low, high };
}

function networkTier(data, projectedTb) {
  const lan = Number(data.lanMbps);
  const faster = lan >= 2500 || projectedTb >= 12 || Number(data.devices) >= 5 || Number(data.users) >= 4;
  if (lan === 10000) return { tier: '10GbE-ready path', note: 'Your selected network baseline supports demanding transfer workloads if storage and switches can keep up.' };
  if (faster) return { tier: '2.5GbE minimum', note: 'A 2.5GbE path gives practical headroom for larger restores and several active devices.' };
  return { tier: '1GbE is sufficient to start', note: 'Keep the design upgradeable if media, users, or restore windows increase.' };
}

export function calculatePlan(input) {
  const data = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, typeof value === 'string' ? value : Number(value)]));
  const errors = validatePlannerInput(data);
  if (Object.keys(errors).length) return { errors, plan: null };

  const currentTb = Number(data.dataSize);
  const growthRate = Number(data.growthRate) / 100;
  const projectedTb = currentTb * (1 + growthRate) ** Number(data.years);
  const usableTb = projectedTb * (1 + Number(data.headroom) / 100);
  const retentionMultiplier = { short: 1.25, balanced: 1.6, long: 2.15 }[data.retention];
  const importantTb = projectedTb * (Number(data.importantData) / 100);
  const backupTargetTb = importantTb * retentionMultiplier;
  const localBackupTb = backupTargetTb * Number(data.localCopies);
  const offsiteTb = data.offsite === 'yes' ? backupTargetTb : 0;
  const array = sizeArray(usableTb, data.tolerance, Number(data.growthRate), Number(data.years));
  const network = networkTier(data, projectedTb);
  const effectiveUploadMbps = Number(data.uploadMbps) * .75;
  const uploadHours = data.offsite === 'yes' ? (offsiteTb * 8_000_000) / (effectiveUploadMbps * 3600) : 0;
  const budget = budgetBand(array, Number(data.localCopies), data.offsite === 'yes');
  const budgetLevel = data.budget;
  const budgetText = budgetLevel === 'starter'
    ? 'A starter budget may need staged buying: protect important data first, then add a second local copy or faster networking.'
    : budgetLevel === 'balanced'
      ? 'A balanced budget should prioritize four bays, NAS-grade drives, one local backup target, and graceful shutdown power.'
      : 'A flexible budget can fund more expansion headroom, a second local copy, and faster recovery paths.';
  const capacityWarning = array.bays === 2 ? 'A two-bay mirror is compact but has little non-disruptive expansion room.' : `Keep ${array.bays - array.dataDrives} bay-equivalent of protection and revisit capacity before usable space falls below 20%.`;
  const uploadWarning = data.offsite === 'yes' && uploadHours > 168
    ? `At the selected upload speed, the first offsite copy is about ${uploadHours.toFixed(0)} hours of transfer time. Consider a local backup first, throttling, or a seeded/offline copy.`
    : data.offsite === 'yes'
      ? `The first offsite copy is about ${uploadHours.toFixed(0)} hours of transfer time at a practical 75% of the selected upload speed.`
      : 'No offsite copy is selected. A local backup alone does not protect against theft, fire, or site-wide loss.';
  const upsVa = array.bays >= 6 ? '1000–1500 VA' : array.bays >= 4 ? '850–1200 VA' : '600–850 VA';
  const equipment = [
    `${array.bays}-bay NAS or local storage enclosure`,
    `${array.bays} × ${array.minimumDriveTb} TB minimum drives`,
    `${Number(data.localCopies)} separate local backup target${Number(data.localCopies) > 1 ? 's' : ''} sized for ${localBackupTb.toFixed(1)} TB retained data`,
    data.offsite === 'yes' ? `Offsite/cloud capacity target of ${offsiteTb.toFixed(1)} TB` : 'A future offsite copy or rotation plan',
    `${network.tier} network components as needed`,
    `${upsVa} UPS class with USB/network graceful shutdown support`
  ];
  return {
    errors: {},
    plan: {
      currentTb, projectedTb, usableTb, importantTb, backupTargetTb, localBackupTb, offsiteTb, array, network,
      uploadHours, budget, budgetText, capacityWarning, uploadWarning, upsVa, equipment,
      unitNote: 'Capacity calculations use decimal TB (1 TB = 1,000 GB). Operating systems may display a smaller TiB value.'
    }
  };
}

export function formatTb(value) {
  return `${value >= 100 ? value.toFixed(0) : value.toFixed(1)} TB`;
}

export function formatUsd(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}
