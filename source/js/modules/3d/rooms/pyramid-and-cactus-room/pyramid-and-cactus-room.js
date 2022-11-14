import * as THREE from 'three';
import {pyramid} from './pyramid';
import {lantern} from './lantern';
import {BaseSceneItem} from '../../components/base-scene-item';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';

class PyramidAndCactusRoom extends BaseSceneItem {
  constructor() {
    super();

    this.svgShapes = [
      {
        name: `leaf`,
        settings: {
          height: 335.108,
          depth: 3,
          cap: 3,
        },
        material: {
          color: COLORS_MAP.Green,
          ...MATERIAL_REFLECTIVITY.basic
        }
      },
    ];

    this.addObject();
  }

  addObject() {
    pyramid.position.set(-15, -55, -770);
    pyramid.rotation.copy(
        new THREE.Euler(14 * THREE.Math.DEG2RAD, -1 * THREE.Math.DEG2RAD, 0),
        `XYZ`
    );
    lantern.position.set(352, -43, -600);
    lantern.rotation.copy(
        new THREE.Euler(15 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD, THREE.Math.DEG2RAD),
        `XYZ`
    );
    this.add(pyramid, lantern);
  }
}

export const pyramidAndCactusRoom = new PyramidAndCactusRoom();
