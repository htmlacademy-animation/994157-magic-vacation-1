import {BaseObject} from './base-object';
import * as THREE from 'three';
import {LatheObject} from './lathe-object';
import {COLORS_MAP} from '../config/colors';
import {MATERIAL_REFLECTIVITY} from '../config/material-reflectivity';
import {degreesToRadians} from '../utils';

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

    sphereMesh.castShadow = true;

    const ring = new LatheObject().createLatheGeometry(this.ring);
    const ringMesh = new THREE.Mesh(
        ring,
        this.createMaterial(this.ring.material)
    );
    ringMesh.castShadow = true;
    ringMesh.rotation.copy(new THREE.Euler(0, 0, degreesToRadians(18)), `XYZ`);

    this.ring.mesh = ringMesh;
    planet.add(sphereMesh, ringMesh);
    this.addAxisToNode(sphereMesh);

    return planet;
  }

  getRing() {
    return this.ring.mesh;
  }

  createMoon() {
    const sphere = new THREE.SphereGeometry(this.moon.radius, this.moon.segments, this.moon.segments);
    const sphereMesh = new THREE.Mesh(
        sphere,
        this.createMaterial(this.moon.material)
    );
    sphereMesh.castShadow = true;
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
    wireMesh.castShadow = true;
    return wireMesh;
  }

  addObject() {
    const planet = this.createPlanet();
    this.inner.add(planet);

    if (this.withMoon) {
      const moon = this.createMoon();
      const wire = this.createWire();
      wire.position.set(0, this.wire.height / 2, 0);
      moon.position.set(0, 120, 0);
      this.inner.add(moon, wire);
    }

    this.root.add(this.inner);
    this.add(this.root);
  }
}
