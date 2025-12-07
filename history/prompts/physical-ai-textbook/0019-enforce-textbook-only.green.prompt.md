---
id: 0019
title: Enforce textbook-only answers
stage: green
date: 2025-12-07
surface: agent
model: GPT-5-Codex (Preview)
feature: physical-ai-textbook
branch: unknown
user: user
command: none
labels: ["backend","rag","quality"]
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

Ensure chatbot answers only use textbook data from Qdrant; fix retrieve_knowledge error and prevent external knowledge.

## Response snapshot

Migrated to Qdrant's `search_points`, filtered empty payloads, and tightened the RAG loop: when retrieval fails we return the textbook disclaimer, lowered temperature for deterministic paraphrasing, and auto-append source citations.

## Outcome

- ✅ Impact: Gemini cannot answer without retrieved context; it now falls back with the textbook-only message when no chunks are found.
- 🧪 Tests: Not run; verify via manual questions.
- 📁 Files: Updated RAG backend logic in `chatbot/api.py` only.
- 🔁 Next prompts: Restart backend, send an off-topic question, confirm the “I don't have that information” response.
- 🧠 Reflection: Stricter gating enforces grounding while keeping explanations within textbook bounds.

## Evaluation notes (flywheel)

- Failure modes observed: Qdrant API mismatch; hallucination risk.
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): consider per-source citation formatting for multiple references.
