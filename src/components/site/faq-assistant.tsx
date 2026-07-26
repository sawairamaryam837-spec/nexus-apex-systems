import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SendHorizonal, Sparkles } from "lucide-react";
import { SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

type Entry = { q: string; a: string; tags: string[] };

const knowledge: Entry[] = [
  {
    q: "How quickly can we get an AI system into production?",
    a: "Most first workflows are live against real traffic in four to seven weeks. Discovery and systems mapping take two weeks, build and supervised training take two to three, and rollout is phased behind traffic percentages you control.",
    tags: ["timeline", "deployment"],
  },
  {
    q: "Will this replace our sales team?",
    a: "It replaces the repetitive portion of the sales motion — qualification, first response, follow-up, scheduling, and CRM maintenance. Most clients redeploy their strongest closers upstream rather than reducing headcount, though several have consolidated SDR functions entirely.",
    tags: ["team", "roi"],
  },
  {
    q: "Which CRMs and phone systems do you integrate with?",
    a: "Salesforce, HubSpot, Pipedrive, Microsoft Dynamics, Twilio, Vonage, Genesys, Five9, and most modern warehouses. Where a native connector does not exist we build against the API as part of the engagement.",
    tags: ["integration", "crm"],
  },
  {
    q: "How do you handle data security and compliance?",
    a: "Engagements run under SOC 2 aligned controls with regional processing, configurable retention, and zero-retention model routing where required. We support DPAs, BAAs, and customer-managed keys on enterprise agreements.",
    tags: ["security", "compliance"],
  },
  {
    q: "What does an engagement cost?",
    a: "Pilots begin at $18,000 for a single workflow in production over six weeks. Ongoing programmes run from $12,500 per month. Enterprise agreements are scoped annually. Every proposal includes a modelled payback period.",
    tags: ["pricing", "roi"],
  },
  {
    q: "How do you measure whether it is working?",
    a: "Each system ships with an executive scorecard: pipeline generated, cost per qualified conversation, response latency, containment, and operating cost displaced — reviewed monthly against the baseline we captured in discovery.",
    tags: ["roi", "measurement"],
  },
  {
    q: "What happens if the AI gets something wrong?",
    a: "Every workflow has escalation rules, confidence thresholds, and human-in-the-loop checkpoints on high-value paths. Failures are logged, replayable, and added to the evaluation suite so the same error cannot recur silently.",
    tags: ["quality", "risk"],
  },
  {
    q: "Do we own what you build?",
    a: "Yes. Prompts, workflows, evaluation sets, and infrastructure live in your accounts and are handed over with documentation and runbooks at the end of the engagement.",
    tags: ["ownership", "contract"],
  },
];

const suggested = [
  "How quickly can we deploy?",
  "What does it cost?",
  "Is our data secure?",
  "Which CRMs do you support?",
];

function findAnswer(query: string): Entry {
  const q = query.toLowerCase();
  const scored = knowledge
    .map((e) => {
      const hay = `${e.q} ${e.a} ${e.tags.join(" ")}`.toLowerCase();
      const score = q
        .split(/\s+/)
        .filter((w) => w.length > 3)
        .reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
      return { e, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored[0].score > 0 ? scored[0].e : knowledge[0];
}

type Msg = { role: "user" | "assistant"; text: string };

export function FaqAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "I'm the Nexus knowledge assistant. Ask about deployment timelines, security posture, pricing, integrations, or how we measure return.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [filter, setFilter] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const ask = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const answer = findAnswer(text);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "assistant", text: answer.a }]);
    }, 900);
  };

  const filtered = knowledge.filter((e) =>
    filter ? `${e.q} ${e.tags.join(" ")}`.toLowerCase().includes(filter.toLowerCase()) : true,
  );

  return (
    <section id="faq" className="border-y border-border bg-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Ask anything. Get the <span className="text-gradient">actual answer.</span>
            </>
          }
          body="The same assistant architecture we deploy for clients, grounded in our own engagement documentation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="panel flex h-[30rem] flex-col overflow-hidden">
            <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
              <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: "var(--gradient-accent)" }}>
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              <p className="font-display text-sm font-semibold text-ink">Nexus Assistant</p>
              <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                Grounded
              </span>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <p
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-ink text-background"
                        : "rounded-bl-md border border-border bg-surface text-foreground",
                    )}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
              <AnimatePresence>
                {typing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.16 }}
                        />
                      ))}
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="flex flex-wrap gap-1.5 pb-3">
                {suggested.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-[0.72rem] font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
              >
                <label htmlFor="faq-input" className="sr-only">
                  Ask a question
                </label>
                <input
                  id="faq-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={200}
                  placeholder="Ask about security, pricing, timelines…"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  aria-label="Send question"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-background transition-transform hover:scale-105"
                >
                  <SendHorizonal className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>

          <div className="panel flex h-[30rem] flex-col overflow-hidden">
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
                <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <label htmlFor="faq-filter" className="sr-only">
                  Search frequently asked questions
                </label>
                <input
                  id="faq-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search the knowledge base"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {filtered.map((e) => (
                <li key={e.q}>
                  <button
                    type="button"
                    onClick={() => ask(e.q)}
                    className="group flex w-full flex-col gap-1.5 px-5 py-4 text-left transition-colors hover:bg-surface"
                  >
                    <span className="font-display text-sm font-semibold text-ink">{e.q}</span>
                    <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{e.a}</span>
                    <span className="mt-1 flex gap-1.5">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-accent px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-accent-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No matching entries. Ask the assistant directly.
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
