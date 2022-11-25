import * as THREE from 'three';
import {dogAndSuitcaseRoom, pyramidAndCactusRoom, showmanAndCompassRoom, aiSonyaRoom} from '../rooms';

export class Apartment extends THREE.Group {
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

    this.addRooms();
  }

  addRooms() {
    this.rooms.forEach(({item, rotateY}) => {
      item.addSvgShapes(this.svgObjectsLoader);
      item.rotateY(rotateY);
      this.add(item);
    });
  }
}
