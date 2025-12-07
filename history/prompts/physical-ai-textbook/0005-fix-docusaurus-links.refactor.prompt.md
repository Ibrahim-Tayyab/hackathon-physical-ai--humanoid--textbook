---
id: "0005"
title: "fix-docusaurus-links"
stage: "refactor"
date: "2025-12-05"
surface: "agent"
model: "Gemini 3 Pro (Preview)"
feature: "physical-ai-textbook"
branch: "main"
user: "user"
command: "fix broken docs links"
labels: ["docusaurus", "config", "fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "physical-ai-textbook/docusaurus.config.ts"
  - "physical-ai-textbook/src/pages/index.tsx"
tests: []
---

# User Request
Kindly resolve this issue. Whenever I click on Docs, the page shows Page Not Found. Please analyze this, because I am unable to see my book. Nothing is visible to me, even though I have created so much content.
I want this fixed so the correct content appears. Why is Page Not Found showing up? What is the problem? Please solve this issue.

# Response
The "Page Not Found" error was caused by a mismatch between the Docusaurus generated URLs and the links defined in the configuration. Docusaurus automatically strips number prefixes (e.g., `01-`) from folder and file names when generating URLs, but the `docusaurus.config.ts` and `src/pages/index.tsx` were pointing to paths that included these numbers (e.g., `/docs/01-Introduction/01-vision`).

I have updated the links to match the generated URLs:
- `docusaurus.config.ts`: Updated Navbar and Footer links from `/docs/01-Introduction/01-vision` to `/docs/Introduction/vision`.
- `src/pages/index.tsx`: Updated the "Get Started" button link from `/docs/intro` (which didn't exist) to `/docs/Introduction/vision` and changed the text to "Start Reading".

This ensures that clicking "Docs" or "Start Reading" correctly navigates to the first page of the textbook.
