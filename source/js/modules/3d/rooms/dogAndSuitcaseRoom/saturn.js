import {BaseObject} from '../baseObject';
import * as THREE from 'three';
import {LatheObject} from '../latheObject';

class Saturn extends BaseObject {
  constructor() {
    super();

    this.planet = {
      radius: 60,
      color: `#FF0438`,
      segments: 40,
    };

    this.ring = {
      radius: 80,
      width: 40,
      height: 2,
      color: `#7F47EA`,
      segments: 40,
    };

    this.moon = {
      radius: 10,
      color: `#7F47EA`,
      segments: 40,
    };

    this.wire = {
      radius: 1,
      height: 1000,
      color: `#7C8DA9`,
      segments: 40,
    };

    this.addObject();
  }

  createPlanet() {
    const planet = new THREE.Group();
    const sphere = new THREE.SphereGeometry(this.planet.radius, this.planet.segments, this.planet.segments);
    const sphereMesh = new THREE.Mesh(
        sphere,
        this.createMaterial({color: this.planet.color})
    );
    this.addAxisToNode(sphereMesh);

    const ring = new LatheObject().createLatheGeometry(this.ring);
    const ringMesh = new THREE.Mesh(
        ring,
        this.createMaterial({color: this.ring.color})
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
        this.createMaterial({color: this.moon.color})
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
        this.createMaterial({color: this.wire.color})
    );
    this.addAxisToNode(wireMesh);
    return wireMesh;
  }

  addObject() {
    const planet = this.createPlanet();
    const moon = this.createMoon();
    const wire = this.createWire();
    wire.position.set(0, this.wire.height / 2, 0);
    moon.position.set(0, 120, 0);
    this.add(planet, moon, wire);
  }
}

export const saturn = new Saturn();
