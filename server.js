import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  createAuthContext,
  createDefaultAdminState,
  loadAdminState,
  saveAdminState,
  sessionCookieName,
  sessionCookieOptions,
} from "./auth-core.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const authStatePath = path.join(__dirname, "admin-auth.json");
const port = Number(process.env.PORT || 3001);
const jwtSecret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || "dev-admin-secret-change-me";
const fallbackAdminState = createDefaultAdminState();
const shouldServeStatic = await fs
  .access(distDir)
  .then(() => true)
  .catch(() => false);

let adminState = await loadAdminState(authStatePath, fallbackAdminState);
const { createSessionToken, verifySessionToken } = createAuthContext({
  jwt,
  jwtSecret,
  adminState,
});

function readSessionToken(req) {
  return req.cookies?.[sessionCookieName] ?? null;
}

function requireAdmin(req, res, next) {
  const token = readSessionToken(req);
  if (!token) return res.sendStatus(401);

  try {
    const payload = verifySessionToken(token, adminState);
    if (!payload) return res.sendStatus(401);

    req.adminUser = payload;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/admin/meta", (_req, res) => {
  res.json({
    username: adminState.username,
    email: adminState.email,
  });
});

app.post("/api/login", (req, res) => {
  const username = String(req.body?.username ?? "").trim();
  const password = String(req.body?.password ?? "");

  if (username !== adminState.username || password !== adminState.password) {
    return res.status(401).json({ error: "Invalid admin credentials." });
  }

  const token = createSessionToken(adminState);
  res.cookie(sessionCookieName, token, sessionCookieOptions({ secure: false }));
  return res.json({
    user: {
      username: adminState.username,
      email: adminState.email,
      role: "admin",
    },
  });
});

app.get("/api/me", (req, res) => {
  const token = readSessionToken(req);
  if (!token) return res.sendStatus(401);

  try {
    const payload = verifySessionToken(token, adminState);
    if (!payload) return res.sendStatus(401);

    return res.json({
      user: {
        username: payload.username,
        email: payload.email,
        role: payload.role,
      },
    });
  } catch {
    return res.sendStatus(401);
  }
});

app.post("/api/logout", (_req, res) => {
  res.clearCookie(sessionCookieName, sessionCookieOptions({ secure: false }));
  return res.json({ ok: true });
});

app.put("/api/admin/credentials", requireAdmin, async (req, res) => {
  const username = String(req.body?.username ?? "").trim();
  const password = String(req.body?.password ?? "");
  const email = String(req.body?.email ?? "").trim();

  if (username.length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  if (!email) {
    return res.status(400).json({ error: "Admin email is required." });
  }

  adminState = await saveAdminState(
    authStatePath,
    {
      username,
      password,
      email,
      version: adminState.version + 1,
    },
    fallbackAdminState
  );

  res.clearCookie(sessionCookieName, sessionCookieOptions({ secure: false }));
  return res.json({
    user: {
      username: adminState.username,
      email: adminState.email,
      role: "admin",
    },
  });
});

if (shouldServeStatic) {
  app.use(express.static(distDir));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Admin-aware server running on http://127.0.0.1:${port}`);
});
