import * as THREE from 'three';
import {LatheObject} from '../latheObject';

class Rug extends LatheObject {
  constructor() {
    super();

    this.data = {
      width: 180,
      height: 3,
      radius: 763,
      degree: {
        from: 16,
        to: 74,
      },
      color: `#A481D1`,
      segments: 30,
    };

    this.addObject();
  }

  addObject() {
    const material = this.createMaterial({color: this.data.color});
    const geometry = this.createLatheGeometry(this.data);
    const mesh = new THREE.Mesh(
        geometry,
        material);
    this.addAxisToNode(mesh);
    this.add(mesh);
  }
}

export const rug = new Rug();
