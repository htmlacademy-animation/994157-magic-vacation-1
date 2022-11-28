import * as THREE from 'three';
import {LatheObject} from '../../../components/lathe-object';
import {COLORS_MAP} from '../../../config/colors';
import {RoadMaterial} from './road-material';

class Road extends LatheObject {
  constructor() {
    super();

    this.data = {
      width: 160,
      height: 3,
      radius: 732,
      degree: {
        from: 0,
        to: 90,
      },
      color: `#646B7C`,
      segments: 30,
    };

    this.addObject();
  }

  addObject() {
    const material = new RoadMaterial({mainColor: COLORS_MAP.Grey, lineColor: COLORS_MAP.White});
    const geometry = this.createLatheGeometry(this.data);
    const mesh = new THREE.Mesh(
        geometry,
        material);
    mesh.receiveShadow = true;
    this.add(mesh);
  }
}

export const road = new Road();
