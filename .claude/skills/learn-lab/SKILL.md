---
name: learn-lab
description: Run a hands-on exercise against the live splunk-am06 instance and grade Dave's answer — real SPL against real data, not a simulator. Use when Dave says "/learn-lab", asks for a hands-on exercise, or /learn reaches its "do" step for a module with a matching labs/ file.
---

# /learn-lab <track> <module> [<lab-slug>]

Runs one hands-on lab exercise against Dave's real Splunk instance via the
`splunk-am06` MCP tools (`mcp__splunk-am06__splunk_search`,
`splunk_list_indexes`, `splunk_list_saved_searches`,
`splunk_list_dashboards`, `splunk_get_dashboard`). This is deliberately not
a simulated environment — the whole point is that Splunk certs reward doing
over memorizing, and Dave has a real instance to practice on.

## Steps

1. **Load the lab.** Read `tracks/<track>/<module>/labs/<lab-slug>.md` (or
   pick the next un-completed lab for the module if no slug given). Each lab
   file specifies: the syllabus topic it drills, a scenario, the task, and
   an `answer_check:` block describing how to verify success (e.g. expected
   SPL pattern, expected result shape, or a specific saved-search/dashboard
   state to check for).

2. **Set the scene.** Briefly restate the scenario and task to Dave. If the
   lab needs specific data/index state that may not exist on splunk-am06
   yet, check with `splunk_list_indexes` first and tell Dave plainly if a
   prerequisite is missing rather than silently working around it.

3. **Let Dave attempt it.** Ask Dave for his SPL/approach. Don't solve it
   for him first — this is retrieval practice, per METHOD.md. If he asks for
   a hint, give the smallest hint that unblocks him, not the answer.

4. **Run it for real.** Execute Dave's query via `splunk_search` (or the
   relevant tool) against splunk-am06. Show the actual result.

5. **Grade against `answer_check`.** Compare the real output to what the lab
   expects. If it doesn't match, help Dave debug using the actual error/
   result, not a hypothetical one — this is the hands-on-over-abstract
   principle in practice.

6. **Report back to the caller** (or directly to Dave if run standalone):
   pass/fail, what Dave's query was, what worked or didn't, so `/learn` can
   include it in the session log.

## Hard rules

- Always execute against the real instance via the MCP tools — never
  fabricate a plausible-looking result instead of running the search.
- If `splunk-am06` is unreachable, say so plainly (don't fake success) and
  suggest checking `mcp__am06-ops__splunk_status`.
- Read-only by default: labs should use `splunk_search` and listing tools.
  If a lab genuinely requires a write/config change on the Splunk instance,
  flag it to Dave and get explicit confirmation before doing anything
  beyond search.
