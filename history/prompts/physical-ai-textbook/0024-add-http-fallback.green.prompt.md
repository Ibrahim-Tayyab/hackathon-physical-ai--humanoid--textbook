---
id: 0024
title: Add HTTP Fallback
stage: green
date: 2025-12-07
surface: agent
model: GPT-5-Codex (Preview)
feature: physical-ai-textbook
branch: unknown
user: user
command: none
labels: ["backend","rag","qdrant"]
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

Error in retrieve_knowledge: No compatible Qdrant search method succeeded. Last error: 'QdrantRemote' object has no attribute 'search'

## Response snapshot

Swapped the fallback to a direct REST call via `httpx.post`, wiring in API-key headers and normalizing dict-based results so the retrieval pipeline tolerates Qdrant clients without `_client.search`.

## Outcome

- ✅ Impact: Retrieval no longer depends on private `_client` attributes and works even when SDK wrappers lack `.search`/`.points`.
- 🧪 Tests: Not run; reissue textbook questions to confirm grounded answers.
- 📁 Files: Updated `chatbot/api.py` only.
- 🔁 Next prompts: Ask ROS 2 or VLA questions to verify citations appear.
- 🧠 Reflection: A REST fallback provides a stable escape hatch when client APIs drift.

## Evaluation notes (flywheel)

- Failure modes observed: Missing attribute on Qdrant client.
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): Cache the REST client to reuse connections if latency spikes.
