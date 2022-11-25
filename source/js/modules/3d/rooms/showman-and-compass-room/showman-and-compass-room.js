import * as THREE from 'three';
import {snowMan} from './snowman';
import {road} from './road/road';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {COLORS_MAP} from '../../config/colors';
import {Room} from '../room';

class ShowmanAndCompassRoom extends Room {
  constructor() {
    super();

    const staticObject = {
      name: `scene1-static-output-3`,
      type: `gltf`,
      path: `3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`
    };

    const wallMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.SkyLightBlue,
      side: THREE.DoubleSide,
    };

    const floorMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.MountainBlue,
    };
    this.createRoom({staticObject, wallMaterial, floorMaterial});

    this.addObjects();
  }

  addSnowMan() {
    const placement = {
      position: {
        x: 210,
        y: 125,
        z: 400
      },
      rotate: {
        x: 0,
        y: 90,
        z: 0
      }
    };
    snowMan.place(placement);
    this.addObject(snowMan);
  }

  addRoad() {
    this.addObject(road);
  }

  addObjects() {
    this.addSnowMan();
    this.addRoad();
  }
}

export const showmanAndCompassRoom = new ShowmanAndCompassRoom();
