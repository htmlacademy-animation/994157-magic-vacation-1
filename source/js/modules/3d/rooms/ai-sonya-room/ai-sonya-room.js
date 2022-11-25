import * as THREE from 'three';

import {Saturn} from '../../components/saturn';
import {Rug} from '../../components/rug/rug';
import {Room} from '../room';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {COLORS_MAP} from '../../config/colors';

class AiSonyaRoom extends Room {
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
          color: COLORS_MAP.ShadowedAdditionalPurple,
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
        name: `sonya`,
        type: `gltf`,
        placement: {
          position: {
            x: 440,
            y: 120,
            z: 280
          },
        },
        shadow: {
          castShadow: true,
        },
        path: `3d/module-6/rooms-scenes/objects/sonya.gltf`
      }
    ];

    const staticObject = {
      name: `scene1-static-output-4`,
      type: `gltf`,
      path: `3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
      shadow: {
        receiveShadow: true,
        castShadow: true,
      },
    };

    const wallMaterial = {
      ...MATERIAL_REFLECTIVITY.basic,
      color: COLORS_MAP.ShadowedPurple,
      side: THREE.DoubleSide,
    };

    const floorMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.ShadowedDarkPurple,
    };

    this.createRoom({staticObject, wallMaterial, floorMaterial});

    this.addObjects();
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
    const saturn = new Saturn({isShadowed: true});
    saturn.place(placement);
    this.addObject(saturn);
  }

  addRug() {
    const rug = new Rug(true);
    this.addObject(rug);
  }

  addObjects() {
    this.addModels();
    this.addSaturn();
    this.addRug();
  }
}

export const aiSonyaRoom = new AiSonyaRoom();
