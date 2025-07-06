import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";

// DB connection
import { connectDB } from "./lib/db.js";

/* ----------------- Path helpers ----------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // /backend/src
const projectRoot = path.join(__dirname, "..", "..");
const frontendDist = path.join(projectRoot, "frontend", "dist");

/* ----------------- Express app ------------------ */
const app = express();

/* ----------------- Middleware ------------------- */
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

/* ----------------- API Routes ------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

/* ------------- Healthcheck or test ------------- */
app.get("/", (_, res) => {
  res.send("✅ Backend is running. Try /api routes.");
});

/* ----------- Serve frontend in production ------- */
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (_, res) =>
    res.sendFile(path.join(frontendDist, "index.html"))
  );
}

/* ------------- Connect MongoDB ------------------ */
connectDB();

/* ------------ Local dev only server ------------- */
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`✅ Server listening at http://localhost:${PORT}`);
  });
}

/* ------------- Export for Vercel --------------- */
export default app;
