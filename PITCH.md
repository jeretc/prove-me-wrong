# Pitch Narrative — "Prove Me Wrong"

## The problem (open with this)
New developers don't fail because they lack skill — they fail because the first few weeks are spent silently misreading a codebase, with no one checking whether their assumptions are actually correct. That gap is expensive and mostly invisible until it causes a bug months later.

**The numbers** (cite in presentation):
- New developers typically take **3–6 months** to reach full productivity (Cycloid; AllenComm)
- Cost of onboarding a single developer: **$20,000–$80,000** across the first 90 days, scaling with seniority (industry breakdown, $15k–$25k junior up to $85k senior)
- **28%** of new hires quit within their first 90 days, largely driven by poor onboarding (Robert Half / Enboarder survey, via HR Dive)
- Strong onboarding processes improve retention by **82%** and productivity by **70%** (Brandon Hall Group / Glassdoor study)

Sources (re-verified 2026-09-15):
- [Cycloid — Developer Onboarding Process Guide](https://www.cycloid.io/blogs/developer-onboarding-process/)
- [AllenComm — Time-to-Productivity](https://www.allencomm.com/2026/04/successful-onboarding-time-to-productivity-early-performance-signals/)
- [HR Dive — Why 28% Quit in First 90 Days](https://www.hrdive.com/news/why-do-28-of-employees-quit-in-their-first-90-days-poor-onboarding-practi/441139/)
- [Process Street — 82% Retention Onboarding Stat](https://www.process.st/onboarding-best-practices/)

## The insight
Reading code passively doesn't build real understanding — testing your own assumptions and getting corrected does. That's well-established in how people actually learn (active recall beats passive review). But nobody applies that to codebase onboarding — it's still "read the docs, read the code, hope it sinks in."

## The solution
We turn onboarding into a conversation. Our tool, powered by IBM Bob 2.0, picks real, tricky spots in a codebase and asks the new developer what they think happens — not a quiz with made-up questions, but ones grounded in the actual, current code. When they're wrong, Bob shows them why, citing the real line of code, test, or commit that proves it. When they're right, it moves them somewhere harder. At the end, they get a personal map of what they understand and what to revisit.

## Why IBM Bob 2.0, specifically
This only works because Bob reads full repository context — not just a single file, but how the pieces connect, what the tests expect, and what the commit history says about *why* something works the way it does. A single-file AI assistant couldn't do this; it needs the whole-repo reasoning Bob is built for.

## The demo (what judges will see)
A live session against Axios (a real, well-known open-source project) — a wrong guess, a real correction with proof, an adaptive follow-up, and a satisfying summary screen at the end. Not a mockup — real repo, real reasoning, real citations.

## The ask / close
Every company hiring developers pays this cost. We're not proposing a nice-to-have — we're proposing to replace weeks of silent, unverified reading with hours of active, proven understanding.

---

## Notes for later polish
- [x] Stats re-verified against primary/credible sources 2026-09-15 (see above)
- [ ] Decide whether pitch opens with the money stat or with "Mia" story from SCENARIO.md — likely stronger to open with Mia (human story) then back it with the stat
- [ ] Fit within submission's "Short Description" and "Long Description" fields once submission form is available
