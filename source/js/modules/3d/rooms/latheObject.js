import {BaseObject} from './baseObject';
import * as THREE from 'three';

export class LatheObject extends BaseObject {
  constructor() {
    super();
  }

  getPointsByRadius(data) {
    const {radius, height, width} = data;
    const points = [];

    points.push(new THREE.Vector2(radius + width, 0));
    points.push(new THREE.Vector2(radius + width, height));
    points.push(new THREE.Vector2(radius, height));
    points.push(new THREE.Vector2(radius, 0));
    points.push(new THREE.Vector2(radius + width, 0));

    return points;
  }

  createLatheGeometry(data) {
    if (!Object.keys(data)) {
      return {};
    }

    const {degree, segments} = data;
    const points = this.getPointsByRadius(data);

    if (degree) {
      const {from, to} = degree;

      const phiStart = THREE.Math.DEG2RAD * from;
      const phiLength = THREE.Math.DEG2RAD * (to - from);

      return new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    } else {
      return new THREE.LatheGeometry(points, segments);
    }
  }
}
