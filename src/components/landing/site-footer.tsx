import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { MARKETING_NAV } from "@/lib/nav";
import { SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <BrandMark size={32} className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold tracking-tight text-neutral-950">
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
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#access"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
          >
            {SITE.ctaPrimary}
          </Link>
        </nav>

        <p className="text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} GRIT
        </p>
      </div>
    </footer>
  );
}
