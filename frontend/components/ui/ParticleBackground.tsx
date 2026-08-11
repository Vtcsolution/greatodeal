'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTime = useRef(performance.now());

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(({ pointer }) => {
    if (!mesh.current) return;
    const t = (performance.now() - startTime.current) / 1000;

    mouseRef.current.x += (pointer.x * 2 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y * 2 - mouseRef.current.y) * 0.02;

    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] = originalPositions[i3] + Math.sin(t * 0.3 + i * 0.01) * 0.15 + mouseRef.current.x * 0.3;
      posArray[i3 + 1] = originalPositions[i3 + 1] + Math.cos(t * 0.2 + i * 0.015) * 0.15 + mouseRef.current.y * 0.3;
      posArray[i3 + 2] = originalPositions[i3 + 2] + Math.sin(t * 0.15 + i * 0.008) * 0.1;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = t * 0.015;
    mesh.current.rotation.x = t * 0.008;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null!);
  const startTime = useRef(performance.now());

  useFrame(() => {
    if (!group.current) return;
    const t = (performance.now() - startTime.current) / 1000;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.4 + i * 1.5) * 2;
      child.position.x = Math.cos(t * 0.3 + i * 1.2) * 3;
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} position={[(i - 2) * 2.5, 0, -5 + i * -1]}>
          <sphereGeometry args={[0.06 + i * 0.01, 16, 16]} />
          <meshBasicMaterial color="#6EE7B7" transparent opacity={0.3 - i * 0.04} />
        </mesh>
      ))}
    </group>
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
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <Particles count={400} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
