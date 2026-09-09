"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/data/config";
import { Sun, Sparkles } from "lucide-react";

export default function SunsetWishSection() {
  const wishes = SITE_CONFIG.SUNSET_WISHES;

  return (
    <section className="relative py-32 md:py-44 px-4 overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FFE3D8] to-[#FFD8C9] transition-colors duration-1000">
      {/* Sunset warm sun orb glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-t from-[#FF9E7D]/35 via-[#FFAA85]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#FFAA85]/50 text-[#8B3A1C] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm"
        >
          <Sun className="w-4 h-4 text-[#FF7A59]" />
          <span>A Golden Wish</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-playfair-luxury text-3xl sm:text-5xl md:text-7xl font-bold text-[#42170E] mb-14 leading-tight"
        >
          If I could give you anything…
        </motion.h2>

        {/* Staggered Romantic Lines */}
        <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
          {wishes.map((wish, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: idx * 0.18 }}
              className="group"
            >
              <p
                className={`font-serif-luxury text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed ${
                  idx === 0
                    ? "text-[#4A1525] font-semibold md:text-3xl"
                    : idx === wishes.length - 1
                    ? "text-[#D84A38] font-bold md:text-4xl"
                    : "text-[#6A2518]"
                } transition-colors duration-300 group-hover:text-[#D84A38]`}
              >
                “{wish}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
