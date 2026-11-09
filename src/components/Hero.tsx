import { ShieldAlert } from "lucide-react";
import { InternshipScanner } from "./InternshipScanner";

/** Top of the page: headline + the scanner (the main focus). */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20">
      {/* Background: grid + floating glow orbs */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="animate-orb pointer-events-none absolute -top-20 left-[10%] h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
      <div
        className="animate-orb pointer-events-none absolute top-60 right-[5%] h-80 w-80 rounded-full bg-primary-glow/15 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-primary-glow">
            <ShieldAlert className="h-3.5 w-3.5" /> Scam internship detection for students
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-balance sm:text-6xl lg:text-[4.25rem]">
            Your next opportunity.
            <br />
            <span className="text-gradient">Verified before you trust it.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Not every internship opportunity is what it seems. Analyze internship listings, uncover suspicious signals and
            make smarter application decisions with InternShield.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl animate-fade-up" style={{ animationDelay: "150ms" }}>
          <InternshipScanner />
        </div>
      </div>
    </section>
  );
}
