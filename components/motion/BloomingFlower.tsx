"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const LAYERS = [
  {
    count: 8,
    width: 110,
    height: 230,
    distance: 0,
    color: "linear-gradient(180deg, #1f4a3a 0%, #0a1d16 100%)",
    finalRotateX: -10,
    delay: 0.1,
    angleOffset: 0,
    z: -10,
  },
  {
    count: 8,
    width: 90,
    height: 180,
    distance: 0,
    color:
      "radial-gradient(ellipse at 50% 90%, #d99c93 0%, #b56b5f 55%, #874f48 100%)",
    finalRotateX: -25,
    delay: 0.45,
    angleOffset: 22.5,
    z: 5,
  },
  {
    count: 6,
    width: 70,
    height: 130,
    distance: 0,
    color:
      "radial-gradient(ellipse at 50% 90%, #fff5d6 0%, #fdf9f4 40%, #eec068 100%)",
    finalRotateX: -45,
    delay: 0.85,
    angleOffset: 30,
    z: 20,
  },
];

export default function BloomingFlower({
  size = 460,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        perspective: "1200px",
        perspectiveOrigin: "50% 60%",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateX: 60, rotateY: -10 }}
        animate={{ rotateX: 30, rotateY: [0, 8, -8, 0] }}
        transition={{
          rotateX: { duration: 2.5, ease: EASE },
          rotateY: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          },
        }}
      >
        {/* Pétales */}
        {LAYERS.map((layer, layerIdx) => {
          const petals = Array.from({ length: layer.count }, (_, i) => i);
          return petals.map((i) => {
            const angle = (i * 360) / layer.count + layer.angleOffset;
            return (
              <motion.div
                key={`${layerIdx}-${i}`}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: layer.width,
                  height: layer.height,
                  marginLeft: -layer.width / 2,
                  marginTop: -layer.height,
                  borderRadius:
                    "50% 50% 50% 50% / 90% 90% 10% 10%",
                  background: layer.color,
                  boxShadow:
                    "inset 0 -20px 30px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.12)",
                  transformOrigin: "50% 100%",
                  transformStyle: "preserve-3d",
                  filter: "blur(0.4px)",
                }}
                initial={{
                  rotateZ: angle,
                  rotateX: 90,
                  scale: 0.3,
                  opacity: 0,
                  z: layer.z,
                }}
                animate={{
                  rotateZ: angle,
                  rotateX: layer.finalRotateX,
                  scale: 1,
                  opacity: 1,
                  z: layer.z,
                }}
                transition={{
                  delay: layer.delay + i * 0.08,
                  duration: 1.6,
                  ease: EASE,
                }}
              />
            );
          });
        })}

        {/* Centre doré */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: 70,
            height: 70,
            marginLeft: -35,
            marginTop: -35,
            background:
              "radial-gradient(circle at 35% 30%, #fff5d6 0%, #eec068 50%, #a47b2e 100%)",
            boxShadow:
              "inset -8px -8px 16px rgba(140,90,30,0.5), inset 4px 4px 8px rgba(255,255,255,0.6), 0 4px 12px rgba(164,123,46,0.4)",
            transform: "translateZ(35px)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1.7, duration: 1, ease: EASE }}
        >
          {/* Pollen dots */}
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i * Math.PI * 2) / 14;
            const r = 18 + (i % 3) * 4;
            const x = Math.cos(a) * r + 35;
            const y = Math.sin(a) * r + 35;
            return (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: x - 2,
                  top: y - 2,
                  width: 4,
                  height: 4,
                  background: "#874f48",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + i * 0.04, duration: 0.4 }}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
