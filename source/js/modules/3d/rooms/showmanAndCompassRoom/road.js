import * as THREE from 'three';
import {LatheObject} from '../latheObject';

class Road extends LatheObject {
  constructor() {
    super();

    this.data = {
      width: 160,
      height: 3,
      radius: 732,
      degree: {
        from: 0,
        to: 90,
      },
      color: `#646B7C`,
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

export const road = new Road();
