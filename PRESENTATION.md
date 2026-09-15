# Presentation Outline — "Prove Me Wrong"

Slide deck + video narration outline, built from PITCH.md and SCENARIO.md. Content only — visual design/build happens closer to submission.

## Slide deck (aim: 8-10 slides, ~2-3 min if self-paced)

1. **Title** — "Prove Me Wrong" / one-line hook: "Onboarding as a conversation, powered by IBM Bob 2.0."
2. **Mia's story** (from SCENARIO.md) — open with the human moment: new hire, silent misreading, no one checking her assumptions. One scenario snippet as a visual (the retry-logic guess-wrong-then-corrected beat).
3. **The problem, in numbers** — time-to-productivity (2-4 wks, juniors 4-6 mo), cost ($20k-$80k/hire/90 days), 22% leave within 90 days. (Re-verify sources before final submission — flagged in PITCH.md.)
4. **The insight** — active recall beats passive reading; nobody applies this to codebase onboarding today.
5. **The solution** — how it works: real code → guess → Bob corrects with citation (line/test/commit) → adapts difficulty → session summary. Diagram: guess → correction → citation loop.
6. **Why Bob 2.0 specifically** — full-repo context is the enabling capability; a single-file assistant can't do this (ties directly to "Application of Technology" judging criterion).
7. **Live demo** — screen recording/live walkthrough against real Axios repo: one wrong guess + correction, one adaptive follow-up, the summary screen.
8. **Business value** — cost of onboarding today vs. what active-recall correction targets; retention/productivity upside (82%/70% stats).
9. **Originality** — contrast with round-1 saturated lanes (repo-visualizers, PR-risk-scorers); this is an adjacent framing on the same full-repo-context capability.
10. **Close / ask** — "hours of proven understanding instead of weeks of silent reading." Thank-you + repo/demo links.

## Video narration outline (target: 3-4 min)

- **0:00-0:30** — Mia's story, told as a voiceover over the scenario snippet (hook first, not stats first — per PITCH.md open question, now decided: story wins).
- **0:30-1:00** — the stat punch: cost/time/retention numbers, fast cut.
- **1:00-1:30** — the insight + solution explained simply (guess → correction → citation → adapt).
- **1:30-2:30** — live demo screen capture: real Axios session, one wrong-guess-corrected moment shown in full (this is the emotional core of the video — don't rush it).
- **2:30-3:00** — why Bob 2.0 specifically, tied to full-repo-context capability shown on screen (citations pointing at real files/commits).
- **3:00-3:30** — business value + originality framing, brief.
- **3:30-end** — close on the ask, repo link, thank you.

## Open decisions resolved here
- Opens with Mia's story, not the stat block (per PITCH.md's flagged open question).
- Demo beat (wrong guess → citation-backed correction) is the single most important shot in both deck and video — build/rehearse this first once Bob access opens.

## Still TODO before submission
- [ ] Re-verify pitch stats/sources (flagged in PITCH.md)
- [ ] Record actual screen capture once Bob 2.0 access opens Sept 25
- [ ] Build slides visually (content locked here, visuals TBD — consider reusing shadcn/GSAP components from `./app` for a demo-consistent look)
- [ ] Fit slide 1-2 punch into submission's "Short Description" field once form is available
