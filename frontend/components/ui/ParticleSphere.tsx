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
  const group = useRef<THREE.Group>(null!);
  const scaleRef = useRef(1);

  useFrame(() => {
    if (!group.current) return;
    const target = hovered ? 1.12 : 1;
    scaleRef.current += (target - scaleRef.current) * 0.08;
    group.current.scale.setScalar(scaleRef.current);
  });

  // Layered spheres of decreasing radius/increasing opacity, bright green at
  // the core fading to blue at the edge — approximates a radial gradient
  // "planet" fill without needing a custom shader/texture.
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.35, 32, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.06} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#22C58B" transparent opacity={0.14} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#6EE7B7" transparent opacity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshBasicMaterial color="#A7F3D0" transparent opacity={0.3} />
      </mesh>
    </group>
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
      <OrbitRing radius={2.6} tilt={[Math.PI / 2.4, 0, 0]} speed={0.12} color="#6EE7B7" opacity={0.3} />
      <OrbitRing radius={2.7} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.09} color="#3B82F6" opacity={0.22} />
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
      {/* Fixed square size per breakpoint (not aspect-ratio-computed) so the
          clip circle below always matches the canvas's actual box exactly —
          no stray rectangular sliver from a size mismatch. The gradient fill
          lives entirely in the 3D scene (CoreGlow) so nothing bleeds into
          the page background outside this circle. */}
      <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 7.4], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <Scene hovered={hovered} />
        </Canvas>
      </div>
    </div>
  );
}
