import { AlertTriangle } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./Navbar";

export function Footer() {
  return (
    <footer className="border-t bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A student cybersecurity project that helps you spot scam indicators in internship listings before you trust them.
          </p>
        </div>
        <nav>
          <p className="text-sm font-semibold">Navigate</p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary-glow">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
            InternShield is an educational screening tool. Its results are indicators, not proof of fraud or legitimacy.
          </p>
          <p>© {new Date().getFullYear()} InternShield</p>
        </div>
      </div>
    </footer>
  );
}
