# Real-Life Scenario — "Onboarding as a Conversation"

*A plain-language walkthrough for sharing with non-technical people.*

## Meet Mia. It's her first day as a developer on a new team.

Normally, Mia's first two weeks would look like this: she'd get access to a giant pile of code she's never seen, open a huge folder of files, and just... start reading. Hoping to eventually understand how it all fits together. It's slow, lonely, and easy to get wrong assumptions stuck in your head without anyone noticing.

## Instead, Mia opens our tool.

It greets her and says: *"Let's get you familiar with this codebase. I'll show you real pieces of it and ask what you think they do — don't worry about getting it right, that's the point."*

It shows her a real snippet: *"This code retries a failed network request up to 3 times before giving up. What do you think happens if the very first attempt succeeds — does it still wait before returning the result?"*

Mia guesses: *"I think it always waits a bit, just to be safe."*

The tool responds: *"Close, but not quite — here's what actually happens: if the first attempt succeeds, it returns immediately, no wait. You can see that in this exact line of code, and this old commit message where a developer explains why they made that choice."* It shows her the real proof, not just a "you're wrong."

Because she got that one wrong, it asks a slightly gentler follow-up on the same topic to make sure it sticks. Once she gets that right, it moves her to a new topic — maybe how the tool decides which server settings "win" when there are several conflicting ones.

**This continues for a session** — a back-and-forth conversation, not a lecture. Mia is never just staring at a diagram hoping it sinks in; she's actively guessing, getting corrected with real evidence, and building real understanding.

**At the end**, she gets a personal summary: *"Here's what you now understand well, here's what to double check, and here are the exact files where we talked about it — so you can revisit them anytime."*

## Why it matters, in plain terms

New hires often waste their first weeks passively reading code and quietly misunderstanding it. This turns that dead time into an active, guided conversation — powered by an AI (called Bob) that actually reads and understands the real codebase, so every question and correction is grounded in truth, not guesswork.
