import * as THREE from 'three';

import {Saturn} from '../../components/saturn';
import {Rug} from '../../components/rug/rug';
import {Room} from '../room';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {COLORS_MAP} from '../../config/colors';
import {Animation} from '../../../animation';
import {degreesToRadians} from '../../utils';

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

    this.sonya = {
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
    };

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

    this.addSonyaAnimation = this.addSonyaAnimation.bind(this);

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
    const ring = saturn.getRing();
    ring.rotation.x = degreesToRadians(-15);
    ring.rotation.y = degreesToRadians(-30);
    ring.rotation.z = degreesToRadians(-23);
    this.addObject(saturn);
  }

  addRug() {
    const rug = new Rug(true);
    rug.position.z = -20;
    this.addObject(rug);
  }

  addSonyaAnimation(sonyaObj) {
    const rightHand = sonyaObj.getObjectByName(`RightHand`);
    const leftHand = sonyaObj.getObjectByName(`LeftHand`);

    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        const sine = Math.sin(time * 2);
        sonyaObj.position.y = 10 * sine;
      },
      duration: `infinite`,
    }));

    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        const cos = Math.cos(1.5 + time * 2);

        rightHand.rotation.y = degreesToRadians(-55) + degreesToRadians(5) * cos;
      },
      duration: `infinite`,
    }));

    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        const cos = Math.cos(-1.5 + time * 2);

        leftHand.rotation.y = degreesToRadians(55) + degreesToRadians(5) * cos;
      },
      duration: `infinite`,
    }));
  }

  addObjects() {
    this.addModel(this.sonya, this.addSonyaAnimation);
    this.addSaturn();
    this.addRug();

    // todo добавит старт анимации при пеерходе на слайд после синхронизации двух сцен
    setTimeout(() => {
      this.startAnimations();
    }, 3000);
  }
}

export const aiSonyaRoom = new AiSonyaRoom();
