"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";
import MemoryLightbox from "./MemoryLightbox";
import { MemoryItem } from "@/data/config";

interface ScrapbookPhoto {
  id: string;
  src: string;
  caption: string;
  tapeColor: string;
  rotation: number;
  alt: string;
}

const SCRAPBOOK_PHOTOS: ScrapbookPhoto[] = [
  {
    id: "sb-1",
    src: "/images/meghna/Image-54970.jpg",
    caption: "favorite. 🌸",
    tapeColor: "#FFCAD4",
    rotation: -3,
    alt: "Meghna celebration candid",
  },
  {
    id: "sb-2",
    src: "/images/meghna/Image-15596.jpg",
    caption: "remember this? ✨",
    tapeColor: "#FFE5D9",
    rotation: 2.5,
    alt: "Meghna classic timeless portrait",
  },
  {
    id: "sb-3",
    src: "/images/meghna/Image-33136.jpg",
    caption: "one for memories. 👑",
    tapeColor: "#D8E2DC",
    rotation: -2,
    alt: "Meghna in royal blue attire",
  },
  {
    id: "sb-4",
    src: "/images/meghna/Image-15421.jpg",
    caption: "that smile again ❤️",
    tapeColor: "#ECE4DB",
    rotation: 3,
    alt: "Meghna charming smile",
  },
  {
    id: "sb-5",
    src: "/images/meghna/Image-61390.jpg",
    caption: "pure joy 💖",
    tapeColor: "#FFCAD4",
    rotation: -2.5,
    alt: "Meghna joyful candid",
  },
  {
    id: "sb-6",
    src: "/images/meghna/Image-46462.jpg",
    caption: "cutest glance 🥰",
    tapeColor: "#FFE5D9",
    rotation: 2,
    alt: "Meghna sweet glance",
  },
  {
    id: "sb-7",
    src: "/images/meghna/Image-81882.jpg",
    caption: "stargazer ✨",
    tapeColor: "#D8E2DC",
    rotation: -3,
    alt: "Meghna expressive portrait",
  },
  {
    id: "sb-8",
    src: "/images/meghna/Image-85361.jpg",
    caption: "gentle warmth ☀️",
    tapeColor: "#ECE4DB",
    rotation: 2.5,
    alt: "Meghna tender portrait",
  },
];

export default function ScrapbookWall() {
  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(null);

  const openLightbox = (photo: ScrapbookPhoto) => {
    setActivePhoto({
      id: photo.id,
      src: photo.src,
      caption: photo.caption,
      date: "Memory Scrapbook",
      alt: photo.alt,
      category: "favorites",
    });
  };

  return (
    <section className="relative py-28 md:py-36 px-4 bg-[#FAF7F2] border-y border-[#EDE6DC] overflow-hidden">
      {/* Delicate paper texture dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#D5CBB8_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 mb-14 md:mb-16">
        <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2">
          Scrapbook Collage
        </span>
        <h2 className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]">
          Pinned to the Memory Board
        </h2>
        <p className="mt-2 text-sm md:text-base text-[#8A4F60] font-light max-w-md mx-auto">
          Hover to straighten each snapshot. Tap to view full memory.
        </p>
      </div>

      {/* Scattered Polaroid Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10 relative z-10">
        {SCRAPBOOK_PHOTOS.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => openLightbox(photo)}
            className="cursor-pointer select-none"
            style={{ transform: `rotate(${photo.rotation}deg)` }}
            data-cursor="image"
          >
            <div className="bg-white p-2.5 sm:p-3.5 pb-4 sm:pb-6 rounded-xl sm:rounded-2xl polaroid-shadow border border-[#EBE4D8] relative group">
              {/* Cute Washi Tape Strip */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 sm:h-6 rounded-xs shadow-xs pointer-events-none opacity-85 border border-black/5"
                style={{
                  backgroundColor: photo.tapeColor,
                  transform: `translateX(-50%) rotate(${photo.rotation * -0.6}deg)`,
                }}
              />

              <div className="relative aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-[#FFF5F7] mb-2 sm:mb-3">
                {/* Ambient blur backdrop */}
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                  sizes="280px"
                />
                {/* Unclipped full photo */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-contain p-1 group-hover:scale-105 transition-transform duration-300 relative z-10"
                  sizes="(max-width: 640px) 50vw, 280px"
                />
              </div>

              <p className="font-handwriting text-center text-base sm:text-xl md:text-2xl text-[#3D0C1A] font-semibold truncate leading-tight">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox for clicked scrapbook item */}
      <MemoryLightbox
        item={activePhoto}
        onClose={() => setActivePhoto(null)}
        onPrev={() => {}}
        onNext={() => {}}
      />
    </section>
  );
}
