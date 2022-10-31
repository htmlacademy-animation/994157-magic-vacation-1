import * as THREE from 'three';
import {rug} from './rug';
import {Saturn} from '../saturn';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {BaseSceneItem} from '../baseSceneItem';

class DogAndSuitcaseRoom extends BaseSceneItem {
  constructor() {
    super();
    this.svgShapes = [
      {
        name: `flower`,
        settings: {
          height: 413,
          depth: 4,
          cap: 2,
        },
        material: {
          color: COLORS_MAP.DarkPurple,
          ...MATERIAL_REFLECTIVITY.basic
        }
      }
    ];

    this.addObject();
    this.addSvgShapes = this.addSvgShapes.bind(this);
  }

  addObject() {
    rug.scale.set(0.7, 0.7, 0.7);
    rug.position.set(-20, 0, -540);
    rug.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 45 * THREE.Math.DEG2RAD, 180 * THREE.Math.DEG2RAD), `XYZ`);
    const saturn = new Saturn({isShadowed: false});
    saturn.scale.set(0.9, 0.9, 0.9);
    saturn.position.set(55, 220, -540);
    this.add(rug, saturn);
  }
}

export const dogAndSuitcaseRoom = new DogAndSuitcaseRoom();
