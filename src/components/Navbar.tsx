import { useEffect, useState } from "react";
import { Menu, ScanSearch, X } from "lucide-react";
import { Logo } from "./Logo";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "What We Detect", href: "#detect" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a background once the user scrolls down
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? "glass border-x-0 border-t-0" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#scanner" className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
            <ScanSearch className="h-4 w-4" /> Start Scanning
          </a>
          <button
            className="btn-ghost !p-2 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="animate-fade-up border-t bg-background/95 px-5 pb-5 md:hidden">
          <ul className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu} className="block rounded-lg px-3 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#scanner" onClick={closeMenu} className="btn-primary mt-3 w-full">
            <ScanSearch className="h-4 w-4" /> Start Scanning
          </a>
        </div>
      )}
    </header>
  );
}
