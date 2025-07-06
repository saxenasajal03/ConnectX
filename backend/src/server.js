import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const projectRoot = path.join(__dirname, "..", "..");

const frontendDist = path.join(projectRoot, "frontend", "dist");

console.log(
  "🗂  Looking for built frontend at:",
  frontendDist,
  fs.existsSync(frontendDist) ? "(found ✅)" : "(missing ❌)"
);

/* ──────────────── Express app ──────────────── */
const app  = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

/* ---------- API routes ---------- */
app.use("/api/auth",  authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat",  chatRoutes);

/* ---------- Dev root helper ---------- */
app.get("/", (_, res) =>
  res.send("🚀 Backend up. API under /api. In dev, open http://localhost:5173")
);

/* ---------- Serve SPA in production ---------- */
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (_, res) =>
    res.sendFile(path.join(frontendDist, "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`✅  Server listening at http://localhost:${PORT}`);
  connectDB();
});
