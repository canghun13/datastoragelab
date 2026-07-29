import { calculatePlan, formatTb, formatUsd } from './planner-core.mjs';

const form = document.querySelector('[data-planner-form]');
const results = document.querySelector('[data-planner-results]');
const resultLive = document.querySelector('[data-result-live]');
const copyButton = document.querySelector('[data-copy-results]');
const printButton = document.querySelector('[data-print-results]');
const resetButton = document.querySelector('[data-reset-planner]');

function getInput() {
  return Object.fromEntries(new FormData(form).entries());
}

function clearErrors() {
  form.querySelectorAll('[data-error]').forEach((node) => { node.textContent = ''; });
  form.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute('aria-invalid'));
}

function showErrors(errors) {
  clearErrors();
  Object.entries(errors).forEach(([field, message]) => {
    const input = form.elements.namedItem(field);
    const error = form.querySelector(`[data-error="${field}"]`);
    if (input) input.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = message;
  });
  const first = Object.keys(errors)[0];
  form.elements.namedItem(first)?.focus();
}

function baysMarkup(array) {
  return Array.from({ length: array.bays }, (_, index) => {
    const isParity = index >= array.dataDrives;
    return `<span class="bay ${isParity ? 'parity' : ''}" aria-label="${isParity ? 'Protection' : 'Data'} drive ${index + 1}">${isParity ? 'Protection' : `${array.minimumDriveTb} TB`}</span>`;
  }).join('');
}

function render(plan) {
  document.querySelector('[data-project-data]').textContent = formatTb(plan.projectedTb);
  document.querySelector('[data-usable-data]').textContent = formatTb(plan.usableTb);
  document.querySelector('[data-backup-data]').textContent = formatTb(plan.localBackupTb + plan.offsiteTb);
  document.querySelector('[data-array-title]').textContent = `${plan.array.bays}-bay configuration with ${plan.array.minimumDriveTb} TB minimum drives`;
  document.querySelector('[data-array-copy]').textContent = `${plan.array.raid}. ${plan.array.failureText} Raw installed capacity is ${formatTb(plan.array.rawTb)} for ${formatTb(plan.usableTb)} usable planning capacity.`;
  document.querySelector('[data-bays]').innerHTML = baysMarkup(plan.array);
  document.querySelector('[data-protection]').textContent = `${plan.array.raid}: ${plan.array.failureText}`;
  document.querySelector('[data-backup-plan]').textContent = `${plan.localBackupTb.toFixed(1)} TB across local backup target(s)${plan.offsiteTb ? ` plus ${plan.offsiteTb.toFixed(1)} TB offsite` : ''}. RAID does not replace this independent backup.`;
  document.querySelector('[data-network]').textContent = `${plan.network.tier}. ${plan.network.note}`;
  document.querySelector('[data-headroom]').textContent = plan.capacityWarning;
  document.querySelector('[data-budget]').textContent = `${formatUsd(plan.budget.low)}–${formatUsd(plan.budget.high)} planning range, excluding taxes and unentered services. ${plan.budgetText}`;
  document.querySelector('[data-upload-warning]').textContent = plan.uploadWarning;
  document.querySelector('[data-unit-note]').textContent = plan.unitNote;
  document.querySelector('[data-equipment]').innerHTML = plan.equipment.map((item) => `<li>${item}</li>`).join('');
  results.hidden = false;
  resultLive.textContent = `Recommendation updated: ${plan.array.bays}-bay configuration with ${plan.array.minimumDriveTb} TB minimum drives.`;
}

function textResult() {
  const labels = [
    ['Storage requirement', '[data-usable-data]'], ['Projected data', '[data-project-data]'], ['Backup allocation', '[data-backup-data]'],
    ['Configuration', '[data-array-title]'], ['Protection', '[data-protection]'], ['Backup plan', '[data-backup-plan]'],
    ['Network', '[data-network]'], ['Expansion', '[data-headroom]'], ['Budget', '[data-budget]'], ['Upload note', '[data-upload-warning]'], ['Units', '[data-unit-note]']
  ];
  const inputLines = [...new FormData(form).entries()].map(([key, value]) => `${key}: ${value}`);
  const outputLines = labels.map(([label, selector]) => `${label}: ${document.querySelector(selector).textContent}`);
  const equipment = [...document.querySelectorAll('[data-equipment] li')].map((node) => `- ${node.textContent}`);
  return ['Data Storage Lab — Home Storage & Backup Planner', '', 'Inputs', ...inputLines, '', 'Recommendation', ...outputLines, '', 'Equipment checklist', ...equipment, '', `Source: ${location.href}`].join('\n');
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const { errors, plan } = calculatePlan(getInput());
  if (Object.keys(errors).length) { showErrors(errors); return; }
  clearErrors();
  render(plan);
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

copyButton?.addEventListener('click', async () => {
  const status = document.querySelector('[data-copy-status]');
  try { await navigator.clipboard.writeText(textResult()); status.textContent = 'Results copied as plain text.'; }
  catch { status.textContent = 'Copy was unavailable. Select the visible result text instead.'; }
});
printButton?.addEventListener('click', () => window.print());
resetButton?.addEventListener('click', () => {
  form.reset(); clearErrors(); results.hidden = true; resultLive.textContent = 'Planner reset to its example inputs.'; form.elements.dataSize.focus();
});
