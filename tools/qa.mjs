import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { calculatePlan } from '../assets/js/planner-core.mjs';
import { calculateTool } from '../assets/js/phase2-tools.mjs';
import { calculateNasTool } from '../assets/js/phase3-tools.mjs';
import { calculateBackup } from '../assets/js/backup-tools.mjs';
import { calculateNetwork } from '../assets/js/network-tools.mjs';
import { calculateCost } from '../assets/js/cost-tools.mjs';
import { calculateLifespan, calculateConverter, calculateCache, calculateVm, calculateRemaining } from '../assets/js/ssd-endurance-tools.mjs';

const root = process.cwd();
const baseUrl = 'https://datastoragelab.com';
const expected = [
  'index.html', 'tools/index.html',
  'tools/storage-needs/index.html', 'tools/storage-needs/home-storage-backup-planner/index.html', 'tools/storage-needs/annual-storage-growth-calculator/index.html', 'tools/storage-needs/creator-media-storage-planner/index.html', 'tools/storage-needs/computer-backup-storage-planner/index.html', 'tools/storage-needs/small-office-storage-planner/index.html', 'tools/storage-needs/media-library-storage-planner/index.html',
  'tools/nas-configuration/index.html', 'tools/nas-configuration/nas-bay-drive-capacity-planner/index.html', 'tools/nas-configuration/raid-capacity-calculator/index.html', 'tools/nas-configuration/raid-protection-decision-tool/index.html', 'tools/nas-configuration/nas-expansion-headroom-planner/index.html', 'tools/nas-configuration/hdd-vs-ssd-storage-planner/index.html', 'tools/nas-configuration/cmr-vs-smr-suitability-checker/index.html',
  'tools/backup-planning/index.html', 'tools/backup-planning/3-2-1-backup-plan-generator/index.html', 'tools/backup-planning/local-cloud-hybrid-backup-selector/index.html', 'tools/backup-planning/backup-retention-calculator/index.html', 'tools/backup-planning/snapshot-storage-planner/index.html', 'tools/backup-planning/offsite-backup-capacity-planner/index.html', 'tools/backup-planning/backup-frequency-selector/index.html', 'tools/backup-planning/recovery-time-estimator/index.html', 'tools/backup-planning/backup-verification-schedule-planner/index.html',
  'tools/network-performance/index.html', 'tools/network-performance/cloud-backup-transfer-time-calculator/index.html', 'tools/network-performance/local-network-transfer-time-calculator/index.html', 'tools/network-performance/backup-window-calculator/index.html', 'tools/network-performance/network-tier-selector/index.html', 'tools/network-performance/concurrent-user-bandwidth-planner/index.html', 'tools/network-performance/video-editing-network-planner/index.html',
  'tools/cost-power/index.html', 'tools/cost-power/nas-vs-cloud-five-year-cost-calculator/index.html', 'tools/cost-power/das-vs-nas-cost-calculator/index.html', 'tools/cost-power/drive-cost-per-usable-tb-calculator/index.html', 'tools/cost-power/storage-electricity-cost-calculator/index.html', 'tools/cost-power/drive-replacement-reserve-calculator/index.html', 'tools/cost-power/ups-size-runtime-calculator/index.html', 'tools/cost-power/full-storage-system-budget-planner/index.html',
  'tools/ssd-endurance/index.html', 'tools/ssd-endurance/ssd-endurance-lifespan-calculator/index.html', 'tools/ssd-endurance/tbw-dwpd-converter/index.html', 'tools/ssd-endurance/nas-ssd-cache-endurance-planner/index.html', 'tools/ssd-endurance/vm-container-ssd-endurance-planner/index.html', 'tools/ssd-endurance/ssd-remaining-endurance-planner/index.html',
  'guides/index.html', 'guides/how-much-nas-storage-do-i-need/index.html', 'guides/raid-is-not-a-backup/index.html', 'guides/cmr-vs-smr-for-nas/index.html', 'guides/nas-drive-replacement-planning/index.html', 'guides/hdd-vs-ssd-for-bulk-storage/index.html', 'guides/backup-retention-basics/index.html', 'guides/3-2-1-backup-explained/index.html', 'guides/local-backup-vs-offsite-backup/index.html', 'guides/snapshots-vs-backups/index.html', 'guides/how-to-size-a-ups-for-a-nas/index.html', 'guides/ssd-endurance-for-nas-cache-vms-backups/index.html',
  'reference/index.html', 'reference/tb-vs-tib/index.html', 'reference/storage-raid-capacity-formulas/index.html', 'reference/backup-transfer-time-bandwidth/index.html', 'reference/ups-watts-va-runtime/index.html', 'compare/index.html', 'compare/2-bay-vs-4-bay-nas/index.html', 'compare/nas-vs-cloud-for-family-photos/index.html', 'compare/2-5gbe-vs-10gbe-for-nas/index.html', 'compare/consumer-vs-nas-vs-enterprise-ssd-endurance/index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html'
];
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const file = (path) => readFileSync(join(root, path), 'utf8');
function allFiles(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? allFiles(join(dir, entry.name)) : [join(dir, entry.name)]); }

for (const relativePath of expected) {
  check(existsSync(join(root, relativePath)), `${relativePath}: expected public page missing`);
  const html = file(relativePath);
  check(!/TODO|Lorem ipsum|placeholder text|href=["']#["']/i.test(html), `${relativePath}: placeholder, TODO, or empty anchor found`);
  check(!/�/.test(html), `${relativePath}: encoding replacement character found`);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1];
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  check(Boolean(title) && Boolean(description) && Boolean(canonical), `${relativePath}: missing metadata`);
  check(canonical === `${baseUrl}/${relativePath === 'index.html' ? '' : relativePath.replace(/index\.html$/, '')}`, `${relativePath}: incorrect canonical`);
  check((html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length === 1, `${relativePath}: requires exactly one H1`);
  check((html.match(/googletagmanager\.com\/gtag\/js\?id=G-Z7QV39WJ35/g) ?? []).length === 1, `${relativePath}: GA4 missing or duplicated`);
  check((html.match(/gtag\('config','G-Z7QV39WJ35'\)/g) ?? []).length === 1, `${relativePath}: GA4 config missing or duplicated`);
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]); check(new Set(ids).size === ids.length, `${relativePath}: duplicate HTML id`);
  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) { try { JSON.parse(match[1]); } catch { check(false, `${relativePath}: invalid JSON-LD`); } }
  check(/<script\s+type=["']application\/ld\+json["']>/.test(html), `${relativePath}: JSON-LD missing`);
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) { const target = match[1]; if (/^(https?:|mailto:|tel:|#|data:)/.test(target) || target.includes('#')) continue; const fileTarget = target.split('?')[0]; const diskPath = fileTarget.startsWith('/') ? (fileTarget.endsWith('/') ? join(root, fileTarget.slice(1), 'index.html') : join(root, fileTarget.slice(1))) : join(root, relativePath.includes('/') ? relativePath.slice(0, relativePath.lastIndexOf('/')) : '', fileTarget); check(existsSync(diskPath), `${relativePath}: missing internal target ${target}`); }
}
const values = (pattern) => expected.map((path) => file(path).match(pattern)?.[1]);
for (const [label, pattern] of [['title', /<title>([^<]+)<\/title>/i], ['description', /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i], ['canonical', /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i]]) { const value = values(pattern); check(new Set(value).size === value.length, `Duplicate ${label}`); }
const sitemapUrls = [...file('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = expected.map((path) => `${baseUrl}/${path === 'index.html' ? '' : path.replace(/index\.html$/, '')}`);
check(JSON.stringify([...sitemapUrls].sort()) === JSON.stringify([...expectedUrls].sort()), 'Sitemap URLs do not match public pages');
check(file('robots.txt').includes('Sitemap: https://datastoragelab.com/sitemap.xml'), 'robots.txt sitemap URL is incorrect'); check(file('CNAME').trim() === 'datastoragelab.com', 'CNAME must be datastoragelab.com');
for (const jsPath of allFiles(join(root, 'assets', 'js')).filter((path) => /\.m?js$/.test(path))) { const result = spawnSync(process.execPath, ['--check', jsPath], { encoding: 'utf8' }); check(result.status === 0, `JavaScript syntax error in ${relative(root, jsPath)}: ${result.stderr}`); }
const baseInput = { dataSize: 4, growthRate: 20, years: 5, devices: 3, users: 2, importantData: 85, retention: 'balanced', localCopies: '1', offsite: 'yes', tolerance: 'single', budget: 'balanced', uploadMbps: 20, lanMbps: '1000', headroom: 25 };
check(calculatePlan(baseInput).plan?.usableTb > 4, 'Phase 1 normal household calculation failed'); check(calculatePlan({ ...baseInput, dataSize: -1 }).errors.dataSize, 'Phase 1 invalid input validation failed');
const cases = [
  ['growth', { current: 4, rate: 20, years: 5, headroom: 25, method: 'percent', amount: 0 }], ['growth', { current: .01, rate: 0, years: 1, headroom: 0, method: 'amount', amount: 0 }], ['growth', { current: 1000, rate: 50, years: 10, headroom: 50, method: 'percent', amount: 0 }],
  ['creator', { current: 120, work: 30, rate: 15, years: 5, headroom: 25, copies: 2, mode: 'video' }], ['creator', { current: 1, work: 1, rate: 0, years: 1, headroom: 0, copies: 1, mode: 'photo' }], ['creator', { current: 500, work: 100, rate: 30, years: 10, headroom: 50, copies: 3, mode: 'video' }],
  ['backup', { current: .8, work: 3, rate: 8, years: 3, retention: 12, headroom: 30 }], ['backup', { current: .01, work: 1, rate: 0, years: 1, retention: 1, headroom: 0 }], ['backup', { current: 10, work: 20, rate: 20, years: 5, retention: 36, headroom: 50 }],
  ['office', { current: 8, work: 10, concurrent: 5, rate: 20, years: 5, headroom: 30 }], ['office', { current: .01, work: 1, concurrent: 1, rate: 0, years: 1, headroom: 0 }], ['office', { current: 100, work: 50, concurrent: 20, rate: 50, years: 10, headroom: 50 }],
  ['media', { current: 3500, work: 600, rate: 0, years: 5, headroom: 25, copies: 2 }], ['media', { current: 1, work: 0, rate: 0, years: 1, headroom: 0, copies: 1 }], ['media', { current: 50000, work: 5000, rate: 0, years: 10, headroom: 50, copies: 3 }]
];
for (const [kind, input] of cases) check(calculateTool(kind, input).result, `${kind}: valid calculation failed`);
for (const kind of ['growth','creator','backup','office','media']) check(Object.keys(calculateTool(kind, { current: -1, rate: 0, years: 1, headroom: 0, work: 1, retention: 1, copies: 1, concurrent: 1 }).errors).length, `${kind}: invalid input was accepted`);
const nasCases = [
  ['bay',{required:16,headroom:25,ceiling:24,protection:'single'}],['bay',{required:1,headroom:0,ceiling:4,protection:'mirror'}],['bay',{required:100,headroom:50,ceiling:100,protection:'dual'}],
  ['raid',{layout:'mirror',drives:2,drive:8}],['raid',{layout:'single',drives:4,drive:12}],['raid',{layout:'dual',drives:6,drive:20}],
  ['protection',{drives:2,need:'capacity',backup:'yes'}],['protection',{drives:4,need:'availability',backup:'no'}],['protection',{drives:8,need:'capacity',backup:'yes'}],
  ['expansion',{current:12,rate:20,usable:24,free:1,drive:12}],['expansion',{current:.1,rate:0,usable:10,free:0,drive:4}],['expansion',{current:50,rate:50,usable:100,free:4,drive:24}],
  ['media',{capacity:20,active:20,performance:'balanced',noise:'moderate',budget:'balanced'}],['media',{capacity:1,active:100,performance:'high',noise:'low',budget:'flexible'}],['media',{capacity:100,active:1,performance:'low',noise:'high',budget:'limited'}],
  ['cmr',{array:'yes',writes:'high',rebuild:'important',docs:'yes'}],['cmr',{array:'no',writes:'low',rebuild:'not-important',docs:'yes'}],['cmr',{array:'no',writes:'low',rebuild:'not-important',docs:'no'}]
];
for (const [kind,input] of nasCases) check(calculateNasTool(kind,input).result, `${kind}: Phase 3 valid calculation failed`);
for (const kind of ['bay','raid','expansion','media']) check(Object.keys(calculateNasTool(kind,{required:-1,current:-1,rate:-1,years:1,headroom:0,ceiling:1,drives:1,drive:1,capacity:-1,active:1,free:0,usable:1,work:1,layout:'mirror',protection:'single',need:'capacity',backup:'yes',performance:'low',noise:'low',budget:'limited',array:'yes',writes:'low',rebuild:'important',docs:'yes'}).errors).length, `${kind}: Phase 3 invalid input was accepted`);
const backupTools = [
  ['3-2-1 plan generator', 'topology'], ['local, cloud, or hybrid selector', 'topology'], ['retention calculator', 'retention'], ['snapshot planner', 'retention'],
  ['offsite capacity planner', 'offsite'], ['frequency selector', 'frequency'], ['recovery time estimator', 'recovery'], ['verification schedule planner', 'verify']
];
for (const [label, kind] of backupTools) {
  const standard = { data: 4, rate: 5, period: 12, copies: 2, speed: 100 };
  const minimal = { data: .01, rate: 0, period: 1, copies: 1, speed: 1 };
  const large = { data: 1000, rate: 50, period: 120, copies: 3, speed: 10000 };
  for (const input of [standard, minimal, large]) check(calculateBackup(kind, input).result, `${label}: Phase 4 valid calculation failed`);
  check(Object.keys(calculateBackup(kind, { ...standard, data: -1, speed: 0 }).errors).length, `${label}: Phase 4 invalid input was accepted`);
}
const networkTools = [
  ['cloud transfer', 'cloud', { data: 4, upload: 40, download: 300, efficiency: 75, throttle: 0, active: 12 }],
  ['local transfer', 'local', { data: 2, link: 1000, source: 900, destination: 800, efficiency: 80 }],
  ['backup window', 'window', { data: .25, window: 8, source: 800, destination: 700, link: 1000, overhead: 20 }],
  ['network tier', 'tier', { data: 4, users: 2, perUser: 600, storage: 2000, efficiency: 80 }],
  ['concurrent bandwidth', 'concurrent', { data: 6, users: 8, ratio: 50, perUser: 250, uplink: 2500, efficiency: 80 }],
  ['video editing', 'video', { data: 3, bitrate: 400, streams: 2, editors: 2, storage: 3000, headroom: 30 }]
];
for (const [label, kind, input] of networkTools) {
  for (const variation of [input, { ...input, data: .01 }, { ...input, data: 1000 }]) check(calculateNetwork(kind, variation).result, `${label}: Phase 5 valid calculation failed`);
  check(Object.keys(calculateNetwork(kind, { ...input, data: -1, upload: 0, link: 0, window: 0 }).errors).length, `${label}: Phase 5 invalid input was accepted`);
}
const costTools=[['nascloud',{a:900,b:1200,c:180,d:45,e:250}],['dasnas',{a:300,b:700,c:1400,d:2,e:250}],['drive',{a:220,b:12,c:4,d:1,e:10}],['electricity',{a:75,b:42,c:8,d:.18,e:5}],['reserve',{a:4,b:220,c:2,d:5,e:20}],['ups',{a:120,b:30,c:.7,d:15,e:80}],['budget',{a:900,b:1000,c:500,d:450,e:240}]];
for(const [kind,input] of costTools){for(const value of [input,{...input,a:1},{...input,a:10000}])check(calculateCost(kind,value).result,`${kind}: final cost calculation failed`);check(Object.keys(calculateCost(kind,{...input,a:-1}).errors).length,`${kind}: invalid cost input was accepted`);}
const zeroCostInputs={nascloud:{a:0,b:1200,c:180,d:45,e:250},dasnas:{a:300,b:700,c:1400,d:0,e:250},drive:{a:220,b:0,c:4,d:1,e:10},electricity:{a:0,b:0,c:8,d:.18,e:5},reserve:{a:4,b:220,c:2,d:0,e:20},ups:{a:120,b:30,c:0,d:15,e:80},budget:{a:0,b:0,c:0,d:0,e:240}};
for(const [kind,input] of Object.entries(zeroCostInputs))check(Object.keys(calculateCost(kind,input).errors).length,`${kind}: required zero cost input was accepted`);
const enduranceCases = [
  ['lifespan', calculateLifespan, {capacity:1000,capacityUnit:'GB',rated:600,enduranceUnit:'TBW',warranty:5,writes:120,existing:0,low:1.1,base:1.5,high:2,horizon:5,reserve:20}, 'result'],
  ['converter', calculateConverter, {capacity:1000,capacityUnit:'GB',years:5,metric:'TBW',value:600,waf:1.5}, 'result'],
  ['cache', calculateCache, {mode:'measured',measured:200,ingest:0,cachePercent:0,layout:'mirror',drives:2,shares:'50,50',capacity:1000,rated:1200,existing:0,waf:1.5,years:5,reserve:20}, 'result'],
  ['vm', calculateVm, {vms:4,perVm:20,containers:30,logs:40,snapshots:25,copies:2,shares:'50,50',capacity:1000,rated:1200,existing:0,waf:1.7,years:5}, 'result'],
  ['remaining', calculateRemaining, {rated:600,capacity:1000,unit:'tb',previous:100,current:115,days:30,smart:20,threshold:80,growth:10,lead:60}, 'result']
];
for (const [name, fn, input, expectedKey] of enduranceCases) {
  check(fn(input)[expectedKey], `${name}: normal calculation failed`);
  const invalidInput = name === 'converter' ? {...input, value:-1} : {...input, rated:-1};
  check(fn(invalidInput).errors, `${name}: negative rating validation failed`);
  check(fn({...input, capacity:500}).errors || fn({...input, capacity:500})[expectedKey], `${name}: capacity variation failed`);
  check(fn({...input, existing:0, waf:2}).errors || fn({...input, existing:0, waf:2})[expectedKey], `${name}: sensitivity variation failed`);
  check(fn({...input, years:1, days:1}).errors || fn({...input, years:1, days:1})[expectedKey], `${name}: boundary variation failed`);
}
for (const path of expected.filter((page) => /storage-needs\/(annual|creator|computer|small-office|media-library)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of expected.filter((page) => /nas-configuration\/(nas-bay|raid-capacity|raid-protection|nas-expansion|hdd-vs|cmr-vs)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of expected.filter((page) => /backup-planning\/(3-2-1|local-cloud|backup-retention|snapshot|offsite|backup-frequency|recovery-time|backup-verification)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of expected.filter((page) => /network-performance\/(cloud-backup|local-network|backup-window|network-tier|concurrent-user|video-editing)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of expected.filter((page) => /cost-power\/(nas-vs|das-vs|drive-cost|storage-electricity|drive-replacement|ups-size|full-storage)/.test(page))) check(/data-cost-shell/.test(file(path)), `${path}: cost workbench shell missing`);
check(!/Reserved for future user-managed badge|footer-slot/.test(file('partials/footer.html')+file('index.html')), 'Common badge placeholder remains');
for (const path of ['contact/index.html','privacy/index.html']) check(/mailto:canghun13@naver\.com/.test(file(path)), `${path}: confirmed contact email missing`);
if (failures.length) { console.error(`QA FAILED (${failures.length})`); failures.forEach((failure) => console.error(`- ${failure}`)); process.exit(1); }
console.log(`QA PASSED: ${expected.length} public HTML pages; metadata, links, sitemap, GA4, JSON-LD, JavaScript, 96 calculation cases, Phase 1 regression, badge, and contact checks passed.`);
