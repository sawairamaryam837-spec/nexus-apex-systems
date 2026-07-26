import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { TrustedBy, ProcessSection } from "@/components/site/trust-process";
import { DashboardPreview } from "@/components/site/dashboard-preview";
import { ServicesSection } from "@/components/site/services-section";
import { Recommender } from "@/components/site/recommender";
import { CaseStudiesSection, FinalCta } from "@/components/site/case-studies";
import { FaqAssistant } from "@/components/site/faq-assistant";
import { PricingSection } from "@/components/site/pricing-section";
import { FoundersMessage } from "@/components/site/footer";

const title = "Nexus AI Systems — Replacing Sales Teams with AI";
const description =
  "Enterprise AI automation. Nexus designs, deploys, and operates AI sales agents, calling agents, and revenue systems inside your existing CRM and telephony stack.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nexus AI Systems",
          description,
          url: "/",
          slogan: "Replacing sales teams with intelligent AI systems.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <DashboardPreview />
      <ServicesSection />
      <ProcessSection />
      <Recommender />
      <CaseStudiesSection compact />
      <FaqAssistant />
      <PricingSection />
      <FoundersMessage />
      <FinalCta />
    </>
  );
}
