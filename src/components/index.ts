/**
 * Hologram Components - Index
 * 
 * Exports all hologram-related components for the Apollo interface.
 * 
 * React Three Fiber Components (TypeScript):
 * - HologramClone: Create holographic clones of 3D models
 * - HologramScene: Complete scene setup with hologram display
 * 
 * Vanilla Three.js Components (JavaScript):
 * - HologramClone (JS): Compatible with existing Three.js setup
 */

// React Three Fiber components
export { HologramClone, preloadHologram } from './HologramClone';
export type { HologramCloneProps } from './HologramClone';

export { HologramScene } from './HologramScene';
export type { HologramSceneProps } from './HologramScene';

// Default export
export { HologramClone as default } from './HologramClone';
