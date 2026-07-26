import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";

const title = "Terms of Service — Nexus AI Systems";
const description = "The terms governing use of the Nexus AI Systems website and engagement materials.";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/legal/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/legal/terms" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title={<>Terms of Service</>} body="The terms governing use of the Nexus AI Systems website and engagement materials." />
      <section className="pb-24">
        <div className="container-x">
          <div className="grid max-w-2xl gap-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>This website and its contents are provided for informational purposes. Figures shown in models and calculators are directional estimates, not guarantees of outcome.</p>
              <p>Engagement terms, service levels, and deliverables are governed exclusively by the executed statement of work between Nexus AI Systems Ltd and the client.</p>
              <p>All trademarks and client names referenced remain the property of their respective owners and are used with permission.</p>
          </div>
        </div>
      </section>
    </>
  ),
});
