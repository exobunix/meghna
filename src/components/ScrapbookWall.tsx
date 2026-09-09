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
    rotation: -4,
    alt: "Meghna celebration candid",
  },
  {
    id: "sb-2",
    src: "/images/meghna/Image-15596.jpg",
    caption: "remember this? ✨",
    tapeColor: "#FFE5D9",
    rotation: 3,
    alt: "Meghna classic timeless portrait",
  },
  {
    id: "sb-3",
    src: "/images/meghna/Image-33136.jpg",
    caption: "one for the memories. 👑",
    tapeColor: "#D8E2DC",
    rotation: -2,
    alt: "Meghna in royal blue attire",
  },
  {
    id: "sb-4",
    src: "/images/meghna/Image-15421.jpg",
    caption: "that smile again ❤️",
    tapeColor: "#ECE4DB",
    rotation: 5,
    alt: "Meghna charming smile",
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

      <div className="max-w-4xl mx-auto text-center relative z-10 mb-16">
        <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2">
          Scrapbook Collage
        </span>
        <h2 className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]">
          Pinned to the Memory Board
        </h2>
        <p className="mt-2 text-sm md:text-base text-[#8A4F60] font-light max-w-md mx-auto">
          Hover to straighten each snapshot. Click to relive the details.
        </p>
      </div>

      {/* Scattered Polaroid Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
        {SCRAPBOOK_PHOTOS.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.08, zIndex: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => openLightbox(photo)}
            className="cursor-pointer select-none"
            style={{ transform: `rotate(${photo.rotation}deg)` }}
            data-cursor="image"
          >
            <div className="bg-white p-3.5 pb-6 rounded-2xl polaroid-shadow border border-[#EBE4D8] relative group">
              {/* Cute Washi Tape Strip */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 rounded-xs shadow-xs pointer-events-none opacity-80 border border-black/5"
                style={{
                  backgroundColor: photo.tapeColor,
                  transform: `translateX(-50%) rotate(${photo.rotation * -0.6}deg)`,
                }}
              />

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF5F7] mb-3">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 250px"
                />
              </div>

              <p className="font-handwriting text-center text-xl sm:text-2xl text-[#3D0C1A] font-semibold">
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
