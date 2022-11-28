import * as THREE from 'three';
import {snowMan} from './snowman';
import {road} from './road/road';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {COLORS_MAP} from '../../config/colors';
import {Room} from '../room';
import {BaseObject} from '../../components/base-object';

class ShowmanAndCompassRoom extends Room {
  constructor() {
    super();

    this.models = [
      {
        name: `compass`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/objects/compass.gltf`,
        shadow: {
          receiveShadow: true,
          castShadow: true,
        },
      }
    ];

    const staticObject = {
      name: `scene1-static-output-3`,
      type: `gltf`,
      path: `3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
      shadow: {
        receiveShadow: true,
        castShadow: true,
      },
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

  addRoadBlocks() {
    const geometry = new THREE.CylinderGeometry(12, 12, 80, 20);

    const radius = 700;
    const blockCount = 5;
    const angleBetweenBlocks = 15 * THREE.Math.DEG2RAD;

    const outerAngle = Math.PI / 2 - angleBetweenBlocks * blockCount;

    const blockMaterial = {
      ...MATERIAL_REFLECTIVITY.soft,
      color: COLORS_MAP.Grey,
    };

    new Array(blockCount).fill(``).forEach((_, index) => {
      const roadBlock = new BaseObject();
      const material = roadBlock.createMaterial(blockMaterial);
      const blockMesh = new THREE.Mesh(geometry, material);
      roadBlock.add(blockMesh);

      const angle = outerAngle + index * angleBetweenBlocks;

      const placement = {
        position: {
          x: radius * Math.cos(angle),
          y: 40,
          z: radius * Math.sin(angle),
        },
      };

      roadBlock.place(placement);
      roadBlock.addShadow({
        receiveShadow: true,
        castShadow: true,
      });
      this.addObject(roadBlock);
    });

  }

  addObjects() {
    this.addModels();
    this.addSnowMan();
    this.addRoad();
    this.addRoadBlocks();
  }
}

export const showmanAndCompassRoom = new ShowmanAndCompassRoom();
