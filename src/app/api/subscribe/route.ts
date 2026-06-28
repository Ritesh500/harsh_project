import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

// Basic, pragmatic email validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Subscriber = { email: string; subscribedAt: string };

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Subscriber[]) : [];
  } catch {
    return [];
  }
}

async function writeSubscribers(list: Subscriber[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

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

  const email =
    typeof (body as { email?: unknown })?.email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const subscribers = await readSubscribers();

  if (subscribers.some((s) => s.email === email)) {
    return NextResponse.json({
      ok: true,
      message: "You're already on the list — stay tuned!",
    });
  }

  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  await writeSubscribers(subscribers);

  return NextResponse.json({
    ok: true,
    message: "You're on the list. We'll let you know the moment we launch.",
  });
}
