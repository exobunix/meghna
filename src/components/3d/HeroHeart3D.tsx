"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroHeart3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create 3D Heart Geometry using Three.js Shape
    const heartShape = new THREE.Shape();
    // Centered parametric heart curve
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
      emissiveIntensity: 0.15,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.45,
      transparent: true,
      opacity: 0.9,
      reflectivity: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.scale.set(0.95, 0.95, 0.95);
    scene.add(heartMesh);

    // Inner & Outer floating star particles
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
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLightFront = new THREE.PointLight(0xff9ebb, 2.5, 30);
    pointLightFront.position.set(5, 5, 8);
    scene.add(pointLightFront);

    const pointLightBack = new THREE.PointLight(0xffe6a7, 2.0, 30);
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle floating bob
      heartMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.25;

      // Smooth mouse rotation damping
      heartMesh.rotation.y += (targetRotY + Math.sin(elapsedTime * 0.8) * 0.15 - heartMesh.rotation.y) * 0.05;
      heartMesh.rotation.x += (targetRotX - heartMesh.rotation.x) * 0.05;

      // Rotate surrounding particles
      particles.rotation.y = elapsedTime * 0.12;
      particles.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1;

      // Scroll reactions: heart moves back and slightly down
      const scrollFactor = Math.min(scrollY / 700, 1);
      heartMesh.position.z = -scrollFactor * 8;
      material.opacity = Math.max(0.9 - scrollFactor * 0.8, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[360px] md:h-[460px] flex items-center justify-center pointer-events-none select-none relative"
      aria-label="3D Floating Glass Heart for Meghna"
    />
  );
}
