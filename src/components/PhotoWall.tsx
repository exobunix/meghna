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
  {
    id: "pw-6",
    src: "/images/meghna/Image-50550.jpg",
    caption: "Timeless Poise ✨",
    subcaption: "Grace woven into every single movement.",
    depthZ: 50,
    initialX: -320,
    initialY: 90,
    rotZ: -3,
  },
  {
    id: "pw-7",
    src: "/images/meghna/Image-40089.jpg",
    caption: "Midnight Magic 🖤",
    subcaption: "Stunning radiance that captivates completely.",
    depthZ: 85,
    initialX: 310,
    initialY: -70,
    rotZ: 3.5,
  },
  {
    id: "pw-8",
    src: "/images/meghna/Image-62340.jpg",
    caption: "Sweet Elegance 🌸",
    subcaption: "An innocent smile that melts away every worry.",
    depthZ: 65,
    initialX: -60,
    initialY: 170,
    rotZ: -2,
  },
  {
    id: "pw-9",
    src: "/images/meghna/Image-81211.jpg",
    caption: "Warmth & Radiance ☀️",
    subcaption: "Brightening up the whole world with a glance.",
    depthZ: 95,
    initialX: 120,
    initialY: 120,
    rotZ: 2,
  },
  {
    id: "pw-10",
    src: "/images/meghna/Image-8508.jpg",
    caption: "A Treasured Memory 💖",
    subcaption: "Cherished forever and always in my heart.",
    depthZ: 75,
    initialX: -190,
    initialY: -160,
    rotZ: 3,
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
      const cardWidth = 260;
      mobileScrollRef.current.scrollTo({
        left: next * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="scrapbook"
      className="relative py-28 md:py-36 px-4 overflow-hidden bg-gradient-to-b from-transparent via-[#FFF0F3]/40 to-transparent"
    >
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2">
          Living Scrapbook
        </span>
        <h2 className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]">
          Floating in Time & Space
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#8A4F60] font-light max-w-lg mx-auto">
          Hover your mouse or drag across on mobile to tilt and explore our memories floating in 3D depth.
        </p>
      </div>

      {/* Mobile Swipeable Card Carousel (Screens < 768px) */}
      <div className="md:hidden relative w-full px-2">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF758F]">
            Memory {mobileIdx + 1} of {WALL_PHOTOS.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollMobile("prev")}
              disabled={mobileIdx === 0}
              className="p-2 rounded-full bg-white/90 border border-[#FFCAD4] text-[#4A1525] disabled:opacity-40 shadow-xs"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollMobile("next")}
              disabled={mobileIdx === WALL_PHOTOS.length - 1}
              className="p-2 rounded-full bg-white/90 border border-[#FFCAD4] text-[#4A1525] disabled:opacity-40 shadow-xs"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={mobileScrollRef}
          className="flex items-center gap-4 overflow-x-auto py-4 px-2 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {WALL_PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="flex-shrink-0 snap-center select-none cursor-pointer"
              style={{ transform: `rotate(${photo.rotZ}deg)` }}
            >
              <div className="bg-white/95 p-3 pb-5 rounded-3xl shadow-xl border border-white/40 w-[240px] xs:w-[260px] backdrop-blur-md transition-transform active:scale-95">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFF5F7] mb-2.5">
                  {/* Ambient blur fill */}
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                    sizes="260px"
                  />
                  {/* Unclipped full photo */}
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-contain p-1 relative z-10"
                    sizes="260px"
                  />
                  <div className="absolute inset-0 z-20 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 text-white text-[11px] font-medium flex items-center gap-1">
                      <ZoomIn className="w-3 h-3" /> Tap to view
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
      </div>

      {/* Desktop 3D Parallax Space (Screens >= 768px) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex relative h-[650px] w-full max-w-6xl mx-auto items-center justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: "1100px" }}
      >
        <div className="absolute inset-0 rounded-3xl border border-[#FFCAD4]/30 bg-gradient-to-tr from-white/30 via-transparent to-[#FFF0F3]/30 pointer-events-none" />

        <motion.div
          animate={{
            rotateX: rot.x,
            rotateY: rot.y,
          }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 140,
          }}
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {WALL_PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="absolute cursor-pointer transition-transform duration-300 hover:scale-108"
              style={{
                transform: `translate3d(${photo.initialX}px, ${photo.initialY}px, ${photo.depthZ}px) rotateZ(${photo.rotZ}deg)`,
                transformStyle: "preserve-3d",
              }}
              data-cursor="image"
            >
              {/* Polaroid Frame */}
              <div className="bg-white/95 p-3 pb-5 rounded-2xl shadow-xl border border-white/40 w-52 sm:w-60 backdrop-blur-md group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FFF5F7] mb-2">
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                    sizes="240px"
                  />
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-contain p-1 relative z-10 group-hover:scale-105 transition-transform duration-300"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 z-20 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <ZoomIn className="w-5 h-5 text-white drop-shadow-md" />
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-7 pb-8 rounded-3xl max-w-lg w-full text-[#3D0C1A] shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/15 text-[#4A1525] transition-colors z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden mb-5 bg-[#FFF0F3]">
                <Image
                  src={selectedPhoto.src}
                  alt=""
                  fill
                  className="object-cover blur-sm opacity-25 scale-110 pointer-events-none"
                  sizes="500px"
                />
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-contain p-2 relative z-10"
                  sizes="(max-width: 640px) 100vw, 500px"
                />
              </div>

              <div className="text-center px-2">
                <h4 className="font-handwriting text-2xl sm:text-3xl text-[#E25875] font-bold mb-1">
                  “{selectedPhoto.caption}”
                </h4>
                <p className="font-serif-luxury italic text-sm sm:text-base text-[#5A2030]">
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
