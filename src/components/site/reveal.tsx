import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <span className="eyebrow">
        <span className="h-px w-6 bg-primary" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.9rem]">{title}</h2>
      {body ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "left" && "max-w-2xl",
          )}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
