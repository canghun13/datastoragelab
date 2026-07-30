# Data Storage Lab — Project Handover

> This file is the operational source of truth for continuing the project from any working environment.
> Read it before changing files, and update it before ending every completed work session.

## 1. Project Identity

| Item | Confirmed value |
|---|---|
| Brand | Data Storage Lab |
| Domain | `datastoragelab.com` |
| Primary URL | `https://datastoragelab.com/` |
| Repository | `https://github.com/canghun13/datastoragelab` |
| Default branch | `main` |
| Language / market | English / global English-speaking users |
| Topic | Home Data, Storage & Backup Planning Tools |
| Stack | GitHub Pages + Cloudflare + static HTML/CSS/Vanilla JS |
| GA4 measurement ID | `G-Z7QV39WJ35` |
| GA4 industry | Computers & Electronics |
| GA4 reporting time zone | South Korea |
| Default currency | USD |
| Contact email | `canghun13@naver.com` |

## 2. Source-of-Truth Order

When information conflicts, use this order:

1. Current remote repository state on `origin/main`
2. Latest committed `handover.md`
3. Current task instructions from the user
4. Existing deployed site behavior
5. Older chat summaries, plans, or assumptions

Do not rely on a machine-specific folder, an uncommitted local copy, browser cache, or memory as the project source of truth.

## 3. Current Status — 2026-07-30

### Completed

- Project name, domain, topic, market, monetization direction, and technical stack are confirmed.
- The complete launch information architecture and phased development plan are fixed in `site-plan.md`.
- The launch inventory is fixed at 63 public pages: 5 foundational pages, 8 hubs, 33 tools/planners, 10 guides, 4 references, and 3 comparison/buying pages.
- The provisional 38-tool list has been audited and de-duplicated to 33 tools through five documented mergers.
- Home Storage & Backup Planner is selected as the first core planner.
- Phase 1 is fixed at seven public pages plus the shared foundation, technical SEO files, analytics integration, structured data, and initial automated/browser QA.
- Phase 1 is implemented and verified: seven public HTML pages, shared static-site components, the Home Storage & Backup Planner, technical SEO files, automated QA, calculation cases, and responsive browser QA.
- GitHub repository and GitHub Pages setup are complete.
- Cloudflare DNS and custom-domain setup are complete.
- Google Analytics is configured with measurement ID `G-Z7QV39WJ35`.
- Google Search Console registration is complete.
- The canonical site address is intended to be `https://datastoragelab.com/`.
- Initial DNS records are configured for GitHub Pages.
- The first operational handover file has been prepared.

### Waiting / External propagation

- HTTPS is currently available on the apex canonical URL and served the latest Phase 1 home page and planner after the Phase 1 push.
- Do not repeatedly change DNS, GitHub Pages custom-domain settings, Cloudflare proxy mode, or HTTPS enforcement after this verification.
- Keep the initial GitHub Pages DNS records in DNS-only mode unless a later documented decision changes this.

### Not started

- Phase 2 Storage Needs specialist tools and supporting guide/reference content
- Phase 3–7 clusters and their remaining public pages

No implementation should be treated as completed unless it is committed, pushed, verified on `origin/main`, and recorded in this file.

## 4. Product Direction

Data Storage Lab is not a collection of isolated RAID calculators.

The intended user flow is:

**User inputs → analysis → recommended configuration → execution steps → equipment specifications and purchasing decision**

The site should connect:

- Current data size and annual growth
- Device and user count
- Retention requirements
- Failure tolerance
- Internet and local-network performance
- Budget
- NAS bay count
- Drive count and minimum capacity
- RAID or protection approach
- Local, cloud, or hybrid backup
- 1GbE, 2.5GbE, or 10GbE networking
- UPS sizing
- Initial and long-term cost
- Required equipment categories and quantities

Results must remain vendor-neutral wherever possible. Recommend specifications and configurations before brands or individual products.

## 5. Initial Scope Target

The initial target is approximately:

- 30–35 practical tools or planners
- 55–65 total public pages
- Tool / Planner: about 60%
- Evergreen Guide / Reference: about 25%
- Buying and comparison content: about 15%

Do not create thin, duplicated, or artificially separated pages merely to reach a page-count target.

### Planned tool clusters

- Storage Needs
- NAS Configuration
- Backup Planning
- Network & Performance
- Cost & Power

The candidate list in the original project plan is provisional until the information-architecture audit is completed. Similar tools may be combined, renamed, or rejected.

## 6. Mandatory Start-of-Work Procedure

Before editing any project file, inspect the repository from the current working directory.

Minimum checks:

```bash
pwd
git remote -v
git branch --show-current
git status --short --branch
git log -5 --oneline --decorate
git rev-parse HEAD
```

Then read:

```bash
cat handover.md
```

On Windows PowerShell, an equivalent file-reading command is acceptable.

### Synchronization rules

1. Confirm that the current folder is the correct repository.
2. Confirm that `origin` is exactly `https://github.com/canghun13/datastoragelab`.
3. Confirm the intended branch, normally `main`.
4. Inspect all tracked and untracked local changes.
5. Preserve every pre-existing local change.
6. Never assume an unfamiliar change is disposable.
7. Run `git fetch origin` only when network access is available and it is safe.
8. Compare local `HEAD` with `origin/main`.
9. Use `git pull --ff-only` only when:
   - the working tree is clean,
   - the branch is not diverged,
   - no local work will be overwritten.
10. If the branch has diverged, stop automatic synchronization and report the exact ahead/behind state.
11. If the working tree is not clean, do not automatically pull, reset, checkout, clean, or stash unknown work.
12. Do not start implementation until the existing state and this handover agree.

Useful comparison commands:

```bash
git fetch origin
git status --short --branch
git rev-list --left-right --count HEAD...origin/main
git log --oneline --decorate --graph -10 --all
```

Interpretation of `git rev-list --left-right --count HEAD...origin/main`:

- `0 0`: synchronized
- positive left value: local commits are ahead
- positive right value: local branch is behind
- both positive: branches have diverged; do not merge or rebase automatically

## 7. Conflict-Prevention Rules

These rules are mandatory because the project may be continued from different working environments.

- Never use machine-specific absolute paths in project files or documentation.
- Never assume the current local copy is the newest copy.
- Never begin work without checking `origin/main`.
- Never overwrite or delete uncommitted changes that were already present.
- Never use `git reset --hard`, `git clean -fd`, forced checkout, or force push.
- Never rewrite published history unless the user explicitly authorizes it.
- Do not amend a commit that may already have been pushed.
- Keep one logical task per commit whenever practical.
- Pull before beginning new work when it is safe; push immediately after a completed, verified task.
- Do not leave completed work only on one machine.
- Do not leave the repository in a knowingly broken state.
- Do not mark a task complete merely because files were edited.
- Record significant decisions, completed work, QA results, current commit, and the next safe task in this file.
- Update `handover.md` in the same commit as the work it describes whenever possible.
- If an urgent handover-only correction is needed, use a separate clearly named documentation commit.
- Preserve user-managed code blocks, badges, tracking snippets, and external-verification markup once they are identified.
- Add comments around protected user-managed areas when necessary and record them under “Protected Areas.”

## 8. Work Execution Rules

- Work only inside the current repository.
- Do not open PyCharm or another external IDE.
- Use terminal commands, direct file editing, automated tests, and browser QA within the current workflow.
- Do not introduce a framework, build system, database, server runtime, or dependency without a documented need and explicit approval.
- Prefer static HTML, CSS, and Vanilla JavaScript.
- Keep shared assets organized and avoid unnecessary duplication.
- Maintain readable URLs and a scalable category structure.
- Each public page must have a unique purpose and search intent.
- Calculators must show assumptions, formulas or logic, limitations, and actionable results.
- Results should support copy and print where the page benefits from them.
- Avoid manufacturer-dependent logic unless the page explicitly compares vendor-specific behavior.
- Use neutral storage units and clearly explain decimal versus binary units where relevant.
- Avoid unverified product prices in permanent calculator logic.
- Do not add daily news or high-maintenance editorial features.

## 9. Analytics and Tracking

Use this GA4 configuration:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QV39WJ35"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QV39WJ35');
</script>
```

Rules:

- Do not change the measurement ID.
- Avoid duplicate GA4 loading.
- Verify the tag on every public HTML page through the chosen shared or direct implementation.
- Any consent-management decision must be recorded separately before altering tracking behavior.

## 10. DNS and Deployment Baseline

Expected Cloudflare DNS baseline:

```text
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    canghun13.github.io
```

Initial proxy status: DNS only.

Deployment rules:

- Production is served through GitHub Pages from the documented branch and repository configuration.
- Preserve the repository `CNAME` file once present.
- The canonical URL is `https://datastoragelab.com/`.
- Do not alternate canonical URLs between apex and `www`.
- Verify both apex and `www` behavior after HTTPS becomes available.
- Treat browser cache and DNS propagation separately from repository correctness.
- When deployment appears stale, compare the deployed response with the committed file before making another code change.

## 11. Required Quality Gates

Before reporting a development phase as complete, run all applicable checks.

### Repository and deployment

- Correct repository and branch
- Working tree status reviewed
- Commit created with a meaningful message
- Push succeeded
- Local `HEAD` equals `origin/main`
- Working tree is clean
- Production deployment checked

### Site-wide technical QA

- Broken internal links
- Missing files and malformed paths
- Duplicate HTML IDs
- JavaScript syntax/runtime errors
- Canonical URL correctness
- Unique title and meta description
- Sitemap coverage and valid URLs
- `robots.txt`
- Structured data / JSON-LD validity
- GA4 presence and no duplicate tag
- `CNAME` preservation
- No accidental `noindex`
- No placeholder content
- No encoding corruption

### Calculator and planner QA

- Formula or decision logic verified independently
- Boundary values tested
- Invalid, zero, negative, missing, and unrealistic inputs handled
- Unit conversions verified
- Decimal/binary storage-unit assumptions stated
- Results explain assumptions and limitations
- Recommended configuration is internally consistent
- Copy and print behavior checked where implemented
- Representative manual calculation cases recorded

### Responsive browser QA

Check representative pages at:

- 1440px
- 1280px
- 1024px
- 768px
- 390px

At minimum, verify:

- Header and navigation
- Home page
- Category or hub page
- Simple calculator
- Complex planner
- Guide
- Reference page
- About, Contact, and Privacy pages
- Tables, forms, result panels, copy/print controls, and footer

## 12. Protected Areas

No protected user-managed HTML area has been recorded yet.

When the user manually adds a badge, verification tag, affiliate block, tracking code, or directory markup:

1. Record the exact file and identifying surrounding markup here.
2. Mark it as user-managed.
3. Do not delete, move, rewrite, restyle, or refactor it unless explicitly instructed.
4. Include it in regression checks.

Protected-area record format:

```text
- File:
- Identifier / surrounding markup:
- Owner: User-managed
- Restrictions:
- Date added:
```

## 13. Decision Log

Record durable architectural, product, infrastructure, or operational decisions here.

| Date | Decision | Reason | Commit |
|---|---|---|---|
| 2026-07-30 | Use GitHub repository state and `handover.md` as the portable operational source of truth. | Prevent inconsistent work across environments. | Initial handover |
| 2026-07-30 | Keep the site static with GitHub Pages, Cloudflare, HTML, CSS, and Vanilla JavaScript. | Low-maintenance, portable deployment. | Initial handover |
| 2026-07-30 | Use GA4 ID `G-Z7QV39WJ35`. | Confirmed analytics property. | Initial handover |
| 2026-07-30 | Wait for HTTPS certificate propagation before changing working DNS settings. | Avoid infrastructure churn during normal certificate issuance. | Initial handover |
| 2026-07-30 | Do not begin page implementation until the information architecture and first development plan are approved. | Prevent duplicate, thin, or poorly sequenced pages. | Initial handover |
| 2026-07-30 | Fix the launch inventory at 63 public pages: 5 foundational, 8 hubs, 33 tools, 10 guides, 4 references, and 3 comparisons. | Gives section indexes real URLs, stays within the 55–65 target, and avoids artificial article counts. | Final task commit: this commit |
| 2026-07-30 | Merge five overlapping candidate pairs or scenarios to reduce 38 provisional tools to 33. | Keeps one page per primary intent and prevents thin calculator variants. | Final task commit: this commit |
| 2026-07-30 | Build Home Storage & Backup Planner first. | Demonstrates the complete input-to-configuration promise and establishes shared models for later clusters. | Final task commit: this commit |
| 2026-07-30 | Limit Phase 1 to B01–B05, H01, and T01 plus explicitly listed foundation files and QA. | Produces a coherent first release without prematurely implementing later clusters. | Final task commit: this commit |
| 2026-07-30 | Keep Phase 1 as a static seven-page GitHub Pages implementation with a development-only local preview helper. | Meets the confirmed HTML/CSS/Vanilla JS stack without adding a production server runtime or dependencies. | Final task commit: this commit |

## 14. Work Log

Add new entries at the top.

### 2026-07-30 — Build Phase 1 public site and core planner

**Starting state**

- Branch: `main`
- Starting commit: `6c5b6bf50dffb28bb153da56f83bd9c015029784`
- `origin/main` status: local `HEAD` matched `origin/main` (`0` ahead, `0` behind)
- Pre-existing local changes: none

**Completed**

- Implemented exactly seven public HTML pages: `/`, `/tools/`, `/tools/storage-needs/`, `/tools/storage-needs/home-storage-backup-planner/`, `/about/`, `/contact/`, and `/privacy/`.
- Added a responsive calm-technical-workbench design system, static fallback header/footer plus reusable partial loading, mobile navigation with Escape support, accessible focus and error states, print styling, and reserved nonintrusive future ad/badge locations.
- Implemented Home Storage & Backup Planner with current data, growth, years, devices, users, important-data share, retention, local/offsite copies, failure tolerance, budget, upload speed, local network, and headroom inputs.
- Implemented planner results for usable capacity, bay count, drive count and minimum drive capacity, RAID/protection, independent backup allocation, network tier, expansion warning, budget range, offsite-upload feasibility, UPS class, equipment checklist, copy, print, reset, and assumptions.
- Added shared decimal-TB growth, capacity, protection, transfer, budget-band, and validation logic in `assets/js/planner-core.mjs`.
- Added canonical, unique metadata, Open Graph tags, GA4 `G-Z7QV39WJ35`, JSON-LD, `robots.txt`, seven-URL `sitemap.xml`, `llms.txt`, and favicon support.
- Added dependency-free QA and calculation verification with `node tools/qa.mjs`; `tools/serve.mjs` is development-only local preview support, not a production runtime.

**Files changed**

- Added public pages under `/`, `about/`, `contact/`, `privacy/`, and `tools/`
- Added `assets/css/styles.css`, `assets/js/components.js`, `assets/js/planner-core.mjs`, `assets/js/planner.js`, and `assets/favicon.svg`
- Added `partials/header.html`, `partials/footer.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `tools/qa.mjs`, and `tools/serve.mjs`
- Updated `README.md` and `handover.md`
- Preserved `CNAME`

**Validation**

- Automated checks: `node tools/qa.mjs` passed. It verifies exactly seven public pages, links, duplicate IDs, unique titles/descriptions/canonicals, apex canonical URLs, GA4 once per page, JSON-LD parsing, sitemap/robots/CNAME, placeholders, encoding, JavaScript syntax, and calculator cases.
- Calculator cases: passed normal household, creator, limited budget, slow upload, and valid/invalid boundary cases.
- Browser QA: passed at 1440, 1280, 1024, 768, and 390 px across all seven pages (35 page/width checks): no horizontal overflow; title, H1, header navigation, and footer present. The planner produced a recommendation, showed field-level invalid-input feedback, copied results, and reset. The mobile menu opened and closed with Escape. Print controls and print CSS are present.
- Production verification: after push, `https://datastoragelab.com/` served “Plan Home Storage and Backup — Data Storage Lab”; `https://datastoragelab.com/tools/storage-needs/home-storage-backup-planner/` served the published planner title and form. HTTPS was available. No DNS, Pages, proxy, HTTPS, GA4-property, or Search Console setting was changed.

**Git**

- Final task commit: this commit
- Push: pushed to `origin/main` as part of this task
- Verified after push: local `HEAD` matched `origin/main`
- Working tree clean after push: yes

**Protected areas**

- None added or changed

**Known issues**

- HTTPS certificate availability or enforcement may still be propagating externally. Do not change Cloudflare DNS, proxy mode, GitHub Pages domain, or HTTPS enforcement to force it.
- No public contact address is confirmed. Contact and Privacy pages state that status rather than inventing an email address or nonfunctional form.
- Phase 1 cost output is a transparent planning band, not a live product quote; final vendor compatibility, drive recording method, actual throughput, and UPS runtime require separate confirmation.

**Next safe task**

- Implement Phase 2 only: T02–T06, G01, and R01 from `site-plan.md`, reusing `planner-core.mjs` rather than duplicating units and growth logic.
- Preserve the seven Phase 1 URLs, `CNAME`, GA4 ID, and current external infrastructure settings. Do not add unplanned URLs, product-price feeds, ad code, affiliate code, a framework, or dependencies.

### 2026-07-30 — Information architecture and Phase 1 plan

**Starting state**

- Branch: `main`
- Starting commit: `ecfe342cd8e66aed00e8b6eba161275060a4c6d4`
- `origin/main` status: local `HEAD` matched `origin/main` (`0` ahead, `0` behind)
- Pre-existing local changes: none
- Environment recovery: the workspace initially contained an empty unborn `master`; configured the required `origin`, fetched, and created local `main` tracking the untouched remote branch before editing

**Completed**

- Defined the product strategy, audience, durable search intents, monetization fit, and specification-first recommendation principle.
- Fixed the exact 63-page launch inventory: 5 foundational pages, 8 hubs, 33 tools/planners, 10 guides, 4 references, and 3 comparison/buying pages.
- Assigned every public page a unique ID, cluster, type, title, final URL, intent, inputs, outputs, action, monetization fit, phase, dependencies, and implementation notes.
- Audited all 38 provisional tools and documented the five mergers that yield 33 non-duplicative final tools.
- Defined shared unit, growth, RAID, retention, snapshot, backup, transfer, electricity, replacement, lifecycle-cost, and UPS models.
- Selected Home Storage & Backup Planner as the first core planner.
- Fixed Phase 1 at seven public pages: Home, Tools directory, About, Contact, Privacy, Storage Needs hub, and Home Storage & Backup Planner.
- Defined seven implementation phases, visual direction, SEO/internal-linking rules, content-depth requirements, and planning QA gates.

**Files changed**

- Added `site-plan.md`
- Updated `handover.md`
- Updated `README.md` with the minimum project description and planning status

**Confirmed totals**

- Public pages: 63
- Tool / Planner: 33
- Guide: 10
- Reference: 4
- Comparison / Buying: 3
- Foundational pages and hubs: 5 + 8

**Not implemented**

- No public HTML page, CSS, JavaScript calculator, header/footer partial, image, favicon, sitemap, robots file, package/build configuration, external library, GitHub Action, ad code, or affiliate code was created or changed.
- No Cloudflare DNS, GitHub Pages custom-domain, proxy, HTTPS enforcement, GA4 property, or Search Console setting was changed.

**Validation**

- Automated checks: inventory totals, phase totals, unique IDs, unique URLs, exact duplicate primary intents, required tool fields, content-to-tool dependencies, required project identifiers, UTF-8 replacement characters, and `git diff --check`
- Calculator cases: not applicable; planning task only
- Browser widths/pages: not applicable; no public page implementation
- Production verification: not applicable; documentation does not alter the deployed site

**Git**

- Final task commit: this commit
- Push: pushed to `origin/main` as part of this task
- Verified after push: local `HEAD` matched `origin/main`
- Working tree clean after push: yes

**Protected areas**

- None added or changed

**Known issues**

- HTTPS certificate availability or enforcement may still be propagating; this remains an external infrastructure wait state, not a repository code issue.
- The project contact method is still unconfirmed and must be resolved before publishing the Contact and Privacy pages.
- Calculator presets, validation thresholds, and final visual tokens require implementation-stage review and test cases.

**Next safe task**

- Implement Phase 1 exactly as specified in `site-plan.md`: B01–B05, H01, and T01; the static production structure and original design system; shared header/footer; the minimum shared models used by T01; GA4/canonical/JSON-LD; `robots.txt`, `sitemap.xml`, `llms.txt`, and favicon; automated QA; and browser QA at 1440, 1280, 1024, 768, and 390 px.
- Preserve `CNAME`, use GA4 ID `G-Z7QV39WJ35`, and do not alter Cloudflare, Pages, proxy, HTTPS, Analytics-property, or Search Console settings.
- Do not implement Phase 2–7 pages, ads, affiliate code, a framework, build system, external library, or product-price feed in the next task.

### 2026-07-30 — Initial operational handover

**Status**

- Domain, Pages, Analytics, and Search Console setup reported complete.
- HTTPS availability is still propagating.
- No site implementation phase has started.
- This handover establishes synchronization and conflict-prevention rules.

**Files changed**

- `handover.md`

**QA**

- Documentation review only.
- Repository state and deployment verification must be performed in the actual repository before commit.

**Current commit**

- To be filled after the first commit and push.

**Next safe task**

- Confirm actual repository status and HTTPS/Pages state.
- Prepare the complete information architecture and Phase 1 development plan.
- Do not implement public pages until that plan is reviewed and approved.

## 15. Required End-of-Work Handover Entry

Every completed task must leave enough information for another clean environment to continue without guessing.

Use this format:

```markdown
### YYYY-MM-DD — Short task name

**Starting state**

- Branch:
- Starting commit:
- `origin/main` status:
- Pre-existing local changes:

**Completed**

- 
- 

**Files changed**

- 
- 

**Validation**

- Automated checks:
- Calculator cases:
- Browser widths/pages:
- Production verification:

**Git**

- Commit:
- Push:
- Local HEAD:
- origin/main:
- Working tree clean: yes/no

**Protected areas**

- Added/changed/none:

**Known issues**

- 

**Next safe task**

- 
```

## 16. Codex Prompt Baseline

Every future Codex task prompt must begin with the repository URL and recommended model/effort.

Use a compact startup instruction equivalent to:

```text
Repository: https://github.com/canghun13/datastoragelab
Recommended model/effort: [Terra low / Terra medium / Terra high / Sol]

Before editing, verify the current path, remote, branch, git status, recent commits, and handover.md. Preserve all pre-existing uncommitted changes. If safe, fetch and use pull --ff-only; do not automatically resolve divergence. Work only in the current repository using terminal commands, direct file editing, automated tests, and browser QA. Do not open an external IDE. Follow handover.md as the operational source of truth.
```

Each prompt must also define:

- Exact scope
- Files or page groups expected
- Explicit non-goals
- Required tests and browser widths
- Completion criteria
- Commit and push requirements
- Final synchronization report

Do not include environment-location wording or assume where the work is being performed.

---

## Immediate State

Phase 1 is committed, pushed, synchronized, and verified on GitHub Pages over HTTPS. The seven public Phase 1 URLs are fixed; Phase 2 is the next implementation scope.

The fixed repository URL is `https://github.com/canghun13/datastoragelab`.

The next task must:

1. Review `git status`, verify `main`, fetch safely, and read this file plus `site-plan.md`.
2. Implement only Phase 2 IDs T02–T06, G01, and R01, unless an explicit new instruction changes scope.
3. Preserve `CNAME` and all confirmed project identifiers.
4. Avoid infrastructure-setting changes while HTTPS remains an external propagation state.
5. Commit, push to `origin/main`, verify synchronization, and update this handover.

---

### 2026-07-30 — Build Phase 2 storage needs tools, guide, and reference

- Start state: branch `main`, commit `2c529f8f7825a5025053e25f867e82007d01906d`, local HEAD and `origin/main` equal, ahead/behind `0 0`, and no pre-existing working-tree changes.
- Added T02 **Annual Storage Growth Calculator** at `/tools/storage-needs/annual-storage-growth-calculator/`.
- Added T03 **Creator Media Storage Planner** at `/tools/storage-needs/creator-media-storage-planner/`.
- Added T04 **Computer Backup Storage Planner** at `/tools/storage-needs/computer-backup-storage-planner/`.
- Added T05 **Small Office Storage Planner** at `/tools/storage-needs/small-office-storage-planner/`.
- Added T06 **Media Library Storage Planner** at `/tools/storage-needs/media-library-storage-planner/`.
- Added G01 **How Much NAS Storage Do I Need?** at `/guides/how-much-nas-storage-do-i-need/` and R01 **Decimal TB vs Binary TiB** at `/reference/tb-vs-tib/`.
- Public HTML count is now 14. `sitemap.xml`, `llms.txt`, the tools directory, the Storage Needs hub, home links, shared navigation, and shared footer are aligned to the published set.
- Added shared decimal-unit and growth modules: `assets/js/storage-units.mjs` and `assets/js/storage-growth.mjs`; `assets/js/phase2-tools.mjs` supplies reusable validation, result rendering, copy, print, and reset behavior for the five advanced tools.
- Primary outputs cover forecasts and purchase targets; working, archive, and backup tiers; versioned backup allocations; office requirements briefs; and library capacity, copies, and expansion triggers. All outputs identify planning limits and keep backup space separate from primary capacity.
- Updated Contact and Privacy with the confirmed public email `mailto:canghun13@naver.com`.
- Automated verification: `node tools/qa.mjs` (run with the bundled Node executable in this environment) passed. It validates 14 public HTML files, metadata uniqueness, canonical URLs, GA4, JSON-LD, internal links, sitemap, JavaScript syntax, 15 Phase 2 calculation cases, Phase 1 regression behavior, and contact links. `git diff --check` passed.
- Browser QA and production deployment verification remain to be recorded after the final commit and push. No DNS, GitHub Pages, Cloudflare proxy, HTTPS, GA4 property, or Search Console setting has been changed.
- Browser QA completed locally: all seven Phase 2 pages were checked at 1440, 1280, 1024, 768, and 390 px (35 combinations) with exactly one H1, the shared header present, no page-width overflow, and tools retaining their forms. The Creator Media Storage Planner was exercised live at 390 px: calculation, Copy Results, Start Over, mobile menu, and Escape close all passed.
- Deployment verification after push: GitHub Pages first served the prior Phase 1 deployment during normal propagation, then served the Phase 2 pages over HTTPS. Verified Home, T02, G01, R01, Contact, and Privacy with one H1 each, their expected apex canonical URLs, and the stylesheet loaded. T02 calculated live to “Reserve 12.4 TB by year 5”; Contact and Privacy exposed the required `mailto:canghun13@naver.com` link. No infrastructure or analytics configuration was changed.
- Phase 2 implementation commit: `744dd6063ad445db967102adb437533398628ab0` (`Build Data Storage Lab Phase 2`), pushed to `origin/main` with local and remote heads equal and ahead/behind `0 0` before this deployment-record update.

---

### 2026-07-30 — Build Phase 3 NAS Configuration

- Starting state: `main` at `e32e91e0d3f61ecf88f33afd62a657f9db076da4`, local and `origin/main` synchronized (`0 0`), working tree clean.
- Confirmed Phase 3 scope from `site-plan.md`: H02, T07–T12, G02, G03, G07, G10, R02, and C01 (13 new public pages).
- Added H02 **NAS Configuration Tools** at `/tools/nas-configuration/`.
- Added T07 **NAS Bay, Drive Count & Capacity Planner**, T08 **RAID Capacity Calculator**, T09 **RAID Protection Decision Tool**, T10 **NAS Expansion Headroom Planner**, T11 **HDD vs SSD Storage Planner**, and T12 **CMR vs SMR Suitability Checker` under `/tools/nas-configuration/`.
- Added G02 **RAID Is Not a Backup**, G03 **CMR vs SMR for NAS**, G07 **NAS Drive Replacement Planning**, G10 **HDD vs SSD for Bulk Storage**, R02 **Storage and RAID Capacity Formulas**, and C01 **2-Bay vs 4-Bay NAS** at their planned guide, reference, and comparison URLs.
- Added `assets/js/raid-core.mjs` for shared generic same-size RAID metadata/capacity logic and `assets/js/phase3-tools.mjs` for NAS form validation, result rendering, Copy Results, Print Results, and Start Over behavior.
- Updated navigation, Home and Tools discovery links, sitemap, llms, README, and automated QA. Public HTML count is now 27.
- Automated QA: bundled `node tools/qa.mjs` passed with metadata, links, sitemap, GA4, JSON-LD, JavaScript, Phase 1 regression, and 33 Phase 2/3 calculation checks. `git diff --check` passed.
- Browser QA: all 13 Phase 3 pages passed at 1440, 1280, 1024, 768, and 390 px (65 combinations): one H1, shared header, no horizontal overflow, and forms on the six tools. RAID Capacity Calculator passed live calculation, Copy Results, Start Over, mobile menu, and Escape close checks at 390 px.
- No DNS, Pages, proxy, HTTPS, GA4, or Search Console configuration was changed. Deployment verification and final commit/push details follow after publication.
- Deployment verification: after normal GitHub Pages propagation, HTTPS served Home, H02, T08, G02, R02, C01, Contact, and Privacy. Each had the expected apex canonical URL, one H1, and loaded CSS. T08 calculated live to “36.0 TB usable (32.7 TiB) from 48.0 TB raw”; Contact and Privacy exposed `mailto:canghun13@naver.com`.
- Phase 3 implementation commit: `233e110b3fba35492b95dad4b38df159d22c7f33` (`Build Data Storage Lab Phase 3`), pushed to `origin/main` with local and remote heads equal and ahead/behind `0 0` before this deployment-record update.

---

### 2026-07-30 — Build Phase 4 Backup Planning

- Starting state: `main` at `e3b5076c0b0c5fb69b74aca039c2498ea9d41010`, local and `origin/main` synchronized (`0 0`), with no pre-existing working-tree changes.
- Confirmed Phase 4 scope from `site-plan.md`: H03, T13–T20, G05, G06, G08, G09, and C02 (14 new public pages).
- Added H03 **Backup Planning Tools** at `/tools/backup-planning/`.
- Added T13 **3-2-1 Backup Plan Generator**, T14 **Local vs Cloud vs Hybrid Backup Selector**, T15 **Backup Retention Calculator**, T16 **Snapshot Storage Planner**, T17 **Offsite Backup Capacity Planner**, T18 **Backup Frequency Selector**, T19 **Recovery Time Estimator**, and T20 **Backup Verification Schedule Planner** under `/tools/backup-planning/`.
- Added G05 **Backup Retention Basics**, G06 **3-2-1 Backup Explained**, G08 **Local Backup vs Offsite Backup**, G09 **Snapshots vs Backups**, and C02 **NAS vs Cloud for Family Photos** at their planned guide and comparison URLs.
- Added `assets/js/backup-tools.mjs` with bounded input validation, capacity/recovery/scheduling calculations, rendered output, Copy Results, Print Results, and Start Over behavior. Recovery transfer speed is validated explicitly.
- Updated the tools directory, home discovery section, shared navigation and footer, sitemap, llms, README, and automated QA. Public HTML count is now 41.
- Automated verification: bundled `node tools/qa.mjs` passed. It validates all public metadata, canonical URLs, GA4, JSON-LD, links, sitemap parity, JavaScript syntax, 57 Phase 2/3/4 calculation cases (including 24 Phase 4 cases), Phase 1 regression behavior, and confirmed contact links. `git diff --check` passed.
- Local browser QA: all 14 Phase 4 pages passed at 1440, 1280, 1024, 768, and 390 px (70 combinations): exactly one H1, shared header present, no horizontal overflow, and each tool form present. At 390 px, T13 passed calculation, Copy Results, Start Over, the mobile menu, and Escape close checks; browser console errors were empty.
- No DNS, Pages, proxy, HTTPS, GA4, or Search Console setting was changed. Deployment verification and final commit/push details follow after publication.
