import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";

const title = "Privacy Policy — Nexus AI Systems";
const description = "How Nexus AI Systems collects, processes, and retains information from this website and client engagements.";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/legal/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/legal/privacy" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title={<>Privacy Policy</>} body="How Nexus AI Systems collects, processes, and retains information from this website and client engagements." />
      <section className="pb-24">
        <div className="container-x">
          <div className="grid max-w-2xl gap-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>We collect only the information you submit through our contact and briefing forms, plus aggregate analytics about how this site is used.</p>
              <p>Engagement data is processed under a signed data processing agreement, with regional processing and configurable retention. We do not sell personal data.</p>
              <p>To request access, correction, or deletion of your information, contact privacy@nexusaisystems.com.</p>
          </div>
        </div>
      </section>
    </>
  ),
});
