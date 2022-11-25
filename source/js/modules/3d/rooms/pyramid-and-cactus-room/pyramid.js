import * as THREE from 'three';
import {BaseObject} from '../../components/base-object';
import {getConeRadius} from '../../utils';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';

class Pyramid extends BaseObject {
  constructor() {
    super();

    this.data = {
      height: 280,
      radius: getConeRadius(250),
      radialSegments: 4,
      material: {
        color: COLORS_MAP.Blue,
        ...MATERIAL_REFLECTIVITY.soft
      }
    };

    this.addObject();
  }

  addObject() {
    const material = this.createMaterial(this.data.material);
    const cone = new THREE.ConeBufferGeometry(
        this.data.radius,
        this.data.height,
        this.data.radialSegments
    );
    const mesh = new THREE.Mesh(
        cone,
        material);
    mesh.castShadow = true;
    this.add(mesh);
  }
}

export const pyramid = new Pyramid();
