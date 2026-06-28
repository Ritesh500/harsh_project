import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/auth";

const MUTATING = new Set(["POST", "PATCH", "PUT", "DELETE"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifyToken(token);

  // Protect admin pages — redirect unauthenticated users to the login screen.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect product/upload write APIs — return 401 JSON.
  const isProtectedApi =
    pathname.startsWith("/api/products") || pathname.startsWith("/api/upload");
  if (isProtectedApi && MUTATING.has(req.method) && !authed) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/products/:path*", "/api/upload"],
};
