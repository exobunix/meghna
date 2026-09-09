"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [stage, setStage] = useState<"pulsing" | "expanding" | "finished">("pulsing");

  useEffect(() => {
    // Pulse for 2.2 seconds, then expand
    const timer1 = setTimeout(() => {
      setStage("expanding");
    }, 2200);

    // Expand for 0.8 seconds, then finish
    const timer2 = setTimeout(() => {
      setStage("finished");
      if (onFinish) onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  if (stage === "finished") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "expanding" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF0F3] via-[#FFF7F9] to-[#FDFBF7] select-none"
      >
        {/* Soft background ambient glow */}
        <div className="absolute w-96 h-96 rounded-full bg-[#FF8DA1]/15 blur-3xl pointer-events-none" />

        {/* Pulsing and expanding heart */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={
              stage === "pulsing"
                ? {
                    scale: [1, 1.25, 1],
                    opacity: [0.8, 1, 0.8],
                  }
                : {
                    scale: [1, 35],
                    opacity: [1, 0],
                  }
            }
            transition={
              stage === "pulsing"
                ? {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.8,
                    ease: "easeInOut",
                  }
            }
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF758F] to-[#FFB3C1] flex items-center justify-center shadow-[0_0_40px_rgba(255,117,143,0.7)]"
          >
            <span className="text-2xl text-white">❤️</span>
          </motion.div>

          {/* Gentle pulse rings */}
          {stage === "pulsing" && (
            <motion.div
              animate={{
                scale: [1, 2.2],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute w-14 h-14 rounded-full border border-[#FF8DA1]/40 pointer-events-none"
            />
          )}
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: stage === "pulsing" ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-center px-4"
        >
          <p className="font-handwriting text-2xl md:text-3xl text-[#4A1525] font-semibold tracking-wide">
            Creating something special for Meghna…
          </p>
          <p className="text-xs text-[#8A4F60] mt-2 font-light tracking-widest uppercase">
            A little corner of the internet
          </p>
        </motion.div>

        {/* Tiny floating decorative dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#FF758F]/40"
              style={{
                left: `${15 + (i * 7) % 70}%`,
                top: `${20 + (i * 9) % 60}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
