"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const QUESTIONS = [
  {
    question: "Comment tu te sens en ce moment?",
    options: ["Épuisée", "Stressée", "Déséquilibrée", "Perdue"],
    scores: { reiki: [2, 2, 1, 1], hormonal: [1, 1, 2, 2] },
  },
  {
    question: "Qu'est-ce qui t'attire le plus?",
    options: ["Énergie & chakras", "Cycles féminins & hormones", "Les deux", "Je ne sais pas"],
    scores: { reiki: [3, 0, 1, 1], hormonal: [0, 3, 1, 1] },
  },
  {
    question: "Tu préfères travailler sur...",
    options: ["Corps & énergie", "Cycles & hormones", "Mental & émotions", "Tout à la fois"],
    scores: { reiki: [3, 0, 2, 1], hormonal: [0, 3, 1, 1] },
  },
  {
    question: "Ce dont tu as le plus besoin...",
    options: ["Paix intérieure", "Clarté hormonale", "Recentrage", "Apaisement profond"],
    scores: { reiki: [2, 0, 1, 2], hormonal: [0, 3, 1, 0] },
  },
];

const RESULTS = {
  reiki: {
    title: "Soin Reiki",
    description:
      "Basé sur tes ressentis, un soin Reiki serait idéal pour toi. Il t'aidera à libérer les blocages énergétiques et retrouver une paix intérieure profonde.",
    href: "/reiki",
    color: "text-primary",
    bg: "bg-primary-fixed/30",
    cta: "bg-primary text-on-primary",
    glow: "rgba(21, 51, 40, 0.35)",
  },
  hormonal: {
    title: "Soin Hormonal",
    description:
      "Basé sur tes ressentis, un accompagnement sur tes cycles pourrait être transformateur pour toi. Retrouve l'harmonie hormonale et ton énergie naturelle.",
    href: "/soin-hormonal",
    color: "text-secondary",
    bg: "bg-secondary-fixed/30",
    cta: "bg-secondary text-on-secondary",
    glow: "rgba(135, 79, 72, 0.35)",
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function QuizInteractif() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ reiki: 0, hormonal: 0 });
  const [done, setDone] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const q = QUESTIONS[step];
    const newScores = {
      reiki: scores.reiki + q.scores.reiki[optionIndex],
      hormonal: scores.hormonal + q.scores.hormonal[optionIndex],
    };
    setScores(newScores);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setScores({ reiki: 0, hormonal: 0 });
    setDone(false);
  };

  const result = scores.reiki >= scores.hormonal ? RESULTS.reiki : RESULTS.hormonal;

  return (
    <div className="bg-surface-container-high p-8 md:p-16 rounded-[3rem] relative overflow-hidden text-left min-h-[420px]">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex justify-center gap-3 mb-10">
              {QUESTIONS.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 rounded-full"
                  animate={{
                    width: i === step ? 32 : 12,
                    backgroundColor:
                      i === step
                        ? "var(--color-primary)"
                        : i < step
                        ? "color-mix(in srgb, var(--color-primary) 40%, transparent)"
                        : "var(--color-outline-variant)",
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              ))}
            </div>

            <div className="space-y-8">
              <motion.h4
                key={`title-${step}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                className="font-serif text-2xl md:text-3xl text-primary text-center"
              >
                {QUESTIONS[step].question}
              </motion.h4>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                }}
              >
                {QUESTIONS[step].options.map((option, i) => (
                  <motion.button
                    key={option}
                    onClick={() => handleAnswer(i)}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.96 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed px-6 py-4 rounded-full font-medium text-center"
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-center text-center gap-6 relative"
          >
            <motion.div
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: result.glow }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              className={`text-xs uppercase tracking-widest font-bold ${result.color}`}
            >
              ✦ Recommandation personnalisée ✦
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className={`relative inline-block px-8 py-4 rounded-full ${result.bg}`}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 0 0 ${result.glow}` }}
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${result.glow}`,
                    `0 0 0 18px transparent`,
                    `0 0 0 0 ${result.glow}`,
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
              />
              <h5 className={`font-serif text-3xl md:text-4xl ${result.color} relative z-10`}>
                {result.title}
              </h5>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
              className="text-on-surface-variant max-w-md leading-relaxed"
            >
              {result.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <Link
                href={`${result.href}#rendez-vous`}
                className={`${result.cta} px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform`}
              >
                Réserver ce soin →
              </Link>
              <button
                onClick={reset}
                className="text-on-surface-variant text-sm underline underline-offset-4 hover:text-on-surface transition-colors"
              >
                Recommencer le quiz
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
