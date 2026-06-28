/**
 * Minimal single-admin auth for the dashboard.
 *
 * A correct password mints a signed session cookie (HMAC-SHA256). The token is
 * derived from the password, so changing ADMIN_PASSWORD invalidates old
 * sessions. Uses the Web Crypto API so the same logic runs in both Node route
 * handlers and edge middleware.
 */

export const SESSION_COOKIE = "you_admin_session";

function getSecret(): string {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

/** The expected session token for the current password + secret. */
export async function signToken(): Promise<string> {
  return hmac(`admin:${getPassword()}`);
}

/** Constant-time-ish comparison of a presented cookie against the valid token. */
export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await signToken();
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export function checkPassword(input: unknown): boolean {
  return typeof input === "string" && input === getPassword();
}
