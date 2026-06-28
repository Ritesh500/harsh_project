import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseProductInput, uniqueSlug } from "@/lib/product-input";

export const runtime = "nodejs";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, products });
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

  const parsed = parseProductInput(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, message: parsed.errors.join(" ") },
      { status: 422 }
    );
  }

  const slug = await uniqueSlug(parsed.data.name);
  const product = await prisma.product.create({
    data: { ...parsed.data, slug },
  });

  return NextResponse.json({ ok: true, product }, { status: 201 });
}
