import * as THREE from 'three';
import {BaseObject} from '../components/base-object';

export class SvgObjectCreator extends BaseObject {
  constructor(objectWithSettings) {
    super();
    this.figure = objectWithSettings;
    this.create();
  }

  create() {
    // realThickness = relativeThickness * realHeight / relativeHeight
    const {paths, settings, placement, material, name} = this.figure;
    this.addName(name);
    const geometrySettings = {
      steps: 2,
      depth: settings.depth,
      bevelEnabled: true,
      bevelThickness: settings.cap,
      bevelSize: settings.cap,
      bevelOffset: 0,
      bevelSegments: 5
    };

    const meshGroup = new THREE.Group();

    for (const path of paths) {
      const meshMaterial = this.createMaterial({side: THREE.DoubleSide,
        ...material});

      const shapes = path.toShapes();

      for (const shape of shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, geometrySettings);

        const mesh = new THREE.Mesh(geometry, meshMaterial);
        meshGroup.add(mesh);
      }
    }

    this.addGroupSandwich(meshGroup);

    if (placement) {
      this.place(placement, this.inner);
    }
  }
}
