import {Rug} from '../../components/rug/rug';
import {Saturn} from '../../components/saturn';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {Room} from '../room';
import * as THREE from 'three';

class DogAndSuitcaseRoom extends Room {
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
          color: COLORS_MAP.ShadowedLightPurple,
          ...MATERIAL_REFLECTIVITY.soft
        },
        placement: {
          position: {
            x: 60,
            y: 410,
            z: 440
          },
          rotate: {
            x: 180,
            y: -90,
            z: 0,
          }
        },
      }
    ];

    this.models = [
      {
        name: `dog`,
        type: `gltf`,
        placement: {
          position: {
            x: 480,
            y: 0,
            z: 420
          },
          rotate: {
            x: 0,
            y: 65,
            z: 0
          },
        },
        shadow: {
          receiveShadow: true,
          castShadow: true,
        },
        path: `3d/module-6/rooms-scenes/objects/dog.gltf`
      }
    ];

    const staticObject = {
      name: `scene1-static-output-1`,
      type: `gltf`,
      path: `3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
      shadow: {
        receiveShadow: true,
        castShadow: true,
      },
    };

    const wallMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.Purple,
      side: THREE.DoubleSide,
    };

    const floorMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.DarkPurple,
    };

    this.createRoom({staticObject, wallMaterial, floorMaterial});

    this.addObjects();
    this.addSvgShapes = this.addSvgShapes.bind(this);
  }

  addRug() {
    const rug = new Rug();
    this.addObject(rug);
  }

  addSaturn() {
    const placement = {
      position: {
        x: 350,
        y: 500,
        z: 280
      },
      rotate: {
        y: -90
      }
    };
    const saturn = new Saturn({isShadowed: false});
    saturn.place(placement);
    this.addObject(saturn);
  }

  addObjects() {
    this.addModels();
    this.addRug();
    this.addSaturn();
  }
}

export const dogAndSuitcaseRoom = new DogAndSuitcaseRoom();
