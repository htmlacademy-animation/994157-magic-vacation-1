import {pyramid} from './pyramid';
import {lantern} from './lantern';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {Room} from '../room';
import * as THREE from 'three';

class PyramidAndCactusRoom extends Room {
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
        },
        placement: {
          position: {
            x: 80,
            y: 90,
            z: 480
          },
          rotate: {
            x: -150,
            y: -90,
            z: 0
          },
          scale: 1.1
        }
      },
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
        },
        placement: {
          position: {
            x: 80,
            y: 300,
            z: 400
          },
          rotate: {
            x: 166,
            y: -90,
            z: 0
          },
          scale: 2.5
        }
      },
    ];

    const staticObject = {
      name: `scene1-static-output-2`,
      type: `gltf`,
      path: `3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`
    };

    const wallMaterial = {
      ...MATERIAL_REFLECTIVITY.basic,
      color: COLORS_MAP.Blue,
      side: THREE.DoubleSide,
    };

    const floorMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.BrightBlue,
    };

    this.createRoom({staticObject, wallMaterial, floorMaterial});

    this.addObjects();
  }

  addLantern() {
    const placement = {
      position: {
        x: 680,
        y: 220,
        z: 110
      },
      rotate: {
        x: 0,
        y: -20,
        z: 0
      }
    };
    lantern.place(placement);
    this.addObject(lantern);
  }

  addPyramid() {
    const placement = {
      position: {
        x: 190,
        y: 140,
        z: 230
      },
      rotate: {
        x: 0,
        y: -45,
        z: 0
      }
    };
    pyramid.place(placement);
    this.addObject(pyramid);
  }

  addObjects() {
    this.addPyramid();
    this.addLantern();
  }
}

export const pyramidAndCactusRoom = new PyramidAndCactusRoom();
