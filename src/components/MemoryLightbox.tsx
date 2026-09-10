"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { MemoryItem } from "@/data/config";

interface LightboxProps {
  item: MemoryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function MemoryLightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev & Next Controls */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Lightbox Content Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-4 sm:p-6 pb-8 rounded-3xl max-w-2xl w-full mx-auto shadow-2xl relative"
        >
          {/* Main Photo */}
          <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FFF5F7]">
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover blur-sm opacity-25 scale-110 pointer-events-none"
              sizes="(max-width: 768px) 100vw, 700px"
            />
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain p-2 relative z-10"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
          </div>

          {/* Caption & Date */}
          <div className="mt-5 flex items-center justify-between px-2">
            <div>
              <p className="font-handwriting text-2xl md:text-3xl text-[#3D0C1A] font-semibold">
                {item.caption}
              </p>
              <p className="text-xs md:text-sm text-[#8A4F60] font-light mt-0.5">
                {item.date}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#FF4D6D] animate-pulse">
              <Heart className="w-5 h-5 fill-[#FF4D6D]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
