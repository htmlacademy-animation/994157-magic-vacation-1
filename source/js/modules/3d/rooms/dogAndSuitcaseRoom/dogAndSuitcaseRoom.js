import * as THREE from 'three';
import {rug} from './rug';
import {saturn} from './saturn';

class DogAndSuitcaseRoom extends THREE.Group {
  constructor() {
    super();

    this.addObject();
  }

  addObject() {
    rug.scale.set(0.7, 0.7, 0.7);
    rug.position.set(-20, 0, -540);
    rug.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 45 * THREE.Math.DEG2RAD, 180 * THREE.Math.DEG2RAD), `XYZ`);
    saturn.scale.set(0.9, 0.9, 0.9);
    saturn.position.set(55, 220, -540);
    this.add(rug, saturn);
  }
}

export const dogAndSuitcaseRoom = new DogAndSuitcaseRoom();
