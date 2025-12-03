/**
 * HologramClone - Vanilla JavaScript/Three.js Implementation
 * 
 * Creates a lightweight, visual replica of a 3D object with holographic styling.
 * Compatible with the existing Three.js setup in the Apollo interface.
 * 
 * Part of the Apollo Hologram Euystacio framework.
 * 
 * Note: Requires THREE to be available globally (via CDN) or as a module import.
 */

// Handle THREE.js in different environments
let THREE;
if (typeof window !== 'undefined' && window.THREE) {
  // Browser with global THREE
  THREE = window.THREE;
} else if (typeof require !== 'undefined') {
  // Node.js/CommonJS
  try {
    THREE = require('three');
  } catch (e) {
    // THREE not installed, create mock for testing
    THREE = {
      Group: class Group {
        constructor() {
          this.position = { x: 0, y: 0, z: 0, set: () => {}, copy: () => {} };
          this.scale = { x: 1, y: 1, z: 1, set: () => {} };
          this.rotation = { x: 0, y: 0, z: 0 };
          this.visible = true;
          this.children = [];
        }
        add() {}
        traverse() {}
        clone() { return this; }
      },
      Color: class Color {
        constructor(color) { this.value = color; }
      },
      SphereGeometry: class SphereGeometry { dispose() {} },
      BoxGeometry: class BoxGeometry { dispose() {} },
      IcosahedronGeometry: class IcosahedronGeometry { dispose() {} },
      MeshBasicMaterial: class MeshBasicMaterial { 
        constructor(opts) { Object.assign(this, opts); }
        dispose() {}
      },
      Mesh: class Mesh {
        constructor(geo, mat) {
          this.geometry = geo;
          this.material = mat;
          this.isMesh = true;
        }
      },
      Vector3: class Vector3 {
        constructor(x, y, z) { this.x = x; this.y = y; this.z = z; }
      }
    };
  }
}

class HologramClone {
  /**
   * Create a new HologramClone instance
   * @param {Object} options - Configuration options
   * @param {THREE.Object3D} options.sourceObject - The source 3D object to clone
   * @param {number} [options.scale=1] - Scale factor for the hologram
   * @param {number} [options.spinSpeed=0.2] - Rotation speed (radians per second)
   * @param {number|string} [options.hologramColor=0x00ffff] - Hologram color
   * @param {number} [options.opacity=0.45] - Opacity level (0-1)
   * @param {number} [options.emissiveIntensity=0.8] - Emissive intensity
   * @param {THREE.Vector3|Array} [options.position=[0,0,0]] - Position in 3D space
   */
  constructor(options = {}) {
    this.scale = options.scale || 1;
    this.spinSpeed = options.spinSpeed || 0.2;
    this.hologramColor = options.hologramColor || 0x00ffff;
    this.opacity = options.opacity || 0.45;
    this.emissiveIntensity = options.emissiveIntensity || 0.8;
    this.position = options.position || [0, 0, 0];
    this.active = true;
    
    this.group = null;
    this.sourceObject = options.sourceObject || null;
    
    if (this.sourceObject) {
      this.createHologram(this.sourceObject);
    }
  }

  /**
   * Create a holographic clone of the source object
   * @param {THREE.Object3D} sourceObject - The object to clone
   * @returns {THREE.Group} The hologram group
   */
  createHologram(sourceObject) {
    // Create a group to hold the hologram
    this.group = new THREE.Group();
    
    // Clone the source object
    const clone = sourceObject.clone(true);
    
    // Apply holographic material to all meshes
    clone.traverse((obj) => {
      if (obj.isMesh) {
        const hologramMaterial = this._createHologramMaterial(obj.material);
        obj.material = hologramMaterial;
      }
    });
    
    // Set scale and position
    this.group.scale.set(this.scale, this.scale, this.scale);
    
    if (Array.isArray(this.position)) {
      this.group.position.set(this.position[0], this.position[1], this.position[2]);
    } else {
      this.group.position.copy(this.position);
    }
    
    this.group.add(clone);
    
    return this.group;
  }

  /**
   * Create a holographic material from the original material
   * @param {THREE.Material} originalMaterial - The original material
   * @returns {THREE.Material} The holographic material
   */
  _createHologramMaterial(originalMaterial) {
    // Clone the original material
    const hologramMaterial = originalMaterial.clone();
    
    // Apply holographic properties
    hologramMaterial.transparent = true;
    hologramMaterial.opacity = this.opacity;
    hologramMaterial.depthWrite = false; // Avoid z-fight with real objects
    
    // Set emissive properties if supported
    if ('emissive' in hologramMaterial) {
      hologramMaterial.emissive = new THREE.Color(this.hologramColor);
      hologramMaterial.emissiveIntensity = this.emissiveIntensity;
    }
    
    // Add wireframe overlay effect for extra holographic look
    if ('wireframe' in hologramMaterial) {
      // Keep solid but slightly wireframe-ish
      hologramMaterial.wireframe = false;
    }
    
    return hologramMaterial;
  }

  /**
   * Create a simple geometric hologram (sphere, cube, etc.)
   * @param {string} type - The geometry type ('sphere', 'cube', 'icosahedron')
   * @param {Object} options - Geometry options
   * @returns {THREE.Group} The hologram group
   */
  createGeometricHologram(type = 'icosahedron', options = {}) {
    this.group = new THREE.Group();
    
    let geometry;
    const size = options.size || 1;
    const detail = options.detail || 2;
    
    switch (type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(size, 32, 32);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
      case 'icosahedron':
      default:
        geometry = new THREE.IcosahedronGeometry(size, detail);
        break;
    }
    
    // Create holographic material
    const material = new THREE.MeshBasicMaterial({
      color: this.hologramColor,
      transparent: true,
      opacity: this.opacity,
      wireframe: true,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    // Set scale and position
    this.group.scale.set(this.scale, this.scale, this.scale);
    
    if (Array.isArray(this.position)) {
      this.group.position.set(this.position[0], this.position[1], this.position[2]);
    } else {
      this.group.position.copy(this.position);
    }
    
    this.group.add(mesh);
    
    return this.group;
  }

  /**
   * Update the hologram (call in animation loop)
   * @param {number} delta - Time delta since last frame
   */
  update(delta) {
    if (this.group && this.active && this.spinSpeed !== 0) {
      this.group.rotation.y += this.spinSpeed * delta;
    }
  }

  /**
   * Set the hologram active state
   * @param {boolean} active - Whether the hologram is active
   */
  setActive(active) {
    this.active = active;
    if (this.group) {
      this.group.visible = active;
    }
  }

  /**
   * Set the hologram color
   * @param {number|string} color - The new color
   */
  setColor(color) {
    this.hologramColor = color;
    
    if (this.group) {
      this.group.traverse((obj) => {
        if (obj.isMesh) {
          if ('emissive' in obj.material) {
            obj.material.emissive = new THREE.Color(color);
          }
          if ('color' in obj.material) {
            obj.material.color = new THREE.Color(color);
          }
        }
      });
    }
  }

  /**
   * Set the hologram opacity
   * @param {number} opacity - The new opacity (0-1)
   */
  setOpacity(opacity) {
    this.opacity = opacity;
    
    if (this.group) {
      this.group.traverse((obj) => {
        if (obj.isMesh) {
          obj.material.opacity = opacity;
        }
      });
    }
  }

  /**
   * Get the Three.js group for this hologram
   * @returns {THREE.Group} The hologram group
   */
  getObject3D() {
    return this.group;
  }

  /**
   * Dispose of the hologram and its resources
   */
  dispose() {
    if (this.group) {
      this.group.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
      
      if (this.group.parent) {
        this.group.parent.remove(this.group);
      }
    }
    
    this.group = null;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HologramClone };
}

// Browser global export
if (typeof window !== 'undefined') {
  window.HologramClone = HologramClone;
}
