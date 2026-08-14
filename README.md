# Data Storage Lab

Static GitHub Pages site for vendor-neutral home and small-team storage planning.

The published inventory has 86 public pages: 47 tools, 13 guides, six references, four comparisons, 11 hubs, and five foundational pages. It covers storage needs, NAS configuration, backup planning, network performance, lifecycle cost, power protection, SSD endurance, field media offload, and external storage connection planning.

Run automated QA with the bundled Node runtime when Node is not on PATH:

```powershell
& 'C:\Users\song\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools\qa.mjs
& 'C:\Users\song\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools\content-qa.mjs
```

`tools/content-qa.mjs` enforces the 86-page inventory, the 47 tool and 11
hub content structures, a 400-word minimum and 550-word average across tool
guides, canonical SVG favicon declarations, internal next-step links, and
checks for placeholders, duplicate paragraphs, and repeated 12-word passages.
The exact current minimum and average for completed tool guidance are printed by
the content QA run.

Canonical site: https://datastoragelab.com/

Contact: [canghun13@naver.com](mailto:canghun13@naver.com)
