# Bob 2.0 Evidence Capture Plan

Official procedure, per the IBM Bob 2.0 Hackathon Guide (published 2026-09-25): every Bob task session summary must be screenshotted and uploaded to a folder literally named `bob_sessions` in the code repository. This is a hard submission requirement, not optional polish — capture as you go, not retroactively at the end.

## The exact official procedure
1. In Bob IDE's chat interface, select **Tasks** to open the task list.
2. Select the task related to your project (confirm you're in the right project workspace; use "All" if tasks span multiple workspaces).
3. Click the **task header** — this displays the task session consumption summary.
4. Screenshot that summary. Save as **PNG** (for text clarity).
5. Name the file clearly: `<name>_task<NN>_<short-description>_summary.png` — e.g. `provemewrong_task01_config-merge-hotspot_summary.png`.
6. Repeat for every task tied to the project.
7. Upload all screenshots into a folder named exactly **`bob_sessions`** at the root of the submission repo before final submission.

## Why a plan, not just "remember to screenshot"
Under 48-hour time pressure, evidence capture is the first thing skipped when things get stressful near a deadline. Tying capture to each Bob task (not a vague "milestone") removes the judgment call in the moment — every task = one screenshot, no exceptions.

## Capture checklist (one task = one screenshot, tie to the build plan)
- [ ] **Setup task**: first Bob interaction of the hackathon (confirms account + start time).
- [ ] **One task per Axios hotspot** (8 total): the Bob task where it generates the question/answer/citation for that hotspot — this is the core "meaningful use of Bob" evidence.
- [ ] **Answer evaluation task(s)**: Bob task(s) where it evaluates a free-text guess against ground truth and returns a verdict + correction.
- [ ] **Adaptive follow-up task(s)**: Bob task(s) generating an easier/harder follow-up.
- [ ] **Session summary synthesis task**: Bob synthesizing the full transcript into the end-of-session recap — doubles as both evidence AND a demo artifact.
- [ ] **Any app-code tasks** where Bob directly wrote/edited code (not just content generation) — same procedure, same folder.

## Bobcoin budget awareness
Only **40 Bobcoins** are allocated for the whole event, no top-ups once used. Each Bob interaction consumes coins, so:
- Don't loop/retry a Bob task casually — think through the prompt before sending.
- Prioritize the tasks that double as both product functionality AND required evidence (the 8 hotspot generations, evaluation logic, summary synthesis) over exploratory chatting.
- If coins run low, you can keep building without Bob — just won't be able to generate new Bob-assisted evidence.

## Logistics
- Create the `bob_sessions` folder in the repo **early** (first hour), so it's never forgotten.
- Screenshot immediately after each task's summary appears — don't batch this into a "screenshot pass" later.
- Keep a running one-line log (task name → filename) so writing the IBM Bob Usage Statement and submission fields later is fast.

## Still pending
- [ ] Confirm hackathon-provisioned Bob account access (email invite arrives at kickoff, check spam) and IBMid login before/at kickoff.
- [ ] Confirm Bob IDE is installed and set to the `ibm-coding-challenge-uat` (region us-east) instance, not any personal Bob account.
