# Presentation Outline — "Prove Me Wrong"

Slide deck + video narration outline, built from PITCH.md and SCENARIO.md. Content only — visual design/build happens closer to submission.

## Slide deck (aim: 8-10 slides, ~2-3 min if self-paced)

1. **Title** — "Prove Me Wrong" / one-line hook: "Onboarding as a conversation, powered by IBM Bob 2.0."
2. **Mia's story** (from SCENARIO.md) — open with the human moment: new hire, silent misreading, no one checking her assumptions. One scenario snippet as a visual (the retry-logic guess-wrong-then-corrected beat).
3. **The problem, in numbers** — time-to-productivity (3-6 months to full productivity), cost ($20k-$80k/hire/90 days), 28% leave within 90 days. (Sources verified 2026-09-15, see PITCH.md.)
4. **The insight** — active recall beats passive reading; nobody applies this to codebase onboarding today.
5. **The solution** — how it works: real code → guess → Bob corrects with citation (line/test/commit) → adapts difficulty → session summary. Diagram: guess → correction → citation loop.
6. **Why Bob 2.0 specifically** — full-repo context is the enabling capability; a single-file assistant can't do this (ties directly to "Application of Technology" judging criterion).
7. **Live demo** — screen recording/live walkthrough against real Axios repo: one wrong guess + correction, one adaptive follow-up, the summary screen.
8. **Business value** — cost of onboarding today vs. what active-recall correction targets; retention/productivity upside (82%/70% stats).
9. **Originality** — contrast with round-1 saturated lanes (repo-visualizers, PR-risk-scorers); this is an adjacent framing on the same full-repo-context capability.
10. **Close / ask** — "hours of proven understanding instead of weeks of silent reading." Thank-you + repo/demo links.

## Video narration outline (HARD CAP: 3:00 max, confirmed 2026-09-25 in the official Hackathon Guide — judges will not watch past 3:00; at least 90s must be live demo)

See VIDEO_SCRIPT.md for the full word-for-word script at this exact timing:
- **0:00-0:20** — Mia's story, fast hook.
- **0:20-0:35** — the stakes, one line of stats.
- **0:35-0:55** — insight + solution explained simply.
- **0:55-2:35** — live demo (100s, satisfies the 90s-minimum requirement) — includes "why Bob 2.0" folded into the closing line, no separate slide for it.
- **2:35-2:50** — business value + originality, one line each.
- **2:50-3:00** — close.

## Open decisions resolved here
- Opens with Mia's story, not the stat block (per PITCH.md's flagged open question).
- Demo beat (wrong guess → citation-backed correction) is the single most important shot in both deck and video — build/rehearse this first once Bob access opens.

## Still TODO before submission
- [x] Re-verify pitch stats/sources (done 2026-09-15, see PITCH.md)
- [x] Trim video script to the confirmed 3:00 hard cap (done 2026-09-25, see VIDEO_SCRIPT.md)
- [ ] Record actual screen capture once Bob 2.0 access opens Sept 25
- [ ] Build slides visually (content locked here, visuals TBD — consider reusing shadcn/GSAP components from `./app` for a demo-consistent look)
- [ ] Fit slide 1-2 punch into submission's "Short Description" field once form is available
- [ ] Draft the new required **IBM Bob Usage Statement** (≤500 words, separate from the Problem & Solution Statement) — confirmed 2026-09-25 as a hard submission requirement
