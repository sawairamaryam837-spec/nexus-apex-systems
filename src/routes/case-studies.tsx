import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { FinalCta } from "@/components/site/case-studies";
import { CaseStudiesSection } from "@/components/site/case-studies";
import { TrustedBy } from "@/components/site/trust-process";

const title = "Case Studies — Nexus AI Systems";
const description = "Before and after metrics from enterprise AI deployments across logistics, insurance, SaaS, healthcare, and financial services.";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/case-studies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Case Studies" title={<>Outcomes we can <span className="text-gradient">put in writing.</span></>} body="Baselines captured in discovery, results reconciled with client finance teams, and every figure reviewed quarterly." />
      <CaseStudiesSection />
      <TrustedBy />
      <FinalCta />
    </>
  ),
});
