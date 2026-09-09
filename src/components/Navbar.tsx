"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Music } from "lucide-react";
import { sounds } from "@/utils/sound";

export default function Navbar({
  isAudioPlaying,
  onToggleAudio,
}: {
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    if (onToggleAudio) {
      onToggleAudio();
    } else {
      const muted = sounds.toggleMute();
      setIsMuted(muted);
    }
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Our Story", href: "#story" },
    { name: "Memories", href: "#memories" },
    { name: "Little Things", href: "#little-things" },
    { name: "Shayari", href: "#shayari" },
    { name: "Melody", href: "#music" },
    { name: "For You", href: "#letter" },
    { name: "Surprise", href: "#surprise" },
  ];

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-500`}
      >
        <nav
          className={`glass-nav px-5 py-3 rounded-full flex items-center justify-between gap-6 md:gap-10 transition-all duration-300 ${
            scrolled ? "shadow-md py-2.5 px-6" : ""
          } max-w-4xl w-full`}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-1.5 font-serif-luxury text-xl md:text-2xl font-bold tracking-tight text-[#4A1525] group"
          >
            <span className="group-hover:text-[#FF4D6D] transition-colors">M</span>
            <span className="text-[#FF4D6D] animate-pulse text-lg">❤️</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#4A1525]/80 hover:text-[#FF4D6D] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF758F] rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right actions: Audio Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Music pill button */}
            <button
              onClick={handleAudioToggle}
              className="px-3 py-1.5 rounded-full bg-[#FFF0F3] hover:bg-[#FFE3E8] text-[#4A1525] text-xs font-medium flex items-center gap-1.5 border border-[#FF8DA1]/30 transition-all duration-300 shadow-sm"
              title={isMuted ? "Play romantic ambient music" : "Mute music"}
              aria-label="Toggle ambient music"
            >
              <Music className={`w-3.5 h-3.5 ${!isMuted || isAudioPlaying ? "text-[#FF4D6D] animate-bounce" : "text-[#8A4F60]"}`} />
              <span className="hidden sm:inline">
                {!isMuted || isAudioPlaying ? "Sound On" : "Music"}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#4A1525] hover:bg-[#FFE3E8]/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 glass-nav rounded-3xl p-6 shadow-xl border border-[#FFCAD4]/50 md:hidden flex flex-col gap-4 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif-luxury font-medium text-[#4A1525] hover:text-[#FF4D6D] py-2 border-b border-[#FFCAD4]/30 last:border-none"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
