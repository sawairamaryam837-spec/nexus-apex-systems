import type { ReactNode } from "react";
import { motion } from "motion/react";

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div className="container-x relative">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="h-px w-6 bg-primary" aria-hidden />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl text-[2.3rem] font-bold leading-[1.05] sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
