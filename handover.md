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
| Contact email | Not yet confirmed for this project |

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
- GitHub repository and GitHub Pages setup are complete.
- Cloudflare DNS and custom-domain setup are complete.
- Google Analytics is configured with measurement ID `G-Z7QV39WJ35`.
- Google Search Console registration is complete.
- The canonical site address is intended to be `https://datastoragelab.com/`.
- Initial DNS records are configured for GitHub Pages.
- The first operational handover file has been prepared.

### Waiting / External propagation

- HTTPS certificate availability or enforcement may still be propagating.
- Do not repeatedly change DNS, GitHub Pages custom-domain settings, or Cloudflare proxy mode merely because HTTPS is not immediately available.
- Verify the current certificate and GitHub Pages status before changing infrastructure.
- Enable or enforce HTTPS only after GitHub Pages reports that the certificate is available.
- Keep the initial GitHub Pages DNS records in DNS-only mode unless a later documented decision changes this.

### Not started

- Final information architecture
- Final selection and de-duplication of the initial 30–35 tools
- Guide, reference, and buying-guide page map
- Visual design system
- Home page implementation
- First core planner implementation
- Shared partials and production file structure
- Automated QA scripts
- Full browser QA
- Production content and calculator validation

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

## 14. Work Log

Add new entries at the top.

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

The project is ready for its first repository documentation commit, but not yet for page implementation.

The fixed repository URL is `https://github.com/canghun13/datastoragelab`.

After this file is placed in the repository root:

1. Review `git status`.
2. Verify that `origin` is exactly `https://github.com/canghun13/datastoragelab` and the branch is `main`.
3. Commit only the intended initial files.
4. Push to `origin/main`.
5. Confirm local `HEAD` equals `origin/main`.
6. Replace the “Current commit” placeholder in the next handover update.
