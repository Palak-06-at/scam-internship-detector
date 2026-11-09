import { Eye, GraduationCap, Lock } from "lucide-react";
import { Reveal } from "./Reveal";

const PILLARS = [
  { icon: Eye, title: "Explainable", text: "Every warning shows the exact phrases that triggered it." },
  { icon: Lock, title: "Private", text: "Analysis runs in your browser. Nothing is uploaded or stored." },
  { icon: GraduationCap, title: "Built for students", text: "Clear guidance before you share data or make payments." },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-14">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-glow">About InternShield</p>
            <p className="relative mt-5 max-w-4xl font-display text-2xl leading-snug font-semibold sm:text-3xl">
              InternShield is a cybersecurity project designed to help students become more aware of suspicious internship
              listings. It uses <span className="text-gradient">explainable text-based checks</span> to highlight potential
              warning signs before students share personal information or make payments.
            </p>
            <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="flex gap-3">
                  <pillar.icon className="h-5 w-5 shrink-0 text-primary-glow" />
                  <div>
                    <p className="font-semibold">{pillar.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{pillar.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
