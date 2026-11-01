import { ClipboardPaste, Cpu, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { icon: ClipboardPaste, title: "Paste the Internship", text: "Add a job description or internship listing." },
  { icon: Cpu, title: "Analyze the Details", text: "The tool checks the content for suspicious patterns." },
  { icon: ShieldCheck, title: "Understand the Risk", text: "Receive a risk score, warning signs and safety recommendations." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading eyebrow="How it works" title="Three steps to a safer application" />
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-primary-glow/50 to-transparent md:block" />

          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 150}>
              <div className="relative text-center">
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-2xl border bg-surface glow">
                  <step.icon className="h-8 w-8 text-primary-glow" />
                  <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-primary font-mono text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
