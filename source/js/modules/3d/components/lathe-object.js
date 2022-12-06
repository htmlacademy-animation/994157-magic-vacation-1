import {BaseObject} from './base-object';
import * as THREE from 'three';
import {degreesToRadians} from '../utils';

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

      const phiStart = degreesToRadians(from);
      const phiLength = degreesToRadians(to - from);

      return new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    } else {
      return new THREE.LatheGeometry(points, segments);
    }
  }
}
