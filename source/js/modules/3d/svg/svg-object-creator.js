import * as THREE from 'three';
import {BaseObject} from '../rooms/baseObject';

export class SvgObjectCreator extends BaseObject {
  constructor(objectWithSettings) {
    super();
    this.object = objectWithSettings;

    this.create();
  }

  place(placement) {
    const {position, rotate} = placement;

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
  }

  create() {
    // realThickness = relativeThickness * realHeight / relativeHeight
    const {paths, settings, placement} = this.object;
    const geometrySettings = {
      steps: 2,
      depth: settings.depth,
      bevelEnabled: true,
      bevelThickness: settings.cap,
      bevelSize: settings.cap,
      bevelOffset: 0,
      bevelSegments: 5
    };

    for (const path of paths) {
      const material = new THREE.MeshStandardMaterial({
        color: path.color,
        side: THREE.DoubleSide,
      });

      const shapes = path.toShapes();

      for (const shape of shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, geometrySettings);

        const mesh = new THREE.Mesh(geometry, material);
        this.addAxisToNode(mesh);
        this.add(mesh);
      }
    }
    this.rotateZ(Math.PI);

    if (placement) {
      this.place(placement);
    }
  }
}
