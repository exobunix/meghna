"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SITE_CONFIG, HangingPhotoItem } from "@/data/config";
import MemoryLightbox from "./MemoryLightbox";

export default function HangingPhotos() {
  const photos = SITE_CONFIG.HANGING_PHOTOS;
  const [selectedPhoto, setSelectedPhoto] = useState<HangingPhotoItem | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 relative z-20 mb-6">
      {/* Wooden / Ribbon Hanging Line */}
      <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4A373]/50 to-transparent mb-0">
        <div className="absolute inset-0 bg-[#FFB3C1]/30 blur-xs" />
      </div>

      {/* Row of Hanging Polaroids: All 5 visible on mobile & desktop */}
      <div className="flex items-start justify-center gap-1.5 min-[380px]:gap-2 sm:gap-6 md:gap-8 py-2 px-1 sm:px-4 w-full">
        {photos.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.12 }}
            className="flex flex-col items-center flex-shrink-0 select-none cursor-pointer group"
            onClick={() => setSelectedPhoto(item)}
            data-cursor="image"
          >
            {/* Hanging String with Responsive Length */}
            <div
              className="w-[1px] sm:w-[1.5px] bg-gradient-to-b from-[#D4A373] to-[#E9D8A6] shadow-xs relative origin-top"
              style={{
                height: `clamp(32px, ${item.stringLength * 0.65}px, ${item.stringLength}px)`,
              }}
            >
              {/* Clothes pin / clip */}
              <div className="absolute -bottom-1 sm:-bottom-2 -left-[3px] sm:-left-[5px] w-2 sm:w-3 h-3 sm:h-4 rounded-xs bg-[#C99A6B] border border-[#8C6239] shadow-xs z-10" />
            </div>

            {/* Swaying Polaroid Frame */}
            <motion.div
              animate={{
                rotate: [item.rotation - 1.5, item.rotation + 1.5, item.rotation - 1.5],
              }}
              transition={{
                duration: 4 + (idx % 3) * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "top center" }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              className="bg-white p-1 sm:p-2.5 pb-2 sm:pb-4 rounded-xl sm:rounded-2xl polaroid-shadow border border-[#EBE4D8] transition-all duration-300 w-[58px] min-[370px]:w-[62px] min-[420px]:w-[70px] sm:w-[125px] md:w-[155px] mt-1 relative"
            >
              {/* Photo Container: Unclipped Containment with soft aura */}
              <div className="relative aspect-[4/5] w-full rounded-lg sm:rounded-xl overflow-hidden bg-[#FFF5F7] mb-1 sm:mb-2">
                {/* Ambient blur fill so no harsh borders */}
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                  sizes="60px"
                />
                {/* Crisp full photo appearing completely in box */}
                <Image
                  src={item.image}
                  alt={item.word}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 relative z-10"
                  sizes="(max-width: 640px) 70px, 160px"
                />
              </div>

              {/* Sweet One-Word Content */}
              <p className="font-handwriting text-center text-[10px] min-[370px]:text-[11px] sm:text-base md:text-lg text-[#3D0C1A] font-bold truncate leading-tight">
                {item.word}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox when clicking hanging photo */}
      <MemoryLightbox
        item={
          selectedPhoto
            ? {
                id: selectedPhoto.id,
                src: selectedPhoto.image,
                caption: selectedPhoto.word,
                date: "A Little Moment of Meghna",
                alt: selectedPhoto.word,
                category: "favorites",
              }
            : null
        }
        onClose={() => setSelectedPhoto(null)}
        onPrev={() => {}}
        onNext={() => {}}
      />
    </div>
  );
}
