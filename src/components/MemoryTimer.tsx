"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function MemoryTimer() {
  const { DAYS_COUNT, TIMER_HEADING, TIMER_SUBTITLE } = SITE_CONFIG;
  const [timePassed, setTimePassed] = useState<TimeUnits>({
    days: DAYS_COUNT || 14,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      setTimePassed({
        days: DAYS_COUNT || 14,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [DAYS_COUNT]);

  return (
    <section className="relative py-24 md:py-32 px-4 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#FFF0F3] rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#FFCAD4]/60 text-[#9E3D52] text-xs font-semibold uppercase tracking-widest mb-4"
      >
        <Clock className="w-3.5 h-3.5 text-[#FF758F]" />
        <span>Timeless Moments</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A] mb-3"
      >
        {TIMER_HEADING}
      </motion.h2>

      <p className="text-sm md:text-base text-[#8A4F60] font-light max-w-md mx-auto mb-12">
        {TIMER_SUBTITLE}
      </p>

      {/* Timer Display */}
      {timePassed ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {[
            { label: "Days", value: timePassed.days },
            { label: "Hours", value: timePassed.hours },
            { label: "Minutes", value: timePassed.minutes },
            { label: "Seconds", value: timePassed.seconds },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-5 sm:p-6 border border-[#FFCAD4]/60 shadow-md text-center"
            >
              <div className="font-playfair-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#E25875]">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#8A4F60] font-medium mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-8 max-w-md mx-auto border border-[#FFCAD4]/60 text-[#4A1525] font-serif-luxury italic text-xl">
          “Counting the moments that matter…”
        </div>
      )}
    </section>
  );
}
