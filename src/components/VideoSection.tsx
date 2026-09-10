"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export default function VideoSection() {
  const { quote, poster, videoUrl } = SITE_CONFIG.VIDEO_SECTION;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative py-24 md:py-36 px-4 max-w-5xl mx-auto overflow-hidden">
      <div className="text-center mb-10">
        <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-1">
          A Moving Memory
        </span>
        <h2 className="font-playfair-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D0C1A]">
          Moments in Motion
        </h2>
        <p className="mt-2 text-sm md:text-base text-[#8A4F60] font-light max-w-md mx-auto">
          Tap unmute to hear the music and enjoy this sweet clip.
        </p>
      </div>

      {/* Centered Reel Frame Container */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[9/16] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-[#FFCAD4] bg-black group">
          {/* Ambient Video Backdrop */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt="" className="w-full h-full object-cover blur-md opacity-30 scale-110" />
          </div>

          {/* Ambient Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={poster}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-contain relative z-10"
          />

          {/* Subtle Film Grain SVG filter overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />

          {/* Bottom Romantic Caption */}
          <div className="absolute bottom-16 left-4 right-4 z-20 text-center text-white pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-playfair-luxury text-lg sm:text-xl font-medium leading-snug italic text-white/95 drop-shadow-md">
                “{quote}”
              </p>
              <span className="font-handwriting text-xl text-[#FFCAD4] mt-1 block">
                Meghna ❤️
              </span>
            </motion.div>
          </div>

          {/* Playback Controls Overlay */}
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/25 transition-all shadow-md hover:scale-105"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              className={`p-2.5 rounded-full backdrop-blur-md border border-white/25 transition-all shadow-md hover:scale-105 ${
                !isMuted ? "bg-[#FF4D6D] text-white" : "bg-black/50 hover:bg-black/80 text-white"
              }`}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
