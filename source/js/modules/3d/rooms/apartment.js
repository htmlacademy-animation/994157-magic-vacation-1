import * as THREE from 'three';
import {dogAndSuitcaseRoom, pyramidAndCactusRoom, showmanAndCompassRoom, aiSonyaRoom} from '../rooms';
import {BaseSceneItem} from '../components/base-scene-item';

export class Apartment extends BaseSceneItem {
  constructor(svgObjectsLoader) {
    super();
    this.svgObjectsLoader = svgObjectsLoader;

    this.rooms = [
      {
        item: dogAndSuitcaseRoom,
        rotateY: 0,
      },
      {
        item: pyramidAndCactusRoom,
        rotateY: Math.PI / 2,
      },
      {
        item: showmanAndCompassRoom,
        rotateY: Math.PI,
      },
      {
        item: aiSonyaRoom,
        rotateY: -Math.PI / 2,
      }
    ];

    this.models = [
      {
        name: `suitcase`,
        type: `gltf`,
        placement: {
          position: {
            x: 300,
            y: 0,
            z: 790
          },
          rotate: {
            x: 0,
            y: 20,
            z: 0
          },
        },
        shadow: {
          receiveShadow: true,
          castShadow: true,
        },
        path: `3d/module-6/scene-0-objects/suitcase.gltf`,
      },
    ];

    this.create();
  }

  addRooms() {
    this.rooms.forEach(({item, rotateY}) => {
      item.addSvgShapes(this.svgObjectsLoader);
      item.rotateY(rotateY);
      this.add(item);
    });
  }

  create() {
    this.addRooms();
    this.addModels();
  }
}
