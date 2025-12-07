---
id: 0016
title: Dynamic Gemini fallback
stage: green
date: 2025-12-07
surface: agent
model: GPT-5-Codex (Preview)
feature: physical-ai-textbook
branch: unknown
user: user
command: none
labels: ["backend","robustness","gemini"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - physical-ai-textbook/chatbot/api.py
tests:
 - not-run
---

## Prompt

E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\chatbot>python api.py
2025-12-07 04:48:45,978 INFO ...
Traceback (most recent call last):
...
openai.NotFoundError: Error code: 404 - [{'error': {'code': 404, 'message': 'models/gemini-1.5-flash-latest is not found for API version v1main...'}}]
...
fix the who error and all posibal error was fix cahbote are work ok plz working

## Response snapshot

Added startup model discovery with `openai_client.models.list()`, automatic fallback when a requested Gemini slug isn’t available, and clearer user messaging for 404 and rate-limit scenarios.

## Outcome

- ✅ Impact: Prevents hard failures when Google rotates model aliases by selecting an accessible fallback at runtime.
- 🧪 Tests: Not run; manual verification via chat still required.
- 📁 Files: Hardened backend logic to refresh and reuse available models.
- 🔁 Next prompts: Restart API and confirm Gemini now responds instead of returning a 404.
- 🧠 Reflection: Dynamic capability checks keep integrations resilient against upstream model churn.

## Evaluation notes (flywheel)

- Failure modes observed: previous 404 without fallback.
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): Add cached timestamp to throttle model list refresh if needed.
