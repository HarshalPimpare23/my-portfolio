import fs from "node:fs/promises";

export const sessionCookieName = "portfolio_admin_session";

export function createDefaultAdminState() {
  return {
    username: process.env.VITE_ADMIN_USERNAME ?? "admin",
    password: process.env.VITE_ADMIN_PASSWORD ?? "admin123",
    email: process.env.VITE_ADMIN_EMAIL ?? "harshalpimpare99@gmail.com",
    version: 1,
  };
}

export function sanitizeAdminState(raw, fallback = createDefaultAdminState()) {
  return {
    username: typeof raw?.username === "string" && raw.username.trim() ? raw.username.trim() : fallback.username,
    password: typeof raw?.password === "string" && raw.password.length ? raw.password : fallback.password,
    email: typeof raw?.email === "string" && raw.email.trim() ? raw.email.trim() : fallback.email,
    version: Number.isFinite(Number(raw?.version)) ? Number(raw.version) : fallback.version,
  };
}

export async function loadAdminState(filePath, fallback = createDefaultAdminState()) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return sanitizeAdminState(JSON.parse(raw), fallback);
  } catch {
    return { ...fallback };
  }
}

export async function saveAdminState(filePath, nextState, fallback = createDefaultAdminState()) {
  const state = sanitizeAdminState(nextState, fallback);
  await fs.writeFile(filePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  return state;
}

export function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((pair) => {
        const index = pair.indexOf("=");
        if (index === -1) return [pair, ""];
        const key = pair.slice(0, index).trim();
        const value = pair.slice(index + 1).trim();
        return [key, decodeURIComponent(value)];
      })
  );
}

export function sessionCookieOptions({ secure = false } = {}) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
  };
}

export function serializeSessionCookie(name, value, { secure = false, maxAgeSeconds } = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", "SameSite=Lax", "HttpOnly"];

  if (secure) parts.push("Secure");
  if (typeof maxAgeSeconds === "number") parts.push(`Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`);

  return parts.join("; ");
}

export function createAuthContext({ jwt, jwtSecret, adminState }) {
  function createSessionToken(state = adminState) {
    return jwt.sign(
      {
        role: "admin",
        username: state.username,
        email: state.email,
        version: state.version,
      },
      jwtSecret,
      { subject: state.username, expiresIn: "12h" }
    );
  }

  function verifySessionToken(token, currentState = adminState) {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== "admin" || payload.version !== currentState.version) {
      return null;
    }
    return payload;
  }

  return {
    createSessionToken,
    verifySessionToken,
  };
}
