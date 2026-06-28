import NotifyForm from "@/components/NotifyForm";
import Countdown from "@/components/Countdown";
import { BRAND, LAUNCH_DATE, SOCIAL_LINKS } from "@/lib/config";

export default function SiteFooter() {
  return (
    <footer id="notify" className="relative z-10 mt-24 border-t border-forest/10">
      {/* Newsletter / launch */}
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">
          Be the first
        </p>
        <h2 className="mt-4 font-display text-4xl font-light text-forest sm:text-5xl">
          Join the {BRAND.name} list
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Early access, launch news, and a little something for our founding
          members. No spam, ever.
        </p>

        <div className="mt-10">
          <Countdown target={LAUNCH_DATE} />
        </div>

        <div className="mt-10">
          <NotifyForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="font-display text-lg text-forest">{BRAND.name}</span>
          <nav className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.18em] text-muted transition hover:text-forest"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="text-xs text-muted/70">
            © {new Date().getFullYear()} {BRAND.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
