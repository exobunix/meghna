"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LoveScene3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Fog for soft depth
    scene.fog = new THREE.FogExp2(0xfff5f7, 0.035);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffb7c5, 3, 40);
    mainLight.position.set(6, 6, 8);
    scene.add(mainLight);

    const goldLight = new THREE.PointLight(0xffe5b4, 2, 30);
    goldLight.position.set(-6, -3, 6);
    scene.add(goldLight);

    // 1. Glowing Moon
    const moonGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xfff9e6,
      emissive: 0xfff0b3,
      emissiveIntensity: 0.6,
      roughness: 0.4,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(5.5, 3.2, -4);
    scene.add(moon);

    // Moon soft halo
    const haloGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffeab8,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
    });
    const moonHalo = new THREE.Mesh(haloGeo, haloMat);
    moon.add(moonHalo);

    // 2. Dreamy Clouds (Procedural grouped soft puff spheres)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      transparent: true,
      opacity: 0.82,
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
    ];

    // 3. Floating 3D Hearts
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

    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xff6b8b,
      emissive: 0xff4d6d,
      emissiveIntensity: 0.2,
      transmission: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    });

    interface HeartObj {
      mesh: THREE.Mesh;
      initY: number;
      speed: number;
      rotSpeed: number;
    }

    const floatingHearts: HeartObj[] = [];
    const heartPositions = [
      { x: -3.2, y: 0.5, z: 2, scale: 0.45 },
      { x: 2.8, y: 1.2, z: 1.5, scale: 0.55 },
      { x: 0.2, y: -1.2, z: 3, scale: 0.65 },
      { x: -1.8, y: -2.0, z: 0.5, scale: 0.35 },
      { x: 3.5, y: -1.5, z: -1, scale: 0.4 },
    ];

    heartPositions.forEach((pos, idx) => {
      const hMesh = new THREE.Mesh(heartGeo, heartMat);
      hMesh.position.set(pos.x, pos.y, pos.z);
      hMesh.scale.set(pos.scale, pos.scale, pos.scale);
      hMesh.rotation.z = (Math.random() - 0.5) * 0.4;
      scene.add(hMesh);
      floatingHearts.push({
        mesh: hMesh,
        initY: pos.y,
        speed: 1.2 + idx * 0.3,
        rotSpeed: (Math.random() - 0.5) * 0.015,
      });
    });

    // 4. Star & Flower Petal Particles
    const starCount = 180;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xffd1dc,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera parallax
      camera.position.x += (mouseX * 1.8 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Float clouds
      clouds.forEach((c, idx) => {
        c.position.x += Math.sin(elapsedTime * 0.3 + idx) * 0.003;
        c.position.y += Math.cos(elapsedTime * 0.4 + idx) * 0.002;
      });

      // Float & rotate hearts
      floatingHearts.forEach((h) => {
        h.mesh.position.y = h.initY + Math.sin(elapsedTime * h.speed) * 0.3;
        h.mesh.rotation.y += h.rotSpeed;
      });

      // Moon subtle rotation
      moon.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      heartGeo.dispose();
      heartMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      cloudMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] md:h-[580px] rounded-3xl overflow-hidden glass-card my-12 border border-[#FFCAD4]/40 shadow-xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating Section Title Overlay */}
      <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between pointer-events-none z-10">
        <div>
          <span className="font-handwriting text-xl md:text-2xl text-[#E25875] font-semibold">
            a dreamy little corner
          </span>
          <h3 className="font-playfair-luxury text-2xl md:text-3xl font-bold text-[#3D0C1A]">
            Floating in Our Universe ✨
          </h3>
        </div>
        <p className="text-xs md:text-sm text-[#8A4F60] font-light mt-1 sm:mt-0 max-w-xs">
          Move your cursor around to gently sway the clouds and floating hearts.
        </p>
      </div>
    </div>
  );
}
