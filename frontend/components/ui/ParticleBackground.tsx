'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ARMS = 3;
const ARM_SPREAD = 0.55;
const SPIRAL_TIGHTNESS = 0.32;

function GalaxyField({ count = 2200, maxRadius = 11 }: { count?: number; maxRadius?: number }) {
  const points = useRef<THREE.Points>(null!);
  const scrollRef = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const inner = new THREE.Color('#E7FFF4');
    const mid = new THREE.Color('#6EE7B7');
    const outer = new THREE.Color('#3B82F6');

    for (let i = 0; i < count; i++) {
      const arm = i % ARMS;
      const t = Math.pow(Math.random(), 1.5); // bias density toward the core
      const r = t * maxRadius;
      const armAngle = (arm / ARMS) * Math.PI * 2;
      const spiralAngle = armAngle + r * SPIRAL_TIGHTNESS;
      const spread = (Math.random() - 0.5) * ARM_SPREAD * (0.4 + t);
      const angle = spiralAngle + spread;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (0.6 + (1 - t) * 0.4);
      pos[i * 3 + 2] = Math.sin(angle) * r;

      const mixed = t < 0.35 ? inner.clone().lerp(mid, t / 0.35) : mid.clone().lerp(outer, (t - 0.35) / 0.65);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count, maxRadius]);

  useFrame(() => {
    if (!points.current) return;
    const t = (performance.now() - startTime.current) / 1000;
    points.current.rotation.y = t * 0.02 + scrollRef.current * Math.PI * 1.4;
    points.current.rotation.x = -1.1 + scrollRef.current * 0.3;
  });

  return (
    <points ref={points} rotation={[-1.1, 0, 0.3]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors sizeAttenuation transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 14], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <GalaxyField />
      </Canvas>
    </div>
  );
}
