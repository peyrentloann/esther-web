"use client";

import { useState } from "react";
import Link from "next/link";

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
  },
  hormonal: {
    title: "Soin Hormonal",
    description:
      "Basé sur tes ressentis, un accompagnement sur tes cycles pourrait être transformateur pour toi. Retrouve l'harmonie hormonale et ton énergie naturelle.",
    href: "/soin-hormonal",
    color: "text-secondary",
    bg: "bg-secondary-fixed/30",
    cta: "bg-secondary text-on-secondary",
  },
};

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
    <div className="bg-surface-container-high p-8 md:p-16 rounded-[3rem] relative overflow-hidden text-left">
      {!done ? (
        <>
          {/* Progress dots */}
          <div className="flex justify-center gap-3 mb-10">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-400 ${
                  i === step ? "bg-primary scale-125" : i < step ? "bg-primary/40" : "bg-outline-variant"
                }`}
              />
            ))}
          </div>

          <div className="space-y-8">
            <h4 className="font-serif text-2xl md:text-3xl text-primary text-center">
              {QUESTIONS[step].question}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {QUESTIONS[step].options.map((option, i) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(i)}
                  className="bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed px-6 py-4 rounded-full font-medium transition-all duration-400 hover:scale-105 active:scale-95 text-center"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-result flex flex-col items-center text-center gap-6">
          <div className={`text-xs uppercase tracking-widest font-bold ${result.color} mb-1`}>
            Recommandation personnalisée
          </div>
          <div className={`quiz-pill inline-block px-6 py-3 rounded-full ${result.bg} ${result.color}`}>
            <h5 className={`font-serif text-2xl md:text-3xl ${result.color} relative z-10`}>{result.title}</h5>
          </div>
          <p className="text-on-surface-variant max-w-sm leading-relaxed">{result.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
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
          </div>
        </div>
      )}
    </div>
  );
}
