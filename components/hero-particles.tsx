"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle Three.js particle field for the hero only.
 * - small white dots at 0.3 opacity drifting slowly upward
 * - device pixel ratio capped at 1.5
 * - pauses when the hero leaves the viewport or the tab is hidden
 * - skipped entirely for prefers-reduced-motion
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let raf = 0;
    let running = false;

    const start = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
      camera.position.z = 12;

      // round sprite texture so particles are soft dots, not squares
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = 32;
      spriteCanvas.height = 32;
      const ctx = spriteCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      const sprite = new THREE.CanvasTexture(spriteCanvas);

      const COUNT = 130;
      const positions = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 26;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        speeds[i] = 0.004 + Math.random() * 0.009;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 0.14,
        map: sprite,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        sizeAttenuation: true,
        color: 0xffffff,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const resize = () => {
        const parent = canvas.parentElement;
        if (!parent) return;
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const tick = () => {
        if (disposed) return;
        if (running) {
          const pos = geometry.getAttribute("position");
          const arr = pos.array as Float32Array;
          for (let i = 0; i < COUNT; i++) {
            arr[i * 3 + 1] += speeds[i];
            if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -9;
          }
          pos.needsUpdate = true;
          renderer.render(scene, camera);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const io = new IntersectionObserver(
        (entries) => {
          running = entries[0]?.isIntersecting ?? false;
        },
        { threshold: 0.02 },
      );
      io.observe(canvas);

      const onVisibility = () => {
        running = !document.hidden && running;
      };
      document.addEventListener("visibilitychange", onVisibility);

      const cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        io.disconnect();
        geometry.dispose();
        material.dispose();
        sprite.dispose();
        renderer.dispose();
      };
      (canvas as HTMLCanvasElement & { __cleanup?: () => void }).__cleanup = cleanup;
    };

    void start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      const cleanup = (canvas as HTMLCanvasElement & { __cleanup?: () => void }).__cleanup;
      if (cleanup) cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />;
}
