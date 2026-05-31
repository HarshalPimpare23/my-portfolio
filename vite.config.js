import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jwt from "jsonwebtoken";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createAuthContext,
  createDefaultAdminState,
  loadAdminState,
  parseCookies,
  serializeSessionCookie,
  saveAdminState,
  sessionCookieName,
} from "./auth-core.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authStatePath = path.join(__dirname, "admin-auth.json");
const fallbackAdminState = createDefaultAdminState();

function adminApiPlugin() {
  const jwtSecret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || "dev-admin-secret-change-me";
  let adminState = fallbackAdminState;
  const { createSessionToken, verifySessionToken } = createAuthContext({
    jwt,
    jwtSecret,
    adminState,
  });

  function json(res, statusCode, payload, headers = {}) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
    res.end(JSON.stringify(payload));
  }

  return {
    name: "admin-api-dev",
    async configureServer(server) {
      adminState = await loadAdminState(authStatePath, fallbackAdminState);

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) {
          return next();
        }

        const method = req.method || "GET";
        const cookies = parseCookies(req.headers.cookie || "");

        if (req.url === "/api/admin/meta" && method === "GET") {
          return json(res, 200, {
            username: adminState.username,
            email: adminState.email,
          });
        }

        if (req.url === "/api/me" && method === "GET") {
          const token = cookies[sessionCookieName];
          if (!token) return json(res, 401, { error: "Unauthorized" });

          try {
            const payload = verifySessionToken(token, adminState);
            if (!payload) return json(res, 401, { error: "Unauthorized" });
            return json(res, 200, {
              user: {
                username: payload.username,
                email: payload.email,
                role: payload.role,
              },
            });
          } catch {
            return json(res, 401, { error: "Unauthorized" });
          }
        }

        if (req.url === "/api/login" && method === "POST") {
          const body = await new Promise((resolve, reject) => {
            let raw = "";
            req.on("data", (chunk) => {
              raw += chunk;
            });
            req.on("end", () => {
              try {
                resolve(raw ? JSON.parse(raw) : {});
              } catch (error) {
                reject(error);
              }
            });
            req.on("error", reject);
          }).catch(() => ({}));

          const username = String(body?.username ?? "").trim();
          const password = String(body?.password ?? "");

          if (username !== adminState.username || password !== adminState.password) {
            return json(res, 401, { error: "Invalid admin credentials." });
          }

          const token = createSessionToken(adminState);
          res.setHeader("Set-Cookie", serializeSessionCookie(sessionCookieName, token));
          return json(res, 200, {
            user: {
              username: adminState.username,
              email: adminState.email,
              role: "admin",
            },
          });
        }

        if (req.url === "/api/logout" && method === "POST") {
          res.setHeader("Set-Cookie", serializeSessionCookie(sessionCookieName, "", { maxAgeSeconds: 0 }));
          return json(res, 200, { ok: true });
        }

        if (req.url === "/api/admin/credentials" && method === "PUT") {
          const token = cookies[sessionCookieName];
          if (!token) return json(res, 401, { error: "Unauthorized" });

          try {
            const payload = verifySessionToken(token, adminState);
            if (!payload) return json(res, 401, { error: "Unauthorized" });
          } catch {
            return json(res, 401, { error: "Unauthorized" });
          }

          const body = await new Promise((resolve, reject) => {
            let raw = "";
            req.on("data", (chunk) => {
              raw += chunk;
            });
            req.on("end", () => {
              try {
                resolve(raw ? JSON.parse(raw) : {});
              } catch (error) {
                reject(error);
              }
            });
            req.on("error", reject);
          }).catch(() => ({}));

          const username = String(body?.username ?? "").trim();
          const password = String(body?.password ?? "");
          const email = String(body?.email ?? "").trim();

          if (username.length < 3) {
            return json(res, 400, { error: "Username must be at least 3 characters." });
          }

          if (password.length < 8) {
            return json(res, 400, { error: "Password must be at least 8 characters." });
          }

          if (!email) {
            return json(res, 400, { error: "Admin email is required." });
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

          res.setHeader("Set-Cookie", serializeSessionCookie(sessionCookieName, "", { maxAgeSeconds: 0 }));
          return json(res, 200, {
            user: {
              username: adminState.username,
              email: adminState.email,
              role: "admin",
            },
          });
        }

        return next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
});
