import * as THREE from 'three';
import {pyramid} from './pyramid';
import {lantern} from './lantern';

class PyramidAndCactusRoom extends THREE.Group {
  constructor() {
    super();

    this.addObject();
  }

  addObject() {
    pyramid.position.set(-15, -55, -770);
    pyramid.rotation.copy(
        new THREE.Euler(14 * THREE.Math.DEG2RAD, -1 * THREE.Math.DEG2RAD, 0),
        `XYZ`
    );
    lantern.position.set(352, -43, -600);
    lantern.rotation.copy(
        new THREE.Euler(15 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD, THREE.Math.DEG2RAD),
        `XYZ`
    );
    this.add(pyramid, lantern);
  }
}

export const pyramidAndCactusRoom = new PyramidAndCactusRoom();
