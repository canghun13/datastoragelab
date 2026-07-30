import { tbToTib, formatTb, formatTib } from './storage-units.mjs';

export const RAID_LAYOUTS = {
  mirror: { label: 'Mirror', minimum: 2, overhead: (count) => count - 1, tolerance: 1, note: 'Two-drive mirror planning model.' },
  single: { label: 'Single-parity array', minimum: 3, overhead: () => 1, tolerance: 1, note: 'Generic same-size single-parity model.' },
  dual: { label: 'Dual-parity array', minimum: 4, overhead: () => 2, tolerance: 2, note: 'Generic same-size dual-parity model.' }
};

export function calculateRaid(layout, drives, driveTb) {
  const meta = RAID_LAYOUTS[layout];
  if (!meta || !Number.isInteger(drives) || drives < meta.minimum || !Number.isFinite(driveTb) || driveTb <= 0) return null;
  const protectionDrives = meta.overhead(drives);
  const usableTb = (drives - protectionDrives) * driveTb;
  return { ...meta, drives, driveTb, protectionDrives, rawTb: drives * driveTb, usableTb, overheadTb: protectionDrives * driveTb, usableTib: tbToTib(usableTb), summary: `${formatTb(usableTb)} usable (${formatTib(tbToTib(usableTb))}) from ${formatTb(drives * driveTb)} raw` };
}

export function layoutsFor(requiredTb, protection, candidates, ceilingTb) {
  return candidates.map((drives) => {
    const layout = protection === 'dual' ? 'dual' : protection === 'mirror' ? 'mirror' : 'single';
    const meta = RAID_LAYOUTS[layout];
    if (drives < meta.minimum) return { drives, rejected: `${meta.label} needs at least ${meta.minimum} drives.` };
    const dataDrives = drives - meta.overhead(drives);
    const minimumDriveTb = Math.ceil(requiredTb / dataDrives);
    if (minimumDriveTb > ceilingTb) return { drives, rejected: `Needs ${minimumDriveTb} TB drives, above your ${ceilingTb} TB ceiling.` };
    return { drives, layout, dataDrives, minimumDriveTb, usableTb: dataDrives * minimumDriveTb, spareBays: 0, text: `${drives} bays × ${minimumDriveTb} TB: ${formatTb(dataDrives * minimumDriveTb)} usable` };
  });
}
