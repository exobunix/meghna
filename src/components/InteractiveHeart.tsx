"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function InteractiveHeart() {
  const [clickCount, setClickCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const steps = SITE_CONFIG.INTERACTIVE_HEART.steps;

  const currentStep = steps[Math.min(clickCount, steps.length - 1)];

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsBouncing(true);
    setClickCount((prev) => prev + 1);
    sounds.playHeartChime();

    // Trigger lovely confetti burst from button center
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 80,
      origin: { x, y },
      colors: ["#FF758F", "#FFB3C1", "#FFD166", "#C77DFF", "#FFFFFF", "#FF4D6D"],
      shapes: ["circle"],
      scalar: 1.15,
    });

    setTimeout(() => setIsBouncing(false), 300);
  };

  return (
    <section className="relative py-28 md:py-36 px-4 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFCAD4]/40 to-[#FCEADE]/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2"
      >
        A Little Moment For You
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A] mb-4"
      >
        Tap the heart ❤️
      </motion.h2>
      <p className="text-sm md:text-base text-[#8A4F60] font-light max-w-md mx-auto mb-8">
        Every tap reveals a special photo & secret message made just for Meghna!
      </p>

      {/* Large Glowing Interactive Heart */}
      <div className="relative inline-flex items-center justify-center my-4">
        {/* Outer Glow Halo */}
        <div className="absolute w-44 h-44 rounded-full bg-[#FF758F]/25 blur-2xl pointer-events-none" />

        <motion.button
          onClick={handleHeartClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isBouncing ? { scale: [1, 1.25, 0.95, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#E25875] via-[#FF758F] to-[#FFB3C1] flex items-center justify-center text-6xl md:text-7xl shadow-[0_12px_40px_rgba(226,88,117,0.5)] border-4 border-white/60 cursor-pointer select-none transition-shadow hover:shadow-[0_16px_50px_rgba(226,88,117,0.7)]"
          aria-label="Tap the heart"
          data-cursor="button"
        >
          <span className="filter drop-shadow-md select-none">
            {clickCount >= 4 ? "💖" : "❤️"}
          </span>
        </motion.button>
      </div>

      {/* Revealed Photo & Message on Heart Tap */}
      <div className="min-h-[260px] mt-6 max-w-xl mx-auto px-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {clickCount === 0 ? (
            <motion.p
              key="zero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-[#8A4F60] italic"
            >
              (Tap the glowing heart to reveal Meghna's photos & sweet notes…)
            </motion.p>
          ) : (
            <motion.div
              key={clickCount}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Revealed Heart-Shaped Floating Photo */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#FF758F] to-[#FFB3C1] rounded-full blur-md opacity-70 animate-pulse pointer-events-none" />
                <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#FFF0F3]">
                  <Image
                    src={currentStep.photo}
                    alt=""
                    fill
                    className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                    sizes="180px"
                  />
                  <Image
                    src={currentStep.photo}
                    alt={currentStep.text}
                    fill
                    className="object-contain p-1 relative z-10"
                    sizes="180px"
                  />
                </div>
                {/* Floating love badge */}
                <div className="absolute -bottom-2 right-2 px-3 py-1 rounded-full bg-[#E25875] text-white text-xs font-semibold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentStep.word}</span>
                </div>
              </div>

              {/* Text Information */}
              <div className="space-y-1.5 text-center">
                <h3 className="font-playfair-luxury text-2xl md:text-3xl font-bold text-[#3D0C1A]">
                  {currentStep.text}
                </h3>
                <p className="font-serif-luxury italic text-base md:text-xl text-[#5A2030] leading-relaxed max-w-md">
                  “{currentStep.subtext}”
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
