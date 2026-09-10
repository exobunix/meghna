"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Star } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);
  const { preText, buttonText, revealedTitle, subheading, body, finalQuote, portrait } =
    SITE_CONFIG.FINAL_SURPRISE;

  const handleSurpriseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRevealed(true);
    sounds.playHeartChime();

    // Multi-angle festive explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#FF758F", "#FFB3C1", "#FFD166", "#C77DFF", "#FFFFFF", "#FF4D6D"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section
      id="surprise"
      className="relative min-h-screen py-32 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#140510] via-[#0A0208] to-[#000000] text-white overflow-hidden text-center select-none"
    >
      {/* Ambient background glow when revealed */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[700px] h-[700px] bg-gradient-to-tr from-[#E25875]/25 via-[#FF758F]/30 to-[#9D4EDD]/20 rounded-full blur-[150px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto z-10 px-4">
        {!revealed ? (
          /* Initial Teaser State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="font-handwriting text-2xl md:text-3xl text-[#FFCAD4] font-medium">
              {preText}
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSurpriseClick}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF758F] via-[#E25875] to-[#C77DFF] text-white font-serif-luxury text-xl md:text-2xl font-bold shadow-[0_0_35px_rgba(255,117,143,0.6)] hover:shadow-[0_0_55px_rgba(255,117,143,0.9)] transition-all cursor-pointer border border-white/30"
              data-cursor="button"
            >
              {buttonText}
            </motion.button>
          </motion.div>
        ) : (
          /* Grand Revealed Celebration State */
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Glowing Heart Locket with Meghna's Real Photo */}
            <div className="relative inline-block mx-auto">
              <div className="absolute -inset-3 rounded-full bg-[#FF758F]/40 blur-xl animate-pulse pointer-events-none" />
              <div className="relative w-36 h-44 sm:w-48 sm:h-56 rounded-3xl overflow-hidden border-4 border-[#FFCAD4] shadow-[0_0_30px_rgba(255,117,143,0.8)] bg-black/40">
                <Image
                  src={portrait || "/images/meghna/Image-724.jpg"}
                  alt=""
                  fill
                  className="object-cover blur-xs opacity-30 scale-110 pointer-events-none"
                  sizes="200px"
                />
                <Image
                  src={portrait || "/images/meghna/Image-724.jpg"}
                  alt="Meghna portrait"
                  fill
                  className="object-contain p-1 relative z-10"
                  sizes="200px"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 text-3xl animate-bounce">
                💖
              </div>
            </div>

            {/* Title */}
            <h2 className="font-playfair-luxury text-5xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-[#FFE5EC] to-[#FFCAD4] bg-clip-text text-transparent">
              {revealedTitle}
            </h2>

            {/* Subheading */}
            <p className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#FFB3C1] font-medium leading-relaxed italic">
              {subheading}
            </p>

            {/* Body */}
            <p className="font-sans text-base sm:text-lg text-white/80 font-light max-w-xl mx-auto leading-relaxed">
              {body}
            </p>

            {/* Final Emotional Message */}
            <div className="pt-8 border-t border-white/15 max-w-xl mx-auto">
              <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#FF8DA1] font-bold leading-snug whitespace-pre-line">
                {finalQuote}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
