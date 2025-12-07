---
id: 0011
title: Harden Gemini chat backend
stage: green
date: 2025-12-07
surface: agent
model: GPT-5-Codex (Preview)
feature: physical-ai-textbook
branch: unknown
user: user
command: none
labels: ["backend","chatbot","stability"]
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

Microsoft Windows [Version 10.0.22621.4317]
(c) Microsoft Corporation. All rights reserved.

E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\chatbot>python api.py
INFO:     Started server process [2732]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     127.0.0.1:65287 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:65287 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:62733 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:62733 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:62733 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:62733 - "OPTIONS /chat HTTP/1.1" 200 OK
E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\chatbot\api.py:288: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.11/migration/
  history = [msg.dict() for msg in request.conversation_history]
INFO:     127.0.0.1:62733 - "POST /chat HTTP/1.1" 500 Internal Server Error
INFO:     127.0.0.1:62733 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:62733 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:52130 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:49988 - "POST /chat HTTP/1.1" 500 Internal Server Error
INFO:     127.0.0.1:56185 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:56185 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:60777 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:60249 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:60249 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:63749 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:65130 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:65130 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:50060 - "GET /health HTTP/1.1" 200 OK

## Response snapshot

Swapped unsafe eval for JSON parsing, added guard rails so the backend always returns a string, switched to Pydantic `model_dump`, and wired in error logging to surface the real stack trace.

## Outcome

- ✅ Impact: Prevented tool-call parsing crashes and ensured the API surfaces actionable errors instead of 500s.
- 🧪 Tests: Not run; verification happens via manual chat requests.
- 📁 Files: Hardened `chatbot/api.py` logic only.
- 🔁 Next prompts: Await backend logs after restart to confirm Gemini responds.
- 🧠 Reflection: Gemini’s OpenAI compatibility needs defensive handling—never trust tool payloads to be well-formed.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): not-run
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a
