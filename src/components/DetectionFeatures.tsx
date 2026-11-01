import type { IndicatorCategory } from "@/types/analysis";
import { CATEGORY_ICONS } from "./categoryIcons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FEATURES: { category: IndicatorCategory; title: string; text: string }[] = [
  { category: "registration-fee", title: "Registration Fees", text: "Detect requests for upfront payments or application fees." },
  { category: "unrealistic-salary", title: "Unrealistic Salary Promises", text: "Identify unusually high salary promises without reasonable requirements." },
  { category: "urgency", title: "Urgency and Pressure", text: "Identify language that pressures candidates to act immediately." },
  { category: "sensitive-info", title: "Sensitive Information Requests", text: "Detect requests for banking information, OTPs or other sensitive details." },
  { category: "guaranteed-selection", title: "Guaranteed Selection Claims", text: "Identify claims promising guaranteed internships or jobs without a genuine selection process." },
  { category: "payment-request", title: "Suspicious Payment Requests", text: "Detect requests for deposits, training payments or other suspicious transactions." },
];

export function DetectionFeatures() {
  return (
    <section id="detect" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading eyebrow="What we detect" title="Six common scam signals" subtitle="Explainable checks for the tactics scammers use most often." />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = CATEGORY_ICONS[feature.category];
            return (
              <Reveal key={feature.title} delay={index * 80}>
                <div className="glass card-hover group h-full rounded-2xl p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border bg-primary/10 transition-colors group-hover:bg-gradient-primary">
                    <Icon className="h-6 w-6 text-primary-glow transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
