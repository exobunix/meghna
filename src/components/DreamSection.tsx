"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Star, Heart, X } from "lucide-react";
import { SITE_CONFIG, StarWish } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function DreamSection() {
  const wishes = SITE_CONFIG.STAR_WISHES;
  const [activeWish, setActiveWish] = useState<StarWish | null>(null);

  const handleStarClick = (star: StarWish) => {
    sounds.playStarTwinkle();
    setActiveWish(star);
  };

  return (
    <section className="relative min-h-[700px] py-32 md:py-44 px-4 bg-[#0F0511] text-white overflow-hidden select-none">
      {/* Deep Space Gradients & Nebulae */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2D0B24] via-[#140616] to-[#080209] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#E25875]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#9D4EDD]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Crescent Moon */}
      <div className="absolute top-12 right-12 md:top-20 md:right-28 pointer-events-none">
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-[#FFF7D6] to-[#FFE082] shadow-[0_0_50px_rgba(255,230,150,0.6)]">
          {/* Shadow mask to create crescent */}
          <div className="absolute -top-1 -right-1 w-18 h-18 md:w-24 md:h-24 rounded-full bg-[#1A071C]" />
        </div>
      </div>

      {/* Shooting Stars Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-1/4 w-36 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-45 animate-pulse opacity-70" />
        <div className="absolute top-1/2 right-1/3 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FFD1DC] to-transparent -rotate-45 animate-pulse opacity-60 delay-700" />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFCAD4] text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#FFD166]" />
          <span>Under The Starlit Sky</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair-luxury text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight"
        >
          Here's to all the moments
          <span className="block italic text-[#FF8DA1] font-serif-luxury mt-2">
            still waiting for us.
          </span>
        </motion.h2>

        <p className="mt-4 text-sm md:text-base text-[#FFCAD4]/80 font-light max-w-md mx-auto">
          The sky is filled with whispers. Click the glowing stars to reveal secret romantic wishes made for Meghna.
        </p>
      </div>

      {/* Interactive Constellation Field */}
      <div className="relative max-w-5xl h-[420px] md:h-[480px] mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xs">
        {wishes.map((star) => (
          <div
            key={star.id}
            onClick={() => handleStarClick(star)}
            className="absolute cursor-pointer group -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            data-cursor="button"
          >
            {/* Glowing Pulse Halo */}
            <div
              className="absolute -inset-3 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 blur-md pointer-events-none"
              style={{ backgroundColor: star.glowColor }}
            />

            {/* Twinkling Star Icon */}
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                duration: 2 + (star.x % 3),
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 text-white flex items-center justify-center"
            >
              <Star
                className="fill-white transition-transform group-hover:scale-125"
                style={{
                  width: `${star.size * 4}px`,
                  height: `${star.size * 4}px`,
                  color: star.glowColor,
                }}
              />
            </motion.div>

            {/* Quick Preview Tooltip */}
            <span className="hidden md:group-hover:block absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-black/80 text-[#FFD1DC] text-xs border border-white/20 z-20 pointer-events-none">
              Click wish ✨
            </span>
          </div>
        ))}
      </div>

      {/* Secret Star Wish Popup */}
      <AnimatePresence>
        {activeWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveWish(null)}
            className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-dark text-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-white/25 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setActiveWish(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-[#FFCAD4] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-2xl mb-4 border border-white/30"
                style={{ backgroundColor: `${activeWish.glowColor}25` }}
              >
                🌟
              </div>

              <span className="text-xs uppercase tracking-widest text-[#FF8DA1] font-semibold">
                Whispered Under The Sky
              </span>

              <h4 className="font-playfair-luxury text-2xl sm:text-3xl font-bold mt-2 mb-4">
                A Wish For Meghna
              </h4>

              <p className="font-serif-luxury text-xl sm:text-2xl text-[#FFE5EC] leading-relaxed italic mb-6">
                “{activeWish.wish}”
              </p>

              <button
                onClick={() => setActiveWish(null)}
                className="px-6 py-2 rounded-full bg-[#FF758F] hover:bg-[#E25875] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                Keep in my heart ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
