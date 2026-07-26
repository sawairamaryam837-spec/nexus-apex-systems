import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  PhoneCall,
  CalendarCheck,
  Database,
  Workflow,
  Megaphone,
  MessagesSquare,
  Boxes,
  Cpu,
  Target,
  AudioLines,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/nexus";
import { Reveal, SectionHeading, stagger, item } from "./reveal";

export const serviceIcons: Record<string, LucideIcon> = {
  "ai-sales-agents": Bot,
  "ai-calling-agents": PhoneCall,
  "ai-appointment-setting": CalendarCheck,
  "crm-automation": Database,
  "workflow-automation": Workflow,
  "marketing-automation": Megaphone,
  "ai-chatbots": MessagesSquare,
  "saas-development": Boxes,
  "custom-ai-systems": Cpu,
  "lead-qualification-ai": Target,
  "ai-voice-agents": AudioLines,
  "ai-consulting": Compass,
};

export function ServiceCard({ slug }: { slug: string }) {
  const s = services.find((x) => x.slug === slug)!;
  const Icon = serviceIcons[slug] ?? Bot;
  return (
    <motion.div variants={item} className="h-full">
      <Link
        to="/services/$slug"
        params={{ slug: s.slug }}
        className="lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-accent">
            <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
          </span>
          <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
            {s.category}
          </span>
        </div>
        <h3 className="mt-5 font-display text-lg font-bold">{s.name}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
        <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="font-display text-xl font-bold text-ink">{s.metric}</p>
            <p className="mt-0.5 text-[0.7rem] leading-tight text-muted-foreground">{s.metricLabel}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Twelve disciplines. One <span className="text-gradient">operating system</span> for revenue.
              </>
            }
            body="Each capability is deployed as a production system with its own evaluation suite, cost model, and executive scorecard — never as a demo."
          />
          <Reveal delay={0.1}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
            >
              All services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <ServiceCard key={s.slug} slug={s.slug} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
