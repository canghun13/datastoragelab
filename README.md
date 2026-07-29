# Data Storage Lab

Data Storage Lab is a vendor-neutral collection of home data, storage, NAS, backup, network-performance, cost, and power planning tools for English-speaking users.

The site will use static HTML, CSS, and Vanilla JavaScript on GitHub Pages with the canonical address `https://datastoragelab.com/`.

Phase 1 is implemented with seven public pages: Home, Tools, Storage Needs, Home Storage & Backup Planner, About, Contact, and Privacy. The planner connects data growth, storage capacity, protection, independent backup copies, network tier, expansion headroom, and a planning-level budget range.

## Technology

- GitHub Pages + Cloudflare
- Static HTML, CSS, and Vanilla JavaScript
- GA4 measurement ID `G-Z7QV39WJ35` is loaded directly in each public page head

## Local verification

Use a current Node.js runtime:

```bash
node tools/qa.mjs
node tools/serve.mjs
```

Open `http://127.0.0.1:4173/` after starting the local preview server. The public canonical URL is `https://datastoragelab.com/`.

`handover.md` is the operational source of truth. See:

- [`site-plan.md`](site-plan.md) for the fixed 63-page information architecture and phased development plan
- [`handover.md`](handover.md) for current project status, operating rules, and the next safe task
