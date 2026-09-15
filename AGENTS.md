# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

---

## Token Efficiency Rules

These rules apply to every task. Read and follow them before starting any work.

### Response Style
- Be concise. One sentence per update is almost always enough.
- No trailing summaries — do not recap what you just did.
- No preamble — do not restate the task before starting it.
- No filler phrases ("Great!", "Sure!", "Of course!", "Certainly!").
- Skip explanations of obvious steps.

### Tool Use
- Read only the files you need. Do not bulk-read entire directories speculatively.
- Use `Grep` or `Glob` to locate targets before reading full files.
- Prefer targeted reads with `offset` + `limit` over reading whole files when the relevant section is known.
- Do not re-read a file you just edited to verify — edits either succeed or error.
- Prefer `Edit` over `Write` for modifying existing files (sends only the diff).
- Run independent tool calls in parallel in a single message.

### Exploration
- Before spawning a subagent, confirm it is truly necessary (multi-file, multi-step research).
- Do not duplicate searches between parent and subagent.
- For single targeted lookups, use `Grep` or `Glob` directly.

### Code Changes
- Make only the changes required by the task — no opportunistic refactors or cleanup.
- Do not add comments unless the WHY is non-obvious.
- Do not add error handling for impossible scenarios.
- Do not introduce abstractions for hypothetical future needs.

### Planning
- For simple tasks, act immediately — do not ask clarifying questions that aren't needed.
- For exploratory questions, respond in 2–3 sentences with a recommendation and the main tradeoff.
- Only enter plan mode for non-trivial, multi-step implementations.

### Git / Commits
- Do not commit unless explicitly asked.
- Stage specific files by name — never `git add -A` or `git add .` without intent.
- Do not push unless explicitly asked.

### Memory
- Save to memory only what is non-obvious and useful across future sessions (user preferences, feedback, project context).
- Do not save code patterns, file structure, git history, or ephemeral task state.

## Security Rules — Non-Negotiable

- NEVER read, modify, or reference `.env` files
- NEVER ask me to paste API keys, tokens, or passwords in chat
- NEVER hardcode credentials in any file
- Always use `process.env.VARIABLE_NAME` for all secrets
- If a credential is needed, tell me the variable name — I will add it to `.env` myself

## Project Setup — Always Do This First

- Create `.gitignore` before anything else
- Create `.claudeignore` before anything else  
- Create `.env.example` with placeholder values only
- Never create an actual `.env` file — I will do this myself

## .gitignore Must Always Include
- .env
- .env.local
- .env.production
- .env*.local
- *.pem
- secrets/
- node_modules/

## .claudeignore Must Always Include
- .env
- .env.local
- .env.production
- secrets/
- *.pem
