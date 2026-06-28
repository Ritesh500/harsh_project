import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseProductInput, uniqueSlug } from "@/lib/product-input";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { ok: false, message: "Product not found." },
      { status: 404 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  // Full update (edit form sends a `name`).
  if (typeof body.name === "string") {
    const parsed = parseProductInput(body);
    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, message: parsed.errors.join(" ") },
        { status: 422 }
      );
    }
    const slug = await uniqueSlug(parsed.data.name, id);
    const product = await prisma.product.update({
      where: { id },
      data: { ...parsed.data, slug },
    });
    return NextResponse.json({ ok: true, product });
  }

  // Partial toggle (quick actions from the dashboard list).
  const data: Record<string, boolean> = {};
  for (const key of ["comingSoon", "featured", "published"] as const) {
    if (typeof body[key] === "boolean") data[key] = body[key] as boolean;
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { ok: false, message: "Nothing to update." },
      { status: 422 }
    );
  }
  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json({ ok: true, product });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Product not found." },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}
