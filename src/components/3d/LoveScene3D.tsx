"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Moon, Star } from "lucide-react";
import { sounds } from "@/utils/sound";

interface StarWishBubble {
  id: number;
  x: number;
  y: number;
  word: string;
}

const WISH_WORDS = [
  "Pari 🌸",
  "Muskaan ✨",
  "Dil Ki Dhadkan 💖",
  "My Universe 🌙",
  "Sweetheart 🍬",
  "Cutest Smile 🥰",
  "Cherished Always 🌹",
  "Meghna ❤️",
];

export default function LoveScene3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [wishes, setWishes] = useState<StarWishBubble[]>([]);
  const [activeWishIndex, setActiveWishIndex] = useState(0);

  const handleSpawnWish = (clientX: number, clientY: number) => {
    sounds.playStarTwinkle();
    if (!mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const word = WISH_WORDS[activeWishIndex % WISH_WORDS.length];
    setActiveWishIndex((prev) => prev + 1);

    const newWish: StarWishBubble = {
      id: Date.now() + Math.random(),
      x,
      y,
      word,
    };

    setWishes((prev) => [...prev, newWish]);
    setTimeout(() => {
      setWishes((prev) => prev.filter((w) => w.id !== newWish.id));
    }, 2200);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    handleSpawnWish(e.clientX, e.clientY);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 500;
    if (width <= 0 || height <= 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Fog for dreamy atmosphere
    scene.fog = new THREE.FogExp2(0xfff5f7, 0.032);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffb7c5, 3.2, 40);
    mainLight.position.set(6, 6, 8);
    scene.add(mainLight);

    const goldLight = new THREE.PointLight(0xffe5b4, 2.5, 30);
    goldLight.position.set(-6, -3, 6);
    scene.add(goldLight);

    // 1. Glowing Moon with Soft Halo
    const moonGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xfff9e6,
      emissive: 0xffe699,
      emissiveIntensity: 0.65,
      roughness: 0.35,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(5.5, 3.2, -4);
    scene.add(moon);

    const haloGeo = new THREE.SphereGeometry(2.1, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffeab8,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
    });
    const moonHalo = new THREE.Mesh(haloGeo, haloMat);
    moon.add(moonHalo);

    // 2. Procedural Dream Clouds
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.85,
      transparent: true,
      opacity: 0.85,
    });

    const createCloud = (x: number, y: number, z: number, scale: number) => {
      const cloudGroup = new THREE.Group();
      const puffGeo = new THREE.SphereGeometry(0.8, 16, 16);

      const puffs = [
        { x: 0, y: 0, z: 0, s: 1 },
        { x: 0.7, y: 0.2, z: -0.1, s: 0.8 },
        { x: -0.7, y: 0.1, z: 0.1, s: 0.85 },
        { x: 0.3, y: 0.5, z: 0, s: 0.7 },
        { x: -0.4, y: 0.4, z: -0.1, s: 0.75 },
      ];

      puffs.forEach((p) => {
        const puff = new THREE.Mesh(puffGeo, cloudMat);
        puff.position.set(p.x, p.y, p.z);
        puff.scale.set(p.s, p.s, p.s);
        cloudGroup.add(puff);
      });

      cloudGroup.position.set(x, y, z);
      cloudGroup.scale.set(scale, scale, scale);
      scene.add(cloudGroup);
      return cloudGroup;
    };

    const clouds = [
      createCloud(-5.5, 2.5, -2, 1.2),
      createCloud(4.2, -2.2, 0, 1.4),
      createCloud(-3.8, -3.0, -1, 1.1),
      createCloud(1.5, 3.8, -3, 0.9),
      createCloud(-1.0, 4.2, -4, 1.0),
    ];

    // 3. Floating 3D Hearts with Multiple Loving Shades
    const heartShape = new THREE.Shape();
    const hx = 0, hy = 0;
    heartShape.moveTo(hx, hy + 0.8);
    heartShape.bezierCurveTo(hx, hy + 1.2, hx - 0.8, hy + 1.8, hx - 1.5, hy + 1.8);
    heartShape.bezierCurveTo(hx - 2.4, hy + 1.8, hx - 2.4, hy + 0.9, hx - 2.4, hy + 0.9);
    heartShape.bezierCurveTo(hx - 2.4, hy - 0.1, hx - 1.5, hy - 1.0, hx, hy - 2.1);
    heartShape.bezierCurveTo(hx + 1.5, hy - 1.0, hx + 2.4, hy - 0.1, hx + 2.4, hy + 0.9);
    heartShape.bezierCurveTo(hx + 2.4, hy + 0.9, hx + 2.4, hy + 1.8, hx + 1.5, hy + 1.8);
    heartShape.bezierCurveTo(hx + 0.8, hy + 1.8, hx, hy + 1.2, hx, hy + 0.8);

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.2,
      bevelThickness: 0.3,
    });
    heartGeo.center();

    const heartMatRose = new THREE.MeshPhysicalMaterial({
      color: 0xff6b8b,
      emissive: 0xff4d6d,
      emissiveIntensity: 0.25,
      transmission: 0.82,
      roughness: 0.18,
      transparent: true,
      opacity: 0.88,
    });

    const heartMatGold = new THREE.MeshPhysicalMaterial({
      color: 0xffc2d1,
      emissive: 0xff8fa3,
      emissiveIntensity: 0.2,
      transmission: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
    });

    interface HeartObj {
      mesh: THREE.Mesh;
      initY: number;
      initX: number;
      speed: number;
      rotSpeed: number;
    }

    const floatingHearts: HeartObj[] = [];
    const heartPositions = [
      { x: -3.2, y: 0.5, z: 2, scale: 0.45, mat: heartMatRose },
      { x: 2.8, y: 1.2, z: 1.5, scale: 0.55, mat: heartMatGold },
      { x: 0.2, y: -1.2, z: 3, scale: 0.65, mat: heartMatRose },
      { x: -1.8, y: -2.0, z: 0.5, scale: 0.38, mat: heartMatGold },
      { x: 3.5, y: -1.5, z: -1, scale: 0.42, mat: heartMatRose },
      { x: -4.2, y: 1.8, z: -2, scale: 0.35, mat: heartMatGold },
      { x: 1.2, y: 2.8, z: 1.0, scale: 0.48, mat: heartMatRose },
    ];

    heartPositions.forEach((pos, idx) => {
      const hMesh = new THREE.Mesh(heartGeo, pos.mat);
      hMesh.position.set(pos.x, pos.y, pos.z);
      hMesh.scale.set(pos.scale, pos.scale, pos.scale);
      hMesh.rotation.z = (Math.random() - 0.5) * 0.4;
      scene.add(hMesh);
      floatingHearts.push({
        mesh: hMesh,
        initY: pos.y,
        initX: pos.x,
        speed: 1.2 + idx * 0.25,
        rotSpeed: (Math.random() - 0.5) * 0.018,
      });
    });

    // 4. Star Dust Field
    const starCount = 220;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 32;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0xffd1dc,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. Shooting Star / Comet
    const shootingStarGeo = new THREE.BufferGeometry();
    const ssPositions = new Float32Array([0, 0, 0, -2.5, 1.2, -0.5]);
    shootingStarGeo.setAttribute("position", new THREE.BufferAttribute(ssPositions, 3));
    const shootingStarMat = new THREE.LineBasicMaterial({
      color: 0xffe5b4,
      transparent: true,
      opacity: 0,
    });
    const shootingStar = new THREE.Line(shootingStarGeo, shootingStarMat);
    scene.add(shootingStar);

    let shootingStarActive = false;
    let ssProgress = 0;

    // Mouse & Touch Tracking
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener("resize", onResize);

    // Animation Loop with performance.now()
    let animId: number;
    let startTime = performance.now();
    let nextShootingStarTime = 2.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Camera parallax
      camera.position.x += (mouseX * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Float clouds gently
      clouds.forEach((c, idx) => {
        c.position.x += Math.sin(elapsedTime * 0.3 + idx) * 0.003;
        c.position.y += Math.cos(elapsedTime * 0.4 + idx) * 0.002;
      });

      // Float & rotate hearts with organic sway
      floatingHearts.forEach((h, i) => {
        h.mesh.position.y = h.initY + Math.sin(elapsedTime * h.speed) * 0.35;
        h.mesh.position.x = h.initX + Math.cos(elapsedTime * 0.8 + i) * 0.15;
        h.mesh.rotation.y += h.rotSpeed;
        h.mesh.rotation.z += Math.sin(elapsedTime * 0.5 + i) * 0.003;
      });

      // Moon subtle rotation & glowing breathing halo
      moon.rotation.y = elapsedTime * 0.05;
      const haloScale = 1.0 + Math.sin(elapsedTime * 1.5) * 0.08;
      moonHalo.scale.set(haloScale, haloScale, haloScale);

      // Shooting star trigger
      if (elapsedTime > nextShootingStarTime && !shootingStarActive) {
        shootingStarActive = true;
        ssProgress = 0;
        shootingStar.position.set(
          (Math.random() - 0.5) * 14 + 4,
          (Math.random() - 0.5) * 6 + 4,
          -2
        );
        shootingStarMat.opacity = 0.9;
        nextShootingStarTime = elapsedTime + 4 + Math.random() * 5;
      }

      if (shootingStarActive) {
        ssProgress += 0.035;
        shootingStar.position.x -= 0.5;
        shootingStar.position.y -= 0.25;
        shootingStarMat.opacity = Math.max(0, 0.9 - ssProgress * 1.2);
        if (ssProgress >= 1.0) {
          shootingStarActive = false;
          shootingStarMat.opacity = 0;
        }
      }

      // Star field slow rotation
      starField.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      heartGeo.dispose();
      heartMatRose.dispose();
      heartMatGold.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      cloudMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      shootingStarGeo.dispose();
      shootingStarMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-3xl overflow-hidden glass-card my-12 border border-[#FFCAD4]/40 shadow-xl select-none group">
      {/* 3D Canvas with pointer handler */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        className="w-full h-full cursor-pointer touch-none"
        aria-label="Interactive 3D Dream Love Scene - Tap to spawn loving wish bubbles"
      />

      {/* Bursting sweet wish bubbles on tap/click */}
      <AnimatePresence>
        {wishes.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.6, x: w.x, y: w.y }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.7, 1.15, 1],
              y: w.y - 80,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/95 border border-[#FFCAD4] shadow-md backdrop-blur-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
            <span className="font-handwriting text-base sm:text-lg text-[#E25875] font-bold">
              {w.word}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Section Title Overlay */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 md:left-10 md:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between pointer-events-none z-10">
        <div>
          <span className="font-handwriting text-lg sm:text-xl md:text-2xl text-[#E25875] font-semibold flex items-center gap-1.5">
            <Moon className="w-4 h-4 text-[#FFB703] inline fill-[#FFD166]/40" />
            a dreamy little corner
          </span>
          <h3 className="font-playfair-luxury text-2xl sm:text-3xl font-bold text-[#3D0C1A]">
            Floating in Our Universe ✨
          </h3>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FFCAD4]/60 shadow-xs">
          <Star className="w-3.5 h-3.5 text-[#FFB703] fill-[#FFB703] animate-spin" style={{ animationDuration: "8s" }} />
          <p className="text-xs sm:text-sm text-[#8A4F60] font-medium">
            Tap anywhere to send a loving wish 🌸
          </p>
        </div>
      </div>
    </div>
  );
}
