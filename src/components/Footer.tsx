"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const { title, tagline } = SITE_CONFIG.FOOTER;
  const secret = SITE_CONFIG.SECRET_MESSAGE;

  const handleHeartClick = () => {
    sounds.playHeartChime();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setShowSecret(true);
      setClickCount(0);
    }
  };

  return (
    <footer className="relative py-16 px-4 bg-[#140612] text-white border-t border-white/10 text-center overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#E25875]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10 space-y-4">
        {/* Clickable tiny heart for easter egg */}
        <div className="inline-block relative">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleHeartClick}
            className="text-2xl cursor-pointer select-none filter drop-shadow-[0_0_10px_rgba(255,117,143,0.8)]"
            title={clickCount > 0 ? `${5 - clickCount} more taps...` : "Secret..."}
            aria-label="Secret heart"
          >
            ❤️
          </motion.button>
          {clickCount > 0 && clickCount < 5 && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#FFCAD4] font-mono whitespace-nowrap bg-black/70 px-2 py-0.5 rounded-full border border-white/10">
              {clickCount}/5
            </span>
          )}
        </div>

        <h3 className="font-playfair-luxury text-xl sm:text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="font-serif-luxury italic text-sm md:text-base text-[#FFCAD4]/75 font-normal">
          “{tagline}”
        </p>

        <p className="text-[11px] text-white/40 tracking-wider font-light pt-4 uppercase">
          Crafted with care & endless admiration • {new Date().getFullYear()}
        </p>
      </div>

      {/* Secret 5-Click Easter Egg Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecret(false)}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-dark text-white rounded-3xl p-8 sm:p-10 max-w-sm w-full border border-[#FF8DA1]/50 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowSecret(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#FF758F]/20 border border-[#FF758F]/40 mx-auto flex items-center justify-center text-3xl mb-4 animate-bounce">
                🥰
              </div>

              <span className="text-xs uppercase tracking-widest text-[#FF8DA1] font-semibold">
                Secret Treasure Unlocked
              </span>

              <h4 className="font-playfair-luxury text-2xl sm:text-3xl font-bold mt-2 mb-3">
                {secret.heading}
              </h4>

              <p className="font-serif-luxury text-xl text-[#FFE5EC] leading-relaxed italic mb-3">
                “{secret.body}”
              </p>

              <p className="text-xs text-white/70 font-light mb-6">
                {secret.extra}
              </p>

              <button
                onClick={() => setShowSecret(false)}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF758F] to-[#E25875] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
              >
                Got me smiling ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
