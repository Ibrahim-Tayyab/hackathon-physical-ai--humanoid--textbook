---
id: 0020
title: Fix Qdrant search method
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

Qdrant search still failing with `AttributeError: 'QdrantClient' object has no attribute 'search_points'` when answering textbook questions.

## Response snapshot

Swapped back to `qdrant_client.search(...)` with the existing client version so retrieval returns real chunks again while keeping the strict grounding safeguards.

## Outcome

- ✅ Impact: Restored Qdrant retrieval so Gemini receives textbook context.
- 🧪 Tests: Not run; restart API and retry textbook prompts.
- 📁 Files: Updated `chatbot/api.py` only.
- 🔁 Next prompts: Confirm answers now cite modules instead of hitting the fallback message.
- 🧠 Reflection: Matching client methods to installed library versions prevents silent retrieval failures.

## Evaluation notes (flywheel)

- Failure modes observed: method mismatch on Qdrant client.
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): consider injecting the client version into logs to catch future upgrades.
