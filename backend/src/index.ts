import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import type { Request, Response } from "express";
import type { KiroPlan } from "./kiro/dslSchema.js"; // ensure this file exists
import { generateCodeFromPlan } from "./kiro/codegen";

// ───────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ───────────────────────────────────────────────
// Basic health route (for browser testing)
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend running — Delphi Reimagined");
});

// ───────────────────────────────────────────────
// Kiro Plan route — converts NL command to DSL plan
app.post("/kiro/plan", (req: Request, res: Response) => {
  try {
    const { nlCommand, projectModel } = req.body || {};

    if (!projectModel || !Array.isArray(projectModel.components)) {
      return res.status(400).json({ error: "Invalid or missing projectModel" });
    }

    // simple component search (case-insensitive)
    const button = projectModel.components.find(
      (c: any) => c.type?.toLowerCase() === "button"
    );
    const input = projectModel.components.find(
      (c: any) => c.type?.toLowerCase() === "input"
    );

    const plan: KiroPlan = {
      action: "create_handler",
      sourceComponentId: button?.id || "",
      targetComponentId: input?.id || "",
      dsl: {
        type: "sequence",
        steps: [
          {
            type: "http_request",
            method: "POST",
            url: "/api/send",
            body: { name: `$components.${input?.id}.value` },
          },
        ],
      },
      explanation:
        "When the button is clicked, it reads input value and sends it to /api/send via POST request.",
      patches: [
        {
          op: "add",
          path: "/handlers/-",
          value: {
            id: `handler-${Date.now()}`,
            dsl: {
              type: "http_request",
              method: "POST",
              url: "/api/send",
              body: { name: `$components.${input?.id}.value` },
            },
          },
        },
      ],
    };
    // Generate code snippets from the plan
    const generated = generateCodeFromPlan(plan);
    const fullResponse = { ...plan, code: generated };

    res.json(fullResponse);

    // res.json(plan);
  } catch (error: any) {
    console.error("❌ Error in /kiro/plan:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// ───────────────────────────────────────────────
// Simple /api/send endpoint for testing POSTs
app.post("/api/send", (req: Request, res: Response) => {
  res.json({ ok: true, received: req.body });
});

// ───────────────────────────────────────────────
const PORT = 5000;
app.listen(PORT, "127.0.0.1", () =>
  console.log(`✅ Backend running on http://127.0.0.1:${PORT}`)
);
