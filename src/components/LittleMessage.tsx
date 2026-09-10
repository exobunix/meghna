"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Send } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { sounds } from "@/utils/sound";
import confetti from "canvas-confetti";

const LOVE_WHISPERS = [
  "You make ordinary moments feel like fairy tales, Meghna. ✨",
  "Every time I think of you, a little smile just appears on my face. 🌸",
  "If I had a flower for every time you crossed my mind, I'd walk in a garden forever. 🌹",
  "Your laughter is my favorite sound in this entire universe. 💖",
  "Thank you for being the sweetest part of my life. 🥰",
];

export default function LittleMessage() {
  const { badge, heading, body, signature } = SITE_CONFIG.LOVE_MESSAGE;
  const [whisperIdx, setWhisperIdx] = useState(0);
  const [heartBurst, setHeartBurst] = useState(false);

  const handleHeartClick = () => {
    sounds.playHeartChime();
    setHeartBurst(true);
    setWhisperIdx((prev) => (prev + 1) % LOVE_WHISPERS.length);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#FF4D6D", "#FF758F", "#FFB3C1", "#FFD166"],
    });

    setTimeout(() => setHeartBurst(false), 600);
  };

  return (
    <section id="message" className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background delicate decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-[#FFF0F3]/80 via-[#FDE2E4]/40 to-[#F0E6FF]/50 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Floating subtle ambient heart particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -35, -10],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
            className="absolute text-[#FF758F]/40"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + (i * 17) % 80}%`,
              fontSize: `${18 + i * 4}px`,
            }}
          >
            {i % 2 === 0 ? "🌸" : "✨"}
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F3] border border-[#FFCAD4]/60 text-[#9E3D52] text-xs font-semibold tracking-widest uppercase mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
          <span>{badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-playfair-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D0C1A] mb-8 leading-tight"
        >
          {heading}
        </motion.h2>

        {/* Romantic quote box with interactive sweet heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="glass-card rounded-3xl p-6 sm:p-10 md:p-12 relative shadow-lg border border-[#FFCAD4]/50 group"
        >
          {/* Subtle quotation mark */}
          <div className="absolute top-4 left-6 text-6xl font-serif-luxury text-[#FFCAD4]/40 select-none pointer-events-none">
            “
          </div>

          <p className="font-serif-luxury text-lg sm:text-2xl md:text-3xl text-[#4A1525] font-normal leading-relaxed md:leading-[1.7] relative z-10 italic">
            {body}
          </p>

          {/* Sweet Interactive Tappable Heart */}
          <div className="mt-8 pt-6 border-t border-[#FFCAD4]/40 flex flex-col items-center gap-3">
            <motion.button
              type="button"
              onClick={handleHeartClick}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3 rounded-full bg-[#FFF0F3] hover:bg-[#FFE5EC] border border-[#FFCAD4] shadow-md transition-all cursor-pointer group/btn"
              aria-label="Tap to reveal secret love note for Meghna"
            >
              <Heart
                className={`w-7 h-7 sm:w-8 sm:h-8 text-[#FF4D6D] fill-[#FF758F] transition-all ${
                  heartBurst ? "scale-125" : "group-hover/btn:scale-110"
                }`}
              />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D6D] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E25875]" />
              </span>
            </motion.button>

            {/* Revealed Whisper Message */}
            <AnimatePresence mode="wait">
              <motion.div
                key={whisperIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="max-w-md px-4 py-2 rounded-2xl bg-white/80 border border-[#FFCAD4]/60 shadow-xs text-center"
              >
                <p className="font-handwriting text-base sm:text-xl text-[#E25875] font-semibold">
                  “{LOVE_WHISPERS[whisperIdx]}”
                </p>
                <span className="text-[11px] text-[#8A4F60]/70 font-light block mt-0.5">
                  (Tap the heart to read another note ❤️)
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Signature */}
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="font-handwriting text-2xl md:text-3xl text-[#3D0C1A] font-semibold tracking-wide">
                {signature}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
