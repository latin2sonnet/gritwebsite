import Link from "next/link";
import { MARKETING_NAV } from "@/lib/nav";
import { SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-[11px] font-bold tracking-[0.14em] text-white">
            G
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-white">
              {SITE.name}
            </p>
            <p className="text-xs text-neutral-500">
              Clear the fault. Stay at the machine.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {MARKETING_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#access"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            {SITE.ctaPrimary}
          </Link>
        </nav>

        <p className="text-xs text-neutral-600">
          &copy; {new Date().getFullYear()} GRIT
        </p>
      </div>
    </footer>
  );
}
