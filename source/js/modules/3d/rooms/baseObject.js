import * as THREE from 'three';

export class BaseObject extends THREE.Group {
  constructor() {
    super();
  }

  createMaterial({color, ...rest}) {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      ...rest
    });
  }

  addAxisToNode(node, axisSize = 200) {
    node.geometry.computeBoundingBox();

    const bounds = node.geometry.boundingBox;
    const center = bounds.getCenter();
    const axis = new THREE.AxesHelper(axisSize);
    axis.position.copy(center);
    node.add(axis);
  }
}
