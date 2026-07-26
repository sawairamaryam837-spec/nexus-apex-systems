import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";

const title = "Book a Strategy Call — Nexus AI Systems";
const description =
  "Ninety minutes with a Nexus solutions architect. Leave with a costed opportunity map for AI in your revenue operation.";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Company is required").max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  return (
    <>
      <Toaster />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Book your <span className="text-gradient">AI strategy session.</span>
          </>
        }
        body="Tell us where the manual work sits. We will come back within one business day with an agenda and the architect who will run the call."
      />

      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              const parsed = schema.safeParse(data);
              if (!parsed.success) {
                const next: Record<string, string> = {};
                for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
                setErrors(next);
                return;
              }
              setErrors({});
              setSent(true);
              toast.success("Request received. We'll reply within one business day.");
            }}
            className="panel grid gap-5 p-7 sm:p-9"
          >
            {[
              { id: "name", label: "Full name", type: "text", max: 100 },
              { id: "email", label: "Work email", type: "email", max: 255 },
              { id: "company", label: "Company", type: "text", max: 120 },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="text-sm font-medium text-ink">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  maxLength={f.max}
                  aria-invalid={Boolean(errors[f.id])}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary/50"
                />
                {errors[f.id] ? <p className="mt-1.5 text-xs text-destructive">{errors[f.id]}</p> : null}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="text-sm font-medium text-ink">
                What are you trying to automate?
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                aria-invalid={Boolean(errors.message)}
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary/50"
              />
              {errors.message ? <p className="mt-1.5 text-xs text-destructive">{errors.message}</p> : null}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-background transition-all hover:shadow-[var(--shadow-glow)]"
            >
              {sent ? "Request sent" : "Request a strategy call"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground">
              This form is a front-end demonstration. Connect a backend to deliver submissions.
            </p>
          </form>

          <aside className="grid content-start gap-4">
            {[
              { Icon: Mail, l: "Email", v: "strategy@nexusaisystems.com" },
              { Icon: Phone, l: "Direct", v: "+44 20 7946 0112" },
              { Icon: MapPin, l: "Offices", v: "London · New York" },
            ].map(({ Icon, l, v }) => (
              <div key={l} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <Icon className="h-4 w-4 text-primary" />
                <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {l}
                </p>
                <p className="mt-1.5 font-display text-sm font-semibold text-ink">{v}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
