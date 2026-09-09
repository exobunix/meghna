"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import HeroHeart3D from "./3d/HeroHeart3D";
import HangingPhotos from "./HangingPhotos";
import { SITE_CONFIG } from "@/data/config";

export default function Hero() {
  const scrollToNext = () => {
    const el = document.getElementById("message");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-36 sm:pt-40 md:pt-44 pb-14 px-4 overflow-hidden"
    >
      {/* Dreamy Ambient Gradient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-gradient-to-tr from-[#FFB3C1]/30 via-[#FFE3E8]/40 to-[#E8D7F1]/30 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#FFE5D9]/40 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Hanging Animated Photos Suspended from Top */}
      <HangingPhotos />

      {/* Main Content Container */}
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10 my-auto">
        {/* Handwritten greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F3] border border-[#FFCAD4]/60 text-[#8A3B4D] mb-4 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#FF758F]" />
          <span className="font-handwriting text-xl md:text-2xl font-semibold">
            {SITE_CONFIG.HERO_HANDWRITTEN}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-playfair-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#3D0C1A] leading-[1.1] mb-2"
        >
          {SITE_CONFIG.HERO_TITLE}{" "}
          <span className="block mt-1 bg-gradient-to-r from-[#E25875] via-[#FF758F] to-[#C77DFF] bg-clip-text text-transparent italic">
            {SITE_CONFIG.HERO_TITLE_HIGHLIGHT}
          </span>
        </motion.h1>

        {/* 3D Floating Glass Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg mx-auto -my-4 md:-my-6"
        >
          <HeroHeart3D />
        </motion.div>

        {/* Subheadings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="max-w-xl mx-auto space-y-2 mt-2 px-4"
        >
          <p className="font-serif-luxury text-xl md:text-2xl text-[#5A2030] font-medium leading-relaxed italic">
            “{SITE_CONFIG.HERO_SUBTITLE}”
          </p>
          <p className="font-sans text-sm md:text-base text-[#8A4F60] font-light tracking-wide">
            {SITE_CONFIG.HERO_SECONDARY}
          </p>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="z-10 mt-6"
      >
        <button
          onClick={scrollToNext}
          className="group px-7 py-3 rounded-full glass-card hover:bg-white text-[#4A1525] hover:text-[#E25875] font-medium text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2.5 border border-[#FFCAD4]/60"
        >
          <span>{SITE_CONFIG.HERO_CTA}</span>
          <ArrowDown className="w-4 h-4 text-[#FF758F] group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
}
