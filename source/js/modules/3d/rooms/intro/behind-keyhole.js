import {BaseObject} from '../../components/base-object';
import * as THREE from 'three';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';

class BehindKeyhole extends BaseObject {
  constructor() {
    super();

    this.data = {
      material: {
        color: COLORS_MAP.Purple,
        ...MATERIAL_REFLECTIVITY.basic
      }
    };

    this.addObject();
  }

  addObject() {
    const material = this.createMaterial(this.data.material);
    const geometry = new THREE.PlaneGeometry(300, 300);
    const mesh = new THREE.Mesh(
        geometry,
        material);
    this.addAxisToNode(mesh);
    this.add(mesh);
  }
}

export const behindKeyhole = new BehindKeyhole();
