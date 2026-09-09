"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "image" | "text">("default");
  const [cursorText, setCursorText] = useState("");
  const [bursts, setBursts] = useState<Particle[]>([]);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== "undefined") {
      const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouch(touchCheck);
      if (touchCheck) return;

      document.body.classList.add("has-custom-cursor");
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestImage = target.closest("[data-cursor='image'], .polaroid-card, img");
      const closestBtn = target.closest("button, a, [role='button'], [data-cursor='button']");
      const closestText = target.closest("h1, h2, h3, p, [data-cursor='text']");

      if (closestImage) {
        setCursorType("image");
        setCursorText("♡ View");
      } else if (closestBtn) {
        setCursorType("pointer");
        setCursorText("Let's go →");
      } else if (closestText) {
        setCursorType("text");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Spawn bursting hearts
      const colors = ["#FF758F", "#FFB3C1", "#FFD166", "#FF4D6D", "#C77DFF"];
      const newParticles: Particle[] = Array.from({ length: 7 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 80,
        vy: (Math.random() - 0.7) * 80,
        size: Math.random() * 8 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setBursts((prev) => [...prev.slice(-20), ...newParticles]);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  // Clean up bursts
  useEffect(() => {
    if (bursts.length === 0) return;
    const timeout = setTimeout(() => {
      setBursts((prev) => prev.slice(7));
    }, 600);
    return () => clearTimeout(timeout);
  }, [bursts]);

  if (isTouch) return null;

  return (
    <>
      {/* Click burst particles */}
      <AnimatePresence>
        {bursts.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.5 }}
            animate={{
              x: p.x + p.vx,
              y: p.y + p.vy,
              opacity: 0,
              scale: 1.2,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999]"
            style={{ color: p.color, fontSize: p.size }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor Dot / Pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 400,
          mass: 0.2,
        }}
      >
        {cursorType === "image" || cursorType === "pointer" ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3 py-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A1525]/90 text-[#FFF0F3] text-xs font-medium tracking-wide shadow-lg backdrop-blur-sm border border-[#FF8DA1]/30 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{cursorText}</span>
          </motion.div>
        ) : (
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2 relative flex items-center justify-center"
            animate={{
              scale: cursorType === "text" ? 1.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Soft outer glow */}
            <div className="absolute w-7 h-7 rounded-full bg-[#FF758F]/30 blur-md pointer-events-none" />
            {/* Glowing Heart Cursor */}
            <span className="text-[#FF4D6D] text-lg select-none drop-shadow-[0_2px_8px_rgba(255,117,143,0.8)] filter">
              ❤️
            </span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
