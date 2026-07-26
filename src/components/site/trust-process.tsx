import { clientLogos, processSteps } from "@/data/nexus";
import { Reveal, SectionHeading } from "./reveal";
import { motion } from "motion/react";

export function TrustedBy() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="border-y border-border bg-background py-14">
      <div className="container-x">
        <p className="text-center font-mono text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
          Operating inside enterprise revenue teams
        </p>
      </div>
      <div
        className="relative mt-8 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-14 px-7">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none font-display text-lg font-bold tracking-[0.18em] text-muted-foreground/45 transition-colors duration-300 hover:text-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Engagement Model"
          title={
            <>
              A deployment process built for <span className="text-gradient">boards, not demos.</span>
            </>
          }
          body="Seven phases, fixed checkpoints, and a working system in production before the invoice for phase five."
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <span className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-border md:left-1/2" aria-hidden />
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px origin-top md:left-1/2"
            style={{ background: "var(--gradient-accent)" }}
            aria-hidden
          />
          <ol className="grid gap-8">
            {processSteps.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05}>
                <li
                  className={`relative grid grid-cols-[40px_1fr] gap-5 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className={i % 2 === 1 ? "md:pl-12" : "md:pr-12 md:text-right"}>
                    <span
                      className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-border bg-background font-mono text-[0.68rem] font-semibold text-primary md:left-1/2 md:-translate-x-1/2"
                      aria-hidden
                    >
                      {p.n}
                    </span>
                    <div className={i % 2 === 1 ? "md:ml-0" : ""}>
                      <h3 className="font-display text-lg font-bold">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                    </div>
                  </div>
                  <div aria-hidden className="hidden md:block" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
