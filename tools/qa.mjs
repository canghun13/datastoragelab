import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { calculatePlan } from '../assets/js/planner-core.mjs';

const root = process.cwd();
const expected = [
  'index.html', 'tools/index.html', 'tools/storage-needs/index.html',
  'tools/storage-needs/home-storage-backup-planner/index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html'
];
const baseUrl = 'https://datastoragelab.com';
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const file = (path) => readFileSync(join(root, path), 'utf8');
const allFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const target = join(directory, entry.name);
  return entry.isDirectory() ? allFiles(target) : [target];
});
const publicHtml = allFiles(root).filter((path) => path.endsWith('.html') && !relative(root, path).startsWith('partials'))
  .map((path) => relative(root, path).replace(/\\/g, '/')).sort();

check(JSON.stringify(publicHtml) === JSON.stringify([...expected].sort()), `Expected exactly seven public HTML pages, found: ${publicHtml.join(', ')}`);
const titles = [], descriptions = [], canonicals = [];
for (const relativePath of expected) {
  const html = file(relativePath);
  check(!/TODO|Lorem ipsum|placeholder text|href=["']#["']/i.test(html), `${relativePath}: placeholder, TODO, or empty anchor found`);
  check(!/�/.test(html), `${relativePath}: encoding replacement character found`);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1];
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  check(Boolean(title), `${relativePath}: missing title`); check(Boolean(description), `${relativePath}: missing description`); check(Boolean(canonical), `${relativePath}: missing canonical`);
  check(canonical === `${baseUrl}/${relativePath === 'index.html' ? '' : relativePath.replace(/index\.html$/, '')}`, `${relativePath}: incorrect canonical`);
  titles.push(title); descriptions.push(description); canonicals.push(canonical);
  check((html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length === 1, `${relativePath}: requires exactly one H1`);
  check((html.match(/googletagmanager\.com\/gtag\/js\?id=G-Z7QV39WJ35/g) ?? []).length === 1, `${relativePath}: GA4 missing or duplicated`);
  check((html.match(/gtag\('config','G-Z7QV39WJ35'\)/g) ?? []).length === 1, `${relativePath}: GA4 config missing or duplicated`);
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  check(new Set(ids).size === ids.length, `${relativePath}: duplicate HTML id`);
  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { check(false, `${relativePath}: invalid JSON-LD`); }
  }
  check(/<script\s+type=["']application\/ld\+json["']>/.test(html), `${relativePath}: JSON-LD missing`);
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const target = match[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(target)) continue;
    if (target.includes('#')) continue;
    let diskPath;
    if (target.startsWith('/')) diskPath = target.endsWith('/') ? join(root, target.slice(1), 'index.html') : join(root, target.slice(1));
    else diskPath = join(root, relativePath.includes('/') ? relativePath.slice(0, relativePath.lastIndexOf('/')) : '', target);
    check(existsSync(diskPath), `${relativePath}: missing internal target ${target}`);
  }
}
for (const [name, values] of [['title', titles], ['meta description', descriptions], ['canonical', canonicals]]) check(new Set(values).size === values.length, `Duplicate ${name}`);

const sitemap = file('sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = expected.map((path) => `${baseUrl}/${path === 'index.html' ? '' : path.replace(/index\.html$/, '')}`);
check(sitemapUrls.length === 7 && new Set(sitemapUrls).size === 7, 'Sitemap must contain seven unique URLs');
check(JSON.stringify([...sitemapUrls].sort()) === JSON.stringify([...expectedUrls].sort()), 'Sitemap URLs do not match public pages');
check(file('robots.txt').includes('Sitemap: https://datastoragelab.com/sitemap.xml'), 'robots.txt sitemap URL is incorrect');
check(file('CNAME').trim() === 'datastoragelab.com', 'CNAME must be datastoragelab.com');

for (const jsPath of allFiles(join(root, 'assets', 'js')).filter((path) => /\.m?js$/.test(path))) {
  const result = spawnSync(process.execPath, ['--check', jsPath], { encoding: 'utf8' });
  check(result.status === 0, `JavaScript syntax error in ${relative(root, jsPath)}: ${result.stderr}`);
}

const baseInput = { dataSize: 4, growthRate: 20, years: 5, devices: 3, users: 2, importantData: 85, retention: 'balanced', localCopies: '1', offsite: 'yes', tolerance: 'single', budget: 'balanced', uploadMbps: 20, lanMbps: '1000', headroom: 25 };
const normal = calculatePlan(baseInput).plan;
check(normal?.projectedTb > 4 && normal?.usableTb > normal?.projectedTb && normal?.localBackupTb > 0, 'Case 1 normal household calculation failed');
check(normal?.array.bays >= 2 && normal?.array.minimumDriveTb >= 4, 'Case 1 array recommendation failed');
const creator = calculatePlan({ ...baseInput, dataSize: 12, growthRate: 55, years: 5, devices: 5, users: 3, lanMbps: '2500', tolerance: 'single', budget: 'flexible' }).plan;
check(creator?.array.bays >= 4 && creator?.network.tier.includes('2.5GbE'), 'Case 2 creator recommendation failed');
const limited = calculatePlan({ ...baseInput, budget: 'starter', offsite: 'no', tolerance: 'none' }).plan;
check(limited?.budgetText.includes('staged') && limited?.array.failureText.includes('independent backups'), 'Case 3 limited-budget warning failed');
const slowUpload = calculatePlan({ ...baseInput, dataSize: 30, growthRate: 30, uploadMbps: 3, offsite: 'yes' }).plan;
check(slowUpload?.uploadHours > 168 && slowUpload?.uploadWarning.includes('seeded'), 'Case 4 slow-upload warning failed');
for (const candidate of [{ ...baseInput, dataSize: .05, growthRate: 0, years: 1 }, { ...baseInput, dataSize: 5000, growthRate: 200, years: 15 }, { ...baseInput, dataSize: -1 }, { ...baseInput, dataSize: 'nope' }, { ...baseInput, uploadMbps: 0 }]) {
  const output = calculatePlan(candidate);
  check(output.plan || Object.keys(output.errors).length > 0, 'Case 5 boundary validation returned no result or error');
}

if (failures.length) { console.error(`QA FAILED (${failures.length})`); failures.forEach((failure) => console.error(`- ${failure}`)); process.exit(1); }
console.log('QA PASSED');
console.log('Public HTML: 7; titles/descriptions/canonicals unique; links, sitemap, GA4, JSON-LD, JS syntax, encoding, and calculator cases passed.');
