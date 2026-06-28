import Link from "next/link";
import { BRAND } from "@/lib/config";

export default function SiteHeader() {
  return (
    <>
      {/* Coming Soon announcement banner */}
      <div className="relative z-30 bg-forest text-ivory">
        <p className="px-4 py-2.5 text-center text-xs tracking-[0.18em] uppercase">
          <span className="text-gold-light">✦</span>&nbsp; Our full store is
          launching soon — explore the collection &amp; join the list
          &nbsp;<span className="text-gold-light">✦</span>
        </p>
      </div>

      <header className="sticky top-0 z-20 border-b border-forest/8 bg-ivory/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-display text-gold">
              y
            </span>
            <span className="font-display text-lg tracking-wide text-forest">
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <Link href="/#shop" className="transition hover:text-forest">
              Shop
            </Link>
            <Link href="/#coming-soon" className="transition hover:text-forest">
              Coming Soon
            </Link>
            <Link href="/#notify" className="transition hover:text-forest">
              Newsletter
            </Link>
          </nav>

          <Link
            href="/#notify"
            className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-ivory transition hover:bg-forest-soft"
          >
            Notify Me
          </Link>
        </div>
      </header>
    </>
  );
}
