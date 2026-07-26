import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { FinalCta } from "@/components/site/case-studies";
import { FaqAssistant } from "@/components/site/faq-assistant";

const title = "Resources — Nexus AI Systems";
const description = "Deployment timelines, security posture, integration coverage, and ROI methodology — answered by the Nexus knowledge assistant.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/resources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Resources" title={<>Answers before the <span className="text-gradient">first meeting.</span></>} body="Our knowledge assistant is grounded in the same engagement documentation our architects use. Ask it anything about deployment, security, or return." />
      <FaqAssistant />
      <FinalCta />
    </>
  ),
});
