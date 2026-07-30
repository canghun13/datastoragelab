import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const read = (path) => readFileSync(join(root, path), 'utf8');
const walk = (directory) => readdirSync(join(root, directory), { withFileTypes: true })
  .flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path.replaceAll('\\', '/')];
  });
const publicPages = walk('.').filter((path) => path.endsWith('/index.html') || path === 'index.html')
  .filter((path) => !path.startsWith('partials/'));
const toolPages = publicPages.filter((path) => /^tools\/[^/]+\/[^/]+\/index\.html$/.test(path));
const guidePages = publicPages.filter((path) => /^guides\/[^/]+\/index\.html$/.test(path));
const referencePages = publicPages.filter((path) => /^reference\/[^/]+\/index\.html$/.test(path));
const comparisonPages = publicPages.filter((path) => /^compare\/[^/]+\/index\.html$/.test(path));
const hubPages = [
  'tools/storage-needs/index.html',
  'tools/nas-configuration/index.html',
  'tools/backup-planning/index.html',
  'tools/network-performance/index.html',
  'tools/cost-power/index.html',
  'guides/index.html',
  'reference/index.html',
  'compare/index.html',
];
const basicPages = ['index.html', 'tools/index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html'];
const expectedCounts = { public: 63, tool: 33, guide: 10, reference: 4, comparison: 3, hub: 8, basic: 5 };

check(publicPages.length === expectedCounts.public, `Expected 63 public pages, found ${publicPages.length}`);
check(toolPages.length === expectedCounts.tool, `Expected 33 tools, found ${toolPages.length}`);
check(guidePages.length === expectedCounts.guide, `Expected 10 guides, found ${guidePages.length}`);
check(referencePages.length === expectedCounts.reference, `Expected 4 references, found ${referencePages.length}`);
check(comparisonPages.length === expectedCounts.comparison, `Expected 3 comparisons, found ${comparisonPages.length}`);
check(hubPages.every((path) => publicPages.includes(path)), 'One or more expected hubs are missing');
check(basicPages.every((path) => publicPages.includes(path)), 'One or more expected basic pages are missing');

const stripHtml = (html) => html
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:amp|nbsp|quot|apos|lt|gt);/gi, ' ')
  .replace(/&#\d+;|&#x[\da-f]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const words = (text) => text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g) ?? [];
const section = (html, attribute) => html.match(new RegExp(`<section\\b[^>]*${attribute}[^>]*>([\\s\\S]*?)<\\/section>`, 'i'))?.[1] ?? '';

const faviconDeclarations = new Set();
for (const path of publicPages) {
  const html = read(path);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const icons = [...head.matchAll(/<link\b[^>]*\brel=["']icon["'][^>]*>/gi)].map((match) => match[0]);
  check(icons.length === 1, `${path}: expected one favicon declaration, found ${icons.length}`);
  if (icons.length === 1) {
    faviconDeclarations.add(icons[0].replace(/\s+/g, ' ').trim());
    const href = icons[0].match(/\bhref=["']([^"']+)["']/i)?.[1] ?? '';
    const type = icons[0].match(/\btype=["']([^"']+)["']/i)?.[1] ?? '';
    check(href === '/assets/favicon.svg', `${path}: unexpected favicon href ${href || '(empty)'}`);
    check(type === 'image/svg+xml', `${path}: favicon MIME type must be image/svg+xml`);
  }
  check(!/TODO|Lorem ipsum|coming soon|placeholder text|unconfirmed/i.test(html), `${path}: placeholder or unfinished wording found`);
}
check(faviconDeclarations.size === 1, `Favicon declarations are inconsistent (${faviconDeclarations.size} variants)`);
check(existsSync(join(root, 'assets/favicon.svg')), 'assets/favicon.svg is missing');
const favicon = existsSync(join(root, 'assets/favicon.svg')) ? read('assets/favicon.svg') : '';
check(/^<svg\b/i.test(favicon.trim()) && /xmlns=["']http:\/\/www\.w3\.org\/2000\/svg["']/i.test(favicon) && /viewBox=/i.test(favicon), 'favicon.svg is not a valid standalone SVG');

const requiredToolSections = ['decide', 'prepare', 'method', 'interpret', 'example', 'limits', 'next'];
const toolWordCounts = [];
const paragraphOwners = new Map();
const ngramOwners = new Map();
for (const path of toolPages) {
  const html = read(path);
  const content = section(html, 'data-tool-content');
  check(Boolean(content), `${path}: missing data-tool-content section`);
  const visible = stripHtml(content);
  const count = words(visible).length;
  toolWordCounts.push({ path, count });
  check(count >= 400, `${path}: explanatory content has ${count} words; minimum is 400`);
  for (const name of requiredToolSections) {
    const block = content.match(new RegExp(`<div\\b[^>]*data-content-section=["']${name}["'][^>]*>([\\s\\S]*?)<\\/div>`, 'i'))?.[1] ?? '';
    check(words(stripHtml(block)).length >= 25, `${path}: ${name} section is missing or too short`);
  }
  const nextBlock = content.match(/<div\b[^>]*data-content-section=["']next["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] ?? '';
  check(/<a\b[^>]*href=["']\//i.test(nextBlock), `${path}: next steps need an internal link`);
  for (const match of content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const paragraph = stripHtml(match[1]).toLowerCase();
    if (words(paragraph).length < 12) continue;
    const owner = paragraphOwners.get(paragraph);
    check(!owner || owner === path, `${path}: duplicate paragraph also used by ${owner}`);
    paragraphOwners.set(paragraph, path);
    const tokens = words(paragraph);
    for (let index = 0; index <= tokens.length - 12; index++) {
      const gram = tokens.slice(index, index + 12).join(' ');
      const gramOwner = ngramOwners.get(gram);
      check(!gramOwner || gramOwner === path, `${path}: repeated 12-word sequence also used by ${gramOwner}: "${gram}"`);
      ngramOwners.set(gram, path);
    }
  }
}
const toolAverage = toolWordCounts.length
  ? toolWordCounts.reduce((sum, item) => sum + item.count, 0) / toolWordCounts.length
  : 0;
check(toolAverage >= 550, `Tool explanatory content averages ${toolAverage.toFixed(1)} words; minimum average is 550`);

const requiredHubSections = ['start', 'workflow', 'prepare', 'next'];
for (const path of hubPages) {
  const content = section(read(path), 'data-hub-content');
  check(Boolean(content), `${path}: missing data-hub-content section`);
  check(words(stripHtml(content)).length >= 220, `${path}: hub guidance is too short`);
  for (const name of requiredHubSections) {
    const block = content.match(new RegExp(`<div\\b[^>]*data-hub-section=["']${name}["'][^>]*>([\\s\\S]*?)<\\/div>`, 'i'))?.[1] ?? '';
    check(words(stripHtml(block)).length >= 20, `${path}: hub ${name} section is missing or too short`);
  }
}

for (const path of [...guidePages, ...referencePages, ...comparisonPages, ...basicPages]) {
  const html = read(path);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  check(words(stripHtml(main)).length >= 70, `${path}: visible main content appears thin`);
  check(!/<(?:section|article|div)\b[^>]*>\s*<\/(?:section|article|div)>/i.test(main), `${path}: empty content block found`);
}

if (failures.length) {
  console.error(`CONTENT QA FAILED (${failures.length})`);
  failures.slice(0, 200).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 200) console.error(`- ... ${failures.length - 200} more`);
  const counts = toolWordCounts.map((item) => item.count);
  console.error(`Tool word counts: min ${counts.length ? Math.min(...counts) : 0}, average ${toolAverage.toFixed(1)}, max ${counts.length ? Math.max(...counts) : 0}`);
  process.exit(1);
}

const minimumTool = toolWordCounts.reduce((minimum, item) => item.count < minimum.count ? item : minimum, toolWordCounts[0]);
console.log(`CONTENT QA PASSED: ${publicPages.length} pages; ${toolPages.length} tools, ${guidePages.length} guides, ${referencePages.length} references, ${comparisonPages.length} comparisons, ${hubPages.length} hubs, ${basicPages.length} basics.`);
console.log(`Tool explanatory content: minimum ${minimumTool.count} words (${relative(root, join(root, minimumTool.path))}), average ${toolAverage.toFixed(1)} words.`);
console.log('Favicon declarations, required content sections, placeholders, empty blocks, duplicate paragraphs, and repeated 12-word sequences passed.');
