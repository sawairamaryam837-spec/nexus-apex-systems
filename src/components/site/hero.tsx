import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { funnelStages } from "@/data/nexus";
import { cn } from "@/lib/utils";

function useLiveCounter(base: number, step: number, interval = 2600) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => v + Math.round(step * (0.5 + Math.random()))), interval);
    return () => clearInterval(id);
  }, [step, interval]);
  return value;
}

export function HeroFunnel() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => setActive((i) => (i + 1) % funnelStages.length), 2000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const shown = pinned ?? active;
  const stage = funnelStages[shown];

  const conversations = useLiveCounter(18426, 7);
  const meetings = useLiveCounter(1284, 1, 4200);
  const pipeline = useLiveCounter(4820000, 3400, 1800);

  return (
    <div className="panel relative overflow-hidden p-5 sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-primary"
                style={{ animation: "nexus-pulse-ring 2.4s ease-out infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <p className="truncate font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              Revenue System · Live
            </p>
          </div>
          <p className="shrink-0 font-mono text-[0.68rem] text-muted-foreground">v4.2.1</p>
        </div>

        <div className="grid gap-6 pt-5 lg:grid-cols-[1fr_1.05fr]">
          <ol className="relative grid gap-1.5" aria-label="AI revenue system stages">
            {funnelStages.map((s, i) => {
              const isActive = i === shown;
              const passed = i < shown;
              return (
                <li key={s.id} className="relative">
                  {i < funnelStages.length - 1 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[13px] top-[26px] h-[calc(100%-14px)] w-px transition-colors duration-500",
                        passed || isActive ? "bg-primary/50" : "bg-border",
                      )}
                    />
                  ) : null}
                  <button
                    type="button"
                    onMouseEnter={() => setPinned(i)}
                    onMouseLeave={() => setPinned(null)}
                    onFocus={() => setPinned(i)}
                    onBlur={() => setPinned(null)}
                    onClick={() => setPinned(i)}
                    aria-current={isActive}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors",
                      isActive ? "bg-accent/70" : "hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border text-[0.62rem] font-semibold transition-all duration-500",
                        isActive
                          ? "border-transparent text-primary-foreground shadow-[var(--shadow-glow)]"
                          : passed
                            ? "border-primary/40 bg-background text-primary"
                            : "border-border bg-background text-muted-foreground",
                      )}
                      style={isActive ? { background: "var(--gradient-accent)" } : undefined}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate font-display text-[0.82rem] font-semibold transition-colors",
                        isActive ? "text-ink" : "text-muted-foreground",
                      )}
                    >
                      {s.label}
                    </span>
                    <span className="shrink-0 font-mono text-[0.66rem] text-muted-foreground">{s.stat}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-surface/70 p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="eyebrow">Stage {String(shown + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-lg font-bold">{stage.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <LiveStat label="Conversations" value={conversations.toLocaleString()} />
              <LiveStat label="Meetings" value={meetings.toLocaleString()} />
              <LiveStat
                label="Pipeline"
                value={`$${(pipeline / 1_000_000).toFixed(2)}M`}
              />
            </div>

            <SignalGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        className="mt-1.5 font-display text-base font-bold tabular-nums text-ink"
      >
        {value}
      </motion.p>
    </div>
  );
}

function SignalGraph() {
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 28 }, (_, i) => 30 + Math.sin(i / 2.2) * 12 + i * 0.9),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setPoints((p) => {
        const next = [...p.slice(1)];
        const last = p[p.length - 1];
        next.push(Math.max(14, Math.min(74, last + (Math.random() - 0.42) * 9)));
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const d = points
    .map((v, i) => `${(i / (points.length - 1)) * 100},${80 - v}`)
    .join(" ");

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
          Qualified throughput
        </p>
        <p className="font-mono text-[0.6rem] text-primary">+18.4%</p>
      </div>
      <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="mt-3 h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id="nexus-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,80 ${d} 100,80`} fill="url(#nexus-spark)" />
        <polyline
          points={d}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.55]" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 16%, transparent), transparent)",
        }}
        aria-hidden
      />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Enterprise AI Automation
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 text-[2.6rem] font-bold leading-[1.02] sm:text-[3.4rem] lg:text-[4rem]"
            >
              Replacing sales teams with{" "}
              <span className="text-gradient">intelligent AI systems.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Nexus designs and operates the AI employees that qualify, call, follow up, and close —
              integrated into the CRM, telephony, and data infrastructure you already run.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-background transition-all hover:shadow-[var(--shadow-glow)]"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <Play className="h-3.5 w-3.5 text-primary" />
                See the system
              </Link>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7"
            >
              {[
                { v: "$182M", l: "Pipeline generated" },
                { v: "94%", l: "Manual work displaced" },
                { v: "6 wks", l: "Median time to production" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl font-bold text-ink">{s.v}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroFunnel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
