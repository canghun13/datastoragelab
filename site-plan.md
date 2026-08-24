# Data Storage Lab — Information Architecture and Development Plan

Status: approved planning baseline for implementation

Planning date: 2026-07-30

Canonical site: `https://datastoragelab.com/`

Repository: `https://github.com/canghun13/datastoragelab`

Implementation stack: GitHub Pages, Cloudflare, static HTML/CSS, and Vanilla JavaScript

This document fixes the launch information architecture, page purposes, URLs, shared calculation requirements, visual direction, internal-linking rules, and phased implementation plan. It is a planning and decision document only. No public page, stylesheet, calculator, component, feed, or build system is implemented by this task.

## 1. Product strategy

### Core audience

Data Storage Lab serves English-speaking consumers and small teams who need to turn scattered storage questions into a defensible plan:

- Families protecting photos, videos, documents, and multiple household devices
- Creators and photographers forecasting large media archives
- Freelancers and home-office users who need reliable recovery without enterprise complexity
- Home-lab users choosing NAS capacity, RAID protection, networking, and power protection
- Small offices planning shared storage, concurrent access, retention, and offsite copies

The user may understand their files and budget but should not be expected to understand RAID overhead, binary units, backup retention, network protocol overhead, or UPS sizing.

### Problem the site solves

Most storage calculators stop at one number. Data Storage Lab must connect the full decision:

**User inputs → normalized needs → risk and performance analysis → recommended configuration → execution checklist → vendor-neutral equipment specifications**

The final recommendation should answer:

- How much usable capacity is needed now and at the planning horizon?
- How many bays and drives are appropriate?
- What protection and backup topology fits the stated tolerance and recovery needs?
- What minimum per-drive capacity, network tier, internet performance, and UPS class are needed?
- What will the system cost initially and over three or five years?
- What should the user buy, configure, test, and revisit next?

### Difference from a simple RAID-calculator site

1. An integrated planner is the primary entry point; isolated formulas support it.
2. Results provide a configuration and action list, not just arithmetic.
3. Calculations disclose assumptions, units, overhead, constraints, and uncertainty.
4. Tools pass concepts and suggested values to related tools instead of becoming dead ends.
5. Guides explain decisions at the moment a user needs them.
6. Commercial pages recommend specifications, capacity classes, interfaces, bay counts, and service types before brands.

### Search-intent families

The launch inventory targets these durable problem patterns:

- “How much storage do I need?” by household, computer, creator, media-library, or office scenario
- “How many NAS bays or drives do I need?” and “Which RAID/protection approach fits?”
- “How should I back this up?” including 3-2-1, retention, snapshots, offsite capacity, verification, and recovery time
- “How long will transfer, backup, or restore take?” over local or internet links
- “Do I need 1GbE, 2.5GbE, or 10GbE?” for users and workloads
- “What will NAS, cloud, drives, electricity, replacement, and UPS cost?”
- “What specification should I buy?” without a volatile daily-price catalog

### Monetization fit

- **AdSense:** useful on sufficiently deep tool result explanations, guides, references, and comparison pages. Ads must never split an input form from its primary result or obscure assumptions.
- **Affiliate-ready equipment specifications:** NAS bay class, drive quantity and minimum capacity, HDD recording method, SSD endurance class, network interface tier, switches/adapters/cabling, UPS VA/W class, and backup service capacity.
- **Evergreen discipline:** comparisons use user-supplied prices or specification classes. The site will not require daily product-price maintenance.
- **Trust rule:** calculation results and vendor-neutral recommendations come before commercial links. Affiliate availability never changes a calculation.

## 2. Fixed launch scope and counts

The launch architecture contains **63 public pages**. This is within the 55–65 target and avoids treating section indexes as articles.

| Inventory group | Count | Purpose |
|---|---:|---|
| Foundational pages | 5 | Home, complete tools directory, and trust/legal pages |
| Hubs | 8 | Five tool-cluster hubs plus Guide, Reference, and Comparison indexes |
| Tool / Planner | 33 | Interactive calculations, decisions, and generated plans |
| Guide | 10 | Evergreen explanation and execution content |
| Reference | 4 | Reusable units, formulas, assumptions, and definitions |
| Comparison / Buying | 3 | Durable specification-led decisions |
| **Total** | **63** | Exact public launch inventory |

Among the 50 action and content pages, tools account for 66%, guides/references for 28%, and comparisons for 6%. The lower comparison share is intentional at launch: it protects the low-maintenance model and concentrates commercial intent in three strong pages and in contextual specification blocks on tool results.

## 3. URL rules

- URLs are lowercase, readable, hyphenated, and directory-style with a trailing slash.
- The canonical host is always `https://datastoragelab.com`; never alternate with `www`.
- Tool URLs sit under their stable cluster:
  - `/tools/storage-needs/`
  - `/tools/nas-configuration/`
  - `/tools/backup-planning/`
  - `/tools/network-performance/`
  - `/tools/cost-power/`
- Guides, references, and comparisons use `/guides/`, `/reference/`, and `/compare/`.
- A published URL changes only for a documented material reason and must receive a redirect plan before the change.
- Query strings may carry non-sensitive calculator presets later, but canonical URLs exclude those query strings.

## 4. Complete public-page inventory

“Inputs” and “outputs” are `None` for non-interactive pages. “Actionable result” identifies what the visitor can do next even when the page is editorial.

### 4.1 Foundational pages

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B01 | Site | Home | Data Storage Lab — Plan Storage, NAS, Backup, and Cost | `/` | Choose the right planning path for a home or small-team storage problem | Scenario choice and optional current-data estimate | Recommended starting planner and learning path | Start the relevant integrated planner or cluster | AdSense after substantial content; contextual equipment categories | 1 | Navigation taxonomy; scenario map | Routes family, creator, freelancer, home office, home lab, and small office users |
| B02 | Site | Basic | Storage Planning Tools | `/tools/` | Browse every storage, NAS, backup, network, and cost tool | Problem category or desired outcome | Filterable grouped tool directory | Open the most relevant tool or planner | AdSense; cross-cluster affiliate-ready journeys | 1 | All cluster definitions | Foundational directory, not counted as a cluster hub |
| B03 | Site | Basic | About Data Storage Lab | `/about/` | Understand the site’s purpose, methodology, and editorial independence | None | Mission, audience, methods, and disclosure summary | Evaluate trust and continue to a planner | Minimal; disclosure links only | 1 | Editorial principles | No unsupported credentials or claims |
| B04 | Site | Basic | Contact Data Storage Lab | `/contact/` | Find the approved way to send feedback or corrections | None until contact method is confirmed | Contact route and response-scope expectations | Report a calculation or content issue | None | 1 | Confirmed contact method | Do not publish a placeholder email as real |
| B05 | Site | Basic | Privacy Policy | `/privacy/` | Understand analytics, cookies, external links, and data handling | None | Privacy and measurement disclosures | Make an informed usage choice | None | 1 | GA4 policy and later consent decision | Must reflect actual behavior, including local-only calculations where applicable |

### 4.2 Hub pages

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| H01 | Storage Needs | Hub | Storage Needs Planning Tools | `/tools/storage-needs/` | Select a capacity-planning workflow by scenario | Scenario and planning horizon | Tool choice, sequence, and prerequisite guidance | Start with the integrated planner or a specialist estimator | AdSense; storage and backup specification context | 1 | B02; storage-needs taxonomy | First cluster hub |
| H02 | NAS Configuration | Hub | NAS Configuration Tools | `/tools/nas-configuration/` | Choose tools for bays, drives, RAID, media, and expansion | Existing or planned NAS state | Recommended NAS-planning sequence | Move from capacity requirement to physical configuration | AdSense; NAS, HDD, SSD specifications | 3 | Storage outputs; NAS data model | Distinguish usable capacity, protection, and backup |
| H03 | Backup Planning | Hub | Backup Planning Tools | `/tools/backup-planning/` | Choose a backup architecture, retention, and recovery workflow | Data scope and recovery priority | Recommended backup-planning sequence | Build and validate a complete backup plan | AdSense; backup media and cloud-capacity context | 4 | Capacity model; backup topology model | Makes “RAID is not backup” explicit |
| H04 | Network & Performance | Hub | Network and Transfer Planning Tools | `/tools/network-performance/` | Diagnose transfer-time and network-tier needs | Workload location and performance goal | Recommended timing or network tool | Size the link and verify the bottleneck | AdSense; adapters, switches, and cabling classes | 5 | Transfer model | Separates local throughput from internet throughput |
| H05 | Cost & Power | Hub | Storage Cost and Power Tools | `/tools/cost-power/` | Estimate purchase, operating, replacement, and power-protection costs | Proposed configuration and prices | Recommended financial planning sequence | Compare options on the same time horizon | AdSense; NAS, drives, UPS, cloud categories | 6 | Cost and UPS models | Uses user-entered prices rather than maintained price feeds |
| H06 | Learning | Hub | Storage and Backup Guides | `/guides/` | Browse evergreen explanations and implementation guidance | Topic or current planning step | Guide collection grouped by user journey | Read the guide tied to the current decision | AdSense; contextual tool links | 7 | Published guides; taxonomy | Every guide links to at least one real tool |
| H07 | Learning | Hub | Storage Planning Reference | `/reference/` | Find recurring units, formulas, assumptions, and definitions | Concept or formula need | Reference collection | Verify a value and return to a calculator | AdSense when content depth permits | 7 | Published references | Reference pages are citable foundations, not thin glossaries |
| H08 | Buying | Hub | Storage Equipment Comparisons | `/compare/` | Browse durable specification-led buying decisions | Decision category | Comparison collection | Choose a specification class and validate it in a tool | Affiliate-ready; AdSense | 7 | Published comparisons; disclosure pattern | No daily deal or price-feed structure |

### 4.3 Storage Needs tools

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T01 | Storage Needs | Tool | Home Storage & Backup Planner | `/tools/storage-needs/home-storage-backup-planner/` | Turn household or personal data needs into an end-to-end storage and backup configuration | Current data by category; annual growth; years; devices; users; retention; failure tolerance; internet; LAN; budget | Required capacity; headroom; NAS bay/drive range; protection approach; backup topology; network tier; UPS and budget bands; action checklist | Save, copy, or print a vendor-neutral build-and-backup brief | NAS, HDD, SSD, UPS, network, and cloud specifications | 1 | Unit, growth, RAID, backup, transfer, cost, and UPS models | First core planner; includes family mode without creating a duplicate family-only page |
| T02 | Storage Needs | Tool | Annual Storage Growth Calculator | `/tools/storage-needs/annual-storage-growth-calculator/` | Forecast storage capacity at a chosen future year | Current capacity; annual amount or percentage growth; years; safety margin | Year-by-year forecast; final required capacity; threshold dates | Set a purchase horizon and reserve headroom | Storage capacity classes | 2 | Unit and compound-growth models | Feeds T01 and T10 |
| T03 | Storage Needs | Tool | Creator Media Storage Planner | `/tools/storage-needs/creator-media-storage-planner/` | Estimate photo, video, or mixed creator archive capacity from production volume | Media mode; projects or shooting days; footage duration; codec/bitrate or file size; copies; growth; retention | Ingest, working, archive, proxy/cache, and backup capacity bands | Specify working and archive tiers plus backup copies | HDD, SSD, DAS/NAS, network classes | 2 | Unit, media-rate, growth, and copy models | Combines creator-video and photography-archive candidates through explicit modes |
| T04 | Storage Needs | Tool | Computer Backup Storage Planner | `/tools/storage-needs/computer-backup-storage-planner/` | Size backup storage for Windows, macOS, or mixed computers | Used data per device; device count; change rate; retention; versioning; exclusions; growth | Initial full-backup size; versioned capacity; recommended target size and reserve | Allocate a backup target and retention policy per device | External drives, NAS capacity, cloud backup | 2 | Retention, growth, and unit models | Operating-system neutral despite common Windows/macOS search terms |
| T05 | Storage Needs | Tool | Small Office Storage Planner | `/tools/storage-needs/small-office-storage-planner/` | Plan shared storage and backup for a small team | Users; department/workload data; annual growth; concurrency; retention; downtime tolerance; budget | Usable capacity; bay/drive range; protection; backup copies; network tier; growth and cost bands | Produce a requirements brief for an office storage purchase | NAS, drives, networking, UPS, cloud | 2 | T01 models plus concurrency and cost | Caps scope at small office; not enterprise architecture advice |
| T06 | Storage Needs | Tool | Media Library Storage Planner | `/tools/storage-needs/media-library-storage-planner/` | Size a personal movie, music, or disc-rip library | Item counts; average or known sizes; quality profile; future additions; copies; headroom | Current library size; annual growth; usable target; backup target | Choose capacity and expansion timing for a media library | HDD, NAS, backup storage | 2 | Unit, media-profile, growth, and copy models | Does not facilitate copyright infringement |

### 4.4 NAS Configuration tools

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T07 | NAS Configuration | Tool | NAS Bay, Drive Count & Capacity Planner | `/tools/nas-configuration/nas-bay-drive-capacity-planner/` | Convert usable-capacity and protection needs into bay, drive-count, and drive-size options | Required usable capacity; headroom; protection target; candidate bay counts; drive-size ceiling | Feasible layouts; minimum drive size; spare bays; upgrade path; rejected layouts | Choose a NAS bay class and drive quantity/capacity specification | NAS chassis and NAS-drive classes | 3 | Unit and RAID models; T01/T02 output | Merges bay-count and drive-count candidates to avoid circular duplicate pages |
| T08 | NAS Configuration | Tool | RAID Capacity Calculator | `/tools/nas-configuration/raid-capacity-calculator/` | Calculate usable capacity and overhead for a known RAID layout | RAID type; drive count; per-drive capacity; unit convention | Raw, usable, parity/mirror overhead, displayed TiB, and tolerance | Validate a proposed array before purchase | NAS drives and expansion capacity | 3 | Unit and RAID models | Calculation page, not a protection recommendation |
| T09 | NAS Configuration | Tool | RAID Protection Decision Tool | `/tools/nas-configuration/raid-protection-decision-tool/` | Choose an appropriate RAID or mirror approach from failure and capacity priorities | Drive count; workload; downtime tolerance; rebuild concern; capacity priority; backup status | Suitable and unsuitable protection options; tolerated failures; trade-offs; backup warning | Shortlist a protection approach and validate capacity in T08 | NAS and drive specifications | 3 | RAID decision table and risk assumptions | Merges RAID-level decision and failure-tolerance comparator |
| T10 | NAS Configuration | Tool | NAS Expansion Headroom Planner | `/tools/nas-configuration/nas-expansion-headroom-planner/` | Test whether a proposed NAS can absorb forecast growth without disruptive replacement | Current data; growth forecast; chosen layout; free bays; drive sizes; upgrade methods | Capacity exhaustion date; upgrade triggers; migration options; recommended spare bays | Select an expansion path and calendar trigger | Larger-bay NAS and drive capacity classes | 3 | Growth and RAID models; T02/T07 | Distinct from T02 because it evaluates physical array upgrade paths |
| T11 | NAS Configuration | Tool | HDD vs SSD Storage Planner | `/tools/nas-configuration/hdd-vs-ssd-storage-planner/` | Allocate workloads to HDD, SSD, or a tiered combination | Capacity; active-set size; workload pattern; noise/power sensitivity; performance goal; budget | Media recommendation by tier; capacity split; performance and cost implications | Specify bulk and fast storage tiers | HDD, SSD, cache, and enclosure classes | 3 | Workload profiles; cost assumptions | Results stay workload-led and vendor-neutral |
| T12 | NAS Configuration | Tool | CMR vs SMR Suitability Checker | `/tools/nas-configuration/cmr-vs-smr-suitability-checker/` | Check whether an HDD recording method suits a proposed workload | Array use; sustained writes; rebuilds; random-write frequency; archive pattern; vendor documentation status | CMR requirement, conditional SMR suitability, or insufficient-information warning | Add recording method and verification steps to a drive specification | HDD specifications | 3 | Workload decision table; G03 | Never infer recording method from a model name without current manufacturer data |

### 4.5 Backup Planning tools

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T13 | Backup Planning | Tool | 3-2-1 Backup Plan Generator | `/tools/backup-planning/3-2-1-backup-plan-generator/` | Generate a concrete 3-2-1 plan for selected data and risks | Data groups; primary location; existing copies/media; offsite option; budget; recovery priority | Gap analysis; proposed copy/media/location map; setup and test checklist | Implement missing copies in priority order | Backup drives, NAS, cloud, offsite media | 4 | Backup-topology model; T01 outputs | Orchestrates the plan; T17 performs detailed offsite sizing |
| T14 | Backup Planning | Tool | Local vs Cloud vs Hybrid Backup Selector | `/tools/backup-planning/local-cloud-hybrid-backup-selector/` | Choose a backup topology based on recovery, internet, privacy, and budget | Data size; upload/download; recovery target; offsite need; recurring-budget tolerance; control preference | Ranked topology; constraints; minimum local/offsite components | Choose an architecture and continue to capacity/cost tools | Local media, NAS, and cloud services | 4 | Backup, transfer, and cost assumptions | Decision tool differs from the financial comparison T27 |
| T15 | Backup Planning | Tool | Backup Retention Calculator | `/tools/backup-planning/backup-retention-calculator/` | Size versioned backup storage from a retention schedule | Protected data; daily change rate; daily/weekly/monthly versions; compression/dedup assumptions; growth | Estimated retained versions; changed-data volume; target range; policy summary | Set retention tiers and allocate target capacity | Backup storage and cloud capacity | 4 | Retention, change-rate, and growth models | Does not promise exact deduplication savings |
| T16 | Backup Planning | Tool | Snapshot Storage Planner | `/tools/backup-planning/snapshot-storage-planner/` | Estimate snapshot reserve from churn and snapshot lifetime | Protected volume; daily change rate; snapshot frequency; retention; block-overhead assumption | Snapshot reserve range; snapshot count; high-churn warning | Reserve space and define pruning thresholds | NAS capacity | 4 | Change-rate and retention models | Explicitly distinguishes snapshots from independent backups |
| T17 | Backup Planning | Tool | Offsite Backup Capacity Planner | `/tools/backup-planning/offsite-backup-capacity-planner/` | Size the offsite component of an established backup plan | Selected data; versions; growth; compression; reserve; seed method | Offsite capacity now and at horizon; initial-seed size; service/media class | Purchase or allocate the required offsite capacity | Cloud storage and removable media | 4 | Unit, growth, retention, and transfer models | Specialist sizing page linked from T13 |
| T18 | Backup Planning | Tool | Backup Frequency Selector | `/tools/backup-planning/backup-frequency-selector/` | Choose a backup interval from acceptable data loss and workload change | Recovery-point objective; change pattern; device availability; destination; bandwidth; disruption tolerance | Suggested schedule; event triggers; missed-run handling; assumptions | Configure automated schedules and alerts | Backup software/service categories | 4 | Backup policy rules; transfer model | States that business requirements may require formal risk analysis |
| T19 | Backup Planning | Tool | Recovery Time Estimator | `/tools/backup-planning/recovery-time-estimator/` | Estimate how long a realistic recovery will take across all stages | Restore size; source type; read/network/write speeds; setup delay; verification time; contention | Transfer and end-to-end recovery range; dominant bottleneck; uncertainty | Set expectations and improve the slowest recovery stage | Faster media, network, and cloud service tiers | 4 | Transfer model and overhead profiles | Includes preparation and verification, not transfer time alone |
| T20 | Backup Planning | Tool | Backup Verification Schedule Planner | `/tools/backup-planning/backup-verification-schedule-planner/` | Create a recurring verification and restore-test schedule | Data criticality; backup destinations; backup frequency; available test window; last test | Daily/weekly/monthly/quarterly checks; sample-restore plan; ownership checklist | Put verification tasks on a calendar or runbook | Minimal; backup tooling categories | 4 | Backup topology and risk tiers | Output supports copy/print; no calendar integration in launch scope |

### 4.6 Network & Performance tools

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T21 | Network & Performance | Tool | Cloud Backup Upload & Restore Time Calculator | `/tools/network-performance/cloud-backup-transfer-time-calculator/` | Estimate initial cloud upload and full-restore duration on asymmetric internet | Data size; upload speed; download speed; utilization; service throttle; active hours | Upload and download durations; calendar-time range; bottleneck warning | Decide whether seeding, throttling, or hybrid recovery is required | Internet tiers, cloud backup, local seed media | 5 | Unit and WAN transfer models | Merges upload-time and restore-download candidates |
| T22 | Network & Performance | Tool | Local Network Transfer Time Calculator | `/tools/network-performance/local-network-transfer-time-calculator/` | Estimate transfer time across Ethernet or Wi-Fi using effective throughput | Data size; link rate; protocol; expected efficiency; source/destination limits | Best-case and practical duration; bottleneck rate; comparison by common tier | Schedule the transfer or upgrade the limiting component | NICs, switches, adapters, cabling | 5 | Unit and LAN transfer models | Local-network intent is distinct from internet backup |
| T23 | Network & Performance | Tool | Backup Window Calculator | `/tools/network-performance/backup-window-calculator/` | Determine whether recurring changed data fits an available backup window | Changed data; available hours; source/read, destination/write, and network rates; overhead | Required effective rate; predicted finish time; pass/fail margin | Adjust schedule, change rate, or bottleneck capacity | Network and backup target classes | 5 | Transfer and change-rate models | Evaluates recurring jobs rather than one-time transfers |
| T24 | Network & Performance | Tool | 1GbE vs 2.5GbE vs 10GbE Selector | `/tools/network-performance/network-tier-selector/` | Choose a practical Ethernet tier for storage workloads | Workload type; active users; device throughput; file sizes; editing needs; existing wiring; budget | Recommended tier; expected ceiling; required supporting components | Specify NIC, switch, and cabling tier | NICs, switches, adapters, cabling | 5 | Workload and throughput profiles; T25/T26 | Renamed to a durable URL that can accommodate future tiers |
| T25 | Network & Performance | Tool | Concurrent User Bandwidth Planner | `/tools/network-performance/concurrent-user-bandwidth-planner/` | Size shared-storage bandwidth for simultaneous users | Users by workload; concurrency ratio; per-user bitrate/throughput; overhead; uplink topology | Aggregate demand; recommended uplink/client tiers; oversubscription warning | Size switch uplinks and NAS interfaces | Network hardware classes | 5 | Workload profiles and transfer model | Supports small-office planner output |
| T26 | Network & Performance | Tool | Video Editing Network Planner | `/tools/network-performance/video-editing-network-planner/` | Size storage networking for one or more video-editing streams | Codec/bitrate; streams; editors; proxy use; headroom; storage throughput | Sustained throughput target; client/uplink tier; proxy recommendation; limiting-stage warning | Specify an editing network and test target | 10GbE-class networking, SSD, NAS | 5 | Media-rate and concurrency models | Does not claim that network alone guarantees editing performance |

### 4.7 Cost & Power tools

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T27 | Cost & Power | Tool | NAS vs Cloud 5-Year Cost Calculator | `/tools/cost-power/nas-vs-cloud-five-year-cost-calculator/` | Compare total five-year cost of owned NAS and cloud storage | Capacity/growth; NAS, drive, UPS, replacement, electricity, subscription, egress, and maintenance assumptions | Year-by-year cash flow; three/five-year totals; break-even if any; non-cost trade-offs | Compare architectures using personal prices and risk preferences | NAS, drives, UPS, cloud services | 6 | Growth, electricity, replacement, and cost models | Financial analysis does not replace topology selection in T14 |
| T28 | Cost & Power | Tool | DAS vs NAS Cost Calculator | `/tools/cost-power/das-vs-nas-cost-calculator/` | Compare direct-attached and network storage cost for a defined use case | Capacity; enclosure/system prices; drive count; network upgrades; backup copies; years | Comparable initial and ownership costs; capability differences; hidden dependencies | Choose the costed architecture and validate workflow fit | DAS, NAS, drives, networking | 6 | Cost and capacity models | Requires equivalent backup protection on both sides |
| T29 | Cost & Power | Tool | Drive Cost per Usable TB Calculator | `/tools/cost-power/drive-cost-per-usable-tb-calculator/` | Compare drive/layout options on protected usable capacity rather than label capacity | Drive price/capacity/count; RAID layout; spare policy; unit convention | Raw and usable cost per TB/TiB; overhead cost; option ranking | Select a capacity class and layout on comparable terms | HDD and SSD capacity classes | 6 | Unit and RAID models | User-supplied prices keep the result current |
| T30 | Cost & Power | Tool | Storage Electricity Cost Calculator | `/tools/cost-power/storage-electricity-cost-calculator/` | Estimate annual and multi-year electricity cost for storage equipment | Active/idle watts; hours or duty cycle; electricity rate; years; rate growth | kWh, annual cost, multi-year range, and sensitivity | Add operating cost to a budget or compare power profiles | Efficient NAS, drives, mini-PC, UPS | 6 | Electricity cost model | Clearly separates measured, rated, and assumed watts |
| T31 | Cost & Power | Tool | Drive Replacement Reserve Calculator | `/tools/cost-power/drive-replacement-reserve-calculator/` | Set aside a realistic reserve for planned and unexpected drive replacement | Drive count; current replacement price; planning years; annual price change; replacement policy; contingency | Annual/monthly reserve; scheduled replacements; contingency band | Add a funded replacement line to the storage plan | Replacement drives and spares | 6 | Replacement and cost models | No claim to predict individual drive failure |
| T32 | Cost & Power | Tool | UPS Size & Runtime Calculator | `/tools/cost-power/ups-size-runtime-calculator/` | Estimate UPS VA/W class and runtime target for a NAS system | Device watts; startup margin; power factor; desired runtime; UPS efficiency; optional battery data | Required W and VA rating; recommended headroom; approximate runtime or energy need | Specify a UPS class and shutdown-runtime target | UPS devices and accessories | 6 | UPS model and reference assumptions | Runtime estimate must be labeled approximate and checked against vendor curves |
| T33 | Cost & Power | Tool | Full Storage System Budget Planner | `/tools/cost-power/full-storage-system-budget-planner/` | Build a complete initial and recurring budget from a recommended configuration | NAS/DAS; drives; backup copies; network; UPS; services; taxes; replacement; electricity; contingency | Equipment quantities; low/target/high initial cost; recurring cost; three/five-year totals | Copy or print a procurement and lifecycle budget | All relevant equipment categories | 6 | Outputs from T01/T05/T07/T14/T24/T32 and cost models | Culminating budget planner; no embedded product catalog |

### 4.8 Evergreen guides

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G01 | Storage Needs | Guide | How Much NAS Storage Do I Need? | `/guides/how-much-nas-storage-do-i-need/` | Learn a defensible method for sizing NAS capacity | None | Worked method covering current data, growth, copies, RAID, units, and headroom | Run T01, T02, or T07 with informed assumptions | NAS and drive capacity classes; AdSense | 2 | T01, T02, T07, R01 | Includes worked household and creator examples |
| G02 | NAS Configuration | Guide | RAID Is Not a Backup | `/guides/raid-is-not-a-backup/` | Understand why availability does not replace independent copies | None | Failure scenarios, boundaries, and backup checklist | Validate RAID in T09, then generate a plan in T13 | Backup media and cloud categories; AdSense | 3 | T09, T13 | Avoids fear-based claims |
| G03 | NAS Configuration | Guide | CMR vs SMR for NAS | `/guides/cmr-vs-smr-for-nas/` | Understand recording methods and workload suitability | None | Workload effects, verification method, and decision rules | Run T12 and verify selected-drive documentation | HDD specifications; AdSense | 3 | T12 | No permanent model-number list |
| G04 | Cost & Power | Guide | How to Size a UPS for a NAS | `/guides/how-to-size-a-ups-for-a-nas/` | Learn the watt, VA, runtime, and shutdown factors in UPS selection | None | Sizing sequence, safety margins, limitations, and setup checklist | Run T32 and confirm against a vendor runtime curve | UPS categories; AdSense | 6 | T32, R04 | Covers safe shutdown rather than indefinite operation |
| G05 | Backup Planning | Guide | Backup Retention Basics | `/guides/backup-retention-basics/` | Design daily, weekly, monthly, and long-term retention without uncontrolled growth | None | Policy patterns, trade-offs, and examples | Calculate capacity in T15 | Backup storage and cloud capacity; AdSense | 4 | T15, T16 | Explains retention separately from synchronization |
| G06 | Backup Planning | Guide | 3-2-1 Backup Explained | `/guides/3-2-1-backup-explained/` | Apply the 3-2-1 principle to modern home and small-office storage | None | Copy/media/location examples and exception handling | Generate a tailored plan in T13 | Backup media, NAS, cloud; AdSense | 4 | T13, T14 | Discusses variants without turning the rule into dogma |
| G07 | NAS Configuration | Guide | NAS Drive Replacement Planning | `/guides/nas-drive-replacement-planning/` | Plan spares, replacement budget, rebuild exposure, and migration timing | None | Replacement policy and operational checklist | Use T10 and T31 to set triggers and reserve | NAS drives and spares; AdSense | 3 | T10, T31 | Does not use failure-rate claims to predict a specific drive |
| G08 | Backup Planning | Guide | Local Backup vs Offsite Backup | `/guides/local-backup-vs-offsite-backup/` | Assign different risks and recovery jobs to local and offsite copies | None | Threat comparison, recovery trade-offs, and combined pattern | Use T14, T17, and T19 | Local media and cloud services; AdSense | 4 | T14, T17, T19 | Emphasizes that the choices are often complementary |
| G09 | Backup Planning | Guide | Snapshots vs Backups | `/guides/snapshots-vs-backups/` | Distinguish fast local rollback from independent recoverability | None | Capability matrix, failure examples, and combined workflow | Size snapshots in T16 and independent copies in T13 | NAS and backup storage; AdSense | 4 | T13, T16 | Prevents snapshot capacity from being counted as another copy |
| G10 | NAS Configuration | Guide | HDD vs SSD for Bulk Storage | `/guides/hdd-vs-ssd-for-bulk-storage/` | Understand when HDD, SSD, or tiering fits bulk storage | None | Capacity, performance, endurance, noise, power, and cost framework | Run T11 with a defined workload | HDD and SSD classes; AdSense | 3 | T11, T29 | Avoids universal “best” claims |

### 4.9 Reference pages

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R01 | Reference | Reference | Decimal TB vs Binary TiB | `/reference/tb-vs-tib/` | Convert and interpret advertised decimal capacity and binary displayed capacity | Optional value and source unit | Conversions among GB, GiB, TB, and TiB plus explanation | Verify capacity units before comparing results | AdSense; drive capacity context | 2 | T01–T17, T29; shared unit constants | Reused by every capacity tool |
| R02 | Reference | Reference | Storage and RAID Capacity Formulas | `/reference/storage-raid-capacity-formulas/` | Verify raw, usable, overhead, parity, mirror, and tolerance calculations | Optional drive count, size, and layout example | Formula table, supported-layout assumptions, and examples | Audit T07–T10 and T29 results | AdSense; NAS/drive context | 3 | T07–T10, T29; shared RAID model | Includes limitations for mixed drive sizes and implementation variants |
| R03 | Reference | Reference | Backup Transfer Time and Bandwidth Formulas | `/reference/backup-transfer-time-bandwidth/` | Understand how long a backup takes and why link rate is not file throughput | Optional data size, rate, and efficiency example | Transfer equations, overhead ranges, unit cautions, and bottleneck method | Validate T19 and T21–T26 assumptions | AdSense; network context | 5 | T19, T21–T26; shared transfer constants | Covers the required “How Long Does a Backup Take?” topic as a reusable reference |
| R04 | Reference | Reference | UPS Watts, VA, Power Factor, and Runtime | `/reference/ups-watts-va-runtime/` | Interpret recurring UPS units and runtime assumptions | Optional watts, VA, or power-factor example | Definitions, conversions, headroom rules, and runtime limitations | Verify inputs and result interpretation in T32 | AdSense; UPS context | 6 | T32; shared UPS constants | Directs users to manufacturer runtime curves for final validation |

### 4.10 Comparison and buying pages

| ID | Cluster | Page type | Page title | URL | Primary intent | Main inputs | Main outputs | Actionable result | Monetization fit | Phase | Dependencies | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C01 | Buying | Comparison | 2-Bay vs 4-Bay NAS | `/compare/2-bay-vs-4-bay-nas/` | Choose a NAS bay class from capacity, protection, and expansion needs | None; optional examples link to tools | Scenario matrix, limits, upgrade implications, and specification checklist | Run T07 and purchase the justified bay class | NAS chassis and drives; AdSense | 3 | T07, T09, T10 | Compares classes, not a perpetually updated product list |
| C02 | Buying | Comparison | NAS vs Cloud for Family Photos | `/compare/nas-vs-cloud-for-family-photos/` | Choose a family-photo storage architecture based on access, recovery, privacy, and cost | None; worked scenarios | Architecture trade-offs, minimum backup requirement, and decision checklist | Use T01, T14, and T27 with household data | NAS, drives, cloud services; AdSense | 4 | T01, T14, T27 | Makes clear that NAS still requires backup |
| C03 | Buying | Comparison | 2.5GbE vs 10GbE for NAS | `/compare/2-5gbe-vs-10gbe-for-nas/` | Choose between common faster-Ethernet tiers for NAS use | None; workload examples | Throughput ceilings, supporting-equipment list, and scenario recommendations | Validate the network tier in T24–T26 before buying | NICs, switches, adapters, cabling; AdSense | 5 | T24, T25, T26, R03 | Includes 1GbE as a baseline and total-path bottleneck checks |

## 5. Candidate-tool audit and de-duplication decisions

The 38 provisional candidates become 33 final tools. Five pages are removed through mergers, not by hiding slightly different inputs behind duplicate URLs.

| Initial candidate | Decision | Final destination | Reason |
|---|---|---|---|
| Personal Storage Needs Planner | Rename and broaden | T01 Home Storage & Backup Planner | “Home” supports individuals and households while the result covers storage and backup |
| Family Photo & Video Storage Planner | Integrate | T01 Home Storage & Backup Planner | A family scenario is a mode and preset, not a sufficiently distinct calculation engine |
| Annual Storage Growth Calculator | Retain | T02 | Reusable single-purpose forecast with independent search intent |
| Creator Video Storage Planner | Integrate and rename | T03 Creator Media Storage Planner | Video mode retains codec/bitrate inputs |
| Photography Archive Planner | Integrate | T03 Creator Media Storage Planner | Photo mode supplies shoot count and file-size inputs without duplicating archive/growth/copy logic |
| PC & Mac Backup Storage Planner | Rename | T04 Computer Backup Storage Planner | OS-neutral title covers mixed environments |
| Small Office Storage Planner | Retain | T05 | Adds concurrency, downtime, and team requirements |
| Media Library Storage Planner | Retain | T06 | Uses item/quality profiles distinct from creator production |
| NAS Bay Count Planner | Integrate | T07 NAS Bay, Drive Count & Capacity Planner | Bay count and drive capacity are circular parts of one configuration decision |
| Drive Count & Capacity Planner | Integrate | T07 NAS Bay, Drive Count & Capacity Planner | One result must present feasible layouts rather than send users between duplicate tools |
| RAID Capacity Calculator | Retain | T08 | Exact arithmetic for users who already know the layout |
| RAID Level Decision Tool | Integrate | T09 RAID Protection Decision Tool | Decision and tolerated-failure comparison share the same risk matrix |
| Expansion Headroom Planner | Retain | T10 | Applies growth to physical bay/drive upgrade paths, unlike the general growth calculator |
| Drive Failure Tolerance Comparator | Integrate | T09 RAID Protection Decision Tool | Tolerance is an output and constraint of the same protection decision |
| HDD vs SSD Storage Planner | Retain | T11 | Produces workload-tier allocation rather than a generic article answer |
| CMR vs SMR Suitability Checker | Retain | T12 | Tailored workload check complements the explanatory guide; current model identity must be verified externally |
| 3-2-1 Backup Plan Generator | Retain | T13 | Orchestrates copy, media, and location gaps |
| Local vs Cloud vs Hybrid Selector | Retain | T14 | Chooses topology; the cost calculator answers a different financial question |
| Backup Retention Calculator | Retain | T15 | Sizes version history from retention tiers and change rate |
| Snapshot Storage Planner | Retain | T16 | Uses snapshot churn and pruning assumptions; explicitly not a backup copy |
| Offsite Backup Capacity Planner | Retain | T17 | Detailed sizing and seeding page linked from the broader 3-2-1 generator |
| Backup Frequency Selector | Retain | T18 | Converts recovery-point needs into a schedule |
| Recovery Time Estimator | Retain | T19 | Models end-to-end recovery stages, not just line-rate transfer |
| Backup Verification Schedule | Rename | T20 Backup Verification Schedule Planner | Generates an operational test cadence and checklist |
| Backup Upload Time Calculator | Integrate | T21 Cloud Backup Upload & Restore Time Calculator | Shares one direction-aware WAN model with cloud restore |
| Restore Download Time Calculator | Integrate | T21 Cloud Backup Upload & Restore Time Calculator | Upload and download remain separate results on one useful page |
| Network Transfer Time Calculator | Rename | T22 Local Network Transfer Time Calculator | “Local” separates it from cloud/internet timing |
| Backup Window Calculator | Retain | T23 | Tests whether recurring changed data fits a fixed window |
| 1GbE vs 2.5GbE vs 10GbE Selector | Rename | T24 Network Tier Selector | Stable URL can support future tiers while the launch title targets current options |
| Concurrent User Bandwidth Planner | Retain | T25 | Aggregates shared workloads and oversubscription |
| Video Editing Network Planner | Retain | T26 | Uses codec streams, editors, proxies, and storage throughput |
| NAS vs Cloud 5-Year Cost | Rename | T27 NAS vs Cloud 5-Year Cost Calculator | User-entered costs provide durable lifecycle comparison |
| DAS vs NAS Cost | Rename | T28 DAS vs NAS Cost Calculator | Enforces equivalent capacity and backup scope |
| Drive Cost per Usable TB | Rename | T29 Drive Cost per Usable TB Calculator | Accounts for RAID overhead and units |
| Electricity Cost Calculator | Rename | T30 Storage Electricity Cost Calculator | Scoped to storage duty cycles and multi-year planning |
| Drive Replacement Reserve | Rename | T31 Drive Replacement Reserve Calculator | Produces a budget reserve, not a failure prediction |
| UPS Size & Runtime Calculator | Retain | T32 | Requires a dedicated electrical and runtime model |
| Full System Budget Planner | Rename | T33 Full Storage System Budget Planner | Consolidates equipment, services, replacement, and power |

## 6. Shared calculation and data models

Shared logic must be implemented once in a later task and consumed by page controllers. This plan names responsibilities; it does not prescribe a JavaScript file layout yet.

| Shared model | Required logic or data | Primary consumers |
|---|---|---|
| Storage units | Bits/bytes; decimal GB/TB/PB; binary GiB/TiB/PiB; labeled conversion and formatting; no silent unit mixing | T01–T17, T19, T21–T29, T33, R01–R03 |
| Growth projection | Fixed annual addition; compound percentage growth; year-by-year values; safety margin; capacity threshold year | T01–T07, T10, T15, T17, T27, T33 |
| Workload profiles | Household files; computer backup; photo/video rates; media library profiles; small-office concurrency; editable assumptions | T01, T03–T06, T11–T12, T24–T26 |
| RAID/protection | Layout identifiers; minimum drives; parity/mirror drive count; usable capacity; overhead; tolerated failures; mixed-drive limitation | T01, T05, T07–T10, T29, R02 |
| Retention and change rate | Full protected size; daily churn; version schedule; retention tiers; compression/dedup user assumption; uncertainty range | T01, T04–T05, T15–T18 |
| Snapshot reserve | Protected volume multiplied by changed-block rate and retained interval, adjusted by overhead and workload uncertainty | T16, G09 |
| Backup topology | Copy count; distinct media; distinct location; primary vs backup; local/cloud/hybrid constraints; gap analysis | T01, T05, T13–T14, T17, T20, T33 |
| Transfer performance | Data bits divided by effective bits/second; decimal network rates; protocol efficiency; source/destination/link minimum; active hours; service throttle | T01, T05, T14, T17, T19, T21–T26, R03 |
| Backup window | Changed data and job overhead versus available seconds; pass/fail margin; required effective rate | T18, T23 |
| Electricity cost | Watts to kW; duty cycle; kWh; local user-entered rate; annual rate growth; three/five-year accumulation | T27, T30, T33 |
| Drive replacement reserve | Drive count; scheduled replacement policy; user-entered replacement price; price change; contingency; no failure prediction | T27, T31, T33 |
| Lifecycle cost | Initial equipment; tax/shipping when entered; subscriptions; egress; electricity; replacement; maintenance value; three/five-year totals | T01, T05, T27–T33 |
| UPS sizing | Load watts; startup margin; power factor; VA and W limits; efficiency; desired runtime; energy approximation; vendor-curve warning | T01, T05, T32, T33, R04 |

### Baseline formulas and safeguards

- Decimal to binary: `TiB = TB × 10^12 / 2^40`; output must retain the original unit label.
- Compound growth: `future = current × (1 + rate)^years`; fixed annual additions use a separate linear path.
- Generic same-size RAID capacity must derive from layout metadata rather than unexplained magic numbers. Examples: mirror usable capacity is one drive for a two-drive mirror; single parity uses `N - 1`; dual parity uses `N - 2`. Implementation-specific layouts must be labeled.
- Transfer time: `seconds = data bits / minimum effective throughput`. Effective throughput is bounded by source, destination, link, protocol efficiency, and service throttle.
- Electricity: `annual kWh = watts / 1000 × operating hours`; mixed duty cycles are summed.
- UPS VA floor: `VA ≥ load watts / power factor`, then apply documented headroom. Runtime based only on nameplate VA is invalid.
- Values that vary widely must be a user input, an editable preset, or a range. Do not present a hidden constant as universal fact.
- Every result carries assumptions, limitations, and the unit convention used.
- Invalid, missing, zero, negative, inconsistent, and unrealistic inputs require explicit messages rather than `NaN`, infinity, or a plausible-looking result.

## 7. Phase plan

Page counts below refer to the inventory IDs above and sum to all 63 public pages.

| Phase | Goal | Public pages | Count | Shared functionality | Automated QA | Calculation validation | Browser QA | Completion condition |
|---|---|---|---:|---|---|---|---|---|
| 1 — Foundation and first core planner | Establish production structure and prove the integrated planning experience | B01–B05, H01, T01 | 7 | Design tokens; semantic layout; common header/footer loading; navigation; form and result primitives; unit/growth/RAID/backup/transfer/cost/UPS baseline; copy/print pattern; GA4; canonical and JSON-LD helpers | Internal links; unique metadata/IDs; canonical host; GA4 once/page; structured data; `robots.txt`; `sitemap.xml`; `llms.txt`; favicon and CNAME presence; no placeholders | Independent cases for units, growth, RAID options, backup-copy gap, network tier, UPS and budget; boundary/invalid inputs | 1440, 1280, 1024, 768, and 390 px on all seven pages; keyboard navigation; copy and print | Seven pages complete; T01 produces a coherent vendor-neutral brief; all launch infrastructure files verified; no public implementation outside scope |
| 2 — Storage Needs expansion | Add specialist capacity workflows without duplicating T01 | T02–T06, G01, R01 | 7 | Scenario presets; media profiles; year tables; calculator handoff links | Phase 1 regression plus metadata, links, form labels, and sitemap coverage for seven pages | Growth, media-rate, versioned computer backup, office concurrency, media library, and unit-conversion cases | All new pages at 390 and 1280 px; representative tool at all five widths | Storage cluster has complete specialist journeys and reconciles with T01 |
| 3 — NAS Configuration | Convert capacity into physical NAS and protection choices | H02, T07–T12, G02, G03, G07, G10, R02, C01 | 13 | Full RAID metadata; bay/layout option engine; workload/media decision tables; expansion triggers | Supported layouts, unique intent/metadata, guide-tool links, no unsupported model claims | RAID capacity/overhead/tolerance across boundaries; expansion thresholds; media decisions | Hub, simple calculator, complex planner, guide, reference, and comparison at all five widths | NAS recommendations reconcile across capacity, tolerance, expansion, media, and backup warning |
| 4 — Backup Planning | Produce implementable copy, retention, recovery, and verification plans | H03, T13–T20, G05, G06, G08, G09, C02 | 14 | Backup-topology graph; retention/change-rate model; schedule/checklist renderer | Copy/media/location rules; no snapshot-as-backup errors; cross-links and sitemap | 3-2-1 gaps; retention and snapshot ranges; offsite capacity; schedule; recovery stages | Hub, generator, calculators, guides, and comparison at all five widths | A user can generate, size, schedule, and test a complete backup plan |
| 5 — Network & Performance | Explain realistic transfer times and choose network tiers | H04, T21–T26, R03, C03 | 9 | Shared bottleneck engine; WAN/LAN overhead profiles; concurrency and media-rate models | Unit consistency; no bits/bytes confusion; range labels; internal-link and metadata checks | Known data/rate/time cases; asymmetric WAN; source/destination bottlenecks; concurrency; codec streams | Hub, timing calculator, selector, reference, and comparison at all five widths | Timing tools agree on identical assumptions and disclose practical ranges |
| 6 — Cost & Power | Complete purchase, operating, replacement, and UPS planning | H05, T27–T33, G04, R04 | 10 | Lifecycle cash flow; user-price comparison rows; electricity, reserve, and UPS models; procurement brief | Currency labels; totals; missing-price behavior; disclosure links; no embedded stale prices | Three/five-year totals; break-even/no-break-even; kWh; reserve; W/VA/runtime cases | Hub, wide comparison form/table, UPS calculator, and printable budget at all five widths | Cost totals reconcile and T33 produces a complete quantity/specification budget |
| 7 — Discovery and launch audit | Complete editorial discovery and run site-wide launch QA | H06–H08 | 3 | Cross-section filters; related-content graph; final ad-slot constraints | Full crawl; duplicate titles/descriptions/intents; canonical; sitemap; JSON-LD; GA4; encoding; placeholders; orphan pages | Cross-tool consistency sample across every shared model | Every page at 390 and 1280 px; representative types at all five widths; copy/print and ad-space stress checks | All 63 pages discoverable, non-orphaned, validated, and release-ready |

### Phase 1 exact non-page deliverables

Phase 1 should create only what is necessary to support the seven scheduled public pages:

- Base directory and asset structure suitable for GitHub Pages
- Original design system and responsive layout
- Shared header/footer loading method that remains usable under static hosting
- `robots.txt`, `sitemap.xml`, `llms.txt`, and favicon assets
- Canonical tags using `https://datastoragelab.com/`
- GA4 measurement ID `G-Z7QV39WJ35`, loaded once on every public HTML page
- Appropriate JSON-LD, such as `WebSite`, `Organization`, `BreadcrumbList`, `WebApplication`, and page-specific types where valid
- Automated document, link, metadata, encoding, and calculation checks
- Manual browser QA at 1440, 1280, 1024, 768, and 390 px

Phase 1 must not change Cloudflare DNS, GitHub Pages custom-domain configuration, proxy mode, HTTPS enforcement, GA4 property settings, or Search Console settings.

### Why T01 is the first core planner

**Home Storage & Backup Planner** is selected over a RAID capacity calculator because it demonstrates the site’s differentiated promise in one workflow. It begins with information users know and ends with capacity, NAS shape, protection, independent backup, networking, UPS, lifecycle cost, required equipment categories, and next actions. It also creates the shared models needed by most later clusters. A RAID calculator remains valuable as T08, but it assumes the user already knows what layout to test and cannot establish the product direction on its own.

## 8. Visual and interaction direction

### Design concept

Use an original **calm technical workbench** aesthetic: precise enough for infrastructure decisions, welcoming enough for a household planner. The visual language should suggest organized data blocks, capacity levels, protected copies, and connected paths without imitating a vendor dashboard or another calculator site.

### Information density

- Use a comfortable reading width for explanations and a wider workbench for forms/results.
- Default to progressive disclosure: essentials first, advanced assumptions in clearly labeled sections.
- Put one-sentence purpose, expected time, and primary units above each form.
- Keep definitions beside the field that needs them; do not make users hunt through a glossary.
- Present detailed formulas and caveats below the actionable result, not before it.

### Color direction

- Deep ink/navy for text and structural surfaces
- Muted slate for secondary labels and inactive data
- Teal for calculated capacity, healthy fit, and primary actions
- Amber for constraints, approaching limits, and assumptions needing review
- Red only for invalid inputs, impossible configurations, or unprotected data
- Warm off-white backgrounds and restrained borders to avoid the generic neon “server dashboard” look
- All combinations must satisfy WCAG AA contrast; meaning must never depend on color alone

### Cards and result panels

- Use cards for independently understandable inputs, scenarios, or option summaries.
- Do not wrap every paragraph in a card.
- Results begin with a concise recommendation band, followed by capacity/configuration facts, risk flags, assumptions, and next steps.
- Comparisons use aligned rows and explicit “why this fits” text, not color-only winners.
- Reserve fixed locations for future ad modules outside form-to-result continuity so layout does not jump when an ad appears.

### Input and result separation

- Desktop: a stable two-zone workbench may place inputs on the left and a sticky summary on the right when the content warrants it.
- Mobile: use a single logical column—purpose, inputs, calculate/update action, primary result, explanation, related actions.
- A result must remain identifiable after scrolling and printing.
- Advanced options start collapsed only when defaults are safe and visible in the assumption summary.

### Non-image system diagrams

Represent components with semantic HTML and CSS, supplemented later by accessible inline SVG only when necessary:

- NAS bays: labeled slots showing empty, data, parity/mirror, and spare states
- Drives: capacity blocks with recording/media type labels
- Backup copies: numbered copy cards connected to media and location labels
- Network tier: a path from source to switch/router to storage, with each rate shown and the bottleneck emphasized
- UPS: load devices feeding a watt total, VA/W headroom, and runtime target

Every diagram needs equivalent text. No photographic imagery is required for the planner experience.

### Mobile readability

- Touch targets at least 44 px high, visible focus states, and native controls where practical
- Labels remain above controls; units never rely on placeholder text
- Wide tables become comparison cards or controlled horizontal regions with a visible cue
- Large results use short labeled facts before detailed prose
- Sticky UI must not cover the submit/update action, validation message, or result heading

### Copy and print

- Complex planners provide “Copy plan” and “Print plan.”
- Copied output is plain, structured text containing inputs, result date, units, recommendations, assumptions, and next steps.
- Print styles remove navigation, ads, nonessential controls, and decorative backgrounds while preserving source URL and calculation assumptions.
- Do not copy hidden personal information or analytics identifiers.

### Advertising resilience

- Define optional ad slots in the content grid from the start, but do not add ad code in Phase 1 unless separately authorized.
- Never place an ad between a field label and its input, inside a result table, or between an error and the field it explains.
- Empty slots consume no space. Filled slots have a labeled boundary and a maximum size appropriate to the viewport.
- Test pages with representative ad-sized placeholders at 390 and 1280 px before enabling ads.

## 9. SEO and internal-linking principles

### One page, one primary intent

- Each inventory row owns one primary question and one canonical URL.
- Scenario presets do not automatically justify separate indexable pages.
- A specialist page survives only when it has materially different inputs, outputs, decisions, or repeat use.
- Tools and guides may cover the same topic only when one gives tailored output and the other teaches interpretation; they must link to each other.

### Internal-link graph

- Home routes scenario cards:
  - Family → T01 and C02
  - Creator/photographer → T03 and T26
  - Freelancer/home office → T04 and T14
  - Home lab → T07 and T24
  - Small office → T05 and T25
- `/tools/` links to all five tool-cluster hubs and T01 as the recommended start.
- Each cluster hub links to every tool in the cluster, the relevant guides/references/comparisons, and the next logical cluster.
- Every tool links upward to its hub, sideways to no more than a useful set of related tools, and downward to the guide/reference needed to understand its result.
- Every guide and reference links to at least one implemented tool; every comparison links to the tools that validate its recommendation.
- Result panels provide contextual next actions, for example T02 → T07, T07 → T08/T09, T13 → T17/T20, T24 → T22, and T32 → T33.
- Breadcrumbs and `BreadcrumbList` structured data reflect the visible hierarchy.

### Titles, descriptions, and canonical rules

- Page titles lead with the unique task and may end with “— Data Storage Lab”; no two public pages share a title.
- Meta descriptions state the distinct input, output, or decision and avoid boilerplate duplication.
- Each page has one self-referencing absolute canonical on the apex HTTPS host.
- Index pages canonicalize to themselves; filter/query variants canonicalize to the clean page only when content is equivalent.
- Do not canonicalize a useful specialist page to a broader tool merely because formulas are shared.

### Sitemap and indexing

- Include all 63 public canonical URLs only after their pages contain finished, indexable content.
- Exclude query-string presets, print views, QA fixtures, partials, and nonpublic assets.
- `lastmod` reflects meaningful page updates, not every deployment.
- `robots.txt` points to the canonical sitemap and does not accidentally block required assets.
- No public launch page uses `noindex` to conceal thin or placeholder content; incomplete pages are not published.

### Content depth and AdSense readiness

Every tool page requires:

1. A concise answer-first purpose and audience
2. Clearly labeled inputs, units, defaults, and advanced assumptions
3. A useful result before monetization modules
4. Explanation of logic or formulas at an appropriate level
5. Assumptions, limitations, and common interpretation mistakes
6. At least one worked or representative example
7. Action steps and linked supporting content
8. Copy/print support where the result is a plan

Guides require original explanations, examples, decision criteria, failure modes, and direct tool application. References require stable definitions, formulas, units, and examples. Comparisons require a durable specification matrix, scenario recommendations, total-system dependencies, and a neutral disclosure.

### Thin-page prevention

- Do not publish near-identical scenario landing pages for family, creator, freelancer, home office, home lab, and small office. Route them to meaningful tools with presets or contextual sections.
- Do not split upload/download or bay/drive calculations solely to gain another URL.
- Do not generate brand, model, drive-size, city, or year permutations.
- Do not create a glossary entry when the concept belongs in one of the four substantial reference pages.
- Merge, redirect, or keep unpublished any future draft whose main intent is already owned by this inventory.

## 10. Document QA checklist

This planning baseline is acceptable only when:

- Inventory-group counts equal 5 + 8 + 33 + 10 + 4 + 3 = 63.
- Phase counts equal 7 + 7 + 13 + 14 + 9 + 10 + 3 = 63.
- All 63 IDs and URLs are unique.
- Each page has one distinct primary intent.
- Every tool declares inputs, outputs, and an actionable result.
- Every guide/reference/comparison lists real tool dependencies.
- The five candidate mergers reconcile 38 provisional candidates to 33 final tools.
- Required topics are present: NAS sizing, 2-bay vs 4-bay, NAS vs cloud for family photos, RAID vs backup, CMR vs SMR, 2.5GbE vs 10GbE, UPS sizing, TB vs TiB, retention, 3-2-1, drive replacement, local vs offsite, snapshots vs backups, HDD vs SSD, and backup duration.
- Phase 1 contains exactly seven public pages and the required non-page infrastructure, while no implementation is performed by this planning task.
- Repository, domain, canonical URL, branch, stack, GA4 ID, reporting time zone, and currency match `handover.md`.
- The document is valid UTF-8 and contains no encoding replacement characters.

## 11. Frozen decisions and change control

The following are fixed for the next implementation task unless a documented review finds a material conflict:

- 63-page launch inventory and the URLs in Section 4
- 33-tool selection and the five mergers in Section 5
- T01 Home Storage & Backup Planner as the first core planner
- Seven Phase 1 public pages and the infrastructure scope in Section 7
- Shared model responsibilities in Section 6
- Vendor-neutral, specification-first recommendations
- No framework, package/build system, external library, ad code, affiliate code, or infrastructure-setting change in the planning task

Implementation may refine wording, form order, validation thresholds, and visual tokens. It must not silently add pages, publish thin variants, rename URLs, duplicate calculation logic, or broaden infrastructure scope. Any such change must update this document and `handover.md` with the reason.

## 12. SSD endurance extension — 2026-08-05

The completed 63-page baseline is extended to 71 public pages: 38 tools, 11 guides, four references, four comparisons, nine hubs, and five foundational pages. The extension adds H09 **SSD Endurance & Write Workload Planning** (`/tools/ssd-endurance/`); T34 **SSD Endurance & Lifespan Calculator**; T35 **TBW & DWPD Converter**; T36 **NAS SSD Cache Endurance Planner**; T37 **VM & Container SSD Endurance Planner**; T38 **SSD Remaining Endurance Planner**; G11 **How to Size SSD Endurance for NAS, Cache, VMs & Backups**; and C04 **Consumer vs NAS vs Enterprise SSD Endurance**.

Inputs are decimal capacity, TBW or PBW, warranty years, daily logical writes, WAF scenarios, existing writes, layout shares, and counter readings as appropriate. Shared functions normalize units, convert TBW/DWPD, calculate effective writes, required TBW, per-drive allocation, duration, margin, NVMe Data Units Written, and threshold dates. Ratings are planning and warranty metrics, not physical-failure forecasts. The extension keeps all product choices vendor-neutral, uses measured writes where available, and links to NAS configuration, backup planning, and replacement reserve decisions.

### Post-launch information-architecture integration

H09 is the sixth tool-cluster hub, not a guide or a single tool. It appears after Cost & Power in the Header Tools menu and in the Tools directory; the Learn menu remains limited to Guides, Reference, and Comparisons indexes. G11 is discoverable through Guides and C04 through Comparisons. Home exposes H09 in the existing Current tools card treatment. Existing NAS, cost, media, replacement, and HDD/SSD journeys expose contextual SSD continuity links without changing their calculations or replacing their established layout patterns.

## 13. Field media offload extension — 2026-08-11

The completed 71-page inventory is extended to 78 public pages: 42 tools, 12 guides, five references, four comparisons, ten hubs, and five foundational pages. The extension adds H10 **Field Media Offload Planning** (`/tools/field-media/`); T39 **Memory Card Quantity Planner**; T40 **Media Offload Time Planner**; T41 **Field Backup Drive Planner**; T42 **Memory Card Rotation Planner**; G12 **Field Media Offload and Verification Workflow**; and R05 **Field Media Copy and Verification Checklist**.

This cluster owns the workflow between camera capture and studio ingest. T39 derives discrete card quantities from photo size, video bitrate, camera count, recorded slot copies, formatted capacity, reserve, and spares. T40 models active readers, source and destination limits, workflow efficiency, destination count, and verification time. T41 assigns trip payload to independent physical drive sets. T42 converts verified-processing delay and card hold policy into a reusable-media pool. These inputs and outputs are distinct from T03, which begins with known GB per production period and forecasts working, archive, and backup capacity over years.

### Post-launch information-architecture integration

H10 appears after SSD Endurance in the Header Tools menu and Tools directory. G12 and R05 are listed in their existing Learn indexes. Home exposes a field-production scenario, while the Creator Media Storage Planner, Video Editing Network Planner, and 3-2-1 guide provide contextual continuity links. H10 routes users through card planning, offload timing, portable copy allocation, and card release, then hands finished field payload to T03 for post-production and archive planning.

## 14. External storage connection extension — 2026-08-14

The completed 78-page inventory is extended to 86 public pages: 47 tools, 13 guides, six references, four comparisons, 11 hubs, and five foundational pages. The extension adds H11 **External Storage Connection Planning** (`/tools/external-storage/`); T43 **Drive & Enclosure Compatibility Checker**; T44 **External Storage Bottleneck Planner**; T45 **USB Storage Power Budget Checker**; T46 **External Storage Port Topology Planner**; T47 **External Storage Performance Troubleshooter**; G13 **How to Plan an External Storage Connection**; and R06 **USB and Thunderbolt External Storage Path Reference**.

This cluster owns the physical and logical path between a bare or packaged drive and the host. T43 separates drive form factor, M.2 length, SATA/NVMe bridge support, and external power. T44 calculates the lowest documented data rate and directional payload ceiling. T45 checks peak downstream watts and powered data ports. T46 allocates high-throughput devices to direct ports and tests shared-link ports and aggregate demand. T47 converts negotiated mode and one controlled measurement into an ordered isolation sequence. These decisions differ from T22, which times a network transfer after endpoint rates are known, and T40, which schedules a camera-media copy workflow using measured reader and destination speeds.

### Post-launch information-architecture integration

H11 follows Field Media in the Header Tools menu and Tools directory. G13 and R06 appear in the existing Learn indexes. Home exposes an external-storage setup scenario without changing the user-managed badge area. Contextual links connect T40, the DAS vs NAS cost tool, and the local network transfer calculator to the appropriate connection-planning step. The cluster uses current shared form, result, copy, print, reset, responsive, and accessibility patterns without adding a framework, product database, API, or infrastructure dependency.

### 12. Developer Build Storage Planning expansion

The completed 86-page inventory is extended to 94 public pages: 52 tools, 14 guides, seven references, four comparisons, 12 hubs, and five foundational pages. The extension adds H12 **Developer Build Storage Planning** (`/tools/developer-storage/`); T48 **Git LFS Storage & Bandwidth Planner**; T49 **CI Artifact Retention Planner**; T50 **Build Cache Capacity & Churn Planner**; T51 **Container Registry Retention Planner**; T52 **Self-hosted Runner Disk Capacity Checker**; G14 **How to Plan Storage for Git LFS, CI Builds & Container Images**; and R07 **Developer Build Storage & Retention Formulas**.

This cluster owns storage decisions from large binary source history through disposable build workspace and retained delivery outputs. T48 separates retained LFS version growth from repeated full-download demand. T49 converts artifact-producing runs into rolling retention and a quota-safe maximum. T50 uses new cache-key churn to estimate the useful window supported by capacity. T51 separates shared container base layers, per-image changes, tagged retention, and pending garbage collection. T52 checks the simultaneous runner workspace peak after persistent use and free-space reserve. These decisions differ from backup retention because artifacts and caches are pipeline products, and from SSD endurance because peak capacity and object lifecycle are evaluated before physical write wear.

H12 follows External Storage in the Header Tools menu and Tools directory. G14 and R07 appear in the existing Learn indexes. Home exposes a developer-build scenario without changing the protected directory-badge area. Contextual links connect the VM/container endurance planner, backup retention calculator, and full-system budget planner to the relevant developer workflow. All provider quotas, prices, and accounting rules remain user-entered or documented externally; the static implementation embeds only deterministic formulas and bounded validation.
