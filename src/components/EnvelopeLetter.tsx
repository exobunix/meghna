"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles, RefreshCw } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const letter = SITE_CONFIG.LETTER;

  const handleOpen = () => {
    sounds.playEnvelopeOpen();
    setIsOpen(true);
  };

  return (
    <section id="letter" className="relative py-28 md:py-40 px-4 max-w-4xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFE5EC]/40 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="text-center mb-12">
        <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2">
          From The Heart
        </span>
        <h2 className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]">
          A letter for Meghna <span className="inline-block animate-pulse">💌</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-[#8A4F60] font-light">
          {isOpen ? "Written with love, kept forever." : "There is an envelope waiting for you. Click to open it."}
        </p>
      </div>

      {/* Envelope Stage */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        {!isOpen ? (
          /* Closed Envelope Card */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#FFF0F3] to-[#FCEADE] rounded-3xl p-8 shadow-2xl border-2 border-[#FFCAD4] flex flex-col items-center justify-between overflow-hidden cursor-pointer group select-none"
            onClick={handleOpen}
            data-cursor="button"
          >
            {/* Envelope flap lines */}
            <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-[#FFB3C1]/50 bg-gradient-to-b from-[#FFE3E8] to-[#FFF0F3]/30 [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-sm pointer-events-none" />

            {/* Recipient Address */}
            <div className="mt-14 z-10 text-center">
              <span className="text-xs uppercase tracking-widest text-[#9E3D52] font-semibold block mb-1">
                Hand-delivered with care
              </span>
              <h3 className="font-handwriting text-3xl sm:text-4xl text-[#4A1525] font-bold">
                {letter.recipient}
              </h3>
            </div>

            {/* Wax Seal / Open Button */}
            <div className="z-10 mb-4 flex flex-col items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9E2A2B] to-[#E25875] text-white flex items-center justify-center shadow-lg border-2 border-[#FFE5EC] group-hover:shadow-[0_0_25px_rgba(226,88,117,0.7)] transition-all"
                aria-label="Open letter"
              >
                <Heart className="w-7 h-7 fill-white drop-shadow" />
              </motion.button>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#9E3D52] group-hover:text-[#E25875] transition-colors">
                Open It ✨
              </span>
            </div>
          </motion.div>
        ) : (
          /* Opened Letter Paper with Smooth Spring Slide-Out */
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="relative w-full bg-[#FCFAF5] rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl border border-[#F0E6D2] text-[#3D0C1A] overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(#e5d9c5 0.75px, transparent 0.75px), linear-gradient(to bottom, #FAF6EE, #F8F2E4)",
              backgroundSize: "20px 20px, 100% 100%",
            }}
          >
            {/* Paper Fold Shadows & Watermark */}
            <div className="absolute top-6 right-8 text-[#E25875]/15 select-none pointer-events-none">
              <Heart className="w-24 h-24 fill-current" />
            </div>

            {/* Letter Content */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-4">
                <span className="font-handwriting text-3xl sm:text-4xl text-[#E25875] font-bold">
                  {letter.salutation}
                </span>
                <span className="text-xs font-serif-luxury italic text-[#8A4F60]">
                  For Meghna, always
                </span>
              </div>

              <div className="space-y-4 font-handwriting text-2xl sm:text-3xl text-[#3D1420] leading-[1.8] tracking-wide">
                {letter.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E8DFC8] text-right space-y-1">
                <p className="font-handwriting text-2xl text-[#8A4F60]">{letter.closing}</p>
                <p className="font-handwriting text-3xl sm:text-4xl text-[#E25875] font-bold">
                  {letter.signature} ❤️
                </p>
              </div>

              {/* Close / Fold Back Action */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF0F3] hover:bg-[#FFE3E8] text-[#4A1525] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#FFCAD4]/60 shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Fold back into envelope</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
