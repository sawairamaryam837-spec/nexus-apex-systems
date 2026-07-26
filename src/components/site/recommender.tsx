import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

type Q = { id: string; label: string; hint: string; options: { value: string; weight: number }[] };

const questions: Q[] = [
  {
    id: "size",
    label: "How many people work at your company?",
    hint: "Determines deployment complexity and integration surface.",
    options: [
      { value: "1–50", weight: 1 },
      { value: "51–250", weight: 2 },
      { value: "251–1,000", weight: 3 },
      { value: "1,000+", weight: 4 },
    ],
  },
  {
    id: "industry",
    label: "Which industry are you in?",
    hint: "Shapes compliance posture and conversation design.",
    options: [
      { value: "B2B SaaS", weight: 2 },
      { value: "Financial services", weight: 3 },
      { value: "Healthcare", weight: 3 },
      { value: "Industrial / logistics", weight: 2 },
    ],
  },
  {
    id: "team",
    label: "How large is your sales team today?",
    hint: "Sets the baseline cost we are measuring against.",
    options: [
      { value: "No dedicated team", weight: 1 },
      { value: "1–5 reps", weight: 2 },
      { value: "6–20 reps", weight: 3 },
      { value: "20+ reps", weight: 4 },
    ],
  },
  {
    id: "leads",
    label: "How many inbound leads per month?",
    hint: "Drives throughput requirements and model routing cost.",
    options: [
      { value: "Under 250", weight: 1 },
      { value: "250–1,000", weight: 2 },
      { value: "1,000–5,000", weight: 3 },
      { value: "5,000+", weight: 4 },
    ],
  },
  {
    id: "revenue",
    label: "What is your annual revenue?",
    hint: "Used to model realistic return, not to price the work.",
    options: [
      { value: "Under $5M", weight: 1 },
      { value: "$5M–$25M", weight: 2 },
      { value: "$25M–$100M", weight: 3 },
      { value: "$100M+", weight: 4 },
    ],
  },
  {
    id: "pain",
    label: "What is costing you the most right now?",
    hint: "Determines which system we deploy first.",
    options: [
      { value: "Slow lead response", weight: 3 },
      { value: "Cost of headcount", weight: 4 },
      { value: "Inconsistent follow-up", weight: 2 },
      { value: "Unreliable pipeline data", weight: 2 },
    ],
  },
  {
    id: "budget",
    label: "What budget band are you working within?",
    hint: "Aligns the recommendation to a package you can approve.",
    options: [
      { value: "Under $25k", weight: 1 },
      { value: "$25k–$100k", weight: 2 },
      { value: "$100k–$400k", weight: 3 },
      { value: "$400k+", weight: 4 },
    ],
  },
];

const recommendations = [
  {
    tier: "Focused Pilot",
    solution: "AI Appointment Setting + Lead Qualification AI",
    slug: "ai-appointment-setting",
    time: "4 weeks",
    pkg: "Pilot",
    roi: "210%",
    savings: "$140,000",
  },
  {
    tier: "Revenue Program",
    solution: "AI Sales Agents + CRM Automation",
    slug: "ai-sales-agents",
    time: "6 weeks",
    pkg: "Program",
    roi: "380%",
    savings: "$720,000",
  },
  {
    tier: "Enterprise System",
    solution: "AI Calling Agents + Workflow Automation + Custom AI Systems",
    slug: "ai-calling-agents",
    time: "9 weeks",
    pkg: "Enterprise",
    roi: "612%",
    savings: "$2,140,000",
  },
];

export function Recommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = questions.length;
  const q = questions[step];

  const result = useMemo(() => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    if (score <= 13) return recommendations[0];
    if (score <= 21) return recommendations[1];
    return recommendations[2];
  }, [answers]);

  const select = (weight: number) => {
    setAnswers((a) => ({ ...a, [q.id]: weight }));
    if (step === total - 1) setDone(true);
    else setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  return (
    <section id="assessment" className="border-y border-border bg-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Solution Finder"
          title={
            <>
              Seven questions. A costed <span className="text-gradient">recommendation.</span>
            </>
          }
          body="The same diagnostic our solutions architects run in the first discovery call, condensed into two minutes."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="panel overflow-hidden">
            <div className="h-1 w-full bg-secondary">
              <motion.div
                className="h-full"
                style={{ background: "var(--gradient-accent)" }}
                animate={{ width: `${done ? 100 : (step / total) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-7 sm:p-9"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow">
                      Question {step + 1} of {total}
                    </span>
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-ink"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold sm:text-2xl">{q.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{q.hint}</p>
                  <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {q.options.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => select(o.weight)}
                        className={cn(
                          "group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3.5 text-left text-sm font-medium text-ink transition-all",
                          "hover:border-primary/45 hover:shadow-[var(--shadow-soft)]",
                          answers[q.id] === o.weight && "border-primary/60 bg-accent",
                        )}
                      >
                        <span className="min-w-0 truncate">{o.value}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="p-7 sm:p-9"
                >
                  <span className="eyebrow">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Recommended programme
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">{result.tier}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Based on your profile we would deploy{" "}
                    <span className="font-semibold text-ink">{result.solution}</span> first, sequenced to
                    reach production before the next quarterly review.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-4">
                    {[
                      { l: "Estimated ROI", v: result.roi },
                      { l: "Implementation", v: result.time },
                      { l: "Suggested package", v: result.pkg },
                      { l: "Annual savings", v: result.savings },
                    ].map((s, i) => (
                      <motion.div
                        key={s.l}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                        className="rounded-xl border border-border bg-surface p-4"
                      >
                        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {s.l}
                        </p>
                        <p className="mt-1.5 font-display text-lg font-bold text-ink">{s.v}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition-all hover:shadow-[var(--shadow-glow)]"
                    >
                      Review this with an architect
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/services/$slug"
                      params={{ slug: result.slug }}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-primary/40"
                    >
                      Read the service brief
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-ink"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Start over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
