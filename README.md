# Data Storage Lab

Static GitHub Pages site for vendor-neutral home and small-team storage planning.

The published inventory has 78 public pages: 42 tools, 12 guides, five references, four comparisons, ten hubs, and five foundational pages. It covers storage needs, NAS configuration, backup planning, network performance, lifecycle cost, power protection, SSD endurance, and field media offload planning.

Run automated QA with the bundled Node runtime when Node is not on PATH:

```powershell
& 'C:\Users\song\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools\qa.mjs
& 'C:\Users\song\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tools\content-qa.mjs
```

`tools/content-qa.mjs` enforces the 78-page inventory, the 42 tool and ten
hub content structures, a 400-word minimum and 550-word average across tool
guides, canonical SVG favicon declarations, internal next-step links, and
checks for placeholders, duplicate paragraphs, and repeated 12-word passages.
The completed tool guidance currently has a 503-word minimum and a 709.2-word
average.

Canonical site: https://datastoragelab.com/

Contact: [canghun13@naver.com](mailto:canghun13@naver.com)
