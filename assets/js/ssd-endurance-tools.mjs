const num = (value) => Number(value);
const finite = (value) => Number.isFinite(value);
export const validatePositiveNumber = (value, label = 'Value', minimum = 0) => finite(num(value)) && num(value) > minimum ? '' : `${label} must be greater than ${minimum}.`;
export const normalizeCapacityToGB = (value, unit = 'GB') => unit === 'TB' ? num(value) * 1000 : num(value);
export const normalizeEnduranceToTBW = (value, unit = 'TBW') => unit === 'PBW' ? num(value) * 1000 : num(value);
export const tbwToDwpd = (tbw, capacityGB, years) => num(tbw) * 1000 / (num(capacityGB) * 365 * num(years));
export const dwpdToTbw = (dwpd, capacityGB, years) => num(dwpd) * num(capacityGB) * 365 * num(years) / 1000;
export const dwpdToGBPerDay = (dwpd, capacityGB) => num(dwpd) * num(capacityGB);
export const calculateEffectiveWrites = (logicalGBDay, waf) => num(logicalGBDay) * num(waf);
export const calculateRequiredTBW = (effectiveGBDay, years) => num(effectiveGBDay) * 365 * num(years) / 1000;
export const calculateYearsToRating = (remainingTBW, effectiveGBDay) => effectiveGBDay > 0 ? num(remainingTBW) * 1000 / (num(effectiveGBDay) * 365) : null;
export const calculateEnduranceMargin = (remainingTBW, requiredTBW) => requiredTBW > 0 ? num(remainingTBW) / num(requiredTBW) : null;
export const distributeWritesPerDrive = (totalGBDay, layout, drives, shares = []) => {
  if (layout === 'single' || layout === 'mirror') return Array(Math.max(1, drives)).fill(num(totalGBDay));
  if (layout === 'custom') return shares.map((share) => num(totalGBDay) * num(share) / 100);
  return Array(Math.max(1, drives)).fill(num(totalGBDay) / num(drives));
};
export const nvmeDataUnitsToTB = (units) => num(units) * 512000 / 1e12;
export const calculateMeasuredWriteRate = (previousTB, currentTB, days) => (num(currentTB) - num(previousTB)) / num(days);
export const calculateThresholdDate = (days) => finite(days) && days >= 0 ? new Date(Date.now() + days * 86400000) : null;
export const formatWriteVolume = (tb) => finite(tb) ? `${tb >= 1 ? tb.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' TB' : (tb * 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' GB'}` : 'Not available';
export const formatDuration = (years) => years === null ? 'Write evidence required' : finite(years) ? `${years.toLocaleString(undefined, { maximumFractionDigits: 1 })} years` : 'Not available';
const status = (margin) => margin >= 1.25 ? 'Pass' : margin >= 1 ? 'Marginal' : 'Insufficient';
const clean = (input, key, label, minimum = 0) => validatePositiveNumber(input[key], label, minimum);

export function calculateLifespan(input) {
  const errors = ['capacity','rated','warranty','writes','low','base','high','horizon','reserve'].reduce((all, key) => ({ ...all, ...(clean(input, key, key === 'rated' ? 'Rated endurance' : key, key === 'writes' || key === 'reserve' ? -1 : 0) ? { [key]: clean(input, key, key, key === 'writes' || key === 'reserve' ? -1 : 0) } : {}) }), {});
  if (num(input.low) < 1 || num(input.base) < 1 || num(input.high) < 1) errors.base = 'Each WAF scenario must be at least 1.';
  const rated = normalizeEnduranceToTBW(input.rated, input.enduranceUnit);
  const existing = num(input.existing || 0);
  if (existing < 0) errors.existing = 'Existing writes cannot be negative.';
  if (existing > rated) errors.existing = 'Rating exceeded: existing writes are above rated TBW.';
  if (Object.keys(errors).length) return { errors };
  const capacity = normalizeCapacityToGB(input.capacity, input.capacityUnit);
  const remaining = rated - existing;
  const scenarios = ['low','base','high'].map((name) => {
    const effective = calculateEffectiveWrites(input.writes, input[name]);
    const required = calculateRequiredTBW(effective, input.horizon) * (1 + num(input.reserve) / 100);
    return { name, effective, required, years: calculateYearsToRating(remaining, effective), margin: calculateEnduranceMargin(remaining, required) };
  });
  const base = scenarios[1];
  return { result: { rated, remaining, scenarios, ratedDwpd: tbwToDwpd(rated, capacity, input.warranty), actualDwpd: base.effective / capacity, maxLogical: rated * 1000 / (365 * num(input.warranty) * num(input.base)), status: status(base.margin) } };
}
export function calculateConverter(input) {
  const errors = {};
  ['capacity','years','value'].forEach((key) => { const error = clean(input, key, key === 'value' ? 'Source value' : key, 0); if (error) errors[key] = error; });
  if (input.waf && num(input.waf) < 1) errors.waf = 'WAF must be at least 1.';
  if (Object.keys(errors).length) return { errors };
  const capacity = normalizeCapacityToGB(input.capacity, input.capacityUnit), years = num(input.years), source = input.metric;
  let tbw = source === 'TBW' ? num(input.value) : source === 'PBW' ? num(input.value) * 1000 : source === 'DWPD' ? dwpdToTbw(input.value, capacity, years) : num(input.value) * 365 * years / 1000;
  const dwpd = tbwToDwpd(tbw, capacity, years), gbDay = dwpdToGBPerDay(dwpd, capacity);
  return { result: { tbw, pbw: tbw / 1000, dwpd, gbDay, tbYear: tbw / years, full: tbw * 1000 / capacity, logical: input.waf ? gbDay / num(input.waf) : null } };
}
export function calculateCache(input) {
  const errors = {};
  ['drives','capacity','rated','waf','years','reserve'].forEach((key) => { const error = clean(input, key, key, key === 'reserve' ? -1 : 0); if (error) errors[key] = error; });
  if (num(input.waf) < 1) errors.waf = 'WAF must be at least 1.';
  const logical = input.mode === 'measured' ? num(input.measured) : num(input.ingest) * num(input.cachePercent) / 100;
  if (!(logical > 0)) errors.measured = 'Enter a write rate above zero.';
  const shares = input.layout === 'custom' ? String(input.shares || '').split(',').map(Number) : [];
  if (input.layout === 'custom' && (shares.length !== num(input.drives) || shares.some((x) => !finite(x) || x < 0) || Math.abs(shares.reduce((a,b)=>a+b,0)-100) > .01)) errors.shares = 'Custom shares must match drive count and total 100%.';
  if (Object.keys(errors).length) return { errors };
  const per = distributeWritesPerDrive(logical, input.layout, num(input.drives), shares)[0], effective = calculateEffectiveWrites(per, input.waf), required = calculateRequiredTBW(effective, input.years) * (1 + num(input.reserve) / 100), remaining = num(input.rated) - num(input.existing || 0);
  if (remaining < 0) return { errors: { existing: 'Rating exceeded for this drive.' } };
  return { result: { logical, per, effective, required, dwpd: required * 1000 / (num(input.capacity) * 365 * num(input.years)), years: calculateYearsToRating(remaining, effective), margin: calculateEnduranceMargin(remaining, required), status: status(calculateEnduranceMargin(remaining, required)) } };
}
export function calculateVm(input) {
  const errors = {};
  ['vms','perVm','containers','logs','snapshots','copies','capacity','rated','waf','years'].forEach((key) => { const error = clean(input, key, key, key === 'vms' || key === 'perVm' || key === 'containers' || key === 'logs' || key === 'snapshots' ? -1 : 0); if (error) errors[key] = error; });
  if (!Number.isInteger(num(input.vms))) errors.vms = 'VM count must be a whole number.';
  if (num(input.copies) < 1 || num(input.waf) < 1) errors.copies = 'Copy multiplier and WAF must be at least 1.';
  const shares = String(input.shares || '100').split(',').map(Number); if (shares.some((x) => !finite(x) || x < 0) || Math.abs(shares.reduce((a,b)=>a+b,0)-100) > .01) errors.shares = 'Drive shares must total 100%.';
  const vm = num(input.vms) * num(input.perVm), total = vm + num(input.containers) + num(input.logs) + num(input.snapshots); if (!(total > 0)) errors.logs = 'At least one workload must write data.';
  if (Object.keys(errors).length) return { errors };
  const per = total * num(input.copies) * shares[0] / 100, effective = per * num(input.waf), required = calculateRequiredTBW(effective, input.years), remaining = num(input.rated) - num(input.existing || 0), margin = calculateEnduranceMargin(remaining, required);
  return { result: { vm, total, per, effective, required, dwpd: required * 1000 / (num(input.capacity) * 365 * num(input.years)), margin, largest: [['VMs',vm],['Containers',num(input.containers)],['Database and logs',num(input.logs)],['Snapshots',num(input.snapshots)]].sort((a,b)=>b[1]-a[1])[0][0], status: status(margin) } };
}
export function calculateRemaining(input) {
  const errors = {};
  ['rated','capacity','previous','current','days','threshold','growth','lead'].forEach((key) => { const error = clean(input, key, key, key === 'growth' || key === 'lead' ? -1 : 0); if (error) errors[key] = error; });
  if (num(input.threshold) > 100) errors.threshold = 'Threshold cannot exceed 100%.';
  if (num(input.current) < num(input.previous)) errors.current = 'Counter reset or unit mismatch: current value is lower.';
  if (input.smart && (num(input.smart) < 0 || num(input.smart) > 255)) errors.smart = 'SMART Percentage Used must be 0–255.';
  if (Object.keys(errors).length) return { errors };
  const previous = input.unit === 'units' ? nvmeDataUnitsToTB(input.previous) : num(input.previous), current = input.unit === 'units' ? nvmeDataUnitsToTB(input.current) : num(input.current), measured = calculateMeasuredWriteRate(previous, current, input.days), future = measured * (1 + num(input.growth) / 100), threshold = num(input.rated) * num(input.threshold) / 100, remaining = threshold - current, days = future > 0 ? remaining / future : null;
  return { result: { measured, future, dwpd: measured * 1000 / num(input.capacity), usage: current / num(input.rated) * 100, remaining, days, date: calculateThresholdDate(days), prepare: calculateThresholdDate(days === null ? NaN : days - num(input.lead)), exceeded: current > num(input.rated) } };
}

const render = (node, result, type) => {
  const rows = type === 'lifespan' ? result.scenarios.map((s) => `<tr><th>${s.name} WAF</th><td>${formatDuration(s.years)}</td><td>${formatWriteVolume(s.required)}</td><td>${s.margin.toFixed(2)}×</td></tr>`).join('') : Object.entries(result).filter(([,v]) => typeof v === 'number').slice(0, 6).map(([key, value]) => `<tr><th>${key.replace(/([A-Z])/g, ' $1')}</th><td>${Number.isFinite(value) ? value.toLocaleString(undefined,{maximumFractionDigits:2}) : 'Not available'}</td></tr>`).join('');
  node.hidden = false; node.querySelector('[data-result-title]').textContent = result.status ? `${result.status} endurance outlook` : 'Converted endurance metrics'; node.querySelector('[data-result-summary]').textContent = result.exceeded ? 'Current writes exceed the rated TBW. Treat the estimate as a planning warning, not a physical failure prediction.' : 'Results use decimal GB and TB. Review measured writes and vendor documentation before purchase or replacement.'; node.querySelector('[data-result-rows]').innerHTML = rows;
};
if (typeof document !== 'undefined') {
document.querySelectorAll('[data-ssd-form]').forEach((form) => {
  const type = form.dataset.ssdForm, target = document.querySelector('[data-ssd-results]');
  form.addEventListener('submit', (event) => { event.preventDefault(); const input = Object.fromEntries(new FormData(form)); const fn = ({ lifespan: calculateLifespan, converter: calculateConverter, cache: calculateCache, vm: calculateVm, remaining: calculateRemaining })[type]; const output = fn(input); form.querySelectorAll('[data-error]').forEach((el)=>el.textContent=''); if (output.errors) { Object.entries(output.errors).forEach(([key,msg]) => { const el=form.querySelector(`[data-error="${key}"]`); if(el) el.textContent=msg; }); target.hidden=true; return; } render(target, output.result, type); });
  form.querySelector('[data-reset-tool]')?.addEventListener('click', () => { form.reset(); target.hidden=true; form.querySelectorAll('[data-error]').forEach((el)=>el.textContent=''); });
});
document.querySelector('[data-copy-results]')?.addEventListener('click', async () => { const results=document.querySelector('[data-ssd-results]'); try { await navigator.clipboard.writeText(`${document.title}\n${results.innerText}\n${location.href}`); document.querySelector('[data-copy-status]').textContent='Results copied.'; } catch { document.querySelector('[data-copy-status]').textContent='Copy was unavailable; select the results to copy.'; } });
document.querySelector('[data-print-results]')?.addEventListener('click', () => print());
}
