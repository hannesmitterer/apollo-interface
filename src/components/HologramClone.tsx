/**
 * HologramClone Component
 * 
 * Creates a lightweight, visual replica of a 3D object that can be
 * rendered in 3D space with holographic styling (semi-transparent,
 * emissive cyan glow, optional spin animation).
 * 
 * Part of the Apollo Hologram Euystacio framework.
 * 
 * Dependencies:
 * - three
 * - @react-three/fiber
 * - @react-three/drei
 */

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Color, Group, MeshStandardMaterial } from "three";
import { useGLTF } from "@react-three/drei";

export type HologramCloneProps = {
  /** URL of a GLTF/GLB model */
  modelUrl: string;
  /** Scale factor for the hologram */
  scale?: number;
  /** Optional rotation speed (radians per second) */
  spinSpeed?: number;
  /** Hologram color (default: cyan) */
  hologramColor?: string | number;
  /** Opacity level (0-1) */
  opacity?: number;
  /** Emissive intensity */
  emissiveIntensity?: number;
  /** Position in 3D space */
  position?: [number, number, number];
  /** Whether the hologram is active/visible */
  active?: boolean;
};

export const HologramClone: React.FC<HologramCloneProps> = ({
  modelUrl,
  scale = 1,
  spinSpeed = 0.2,
  hologramColor = 0x00ffff,
  opacity = 0.45,
  emissiveIntensity = 0.8,
  position = [0, 0, 0],
  active = true,
}) => {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(modelUrl);

  // Apply holographic material to all meshes
  useEffect(() => {
    if (!active) return;

    scene.traverse((obj) => {
      if ((obj as Mesh).isMesh) {
        const mesh = obj as Mesh;
        const originalMaterial = mesh.material as MeshStandardMaterial;
        
        // Clone material to avoid affecting original
        const hologramMaterial = originalMaterial.clone() as MeshStandardMaterial;
        
        // Apply holographic properties
        hologramMaterial.transparent = true;
        hologramMaterial.opacity = opacity;
        hologramMaterial.emissive = new Color(hologramColor);
        hologramMaterial.emissiveIntensity = emissiveIntensity;
        hologramMaterial.depthWrite = false; // Avoid z-fight with real objects
        
        mesh.material = hologramMaterial;
      }
    });
  }, [scene, active, hologramColor, opacity, emissiveIntensity]);

  // Simple spin animation
  useFrame((_, delta) => {
    if (group.current && active && spinSpeed !== 0) {
      group.current.rotation.y += spinSpeed * delta;
    }
  });

  if (!active) return null;

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
};

/**
 * Preload a GLTF model for faster initial rendering
 */
export const preloadHologram = (modelUrl: string) => {
  useGLTF.preload(modelUrl);
};

export default HologramClone;
