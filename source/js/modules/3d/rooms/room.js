import * as THREE from 'three';
import {BaseSceneItem} from '../components/base-scene-item';
import {BaseObject} from '../components/base-object';

export class Room extends BaseSceneItem {
  constructor() {
    super();

    this.wallModel = {
      name: `wall`,
      type: `obj`,
      path: `3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
    };
  }

  createRoom({wallMaterial, floorMaterial, staticObject}) {
    this.addWall(wallMaterial);
    this.addFloor(floorMaterial);
    this.addStaticObjects(staticObject);
  }

  addWall(wallMaterial) {
    this.wallModel.material = wallMaterial;
    this.addModel(this.wallModel);
  }

  addFloor(floorMaterial) {
    const obj = new BaseObject();
    const geometry = new THREE.CircleGeometry(2000, 32, 0, Math.PI / 2);
    const material = obj.createMaterial(floorMaterial);
    const floor = new THREE.Mesh(geometry, material);

    floor.rotation.set(0, -Math.PI / 2, -Math.PI / 2, `ZYX`);

    this.addObject(floor);
  }

  addStaticObjects(staticObject) {
    this.addModel(staticObject);
  }
}
