import * as THREE from 'three';
import {snowMan} from './snowman';

class ShowmanAndCompassRoom extends THREE.Group {
  constructor() {
    super();
    this.addObjects();
  }

  addObjects() {
    snowMan.position.set(-130, -115, -770);
    snowMan.rotation.copy(
        new THREE.Euler(20 * THREE.Math.DEG2RAD, 60 * THREE.Math.DEG2RAD, 0),
        `XYZ`
    );
    this.add(snowMan);
  }
}

export const showmanAndCompassRoom = new ShowmanAndCompassRoom();
