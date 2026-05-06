"use client";

import { motion, type Variants } from "motion/react";

type HeroTitleProps = {
  before: string;
  italic: string;
  className?: string;
  italicClassName?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function HeroTitle({
  before,
  italic,
  className,
  italicClassName,
}: HeroTitleProps) {
  const beforeWords = before.split(" ");
  const italicWords = italic.split(" ");

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <span className="inline-block">
        {beforeWords.map((w, i) => (
          <motion.span key={`b-${i}`} variants={word} className="inline-block mr-[0.25em]">
            {w}
          </motion.span>
        ))}
      </span>
      <motion.span variants={word} className={italicClassName ?? "italic block mt-2"}>
        {italicWords.map((w, i) => (
          <motion.span key={`i-${i}`} variants={word} className="inline-block mr-[0.25em]">
            {w}
          </motion.span>
        ))}
      </motion.span>
    </motion.h1>
  );
}
