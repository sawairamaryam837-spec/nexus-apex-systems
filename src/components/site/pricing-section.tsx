import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Minus, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Pilot",
    price: "$18,000",
    cadence: "one-time · 6 weeks",
    blurb: "Prove one workflow in production against live traffic.",
    features: [
      "One AI workflow deployed",
      "Systems and data audit",
      "Evaluation suite",
      "Executive scorecard",
      "30-day hypercare",
    ],
    cta: "Scope a pilot",
    popular: false,
  },
  {
    name: "Program",
    price: "$12,500",
    cadence: "per month · 12-month term",
    blurb: "A standing engineering pod operating your revenue systems.",
    features: [
      "Up to 4 workflows in production",
      "Dedicated solutions architect",
      "Continuous tuning and evaluation",
      "CRM and telephony integration",
      "Quarterly business review",
      "Priority incident response",
    ],
    cta: "Book a strategy call",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual agreement",
    blurb: "Multi-region deployment under your governance and controls.",
    features: [
      "Unlimited workflows",
      "SOC 2 aligned controls, DPA/BAA",
      "Private and on-premise model routing",
      "Named engineering pod",
      "Custom SLAs and uptime guarantees",
      "Executive sponsor and roadmap input",
    ],
    cta: "Talk to enterprise",
    popular: false,
  },
];

const comparison = [
  { row: "Workflows in production", v: ["1", "Up to 4", "Unlimited"] },
  { row: "Dedicated architect", v: [false, true, true] },
  { row: "Evaluation suite", v: [true, true, true] },
  { row: "Private model routing", v: [false, false, true] },
  { row: "Quarterly business review", v: [false, true, true] },
  { row: "Custom SLA", v: [false, false, true] },
  { row: "Source and IP handover", v: [true, true, true] },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Engagement Pricing"
          title={
            <>
              Priced against the headcount it <span className="text-gradient">displaces.</span>
            </>
          }
          body="No seat licences, no per-conversation surprises. Every engagement is scoped to a payback period we put in writing."
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                className={cn(
                  "lift relative flex h-full flex-col rounded-2xl border p-7",
                  t.popular
                    ? "border-primary/40 bg-card shadow-[var(--shadow-lift)]"
                    : "border-border bg-card shadow-[var(--shadow-soft)]",
                )}
              >
                {t.popular ? (
                  <span
                    className="absolute -top-3 left-7 rounded-full px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary-foreground"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    Most selected
                  </span>
                ) : null}
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
                <p className="mt-6 font-display text-3xl font-bold text-ink">{t.price}</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {t.cadence}
                </p>
                <ul className="mt-6 grid flex-1 gap-2.5 border-t border-border pt-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={cn(
                    "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                    t.popular
                      ? "bg-ink text-background hover:shadow-[var(--shadow-glow)]"
                      : "border border-border text-ink hover:border-primary/40",
                  )}
                >
                  {t.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="panel overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <caption className="sr-only">Feature comparison across engagement tiers</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-4 text-left font-display text-sm font-bold text-ink">
                    Included
                  </th>
                  {tiers.map((t) => (
                    <th key={t.name} scope="col" className="px-6 py-4 text-left font-display text-sm font-bold text-ink">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr key={c.row} className="border-b border-border last:border-0">
                    <th scope="row" className="px-6 py-3.5 text-left font-normal text-muted-foreground">
                      {c.row}
                    </th>
                    {c.v.map((v, i) => (
                      <td key={i} className="px-6 py-3.5">
                        {typeof v === "boolean" ? (
                          v ? (
                            <Check className="h-4 w-4 text-primary" aria-label="Included" />
                          ) : (
                            <Minus className="h-4 w-4 text-muted-foreground/50" aria-label="Not included" />
                          )
                        ) : (
                          <span className="font-medium text-ink">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <RoiCalculator />
      </div>
    </section>
  );
}

export function RoiCalculator() {
  const [reps, setReps] = useState(10);
  const [salary, setSalary] = useState(85);
  const [leads, setLeads] = useState(1500);

  const currentCost = reps * salary * 1000;
  const nexusCost = 150000 + leads * 12;
  const saved = Math.max(0, currentCost - nexusCost);
  const roi = Math.round((saved / nexusCost) * 100);

  return (
    <Reveal delay={0.1} className="mt-16">
      <div className="panel grid gap-8 p-7 sm:p-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">ROI Model</span>
          <h3 className="mt-4 font-display text-2xl font-bold">Model the displacement.</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A directional estimate using fully loaded cost per rep against a Program-tier engagement. Your
            proposal will include a modelled figure reconciled with your finance team.
          </p>

          <div className="mt-8 grid gap-7">
            <Slider label="Sales development reps" value={reps} min={2} max={60} onChange={setReps} suffix=" reps" />
            <Slider
              label="Fully loaded cost per rep"
              value={salary}
              min={45}
              max={220}
              onChange={setSalary}
              format={(v) => `$${v}k`}
            />
            <Slider
              label="Inbound leads per month"
              value={leads}
              min={200}
              max={8000}
              step={100}
              onChange={setLeads}
              format={(v) => v.toLocaleString()}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-7">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
            Projected annual position
          </p>
          <div className="mt-6 grid gap-5">
            <Figure label="Current annual cost" value={`$${(currentCost / 1000).toFixed(0)}k`} muted />
            <Figure label="Nexus programme cost" value={`$${(nexusCost / 1000).toFixed(0)}k`} muted />
            <div className="h-px bg-border" />
            <Figure label="Net annual saving" value={`$${(saved / 1000).toFixed(0)}k`} />
            <Figure label="Return on investment" value={`${roi}%`} />
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition-all hover:shadow-[var(--shadow-glow)]"
          >
            Get a modelled proposal
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function Figure({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className={cn(
          "font-display font-bold tabular-nums",
          muted ? "text-base text-foreground" : "text-2xl text-ink",
        )}
      >
        {value}
      </motion.span>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = "",
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
  format?: (v: number) => string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-muted-foreground">
          {label}
        </label>
        <span className="font-display text-sm font-bold text-ink">
          {format ? format(value) : `${value}${suffix}`}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--primary)]"
      />
    </div>
  );
}
