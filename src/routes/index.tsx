import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { DetectionFeatures } from "@/components/DetectionFeatures";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InternShield — Internship Scam Detector" },
      { name: "description", content: "Paste an internship listing and uncover scam warning signs like fees, deposits and fake guarantees in seconds." },
      { property: "og:title", content: "InternShield — Internship Scam Detector" },
      { property: "og:description", content: "Analyze internship listings for scam indicators before you trust them." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

/** The landing page: all sections stacked in order. */
function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <DetectionFeatures />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
