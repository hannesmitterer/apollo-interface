# Hologram Components

This directory contains hologram visualization components for the Apollo Hologram Euystacio framework.

## Installation

```bash
npm install three @react-three/fiber @react-three/drei
```

## Components

### HologramClone (React Three Fiber)

Creates a lightweight, visual replica of a 3D object with holographic styling.

```tsx
import { HologramClone } from './components';

<HologramClone
  modelUrl="/models/my-model.glb"
  scale={1}
  spinSpeed={0.2}
  hologramColor={0x00ffff}
  opacity={0.45}
  emissiveIntensity={0.8}
  position={[0, 0, 0]}
  active={true}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelUrl` | `string` | required | URL of GLTF/GLB model |
| `scale` | `number` | `1` | Scale factor |
| `spinSpeed` | `number` | `0.2` | Rotation speed (rad/s) |
| `hologramColor` | `string \| number` | `0x00ffff` | Hologram color |
| `opacity` | `number` | `0.45` | Opacity (0-1) |
| `emissiveIntensity` | `number` | `0.8` | Glow intensity |
| `position` | `[x, y, z]` | `[0, 0, 0]` | 3D position |
| `active` | `boolean` | `true` | Visibility toggle |

### HologramScene (React Three Fiber)

Complete scene setup with lighting, controls, and hologram display.

```tsx
import { HologramScene } from './components';

<HologramScene
  modelUrl="/models/my-model.glb"
  backgroundColor="#0d1117"
  showGrid={true}
  enableControls={true}
/>
```

### HologramClone.js (Vanilla Three.js)

For use with existing Three.js setups (no React).

```javascript
// Create hologram from existing object
const hologram = new HologramClone({
  sourceObject: myMesh,
  scale: 1,
  spinSpeed: 0.2,
  hologramColor: 0x00ffff,
  opacity: 0.45,
});

scene.add(hologram.getObject3D());

// Or create a geometric hologram
const geoHologram = new HologramClone();
geoHologram.createGeometricHologram('icosahedron', { size: 1 });
scene.add(geoHologram.getObject3D());

// Update in animation loop
function animate() {
  const delta = clock.getDelta();
  hologram.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

## Holographic Effect Features

- **Transparency**: Semi-transparent appearance (default 45% opacity)
- **Emissive Glow**: Cyan glow effect for holographic look
- **Spin Animation**: Configurable rotation speed
- **No Z-Fighting**: Proper depth write settings
- **Clone-Based**: Doesn't modify original model

## Integration with Apollo Framework

The hologram components integrate with the Apollo Hologram Euystacio ethical framework:

```javascript
const { ApolloHologramEuystacio } = require('../core/apollo-hologram.js');
const { HologramClone } = require('./HologramClone.js');

// Initialize Apollo system
const apollo = new ApolloHologramEuystacio();
await apollo.initialize();

// Create hologram visualization
const hologram = new HologramClone({
  sourceObject: nexusCore, // The 3D nexus object
  hologramColor: 0x00ffff,
});

// Hologram updates based on Apollo system state
apollo.on('state_change', (state) => {
  if (state.joyIndex > 0.8) {
    hologram.setColor(0x00ff00); // Green for high joy
  } else {
    hologram.setColor(0x00ffff); // Cyan default
  }
});
```
