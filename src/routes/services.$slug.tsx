import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { getService, services, type Service } from "@/data/nexus";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { FinalCta } from "@/components/site/case-studies";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — Nexus AI Systems" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.service.name} — Nexus AI Systems`;
    const d = loaderData.service.summary;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData() as { service: Service };

  return (
    <>
      <PageHero eyebrow={`Services · ${s.category}`} title={s.tagline} body={s.summary} />

      <section className="pb-20">
        <div className="container-x grid gap-5 sm:grid-cols-3">
          {s.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="lift h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <h3 className="font-display text-base font-bold">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Capabilities" title="What ships." />
            <ul className="mt-8 grid gap-3">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Workflow" title="How it runs." />
            <ol className="mt-8 grid gap-4">
              {s.workflow.map((w, i) => (
                <li key={w.step} className="rounded-xl border border-border bg-background p-5">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                    Step {i + 1} · {w.step}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <div className="panel grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="eyebrow">Case study · {s.caseStudy.company}</span>
                <p className="mt-5 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  “{s.caseStudy.quote}”
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-ink">{s.caseStudy.person}</span> · {s.caseStudy.role}
                </p>
              </div>
              <div className="grid gap-3">
                {s.caseStudy.results.map((r) => (
                  <div key={r} className="rounded-xl border border-border bg-surface p-4">
                    <p className="font-display text-base font-bold text-ink">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Pricing" title="Engagement options." />
            <div className="mt-8 grid gap-4">
              {s.pricing.map((p) => (
                <div key={p.name} className="rounded-xl border border-border bg-background p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-bold">{p.name}</h3>
                    <span className="font-display text-lg font-bold text-ink">{p.price}</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {p.note}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {p.includes.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Common questions." />
            <dl className="mt-8 grid gap-4">
              {s.faq.map((f) => (
                <div key={f.q} className="rounded-xl border border-border bg-background p-5">
                  <dt className="font-display text-sm font-bold text-ink">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <p className="eyebrow">Related services</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {services
              .filter((x) => x.slug !== s.slug)
              .slice(0, 6)
              .map((x) => (
                <Link
                  key={x.slug}
                  to="/services/$slug"
                  params={{ slug: x.slug }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-ink transition-all hover:border-primary/40"
                >
                  {x.name}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
