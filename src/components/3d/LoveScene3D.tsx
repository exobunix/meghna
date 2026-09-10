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
  isHeartHit: boolean;
}

const HEART_TAP_WORDS = [
  "You tapped Meghna's Heart! 💖",
  "Dil Ki Dhadkan ✨",
  "My Favorite Smile 🥰",
  "Pure Magic 🌸",
  "Beating Just For You 💕",
  "Sweetest Angel 👑",
  "Infinite Love ❤️",
  "You Make Life Beautiful 🌹",
];

const SKY_WISH_WORDS = [
  "Pari 🌸",
  "Muskaan ✨",
  "Sweet Dreams 🌙",
  "Sweetheart 🍬",
  "Always Cherished 💖",
  "Meghna ❤️",
];

export default function LoveScene3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [wishes, setWishes] = useState<StarWishBubble[]>([]);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  const spawnWishBubble = (x: number, y: number, isHeartHit: boolean) => {
    const wordList = isHeartHit ? HEART_TAP_WORDS : SKY_WISH_WORDS;
    const word = wordList[activeWordIdx % wordList.length];
    setActiveWordIdx((prev) => prev + 1);

    const newWish: StarWishBubble = {
      id: Date.now() + Math.random(),
      x,
      y,
      word,
      isHeartHit,
    };

    setWishes((prev) => [...prev, newWish]);
    setTimeout(() => {
      setWishes((prev) => prev.filter((w) => w.id !== newWish.id));
    }, 2200);
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
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "pointer";
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

    // 3. Floating 3D Hearts (Each with individual interactive materials)
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

    interface HeartObj {
      mesh: THREE.Mesh;
      material: THREE.MeshPhysicalMaterial;
      baseScale: number;
      currentScale: number;
      targetScale: number;
      initY: number;
      initX: number;
      speed: number;
      rotSpeed: number;
    }

    const floatingHearts: HeartObj[] = [];
    const heartPositions = [
      { x: -3.2, y: 0.5, z: 2, scale: 0.52, color: 0xff6b8b },
      { x: 2.8, y: 1.2, z: 1.5, scale: 0.58, color: 0xff8fa3 },
      { x: 0.2, y: -1.2, z: 3, scale: 0.72, color: 0xff4d6d },
      { x: -1.8, y: -2.0, z: 0.5, scale: 0.44, color: 0xffb3c1 },
      { x: 3.5, y: -1.5, z: -1, scale: 0.48, color: 0xff758f },
      { x: -4.2, y: 1.8, z: -2, scale: 0.42, color: 0xff9ebb },
      { x: 1.2, y: 2.8, z: 1.0, scale: 0.55, color: 0xff4d6d },
    ];

    heartPositions.forEach((pos, idx) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: pos.color,
        emissive: 0xff4d6d,
        emissiveIntensity: 0.25,
        transmission: 0.82,
        roughness: 0.18,
        transparent: true,
        opacity: 0.9,
      });

      const hMesh = new THREE.Mesh(heartGeo, mat);
      hMesh.position.set(pos.x, pos.y, pos.z);
      hMesh.scale.set(pos.scale, pos.scale, pos.scale);
      hMesh.rotation.z = (Math.random() - 0.5) * 0.4;
      scene.add(hMesh);

      floatingHearts.push({
        mesh: hMesh,
        material: mat,
        baseScale: pos.scale,
        currentScale: pos.scale,
        targetScale: pos.scale,
        initY: pos.y,
        initX: pos.x,
        speed: 1.2 + idx * 0.25,
        rotSpeed: (Math.random() - 0.5) * 0.02,
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

    // 5. Shooting Star
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

    // Raycaster for Heart Clicking / Tapping
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2();
    let mouseX = 0;
    let mouseY = 0;

    // Direct Canvas Interaction for Tapping the Hearts
    const handleCanvasInteraction = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      mouseNorm.x = (clickX / rect.width) * 2 - 1;
      mouseNorm.y = -(clickY / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNorm, camera);
      const meshes = floatingHearts.map((h) => h.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        // Tapped directly on one of the 3D hearts!
        const hitMesh = intersects[0].object as THREE.Mesh;
        const heartObj = floatingHearts.find((h) => h.mesh === hitMesh);

        if (heartObj) {
          // Bouncy scale jump
          heartObj.targetScale = heartObj.baseScale * 1.9;
          heartObj.mesh.rotation.y += Math.PI * 1.5;
          heartObj.mesh.rotation.z += 0.4;
          heartObj.material.emissiveIntensity = 1.1;

          sounds.playHeartChime();
          spawnWishBubble(clickX, clickY, true);
          return;
        }
      }

      // If clicked anywhere else in the scene, pulse closest heart and chime
      let closestHeart = floatingHearts[0];
      let minDist = 999;
      floatingHearts.forEach((h) => {
        const screenPos = h.mesh.position.clone().project(camera);
        const sx = ((screenPos.x + 1) * rect.width) / 2;
        const sy = ((-screenPos.y + 1) * rect.height) / 2;
        const d = Math.hypot(sx - clickX, sy - clickY);
        if (d < minDist) {
          minDist = d;
          closestHeart = h;
        }
      });

      if (closestHeart) {
        closestHeart.targetScale = closestHeart.baseScale * 1.45;
        closestHeart.material.emissiveIntensity = 0.8;
      }

      sounds.playStarTwinkle();
      spawnWishBubble(clickX, clickY, false);
    };

    const onPointerDown = (e: PointerEvent) => {
      handleCanvasInteraction(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Hover reaction over hearts
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNorm, camera);
      const meshes = floatingHearts.map((h) => h.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      floatingHearts.forEach((h) => {
        if (intersects.length > 0 && intersects[0].object === h.mesh) {
          h.targetScale = Math.max(h.targetScale, h.baseScale * 1.25);
          h.material.emissiveIntensity = Math.max(h.material.emissiveIntensity, 0.6);
        }
      });
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);

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

      // Float & animate interactive hearts
      floatingHearts.forEach((h, i) => {
        h.mesh.position.y = h.initY + Math.sin(elapsedTime * h.speed) * 0.35;
        h.mesh.position.x = h.initX + Math.cos(elapsedTime * 0.8 + i) * 0.15;
        h.mesh.rotation.y += h.rotSpeed;
        h.mesh.rotation.z += Math.sin(elapsedTime * 0.5 + i) * 0.003;

        // Smooth spring physics for tapped / hovered scale
        h.currentScale += (h.targetScale - h.currentScale) * 0.15;
        h.mesh.scale.set(h.currentScale, h.currentScale, h.currentScale);

        // Gradually ease target scale back to baseScale
        if (Math.abs(h.targetScale - h.baseScale) > 0.005) {
          h.targetScale += (h.baseScale - h.targetScale) * 0.06;
        }

        // Gradually ease emissive back to gentle resting glow
        if (h.material.emissiveIntensity > 0.25) {
          h.material.emissiveIntensity -= 0.02;
        }
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
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      heartGeo.dispose();
      floatingHearts.forEach((h) => h.material.dispose());
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
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer touch-none"
        aria-label="Interactive 3D Dream Love Scene - Tap the floating hearts"
      />

      {/* Bursting sweet wish bubbles on heart tap */}
      <AnimatePresence>
        {wishes.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.5, x: w.x, y: w.y }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1.25, 1.05],
              y: w.y - 95,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className={`absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 border ${
              w.isHeartHit
                ? "bg-gradient-to-r from-[#FF4D6D] via-[#FF758F] to-[#E25875] text-white border-white/60 shadow-[#FF758F]/40 scale-105"
                : "bg-white/95 text-[#3D0C1A] border-[#FFCAD4] shadow-md"
            }`}
          >
            {w.isHeartHit ? (
              <Heart className="w-4 h-4 text-white fill-white animate-bounce" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#FF758F]" />
            )}
            <span className="font-handwriting text-base sm:text-xl font-bold">
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
        <div className="mt-2 sm:mt-0 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#FFCAD4] shadow-sm">
          <Heart className="w-4 h-4 text-[#E25875] fill-[#FF758F] animate-pulse" />
          <p className="text-xs sm:text-sm text-[#8A4F60] font-semibold">
            Tap any floating heart! 💖
          </p>
        </div>
      </div>
    </div>
  );
}
