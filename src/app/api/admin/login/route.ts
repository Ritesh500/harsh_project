import { NextResponse } from "next/server";
import { SESSION_COOKIE, checkPassword, signToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const password = (body as { password?: unknown })?.password;
  if (!checkPassword(password)) {
    return NextResponse.json(
      { ok: false, message: "Incorrect password." },
      { status: 401 }
    );
  }

  const token = await signToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
