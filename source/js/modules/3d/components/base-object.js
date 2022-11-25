import * as THREE from 'three';

export class BaseObject extends THREE.Group {
  constructor() {
    super();
  }

  addShadow({castShadow, receiveShadow}, child = this) {

    if (receiveShadow) {
      child.receiveShadow = true;
    }

    if (castShadow) {
      child.castShadow = true;
    }
  }

  // createMaterial({color, ...rest}, type = `standard`) {
  //   switch (type) {
  //     case `phong`:
  //       return new THREE.MeshPhongMaterial({
  //         ...(color && {
  //           color: new THREE.Color(color)
  //         }),
  //         ...rest
  //       });
  //     default:
  //       return new THREE.MeshStandardMaterial({
  //         ...(color && {
  //           color: new THREE.Color(color)
  //         }),
  //         ...rest
  //       });
  //   }
  // }

  createMaterial({color, ...rest}) {
    return new THREE.MeshStandardMaterial({
      ...(color && {
        color: new THREE.Color(color)
      }),
      ...rest
    });
  }

  place(placement) {
    const {position, rotate, scale} = placement;

    if (position) {
      this.position.set(...Object.values(position));
    }

    if (rotate) {
      const {x = 0, y = 0, z = 0} = rotate;
      this.rotation.copy(
          new THREE.Euler(x * THREE.Math.DEG2RAD, y * THREE.Math.DEG2RAD, z * THREE.Math.DEG2RAD),
          `XYZ`
      );
    }

    if (scale) {
      if (typeof scale === `number`) {
        this.scale.set(scale, scale, scale);
      } else {
        const {x = 0, y = 0, z = 0} = scale;
        this.scale.set(x, y, z);
      }
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
