'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SphereField({ count = 1400, radius = 2.4 }: { count?: number; radius?: number }) {
  const points = useRef<THREE.Points>(null!);
  const startTime = useRef(performance.now());

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution — even point spacing without banding
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.06;
      pos[i * 3] = Math.cos(theta) * r * radius * jitter;
      pos[i * 3 + 1] = y * radius * jitter;
      pos[i * 3 + 2] = Math.sin(theta) * r * radius * jitter;
    }
    return pos;
  }, [count, radius]);

  useFrame(() => {
    if (!points.current) return;
    const t = (performance.now() - startTime.current) / 1000;
    points.current.rotation.y = t * 0.18;
    points.current.rotation.x = Math.sin(t * 0.15) * 0.15;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#6EE7B7" size={0.032} sizeAttenuation transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// A single canvas-drawn radial gradient, applied to a camera-facing sprite
// (not a UV-mapped sphere, not stacked transparent meshes) — this is the only
// approach that can't produce z-fighting seams, stepped rings, or rotation-
// skewed gradients, since a sprite is always a flat circle facing the camera.
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(209, 250, 229, 0.9)');
    gradient.addColorStop(0.35, 'rgba(110, 231, 183, 0.65)');
    gradient.addColorStop(0.7, 'rgba(34, 197, 139, 0.35)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function CoreGlow({ hovered }: { hovered: boolean }) {
  const sprite = useRef<THREE.Sprite>(null!);
  const scaleRef = useRef(5.2);
  const texture = useGlowTexture();

  useFrame(() => {
    if (!sprite.current) return;
    const target = hovered ? 5.7 : 5.2;
    scaleRef.current += (target - scaleRef.current) * 0.08;
    sprite.current.scale.setScalar(scaleRef.current);
  });

  return (
    <sprite ref={sprite} scale={[5.2, 5.2, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}

function Scene({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const scaleRef = useRef(1);
  const spinRef = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = hovered ? 1.16 : 1;
    scaleRef.current += (target - scaleRef.current) * 0.08;
    group.current.scale.setScalar(scaleRef.current);

    spinRef.current += (hovered ? 0.6 : 0.06) * delta;
    group.current.rotation.y = spinRef.current;
  });

  return (
    <group ref={group}>
      <CoreGlow hovered={hovered} />
      <SphereField />
    </group>
  );
}

export default function ParticleSphere() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-[340px] sm:h-[440px] lg:h-[560px] flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fixed square size per breakpoint (not aspect-ratio-computed) so the
          clip circle below always matches the canvas's actual box exactly. */}
      <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 7.4], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <Scene hovered={hovered} />
        </Canvas>
      </div>
    </div>
  );
}
