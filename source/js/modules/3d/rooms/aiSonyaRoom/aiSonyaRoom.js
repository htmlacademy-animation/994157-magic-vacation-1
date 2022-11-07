import * as THREE from 'three'

import {Saturn} from '../saturn';
import {Rug} from '../rug/rug';
import {BaseSceneItem} from '../baseSceneItem';

class AiSonyaRoom extends BaseSceneItem {
  constructor() {
    super();

    this.addObject();
  }

  addObject() {
    const saturn = new Saturn({isShadowed: true});
    saturn.scale.set(0.9, 0.9, 0.9);
    saturn.position.set(85, 220, -540);

    const rug = new Rug(true);
    rug.scale.set(0.7, 0.7, 0.7);
    rug.position.set(-20, 0, -540);
    rug.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 45 * THREE.Math.DEG2RAD, 180 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(saturn, rug);
  }
}

export const aiSonyaRoom = new AiSonyaRoom();
