"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Feather, ChevronLeft, ChevronRight, Copy, Check, Heart, Sparkles, BookOpen } from "lucide-react";
import { SITE_CONFIG, ShayariItem } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function ShayariSection() {
  const { badge, title, subtitle, shayaris } = SITE_CONFIG.SHAYARI_SECTION;
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentShayari = shayaris[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + shayaris.length) % shayaris.length);
    sounds.playHeartChime();
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % shayaris.length);
    sounds.playHeartChime();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentShayari.hindi);
    setCopied(true);
    sounds.playHeartChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="shayari" className="relative py-28 md:py-40 px-4 bg-gradient-to-b from-[#FFFDFB] via-[#FFF3F5] to-[#FAF5F0] overflow-hidden">
      {/* Background Soft Glows & Petal Elements */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#FFCAD4]/35 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#FFE5D9]/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F3] border border-[#FFCAD4]/70 text-[#9E3D52] text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm"
        >
          <Feather className="w-3.5 h-3.5 text-[#E25875]" />
          <span>{badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]"
        >
          {title} <span className="text-[#FF758F] font-serif-luxury italic">✍️</span>
        </motion.h2>

        <p className="mt-3 text-sm md:text-base text-[#8A4F60] font-light max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Main Interactive Shayari Showcase Card */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-card rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-[#FFCAD4]/70 shadow-2xl relative overflow-hidden bg-white/80">
          {/* Subtle Decorative Parchment Texture */}
          <div className="absolute top-6 right-8 text-[#FFCAD4]/30 pointer-events-none">
            <Feather className="w-24 h-24 stroke-[1]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentShayari.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center"
            >
              {/* Photo of Meghna */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-56 sm:w-64 aspect-[4/5] rounded-3xl overflow-hidden border-4 border-[#FFCAD4] shadow-xl bg-[#FFF0F3] -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src={currentShayari.photo}
                    alt=""
                    fill
                    className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                    sizes="260px"
                  />
                  <Image
                    src={currentShayari.photo}
                    alt="Meghna in shayari"
                    fill
                    className="object-contain p-1 relative z-10"
                    sizes="260px"
                    priority
                  />
                  {/* Floating mood pill */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#3D0C1A] text-xs font-semibold shadow-md whitespace-nowrap border border-[#FFCAD4]/60 z-20">
                    {currentShayari.mood}
                  </div>
                </div>
              </div>

              {/* Shayari Text */}
              <div className="md:col-span-7 text-center md:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] text-xs font-medium text-[#E25875]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sher #{activeIdx + 1} of {shayaris.length}</span>
                </div>

                {/* Hindi Shayari Verse */}
                <div className="relative">
                  <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#3D0C1A] font-semibold leading-[1.8] tracking-wide whitespace-pre-line drop-shadow-xs">
                    “{currentShayari.hindi}”
                  </p>
                </div>

                {/* English Poetic Translation */}
                <p className="font-serif-luxury text-sm sm:text-base md:text-lg text-[#8A4F60] font-normal italic leading-relaxed pt-2 border-t border-[#FFCAD4]/40">
                  — {currentShayari.translation}
                </p>

                {/* Action Buttons: Copy & Navigation */}
                <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-full bg-[#FFF0F3] hover:bg-[#FFE3E8] text-[#4A1525] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-[#FFCAD4]/60 transition-colors shadow-xs"
                    aria-label="Copy shayari text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied with love ❤️</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E25875]" />
                        <span>Copy Shayari</span>
                      </>
                    )}
                  </button>

                  <span className="font-handwriting text-xl text-[#E25875]">
                    For Meghna, always ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-[#FFCAD4]/40 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-full glass-card hover:bg-white text-[#4A1525] text-xs font-medium flex items-center gap-1.5 transition-colors border border-[#FFCAD4]/60"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {shayaris.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIdx(i);
                    sounds.playHeartChime();
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeIdx
                      ? "w-7 bg-[#E25875]"
                      : "bg-[#FFCAD4] hover:bg-[#FF8DA1]"
                  }`}
                  aria-label={`Go to shayari ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-full glass-card hover:bg-white text-[#4A1525] text-xs font-medium flex items-center gap-1.5 transition-colors border border-[#FFCAD4]/60"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
