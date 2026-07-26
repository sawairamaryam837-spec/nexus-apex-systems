import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { PricingSection } from "@/components/site/pricing-section";
import { FinalCta } from "@/components/site/case-studies";

const title = "Pricing — Nexus AI Systems";
const description =
  "Pilot, Program, and Enterprise engagements priced against the headcount they displace, with a modelled payback period in every proposal.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Transparent engagements, <span className="text-gradient">modelled payback.</span>
          </>
        }
        body="No seat licences and no per-conversation surprises. Choose a pilot to prove one workflow, or a standing programme to operate several."
      />
      <PricingSection />
      <FinalCta />
    </>
  ),
});
