"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export default function SplitStory() {
  const { heading, body, quote, image } = SITE_CONFIG.SPLIT_SECTION;

  return (
    <section className="relative py-28 md:py-36 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#FFE5EC]/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Large Artistic Photograph */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7 flex justify-center"
        >
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl p-3 bg-white polaroid-shadow border border-[#FFCAD4]/60 -rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Washi tape accent */}
            <div className="absolute -top-3 left-10 w-28 h-7 bg-[#FFCAD4]/60 border border-[#FFCAD4] rounded-sm -rotate-3 shadow-xs pointer-events-none z-10" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#FFF5F7]">
              <Image
                src={image || "/images/meghna/Image-724.jpg"}
                alt="Meghna quiet moments"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Romantic Prose */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#FFCAD4]/60 text-[#9E3D52] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
            <span>Gentle Truths</span>
          </div>

          <h2 className="font-playfair-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D0C1A] leading-tight">
            {heading}
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FF758F] to-transparent" />

          <p className="font-serif-luxury text-xl md:text-2xl text-[#4A1525] font-normal leading-relaxed italic">
            “{body}”
          </p>

          <div className="pt-2">
            <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block">
              {quote}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
