"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
  className?: string;
};

export default function Parallax({ children, offset = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
