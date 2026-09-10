"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, Camera, Infinity } from "lucide-react";
import { SITE_CONFIG, StoryItem } from "@/data/config";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Heart,
  Camera,
  Infinity,
};

export default function StoryTimeline() {
  const items = SITE_CONFIG.STORY_ITEMS;

  return (
    <section id="story" className="relative py-24 md:py-32 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2"
        >
          Our Little Story
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A] leading-tight"
        >
          Every beautiful story
          <span className="block italic text-[#FF758F] font-serif-luxury">
            starts with little moments.
          </span>
        </motion.h2>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative">
        {/* Center line */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FFCAD4]/20 via-[#FF758F]/50 to-[#FFCAD4]/20" />

        <div className="flex flex-col gap-14 md:gap-24">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Heart;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFF0F3] border-2 border-[#FF758F] items-center justify-center shadow-md z-20">
                  <Icon className="w-4 h-4 text-[#FF4D6D]" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[46%]">
                  <div className="glass-card rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#FFCAD4]/50 group">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold tracking-wider text-[#FF758F] uppercase bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#FFCAD4]/40">
                        {item.date}
                      </span>
                      <Heart className="w-4 h-4 text-[#FF758F] fill-[#FF758F]/20 group-hover:scale-125 transition-transform" />
                    </div>

                    <h3 className="font-playfair-luxury text-2xl md:text-3xl font-bold text-[#3D0C1A] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-serif-luxury italic text-sm md:text-base text-[#8A4F60] mb-4">
                      {item.subtitle}
                    </p>

                    <p className="text-sm md:text-base text-[#4A1525]/90 leading-relaxed font-light">
                      “{item.message}”
                    </p>
                  </div>
                </div>

                {/* Polaroid Photo Frame */}
                <div className="w-full md:w-[46%] flex justify-center">
                  <div
                    className={`relative bg-white p-3.5 pb-6 rounded-2xl polaroid-shadow transition-transform duration-300 hover:rotate-0 hover:scale-105 border border-[#F3E8EE] ${
                      isEven ? "rotate-2" : "-rotate-2"
                    } max-w-sm w-full`}
                  >
                    {/* Washi tape accent */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#FFE5EC]/80 border border-[#FFCAD4]/60 rotate-1 shadow-sm backdrop-blur-xs" />

                    <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden bg-[#FFF5F7]">
                      {/* Ambient blur fill */}
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover blur-sm opacity-25 scale-110 pointer-events-none"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {/* Complete uncropped photo */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-1 relative z-10"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>

                    <div className="mt-3 text-center">
                      <span className="font-handwriting text-lg text-[#5A2030] font-medium">
                        {item.title} ❤️
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
