---
id: 0022
title: Harden Qdrant Search
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

Unknown arguments: ['query_vector']
INFO:     127.0.0.1:52567 - "POST /chat HTTP/1.1" 200 OK
2025-12-07 06:26:07,167 INFO httpx - HTTP Request: POST https://generativelanguage.googleapis.com/v1beta/openai/chat/completions "HTTP/1.1 200 OK"
2025-12-07 06:26:07,536 INFO httpx - HTTP Request: POST https://api.cohere.com/v1/embed "HTTP/1.1 200 OK"
2025-12-07 06:26:07,563 WARNING root - Qdrant query_points attempt failed: Unknown arguments: ['query_vector']
2025-12-07 06:26:07,564 ERROR root - Error in retrieve_knowledge: No compatible Qdrant search method succeeded. Last error: Unknown arguments: ['query_vector']
Traceback (most recent call last):
  File "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\chatbot\api.py", line 201, in retrieve_knowledge
    raise RuntimeError(
    ...<2 lines>...
    )
RuntimeError: No compatible Qdrant search method succeeded. Last error: Unknown arguments: ['query_vector']
INFO:     127.0.0.1:50710 - "POST /chat HTTP/1.1" 200 OK
2025-12-07 06:26:09,648 INFO httpx - HTTP Request: GET https://999b85bb-0895-4dd4-b996-a8256b6e6d50.europe-west3-0.gcp.cloud.qdrant.io:6333/collections/physical_ai_book "HTTP/1.1 200 OK"
INFO:     127.0.0.1:59963 - "GET /health HTTP/1.1" 200 OK
2025-12-07 06:26:10,681 INFO httpx - HTTP Request: GET https://999b85bb-0895-4dd4-b996-a8256b6e6d50.europe-west3-0.gcp.cloud.qdrant.io:6333/collections/physical_ai_book "HTTP/1.1 200 OK"
INFO:     127.0.0.1:54124 - "GET /health HTTP/1.1" 200 OK


AI Tutor

Physical AI Assistant


Online · physical_ai_book ready (1162 vectors)Refresh
Hi! 👋 I'm your Physical AI tutor. Ask anything about ROS 2, simulation, VLA models, or humanoid robotics.

whatis gpt

I don't have that information in the textbook. Please check the relevant module or ask a more specific question.

Summarize the VLA module goals.

I don't have that information in the textbook. Please check the relevant module or ask a more specific question.

Give me a ROS 2 quickstart.How do I simulate Isaac in the textbook?Summarize the VLA module goals.
Ask about ROS 2, VLA models, humanoids…

## Response snapshot

Added method-agnostic Qdrant retrieval that tries multiple parameter permutations and falls back to the HTTP search API, ensuring we always pass either `query_vector` or `vector` as expected and normalizing responses before grounding.

## Outcome

- ✅ Impact: Qdrant retrieval now handles SDK surfaces that expect `vector` instead of `query_vector`.
- 🧪 Tests: Not run; restart the backend and re-check textbook prompts.
- 📁 Files: Updated `chatbot/api.py` only.
- 🔁 Next prompts: Confirm questions like "Summarize the VLA module goals" return grounded answers.
- 🧠 Reflection: Diverse client versions demand adaptive argument selection plus HTTP fallback as a safety net.

## Evaluation notes (flywheel)

- Failure modes observed: SDK argument mismatch.
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): Capture and export detected method signature on startup for faster diagnosis.
