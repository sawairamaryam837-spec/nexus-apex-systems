import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";

const title = "Accessibility Statement — Nexus AI Systems";
const description = "Our commitment to WCAG 2.1 AA conformance across the Nexus AI Systems website.";

export const Route = createFileRoute("/legal/accessibility")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/legal/accessibility" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/legal/accessibility" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title={<>Accessibility Statement</>} body="Our commitment to WCAG 2.1 AA conformance across the Nexus AI Systems website." />
      <section className="pb-24">
        <div className="container-x">
          <div className="grid max-w-2xl gap-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>This site targets WCAG 2.1 AA conformance. Interactive elements are keyboard operable, focus states are visible, and motion respects the prefers-reduced-motion setting.</p>
              <p>Colour contrast has been verified against AA thresholds for body and interface text.</p>
              <p>If you encounter a barrier, contact accessibility@nexusaisystems.com and we will respond within five business days.</p>
          </div>
        </div>
      </section>
    </>
  ),
});
