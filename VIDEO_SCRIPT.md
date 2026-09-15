# Video Narration Script — "Prove Me Wrong"

Maps directly to the video outline in PRESENTATION.md. Every block has: a timecode range, what should be ON SCREEN at that moment, and the narration line(s) to place there. Everything except the DEMO block can be recorded now (ElevenLabs or voice) since it doesn't depend on live Bob output.

---

### [0:00–0:30] — Mia's story (Slide 2)
**ON SCREEN:** Slide 2 — Mia's story, or an animated version of the retry-logic guess-wrong beat from SCENARIO.md.

> "Meet Mia. It's her first day as a developer on a new team. Normally, her first two weeks look like this: a giant pile of unfamiliar code, and just... reading. Hoping it sinks in. It's slow, it's lonely, and wrong assumptions get stuck in your head without anyone noticing — until they cause a bug months later."

---

### [0:30–1:00] — The stats (Slide 3)
**ON SCREEN:** Slide 3 — stat cards, one at a time or fast cut.

> "New developers typically take three to six months to reach full productivity. Onboarding a single developer costs twenty to eighty thousand dollars in the first ninety days. Twenty-eight percent of new hires quit within that same window — and poor onboarding is a major reason why. But strong onboarding processes improve retention by eighty-two percent, and productivity by seventy percent."

---

### [1:00–1:30] — The insight and solution (Slides 4–5)
**ON SCREEN:** Slide 4 (insight) → Slide 5 (solution diagram: guess → correction → citation → adapt loop).

> "Here's the thing — reading code passively doesn't build real understanding. Testing your own assumptions, and getting corrected, does. That's how people actually learn. Nobody applies that to codebase onboarding today. So we built a tool that does exactly that. It shows a new developer a real piece of code, asks what they think happens, and when they're wrong, it shows them why — with the real line of code, test, or commit that proves it. Get it right, and it moves you somewhere harder."

---

### [1:30–2:30] — LIVE DEMO (Slide 7) — **WRITE THIS PART ON SEPT 25/26, AFTER SEEING REAL BOB OUTPUT**
**ON SCREEN:** Real screen recording, live session against Axios.

**Placeholder structure — fill in the bracketed parts with what actually happens:**

> "This is a live session against Axios — a real, widely-used open-source project. [Show the question Bob asks about one hotspot, e.g. interceptor order.] I'll guess... [read your on-screen guess]. [Show Bob's verdict.] [If wrong: read Bob's correction and the citation it shows — file, line, or commit.] [Show the adaptive follow-up or next question.] [Show the end-of-session summary screen.]"

**Do this first once Bob access opens** — this is the emotional core of the video, per PRESENTATION.md. Rehearse it once before the final recording so the narration timing matches the real pacing.

---

### [2:30–3:00] — Why Bob 2.0 specifically (Slide 6)
**ON SCREEN:** Slide 6, ideally with a callback shot of the citation from the demo (file/commit Bob pointed to).

> "This only works because Bob 2.0 reads full repository context — not just one file, but how the pieces connect, what the tests expect, and what the commit history says about why something works the way it does. A single-file assistant couldn't do what you just saw."

---

### [3:00–3:30] — Business value and originality (Slides 8–9)
**ON SCREEN:** Slide 8 (business value) → Slide 9 (originality).

> "Every company hiring developers pays this cost today. We're not proposing a nice-to-have — we're proposing to replace weeks of silent, unverified reading with hours of active, proven understanding. And unlike a repo visualizer or a PR-risk-scorer, this takes Bob's full-repo-context in a different direction — toward how people actually learn."

---

### [3:30–end] — Close (Slide 10)
**ON SCREEN:** Slide 10 — close, repo link, thank-you.

> "Prove Me Wrong. Thanks for watching."

---

## How to use this when editing
1. Record/generate all narration blocks above **except the DEMO block** now.
2. Lay each audio clip against its matching slide in your video editor, using the timecodes as a starting guide (they'll shift slightly once real clip lengths are known — that's expected, just keep the order).
3. On Sept 25/26, after your first real Bob session, fill in the DEMO block's bracketed placeholders with what actually happened, record that narration last, and drop it into the 1:30–2:30 slot over the real screen capture.
4. Final pass: re-time the whole video once all clips are in — the ranges above are planning estimates, not exact cut points.
