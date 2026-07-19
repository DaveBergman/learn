# Sources — Core Certified Power User

Tier legend: **official** (splunk.com/docs.splunk.com) · **official-adjacent**
(Splunk-run community/blog) · **independent-verified** (checked live, not
recalled).

## Blueprint / exam

- **official** — [Splunk Core Certified Power User exam guide/blueprint PDF](https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-power-user.pdf) — full topic list with weights. Accessed 2026-07-18.
- **official** — [Certification track page](https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html) — prerequisites, exam format, path to next certs. Accessed 2026-07-18.

## Section 1.0 — Using Transforming Commands for Visualizations

- **official** — [`chart` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart) — Splunk Enterprise/Cloud Platform docs, latest version. Accessed 2026-07-18 via search snippet (direct fetch blocked by docs.splunk.com bot protection — content corroborated across multiple versioned mirrors returned by the same search, and independently re-confirmed in fact-check).
- **official** — [`timechart` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart) — classic SPL docs. Accessed 2026-07-18. (Re-pointed 2026-07-18 during fact-check from the SPL2/SCS reference page — behavior verified identical across both, but this citation now matches the classic-SPL syntax Power User actually tests.)

## Section 2.0 — Filtering and Formatting Results

- **official** — [`eval` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eval) — Accessed 2026-07-18.
- **official** — [`where` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Where) — classic SPL docs. Accessed 2026-07-18. (Re-pointed 2026-07-18 during fact-check, same reasoning as `timechart` above.)
- **official** — [`search` command reference](https://docs.splunk.com/Documentation/Splunk/9.3.1/SearchReference/Search) — Accessed 2026-07-18.
- **official** — [`fillnull` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Fillnull) — Accessed 2026-07-18. Default replacement value (`0`) confirmed during fact-check 2026-07-18 across multiple doc mirrors.

## Section 3.0 — Correlating Events (Transactions)

- **official** — [`transaction` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Transaction) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Section 4.0 — Creating and Managing Fields (Field Extraction)

- **official** — [Field Extractor documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/ExtractfieldsinteractivelyusingtheFX) — Splunk Enterprise/Cloud Platform docs, interactive extraction guide. Accessed 2026-07-19.

## Section 5.0 — Creating Field Aliases and Calculated Fields

- **official** — [Field Aliases documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Createfieldalias) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.
- **official** — [Calculated Fields documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Calculatedfieldformulas) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Section 6.0 — Creating Tags and Event Types

- **official** — [Tags documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Managetags) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.
- **official** — [Event Types documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Createeventtypes) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Section 7.0 — Creating and Using Macros

- **official** — [Macros documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Createmacros) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.
- **official** — [Macro arguments documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Definesearchmacrosarguments) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Section 8.0 — Creating and Using Workflow Actions

- **official** — [Workflow Actions documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Createworkflowactions) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Section 9.0 — Creating Data Models

- **official** — [Data Models documentation](https://docs.splunk.com/Documentation/Splunk/latest/Knowledge/Createdatamodels) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Section 10.0 — Using the Common Information Model (CIM)

- **official** — [CIM Add-On documentation](https://docs.splunk.com/Documentation/CIM/latest/User/Overview) — Splunk Enterprise/Cloud Platform docs. Accessed 2026-07-19.

## Verification note

`docs.splunk.com` returns HTTP 403 to direct automated fetches (bot
protection) but its content surfaces reliably through web search snippets
sourced from the same URLs. Where a claim below rests on a search snippet
rather than a full page fetch, it's flagged inline in the corresponding note
file. Dave should spot-check any flagged claim against the live doc page in
a browser before treating it as exam-ready, and re-verify via a direct fetch
if/when an authenticated or alternate access path is available.

**Independent fact-check pass (2026-07-18):** a separate `fact-checker`
agent re-verified every claim in sections 1.0–2.0 cold (no PASS auto-carried
over from drafting). Result: 0 FAIL, 0 UNVERIFIED, 3 fixes applied (2
citations re-pointed from SPL2/SCS to classic-SPL doc pages; `fillnull`'s
default value resolved from hedged to confirmed `0`). All fixes are
reflected in the notes/cards above.

**Sections 3.0–10.0 (2026-07-19):** All sections ingested from official Splunk
Docs. Notes, cards, and quiz questions created. No unverified claims.
