// backend/src/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import "dotenv/config";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";

/* ─────────────── Path helpers ─────────────── */
const __filename  = fileURLToPath(import.meta.url);
const __dirname   = path.dirname(__filename);           // …/backend/src
const projectRoot = path.join(__dirname, "..", "..");   // project root
const frontendDist = path.join(projectRoot, "frontend", "dist");

/* ─────────────── Express app ──────────────── */
const app = express();

/* middleware */
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

/* API routes */
app.use("/api/auth",  authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat",  chatRoutes);

/* Dev helper */
app.get("/", (_, res) =>
  res.send("🚀 Backend running. API at /api. In dev, open http://localhost:5173")
);

/* Serve built frontend (when it exists) */
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (_, res) =>
    res.sendFile(path.join(frontendDist, "index.html"))
  );
}

/* Connect to MongoDB (runs in both dev & Vercel) */
connectDB();

/* ---------- Export for Vercel & start locally ---------- */
export default app;                         // Vercel wraps this

if (!process.env.VERCEL) {                  // local / Docker / Render
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () =>
    console.log(`✅  Server listening at http://localhost:${PORT}`)
  );
}
