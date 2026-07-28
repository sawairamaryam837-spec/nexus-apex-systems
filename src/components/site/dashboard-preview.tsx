import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, PhoneCall, CalendarCheck, Bot, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const revenueSeries = [
  { m: "Jan", v: 1.2, p: 2.1 },
  { m: "Feb", v: 1.6, p: 2.4 },
  { m: "Mar", v: 2.1, p: 3.0 },
  { m: "Apr", v: 2.6, p: 3.7 },
  { m: "May", v: 3.4, p: 4.4 },
  { m: "Jun", v: 4.1, p: 5.2 },
  { m: "Jul", v: 4.8, p: 6.1 },
];

const callSeries = [
  { d: "Mon", c: 340 },
  { d: "Tue", c: 412 },
  { d: "Wed", c: 388 },
  { d: "Thu", c: 465 },
  { d: "Fri", c: 502 },
  { d: "Sat", c: 214 },
  { d: "Sun", c: 176 },
];

const feedSeed = [
  { icon: PhoneCall, text: "AI agent qualified Halden Manufacturing — score 92", tag: "Voice" },
  { icon: CalendarCheck, text: "Meeting booked with Verido Software · Thu 14:30", tag: "Calendar" },
  { icon: Bot, text: "Follow-up sequence advanced for 148 accounts", tag: "Sequence" },
  { icon: ShieldCheck, text: "CRM hygiene pass complete — 0 duplicates", tag: "CRM" },
  { icon: PhoneCall, text: "Warm transfer to closer · Northline Insurance", tag: "Voice" },
  { icon: CalendarCheck, text: "Proposal generated for Kestrel Capital", tag: "Deal" },
];

export function DashboardPreview() {
  const [feed, setFeed] = useState(feedSeed);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFeed((f) => [f[f.length - 1], ...f.slice(0, -1)]);
      setTick((t) => t + 1);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const revenue = useCountUp(4.82);
  const leads = useCountUp(3105);
  const calls = useCountUp(2497);
  const roi = useCountUp(612);

  return (
    <section id="platform" className="relative border-y border-border bg-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Operating Layer"
          title={
            <>
              Every AI employee reports to one <span className="text-gradient">executive dashboard.</span>
            </>
          }
          body="Not a screenshot. This is the live command surface our clients use to govern autonomous revenue operations — throughput, unit economics, and quality in one place."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="panel overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
                <p className="truncate font-display text-sm font-semibold text-ink">
                  Nexus Control · Revenue Operations
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Syncing
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-5 md:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
              <Kpi label="Revenue generated" value={`$${revenue.toFixed(2)}M`} delta="+18.4%" />
              <Kpi label="Qualified leads" value={Math.round(leads).toLocaleString()} delta="+11.2%" />
              <Kpi label="AI calls today" value={Math.round(calls).toLocaleString()} delta="+6.9%" />
              <Kpi label="ROI" value={`${Math.round(roi)}%`} delta="+42 pts" />

              <div className="min-w-0 rounded-xl border border-border bg-background p-4 sm:p-5 md:col-span-2 lg:col-span-2">

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-sm font-semibold text-ink">Pipeline value</p>
                  <p className="font-mono text-[0.6rem] text-muted-foreground sm:text-[0.65rem]">Last 7 months · $M</p>
                </div>

                <div className="mt-4 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueSeries} margin={{ left: -22, right: 6, top: 6 }}>
                      <defs>
                        <linearGradient id="nexusArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.32} />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="nexusArea2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--violet)" stopOpacity={0.18} />
                          <stop offset="100%" stopColor="var(--violet)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          background: "var(--card)",
                          fontSize: 12,
                          boxShadow: "var(--shadow-soft)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="p"
                        stroke="var(--violet)"
                        strokeWidth={1.5}
                        fill="url(#nexusArea2)"
                        name="Pipeline"
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#nexusArea)"
                        name="Closed"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-5">
                <p className="font-display text-sm font-semibold text-ink">AI calls by day</p>
                <div className="mt-4 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={callSeries} margin={{ left: -26, right: 4, top: 6 }}>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="d"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      />
                      <Tooltip
                        cursor={{ fill: "var(--accent)" }}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          background: "var(--card)",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="c" fill="var(--primary)" radius={[5, 5, 0, 0]} name="Calls" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-5">
                <p className="font-display text-sm font-semibold text-ink">Operational health</p>
                <div className="mt-5 grid gap-4">
                  <Meter label="Conversion rate" value={31} suffix="%" />
                  <Meter label="Avg response time" value={82} display="51s" />
                  <Meter label="Lead score quality" value={92} suffix="/100" />
                  <Meter label="Sales roles replaced" value={64} display="14 FTE" />
                </div>
              </div>

              <div className="min-w-0 rounded-xl border border-border bg-background p-4 sm:p-5 md:col-span-2 lg:col-span-2">

                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-ink">Activity feed</p>
                  <p className="font-mono text-[0.62rem] text-muted-foreground">live</p>
                </div>
                <ul className="mt-4 grid gap-2">
                  {feed.slice(0, 5).map((f, i) => (
                    <motion.li
                      key={`${tick}-${f.text}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="flex items-center gap-3 rounded-lg border border-border/70 bg-surface/60 px-3 py-2.5"
                    >
                      <f.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="min-w-0 flex-1 truncate text-xs text-foreground">{f.text}</span>
                      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-accent-foreground">
                        {f.tag}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 rounded-xl border border-border bg-background p-4 sm:p-5 md:col-span-2 lg:col-span-2">
                <p className="font-display text-sm font-semibold text-ink">Cost displaced</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { l: "Annual cost saved", v: "$2.14M" },
                    { l: "Meetings booked", v: "1,284" },
                    { l: "CRM status", v: "Healthy" },
                    { l: "Avg deal cycle", v: "-38%" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-border/70 bg-surface/60 p-4">
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {s.l}
                      </p>
                      <p className="mt-1.5 font-display text-lg font-bold text-ink">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Kpi({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="lift rounded-xl border border-border bg-background p-5">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums text-ink">{value}</p>
      <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
        <ArrowUpRight className="h-3 w-3" />
        {delta}
      </p>
    </div>
  );
}

function Meter({
  label,
  value,
  suffix,
  display,
}: {
  label: string;
  value: number;
  suffix?: string;
  display?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-display text-sm font-bold text-ink">
          {display ?? `${value}${suffix ?? ""}`}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn("h-full rounded-full")}
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>
    </div>
  );
}
