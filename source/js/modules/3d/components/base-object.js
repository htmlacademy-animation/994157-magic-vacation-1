import * as THREE from 'three';

export class BaseObject extends THREE.Group {
  constructor() {
    super();

    // root вкладываем в THREE.Group
    this.root = new THREE.Group();
    // inner вкладываем в root
    this.inner = new THREE.Group();
  }

  addName(name) {
    this.name = name;
    this.inner.name = `inner_${name}`;
    this.root.name = `root_${name}`;
  }

  addGroupSandwich(mesh) {
    this.inner.add(mesh);
    this.root.add(this.inner);
    this.add(this.root);
  }

  addShadow({castShadow, receiveShadow}, child = this) {

    if (receiveShadow) {
      child.receiveShadow = true;
    }

    if (castShadow) {
      child.castShadow = true;
    }
  }

  createMaterial({color, ...rest}) {
    return new THREE.MeshStandardMaterial({
      ...(color && {
        color: new THREE.Color(color)
      }),
      ...rest
    });
  }

  setRotate(rotate, object = this) {
    const {x = 0, y = 0, z = 0} = rotate;
    object.rotation.copy(
        new THREE.Euler(x * THREE.Math.DEG2RAD, y * THREE.Math.DEG2RAD, z * THREE.Math.DEG2RAD),
        `XYZ`
    );
  }

  setPosition(position, object = this) {
    object.position.set(...Object.values(position));
  }

  setScale(scale, object = this) {
    if (typeof scale === `number`) {
      object.scale.set(scale, scale, scale);
    } else {
      const {x = 0, y = 0, z = 0} = scale;
      object.scale.set(x, y, z);
    }
  }

  place(placement, object = this) {
    const {position, rotate, scale} = placement;

    if (position) {
      this.setPosition(position);
    }

    if (rotate) {
      this.setRotate(rotate, object);
    }

    if (scale !== undefined) {
      this.setScale(scale, object);
    }
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
