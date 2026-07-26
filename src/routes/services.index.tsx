import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { services } from "@/data/nexus";
import { ServiceCard } from "@/components/site/services-section";
import { FinalCta } from "@/components/site/case-studies";
import { stagger } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";

const title = "AI Services — Nexus AI Systems";
const description =
  "Twelve production AI disciplines: sales agents, calling agents, appointment setting, CRM and workflow automation, chatbots, custom systems, and consulting.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Production AI systems, <span className="text-gradient">not proofs of concept.</span>
          </>
        }
        body="Every capability below runs in live enterprise environments with its own evaluation suite, cost model, and executive scorecard."
      />
      <section className="pb-24">
        <div className="container-x">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((s) => (
              <ServiceCard key={s.slug} slug={s.slug} />
            ))}
          </motion.div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
