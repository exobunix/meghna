"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center select-none pointer-events-none group">
      {/* Background track line */}
      <div className="w-[2px] h-36 md:h-48 bg-[#FFD1DC]/40 rounded-full relative overflow-hidden backdrop-blur-sm">
        {/* Filled progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#FF758F] to-[#C77DFF] origin-top rounded-full"
          style={{ height: "100%", scaleY }}
        />
      </div>

      {/* Traveling Heart Indicator */}
      <motion.div
        className="absolute w-8 h-8 -left-3 flex items-center justify-center pointer-events-auto cursor-pointer"
        style={{
          top: `calc(${percent}% * 0.9 + 5%)`,
        }}
        title={`Love journey: ${percent}%`}
      >
        <span className="text-sm md:text-base filter drop-shadow-[0_2px_6px_rgba(255,117,143,0.7)] transition-transform duration-300 hover:scale-125">
          {percent >= 98 ? "💖" : "❤️"}
        </span>
      </motion.div>
    </div>
  );
}
