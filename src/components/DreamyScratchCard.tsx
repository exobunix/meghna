"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Wand2, RefreshCw, Moon, Star } from "lucide-react";
import { sounds } from "@/utils/sound";

interface ScratchSurprise {
  id: string;
  photo: string;
  title: string;
  quote: string;
  subtext: string;
  tag: string;
}

const SCRATCH_SURPRISES: ScratchSurprise[] = [
  {
    id: "scratch-1",
    photo: "/images/meghna/Image-30109.jpg",
    title: "That Radiant Smile 🥰",
    quote: "In a universe full of stars, my favorite view will always be your smile, Meghna. ✨",
    subtext: "Your laughter has a way of making everything around you feel softer, brighter, and sweeter.",
    tag: "Pure Sunshine ☀️",
  },
  {
    id: "scratch-2",
    photo: "/images/meghna/Image-16162.jpg",
    title: "Timeless Grace 🌸",
    quote: "Some souls bring effortless poetry into the world just by simply being in it. 💖",
    subtext: "Elegance, quiet warmth, and a presence that is deeply cherished in every single way.",
    tag: "Golden Elegance ✨",
  },
  {
    id: "scratch-3",
    photo: "/images/meghna/Image-44415.jpg",
    title: "Those Beautiful Eyes ❤️",
    quote: "Eyes that hold a whole universe of kindness and unspoken magic. 🌌",
    subtext: "A gentle glance that can brighten the heaviest day and make the heart flutter.",
    tag: "Endless Depth 💫",
  },
  {
    id: "scratch-4",
    photo: "/images/meghna/Image-724.jpg",
    title: "My Favorite Presence ☀️",
    quote: "Even ordinary days turn into unforgettable memories when you are around. 🌹",
    subtext: "Thank you for simply existing as you are and filling every moment with quiet joy.",
    tag: "Sweet Angel 👑",
  },
  {
    id: "scratch-5",
    photo: "/images/meghna/Image-39583.jpg",
    title: "Irreplaceable You 💕",
    quote: "You don't just light up a room, Meghna; you bring peace to the entire soul. 🕊️",
    subtext: "No matter how big the universe is, my heart will always find its favorite corner with you.",
    tag: "Forever Loved ❤️",
  },
];

export default function DreamyScratchCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSoundTimeRef = useRef(0);

  // Touch gesture disambiguation to guarantee scrolling touch works
  const touchStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchIntentRef = useRef<"undecided" | "scrolling" | "scratching">("undecided");

  const currentSurprise = SCRATCH_SURPRISES[currentIndex % SCRATCH_SURPRISES.length];

  // Helper to draw the heart path on canvas
  const drawHeartPath = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    h: number
  ) => {
    ctx.beginPath();
    const topCurve = h * 0.35;
    ctx.moveTo(cx, cy + topCurve);
    // Left lobe
    ctx.bezierCurveTo(cx, cy - h * 0.1, cx - w * 0.55, cy - h * 0.1, cx - w * 0.55, cy + topCurve);
    ctx.bezierCurveTo(cx - w * 0.55, cy + h * 0.65, cx, cy + h * 0.82, cx, cy + h);
    // Right lobe
    ctx.bezierCurveTo(cx, cy + h * 0.82, cx + w * 0.55, cy + h * 0.65, cx + w * 0.55, cy + topCurve);
    ctx.bezierCurveTo(cx + w * 0.55, cy - h * 0.1, cx, cy - h * 0.1, cx, cy + topCurve);
    ctx.closePath();
  };

  // Initialize the scratch canvas surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 280;
    const height = 280;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Save and clip to cute heart
    ctx.save();
    drawHeartPath(ctx, width / 2, 24, width * 0.88, height * 0.78);
    ctx.clip();

    // 1. Shimmering Rose Gold / Metallic Blush Gradient
    const gradient = ctx.createLinearGradient(20, 20, width - 20, height - 20);
    gradient.addColorStop(0, "#FF4D6D");
    gradient.addColorStop(0.25, "#FF758F");
    gradient.addColorStop(0.5, "#FFB3C1");
    gradient.addColorStop(0.75, "#FFCAD4");
    gradient.addColorStop(1, "#FFE5B4");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Glitter & Sparkle particles over the scratch surface
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < 45; i++) {
      const sx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 77) * 0.5 + 0.5) * height;
      const sr = (i % 3) + 1.2;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Romantic decorative text & heart icons
    ctx.fillStyle = "#3D0C1A";
    ctx.font = "bold 15px 'Caveat', cursive, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("💖 SCRATCH ME 💖", width / 2, height / 2 - 14);

    ctx.font = "600 12px sans-serif";
    ctx.fillStyle = "rgba(61, 12, 26, 0.82)";
    ctx.fillText("Rub with your finger ✨", width / 2, height / 2 + 8);

    ctx.font = "16px sans-serif";
    ctx.fillText("❤️ 🌸 ✨", width / 2, height / 2 + 32);

    ctx.restore();

    // Subtle golden heart border outline
    ctx.save();
    drawHeartPath(ctx, width / 2, 24, width * 0.88, height * 0.78);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    setScratchPercent(0);
    setIsRevealed(false);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [currentIndex, initCanvas]);

  // Calculate percentage scratched to trigger auto-reveal
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    // Sample a subset of pixels for high performance
    const step = 8;
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    let transparentCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const alphaIndex = (y * width + x) * 4 + 3;
        totalSampled++;
        if (pixels[alphaIndex] < 128) {
          transparentCount++;
        }
      }
    }

    const percent = Math.round((transparentCount / totalSampled) * 100);
    setScratchPercent(percent);

    // Auto-reveal threshold
    if (percent >= 38 && !isRevealed) {
      handleCompleteReveal();
    }
  };

  // Erase circular patch at coords
  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Check bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, 26 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Play subtle soft chime throttled
    const now = performance.now();
    if (now - lastSoundTimeRef.current > 240) {
      sounds.playStarTwinkle();
      lastSoundTimeRef.current = now;
    }
  };

  // Complete reveal celebration
  const handleCompleteReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchPercent(100);

    sounds.playHeartChime();

    // Confetti burst from heart
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height * 0.4) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 75,
        origin: { x: Math.max(0.1, Math.min(0.9, x)), y: Math.max(0.1, Math.min(0.9, y)) },
        colors: ["#FF4D6D", "#FF758F", "#FFCAD4", "#FFD166", "#FFFFFF", "#C77DFF"],
        scalar: 1.1,
      });
    }
  };

  // TOUCH HANDLING WITH ROCK-SOLID SCROLL DETECTION
  // Guaranteed: If the user swipes vertically, scrolling works natively!
  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1 || isRevealed) return;
    const touch = e.touches[0];
    touchStartPosRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    };
    touchIntentRef.current = "undecided";
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1 || isRevealed || !touchStartPosRef.current) return;
    const touch = e.touches[0];

    // If intent is not yet decided, check direction
    if (touchIntentRef.current === "undecided") {
      const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
      const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);

      // If predominantly vertical movement > 10px: user is scrolling the page!
      if (dy > 10 && dy > dx * 1.3) {
        touchIntentRef.current = "scrolling";
        setIsScratching(false);
        // Do NOT preventDefault! Let browser scroll page vertically.
        return;
      }

      // If movement is horizontal or rubbing in place > 5px: user wants to scratch!
      if (dx > 5 || dy > 5) {
        touchIntentRef.current = "scratching";
        setIsScratching(true);
      }
    }

    // If scratching intent confirmed, prevent page jitter and scratch
    if (touchIntentRef.current === "scratching") {
      if (e.cancelable) {
        e.preventDefault();
      }
      scratchAt(touch.clientX, touch.clientY);
    }
  };

  const onTouchEnd = () => {
    touchStartPosRef.current = null;
    touchIntentRef.current = "undecided";
    setIsScratching(false);
    checkScratchPercentage();
  };

  // MOUSE EVENTS FOR DESKTOP / DEVTOOLS EMULATION
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    if (isScratching) {
      setIsScratching(false);
      checkScratchPercentage();
    }
  };

  const nextSurprise = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden glass-card my-6 border border-[#FFCAD4]/60 shadow-xl select-none p-5 sm:p-7 text-center transition-all"
      style={{ touchAction: "pan-y" }}
    >
      {/* Dreamy Ambient Pastel Glows */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br from-[#FFCAD4]/50 to-[#FFE5B4]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-gradient-to-tl from-[#FF758F]/30 to-[#FCEADE]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mb-4">
        <span className="font-handwriting text-xl sm:text-2xl text-[#E25875] font-semibold flex items-center justify-center gap-1.5 mb-1">
          <Moon className="w-4 h-4 text-[#FFB703] fill-[#FFD166]/50" />
          a dreamy little corner
          <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
        </span>
        <h3 className="font-playfair-luxury text-2xl sm:text-3xl font-bold text-[#3D0C1A]">
          Floating in Our Universe ✨
        </h3>
        <p className="text-xs sm:text-sm text-[#8A4F60] font-light max-w-sm mx-auto mt-1">
          {isRevealed
            ? "A little memory etched into starlight for Meghna ❤️"
            : "Scratch the cute loving heart with your finger to reveal a secret! 💖"}
        </p>
      </div>

      {/* Center Interactive Heart Card Area */}
      <div className="relative mx-auto w-[280px] h-[280px] my-3 flex items-center justify-center">
        {/* Outer Glowing Heart Halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF758F]/25 via-[#FFB3C1]/20 to-[#FFE5B4]/30 rounded-full blur-xl animate-pulse pointer-events-none" />

        {/* Revealed Photo & Romantic Content (Underneath the scratch canvas) */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div
            className="relative w-[230px] h-[230px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-[#FFF0F3] p-1.5 transition-transform duration-500"
            style={{
              boxShadow: "0 14px 35px -8px rgba(226, 88, 117, 0.4)",
            }}
          >
            {/* Background Blurred Glow */}
            <Image
              src={currentSurprise.photo}
              alt=""
              fill
              className="object-cover blur-sm opacity-35 scale-110 pointer-events-none"
              sizes="240px"
              priority
            />
            {/* Crisp Main Photo of Meghna */}
            <Image
              src={currentSurprise.photo}
              alt={currentSurprise.title}
              fill
              className="object-cover rounded-full p-1 relative z-10"
              sizes="240px"
              priority
            />

            {/* Tag Badge */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#E25875]/95 text-white text-[11px] font-bold shadow-md flex items-center gap-1 backdrop-blur-xs whitespace-nowrap border border-white/40">
              <Star className="w-3 h-3 fill-[#FFE5B4] text-[#FFE5B4]" />
              <span>{currentSurprise.tag}</span>
            </div>
          </div>
        </div>

        {/* Scratchable Canvas Layer (Placed directly over the heart) */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              key="scratch-canvas-wrapper"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-30 flex items-center justify-center"
              style={{ touchAction: "pan-y" }}
            >
              <canvas
                ref={canvasRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                className="cursor-pointer rounded-3xl"
                style={{
                  touchAction: "pan-y",
                  filter: "drop-shadow(0 10px 20px rgba(226, 88, 117, 0.35))",
                }}
                aria-label="Scratch card heart - Rub with finger to reveal"
              />

              {/* Little Hint Finger / Sparkle when not yet scratched */}
              {scratchPercent < 10 && (
                <div className="absolute -bottom-2 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#E25875] border border-[#FFCAD4] text-xs font-semibold shadow-md animate-bounce">
                  <span>👆 Rub gently</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Revealed Love Quote and Info */}
      <AnimatePresence mode="wait">
        {isRevealed ? (
          <motion.div
            key={currentSurprise.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-3 space-y-2 max-w-sm mx-auto"
          >
            <h4 className="font-playfair-luxury text-xl sm:text-2xl font-bold text-[#3D0C1A] flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D] animate-pulse" />
              {currentSurprise.title}
            </h4>
            <p className="font-serif-luxury italic text-base sm:text-lg text-[#5A2030] leading-relaxed">
              “{currentSurprise.quote}”
            </p>
            <p className="text-xs text-[#8A4F60] font-light leading-snug">
              {currentSurprise.subtext}
            </p>

            {/* Action Buttons: Next Surprise or Re-scratch */}
            <div className="pt-3 flex items-center justify-center gap-2.5">
              <button
                onClick={nextSurprise}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4D6D] via-[#FF758F] to-[#E25875] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Scratch Another Note 🌸</span>
              </button>

              <button
                onClick={initCanvas}
                className="p-2 rounded-full bg-white text-[#8A4F60] border border-[#FFCAD4] text-xs font-medium shadow-sm hover:bg-[#FFF0F3] active:scale-95 cursor-pointer"
                title="Re-scratch this card"
                aria-label="Re-scratch this card"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Controls while still scratching */
          <div className="mt-2 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-xs text-[#8A4F60]">
              <span className="w-16 h-1.5 bg-[#FFCAD4]/50 rounded-full overflow-hidden inline-block">
                <span
                  className="h-full bg-gradient-to-r from-[#FF758F] to-[#FF4D6D] block transition-all duration-300"
                  style={{ width: `${Math.min(100, scratchPercent * 2.5)}%` }}
                />
              </span>
              <span>{scratchPercent}% scratched</span>
            </div>

            {/* Quick Tap to Scratch Button (Guarantee zero friction) */}
            <button
              onClick={handleCompleteReveal}
              className="mt-1 px-4 py-1.5 rounded-full bg-white/90 border border-[#FFCAD4] text-[#E25875] text-xs font-semibold shadow-sm hover:bg-[#FFF0F3] flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#FF758F]" />
              <span>Tap to Reveal Instantly ✨</span>
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
