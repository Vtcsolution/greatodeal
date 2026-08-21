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

function CoreGlow({ hovered }: { hovered: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const scaleRef = useRef(1);

  useFrame(() => {
    if (!mesh.current) return;
    const target = hovered ? 1.12 : 1;
    scaleRef.current += (target - scaleRef.current) * 0.08;
    mesh.current.scale.setScalar(scaleRef.current);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.15, 32, 32]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.05} />
    </mesh>
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
      <OrbitRing radius={2.9} tilt={[Math.PI / 2.4, 0, 0]} speed={0.12} color="#6EE7B7" opacity={0.3} />
      <OrbitRing radius={3.3} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.09} color="#3B82F6" opacity={0.22} />
      <OrbitRing radius={2.5} tilt={[Math.PI / 3, -0.5, 0]} speed={0.16} color="#6EE7B7" opacity={0.18} />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-[65%] aspect-square rounded-full bg-[#6EE7B7]/10 blur-[100px] transition-all duration-700 ${hovered ? 'bg-[#6EE7B7]/20 blur-[100px] scale-110' : 'scale-100'}`} />
      </div>
      {/* Clipped to a true circle so nothing (rings viewed edge-on, etc.) can ever render past a round silhouette */}
      <div className="relative aspect-square h-full max-w-full rounded-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <Scene hovered={hovered} />
        </Canvas>
      </div>
    </div>
  );
}
