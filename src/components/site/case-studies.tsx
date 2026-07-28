import { Reveal, SectionHeading } from "./reveal";
import { motion } from "motion/react";
import { Quote, Play, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";

export const caseStudies = [
  {
    poster: case1,
    company: "Meridian Logistics",
    industry: "Freight & logistics",
    quote:
      "We moved from a fourteen-person SDR floor to a four-person revenue operations team. Pipeline went up, not down.",
    person: "Dana Whitfield",
    role: "Chief Revenue Officer",
    before: [
      { l: "Qualified pipeline", v: "$3.1M" },
      { l: "Cost per meeting", v: "$412" },
      { l: "First response", v: "6h 14m" },
    ],
    after: [
      { l: "Qualified pipeline", v: "$12.8M" },
      { l: "Cost per meeting", v: "$132" },
      { l: "First response", v: "51s" },
    ],
  },
  {
    poster: case2,
    company: "Northline Insurance",
    industry: "Insurance",
    quote:
      "Abandon rate fell to near zero. Our licensed agents now only take the calls that are ready to bind.",
    person: "Marcus Iyer",
    role: "VP Customer Operations",
    before: [
      { l: "Call containment", v: "38%" },
      { l: "Cost to serve", v: "$18.40" },
      { l: "Bind rate", v: "21%" },
    ],
    after: [
      { l: "Call containment", v: "96%" },
      { l: "Cost to serve", v: "$10.90" },
      { l: "Bind rate", v: "27%" },
    ],
  },
  {
    poster: case3,
    company: "Verido Software",
    industry: "B2B SaaS",
    quote:
      "Forecast accuracy moved from sixty-two percent to ninety-one percent in one quarter without changing a single rep.",
    person: "Elena Boschetti",
    role: "SVP Revenue Operations",
    before: [
      { l: "Forecast accuracy", v: "62%" },
      { l: "Manual data entry", v: "4,100 hrs" },
      { l: "Record completeness", v: "54%" },
    ],
    after: [
      { l: "Forecast accuracy", v: "91%" },
      { l: "Manual data entry", v: "0 hrs" },
      { l: "Record completeness", v: "99.2%" },
    ],
  },
];

export function CaseStudiesSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client Outcomes"
          title={
            <>
              Measured before. Measured after. <span className="text-gradient">Reviewed quarterly.</span>
            </>
          }
          body="We publish the baseline alongside the result. Every figure below was reconciled with the client's own finance team."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(compact ? caseStudies.slice(0, 3) : caseStudies).map((c, i) => (
            <Reveal key={c.company} delay={i * 0.08}>
              <article className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-sm font-bold tracking-[0.14em] text-ink">
                    {c.company.toUpperCase()}
                  </span>
                  <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {c.industry}
                  </span>
                </div>

                <div className="relative mt-5 aspect-video overflow-hidden rounded-xl border border-border bg-surface">
                  <img
                    src={c.poster}
                    alt={`${c.person}, ${c.role} at ${c.company}, video testimonial`}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-ink/35">
                    <button
                      type="button"
                      className="group grid h-14 w-14 place-items-center rounded-full border border-border bg-background/90 backdrop-blur transition-all hover:shadow-[var(--shadow-glow)]"
                      aria-label={`Play ${c.company} testimonial`}
                    >
                      <Play className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                    </button>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-background">
                    Video · 2 min
                  </span>
                </div>

                <Quote className="mt-6 h-4 w-4 text-primary" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">“{c.quote}”</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-ink">{c.person}</span> · {c.role}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5">
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                      Before
                    </p>
                    <ul className="mt-2 grid gap-1.5">
                      {c.before.map((b) => (
                        <li key={b.l} className="text-xs text-muted-foreground">
                          {b.v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="inline-flex items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-primary">
                      <TrendingUp className="h-3 w-3" /> After
                    </p>
                    <ul className="mt-2 grid gap-1.5">
                      {c.after.map((a) => (
                        <li key={a.l} className="text-xs font-semibold text-ink">
                          {a.v}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {compact ? (
          <Reveal delay={0.2} className="mt-10">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-primary/40"
            >
              Read all case studies
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-ink px-7 py-16 text-center sm:px-14">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage:
                  "radial-gradient(60% 120% at 20% 0%, color-mix(in oklab, var(--primary) 55%, transparent), transparent 60%), radial-gradient(50% 120% at 80% 100%, color-mix(in oklab, var(--violet) 50%, transparent), transparent 60%)",
                backgroundSize: "200% 200%",
              }}
            />
            <div className="relative">
              <span className="eyebrow text-background/60">Next step</span>
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-[1.06] text-background sm:text-5xl">
                Book your AI strategy session.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
                Ninety minutes with a solutions architect. You leave with a costed opportunity map, whether
                or not you work with us.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Book strategy call
                </Link>
                <Link
                  to="/pricing"
                  className="rounded-full border border-background/25 px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-background/10"
                >
                  View engagement pricing
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
