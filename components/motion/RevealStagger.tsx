"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode, Children } from "react";

type RevealStaggerProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  className?: string;
};

export default function RevealStagger({
  children,
  delay = 0,
  stagger = 0.12,
  y = 32,
  className,
}: RevealStaggerProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
