"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Smile, Eye, Music, Sparkle, Sparkles, Heart, X } from "lucide-react";
import { SITE_CONFIG, LoveCardItem } from "@/data/config";
import { sounds } from "@/utils/sound";

const iconMap: Record<string, React.ElementType> = {
  Smile,
  Eye,
  Music,
  Sparkle,
  Sparkles,
  Heart,
};

export default function LoveCards() {
  const cards = SITE_CONFIG.LOVE_CARDS;
  const [selectedCard, setSelectedCard] = useState<LoveCardItem | null>(null);

  const handleCardClick = (card: LoveCardItem) => {
    sounds.playHeartChime();
    setSelectedCard(card);
  };

  return (
    <section id="little-things" className="relative py-28 md:py-36 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFF0F3] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2"
        >
          Cherished Details
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A] leading-tight"
        >
          Little things about Meghna
          <span className="block italic text-[#FF758F] font-serif-luxury">
            that make everything better.
          </span>
        </motion.h2>
        <p className="mt-3 text-sm md:text-base text-[#8A4F60] font-light">
          Click any card to read a deeper little note from my heart.
        </p>
      </div>

      {/* Grid of 6 Floating Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, idx) => {
          const Icon = iconMap[card.icon] || Heart;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleCardClick(card)}
              className="glass-card rounded-3xl p-6 md:p-7 flex flex-col justify-between border border-[#FFCAD4]/50 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
              data-cursor="button"
            >
              {/* Subtle gradient hover wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F3]/0 via-[#FFE3E8]/30 to-[#FFD1DC]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Photo Thumbnail of Meghna */}
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#FFCAD4] shadow-sm flex-shrink-0 bg-[#FFF0F3]">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                      sizes="60px"
                    />
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300 relative z-10"
                      sizes="60px"
                    />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E3D52] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#FFCAD4]/40">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-playfair-luxury text-2xl font-bold text-[#3D0C1A] mb-2 group-hover:text-[#E25875] transition-colors">
                  {card.title}
                </h3>

                <p className="font-serif-luxury italic text-base md:text-lg text-[#5A2030] leading-relaxed">
                  “{card.shortQuote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#FFCAD4]/30 flex items-center justify-between text-xs text-[#8A4F60] font-medium">
                <span>Tap to unfold</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Romantic Note Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#FFCAD4] relative text-center max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FFF0F3] text-[#4A1525] transition-colors z-10"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Meghna's Real Photo in Modal */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden mb-4 shadow-md border border-[#FFCAD4]/40 bg-[#FFF0F3]">
                <Image
                  src={selectedCard.image}
                  alt=""
                  fill
                  className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                  sizes="450px"
                />
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  fill
                  className="object-contain p-1 relative z-10"
                  sizes="(max-width: 640px) 100vw, 450px"
                />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#9E3D52] font-semibold">
                {selectedCard.tag}
              </span>
              <h3 className="font-playfair-luxury text-3xl font-bold text-[#3D0C1A] mt-1 mb-2">
                {selectedCard.title}
              </h3>

              <div className="w-12 h-0.5 bg-[#FFCAD4] mx-auto mb-4" />

              <p className="font-serif-luxury text-lg sm:text-xl text-[#4A1525] leading-relaxed italic mb-6">
                “{selectedCard.expandedMessage}”
              </p>

              <button
                onClick={() => setSelectedCard(null)}
                className="px-6 py-2 rounded-full bg-[#FFF0F3] hover:bg-[#FFE3E8] text-[#4A1525] font-medium text-xs uppercase tracking-wider transition-colors border border-[#FFCAD4]/60"
              >
                Close with love ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

