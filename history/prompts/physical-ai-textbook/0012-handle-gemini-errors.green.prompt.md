---
id: 0012
title: Handle Gemini call errors
stage: green
date: 2025-12-07
surface: agent
model: GPT-5-Codex (Preview)
feature: physical-ai-textbook
branch: unknown
user: user
command: none
labels: ["backend","gemini","stability"]
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
... (additional identical log lines)

## Response snapshot

Configured structured logging and wrapped Gemini completions with try/except so the API returns a descriptive message instead of a 500 when credentials or quotas are wrong.

## Outcome

- ✅ Impact: Users now see actionable Gemini failure messages and the service keeps running.
- 🧪 Tests: Not run; verification happens via the running FastAPI server.
- 📁 Files: Updated `chatbot/api.py` only.
- 🔁 Next prompts: Await user confirmation that the new error text appears, or provide stack trace for deeper fix.
- 🧠 Reflection: Defensive LLM integrations prevent support loops when credentials break.

## Evaluation notes (flywheel)

- Failure modes observed: n/a
- Graders run and results (PASS/FAIL): not-run
- Next experiment (smallest change to try): n/a
