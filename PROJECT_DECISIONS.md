Frontend:
- Framework: React + TypeScript (Vite)
- Styling: Tailwind CSS
- Drag & Drop: dnd-kit (fallback: react-dnd)
- Code editor: Monaco Editor

Backend:
- Runtime: Node + Express (serverless friendly)
- Preview runtime: sandboxed iframe + dev server
- Project storage MVP: localStorage + JSON export

AI/Kiro:
- Integration model: prompt-template => LLM => validated JSON DSL => codegen => verification/patch
- .kiro included at project root with prompt templates and steering

Repo & infra:
- Repo layout: monorepo (frontend/, backend/, .kiro/)
- License: MIT
- CI: GitHub Actions (lint & typecheck)
- Deploy: Vercel for frontend + serverless backend

Document created: `PROJECT_DECISIONS.md`
