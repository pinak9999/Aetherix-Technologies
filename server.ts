import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API for AI interactions or secure logic
  app.post("/api/ai/chat", async (req, res) => {
    // Placeholder for AI proxying if needed
    res.json({ message: "Aetherix AI is processing your request." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support for client-side routing in Express v4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aetherix] Server running on http://localhost:${PORT}`);
    console.log(`[Aetherix] Mode: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer().catch((err) => {
  console.error("[Aetherix] Server failed to start:", err);
});
