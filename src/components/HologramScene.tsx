/**
 * HologramScene - React Three Fiber Scene with Hologram Display
 * 
 * A complete scene setup for rendering hologram clones with
 * proper lighting, camera controls, and environment.
 * 
 * Part of the Apollo Hologram Euystacio framework.
 */

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, Html } from "@react-three/drei";
import { HologramClone } from "./HologramClone";

export type HologramSceneProps = {
  /** URL of a GLTF/GLB model to display as hologram */
  modelUrl?: string;
  /** Background color */
  backgroundColor?: string;
  /** Whether to show grid floor */
  showGrid?: boolean;
  /** Whether to enable orbit controls */
  enableControls?: boolean;
  /** Children components */
  children?: React.ReactNode;
};

/**
 * Loading fallback component
 */
const LoadingFallback: React.FC = () => (
  <Html center>
    <div style={{
      color: '#00ffff',
      fontSize: '1.2em',
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '8px',
      border: '1px solid #00ffff',
    }}>
      <div style={{ marginBottom: '10px' }}>⟳</div>
      Initializing Hologram...
    </div>
  </Html>
);

/**
 * Holographic grid floor
 */
const HolographicGrid: React.FC = () => (
  <Grid
    position={[0, -1, 0]}
    args={[20, 20]}
    cellSize={0.5}
    cellThickness={0.5}
    cellColor="#00ffff"
    sectionSize={3}
    sectionThickness={1}
    sectionColor="#0088ff"
    fadeDistance={30}
    fadeStrength={1}
    followCamera={false}
    infiniteGrid={true}
  />
);

/**
 * Ambient holographic lighting setup
 */
const HologramLighting: React.FC = () => (
  <>
    <ambientLight intensity={0.3} />
    <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
    <spotLight
      position={[0, 10, 0]}
      angle={0.3}
      penumbra={1}
      intensity={0.5}
      color="#00ffff"
      castShadow
    />
  </>
);

/**
 * Main HologramScene component
 */
export const HologramScene: React.FC<HologramSceneProps> = ({
  modelUrl,
  backgroundColor = "#0d1117",
  showGrid = true,
  enableControls = true,
  children,
}) => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [3, 3, 3], fov: 60 }}
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <HologramLighting />
          
          {showGrid && <HolographicGrid />}
          
          {modelUrl && (
            <HologramClone
              modelUrl={modelUrl}
              scale={1}
              spinSpeed={0.2}
              hologramColor={0x00ffff}
              opacity={0.45}
              emissiveIntensity={0.8}
              position={[0, 0, 0]}
            />
          )}
          
          {children}
          
          {enableControls && (
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={20}
            />
          )}
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HologramScene;
