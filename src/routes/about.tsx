import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { FinalCta } from "@/components/site/case-studies";
import { FoundersMessage } from "@/components/site/footer";
import { ProcessSection } from "@/components/site/trust-process";

const title = "About — Nexus AI Systems";
const description = "Nexus AI Systems is a senior-only AI implementation practice building production revenue systems for enterprise teams.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="About" title={<>An implementation firm for the <span className="text-gradient">AI operating model.</span></>} body="Nexus AI Systems is a senior-only engineering and strategy practice. We build the systems, prove the numbers, and hand them over." />
      <FoundersMessage />
      <ProcessSection />
      <FinalCta />
    </>
  ),
});
