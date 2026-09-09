"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { SITE_CONFIG, MemoryItem } from "@/data/config";
import MemoryLightbox from "./MemoryLightbox";

export default function MemoryCarousel() {
  const memories = SITE_CONFIG.MEMORIES;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + memories.length) % memories.length);
    }
  };

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % memories.length);
    }
  };

  const scrollHoriz = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="memories" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FFE5EC]/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
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
          Swipe or drag across to flip through our favorite snapshots. Click any polaroid to open full screen.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto flex items-center justify-end gap-3 mb-4 px-4">
        <button
          onClick={() => scrollHoriz("left")}
          className="p-2.5 rounded-full glass-card hover:bg-white text-[#4A1525] border border-[#FFCAD4]/60 transition-colors shadow-sm"
          aria-label="Scroll carousel left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollHoriz("right")}
          className="p-2.5 rounded-full glass-card hover:bg-white text-[#4A1525] border border-[#FFCAD4]/60 transition-colors shadow-sm"
          aria-label="Scroll carousel right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Draggable / Scrollable Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 md:gap-8 overflow-x-auto pb-10 pt-4 px-6 md:px-12 scrollbar-none no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {memories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => setActiveIdx(idx)}
            className="flex-shrink-0 snap-center select-none"
            style={{ transform: `rotate(${item.rotation || 0}deg)` }}
          >
            {/* Polaroid Frame */}
            <div
              className="group relative bg-white p-4 pb-7 rounded-3xl polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 hover:scale-105 hover:rotate-0 w-[280px] sm:w-[320px] border border-[#F3E8EE] cursor-pointer"
              data-cursor="image"
            >
              {/* Cute Washi Tape on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#FFCAD4]/60 backdrop-blur-xs border border-[#FFCAD4] rounded-sm -rotate-2 shadow-xs pointer-events-none" />

              {/* Image Box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF0F3] mb-4">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 280px, 320px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#4A1525] text-xs font-semibold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> View Memory
                  </span>
                </div>
              </div>

              {/* Caption & Date */}
              <div className="text-center px-2">
                <p className="font-handwriting text-xl text-[#3D0C1A] font-semibold truncate">
                  {item.caption}
                </p>
                <span className="text-[11px] text-[#8A4F60] font-light tracking-wide uppercase">
                  {item.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <MemoryLightbox
        item={activeIdx !== null ? memories[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
