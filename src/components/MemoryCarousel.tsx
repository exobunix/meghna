"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import { SITE_CONFIG, MemoryItem } from "@/data/config";
import MemoryLightbox from "./MemoryLightbox";

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Memories (35)", value: "all" },
  { label: "Smiles 🌸", value: "smiles" },
  { label: "Favorites ✨", value: "favorites" },
  { label: "Special Moments 💖", value: "moments" },
  { label: "Quiet Places ☕", value: "places" },
];

export default function MemoryCarousel() {
  const allMemories = SITE_CONFIG.MEMORIES;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filteredMemories =
    selectedCategory === "all"
      ? allMemories
      : allMemories.filter((m) => m.category === selectedCategory);

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + filteredMemories.length) % filteredMemories.length);
    }
  };

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % filteredMemories.length);
    }
  };

  const scrollHoriz = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="memories" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FFE5EC]/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2"
        >
          Cherished Photographs
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]"
        >
          Little moments.{" "}
          <span className="italic text-[#FF758F] font-serif-luxury block sm:inline">
            Big memories. ❤️
          </span>
        </motion.h2>
        <p className="mt-3 text-sm md:text-base text-[#8A4F60] font-light max-w-lg mx-auto">
          Swipe or drag across to flip through all 35 snapshots of Meghna. Tap any polaroid to view full size.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#E25875] text-white shadow-md scale-105"
                  : "bg-white/80 hover:bg-white text-[#5A2030] border border-[#FFCAD4]/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="max-w-6xl mx-auto flex items-center justify-end gap-3 mb-6 px-4">
        <button
          onClick={() => scrollHoriz("left")}
          className="p-3 rounded-full bg-white/90 hover:bg-white border border-[#FFCAD4] text-[#4A1525] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollHoriz("right")}
          className="p-3 rounded-full bg-white/90 hover:bg-white border border-[#FFCAD4] text-[#4A1525] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="flex items-center gap-5 sm:gap-8 overflow-x-auto py-6 px-4 sm:px-8 snap-x snap-mandatory no-scrollbar"
      >
        {filteredMemories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (idx % 5) * 0.08 }}
            onClick={() => setActiveIdx(idx)}
            className="flex-shrink-0 snap-center select-none"
            style={{ transform: `rotate(${item.rotation || 0}deg)` }}
          >
            {/* Polaroid Frame */}
            <div
              className="group relative bg-white p-3 sm:p-4 pb-5 sm:pb-7 rounded-2xl sm:rounded-3xl polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 hover:scale-105 hover:rotate-0 w-[240px] xs:w-[270px] sm:w-[310px] border border-[#F3E8EE] cursor-pointer"
              data-cursor="image"
            >
              {/* Cute Washi Tape on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-[#FFCAD4]/60 backdrop-blur-xs border border-[#FFCAD4] rounded-xs -rotate-2 shadow-xs pointer-events-none" />

              {/* Unclipped Image Box */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FFF0F3] mb-3 sm:mb-4">
                {/* Soft ambient background so frame is filled softly */}
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                  sizes="320px"
                />
                {/* Full uncropped image */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-500 relative z-10"
                  sizes="(max-width: 640px) 270px, 320px"
                />
                <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#4A1525] text-xs font-semibold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> View Memory
                  </span>
                </div>
              </div>

              {/* Caption & Date */}
              <div className="text-center px-1 sm:px-2">
                <p className="font-handwriting text-lg sm:text-xl text-[#3D0C1A] font-semibold truncate leading-tight">
                  {item.caption}
                </p>
                <span className="text-[10px] sm:text-[11px] text-[#8A4F60] font-medium tracking-wider uppercase block mt-0.5">
                  {item.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <MemoryLightbox
        item={activeIdx !== null ? filteredMemories[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
