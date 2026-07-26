import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Nexus AI Systems home">
            <Logo className="h-8 w-8 shrink-0" />
            <span className="truncate font-display text-[0.95rem] font-bold tracking-tight text-ink">
              Nexus <span className="font-normal text-muted-foreground">AI Systems</span>
            </span>
          </Link>

          <nav className="hidden justify-center xl:flex" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="relative rounded-md px-3 py-2 text-[0.82rem] font-medium text-muted-foreground transition-colors hover:text-ink data-[status=active]:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <Link
              to="/contact"
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[0.8rem] font-semibold text-background transition-all hover:shadow-[var(--shadow-glow)] sm:inline-flex"
            >
              Book Strategy Call
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink xl:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background xl:hidden"
          >
            <div className="container-x grid gap-1 py-5">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="rounded-lg px-3 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-surface"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 rounded-lg bg-ink px-4 py-3 text-center text-sm font-semibold text-background"
              >
                Book Strategy Call
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
