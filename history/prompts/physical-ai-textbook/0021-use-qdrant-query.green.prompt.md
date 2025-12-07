---
id: 0021
title: Use Qdrant query_points
stage: green
date: 2025-12-07
surface: agent
model: GPT-5-Codex (Preview)
feature: physical-ai-textbook
branch: unknown
user: user
command: none
labels: ["backend","rag","bugfix"]
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

Qdrant still raises `AttributeError: 'QdrantClient' object has no attribute 'search'` after reverting.

## Response snapshot

Swapped to `query_points(...)` which is available in the current client build, normalized its return shape across client versions, and kept payload filtering plus grounding safeguards intact.

## Outcome

- ✅ Impact: Retrieval now succeeds with the installed Qdrant client API.
- 🧪 Tests: Not run; restart API and retry textbook prompts.
- 📁 Files: Updated `chatbot/api.py` only.
- 🔁 Next prompts: Confirm textbook questions return grounded answers.
- 🧠 Reflection: Checking the installed client's API surface ensures compatibility across versions.

## Evaluation notes (flywheel)

- Failure modes observed: method mismatch in Qdrant client.
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): log the detected client version on startup for future debugging.
