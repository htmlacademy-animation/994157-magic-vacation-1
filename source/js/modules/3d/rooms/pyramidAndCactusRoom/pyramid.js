import * as THREE from 'three';
import {BaseObject} from '../baseObject';
import {getConeRadius} from '../../utils';

class Pyramid extends BaseObject {
  constructor() {
    super();

    this.data = {
      height: 280,
      radius: getConeRadius(250),
      radialSegments: 4,
      color: `#1860CF`,
    };

    this.addObject();
  }

  addObject() {
    const material = this.createMaterial({color: this.data.color});
    const cone = new THREE.ConeBufferGeometry(
        this.data.radius,
        this.data.height,
        this.data.radialSegments
    );
    const mesh = new THREE.Mesh(
        cone,
        material);
    this.addAxisToNode(mesh);
    this.add(mesh);
  }
}

export const pyramid = new Pyramid();
