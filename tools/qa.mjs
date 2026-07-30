import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { calculatePlan } from '../assets/js/planner-core.mjs';
import { calculateTool } from '../assets/js/phase2-tools.mjs';
import { calculateNasTool } from '../assets/js/phase3-tools.mjs';
import { calculateBackup } from '../assets/js/backup-tools.mjs';

const root = process.cwd();
const baseUrl = 'https://datastoragelab.com';
const expected = [
  'index.html', 'tools/index.html',
  'tools/storage-needs/index.html', 'tools/storage-needs/home-storage-backup-planner/index.html', 'tools/storage-needs/annual-storage-growth-calculator/index.html', 'tools/storage-needs/creator-media-storage-planner/index.html', 'tools/storage-needs/computer-backup-storage-planner/index.html', 'tools/storage-needs/small-office-storage-planner/index.html', 'tools/storage-needs/media-library-storage-planner/index.html',
  'tools/nas-configuration/index.html', 'tools/nas-configuration/nas-bay-drive-capacity-planner/index.html', 'tools/nas-configuration/raid-capacity-calculator/index.html', 'tools/nas-configuration/raid-protection-decision-tool/index.html', 'tools/nas-configuration/nas-expansion-headroom-planner/index.html', 'tools/nas-configuration/hdd-vs-ssd-storage-planner/index.html', 'tools/nas-configuration/cmr-vs-smr-suitability-checker/index.html',
  'tools/backup-planning/index.html', 'tools/backup-planning/3-2-1-backup-plan-generator/index.html', 'tools/backup-planning/local-cloud-hybrid-backup-selector/index.html', 'tools/backup-planning/backup-retention-calculator/index.html', 'tools/backup-planning/snapshot-storage-planner/index.html', 'tools/backup-planning/offsite-backup-capacity-planner/index.html', 'tools/backup-planning/backup-frequency-selector/index.html', 'tools/backup-planning/recovery-time-estimator/index.html', 'tools/backup-planning/backup-verification-schedule-planner/index.html',
  'guides/how-much-nas-storage-do-i-need/index.html', 'guides/raid-is-not-a-backup/index.html', 'guides/cmr-vs-smr-for-nas/index.html', 'guides/nas-drive-replacement-planning/index.html', 'guides/hdd-vs-ssd-for-bulk-storage/index.html', 'guides/backup-retention-basics/index.html', 'guides/3-2-1-backup-explained/index.html', 'guides/local-backup-vs-offsite-backup/index.html', 'guides/snapshots-vs-backups/index.html',
  'reference/tb-vs-tib/index.html', 'reference/storage-raid-capacity-formulas/index.html', 'compare/2-bay-vs-4-bay-nas/index.html', 'compare/nas-vs-cloud-for-family-photos/index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html'
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
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) { const target = match[1]; if (/^(https?:|mailto:|tel:|#|data:)/.test(target) || target.includes('#')) continue; const diskPath = target.startsWith('/') ? (target.endsWith('/') ? join(root, target.slice(1), 'index.html') : join(root, target.slice(1))) : join(root, relativePath.includes('/') ? relativePath.slice(0, relativePath.lastIndexOf('/')) : '', target); check(existsSync(diskPath), `${relativePath}: missing internal target ${target}`); }
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
for (const path of expected.filter((page) => /storage-needs\/(annual|creator|computer|small-office|media-library)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of expected.filter((page) => /nas-configuration\/(nas-bay|raid-capacity|raid-protection|nas-expansion|hdd-vs|cmr-vs)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of expected.filter((page) => /backup-planning\/(3-2-1|local-cloud|backup-retention|snapshot|offsite|backup-frequency|recovery-time|backup-verification)/.test(page))) { const html = file(path); check(/data-copy-results/.test(html) && /data-print-results/.test(html) && /data-reset-tool/.test(html), `${path}: Copy, Print, or Reset missing`); }
for (const path of ['contact/index.html','privacy/index.html']) check(/mailto:canghun13@naver\.com/.test(file(path)), `${path}: confirmed contact email missing`);
if (failures.length) { console.error(`QA FAILED (${failures.length})`); failures.forEach((failure) => console.error(`- ${failure}`)); process.exit(1); }
console.log(`QA PASSED: ${expected.length} public HTML pages; metadata, links, sitemap, GA4, JSON-LD, JavaScript, 57 Phase 2/3/4 calculations, Phase 1 regression, and contact checks passed.`);
