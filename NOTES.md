# Prove Me Wrong — IBM Bob 2.0 Hackathon Project Notes

Project name: **Prove Me Wrong**

Last updated: 2026-08-07

## Event
- lablab.ai: https://lablab.ai/ai-hackathons/ibm-bob-2-hackathon
- 48-hour online build, Sept 25–27, 2026 (kickoff Sept 25, 11:00 PM Malaysia Time)
- Free entry, $10,000 prize pool ($5k / $3k / $2k for 1st / 2nd / 3rd)
- Theme: build with IBM Bob 2.0, an AI dev partner with full-repo context
- Bob 2.0 access + full challenge brief/tracks: not published yet (as of 2026-08-07)
- Judging criteria: Application of Technology, Presentation, Business Value, Originality
- ~660 signed up as of 2026-08-07; team roster live on the site (e.g. "EquiSaaS BD" looking for members)

## Status
- Registered for the hackathon
- Team: SOLO (decided)
- Idea, name, stack, demo repo, and pitch all locked — see below
- Waiting on: official challenge brief/tracks (not yet published)

## Goal
User wants to realistically aim for top 3 placement (stretch goal, aware of strong competition).

## Strategy notes (agreed so far)
1. Pick a narrow, real problem where Bob 2.0's full-repo-context is clearly the hero — not a broad platform.
2. Prioritize a finished, working end-to-end demo over an ambitious half-built one.
3. Presentation/pitch quality matters a lot in judging — invest real time here, not just code.
4. Team could help split build vs. presentation work; still viable solo.
5. Prep problem selection, target user, rough architecture, and pitch narrative before Sept 25 so the 48 hours are pure execution.

## Research: Round 1 (May 2026) recap findings
- Round 1 scale: 5,628 participants / 1,671 teams / 503 apps submitted (round 2 currently only ~660 signups, much thinner so far)
- Round 1 challenge was broad: "turn idea into impact faster" — speed up dev workflows using Bob's full-repo-context
- Winners:
  1. **Pedigree** — cryptographic provenance/attestation for AI-written code ("Code Passport")
  2. **Atlas** — visualizes a GitHub repo as an interactive city map; understand architecture in 30s
  3. **Sandbox** — AI deployment risk simulator, predicts cascading failures, "cinematic" collapse replay demo
- **Saturated lanes to avoid**: repo-onboarding/visualization tools ("understand codebase in 30s" — dozens of entries: RepoSight, CodeAtlas, Clarity, DevScope, RepoQuest, GitPilot-AI, Onboarding Buddy, etc.) and PR/change-risk-scoring tools (PRism, Reposense, PR Autopilot, RepoGuardAI, SyncMind, Smart-PR, etc.)
- **Key pattern**: only 1 of 3 winners (Atlas) came from a crowded lane, and it won via execution/visual polish, not idea novelty. Pedigree and Sandbox won via a distinct problem angle (trust/provenance, failure simulation) rather than "another repo analyzer."
- **Strategic implication**: for round 2, avoid repo-visualizer / PR-risk-scorer as our core idea (will be even more crowded since everyone saw round 1 winners). Aim for an adjacent, less-obvious problem framing that still leverages full-repo-context, ideally with a strong visual/demo hook.

## Chosen idea: "Onboarding as a Conversation"
Bob 2.0 Socratically interviews a new hire about their own repo — predicts/answers questions about real code, Bob corrects using actual repo context (git blame, tests, commits) with citations, adapts difficulty, ends with personalized onboarding summary.
- Prior-art check: clean. Other 4 candidates (Bug Time Machine, Dead Weight, Silent Contract, Compliance Storyteller) rejected — real prior art found in round-1 submissions or commercial products.
- Team: going SOLO (strong fit — see user background: 17yr IT/CEH, Claude Code specialist, UI/UX + narrative design background covers presentation gap)
- Interface: polished web UI/UX front-end (leans into design strength)
- Demo repo: **Axios** (JS/TS HTTP client) — high credibility, manageable size, real gotcha logic (interceptors, retry/cancellation). Backups if needed: Requests, Flask, Day.js

## What this project actually is (not training a new AI)
We are not training or fine-tuning any AI model. IBM Bob 2.0 is already a fully-built, general-purpose AI with broad code-understanding ability, built by IBM before the hackathon — we never touch its underlying training/weights.

What we're building is an **agent/skill layer on top of Bob**: we give the same general Bob a specific role (Socratic interviewer), specific material (curated Axios hotspots), and a specific process (ask → evaluate → correct with citation → adapt difficulty). This doesn't create a new specialized AI — it directs a general one toward one job through structure, prompting, and app logic, the same way "agents" or "skills" work in most modern AI products (including Claude Code's own skill system).

**Where our actual value/originality lives**: not in the AI itself (shared foundation everyone at the hackathon uses), but in the workflow design — which hotspots matter, how questions escalate, how correctness gets verified against real proof, and the UX built around it. This is also effectively what judges are checking when they assess "meaningful use of Bob" — a real designed process wrapped around it, not a decorative label.

## Key terms
- **OSS repo** = Open Source Software repository — a public codebase (e.g. on GitHub) anyone can view/use. Our demo will target a real public OSS project, not a staged one.
- **IBM Bob** = an AI coding assistant/dev partner (like Claude Code / Copilot) that reads full-repo context — understands structure, logic, and history across an entire codebase, not just one file. Likely runs locally (CLI/IDE-based); exact integration (API/CLI/SDK) not published yet, access opens at kickoff (Sept 25).
- **What we're building**: our own separate app (web UI + flow logic + orchestration) that calls Bob as its AI engine to do the repo-reading, question-generation, and answer-evaluation. Not a plugin for Bob — Bob is the "brain" our product wraps around.
- **Code host: GitHub** — confirmed, and actually mandatory per round-1 submission rules (public GitHub repo + exported IBM Bob report required).

- Frontend stack: **Next.js + Vercel + shadcn/ui + GSAP** — matches existing skillset (low setup cost), JS/TS-coherent with Axios, GSAP for the "wrong answer → correction" reveal moment

- Question mechanism: curated hotspot list (6-8 Axios trouble spots, chosen ahead of time) + Bob dynamically generates question/answer/citation live from real code + adaptive follow-up state machine + Bob-synthesized session summary

See also: `SCENARIO.md` — plain-language "Mia's first day" walkthrough for sharing with non-technical people.

## Spec status: LOCKED (2026-08-07)
Idea + solo + interface + demo repo + frontend stack + question mechanism all decided.

## Axios hotspots (identified 2026-08-07, from actual repo structure)
1. **Config merging order** (`lib/core/mergeConfig.js`, `lib/defaults`) — library defaults → instance defaults → request config precedence. Q angle: header set on instance AND request — which wins?
2. **Interceptor execution order** — request vs. response interceptors don't run in the same relative order. Q angle: two request interceptors added A then B — which touches data first?
3. **Redirect handling & credential stripping** (`beforeRedirect`, `maxRedirects`) — sensitive headers stripped on cross-origin redirects. Q angle: does an Authorization header survive a redirect to a different domain?
4. **Cancellation: AbortController vs. deprecated CancelToken** (`lib/cancel/`) — two systems, subtly different behavior. Q angle: does `.then()` still run after cancel, or does it jump to `.catch()`?
5. **XSRF token logic** (`lib/helpers/resolveConfig.js:92-101`, moved from earlier assumed location) — token only auto-attaches if `withXSRFToken === true`, or unset AND same-origin. Q angle: does the XSRF token auto-attach on a cross-domain call? (No, unless explicitly forced.)
6. **maxContentLength / maxBodyLength** — decompression-bomb protection. Q angle: oversized response — silent truncate or throw?
7. **transformRequest / transformResponse pipeline** — ordered data transforms, easy to accidentally double-transform. Q angle: does a custom transform replace or run alongside the default JSON handling?
8. **Proxy tunneling (HTTP vs HTTPS)** — CONNECT tunnel behavior differs by protocol. Q angle: does proxying work identically for HTTP vs HTTPS targets?

## Related files
- `PITCH.md` — pitch narrative / business-value case (drafted 2026-08-07, stats re-verified 2026-09-15)
- `SCENARIO.md` — plain-language "Mia's first day" walkthrough for non-technical sharing
- `PRESENTATION.md` — slide deck + video narration outline
- `VIDEO_SCRIPT.md` — word-for-word narration script, budgeted to the confirmed 3:00 video cap
- `VIDEO_WALKTHROUGH.md` — step-by-step video production process
- `BOB_CAPTURE_PLAN.md` — official `bob_sessions` folder evidence procedure + Bobcoin budget notes

## Next steps
- [x] Challenge brief published (2026-09-15): confirmed idea is on-brief — "improve a developer workflow" (onboarding qualifies)
- [x] Next.js + shadcn/ui + GSAP scaffold created and build-verified at `./app` (2026-09-15)
- [x] Verified all 8 hotspots against live axios repo (2026-09-15) — all accurate; hotspot #5's file path corrected above
- [x] Re-verified pitch stats/sources (2026-09-15, see PITCH.md)
- [x] Drafted pitch deck / slide / video outline content (2026-09-15)
- [x] Official Hackathon Guide read (2026-09-25) — capture plan and video script updated to match real requirements (`bob_sessions` folder procedure, 3:00 video cap w/ 90s min demo, 40 Bobcoin budget, new IBM Bob Usage Statement deliverable)

## Before kickoff (Sept 25, 11:00 PM Malaysia Time) — user action needed
- [ ] Create an **IBMid** (required to log into Bob IDE) if not already done
- [ ] Watch registered hackathon email (and spam folder) for the "added as team member to ibm-hackathon-xxxx" invite — arrives at kickoff
- [ ] Install **Bob IDE** (v2.0.2+ — v1.0.3/v2.0.0 stop working Sept 30) ahead of time if possible, so setup doesn't eat into build time
- [ ] At first login, confirm the active instance is the hackathon-provisioned **`ibm-coding-challenge-uat`** (region us-east), not a personal Bob account
- [ ] Create a `bob_sessions/` folder in the project repo early (first hour of building)

## Still open (not urgent, no rush before kickoff)
- [ ] Draft the new required **IBM Bob Usage Statement** (≤500 words) — best written once real Bob usage exists to describe, so likely a Day 2/3 task
- [ ] Build slides visually, record non-demo narration clips (VIDEO_WALKTHROUGH.md Steps 1-3) — optional head start, not blocking
