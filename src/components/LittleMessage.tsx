"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkle } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export default function LittleMessage() {
  const { badge, heading, body, signature } = SITE_CONFIG.LOVE_MESSAGE;

  return (
    <section id="message" className="relative py-28 md:py-36 px-6 overflow-hidden">
      {/* Background delicate decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-[#FFF0F3]/80 via-[#FDE2E4]/40 to-[#F0E6FF]/50 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#FFCAD4]/60 text-[#9E3D52] text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <Sparkle className="w-3 h-3 text-[#FF758F]" />
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

        {/* Romantic quote box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative shadow-lg border border-[#FFCAD4]/50"
        >
          {/* Subtle quotation mark */}
          <div className="absolute top-4 left-6 text-6xl font-serif-luxury text-[#FFCAD4]/40 select-none pointer-events-none">
            “
          </div>

          <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#4A1525] font-normal leading-relaxed md:leading-[1.7] relative z-10 italic">
            {body}
          </p>

          {/* Signature */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold tracking-wide">
              {signature}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
