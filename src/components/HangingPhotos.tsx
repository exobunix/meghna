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

      {/* Row of Hanging Polaroids */}
      <div className="flex items-start justify-center gap-3 sm:gap-6 md:gap-8 overflow-x-auto py-2 px-4 no-scrollbar">
        {photos.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="flex flex-col items-center flex-shrink-0 select-none cursor-pointer group"
            onClick={() => setSelectedPhoto(item)}
            data-cursor="image"
          >
            {/* Hanging String */}
            <div
              className="w-[1.5px] bg-gradient-to-b from-[#D4A373] to-[#E9D8A6] shadow-xs relative origin-top"
              style={{ height: `${item.stringLength}px` }}
            >
              {/* Clothes pin / clip */}
              <div className="absolute -bottom-2 -left-[5px] w-3 h-4 rounded-xs bg-[#C99A6B] border border-[#8C6239] shadow-xs z-10" />
            </div>

            {/* Swaying Polaroid Frame */}
            <motion.div
              animate={{
                rotate: [item.rotation - 1.8, item.rotation + 1.8, item.rotation - 1.8],
              }}
              transition={{
                duration: 4 + (idx % 3) * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "top center" }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
              className="bg-white p-2 sm:p-2.5 pb-4 rounded-2xl polaroid-shadow border border-[#EBE4D8] transition-all duration-300 w-[110px] sm:w-[135px] md:w-[155px] mt-1 relative"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#FFF5F7] mb-2">
                <Image
                  src={item.image}
                  alt={item.word}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="160px"
                />
              </div>

              {/* Sweet One-Word Content */}
              <p className="font-handwriting text-center text-sm sm:text-base md:text-lg text-[#3D0C1A] font-bold truncate">
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
