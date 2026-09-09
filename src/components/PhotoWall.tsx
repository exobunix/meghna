"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface WallPhoto {
  id: string;
  src: string;
  caption: string;
  subcaption: string;
  depthZ: number;
  initialX: number;
  initialY: number;
  rotZ: number;
}

const WALL_PHOTOS: WallPhoto[] = [
  {
    id: "pw-1",
    src: "/images/meghna/Image-44415.jpg",
    caption: "That smile ❤️",
    subcaption: "The kind of gaze that stays with you forever.",
    depthZ: 60,
    initialX: -260,
    initialY: -60,
    rotZ: -4,
  },
  {
    id: "pw-2",
    src: "/images/meghna/Image-30109.jpg",
    caption: "One of my favorite moments.",
    subcaption: "Pure radiant laughter in the rain.",
    depthZ: 110,
    initialX: 0,
    initialY: -40,
    rotZ: 2,
  },
  {
    id: "pw-3",
    src: "/images/meghna/Image-16162.jpg",
    caption: "This one deserves a forever place.",
    subcaption: "Timeless grace and celestial beauty.",
    depthZ: 40,
    initialX: 250,
    initialY: 40,
    rotZ: -3,
  },
  {
    id: "pw-4",
    src: "/images/meghna/Image-76778.jpg",
    caption: "Just you being you. ❤️",
    subcaption: "Effortlessly, beautifully Meghna.",
    depthZ: 90,
    initialX: -140,
    initialY: 130,
    rotZ: 3,
  },
  {
    id: "pw-5",
    src: "/images/meghna/Image-39583.jpg",
    caption: "Lavender Serenity.",
    subcaption: "Where every little moment feels soft.",
    depthZ: 70,
    initialX: 160,
    initialY: -140,
    rotZ: -2,
  },
];

export default function PhotoWall() {
  const [selectedPhoto, setSelectedPhoto] = useState<WallPhoto | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [mobileIdx, setMobileIdx] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setRot({
      x: -y * 14,
      y: x * 18,
    });
  };

  const handleMouseLeave = () => {
    setRot({ x: 0, y: 0 });
  };

  const scrollMobile = (direction: "prev" | "next") => {
    const next = direction === "next" 
      ? Math.min(mobileIdx + 1, WALL_PHOTOS.length - 1)
      : Math.max(mobileIdx - 1, 0);
    setMobileIdx(next);
    if (mobileScrollRef.current) {
      const cardWidth = 280;
      mobileScrollRef.current.scrollTo({
        left: next * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-20 md:py-36 px-4 bg-gradient-to-b from-[#FFFDFB] via-[#2B0E1E] to-[#1E0814] text-[#FFF0F3] overflow-hidden">
      {/* Ambient background particles and stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF8DA1_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E25875]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 mb-8 md:mb-12 px-2">
        <span className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#FFB3C1] font-semibold block mb-2">
          3D Interactive Memory Wall
        </span>
        <h2 className="font-playfair-luxury text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
          Moments Floating in Space
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#FFCAD4]/80 font-light max-w-lg mx-auto">
          {typeof window !== "undefined" && window.innerWidth < 768
            ? "Swipe through the floating polaroids. Tap to pull forward."
            : "Hover and move around to shift the perspective. Click any photograph to pull it forward."}
        </p>
      </div>

      {/* MOBILE VIEW (< md): Touch-friendly Horizontal Card Deck */}
      <div className="block md:hidden max-w-sm mx-auto relative z-10">
        <div
          ref={mobileScrollRef}
          className="flex items-center gap-4 overflow-x-auto py-6 px-4 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {WALL_PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="flex-shrink-0 snap-center select-none cursor-pointer"
              style={{ transform: `rotate(${photo.rotZ}deg)` }}
            >
              <div className="bg-white/95 p-3 pb-5 rounded-3xl shadow-2xl border border-white/30 w-[240px] backdrop-blur-md transition-transform active:scale-95">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 mb-2.5">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 text-white text-[11px] font-medium flex items-center gap-1">
                      <ZoomIn className="w-3 h-3" /> Tap
                    </span>
                  </div>
                </div>
                <p className="font-handwriting text-center text-lg text-[#3D0C1A] font-bold truncate px-1">
                  {photo.caption}
                </p>
                <p className="font-serif-luxury text-center text-xs text-[#8A4F60] italic truncate px-1">
                  {photo.subcaption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicators / Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {WALL_PHOTOS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === mobileIdx ? "w-5 bg-[#FF8DA1]" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP VIEW (>= md): Full 3D Perspective Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex relative max-w-5xl h-[580px] md:h-[650px] mx-auto items-center justify-center cursor-default select-none"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={{
            rotateX: rot.x,
            rotateY: rot.y,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 24,
            mass: 0.5,
          }}
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {WALL_PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="absolute cursor-pointer transition-transform duration-300 hover:scale-110"
              style={{
                transform: `translate3d(${photo.initialX}px, ${photo.initialY}px, ${photo.depthZ}px) rotateZ(${photo.rotZ}deg)`,
                transformStyle: "preserve-3d",
              }}
              data-cursor="image"
            >
              {/* Polaroid Frame */}
              <div className="bg-white/95 p-3 pb-5 rounded-2xl shadow-2xl border border-white/20 w-52 sm:w-60 backdrop-blur-md">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/10 mb-2">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="font-handwriting text-center text-lg text-[#3D0C1A] font-semibold truncate px-1">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Focused Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-5 sm:p-7 pb-8 rounded-3xl max-w-lg w-full text-[#3D0C1A] shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/15 text-[#4A1525] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-[#FFF0F3]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 500px"
                />
              </div>

              <div className="text-center">
                <h4 className="font-handwriting text-3xl text-[#E25875] font-bold mb-1">
                  “{selectedPhoto.caption}”
                </h4>
                <p className="font-serif-luxury italic text-base sm:text-lg text-[#5A2030]">
                  {selectedPhoto.subcaption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
