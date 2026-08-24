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

### 2026-08-24 — Aggressive discovery and build Developer Build Storage Planning

#### Safe synchronization and exclusion boundary

- Started in `C:\Users\cangh\OneDrive\문서\datastoragelab` on clean `main` at `dc02c65bfe57bca3cd85e728f21afe4fc209a241`. `origin` was exactly `https://github.com/canghun13/datastoragelab`. Direct `git ls-remote origin refs/heads/main` returned the same SHA; `git fetch --prune origin main` succeeded, refreshed `origin/main` matched live GitHub `main`, and ahead/behind was `0/0`, so no pull, merge, rebase, stash, or user-file cleanup was needed.
- The synchronized baseline was 86 public pages: 47 tools, 13 guides, six references, four comparisons, 11 hubs, and five foundational pages. Existing clusters were Storage Needs, NAS Configuration, Backup Planning, Network & Performance, Cost & Power, SSD Endurance, Field Media, and External Storage.
- The exclusion list combined all implemented workflows with prior discovery history: surveillance/NVR; LTO/cold/long-term archive; Proxmox/VM storage; ZFS pools; RAID rebuild/NAS migration; scrub/bit rot/verification; document digitization; IOPS/performance; database sizing; microscopy acquisition; offline removable-drive rotation; replication backlog/RPO; cache working-set tiering; spare-drive fleet; game recording; multitrack audio; system-image repositories/deployment; AI datasets/checkpoints; failed-drive recovery; filesystems; drive burn-in; sanitization; quotas; SMB/NFS permissions; rack/install; SMART triage; encryption/key custody; media inventory; internal SSD upgrade/migration; multi-drive consolidation; forensic acquisition; immutable backup; shared-cloud collaboration; NAS remote access; research DMP; drone photogrammetry; object lifecycle/retrieval; photo-library consolidation; eDiscovery/legal hold; client archive handoff; and all SSD/field/external-storage implementations. None was renamed or recycled.

#### Forty genuinely new workflow families

Each family was screened as a target, trigger, repeated workflow, output, and current-site difference rather than as a keyword variant.

| # | Workflow family | Target / trigger | Repeated workflow and output | Existing-site difference / screen |
|---:|---|---|---|---|
| 1 | Developer build storage | Small dev/game/app teams hitting source or CI quotas | Measure source-to-build classes; output LFS, artifact, cache, registry, and runner policies | Pipeline object lifecycle is absent — **ADVANCE** |
| 2 | Offline GIS field packages | GIS crews preparing disconnected tablets | Select area/layers/attachments, package and sync; output device and transfer budget | Spatial packages and field sync differ from camera offload — **ADVANCE** |
| 3 | Software package mirror and update cache | Homelabs/small IT repeating OS/package downloads | Choose cache vs mirror, scope, seed, sync, cleanup; output disk/network policy | Repository object reuse differs from general transfer — **ADVANCE** |
| 4 | SaaS export and employee offboarding archive | Admins closing accounts before access expires | Scope exports, split archives, download, verify, retain; output staging/custody plan | Vendor export windows differ from ordinary backup — **ADVANCE** |
| 5 | Blockchain node storage and sync | Node operators choosing full/pruned/client modes | Size initial DB, growth, sync bandwidth, prune workspace; output hardware horizon | Chain databases differ from VM sizing — **ADVANCE** |
| 6 | Observability telemetry retention | Small operators facing log/metric/trace growth | Estimate ingest/cardinality, tier and retain; output hot/archive quotas | Telemetry classes differ from generic annual growth — **ADVANCE** |
| 7 | CAD/BIM collaboration cache | Design teams opening large shared models | Measure model/cache/sync versions; output workstation and shared-cache plan | Application collaboration cache is not creator archive — **ADVANCE** |
| 8 | Game console library expansion | Console owners juggling installed games and captures | Rank installs, reserve updates, move/re-download; output expansion choice | Platform install rules differ from media-library capacity — **ADVANCE** |
| 9 | Email archive export and mailbox handoff | Individuals/small firms exporting PST/MBOX | Scope mail, attachments, split, stage, verify; output export drive and batch plan | Mailbox containers and import limits are new — **ADVANCE** |
| 10 | Optical-disc library ingest | Collectors ripping CD/DVD/Blu-ray libraries | Count discs, profiles, scratch, verify, archive; output drive/time/capacity kit | Disc ingest differs from capture media — **ADVANCE** |
| 11 | Website staging and release-backup capacity | Site maintainers cloning production for releases | Snapshot DB/assets, stage, test, expire; output staging and rollback footprint | Deployment workspace differs from backup retention — WEAK |
| 12 | CDN edge-cache planning | Small publishers choosing cacheability and origin load | Classify objects, TTL, hit assumptions; output edge/origin demand | Requires traffic evidence and vendor behavior — WEAK |
| 13 | VFX render scratch and frame retention | Small studios filling scratch during renders | Estimate frames/passes/intermediates, purge, retain; output scratch tiers | Distinct from final media archive but specialized — WEAK |
| 14 | Home-automation telemetry storage | Home Assistant users growing history DBs | Select entities/sample cadence, compact, retain; output DB horizon | Dynamic integrations and DB behavior dominate — WEAK |
| 15 | Mobile offline-content bundle planning | App teams shipping maps/media/reference packs | Select bundle classes, compression, deltas; output install/update allowance | Product-specific packaging needed — WEAK |
| 16 | E-book/comic conversion workspace | Collectors normalizing scans and metadata | Stage originals, conversions, covers, duplicates; output workspace/archive plan | Conversion execution tools own most value — REJECT |
| 17 | Digital-signage content synchronization | Small venues distributing playlists to players | Package media, schedule sync, preserve fallback; output player/network budget | Useful but narrow and hardware-dependent — WEAK |
| 18 | Podcast episode production and hosting archive | Independent podcasters publishing recurring episodes | Stage masters/edits/encodes, retain, upload; output episode growth plan | Too close to excluded multitrack/media capacity — REJECT |
| 19 | 3D-print asset and timelapse library | Makers storing models, slices, profiles, videos | Version designs, regenerate slices, retain captures; output library policy | Natural tools collapse to generic growth/retention — REJECT |
| 20 | Dashcam footage review and export | Drivers preserving selected events before loop overwrite | Estimate loop window, lock/export/verify; output extraction deadline | Too close to excluded surveillance recording — REJECT |
| 21 | Game-server world and mod backup | Community admins protecting world saves | Estimate save cadence/mod set/rollback, restore; output server backup policy | Mostly repeats backup retention and VM storage — REJECT |
| 22 | QA test-result and screenshot retention | Software QA teams retaining evidence | Count runs/screenshots/videos, policy classes; output evidence quota | Could fit developer cluster but weak alone — WEAK |
| 23 | HPC simulation scratch and result handoff | Researchers running finite simulations | Stage inputs/checkpoints/results, clean scratch; output scratch allocation | Specialized schedulers own execution and metrics — WEAK |
| 24 | Genomics pipeline intermediate storage | Small labs planning FASTQ-to-result workflows | Estimate expansion, scratch, checkpoints, archive; output tiered capacity | Strong but domain assumptions and tools are specialized — WEAK |
| 25 | Seismic/geophysical survey staging | Field geoscience teams ingesting instrument sets | Stage raw/processed/tiles, transfer, handoff; output site kit | Niche and close to scientific acquisition exclusions — REJECT |
| 26 | 3D scanning/point-cloud project storage | Survey/design teams capturing dense scans | Estimate points/photos/meshes/scratch; output capture-processing budget | Overlaps excluded photogrammetry/acquisition — REJECT |
| 27 | Automotive diagnostic-log retention | Workshops/enthusiasts recording CAN/OBD logs | Select channels/rates/session retention; output logger capacity | Narrow and live hardware formats vary — WEAK |
| 28 | Streaming-channel VOD and clip archive | Streamers preserving broadcasts/highlights | Estimate VOD, clips, transcodes, retention; output archive plan | Repeats excluded game recording/media archive — REJECT |
| 29 | Music sample-library tiering | Producers moving large immutable libraries | Classify active/cold samples, cache, backup; output tier allocation | Too close to excluded audio and generic working set — REJECT |
| 30 | Creative font/asset team cache | Agencies sharing fonts/templates/stock assets | Package licensed assets, cache, expire, handoff; output team cache plan | Licensing and vendor apps dominate; thin tools — REJECT |
| 31 | Localization resource-pack build storage | App teams generating language/platform bundles | Count locales/assets/build variants, retain; output matrix footprint | Natural subcase of developer build storage — WEAK |
| 32 | Mobile-device fleet OS update cache | Small IT staging repeated firmware updates | Select models/packages, seed, expire; output cache and window | Live vendor packages and device matrices required — REJECT |
| 33 | Endpoint application-deployment staging | Small IT distributing installers | Mirror packages, version, sign, retain; output deployment repository | Too close to excluded system deployment/package mirror — REJECT |
| 34 | Code-signing release-evidence retention | Release teams preserving signed binaries and provenance | Collect signatures/logs/attestations, retain; output evidence package | Important but mostly checklist/retention, not four tools — REJECT |
| 35 | IoT firmware release-artifact retention | Device teams maintaining hardware generations | Version firmware, symbols, manifests, rollback; output per-generation policy | Strong subcase, but folds into developer artifacts/registry — WEAK |
| 36 | SBOM and vulnerability-report retention | Security/dev teams accumulating scan evidence | Retain SBOMs/reports by release, dedupe, expire; output evidence quota | Report sizes small; article/policy intent dominates — REJECT |
| 37 | Database migration dump and rollback workspace | App teams planning schema/data migrations | Dump, stage, transform, validate, preserve rollback; output migration workspace | Different from DB sizing but overlaps backup/transfer heavily — WEAK |
| 38 | Data-warehouse extract staging | Analysts landing recurring exports | Estimate extract/compression/partition retention; output staging quota | Backend/schema evidence and generic retention dominate — REJECT |
| 39 | Digital-library OCR derivative storage | Small archives preserving originals and search derivatives | Stage images/OCR/PDF/index, verify; output derivative multiplier | Reuses excluded document digitization — REJECT |
| 40 | Remote classroom content prepositioning | Schools caching course videos/packages for weak links | Select courses/devices/refreshes; output local cache and seed window | Demand is real but institutional/product-specific — WEAK |

#### Ten mid-level candidates and natural Tool depth

| Candidate | Four-or-more independent Tool intents tested | Mid decision |
|---|---|---|
| Developer build storage | LFS quota forecast; artifact retention; cache churn; registry layer/GC retention; runner peak disk | Finalist |
| Offline GIS packages | offline tile/area estimator; field attachment growth; package/device capacity; sync-window planner | Finalist |
| Package mirror/cache | cache-vs-mirror selector; mirror capacity; seed/sync window; cache savings/break-even; cleanup headroom | Finalist |
| SaaS offboarding exports | export staging capacity; archive split count; expiry-window download planner; verification/custody checklist | Finalist |
| Blockchain nodes | full/pruned growth planner; initial sync window; ongoing bandwidth; prune workspace; SSD write check | Finalist |
| Observability telemetry | log ingest/retention; metric cardinality; trace sample storage; hot/archive tier split | Mid reject: exact calculators and vendor tools dominate |
| CAD/BIM collaboration cache | model checkout cache; sync delta window; workstation free-space check; project version retention | Mid reject: application-specific behavior weakens static answers |
| Game console library | install fit; update reserve; expansion selector; move/re-download time | Mid reject: live title/platform database and existing library tools |
| Email archive export | mailbox export size; PST/MBOX split; staging drive; import/verification plan | Mid reject: tools collapse around one export plus vendor limits |
| Optical-disc ingest | disc count/capacity; rip-time queue; transcode scratch; verification/archive kit | Mid reject: repeated existing media/transfer formulas |

#### Five deep finalists, exact SERPs, and traffic-first score

| Finalist | Exact Tool SERP and free-competition findings | Score / Gates / decision |
|---|---|---|
| **Developer build storage** | Exact searches covered self-hosted runner disk capacity, build-cache storage/churn, container-registry retention, Git LFS storage/bandwidth, and CI artifact retention. The free Simplified Tools artifact calculator is strong and detailed; CloudOps Toolkit parses layer/tag input for registry storage; CalcBee provides an LFS cost calculator; Cachely models build-time savings. GitHub's pricing calculator estimates current Packages/LFS cost, while GitHub/GitLab/Bitbucket docs explain quotas and runner disk failures. The uncovered layer is a coherent preflight from binary version growth through cache-key churn and concurrent runner peak, with especially weak exact competition for cache-capacity and runner-workspace decisions. | Demand 27/30; breadth 18/20; Tool depth 18/20; SERP gap 10/15; fit 8/10; commercial 4/5 = **85/100**. A–I PASS. **GO** |
| **Offline GIS field packages** | Exact searches found Mapbox's free Offline Estimator, multiple tile/storage calculators, QFieldSync execution, and official ArcGIS cache-planning guidance. Attachment growth and unstable-link sync are real, but precise raster/vector package size depends on geometry, zoom, style, density, and generated data; representative packaging is more trustworthy than a generic formula. | 24/30 + 16/20 + 14/20 + 7/15 + 9/10 + 4/5 = **74/100**. A/B/E/G/I PASS; C/F/H FAIL. HOLD |
| **Package mirror/update cache** | Exact searches found Posit Package Manager sizing guidance, apt-cacher-ng/mirror execution, a free reverse-proxy cache calculator with package-mirror preset, and mature proxy/mirror tools. Current questions confirm repeated bandwidth waste and uncertainty over full-mirror disk. Cache-vs-mirror and seed-window decisions survive, but four independent strong outputs compress into one narrow administration workflow. | 23/30 + 15/20 + 15/20 + 11/15 + 7/10 + 3/5 = **74/100**. A/E/G/H PASS; B/C/I FAIL. HOLD |
| **SaaS export/offboarding archive** | Google Takeout and Workspace Data Export officially provide split archives, temporary availability, and export execution. Recent users report huge/split exports and offboarding difficulty; Backupify has a SaaS retention-cost calculator. Static staging and expiry-window planning are possible, but export completeness, preparation time, permissions, file formats, and deletion windows remain vendor/account-specific and execution-owned. | 25/30 + 16/20 + 13/20 + 8/15 + 7/10 + 3/5 = **72/100**. A/B/E/G PASS; C/F/H/I FAIL. HOLD |
| **Blockchain node storage/sync** | Exact searches found Spark's Bitcoin Node Storage Calculator, AgentCalc-style node growth tools, official Ethereum client tables, Bitcoin/Monero pruning guidance, and SSD endurance calculators. Community questions confirm nodes unexpectedly filling disks. Current chain/client sizes and pruning behavior change, exact calculators exist, and the SSD subtool repeats H09. | 22/30 + 14/20 + 13/20 + 6/15 + 7/10 + 3/5 = **65/100**. A/B/E/G PASS; C/D/F/H/I FAIL. REJECT |

- Search demand evidence included recent GitHub/Reddit questions about LFS bandwidth consumed by CI, self-hosted runner disk exhaustion, cache maintenance, container-registry growth, QField packages, local package caches, huge Google Takeout exports, and pruned nodes using more disk than expected. No unsupported keyword-volume numbers were invented.
- Primary technical/competitive sources opened during research: `https://docs.github.com/en/billing/concepts/product-billing/git-lfs`, `https://github.com/actions/upload-artifact`, `https://github.com/pricing/calculator`, `https://www.simplified.tools/calculate_build_artifact_storage`, `https://www.cloudopstoolkit.com/docker-registry-storage-calculator`, `https://cachely.dev/ci-savings-calculator`, `https://support.atlassian.com/bitbucket-cloud/kb/self-hosted-runner-failing-with-error-no-space-left-on-device/`, `https://support.gitlab.com/hc/en-us/articles/18327371176220-Docker-Runner-jobs-fail-with-No-space-left-on-device-error`, `https://docs.mapbox.com/playground/offline-estimator/`, `https://docs.posit.co/rspm/admin/getting-started/sizing.html`, `https://support.google.com/accounts/answer/3024190?hl=en`, and `https://ethereum.org/developers/docs/nodes-and-clients/run-a-node/`.

#### Selected design and implementation

- Selected H12 **Developer Build Storage Planning** for small developer, game/app, homelab, and self-hosted CI teams. Its long-tail bundle includes Git LFS storage/bandwidth quota, artifact retention days, build cache size/churn/eviction, registry retention/garbage collection, and self-hosted runner “no space left” capacity. Repeat use follows releases, dependency updates, matrix changes, new platforms, registry policies, and runner concurrency.
- Added H12 `/tools/developer-storage/`; T48 `/tools/developer-storage/git-lfs-storage-bandwidth-planner/`; T49 `/tools/developer-storage/ci-artifact-retention-planner/`; T50 `/tools/developer-storage/build-cache-capacity-planner/`; T51 `/tools/developer-storage/container-registry-retention-planner/`; T52 `/tools/developer-storage/runner-disk-capacity-checker/`; G14 `/guides/how-to-plan-storage-for-git-lfs-ci-builds/`; and R07 `/reference/developer-build-storage-formulas/`.
- `assets/js/developer-storage-tools.mjs` exports five deterministic, testable functions. T48 separates unique retained version growth from full-download bandwidth. T49 models stored artifact ingest × retention after other usage/reserve. T50 models new cache keys/day, storage churn, desired footprint, and effective quota window. T51 separates shared base layers, unique retained layers, and unique bytes pending garbage collection under a documented deduplication scope. T52 sums per-job checkout/LFS/dependency/cache/build/temp peaks, multiplies concurrency, and reverses reserve to a minimum disk requirement.
- All quotas, reserves, rates, deduplication scope, cleanup delays, and current usage are user inputs. No live price, SKU database, account, API, hardware detection, or provider allowance is embedded. Each tool has bounded validation, explicit units, live recalculation after success, Reset, Copy, Print, a worked example, assumptions, limitations, and contextual next steps.
- Integrated Header Tools, Home scenario discovery, Tools, Guides, Reference, three related existing planner entry points, `sitemap.xml`, `llms.txt`, `site-plan.md`, README, and both QA suites. The protected Home directory/badge region and infrastructure/analytics/contact settings were untouched.
- Final inventory is 94 public pages: 52 tools, 14 guides, seven references, four comparisons, 12 hubs, and five foundational pages.

#### Local automatic and browser QA

- `tools/qa.mjs`: PASS for all 94 pages, metadata, canonicals, links, sitemap, GA4, JSON-LD, JavaScript syntax, prior calculations, new cluster structure, and 25 independently stated developer-storage cases. Each Tool has normal, boundary, high/failure, alternate-configuration, and invalid scenarios; expected values are literal test evidence rather than results generated by the implementation functions.
- `tools/content-qa.mjs`: PASS for the 52/14/7/4/12/5 inventory. Tool explanatory content minimum is 490 words and average is 674.4 words; required sections, favicon consistency, placeholders, empty blocks, duplicate paragraphs, and repeated 12-word sequences pass. `git diff --check` passes.
- Browser QA exercised all five tools at 1440, 1280, 1024, 768, 430, 390, and 360 px: 35 successful-result combinations had zero document overflow, zero clipped visible input/select/button/link controls, zero field control-top delta, complete shared header/footer, and no console warnings/errors. Mobile and desktop screenshots confirmed readable result cards, table rows, suffixes, labels, and focus treatment.
- Every tool passed Calculate, material input-change recalculation, bounded invalid input with hidden stale result and visible field error, error-to-success recovery, Copy confirmation, Print click, and Reset restoring its exact default and hiding results. The registry's live recalculation was verified from changed metric output because its summary intentionally describes retained image count, which does not change when only image size changes.
- H12, G14, and R07 passed 1440/1024/768/390/360 responsive checks with zero document overflow and no console errors. Representative existing-page regression covered Home, Tools, H11, the VM/container SSD tool, Backup Retention, Guides, and Reference at 1440/390; all had shared header/footer and zero overflow, Home rendered the new scenario, and both contextual related links appeared.
- Implementation commit `aa0b31aa273cfc9e0c97d6cc7631a3ae5c5deda2` (`Add developer build storage planning cluster`) was pushed to `origin/main`; direct `git ls-remote origin refs/heads/main` returned the same SHA immediately after push.
- Production first returned the expected transient GitHub Pages 404, then served H12 and all seven child pages. A 24-combination production matrix (eight pages at 1440, 390, and 360 px) passed with correct titles, latest shared header/footer, visible success results for all five tools, zero document overflow, zero clipped interactive controls, and no console warnings/errors.
- Production interaction QA at 390 px passed for T48–T52: default Calculate, material changed-input recalculation, invalid-input stale-result hiding, error-to-success recovery, Copy confirmation, Print click, and Reset restoring exact defaults. Each Tool loaded `components.js?v=20260824` and `developer-storage-tools.mjs` from production.
- Production discovery passed: Header, Home, and Tools expose H12; H12 exposes T48–T52, G14, and R07; the VM/container SSD, Backup Retention, and Full Storage System Budget pages expose their contextual continuation. The protected Home badge region and infrastructure settings remain unchanged. This handover-only production record is the final session commit; its SHA is reported in the task result because a commit cannot contain its own hash.

### 2026-08-20 — Search-led upgrade of existing TBW and backup pages

#### Safe synchronization and evidence boundary

- Started on `main` at `7707631e1fc659aa6fbcd0fa6778ce3003a0c07c` with a clean worktree and `origin` exactly `https://github.com/canghun13/datastoragelab`. Live GitHub `main` was `972a8a2278c60aa953ac4ba1ea32210ae8fdbbc9`; `git fetch --prune origin main` made `origin/main` match live, and `git pull --ff-only origin main` safely fast-forwarded the clean clone. Local/origin/live were equal with ahead/behind `0/0` before editing.
- No current GSC or GA4 export exists in the repository or supplied attachments. The available in-app Search Console session required a new Google sign-in, so no login was attempted. This review therefore used the latest supplied 2026-08-20 weekly snapshot as its query/page source of truth: about 417 GSC impressions and zero clicks, with Local Backup vs Offsite Backup about 124 impressions, CMR vs SMR about 70, TBW to DWPD and RAID Is Not a Backup about 25 each, and Local Network Transfer and TB vs TiB about 17 each. Exact-query clues included `tbw to dwpd` (about four impressions, average position about 7.25), `1gbe` (about three, 11.67), `cmr vs smr for nas` (about one, 10), and `das comparison` (about one, 12). GA4 was not used for ranking because the supplied context identified likely QA/datacenter traffic.
- Current SERPs were reviewed for the six required candidates plus the existing DAS vs NAS cost page. The comparison focused on exact intent, direct-answer depth, tool-versus-guide role, and whether a conservative same-URL improvement could add value without a new page, cluster, or technical SEO change.

#### Selection and implementation

- **TBW to DWPD Converter — IMPLEMENT:** exact SERPs are calculator/formula-led, and the current calculator/formula content was already strong, but the H1 and hero did not immediately mirror the exact query or expose the representative answer. Changed only the existing H1 and hero copy to `TBW to DWPD Calculator & Converter` and the direct result that 600 TBW on 1,000 GB over five years is about 0.329 DWPD / 329 GB per day. URL, canonical, title, meta description, form, defaults, formulas, JavaScript, and result rendering remain unchanged.
- **Local Backup vs Offsite Backup — IMPLEMENT:** this had the largest supplied page-level signal and a material content gap. Expanded the existing guide in place with a short answer, definitions, a decision table, failure-domain scenarios, 3-2-1 relationship, restore-time and capacity planning, common mistakes, and a practical decision path. Added one contextual inbound link from the existing 3-2-1 guide. Existing URLs, metadata, canonical, site structure, and tool/guide role boundaries remain unchanged.
- **CMR vs SMR for NAS — HOLD:** the existing guide already provides decision rules, workload conditions, mistakes, limitations, and a reciprocal suitability-checker path. The single exact-query impression did not justify speculative model lists or content churn.
- **Local Network Transfer Time — HOLD:** the existing tool already answers line rate versus payload throughput, slowest-path constraints, efficiency, disk bottlenecks, and transfer time. The broad `1gbe` signal was too small and ambiguous for a rewrite.
- **RAID Is Not a Backup — HOLD:** the page already gives the direct distinction, uncovered failure modes, a practical copy pattern, scenario, limitations, and connected RAID/backup tools. Competitive informational SERPs plus the modest page signal did not reveal a precise low-risk gap.
- **TB vs TiB — HOLD:** the reference already covers decimal/binary definitions, formulas, the 1 TB versus roughly 931 GiB example, common mistakes, and calculator links. It already meets the dominant SERP intent.
- **DAS vs NAS Cost Calculator — HOLD:** the observed `das comparison` query is broad definition/product-comparison intent, while this page intentionally compares five-year cost for equivalent protected configurations. With no URL-level evidence that the query belongs to this tool, changing its intent would be risky.

#### Verification and scope

- Public inventory remains exactly 86 pages: 47 tools, 13 guides, six references, four comparisons, 11 hubs, and five foundational pages. No new page, redirect, sitemap entry, `llms.txt` item, CSS, JavaScript, analytics, infrastructure, contact information, or protected Home badge content was changed.
- Baseline and post-change `tools/qa.mjs` passed all 86 public pages, metadata, links, sitemap, GA4, JSON-LD, JavaScript, calculation cases, Phase 1 regression, badge, and contact checks. `tools/content-qa.mjs` passed the 47/13/6/4/11/5 inventory and all content safeguards. `git diff --check` passed.
- Browser QA exercised the TBW converter's default calculation, `1000 GB = 1 TB`, `600 TBW = 0.6 PBW`, input-change recalculation, zero-value validation, Reset, Copy Results, and Print Results. The default result remained 600 TBW, 0.6 PBW, about 0.33 DWPD, and 328.77 GB/day; unit changes preserved the represented quantity and Reset restored 1000 GB / 600 TBW / five years / WAF 1.
- The TBW tool and expanded backup guide passed responsive checks at 1440, 1024, 768, 390, and 360 px with zero document-level horizontal overflow. Direct tool, backup-guide, and 3-2-1-guide loads had zero console errors; the new contextual link was present exactly once. No calculation logic change or new calculation test was required.
- Final commit, push, live-SHA equality, clean status, and production verification are recorded in the task result or a follow-up deployment record because this entry cannot contain its own final commit hash.

### 2026-08-20 — Review new workflow clusters; NO-GO

#### Safe remote preflight and review boundary

- Started in the existing target clone on `main` at `5e551e7cb3977181a819d232dc7f87a5c61506ad`, with a clean worktree and `origin` exactly `https://github.com/canghun13/datastoragelab`. Live GitHub `main` was `206f322b9d93f50003542fecb9294822e7e027e0`; refreshed `origin/main` matched it, and the branch was a simple `0/6` fast-forward. `git pull --ff-only origin main` synchronized local/origin/live at `206f322b9d93f50003542fecb9294822e7e027e0` with ahead/behind `0/0` before research.
- The synchronized source of truth has 86 public pages: 47 tools, 13 guides, six references, four comparisons, 11 hubs, and five foundational pages. The implemented workflow clusters remain Storage Needs, NAS Configuration, Backup Planning, Network & Performance, Cost & Power, SSD Endurance & Write Workload, Field Media Offload Planning, and External Storage Connection Planning.
- This was a cluster-discovery review, not a site-wide audit. No production HTML, CSS, JavaScript, URL, navigation, analytics, infrastructure, contact information, or protected Home badge content was changed.

#### Exclusions and genuinely new workflow universe

- Prior screened or implemented areas were excluded before discovery: surveillance/NVR; LTO, cold, and long-term archive; Proxmox/VM storage; ZFS pool design; RAID rebuild/NAS migration; scrub/bit-rot/verification; document digitization; IOPS/performance sizing; database storage sizing; microscopy acquisition; offline removable-drive rotation; replication backlog/RPO; cache working-set tiering; spare-drive fleet; game recording; multitrack audio; system-image repositories; AI dataset/checkpoint storage; failed-drive recovery readiness; cross-platform filesystem selection; new-drive burn-in/acceptance; sanitization/disposition; quotas; SMB/NFS permissions; rack/install planning; SMART evidence triage; encryption/key custody; media inventory/labeling; and the three implemented SSD Endurance, Field Media, and External Storage clusters.
- Twelve new workflow families were then screened as workflows rather than renamed keywords:

| Workflow family | Target / trigger and repeated decision | Why it is not already a Data Storage Lab tool | Directional result |
|---|---|---|---|
| Internal SSD upgrade and migration | PC owners/technicians replacing or adding an internal SSD; decide fit, lane impact, migration route, and validation | Internal motherboard slots, lane sharing, boot migration, and partition readiness differ from an external enclosure path | Finalist, 77/100 |
| Multi-drive data consolidation and duplicate cleanup | Home users/creators merging years of overlapping drives; choose a master, staging capacity, waves, review, and deletion order | Existing tools size copies and transfers but do not reconcile conflicting directory trees | Finalist, 74/100 |
| Forensic disk-image acquisition planning | Technicians/forensic practitioners preparing evidence acquisition; choose image format, destination, segmentation, timing, and verification | Existing recovery/transfer tools do not define chain-of-custody acquisition | Finalist, 69/100 |
| Shared-cloud sync collaboration planning | Small teams choosing roots, offline scope, conflict handling, versioning, and ownership | Backup selectors do not design live multi-writer synchronization | Middle screen, 70/100 |
| Immutable/ransomware backup readiness | Homes and small offices hardening copies against credential compromise; decide isolation and recovery evidence | 3-2-1 topology does not fully model administrative failure domains | Middle screen, 72/100 |
| Object-storage lifecycle and retrieval planning | Technical teams moving data across hot/cool/archive tiers; decide transitions, requests, retrieval windows, and billable footprint | Current offsite tools omit object request/minimum-duration rules | Middle screen, 66/100 |
| Photo-library consolidation | Photographers/families merging Photos/Lightroom-style libraries and sidecars; decide canonical library and merge route | This is application-library reconciliation rather than generic storage sizing | Early reject, 67/100 |
| NAS remote-access and file-sharing readiness | NAS owners exposing selected files remotely; decide access path, identity, fallback, and bandwidth | Current network tools size links but do not configure secure remote access | Middle screen, 70/100 |
| Research-data lifecycle and DMP storage planning | Researchers turning instruments, schedules, retention, sharing, and repositories into a DMP | Current planners do not generate funder/institution research-data outputs | Middle screen, 68/100 |
| eDiscovery and legal-hold storage intake | Small firms/MSPs receiving mailboxes, phones, and video; decide collection scope, preservation, hosting, and review capacity | Legal preservation workflow is absent from the consumer/small-team planning set | Early reject, 61/100 |
| Client/project archive handoff validation | Freelancers/agencies packaging completed work; decide manifest, copy set, handoff media, and acceptance evidence | Field offload covers ingest, not final client custody and package acceptance | Early reject, 69/100 |
| Drone mapping/photogrammetry project storage | Surveyors/pilots estimating image ingest, scratch space, processing batches, and deliverables | Capture/processing stages and image-count constraints differ from Field Media offload | Middle screen, 70/100 |

- The middle screen retained immutable-backup readiness, shared-cloud sync, NAS remote access, research-data lifecycle, and drone photogrammetry long enough to test tool depth. Immutable backup repeated existing 3-2-1, offsite, retention, verification, and recovery decisions and depended on product-specific immutability controls. Shared sync and NAS remote access were governed by changing Dropbox/OneDrive/Syncthing/NAS-platform behavior and security configuration rather than stable local logic. Research planning faced an exact free DMP workflow plus an exact calculation competitor. Drone processing had credible technical demand but specialized processing applications own memory/batch estimates, repeating the commercial-fit weakness already recorded for microscopy. Object-storage lifecycle also requires current provider price, request, minimum-duration, and retrieval policies. None advanced over the three finalists.

#### Current demand and exact-purpose competition evidence

- Multi-drive cleanup showed the strongest fresh community signal. March, June, and July 2026 questions independently ask how to choose a master copy, hash overlapping drives, preserve unique/newer files, reduce many backups to a controlled copy count, and avoid deleting the only good version (`https://www.reddit.com/r/DataHoarder/comments/1rl7yaj/how_to_clean_up_duplicates_over_multiple_drives/`, `https://www.reddit.com/r/DataHoarder/comments/1ucbpfa/tools_to_tidy_up_redundant_backup_folders/`, `https://www.reddit.com/r/DataHoarder/comments/1v3r9hp/best_way_to_combine_multiple_sets_of_the_same_data/`, `https://www.reddit.com/r/DataHoarder/comments/1uzoarb/i_have_6_folders_which_might_have_duplicate_files/`). This passes the demand gate without inventing search-volume figures.
- The same SERPs identify mature free solutions. Krokiet/Czkawka finds exact duplicates by name, size, or hash, supports reference folders, caches scans, and also finds similar media and broken files; its public repository had about 32.8k GitHub stars during review (`https://github.com/qarmin/czkawka`). FreeFileSync compares source and target trees and transfers only differences; its current site offered open-source version 14.11 dated 2026-08-10 (`https://freefilesync.org/`). dupeGuru and command-line jdupes/rmlint fill adjacent review/execution intents. These products operate on the actual files, while a static browser planner could only estimate or prescribe the run.
- Internal SSD upgrade demand is repeated across compatibility, one-slot cloning, boot migration, heatsinks, and motherboard lane-sharing questions. However, Crucial's current free System Scanner analyzes the actual computer and outputs compatible memory/storage upgrades plus current storage analysis, while its selector covers another computer (`https://www.crucial.com/store/systemscanner`). Kingston offers the same scanner/selector class. Exact lane conflicts remain motherboard-model/manual-specific, so a trustworthy universal checker needs a continuously maintained model database or asks the user to transcribe the answer already present in the manual.
- Research-data planning is a real recurring institutional workflow, but DMPTool is free and already creates, co-authors, shares, downloads, copies, and finalizes funder/institution-specific plans through a template wizard (`https://dmptool.org/quick_start_guide`). DataCal is an especially close 2026 pre-release competitor: instrument type/rate/channels, sampling schedules, expedition legs, and spreadsheet imports produce per-device/leg/group volume, funder-ready DMP figures, maDMP JSON, storage allocation, and bandwidth plans (`https://datacal.org/`). It covers the proposed cluster's most defensible quantitative gap.
- Forensic acquisition has stable specialist demand and direct storage relevance, but the execution layer is free and mature. Guymager reads connected devices and creates dd, EWF/E01, AFF, or cloned images with configurable acquisition metadata (`https://guymager.sourceforge.io/`). GNU ddrescue prioritizes readable areas and resumes with a mapfile, while warning against repairs on a failing source (`https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html`). FTK Imager and NIST-tested tools add imaging, segmentation, and hash verification. A browser-only plan cannot identify the device safely, enforce a write blocker, observe bad sectors, predict failing-media throughput, or prove evidence integrity.

#### Finalist 1 — Internal SSD Upgrade & Migration Planning — 77/100, HOLD/NO-GO

- **Target and workflow:** PC owners, builders, and technicians move from “will this SSD work?” through slot choice, migration route, install, and post-upgrade validation. The long tail decomposes from internal SSD upgrade → laptop/desktop with one or multiple slots, SATA/NVMe and PCIe generation, boot/clone/clean install → exact compatibility, lane-sharing, clone-path, target-capacity, and validation questions.
- **Proposed Tool map:** (1) slot/SSD fit checker: host form factor, protocol, key/length, generation → blockers and negotiated class; (2) lane-sharing impact checker: populated ports and manual rules → disabled/degraded ports; (3) migration-path selector: free slots, enclosure/adapter, encryption and boot state → clone, image/restore, or clean-install route; (4) target-capacity/partition readiness checker: used space, recovery partitions, reserve, sector/firmware facts → capacity and prerequisite gaps; (5) post-upgrade validation builder: firmware/boot/TRIM/temperature/performance evidence → ordered acceptance checklist.
- **Competition and overlap:** Crucial and Kingston already answer Tool 1 using actual-system scanners and live compatibility catalogues. Tool 2 cannot be authoritative without a motherboard database/manual. Cloning utilities and vendor install guides own Tool 3. Tool 4 is mostly capacity arithmetic; Tool 5 is a checklist rather than a strong independent web tool. Tool 1 partially repeats External Storage T43 compatibility logic, Tools 3–4 reuse Storage Needs and Transfer models, and Tool 5 approaches the rejected burn-in/acceptance workflow.
- **Dependencies/feasibility/repeat use/monetization:** SSD, adapter, heatsink, and enclosure commercial adjacency is excellent and users repeat the workflow across machines. But the two highest-value answers need live SKU/model data or exact manufacturer documentation; a user-entered static substitute is less useful than the free scanner/manual. Static implementation is possible only by weakening the promise.
- **Score:** Monetization 36/40, Demand 31/35, Competition gap 10/25 = **77/100**. **Gates:** A PASS; B FAIL; C FAIL; D FAIL; E PASS; F FAIL; G FAIL; H PASS; I PASS. **Decision:** HOLD as a possible future guide/referral path, not a 4+ Tool cluster.

#### Finalist 2 — Multi-drive Data Consolidation & Duplicate Cleanup — 74/100, HOLD/NO-GO

- **Target and workflow:** home users, creators, and technicians reconcile old drives/backup snapshots into a canonical tree, preserve unique/newer files, then rebuild controlled copies. Long tail: data consolidation → multiple offline/online drives, exact vs renamed/versioned files, corrupt or incomplete copies, limited staging capacity → staging-capacity, scan/review workload, copy-wave, canonical-copy, and deletion-safety decisions.
- **Proposed Tool map:** (1) consolidation staging-capacity planner: drive totals, estimated unique ratio, keep-original policy, reserve → temporary and final target size; (2) duplicate-scan/review estimator: files/bytes, hash passes, throughput, suspected groups, review time → scan and human-review window; (3) copy-wave planner: sources/readers, source/destination rates, batches and verification → wave order and duration; (4) canonical-copy/deletion-safety validator: masters, independent copies, verification evidence, locations → allowed next action; (5) reconciliation worksheet generator: source trees and policies → per-drive manifest/checklist.
- **Competition and overlap:** Krokiet/Czkawka, dupeGuru, jdupes/rmlint, and FreeFileSync inspect actual files, mark reference/master folders, compare trees, hash content, and execute/rehearse copy or deletion. Tool 1 substantially repeats storage-capacity/headroom planners; Tool 2 cannot know real filesystem/hash performance and is subordinate to the scanner; Tool 3 repeats Local Transfer T22, External Bottleneck T44, and Field Media offload timing; Tool 4 repeats 3-2-1 T13 and Backup Verification T20; Tool 5 is a worksheet. The tools converge on one runbook rather than four independent decisions.
- **Dependencies/feasibility/repeat use/monetization:** No paid API or vendor database is required, static logic is feasible, repeat use is credible, and drives/NAS/software provide moderate adjacency. The problem is not implementability but value: the planner would sit in front of stronger free execution tools and duplicate four existing site models.
- **Score:** Monetization 30/40, Demand 32/35, Competition gap 12/25 = **74/100**. **Gates:** A PASS; B FAIL; C FAIL; D FAIL; E PASS; F PASS; G PASS; H PASS; I PASS. **Decision:** HOLD only if future evidence reveals an uncovered reconciliation output that execution tools do not provide.

#### Finalist 3 — Forensic Disk-image Acquisition Planning — 69/100, NO-GO

- **Target and workflow:** forensic technicians and advanced recovery practitioners prepare a source-preserving image before examination. Long tail: forensic imaging → healthy vs unstable source, raw/E01/AFF, one drive vs RAID member, write blocking, segment limits, destination filesystems → exact destination-capacity, duration, route/readiness, segmentation, and verification questions.
- **Proposed Tool map:** (1) destination-capacity/segment planner: source size, image format, estimated compression, filesystem limits, reserve → destination and segment count; (2) acquisition-window estimator: readable bytes, observed rate, retry policy and verification passes → base/range schedule; (3) write-blocker and route readiness checker: source/interface/host/isolation → stop/go prerequisites; (4) hash/verification window planner: algorithms/passes/rates → verification schedule and evidence fields; (5) batch acquisition scheduler: devices, stations, operators and destinations → safe queue.
- **Competition and overlap:** Guymager, ddrescue, FTK Imager, and other NIST-listed/tested tools already inspect, acquire, segment, log, resume, and verify. Real unstable-media time is unknowable before/while imaging, and the execution tool reports it better. Capacity/duration reuse existing transfer and storage models; route readiness approaches the recently rejected failed-drive recovery workflow. Segmentation and hashing are settings inside the same acquisition job, not clearly independent repeat-use tools.
- **Dependencies/feasibility/repeat use/monetization:** Stable user-entered logic avoids a live database, but the high-stakes answer depends on hardware state, write blockers, evidence policy, jurisdiction/organization procedure, and actual tool output. Static estimates can be built but cannot safely validate or certify the job. Specialist hardware/software adjacency exists, yet the audience and liability profile fit this home/small-team site poorly.
- **Score:** Monetization 24/40, Demand 28/35, Competition gap 17/25 = **69/100**. **Gates:** A PASS; B FAIL; C FAIL; D FAIL; E PASS; F PASS; G FAIL; H FAIL; I PASS. **Decision:** NO-GO; do not turn safety warnings into a superficial checker.

#### Final decision, QA, and handoff

- No candidate reached the recommended approximately 80 points while passing A–I. More importantly, no candidate passed the critical B/C/D combination: four uncovered exact Tool intents, four strong independent decisions, and non-overlap with the 47 existing tools. **Strong independent 4+ Tool cluster: none. Final decision: NO-GO.**
- Production changes are intentionally zero. Only this `handover.md` entry is included in the review commit `Record new workflow cluster review`; existing history and older research records remain intact.
- Local regression checks passed after the documentation change: `tools/qa.mjs` passed all 86 public pages and existing calculation/regression checks; `tools/content-qa.mjs` passed the 47/13/6/4/11/5 inventory and content safeguards; `git diff --check` passed; and the diff contained only this handover entry. Final push verification requires local `HEAD` = `origin/main` = live GitHub `main`, ahead/behind `0/0`, and a clean worktree. The exact final SHA is reported in the task result because a commit cannot contain its own hash.

### 2026-08-14 — Research and build External Storage Connection Planning

#### Safe remote preflight and source-of-truth baseline

- The session began in the existing `datastoragelab` clone on `main` at `b8bf768eac471e3304a75933427150c975482c5e`. The worktree was clean and `origin` resolved to `https://github.com/canghun13/datastoragelab`.
- `git ls-remote origin refs/heads/main` identified live GitHub `main` as `4f3d6080a2a93715c44b60336b0152f2e0513904`, 14 commits ahead of the local clone. A safe `fetch --prune` made `origin/main` match that live SHA, and `pull --ff-only` advanced the clean local `main` to it. The synchronized baseline had local/origin/live equality, ahead/behind `0/0`, and no user work to preserve.
- The source-of-truth baseline contained 78 public pages: 42 tools, 12 guides, five references, four comparisons, ten hubs, and five foundational pages. `handover.md` supplied the current cluster inventory, recent exclusions, UI rules, and the protected user-managed Home badge boundary; no full-site editorial audit was repeated.

#### New workflow universe and finalists

- Eleven workflow families not reused from the recent reject/hold list were screened: failed-drive recovery readiness; cross-platform filesystem selection; external-storage connection planning; new-drive burn-in and acceptance; storage sanitization and disposition; quota allocation; SMB/NFS permission planning; rack/install planning; SMART evidence triage; encryption and key custody; and physical media inventory/labeling.
- Each family was framed as a repeated user trigger, workflow, decision output, and current-site difference. Search decomposition moved from the broad problem to user/device/environment constraints and then to exact planner, checker, or troubleshooter intent. Previously screened surveillance, LTO/cold archive, VM/Proxmox, ZFS, RAID migration/rebuild, scrub/bit rot, digitization, IOPS, database sizing, microscopy, offline rotation, and Field Media precursor families were not recycled.
- **External Storage Connection Planning — 87/100, GO** (Monetization 37/40, Demand 29/35, Competition gap 21/25). Target users are laptop/workstation owners, creators, small offices, field teams, and technicians choosing or diagnosing USB/USB4/Thunderbolt storage. Long-tail evidence repeated across enclosure protocol/length fit, lowest-common link rate, slow external SSDs, hub/dock sharing, bus-power disconnects, cable capability, port scarcity, and controlled benchmark isolation. Gates A–I all passed: repeated demand, four uncovered tool-level intents despite one exact compatibility checker, five independent decisions, no existing-site duplication, one coherent drive-to-host workflow, user-supplied maintainable inputs, deterministic static implementation, strong storage fit, and repeated reuse across devices and layouts.
- Its five-tool map is deliberately not a tiered calculator split: (1) **compatibility checker** asks whether form factor, SATA/NVMe protocol, M.2 length, and 3.5-inch power agree; (2) **bottleneck planner** finds the lowest documented data rate and separate read/write ceilings; (3) **power-budget checker** compares peak device demand and downstream positions with a reserved shared supply; (4) **topology planner** allocates direct ports and tests shared port/bandwidth capacity; (5) **performance troubleshooter** converts one controlled measurement and path evidence into an ordered isolation sequence. The tools respectively output fit blockers, limiting components, watt/port margin, required shared links, and next diagnostic actions.
- Exact-purpose competition was checked per tool. NodeLoop provides a free M.2 Compatibility Checker, which reduces the gap for Tool 1 but does not cover the other four decisions. Search results for power budgeting and topology were dominated by specifications, articles, and forum answers; bottleneck and slow-drive results were largely vendor troubleshooters such as ASUS and Seagate rather than a neutral end-to-end planner. The cluster needs no SKU database, account, proprietary telemetry, paid API, or live price feed; users enter manual/specification values. Commercial adjacency is natural but was not embedded: enclosures, hubs/docks, cables, powered storage, adapters, and host upgrades.
- **New-drive Burn-in & Acceptance — 76/100, HOLD** (28/40, 29/35, 19/25). Replacement-drive and NAS communities show repeated acceptance questions, and a tentative map covered test-duration budgeting, batch acceptance, evidence recording, and exception triage. However, SeaTools, HDDScan, Hard Drive Engine, Synology SMART surfaces, and established destructive-test workflows already own the execution layer. Gate C failed because the proposed outputs collapsed toward one acceptance record, and Gate G failed because a static page cannot inspect a device or prove a destructive test completed safely. This was not stronger than the selected cluster.
- **Failed-drive Recovery Readiness — 72/100, HOLD** (28/40, 31/35, 13/25). Demand is high and decision trees from recovery firms plus GNU ddrescue documentation are abundant, but the proposed symptom triage, DIY-readiness, imaging-resource estimate, and escalation checklist repeatedly converge on the same high-stakes stop-or-escalate decision. Gates B, C, and G failed: strong free article/flowchart competition, weak four-tool independence, and no safe browser-only device inspection. Repeat use is also lower than connection planning.
- Sanitization had an exact free NIST 800-88 method selector plus the official NIST Rev. 2 reference, while filesystem, quota, permissions, SMART, key custody, rack planning, and media labeling either lacked a strong four-tool bundle, depended too much on platform policy, or offered thinner commercial/repeat-use value. They remain discovery notes rather than hidden GO candidates.

#### Technical basis and implemented scope

- The technical basis is documented, rate-driven, and conservative. USB-IF material establishes USB 3.2 5/10/20 Gbps modes and lowest-mutual-capability behavior; USB4 and cable/connector material provide the broader connection context. Intel Thunderbolt 4 and Thunderbolt 5 technical briefs describe their link families. Microsoft USBView guidance and Apple's port-identification guide support checking the negotiated/host path rather than inferring capability from connector shape. ASUS and Seagate troubleshooting material reinforces direct-path and known-good-cable isolation. All payload-efficiency values remain editable planning assumptions rather than claimed standards.
- Added H11 `/tools/external-storage/`; T43 `/tools/external-storage/drive-enclosure-compatibility-checker/`; T44 `/tools/external-storage/connection-bottleneck-planner/`; T45 `/tools/external-storage/usb-power-budget-checker/`; T46 `/tools/external-storage/port-topology-planner/`; T47 `/tools/external-storage/performance-troubleshooter/`; G13 `/guides/how-to-plan-an-external-storage-connection/`; and R06 `/reference/usb-thunderbolt-storage-path-reference/`.
- Added `assets/js/external-storage-tools.mjs` with five exported deterministic functions, bounded validation, explicit units, result rendering, input/change recalculation, Copy, Print, and Reset. Each tool has a distinct normal/failure output and the required purpose, preparation, method, interpretation, worked example, limitations, and next-step content.
- Integrated the cluster into Header Tools navigation, Home discovery, Tools, Guides, Reference, the closest existing Tool entry points, sitemap, `llms.txt`, `site-plan.md`, README inventory, and both QA suites. Only existing pages that receive new shared-component entry points received the `components.js?v=20260814` cache key. The protected Home directory-badge area and infrastructure settings were untouched.
- Final inventory is 86 public pages: 47 tools, 13 guides, six references, four comparisons, 11 hubs, and five foundational pages.

#### Local verification

- `tools/qa.mjs`: PASS for all 86 public pages, metadata, canonicals, links, sitemap, GA4, JSON-LD, JavaScript, prior calculations, external-storage structure, and independently stated external-storage expected decisions. The five new functions have 25 arithmetic/decision cases spanning normal, boundary, invalid, alternate, and failure/high-low scenarios.
- `tools/content-qa.mjs`: PASS for 86 pages and the 47/13/6/4/11/5 inventory. Tool guidance has a 490-word minimum and 686.7-word average; all required sections, favicon declarations, placeholder/empty-block checks, duplicate-paragraph checks, and repeated 12-word checks pass. `git diff --check` passes.
- Local browser QA covered the hub, all five tools, guide, and reference at 1440, 1280, 1024, 768, 430, 390, and 360 px: 56 page/viewport combinations had zero document overflow, zero clipped input/select/button/link controls, complete shared header/footer rendering, and visible success results for every tool.
- Every tool was exercised at 390 px through initial result, changed input/decision, Copy success, Print action, and Reset-hidden state. The four numeric tools rejected invalid values with field messages; the select-only compatibility checker changed from a pass to explicit blockers. The bottleneck tool also proved a 40 Gbps default path and 10 Gbps cable case; console errors were empty. Mobile screenshots confirmed readable form suffixes, result cards, tables, buttons, and focus treatment.
- Production deployment initially returned the expected transient GitHub Pages 404, then served H11 and all seven child pages with their current titles and `components.js?v=20260814`. A 24-combination production matrix (eight pages at 1440, 390, and 360 px) passed with visible results for all five tools, zero document/result overflow, zero clipped interactive controls, complete shared header/footer rendering, and no console errors.
- Production interaction QA at 390 px passed for every tool: initial result, materially changed decision, Copy confirmation, enabled Print action, Reset-hidden result, and bounded validation on all numeric-input tools. Compatibility changed from a valid M.2 NVMe pair to explicit blockers. The 10 Gbps cable scenario reduced the modeled ceiling to 1,000 MB/s; the higher USB device count produced the power-failure decision; two hub links made the topology ready; and a low measurement produced the connection-constraint troubleshooting decision.
- Production discovery passed: H11 exposes all five tools plus G13 and R06; Header navigation and Home each expose one external-storage entry point; T40 Media Offload, the DAS vs NAS Cost Calculator, and T22 Local Network Transfer each render one contextual continuation. No DNS, proxy, CNAME, Pages-domain, HTTPS, GA4, Search Console, contact, or protected Home badge setting changed.
- Implementation commit `d92d53eb0ec4e59a2f89f5184b7522d50884b736` (`Add external storage connection planning cluster`) was pushed and production-tested with local `HEAD` equal to live GitHub `main`. This handover-only deployment record is the final session commit; final local/origin/live equality, ahead/behind `0/0`, and clean status are verified after its push.

### 2026-08-11 — Fix calculator two-column field alignment

#### Safe preflight and audit scope

- Started clean on `main` at local, `origin/main`, and live GitHub `main` commit `2f048b40e7836cea3e97bb684345da360e3e558f`; `git ls-remote`, `git fetch --prune origin main`, and ahead/behind checks all returned `0 0`, so no pull, merge, or rebase was needed.
- Built the inventory from the rendered repository forms rather than the README: 42 calculator/planner/checker pages, 42 forms, and 49 `.field-grid` containers. This includes all four Field Media tools, CMR/SMR, all five SSD endurance tools (T34–T38), and the runtime-rendered Cost & Power forms. Non-form hub and editorial pages were excluded from the coordinate audit.
- At 1024px before the repair, 26 pages and 40 same-row pairs failed. The repeated defect was a 22.5px control-top difference whenever adjacent labels occupied different numbers of lines. Home Storage & Backup and SSD Remaining also demonstrated that the issue coexisted with normal helper text; helpers were not removed or compressed.

#### Implementation

- Replaced the old CMR-only bottom-alignment exception with one shared desktop/tablet field-grid pattern. Above the existing 900px single-column breakpoint, each `.field` spans shared `label / control / helper / error` subgrid tracks. This aligns controls by their actual grid row while retaining label wrapping, optional helper text, error space, existing form widths, and the current responsive breakpoints.
- Extended `tools/qa.mjs` with generic safeguards for all 42 calculator pages: shared subgrid tracks, control/error track placement, all 35 static form shells, and the seven runtime Cost & Power forms. The CMR result-table regression guard remains intact; only its obsolete one-page alignment implementation assertion was replaced.
- Updated all 78 public HTML stylesheet references to `styles.css?v=20260811-1` so the common CSS repair is cache-safe in production. No formula, default, content, URL, SEO, navigation, header, footer, analytics, sitemap, or infrastructure setting changed.

#### Local browser and runtime verification

- Actual rendered coordinate audit used visible grid geometry, label/control rectangles, helper heights, and a 0.75px tolerance. At 1440px, 1280px, and 1024px it inspected 114 two-column pairs per width with **0** control-top mismatches. At 900px and 768px all 49 grids correctly became one column (0 two-column pairs to compare).
- Principal dynamic states were exercised on all 42 tools: 14 forms had a visible alternate select state (including growth method, RAID layout, CMR/SMR, SSD cache measured/estimated mode, SSD metric/unit, and Field Media verification/copy choices); all had 0 alignment failures and 0 overflow. The remaining forms have numeric-only principal states and were measured at their defaults.
- At 430px, 390px, and 360px, all 42 tools retained one-column grids with 0 document, control, suffix, select, helper, and button overflow failures.
- All 42 default calculations rendered results. Changed-value recalculation and Copy Results passed for all 42 (21 direct bounded-input/select cases plus 21 unrestricted-number cases); bounded invalid-input validation passed for 20 applicable forms, while 22 select-only or unconstrained forms have no comparable bounded-invalid state. Reset hid results for all 42. Print actions were clicked successfully on representative Home, CMR/SMR, SSD Cache, and Field Media tools; all 42 pages expose the Print Results action. Browser warning/error logs were empty.
- `node tools/qa.mjs`, `node tools/content-qa.mjs`, and `git diff --check` passed. The post-fix browser pass also confirmed zero result-state overflow at 1024px.

#### Deployment

- Implementation commit `d573889098669fdb43eb35c26f2dc1ed26f8d028` (`Fix calculator two-column field alignment`) was pushed to `origin/main`.
- GitHub Pages now serves `styles.css?v=20260811-1`. Real production browser testing covered Field Media Offload, CMR/SMR, VM/Container SSD Endurance, and Home Storage & Backup at 1440px, 1024px, 900px, 768px, and 390px. The 1440px/1024px run measured 18 representative two-column pairs per width with 0 control-top mismatches; 900px, 768px, and 390px correctly used single-column forms.
- All 20 production success-state checks rendered visible results with zero document overflow. The exact new stylesheet marker appeared on every page, and browser warning/error logs were empty. Final local/origin/live commit synchronization and a clean worktree are verified after this deployment-record commit.

### 2026-08-11 — Research and build Field Media Offload Planning

#### Remote preflight

- Started from clean `main` at `d2d62a113ec583781034209222e21b271b7f1478`; local `HEAD`, `origin/main`, and live `refs/heads/main` matched with ahead/behind `0/0`, so no pull was required.
- The source-of-truth inventory contained 71 public pages: 38 tools, 11 guides, four references, four comparisons, nine hubs, and five foundational pages.

#### Deep long-tail review

- Screened ten intent families that were not part of the previously excluded surveillance, LTO, VM, ZFS, RAID migration, scrub, digitization, IOPS, or database-sizing set: field media ingest/offload; offline removable-drive rotation; replication backlog/RPO; cache working-set tiering; spare-drive fleet operations; microscopy/scientific acquisition; game recording/replay; multitrack audio; system-image deployment repositories; and AI dataset/checkpoint storage.
- Rejected replication backlog, game recording, and AI checkpoint storage after exact mature calculators surfaced; rejected cache/tiering, spare-drive fleet, and physical transfer after the long tails failed to support four coherent tools; held system-image deployment and multitrack audio below the final three because search breadth or exact head-tool competition was weaker.
- Final 100-point scorecard uses the required Monetization / Demand / Competition-gap weights (40/35/25): Field Media Offload **88/100 — GO** (35/30/23); Microscopy Data Acquisition **78/100 — HOLD** (24/29/25); Offline Backup Drive Rotation **64/100 — HOLD** (27/27/10). Gate results are separate from the score: Field Media passed A demand, B long-tail gap, C four-tool depth, D distinct decision, E workflow coherence, F maintainability, and G monetization adjacency; Microscopy passed A–F but failed G; Offline Rotation passed A/C/E/F/G but failed B and D. Only the field-media candidate cleared 80 while also passing B/C/D.
- Field-media SERP decomposition covered capture format (photo/video, file size/bitrate, cameras and slots), offload topology (cards, parallel readers, one or more destinations, checksum mode), trip logistics (daily ingest, shoot days, drive sets, custody), and release policy (verified duration, nightly window, backlog, hold days). Photo Tools Plus accepts card capacity, file type/size, and optional camera resolution and returns files or video time plus usable capacity, but omits multi-camera/slot allocation and spares (`https://phototoolsplus.com/tools/memory-card.php`). GearAtlas accepts bitrate/camera/codec/shoot inputs and backup copies for video capacity, but does not schedule reader waves or card release (`https://www.mygearatlas.com/tools/video-storage-calculator`). AutoOffload executes multi-card, two-destination, BLAKE3-verified copies and emits manifests/reports, but it is workflow software rather than a pre-shoot time and hardware planner (`https://autooffload.com/`). Tools for Film accepts total TB, growth, media selections, retention, and returns 3-2-1 compliance/cost projections, but it does not discretely allocate trip drives or control source-card reuse (`https://www.toolsforfilm.com/tools/backup-strategy`).
- Microscopy showed a real integrated-tool gap: Huisken Lab publishes Z-stack/time-lapse examples, UCSF derives channel/Z/time/position sizes, and NI explains instantaneous and average acquisition bandwidth, yet no reviewed result joined experiment volume, sustained acquisition, analysis scratch, and lab retention. It remains a future research candidate because the buyer/advertiser layer is substantially narrower (`https://huiskenlab.com/data-storage/`, `https://calm.ucsf.edu/dealing-imaging-data`, `https://knowledge.ni.com/KnowledgeArticleDetails?id=kA03q000000YI5bCAG&l=en-US`).
- Offline rotation has recurring operational questions, but Simplified Tools already provides an exact rotation planner and BackupAssist documents removable-drive pools/GFS. Data Storage Lab also already owns 3-2-1 topology, retention, frequency, recovery, verification, and offsite capacity, so the proposed tools would overlap more than they extend (`https://www.simplified.tools/plan_backup_rotation`, `https://www.backupassist.com/HTMLHelp/V6/content/html/basics/modifyjobs/destination/exthdd/basics_modify_nt_dest_exthdd_2nohdd.html`).
- Existing T03 Creator Media Storage Planner starts from known GB per project/day and forecasts working/archive/copy capacity over years. The new cluster ends earlier and owns discrete card packing, the multi-reader copy window, portable drive-set allocation, and the evidence-based card-release schedule. Monetizable categories are SD/CFexpress media, readers and hubs, rugged portable SSD/HDD devices, cases, cables, and portable power; no affiliate code was added.

#### Implemented scope

- Added H10 `/tools/field-media/` with T39 Memory Card Quantity Planner, T40 Media Offload Time Planner, T41 Field Backup Drive Planner, and T42 Memory Card Rotation Planner.
- Added G12 `/guides/field-media-offload-verification-workflow/` and R05 `/reference/field-media-copy-verification-checklist/`.
- Added `assets/js/field-media-tools.mjs` with exported, testable calculation functions, discrete upward allocation, validation, live result updates, Copy, Print, and Reset actions.
- Integrated Header Tools, Tools, Guides, Reference, Home, Creator Media, Video Editing Network, and 3-2-1 guide entry points; updated sitemap, `llms.txt`, `site-plan.md`, README, and automated inventory/calculation checks.
- The public inventory is now 78 pages: 42 tools, 12 guides, five references, four comparisons, ten hubs, and five foundational pages.

#### Verification

- `tools/qa.mjs`: PASS for all 78 public pages, metadata, canonicals, links, sitemap, GA4, JSON-LD, JavaScript syntax, and calculation regressions. Each new tool has normal, boundary, invalid, fixed-unit arithmetic, and high/low or failure-path coverage.
- `tools/content-qa.mjs`: PASS; 42 tool guides retain a 503-word minimum and 709.2-word average with all required sections, no duplicate paragraphs, and no repeated 12-word sequences.
- Browser QA at 390 px and 1280 px: PASS. Default outputs matched automated audits (10 cards, 1.05-hour verified offload, five physical drives, 12-card rotation); invalid inputs hid results and displayed field errors; changing the owned pool to ten produced a two-card shortfall; there was no horizontal overflow or console warning/error; Header and Home field-media entry points rendered correctly.
- Production QA after GitHub Pages/Cloudflare deployment: PASS. H10, all four tools, G12, and R05 returned the current titles/content. All four tools calculated successfully; Copy reported success, Reset hid results, invalid camera count produced the intended validation message, and Print remained enabled. Successful offload results were measured at 1440, 1024, 768, 430, 390, and 360 px with document `scrollWidth === clientWidth`; the 360 px result table remained readable and console warning/error logs were empty.
- Production discovery: PASS after waiting for the asynchronous shared-component load. Home exposed one Field production card, and T03 Creator Media, T26 Video Editing Network, and G06 3-2-1 each exposed one contextual field-media continuation link. The first deployment revealed that these existing pages still referenced the old component cache key; `ad53756b9b3908366a9a178146d06a1d8140ce97` refreshed the relevant 11 pages to `components.js?v=20260811` and the production recheck passed.
- Implementation commits: `d4ba9bc61578543c646fdd7bf8dcbe63012f9f87` (cluster, research record, QA, and architecture integration) and `ad53756b9b3908366a9a178146d06a1d8140ce97` (shared-component cache-key refresh). This production-verification addition is the final handover-only commit for the session.

### 2026-08-10 — Fix CMR result table mobile readability

**Starting state and production reproduction**

- Branch `main` started clean at local, `origin/main`, and live GitHub `main` commit `cb4d6fdc02ff4a7b3fa12def7add173dd7d79bff` with `0 0` ahead/behind.
- Production CMR/SMR at 390px and 360px kept document overflow at zero and correctly started the table wrapper at `scrollLeft: 0`, with no table transform, negative margin, clipping, or first-column crop. The usability failure was instead the 357.7px auto-layout table: `AREA / REQUIREMENT / WHY` rendered at 140px / 125px / 93px, creating 6-, 9-, and 7-line rows and a 657px Purchase brief checks card.
- The existing wrapper is intentionally responsible for horizontal scrolling. The shared narrow-grid containment remained correct and was not reverted.
- Success-state comparison at 390px covered HDD vs SSD, NAS Bay, and 3-2-1 Backup tables. HDD vs SSD already uses a 42rem fixed table and readable 155px / 181px / 336px columns for its long final text; NAS Bay and 3-2-1 did not expose the same CMR-style allocation failure, so no unrelated table changed.

**Implementation and local validation**

- Under 600px, only `data-tool="cmr"` now gives the Purchase brief checks table `width: max(100%, 42rem)` and `table-layout: fixed`, with `AREA / REQUIREMENT / WHY = 22% / 30% / 48%`. At mobile width that produces about 148px / 202px / 323px: all current rows use three lines without clipping while the existing wrapper owns the 672px internal scroll region.
- The earlier CMR field-grid `align-items: end` rule remains unchanged. At the two-column 1440px and 1024px widths both first-row and second-row select tops matched; 768px and below retain the existing one-column form with zero document overflow.
- `tools/qa.mjs` now enforces the CMR table-wide readable width and all three mobile column allocations without weakening prior HDD/SSD or containment assertions. All 71 pages use `styles.css?v=20260810-3` for cache-safe delivery.
- Browser QA passed at 1440, 1024, 768, 430, 390, and 360px: initial and success states had zero document/result-card overflow, no clipped cells, wrapper `scrollLeft: 0` at first display, and no console warning/error. At 390px the wrapper was explicitly scrolled horizontally to 300px while document overflow remained zero.
- Default and changed-select calculations, resulting recommendation/table text, Check suitability, and Start over passed; changed inputs produced `SMR may be conditionally suitable`. Calculation logic and result copy remain unchanged.
- `node tools/qa.mjs`, `node tools/content-qa.mjs`, and `git diff --check` passed.

**Deployment**

- Implementation commit `213bea7712112d13f943c9ea822404b9ee5c9378` (`Fix CMR result table mobile readability`) was pushed to `origin/main`.
- GitHub Pages serves `styles.css?v=20260810-3`. Production success-state QA at 390px and 360px passed with a 672px fixed table, 314px/284px wrapper clients, initial `scrollLeft: 0`, zero document/result-card overflow, no clipped cells, and `WHY` at 323px in three lines. The visible first columns, internal scrollbar, summary, limit, and actions were visually checked by screenshot.
- Production changed-select QA returned `SMR may be conditionally suitable` with the expected Purchase brief rows, and Start over hid results. Console warnings/errors were zero.
- Deployment-record commit: this commit. After it is pushed, final local `HEAD`, `origin/main`, and live GitHub `main` synchronization is verified and reported with the exact hash.

### 2026-08-10 — Fix NAS tool mobile table and field alignment

**Starting state and audit**

- Branch `main` started clean at local, `origin/main`, and live GitHub `main` commit `b29a3cc578e975a42ee223af14ab2465ad742861` with `0 0` ahead/behind.
- Production HDD vs SSD at 390px kept document overflow at zero but gave the `Factor / Recommendation / Reason` columns 137px / 155px / 98px. The three reason sentences then occupied 9, 8, and 10 lines, so the fault was allocation and readability, not the permitted table-wrapper scroll.
- Production CMR vs SMR at 1024px retained its two-column form. A one-line label's select began at 500.8px while the adjacent two-line label's select began at 523.4px: a 22.5px same-row control misalignment caused by the shared grid's default stretch behavior.
- Comparison at 390px covered the existing RAID Capacity, NAS Bay, and 3-2-1 Backup result tables. Their final explanatory columns were 138px, 154px, and 109px for materially shorter copy; the HDD/SSD `Reason` text is 60–75 characters and needs a wider table-level allocation. Two-column form comparison covered NAS Bay, RAID Capacity, and Expansion Headroom; only the scoped CMR/SMR form was changed.

**Implementation**

- `assets/css/styles.css` keeps common table and field-grid behavior unchanged. Under 600px, only `data-tool="media"` gives its three-column result table a 42rem readable table width and a `23% / 27% / 50%` Factor/Recommendation/Reason split. Its existing `.table-wrap` remains the only horizontal scroll region.
- Only `data-tool="cmr"` applies `align-items: end` to its field grid. This bottom-aligns the fields in each existing two-column row, making their fixed-height selects begin together without changing breakpoints, labels, control heights, or unrelated forms.
- `tools/qa.mjs` now protects both targeted CSS hooks and the HDD/SSD column allocation. All 71 public pages use `styles.css?v=20260810-2` so production loads the scoped fix instead of a cached prior stylesheet.
- No calculator logic, defaults, content, metadata, URL, sitemap, header, footer, GA4, CNAME, Cloudflare, or GitHub Pages setting changed.

**Local validation**

- `node tools/qa.mjs` passed all 71 pages and 96 calculation cases; `node tools/content-qa.mjs` passed 71 pages with 503-word minimum and 726.4-word average tool content. The final diff check is recorded after the deployment record.
- Browser QA at 1440, 1024, 768, 430, 390, and 360px found zero document horizontal overflow and zero warning/error console entries for both target tools. HDD/SSD showed no clipping; at 430/390/360px the table was 672px within its 342px/314px/284px wrapper and each Reason row used three lines rather than one-to-two-word wrapping. At 1440/1024/768 it retained normal unscrolled presentation.
- CMR/SMR retained two columns at 1440 and 1024 with equal first-row and second-row select top coordinates; it preserved the existing one-column layout at 768px and below with zero overflow.
- HDD/SSD default calculation, changed-data recalculation, result rendering, Copy Results, Print Results action, Start over, and bounded capacity validation passed. CMR/SMR select changes produced `SMR may be conditionally suitable`, then Start over hid results; the select-only form has no invalid free-form value state to validate.

**Deployment**

- Implementation commit `9b4b1b13b1ae25cfa777e64ef8f0217ffc3db820` (`Fix NAS tool mobile table and field alignment`) was pushed to `origin/main`.
- GitHub Pages now serves `styles.css?v=20260810-2`. Production browser QA at 390px and 360px passed both targets with zero document overflow and zero warning/error console entries. HDD/SSD kept its 672px table inside the 314px/284px wrapper, allocated 155px / 181px / 336px to the three columns, showed every Reason in three lines, and had no clipped cell. CMR/SMR retained its existing one-column mobile form with complete labels and controls.
- Deployment-record commit: this commit. After it is pushed, final local `HEAD`, `origin/main`, and live GitHub `main` synchronization is verified and reported with the exact hash.

### 2026-08-10 — Contain calculator result grids on narrow screens

**Starting state**

- Repository: existing working clone confirmed with `git rev-parse --show-toplevel`; the machine-specific absolute path is intentionally not stored in this portable handover.
- Branch: `main`; initial local `HEAD` was `72d374ec9a3471fa79c2e05e3aff23178764e646`, clean and nine commits behind the live GitHub `main`.
- Live `main` and refreshed `origin/main`: `b8bf768eac471e3304a75933427150c975482c5e`. The clean local branch was fast-forwarded to that commit, leaving `0 0` ahead/behind before the audit and implementation.
- Inventory recalculated from files and sitemap: 71 public pages, 38 tools, nine hubs, 11 guides, four references, four comparisons, and five foundational pages.

**Audit and selection**

- Baseline `node tools/qa.mjs` passed all 71 pages and 96 calculation cases; `node tools/content-qa.mjs` passed with a 503-word tool minimum and 727.5-word average; `git diff --check` passed.
- Production initial-state browser QA passed all 71 sitemap URLs at 390px for one H1, shared header/footer, canonical, favicon, no document overflow, and no console warning or error.
- Production successful-result QA exposed the material regression that initial-state checks missed: at 360px, 10 of 38 calculators widened the document after calculation; at 390px, HDD vs SSD, CMR vs SMR, and SSD Endurance & Lifespan still overflowed; the SSD lifespan result also failed at 430px. The largest measured excesses were 96px for HDD vs SSD and 79px for SSD lifespan at 360px.
- Selected work: contain shared tool and result grids so wide tables and decision content scroll inside their intended wrappers instead of increasing page width. This had direct mobile usability impact, affected multiple established clusters, had a small shared fix, and could be objectively verified across every calculator.
- Other candidates: calculator validation errors are not consistently associated with inputs for assistive technology and remain a separate accessibility work package; cost defaults are editable, explicitly user-supplied assumptions rather than hidden live prices; search/title work had no accessible GSC or GA4 evidence; previously rejected new clusters had no new evidence and remained NO-GO.
- GSC and GA4 reporting access was unavailable in this environment. No analytics or Search Console setting was changed.

**Implementation**

- `assets/css/styles.css` now permits direct tool-layout children to shrink and defines the result grid track as `minmax(0, 1fr)`. Tables keep their existing controlled horizontal region; no `overflow-x:hidden`, clipping, or calculation change was introduced.
- `tools/qa.mjs` now enforces both narrow-grid containment invariants.
- All 71 public pages use `styles.css?v=20260810` so the shared fix is not masked by an older cached stylesheet.
- No calculation logic, formula, default, content, title/meta, canonical, JSON-LD, URL, sitemap, internal-link graph, contact, GA4, CNAME, Home directory badge, DNS, Cloudflare, or GitHub Pages setting changed.

**Local validation**

- Automated QA passed after implementation: JavaScript syntax, `tools/qa.mjs` (71 pages and 96 calculations), `tools/content-qa.mjs`, CSS-version coverage on all 71 pages, and `git diff --check`.
- All 38 calculators passed a real default calculation at 360px with visible results, `scrollWidth === clientWidth`, and no console warning or error.
- The 10 calculators that failed the production baseline passed 30 focused result-state checks at 430, 390, and 360px.
- Six representative calculators spanning Storage Needs, NAS Configuration, Backup Planning, Network & Performance, Cost & Power, and SSD Endurance passed 42 result-state checks at 1440, 1280, 1024, 768, 430, 390, and 360px.
- SSD lifespan at 390px passed initial calculation, changed-input recalculation, GB-to-TB conversion (`1000 GB` to `1 TB`), Copy Results, enabled Print Results, Reset, bounded validation, zero document overflow, and zero console errors. Desktop Tools and mobile Menu open/Escape-close behavior also passed.

**Git and deployment**

- Implementation commit `50f79d903c91c2e0f9f9f2ac5275178396824539` (`Fix narrow calculator result overflow`) was pushed to `origin/main`; local `HEAD`, `origin/main`, and live GitHub `main` matched with `0 0` ahead/behind before this deployment record.
- GitHub Pages served the new `styles.css?v=20260810` marker and both containment rules with HTTP 200. Production retesting passed the 10 previously failing calculators at 430, 390, and 360px (30 checks), all 38 calculators after a real default calculation at 360px, and six cluster representatives at 1280 and 390px. Every check had visible results, `scrollWidth === clientWidth`, and no console warning or error.
- The live SSD lifespan calculator at 390px passed initial calculation, changed-input recalculation, GB-to-TB conversion, Copy Results, enabled Print Results, Reset, invalid reserve feedback, the new CSS marker, zero document overflow, and zero console errors.
- Deployment-record commit: this commit. It is pushed and the final local/origin/live synchronization is verified immediately after creation; the final task report records the resulting hash.

**Known issues**

- Many calculator validation messages still lack consistent `aria-describedby`/`aria-invalid` association and first-invalid-field focus. This was confirmed during the audit but intentionally not mixed into the responsive runtime work package.

### 2026-08-05 — Repair SSD endurance calculator form regression

**Starting state**

- Branch: `main`; starting commit and live GitHub `main`: `576ab23228f0565d7cfc5c793cf813350b666eaa`.
- `git fetch --prune origin main` succeeded; local `HEAD`, `origin/main`, and `git ls-remote origin refs/heads/main` matched with `0` ahead and `0` behind.
- Working tree was clean before this task.

**Completed**

- Rebuilt source form markup for T34–T38 around shared compact `ssd-unit-group` controls: selectable GB/TB, TBW/PBW, and TB/PB pairs; fixed units as one suffix.
- Removed duplicate and detached unit text, including converter `years years`, standalone GB/day and days helpers, and repeated T38 decimal/percentage wording. Existing-write notes now sit below their own control.
- Standardized the five forms' control dimensions, focus treatment, helper style, and responsive layout. The 108px select/add-on leaves room for the arrow and stays one line at 390px.
- Added T35 source-metric feedback and T36 mode-aware display/disabled controls, so only active measured or estimated cache inputs are submitted.
- Extended unit normalization to cache, VM/container, and remaining-endurance calculations. Equivalent GB/TB, TBW/PBW, and TB/PB values produce equal results; exhausted existing-write states are explicit.
- Kept T34's verified reserve model: reserve is retained from remaining endurance. The reference scenario remains 219 TB logical writes, 328.5 TB base physical writes, 480 TB usable endurance, 151.5 TB headroom, and about 0.329 rated DWPD.
- Added automated source-structure and unit-equivalence checks for the SSD forms and calculators.

**Validation**

- `node --check assets/js/ssd-endurance-tools.mjs`, `node tools/qa.mjs`, `node tools/content-qa.mjs`, and `git diff --check` passed.
- Browser QA covered T34–T38 at 1440, 1280, 1024, 768, and 390px: 25 page/width checks had zero horizontal overflow, result-panel clipping, unit-control wrapping, select-width failures, and console errors. A 390px visual check confirmed the compact cache form and 108px suffix/select treatment.
- T34 produced the reference 240.9/328.5/438 TB low/base/high rows, retained the same result after GB→TB, TBW→PBW, and TB→PB changes, and reset to 1000 GB, 600 TBW, and 0 TB. T36 toggled measured/estimated mode correctly, disabling the inactive fields. All five calculators produced results, copied successfully, printed through their visible action, and reset cleanly.

**Git and deployment**

- Implementation commit `53635ecc42d62f43903e000ea0d17dbb9495b47b` (`Fix SSD endurance calculator form regression`) was pushed to `origin/main`.
- After push and fetch, local `HEAD`, `origin/main`, and live `git ls-remote origin refs/heads/main` all matched that commit; ahead/behind was `0 0` and the working tree was clean.
- GitHub Pages verification served the cache planner and SSD module with HTTP 200 and the actual new compact-group, mode-field, unit-normalization, and mode-logic markers. This complements—not replaces—the local browser interaction QA above.

**Next safe task**

- The verified SSD form-regression repair is committed as `Fix SSD endurance calculator form regression`; push it and verify local `HEAD`, `origin/main`, and live GitHub `main` match before considering the task complete. Do not alter URLs, sitemap, header, footer, GA4, CNAME, or non-SSD calculator behavior.

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
- Deployment verification: after normal GitHub Pages propagation, HTTPS served Home, H03, T13, T19, G05, G06, G08, G09, C02, Contact, and Privacy. Each had one H1, its expected apex canonical URL, and a loaded stylesheet. T13 calculated live to **Close the independent-copy gap**; browser console errors were empty. Contact and Privacy retained `mailto:canghun13@naver.com`.
- Phase 4 implementation commit: `5f09717b7c11c1de427eae361ebca402ee987a75` (`Build Data Storage Lab Phase 4`), pushed to `origin/main` with local and remote heads equal and ahead/behind `0 0` before this deployment-record update.

---

### 2026-07-30 — Build Phase 5 Network & Performance

- Starting state: `main` at `2c897044909e611bf9603fbbbe45584180fb430c`, local and `origin/main` synchronized (`0 0`), with no pre-existing working-tree changes.
- Confirmed Phase 5 scope from `site-plan.md`: H04, T21–T26, R03, and C03 (nine new public pages).
- Added H04 **Network and Transfer Planning Tools** at `/tools/network-performance/`.
- Added T21 **Cloud Backup Upload & Restore Time Calculator**, T22 **Local Network Transfer Time Calculator**, T23 **Backup Window Calculator**, T24 **1GbE vs 2.5GbE vs 10GbE Selector**, T25 **Concurrent User Bandwidth Planner**, and T26 **Video Editing Network Planner** under `/tools/network-performance/`.
- Added R03 **Backup Transfer Time and Bandwidth Formulas** and C03 **2.5GbE vs 10GbE for NAS** at their planned URLs.
- Added `assets/js/network-tools.mjs`, a shared bounded bottleneck model for WAN/LAN effective throughput, transfer ranges, recurring backup windows, concurrent workloads, editing streams, and practical Ethernet-tier guidance. Every estimate discloses protocol/operational limitations and does not treat link rate as payload throughput.
- Updated Home, tools directory, shared navigation/footer, sitemap, llms, README, and automated QA. Public HTML count is now 50.
- Automated verification: bundled `node tools/qa.mjs` passed. It validates metadata, canonical URLs, GA4, JSON-LD, internal links, sitemap parity, JavaScript syntax, 75 Phase 2/3/4/5 calculation cases (including 18 Phase 5 cases), Phase 1 regression behavior, and confirmed contact links. `git diff --check` passed.
- Local browser QA: all nine Phase 5 pages passed at 1440, 1280, 1024, 768, and 390 px (45 combinations): exactly one H1, shared header present, and no horizontal overflow. The expanded primary navigation originally overflowed at 768 px; the mobile-menu breakpoint was moved to 900 px and the retest passed. At 390 px, T21 passed calculation, Copy Results, Start Over, mobile menu, and Escape close checks; browser console errors were empty.
- Deployment verification details follow after publication. No DNS, Pages, proxy, HTTPS, GA4, or Search Console setting was changed.
- Deployment verification: after normal GitHub Pages propagation, HTTPS served Home, H04, T21–T26, R03, C03, Contact, and Privacy. Each had one H1, its expected apex canonical URL, and a loaded stylesheet. T21 calculated live to **Initial upload: 18.5 days** with browser console errors empty. Contact and Privacy retained `mailto:canghun13@naver.com`.
- Phase 5 implementation commit: `bb93bd41d4134227c026eb35ea833919838f50ad` (`Build Data Storage Lab Phase 5`), pushed to `origin/main` with local and remote heads equal and ahead/behind `0 0` before this deployment-record update.

---

### 2026-07-30 — Complete the 63-page launch inventory and visual system

- Starting state: `main` at `90d164d02bb3002639e8e786d4c29da743bae309`, local and `origin/main` synchronized (`0 0`), with no pre-existing working-tree changes.
- Completed the exact remaining scope from `site-plan.md`: H05–H08, T27–T33, G04, and R04. No unplanned public page was added.
- Added the Cost and Power hub and seven calculators covering five-year NAS/cloud cost, DAS/NAS cost, usable-TB drive cost, electricity, replacement reserves, UPS sizing/runtime, and full-system budgets.
- Added the Guides, Reference, and Comparisons indexes, the UPS sizing guide, and the UPS watts/VA/runtime reference.
- Public inventory is now exactly 63 HTML pages: 33 tools, 10 guides, 4 references, 3 comparisons, 8 hubs, and 5 foundational pages.
- Rebuilt the shared visual system across the site: compact workflow-oriented hero treatment, storage-meter brand motif, restrained technical grid, decision-lane hubs, consistent two-zone tool workbenches, semantic runtime breadcrumbs, compact four-column footer, and a reduced top-level navigation.
- Shared navigation now exposes Home, Tools, Learn, About, and Home Planner. Tools and Learn use accessible desktop panels; mobile navigation, keyboard Escape handling, and outside-click dismissal were verified.
- Removed the obsolete badge/directory placeholder from the shared footer and the remaining Phase 1 fallback. No badge is displayed because no user-managed badge was supplied.
- Added bounded validation and explicit limitations to the cost/power model. UPS results remain estimates and require manufacturer load/runtime-curve confirmation.
- Updated Home, the Tools directory, sitemap, `llms.txt`, README, and automated QA for the completed launch inventory. Contact remains `canghun13@naver.com`; GA4 remains `G-Z7QV39WJ35`.
- Automated QA: all 63 public pages passed metadata, canonical, sitemap, internal-link, GA4, JSON-LD, JavaScript, badge, and contact checks; all 96 calculation cases passed. `git diff --check` passed.
- Local browser QA: all 63 pages passed at 1440, 1280, 1024, 768, 600, and 390 px (378 combinations) with exactly one H1, shared header/footer, semantic breadcrumbs on non-home pages, and no horizontal overflow.
- Manual interaction QA: the UPS tool passed calculation, Copy Results, Reset, mobile-menu, and Escape checks at 390 px; the desktop Tools panel passed click-open, Escape-close, and outside-click-close checks at 1280 px. Browser console errors were empty.
- Added a shared `?v=20260730` version marker to the CSS and component-script URLs on all 63 pages after production verification reproduced a stale cached `components.js`; this ensures existing visitors receive the new design and runtime breadcrumb behavior. QA resolves query-bearing local asset paths explicitly.
- No DNS, GitHub Pages, proxy, HTTPS, GA4 property, or Search Console configuration was changed.
- Implementation commits: `5089f86` (`Complete Data Storage Lab launch inventory`), `2f37eb1` (`Rebuild Data Storage Lab visual system`), and `eba273d` (`Version shared launch assets`).
- Production deployment verification: after normal GitHub Pages propagation, HTTPS served Home, Tools, all eight hubs, two new Cost and Power tools, existing RAID/backup/network tools, the UPS guide and reference, a comparison, About, Contact, and Privacy (21 representative URLs). Every checked page had one H1, the expected apex canonical URL, the versioned stylesheet and component script, the new shared header/footer, no badge placeholder, and a semantic breadcrumb on non-home pages.
- The live UPS calculator returned **Specify at least 300 VA and 200 W** for a 150 W load with the default assumptions. Copy Results, Reset, the desktop Tools panel, and Escape close all passed; browser console errors were empty.
- Final synchronization details follow in the deployment-record commit.

---

### 2026-07-30 — Fix Home decision step alignment

- Starting state: `main` at `6194e32522cad0a87af81d816601219f32c1e228`, local and `origin/main` synchronized (`0 0`), with no pre-existing working-tree changes.
- Investigated only the Home hero card headed **One plan, connected decisions**. The `.signal-row span` selector matched the numbered `.signal-icon` spans and overrode their intended `display: grid` alignment with `display: block`.
- Updated only `assets/css/styles.css`. The marker now has a fixed 2.1rem flex basis and inline/block size, `inline-flex`, explicit horizontal and vertical centering, and `line-height: 1`. Text rules now apply only to the content wrapper.
- Moved the divider to the content wrapper of later rows. It starts after the marker/gap, uses the same left edge for rows 2 and 3, does not cross a marker, and leaves no trailing divider after the final row.
- Scope check: `.signal-row` and `.signal-icon` are used only by the Home hero; no tool results, guide checklists, hub workflows, ordered lists, calculator behavior, Copy, Print, or Reset were changed.
- Home responsive QA at 1440, 1280, 1024, 900, 768, and 390 px confirmed all three markers retain identical 33.59px dimensions, `display:flex`, centered axes, `line-height:16px`, no horizontal overflow, and divider starts to the right of the marker. The 390px visual check covered wrapped descriptions and the full decision card.
- Representative local browser QA passed for Home, Tools, NAS Configuration, Backup Planning, Network Performance, Home Planner, a Cost and Power tool, a guide, a reference, a comparison, About, Contact, and Privacy: one H1, shared header/footer, non-home breadcrumb, no horizontal overflow, and no badge placeholder. Desktop dropdown plus mobile menu/Escape also passed; browser console errors were empty.
- Automated QA: `node tools/qa.mjs` passed all 63 public pages and 96 calculation cases. `git diff --check` passed. No DNS, Pages, Cloudflare proxy, HTTPS, GA4, or Search Console setting was changed.
- Implementation commit: `93521af` (`Fix home decision step alignment`). Cache-version commit: `313d13a` (`Version Home alignment stylesheet`), changing only the CSS query marker from `20260730` to `20260730-2` on all 63 pages after production reproduced the old cached stylesheet.
- Production verification: `https://datastoragelab.com/` serves HTTPS with `styles.css?v=20260730-2`. At 1440px and 390px, all three markers were 33.59px, `display:flex`, horizontally/vertically centered with a 16px line height; rows 2 and 3 had a 1px divider beginning to the right of the marker, and there was no horizontal overflow. Browser console errors were empty.
- Final push and local/remote synchronization are recorded in the following deployment-record commit.

---

### 2026-07-30 — Complete site-wide favicon and decision-content audit

- Starting state: `main` at `4bbfd5a3339decb802ac898003735ceecc147e4b`, with local and `origin/main` synchronized (`0 0`) and a clean worktree.
- Reused the existing valid `assets/favicon.svg`. All 63 public HTML pages now declare exactly one root-absolute SVG favicon with `href="/assets/favicon.svg"` and `type="image/svg+xml"`. No replacement artwork or infrastructure setting was introduced.
- Audited all 33 tool pages against their implemented calculation functions and default inputs. Each tool now has unique, decision-specific sections for purpose, preparation, method, interpretation, a worked example, assumptions and limitations, and related next steps.
- Tool explanatory guidance has a 701-word minimum and a 758.1-word average. Exact duplicate paragraphs and repeated exact 12-word sequences across tool guidance are rejected by automated QA.
- Expanded the eight required hubs—five planning clusters plus Guides, Reference, and Comparisons—with start-point selection, recommended workflow, evidence to prepare, tool differentiators, and next-cluster guidance.
- Audited the ten guides, four references, three comparisons, and five foundational pages for thin text, placeholders, empty blocks, metadata, and internal-link integrity. Existing substantial editorial pages were preserved because they passed the defined quality checks.
- Added `tools/content-qa.mjs` to enforce the 63-page inventory, group counts, favicon consistency and SVG validity, tool and hub content contracts, minimum and average word counts, internal next-step links, placeholder detection, empty-block checks, duplicate paragraphs, and repeated 12-word sequences.
- Automated QA passed: `node tools/content-qa.mjs`, `node tools/qa.mjs`, JavaScript syntax, metadata, canonical, sitemap, GA4, JSON-LD, internal links, contact address, and all 96 calculation cases.
- Local browser QA passed all 63 sitemap URLs at 1440, 1280, 1024, 900, 768, and 390 px: 378 combinations with one H1, shared header/footer, exact favicon declaration, required tool/hub content, and no horizontal overflow.
- All 33 tools passed live default-input calculation and Start Over checks; all exposed Copy, Print, and Reset controls. Copy Results was exercised successfully across six representative tool families. Desktop dropdown, mobile menu, and Escape-close behavior passed.
- The favicon asset loaded in-browser as a standalone SVG with `viewBox="0 0 64 64"`. A fresh representative calculator interaction produced no console warnings or errors.
- The first logical commit is `3264eb1` (`Fix favicon across Data Storage Lab`). Content, final deployment verification, and synchronization details follow in subsequent commits.
- No DNS, GitHub Pages, Cloudflare proxy, HTTPS, GA4 property, Search Console, or contact-address setting was changed. Contact remains `canghun13@naver.com`.
- Content and QA commit: `35ec740` (`Complete tool and hub decision content`).
- Production deployment verification passed after GitHub Pages propagation. At 1280 and 390 px, 23 representative HTTPS pages—Home, Tools, all eight hubs, six tools spanning every planning cluster, two guides, one reference, one comparison, About, Contact, and Privacy—passed 46 checks for one H1, canonical URL, shared header/footer, normalized SVG favicon, required tool/hub guidance, contact link, and horizontal overflow.
- The live RAID Capacity Calculator returned **36.0 TB usable (32.7 TiB) from 48.0 TB raw**. Copy Results completed with its success status and matching clipboard text; Start Over hid the result; the Print control remained enabled; desktop and mobile navigation opened and closed with Escape.
- `https://datastoragelab.com/assets/favicon.svg` loaded as a standalone SVG with `viewBox="0 0 64 64"`, and the final production browser console contained no warnings or errors.
- Final deployment-record commit and local/remote synchronization follow this entry.

### 2026-08-05 — SSD endurance planning extension

- Started from live GitHub `main` `72d374ec9a3471fa79c2e05e3aff23178764e646`; local `origin/main` was refreshed and fast-forwarded from the stale `2c529f8` cache with a clean working tree.
- Added H09, T34–T38, G11, and C04, increasing the inventory to 71 public pages: 38 tools, 11 guides, four references, four comparisons, nine hubs, and five basics.
- Added `assets/js/ssd-endurance-tools.mjs` for decimal TBW/DWPD conversions, WAF scenarios, cache and VM write allocation, NVMe data-unit conversion, validation, result copy, print, and reset behavior.
- SSD ratings are described as endurance and warranty-planning metrics, never as physical-failure dates. Cache and VM pages distinguish per-drive distributions; remaining endurance handles counter resets, zero write evidence, and SMART as optional vendor-dependent context.
- Updated sitemap, llms inventory, README, tool QA, content QA, and the planning baseline. No DNS, Pages, Cloudflare, HTTPS, GA4 property, Search Console, contact, or Home user-managed badge area was changed.
- Validation passed with the bundled Node runtime: `tools/qa.mjs` reports 71 public pages and prior regression cases; `tools/content-qa.mjs` reports 38 tools with a 503-word minimum and 727.5-word average. `git diff --check` passed.
- Representative browser QA passed locally: the lifespan calculator produced its default Pass result, Reset hid results, no console warnings or errors were recorded, and the hub, guide, and comparison had one H1 and no horizontal overflow at 390 px. GitHub Pages served the live H09 URL with HTTP 200 and the expected title after push.

### 2026-08-05 — SSD endurance information-architecture integration

- Starting branch and live main: `main` at `d4d3548d33ea2b82a11a60a2dadd22506852d876`, clean and `0/0` ahead/behind.
- Corrected the initial SSD extension’s discovery gaps without adding pages or changing calculator logic: Header Tools menu now has all six tool hubs including H09; Tools, Guides, and Comparisons indexes link to H09, G11, and C04; Home exposes H09 in its existing current-tools card grid.
- Added contextual continuation links for NAS configuration, Cost & Power, HDD vs SSD, Drive Replacement Reserve, and the HDD vs SSD guide through the existing shared UI flow. Learn remains index-only and Reference remains unchanged.
- Extended `tools/qa.mjs` to enforce Header, directory, hub, tool-shell, and supporting-content structure. `tools/qa.mjs`, `tools/content-qa.mjs`, and `git diff --check` passed. Browser checks confirmed desktop navigation, all index entry points, H09/T34 responsive rendering at 390px, zero overflow, and no console warnings or errors.
- No DNS, Cloudflare, GitHub Pages settings, HTTPS, GA4, Search Console, contact address, protected Home badge area, page inventory, URL, or SSD calculation logic changed.

### 2026-08-05 — SSD endurance unit and input-control correction

- Starting branch and live main: `main` at `1a5d2019777721d985ec84bd71639702ec50c0b5`, clean and `0/0` ahead/behind.
- Corrected common SSD unit handling: capacity normalizes GB/TB to GB; endurance normalizes TBW/PBW to TBW; existing host writes now normalize TB/PB to TBW. Unit changes preserve the represented quantity (`1000 GB` becomes `1 TB`; `600 TBW` becomes `0.6 PBW`) and Reset restores `1000 GB`, `600 TBW`, and `0 TB` defaults.
- Lifespan reserve is now explicitly retained from remaining rating rather than multiplied into required writes. With 1,000 GB, 600 TBW, five years, 120 GB/day, WAF 1.5, and 20% reserve: logical writes are 219 TB, effective base writes 328.5 TB, usable endurance 480 TB, base headroom 151.5 TB, and rated DWPD about 0.329.
- Added Low ≤ Base ≤ High WAF validation, reserve range 0–80%, and an exhausted state when existing writes meet or exceed rated endurance. No page count, URL, sitemap, or non-SSD calculator logic changed.
- Added compact responsive input groups and unit suffixes for capacity, rating, existing writes, daily logical writes, years, reserve, and WAF. At 390px the unit groups remained single-line with no horizontal overflow; calculation, conversion, Reset, and console checks passed.
- Extended automated QA with equivalent-unit, independent arithmetic, WAF-ordering, reserve-bound, and exhausted-endurance cases. `tools/qa.mjs`, `tools/content-qa.mjs`, JavaScript syntax, and `git diff --check` passed.


## 2026-08-06

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://boostdomainrating.com/ 에 등록 (내가 직접함)


## 2026-08-11

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://sellwithboost.com/ 에 등록 (내가 직접함)


## 2026-08-19

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://findly.tools/ 에 등록 (내가 직접함)
