"use client";

import { motion } from "motion/react";

const LAYERS = [
  {
    count: 8,
    rx: 24,
    ry: 70,
    cy: -55,
    fill: "url(#petalBack)",
    opacity: 0.55,
    delay: 0.1,
    angleOffset: 0,
  },
  {
    count: 8,
    rx: 20,
    ry: 55,
    cy: -42,
    fill: "url(#petalMid)",
    opacity: 0.85,
    delay: 0.45,
    angleOffset: 22.5,
  },
  {
    count: 6,
    rx: 14,
    ry: 38,
    cy: -28,
    fill: "url(#petalFront)",
    opacity: 0.95,
    delay: 0.85,
    angleOffset: 30,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BloomingFlower({
  size = 460,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="-140 -140 280 280"
        className="w-full h-full overflow-visible"
        initial={{ rotate: -12 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 2, ease: EASE }}
      >
        <defs>
          <radialGradient id="petalBack" cx="50%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#1f4a3a" />
            <stop offset="100%" stopColor="#0a1d16" />
          </radialGradient>
          <radialGradient id="petalMid" cx="50%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#d99c93" />
            <stop offset="100%" stopColor="#874f48" />
          </radialGradient>
          <radialGradient id="petalFront" cx="50%" cy="75%" r="80%">
            <stop offset="0%" stopColor="#fdf9f4" />
            <stop offset="100%" stopColor="#eec068" />
          </radialGradient>
          <radialGradient id="centerGold" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff5d6" />
            <stop offset="60%" stopColor="#eec068" />
            <stop offset="100%" stopColor="#a47b2e" />
          </radialGradient>
          <filter id="petalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {LAYERS.map((layer, layerIdx) => {
          const petals = Array.from({ length: layer.count }, (_, i) => i);
          return (
            <g key={layerIdx}>
              {petals.map((i) => {
                const angle = (i * 360) / layer.count + layer.angleOffset;
                return (
                  <motion.ellipse
                    key={i}
                    cx="0"
                    cy={layer.cy}
                    rx={layer.rx}
                    ry={layer.ry}
                    fill={layer.fill}
                    opacity={layer.opacity}
                    filter="url(#petalGlow)"
                    initial={{ scale: 0, rotate: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.05, 1],
                      rotate: angle,
                      opacity: layer.opacity,
                    }}
                    transition={{
                      delay: layer.delay + i * 0.08,
                      duration: 1.4,
                      ease: EASE,
                    }}
                    style={{
                      transformOrigin: "0px 0px",
                      transformBox: "view-box",
                    }}
                  />
                );
              })}
            </g>
          );
        })}

        <motion.circle
          cx="0"
          cy="0"
          r="22"
          fill="url(#centerGold)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.25, 1] }}
          transition={{ delay: 1.6, duration: 1, ease: EASE }}
        />

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const x = Math.cos(a) * 14;
            const y = Math.sin(a) * 14;
            return (
              <circle key={i} cx={x} cy={y} r="1.2" fill="#874f48" opacity="0.7" />
            );
          })}
        </motion.g>

        <motion.circle
          cx="0"
          cy="0"
          r="22"
          fill="transparent"
          stroke="#fff5d6"
          strokeWidth="0.5"
          opacity="0.4"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 1.6, 1], opacity: [0, 0.4, 0] }}
          transition={{
            delay: 2.6,
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
