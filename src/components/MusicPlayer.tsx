"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Music, Heart } from "lucide-react";
import { SITE_CONFIG, BollywoodSongItem } from "@/data/config";
import { sounds } from "@/utils/sound";

export default function MusicPlayer({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}) {
  const songs = SITE_CONFIG.BOLLYWOOD_SONGS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [youtubeActive, setYoutubeActive] = useState(false);

  const currentSong = songs[currentIdx];

  const handlePlaySong = (index: number) => {
    setCurrentIdx(index);
    setIsPlaying(true);
    setYoutubeActive(true);
    sounds.playHeartChime();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setYoutubeActive(false);
    } else {
      setIsPlaying(true);
      setYoutubeActive(true);
      sounds.playHeartChime();
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + songs.length) % songs.length;
    setCurrentIdx(prevIdx);
    if (isPlaying) setYoutubeActive(true);
    sounds.playHeartChime();
  };

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % songs.length;
    setCurrentIdx(nextIdx);
    if (isPlaying) setYoutubeActive(true);
    sounds.playHeartChime();
  };

  return (
    <section id="music" className="relative py-28 md:py-36 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Dynamic Background Glow when Playing */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 -z-10 ${
          isPlaying ? "bg-[#FFCAD4]/60 scale-110" : "bg-[#FFE5EC]/30 scale-90"
        }`}
      />

      <div className="text-center mb-14">
        <span className="font-handwriting text-2xl md:text-3xl text-[#E25875] font-semibold block mb-2">
          Sweet Bollywood Melodies
        </span>
        <h2 className="font-playfair-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D0C1A]">
          Songs that feel a little like you{" "}
          <span className="inline-block animate-bounce text-2xl md:text-4xl">🎵</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-[#8A4F60] font-light max-w-lg mx-auto">
          Handpicked romantic Bollywood & Sanam melodies dedicated to Meghna. Tap any song to play the real music!
        </p>
      </div>

      {/* Main Active Player Kiosk */}
      <div className="glass-card rounded-3xl p-6 md:p-8 mb-12 border border-[#FFCAD4]/60 shadow-xl max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Rotating Vinyl & Meghna's Cover Art */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 bg-[#FFF0F3] border-2 border-[#FFCAD4]/70 group">
            <Image
              src={currentSong.cover}
              alt=""
              fill
              className="object-cover blur-xs opacity-25 scale-110 pointer-events-none"
              sizes="160px"
            />
            <Image
              src={currentSong.cover}
              alt={currentSong.title}
              fill
              className="object-contain p-1 relative z-10"
              sizes="160px"
            />

            {/* Pulsing Equalizer Bars when Playing */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center gap-1 backdrop-blur-xs">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["6px", "28px", "8px"] }}
                    transition={{
                      duration: 0.5 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 bg-[#FF8DA1] rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Song Information & Controls */}
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E25875] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#FFCAD4]/40">
                {currentSong.movieOrAlbum} • {currentSong.tag}
              </span>
              <Heart className="w-5 h-5 text-[#FF4D6D] fill-[#FF4D6D] animate-pulse" />
            </div>

            <h3 className="font-playfair-luxury text-2xl sm:text-3xl font-bold text-[#3D0C1A]">
              {currentSong.title}
            </h3>
            <p className="text-sm md:text-base text-[#8A4F60] font-medium mb-4">
              {currentSong.artist}
            </p>

            {/* Playback Controls */}
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full hover:bg-[#FFF0F3] text-[#4A1525] transition-colors border border-transparent hover:border-[#FFCAD4]"
                aria-label="Previous song"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E25875] via-[#FF758F] to-[#FF4D6D] text-white flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm font-semibold"
                aria-label={isPlaying ? "Pause" : "Play"}
                data-cursor="button"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPlaying ? "Pause Song" : "Play Song"}</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full hover:bg-[#FFF0F3] text-[#4A1525] transition-colors border border-transparent hover:border-[#FFCAD4]"
                aria-label="Next song"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Responsive YouTube Player */}
        <AnimatePresence>
          {youtubeActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-[#FFCAD4]/40 overflow-hidden"
            >
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&enablejsapi=1`}
                  title={`${currentSong.title} - ${currentSong.artist}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {songs.map((song, idx) => {
          const isCurrent = idx === currentIdx;
          return (
            <div
              key={song.id}
              onClick={() => handlePlaySong(idx)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                isCurrent && isPlaying
                  ? "bg-white/95 border-[#FF758F] shadow-lg scale-[1.02]"
                  : "glass-card border-[#FFCAD4]/40 hover:border-[#FFCAD4] hover:bg-white/80"
              }`}
              data-cursor="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FFF0F3] flex-shrink-0 border border-[#FFCAD4]/50">
                  <Image src={song.cover} alt="" fill className="object-cover blur-xs opacity-25 scale-110 pointer-events-none" sizes="50px" />
                  <Image src={song.cover} alt={song.title} fill className="object-contain p-0.5 relative z-10" sizes="50px" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif-luxury font-bold text-[#3D0C1A] text-base leading-tight truncate">
                    {song.title}
                  </h4>
                  <p className="text-xs text-[#8A4F60] truncate">{song.artist}</p>
                  <span className="text-[10px] text-[#FF758F] font-semibold block mt-0.5">
                    {song.movieOrAlbum}
                  </span>
                </div>
              </div>

              <button
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isCurrent && isPlaying
                    ? "bg-[#E25875] text-white animate-pulse"
                    : "bg-[#FFF0F3] text-[#E25875] hover:bg-[#FFE3E8]"
                }`}
                aria-label="Play song"
              >
                {isCurrent && isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
