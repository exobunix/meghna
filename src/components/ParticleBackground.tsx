"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  rotation: number;
  rotSpeed: number;
  type: "heart" | "sparkle";
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    const colors = [
      "rgba(255, 141, 161, ",
      "rgba(255, 182, 193, ",
      "rgba(244, 187, 211, ",
      "rgba(255, 209, 220, ",
      "rgba(235, 190, 245, ",
    ];

    const particleCount = Math.min(Math.floor(width / 45), 35);
    const particles: Particle[] = [];

    const createParticle = (initialRandomY = false): Particle => {
      const isSparkle = Math.random() < 0.25;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      const maxOpacity = isSparkle ? Math.random() * 0.4 + 0.3 : Math.random() * 0.35 + 0.15;

      return {
        x: Math.random() * width,
        y: initialRandomY ? Math.random() * height : height + 20,
        size: isSparkle ? Math.random() * 3 + 2 : Math.random() * 12 + 8,
        speedY: Math.random() * 0.6 + 0.25,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: initialRandomY ? Math.random() * maxOpacity : 0.01,
        maxOpacity,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        type: isSparkle ? "sparkle" : "heart",
        color: baseColor,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(
        0, 0,
        -size / 2, 0,
        -size / 2, topCurveHeight
      );
      context.bezierCurveTo(
        -size / 2, (size + topCurveHeight) / 2,
        0, (size + topCurveHeight) / 1.6,
        0, size
      );
      context.bezierCurveTo(
        0, (size + topCurveHeight) / 1.6,
        size / 2, (size + topCurveHeight) / 2,
        size / 2, topCurveHeight
      );
      context.bezierCurveTo(
        size / 2, 0,
        0, 0,
        0, topCurveHeight
      );
      context.closePath();
      context.fillStyle = color + opacity + ")";
      context.fill();
      context.restore();
    };

    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(0, size);
        context.lineTo(size * 0.25, size * 0.25);
        context.rotate(Math.PI / 2);
      }
      context.closePath();
      context.fillStyle = color + opacity + ")";
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        // Fade in and out
        if (p.y > height - 100) {
          p.opacity = Math.min(p.opacity + 0.01, p.maxOpacity);
        } else if (p.y < 120) {
          p.opacity = Math.max(p.opacity - 0.01, 0);
        }

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        }

        if (p.y < -30 || p.opacity <= 0) {
          particles[idx] = createParticle(false);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
