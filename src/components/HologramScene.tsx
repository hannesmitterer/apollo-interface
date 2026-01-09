/**
 * HologramScene - React Three Fiber Scene with Hologram Display
 * 
 * A complete scene setup for rendering hologram visualization with
 * proper lighting, camera controls, and environment.
 * 
 * Part of the Apollo Hologram Euystacio framework.
 */

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Holographic icosahedron that rotates
 */
const HologramNexus: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshPhongMaterial
        color="#d4af37"
        wireframe={true}
        transparent={true}
        opacity={0.4}
        emissive="#d4af37"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
};

/**
 * Holographic lighting setup
 */
const HologramLighting: React.FC = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#d4af37" />
  </>
);

/**
 * Main HologramScene component
 */
export const HologramScene: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <HologramLighting />
        <HologramNexus />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default HologramScene;
