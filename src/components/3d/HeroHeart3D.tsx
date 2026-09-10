"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "@/utils/sound";
import { Sparkles, Heart } from "lucide-react";

interface FloatingLove {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const SWEET_MESSAGES = [
  "Tap the heart for love ❤️",
  "You made my heart flutter, Meghna! 💖",
  "That smile of yours is pure magic ✨",
  "Thinking of you makes every day sweeter 🌸",
  "You have my whole heart! 🥰",
  "A little universe made just for you 🌙",
  "Infinite love, laughter & happiness for you 💕",
];

const EMOJIS = ["💖", "💕", "🌸", "✨", "💌", "🥰", "🍬", "🌹"];

export default function HeroHeart3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const heartMeshRef = useRef<THREE.Mesh | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingLove[]>([]);
  const [isBeating, setIsBeating] = useState(false);

  // Trigger heart pulse and floating love elements
  const handleHeartTap = () => {
    sounds.playHeartChime();
    setTapCount((prev) => prev + 1);
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 500);

    // Bounce mesh in Three.js
    if (heartMeshRef.current) {
      heartMeshRef.current.scale.set(1.18, 1.18, 1.18);
      setTimeout(() => {
        if (heartMeshRef.current) {
          heartMeshRef.current.scale.set(0.95, 0.95, 0.95);
        }
      }, 200);
    }

    // Spawn 6 burst particles
    const burstCount = 6;
    const newItems: FloatingLove[] = [];
    for (let i = 0; i < burstCount; i++) {
      newItems.push({
        id: Date.now() + Math.random(),
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 120,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      });
    }

    setFloatingHearts((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((item) => !newItems.includes(item)));
    }, 1800);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    if (width <= 0 || height <= 0) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create 3D Heart Geometry using Three.js Shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x, y + 1.2);
    heartShape.bezierCurveTo(x, y + 1.8, x - 1.2, y + 2.8, x - 2.4, y + 2.8);
    heartShape.bezierCurveTo(x - 3.8, y + 2.8, x - 3.8, y + 1.4, x - 3.8, y + 1.4);
    heartShape.bezierCurveTo(x - 3.8, y - 0.2, x - 2.4, y - 1.6, x, y - 3.4);
    heartShape.bezierCurveTo(x + 2.4, y - 1.6, x + 3.8, y - 0.2, x + 3.8, y + 1.4);
    heartShape.bezierCurveTo(x + 3.8, y + 1.4, x + 3.8, y + 2.8, x + 2.4, y + 2.8);
    heartShape.bezierCurveTo(x + 1.2, y + 2.8, x, y + 1.8, x, y + 1.2);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 3,
      bevelSize: 0.6,
      bevelThickness: 0.8,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Translucent pink glass material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FF758F"),
      emissive: new THREE.Color("#FF4D6D"),
      emissiveIntensity: 0.2,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.45,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.scale.set(0.95, 0.95, 0.95);
    heartMeshRef.current = heartMesh;
    scene.add(heartMesh);

    // Floating star particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPink = new THREE.Color("#FF8DA1");
    const colorGold = new THREE.Color("#FFD166");
    const colorWhite = new THREE.Color("#FFFFFF");

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? colorPink : (Math.random() > 0.5 ? colorGold : colorWhite);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const pointLightFront = new THREE.PointLight(0xff9ebb, 2.8, 30);
    pointLightFront.position.set(5, 5, 8);
    scene.add(pointLightFront);

    const pointLightBack = new THREE.PointLight(0xffe6a7, 2.2, 30);
    pointLightBack.position.set(-5, -5, -6);
    scene.add(pointLightBack);

    // Mouse movement tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener("resize", handleResize);

    // Animation loop with performance.now()
    let animId: number;
    let startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Idle floating bob with heartbeat rhythm
      const heartbeat = Math.sin(elapsedTime * 3.2) > 0.8 ? 0.05 : 0;
      heartMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.25 + heartbeat;

      // Smooth mouse rotation damping
      heartMesh.rotation.y += (targetRotY + Math.sin(elapsedTime * 0.8) * 0.15 - heartMesh.rotation.y) * 0.05;
      heartMesh.rotation.x += (targetRotX - heartMesh.rotation.x) * 0.05;

      // Rotate surrounding particles
      particles.rotation.y = elapsedTime * 0.12;
      particles.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1;

      // Scroll reactions
      const scrollFactor = Math.min(scrollY / 700, 1);
      heartMesh.position.z = -scrollFactor * 8;
      material.opacity = Math.max(0.92 - scrollFactor * 0.8, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const activeMsg = SWEET_MESSAGES[tapCount % SWEET_MESSAGES.length];

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* Interactive 3D Canvas wrapper */}
      <div
        ref={mountRef}
        onClick={handleHeartTap}
        className="w-full h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center cursor-pointer relative active:scale-95 transition-transform duration-200"
        aria-label="3D Interactive Floating Glass Heart for Meghna - Tap for love"
      >
        {/* Beating ripple ring aura when tapped */}
        {isBeating && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-40 h-40 rounded-full border-2 border-[#FF758F] bg-[#FFCAD4]/30 pointer-events-none blur-xs"
          />
        )}

        {/* Bursting love emoji particles */}
        <AnimatePresence>
          {floatingHearts.map((item) => (
            <motion.span
              key={item.id}
              initial={{ opacity: 1, scale: 0.5, x: item.x * 0.2, y: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0.8, 1.4, 1.1],
                x: item.x,
                y: item.y - 120,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute pointer-events-none text-2xl sm:text-3xl z-30 drop-shadow-md select-none"
            >
              {item.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Cute interactive badge and sweet message */}
      <motion.button
        type="button"
        onClick={handleHeartTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="z-20 -mt-6 sm:-mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#FFCAD4] shadow-md hover:shadow-lg text-[#8A3B4D] text-xs sm:text-sm font-medium transition-all group cursor-pointer"
      >
        <Heart className={`w-3.5 h-3.5 text-[#E25875] fill-[#FF758F] ${isBeating ? "animate-ping" : "animate-pulse"}`} />
        <span className="font-handwriting text-base sm:text-lg text-[#E25875] font-semibold">
          {activeMsg}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#FFB703] group-hover:rotate-12 transition-transform" />
      </motion.button>
    </div>
  );
}
