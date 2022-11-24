import {BaseObject} from './base-object';
import * as THREE from 'three';
import {LatheObject} from './lathe-object';
import {COLORS_MAP} from '../config/colors';
import {MATERIAL_REFLECTIVITY} from '../config/material-reflectivity';

export class Saturn extends BaseObject {
  constructor({isShadowed, withMoon = true}) {
    super();
    this.withMoon = withMoon;

    this.planet = {
      radius: 60,
      segments: 40,
      material: {
        color: isShadowed ? COLORS_MAP.ShadowedDominantRed : COLORS_MAP.DominantRed,
        ...MATERIAL_REFLECTIVITY.soft
      }
    };

    this.ring = {
      radius: 80,
      width: 40,
      height: 2,
      segments: 40,
      material: {
        color: isShadowed ? COLORS_MAP.ShadowedBrightPurple : COLORS_MAP.BrightPurple,
        ...MATERIAL_REFLECTIVITY.soft
      }
    };

    this.moon = {
      radius: 10,
      segments: 40,
      material: {
        color: isShadowed ? COLORS_MAP.ShadowedBrightPurple : COLORS_MAP.BrightPurple,
        ...MATERIAL_REFLECTIVITY.soft
      }
    };

    this.wire = {
      radius: 1,
      height: 1000,
      segments: 40,
      material: {
        color: COLORS_MAP.MetalGrey,
        ...MATERIAL_REFLECTIVITY.soft
      }
    };

    this.addObject();
  }

  createPlanet() {
    const planet = new THREE.Group();
    const sphere = new THREE.SphereGeometry(this.planet.radius, this.planet.segments, this.planet.segments);
    const sphereMesh = new THREE.Mesh(
        sphere,
        this.createMaterial(this.planet.material)
    );
    this.addAxisToNode(sphereMesh);

    const ring = new LatheObject().createLatheGeometry(this.ring);
    const ringMesh = new THREE.Mesh(
        ring,
        this.createMaterial(this.ring.material)
    );
    ringMesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);
    this.addAxisToNode(ringMesh);

    planet.add(sphereMesh, ringMesh);

    return planet;
  }

  createMoon() {
    const sphere = new THREE.SphereGeometry(this.moon.radius, this.moon.segments, this.moon.segments);
    const sphereMesh = new THREE.Mesh(
        sphere,
        this.createMaterial(this.moon.material)
    );
    this.addAxisToNode(sphereMesh);
    return sphereMesh;
  }

  createWire() {
    const wire = new THREE.CylinderGeometry(
        this.wire.radius,
        this.wire.radius,
        this.wire.height,
        this.wire.segments
    );
    const wireMesh = new THREE.Mesh(
        wire,
        this.createMaterial(this.wire.material)
    );
    this.addAxisToNode(wireMesh);
    return wireMesh;
  }

  addObject() {
    const planet = this.createPlanet();
    this.add(planet);

    if (this.withMoon) {
      const moon = this.createMoon();
      const wire = this.createWire();
      wire.position.set(0, this.wire.height / 2, 0);
      moon.position.set(0, 120, 0);
      this.add(moon, wire);
    }
  }
}
