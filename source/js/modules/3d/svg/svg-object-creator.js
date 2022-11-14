import * as THREE from 'three';
import {BaseObject} from '../components/base-object';

export class SvgObjectCreator extends BaseObject {
  constructor(objectWithSettings) {
    super();
    this.object = objectWithSettings;

    this.create();
  }

  create() {
    // realThickness = relativeThickness * realHeight / relativeHeight
    const {paths, settings, placement, material} = this.object;
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
      const meshMaterial = this.createMaterial({side: THREE.DoubleSide,
        ...material});

      const shapes = path.toShapes();

      for (const shape of shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, geometrySettings);

        const mesh = new THREE.Mesh(geometry, meshMaterial);
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
