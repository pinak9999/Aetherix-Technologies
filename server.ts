import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/ai/chat", async (req, res) => {
    res.json({ message: "Aetherix AI is processing your request." });
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aetherix] Online at port ${PORT}`);
    console.log(`[Aetherix] Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer().catch((err) => {
  console.error("[Aetherix] Fatal startup error:", err);
  process.exit(1);
});
