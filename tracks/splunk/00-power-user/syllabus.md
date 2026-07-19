# Core Certified Power User — syllabus

Mapped 1:1 to the official exam blueprint. Source:
[Splunk Core Certified Power User exam guide/blueprint PDF](https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-power-user.pdf)
(accessed 2026-07-18). 65 questions, 60 minutes total (incl. 3 min exam
agreement review), entry-level, no prerequisites.

Splunk's own note: "guidelines below may change at any time without notice" —
re-fetch the blueprint via `/learn-ingest` if this file is more than a few
months old before treating it as current.

Status legend: `[ ]` not started · `[~]` notes/cards exist, not drilled to
mastery · `[x]` cards passing consistently in `/learn` sessions.

- [~] **1.0 Using Transforming Commands for Visualizations — 5%**
  - [~] 1.1 Use the `chart` command
  - [~] 1.2 Use the `timechart` command
- [~] **2.0 Filtering and Formatting Results — 10%**
  - [~] 2.1 The `eval` command
  - [~] 2.2 Use the `search` and `where` commands to filter results
  - [~] 2.3 The `fillnull` command
- [~] **3.0 Correlating Events — 15%**
  - [~] 3.1 Identify transactions
  - [~] 3.2 Group events using fields
  - [~] 3.3 Group events using fields and time
  - [~] 3.4 Search with transactions
  - [~] 3.5 Report on transactions
  - [~] 3.6 Determine when to use transactions vs. `stats`
- [~] **4.0 Creating and Managing Fields — 10%**
  - [~] 4.1 Perform regex field extractions using the Field Extractor (FX)
  - [~] 4.2 Perform delimiter field extractions using the FX
- [~] **5.0 Creating Field Aliases and Calculated Fields — 10%**
  - [~] 5.1 Describe, create, and use field aliases
  - [~] 5.2 Describe, create, and use calculated fields
- [~] **6.0 Creating Tags and Event Types — 10%**
  - [~] 6.1 Create and use tags
  - [~] 6.2 Describe event types and their uses
  - [~] 6.3 Create an event type
- [~] **7.0 Creating and Using Macros — 10%**
  - [~] 7.1 Describe macros
  - [~] 7.2 Create and use a basic macro
  - [~] 7.3 Define arguments and variables for a macro
  - [~] 7.4 Add and use arguments with a macro
- [~] **8.0 Creating and Using Workflow Actions — 10%**
  - [~] 8.1 Describe the function of GET, POST, and Search workflow actions
  - [~] 8.2 Create a GET workflow action
  - [~] 8.3 Create a POST workflow action
  - [~] 8.4 Create a Search workflow action
- [~] **9.0 Creating Data Models — 10%**
  - [~] 9.1 Describe the relationship between data models and pivot
  - [~] 9.2 Identify data model attributes
  - [~] 9.3 Create a data model
- [~] **10.0 Using the Common Information Model (CIM) Add-On — 10%**
  - [~] 10.1 Describe the Splunk CIM
  - [~] 10.2 List the knowledge objects included with the Splunk CIM Add-On
  - [~] 10.3 Use the CIM Add-On to normalize data

## Official prep resources named by Splunk

- Splunk How-To YouTube Channel (linked from the blueprint PDF — verify the
  exact channel URL at ingest time rather than guessing it)
- [Splunk Docs](https://docs.splunk.com)
- Splunk's own experience recommendation (i.e. practicing on a real instance
  — this is exactly what `/learn-lab` against `splunk-am06` is for)
- Core Certified Power User Learning Path courses (non-exhaustive per Splunk):
  Working with Time, Statistical Processing, Comparing Values, Result
  Modification, Correlation Analysis, Creating Knowledge Objects, Creating
  Field Extractions, Data Models — these are Splunk Education course titles;
  confirm exact course codes in Dave's Splunk University portal since course
  catalogue pages aren't fetchable without his login.

## Ingest status

**Sections 1.0–10.0 ingested as of 2026-07-19:**
- Sections 1.0–2.0 ingested 2026-07-18: notes, cards, quiz (`1.0-2.0-quiz.yaml`), hands-on lab.
- Sections 3.0–10.0 ingested 2026-07-19: notes, cards, quiz (`3.0-10.0-quiz.yaml`).

All sections marked `[~]` (drafted, not yet drilled to mastery). Status flips to `[x]` once `/learn` sessions show consistent recall.

**Blueprint coverage:** 100% (sections 1–10, 65 exam questions simulated across all topics).
