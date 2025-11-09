import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend running — Delphi Reimagined");
});

// temporary Kiro stub
app.post("/kiro/plan", (req, res) => {
  const { nlCommand } = req.body;
  res.json({
    message: "Kiro mock response",
    received: nlCommand,
    spec: { action: "mock", info: "replace with DSL later" }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
