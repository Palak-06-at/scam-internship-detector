import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "How does InternShield work?",
    a: "You paste an internship description and InternShield checks it against a set of rules for common scam tactics — like fees, deposits, pressure language and requests for sensitive data. Each detected indicator adds points to a 0–100 risk score.",
  },
  {
    q: "Does InternShield guarantee that an internship is legitimate?",
    a: "No. InternShield is an educational screening tool. A low score only means no obvious warning signs were found in the text — always verify the company independently.",
  },
  {
    q: "What warning signs does it detect?",
    a: "Registration or application fees, security deposits and payment requests, unrealistic salary promises, urgency and pressure tactics, requests for sensitive or banking information, and guaranteed selection claims.",
  },
  {
    q: "Does it store my internship descriptions?",
    a: "No. The analysis runs entirely in your browser. Your text is never sent to a server or saved anywhere.",
  },
  {
    q: "What should I do if an internship looks suspicious?",
    a: "Don't pay any money or share OTPs, bank details or ID documents. Verify the company through its official website, contact your college placement cell, and report the listing to the platform where you found it. In India you can also report at cybercrime.gov.in or call 1930.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {FAQS.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`} className="glass rounded-2xl border px-5">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
