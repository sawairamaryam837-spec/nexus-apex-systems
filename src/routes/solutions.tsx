import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { FinalCta } from "@/components/site/case-studies";
import { Recommender } from "@/components/site/recommender";
import { ProcessSection } from "@/components/site/trust-process";

const title = "Solutions — Nexus AI Systems";
const description = "Find the right AI revenue system for your company size, industry, lead volume, and budget with the Nexus solution finder.";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Solutions" title={<>Solutions built around <span className="text-gradient">outcomes, not tooling.</span></>} body="Start with the diagnostic. Seven questions produce a costed recommendation, an implementation window, and the package best matched to your operation." />
      <Recommender />
      <ProcessSection />
      <FinalCta />
    </>
  ),
});
