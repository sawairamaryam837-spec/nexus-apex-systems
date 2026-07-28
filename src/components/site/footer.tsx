import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Github, ArrowRight, MapPin } from "lucide-react";
import { services } from "@/data/nexus";
import { Logo } from "./logo";
import { Reveal } from "./reveal";
import founderImg from "@/assets/founder.jpg";

export function FoundersMessage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="grid h-full place-items-center">
                  <div className="text-center">
                    <div
                      className="mx-auto grid h-24 w-24 place-items-center rounded-full text-2xl font-bold text-primary-foreground"
                      style={{ background: "var(--gradient-accent)" }}
                      aria-hidden
                    >
                      JR
                    </div>
                    <p className="mt-5 font-display text-sm font-semibold text-ink">Julian Reyes</p>
                    <p className="mt-1 text-xs text-muted-foreground">Founder & Chief Executive</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-primary/40"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                Connect on LinkedIn
              </a>
            </div>

            <div>
              <span className="eyebrow">
                <span className="h-px w-6 bg-primary" aria-hidden />
                Founder's message
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl">
                We started Nexus because the software was ready and the operating models were not.
              </h2>
              <div className="mt-7 grid gap-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  I spent eleven years building revenue organisations — hiring, ramping, and eventually
                  laying off the same roles in cycles that had nothing to do with the quality of the people
                  in them. The work was mechanical. The cost was human.
                </p>
                <p>
                  When language models became reliable enough to hold a discovery conversation, the
                  bottleneck stopped being capability and became implementation discipline. Most companies
                  do not fail at AI because the technology is insufficient. They fail because nobody defined
                  what correct looks like, nobody measured the baseline, and nobody owned the system after
                  the pilot ended.
                </p>
                <p>
                  Nexus exists to close that gap. We build production systems with evaluation suites,
                  executive scorecards, and a handover plan from day one. Our clients own what we build.
                  Our engagements end with their teams operating the systems themselves.
                </p>
                <p>
                  The next five years will separate companies that treated AI as a procurement exercise from
                  those that treated it as an operating model change. We work with the second group.
                </p>
              </div>
              <p className="mt-8 font-display text-2xl italic text-ink" style={{ fontFamily: "var(--font-display)" }}>
                Julian Reyes
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Founder & Chief Executive, Nexus AI Systems</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const footerNav = [
  {
    title: "Services",
    links: services.slice(0, 6).map((s) => ({ label: s.name, to: "/services/$slug", params: { slug: s.slug } })),
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Solutions", to: "/solutions" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource library", to: "/resources" },
      { label: "Solution finder", to: "/solutions" },
      { label: "All services", to: "/services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/legal/privacy" },
      { label: "Terms", to: "/legal/terms" },
      { label: "Accessibility", to: "/legal/accessibility" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-[0.95rem] font-bold tracking-tight text-ink">
                Nexus <span className="font-normal text-muted-foreground">AI Systems</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Enterprise AI automation. We design, deploy, and operate the intelligent systems that run
              revenue.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex max-w-sm items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address for the Nexus briefing
              </label>
              <input
                id="newsletter"
                type="email"
                required
                maxLength={255}
                placeholder="Executive briefing, monthly"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-background transition-transform hover:scale-105"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            <div className="mt-7 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                1 Finsbury Avenue, London EC2M 2PF
                <br />
                340 Madison Avenue, New York NY 10173
              </span>
            </div>

            <div className="mt-6 flex gap-2">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "X" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        params={"params" in l ? (l.params as never) : undefined}
                        className="text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nexus AI Systems Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
            <Link to="/legal/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link to="/legal/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link to="/legal/accessibility" className="transition-colors hover:text-ink">
              Accessibility
            </Link>
            <Link to="/contact" className="transition-colors hover:text-ink">
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
