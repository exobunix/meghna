"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LittleMessage from "@/components/LittleMessage";
import LoveScene3D from "@/components/3d/LoveScene3D";
import StoryTimeline from "@/components/StoryTimeline";
import MemoryCarousel from "@/components/MemoryCarousel";
import PhotoWall from "@/components/PhotoWall";
import LoveCards from "@/components/LoveCards";
import InteractiveHeart from "@/components/InteractiveHeart";
import SunsetWishSection from "@/components/SunsetWishSection";
import VideoSection from "@/components/VideoSection";
import SplitStory from "@/components/SplitStory";
import ShayariSection from "@/components/ShayariSection";
import LoveNotesWall from "@/components/LoveNotesWall";
import MusicPlayer from "@/components/MusicPlayer";
import EnvelopeLetter from "@/components/EnvelopeLetter";
import ScrapbookWall from "@/components/ScrapbookWall";
import DreamSection from "@/components/DreamSection";
import MemoryTimer from "@/components/MemoryTimer";
import FinalSurprise from "@/components/FinalSurprise";
import Footer from "@/components/Footer";
import { sounds } from "@/utils/sound";

export default function Home() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleGlobalAudio = () => {
    const isMuted = sounds.toggleMute();
    setIsPlayingAudio(!isMuted);
  };

  return (
    <main className="relative min-h-screen bg-[#FFFDFB] text-[#2A121A] selection:bg-[#FFB3C1] selection:text-[#3D0C1A]">
      {/* 1. Cinematic Loading Intro */}
      <LoadingScreen />

      {/* 2. Custom Heart Cursor */}
      <CustomCursor />

      {/* 3. Floating Hearts & Sparkles Particle Canvas */}
      <ParticleBackground />

      {/* 4. Scroll Traveling Heart Progress Indicator */}
      <ScrollProgress />

      {/* 5. Minimal Frosted Glass Navigation */}
      <Navbar
        isAudioPlaying={isPlayingAudio}
        onToggleAudio={handleToggleGlobalAudio}
      />

      {/* 6. Hero Section with 3D Glass Heart & Floating Particles */}
      <Hero />

      {/* 7. "A Little Message" Poetic Opening */}
      <LittleMessage />

      {/* 8. Large Immersive 3D Dream Love Scene (Clouds, Moon, Stars, Floating Hearts) */}
      <div className="max-w-6xl mx-auto px-4">
        <LoveScene3D />
      </div>

      {/* 9. "Our Little Story" Animated Timeline */}
      <StoryTimeline />

      {/* 10. Photo Memory Carousel & Lightbox */}
      <MemoryCarousel />

      {/* 11. 3D Photo Wall Floating Scrapbook in Dreamy Space */}
      <PhotoWall />

      {/* 12. "Things I Love About You" 6 Floating Cards */}
      <LoveCards />

      {/* 13. Interactive Heart ("Tap the Heart ❤️") with Multistate Messages & Confetti */}
      <InteractiveHeart />

      {/* 14. "If I Could Give You Anything…" Sunset Staggered Reveal */}
      <SunsetWishSection />

      {/* 15. Fullscreen Romantic Video Section */}
      <VideoSection />

      {/* 16. Photo + Message Split Section */}
      <SplitStory />

      {/* 17. Dedicated Animated Shayari Section for Meghna */}
      <ShayariSection />

      {/* 18. "Our Playlist" Bollywood & Sanam Songs with YouTube Player */}
      <MusicPlayer
        isPlaying={isPlayingAudio}
        setIsPlaying={setIsPlayingAudio}
      />

      {/* 19. Living Love Capsule & Memory Vault (MongoDB & ImageKit) */}
      <LoveNotesWall />

      {/* 20. Wax-Sealed Opening Envelope & Handwritten Letter */}
      <EnvelopeLetter />

      {/* 19. Scrapbook Polaroid Wall with Washi Tape */}
      <ScrapbookWall />

      {/* 20. Dream Section: Starry Night Sky & Clickable Secret Star Wishes */}
      <DreamSection />

      {/* 21. Live Ticking Memory / Relationship Counter */}
      <MemoryTimer />

      {/* 22. Final Surprise Particle Explosion & Climax */}
      <FinalSurprise />

      {/* 23. Minimal Romantic Footer with 5-Click Secret Message */}
      <Footer />
    </main>
  );
}
