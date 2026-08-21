'use client';

import React, { useRef, useMemo } from 'react';
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

function OrbitRing({ radius, tilt, speed, color, opacity = 0.3 }: { radius: number; tilt: [number, number, number]; speed: number; color: string; opacity?: number }) {
  const ring = useRef<THREE.Mesh>(null!);
  const startTime = useRef(performance.now());

  useFrame(() => {
    if (!ring.current) return;
    const t = (performance.now() - startTime.current) / 1000;
    ring.current.rotation.z = t * speed;
  });

  return (
    <mesh ref={ring} rotation={tilt}>
      <torusGeometry args={[radius, 0.006, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function CoreGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.15, 32, 32]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.07} />
    </mesh>
  );
}

export default function ParticleSphere() {
  return (
    <div className="relative w-full h-[340px] sm:h-[440px] lg:h-[560px] pointer-events-none">
      <div className="absolute inset-0 rounded-full bg-[#6EE7B7]/10 blur-[100px]" />
      <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <CoreGlow />
        <SphereField />
        <OrbitRing radius={2.9} tilt={[Math.PI / 2.4, 0, 0]} speed={0.12} color="#6EE7B7" opacity={0.3} />
        <OrbitRing radius={3.3} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.09} color="#3B82F6" opacity={0.22} />
        <OrbitRing radius={2.5} tilt={[Math.PI / 3, -0.5, 0]} speed={0.16} color="#6EE7B7" opacity={0.18} />
      </Canvas>
    </div>
  );
}
