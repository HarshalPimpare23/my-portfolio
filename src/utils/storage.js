export function safeGetJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function safeSetJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore storage errors (quota, disabled, etc.)
  }
}

export function safeRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    // ignore
  }
}
