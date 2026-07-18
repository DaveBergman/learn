# Splunk certification roadmap

## Path (verified from official Splunk sources, 2026-07-18)

**Core Certified Power User → Enterprise Certified Admin → Enterprise Certified Architect**

- **Core Certified Power User** — entry-level, no prerequisites. 65 questions,
  60 minutes (incl. 3 min for the exam agreement), $130 USD, delivered via
  Pearson VUE.
  [Certification track](https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html) ·
  [Exam guide/blueprint PDF](https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-power-user.pdf)
  — both accessed 2026-07-18.
- **Enterprise Certified Admin** — prerequisite: Core Certified Power User.
  For day-to-day admin of a Splunk Enterprise environment (licensing, config,
  monitoring, data ingest).
  [Certification track](https://www.splunk.com/en_us/training/certification-track/splunk-enterprise-certified-admin.html) ·
  [Track PDF](https://www.splunk.com/en_us/pdfs/training/splunk-enterprise-certified-admin-track.pdf)
  — accessed 2026-07-18.
- **Enterprise Certified Architect** — most technical cert Splunk offers.
  Prerequisites: **both** Core Certified Power User and Enterprise Certified
  Admin. Deployment methodology, best practices, deploying/managing/
  troubleshooting complex Splunk Enterprise environments.
  Source: [Splunk certification overview](https://www.splunk.com/en_us/training/certification.html) — accessed 2026-07-18.
  (Architect-specific blueprint PDF not yet ingested — pull it when `/learn-ingest`
  runs for the `20-architect` module; don't assume its content yet.)

Also visible from Power User's cert page as parallel/adjacent options (not on
this ladder unless Dave chooses to branch): **Core Certified Advanced Power
User** (deepens searching/reporting/advanced knowledge objects) and **Cloud
Certified Admin** (Splunk Cloud variant of the admin track). Noted here for
completeness, not pursued unless Dave says otherwise.

## Module directories

- [`00-power-user/`](00-power-user/syllabus.md) — active
- `10-admin/` — not yet ingested
- `20-architect/` — not yet ingested

## Verification note

This roadmap reflects official Splunk certification pages fetched live on
2026-07-18. Splunk states blueprint/track content "may change at any time
without notice" — re-verify via `/learn-ingest` before relying on this for
exam scheduling, don't assume it's still current after a long gap.
