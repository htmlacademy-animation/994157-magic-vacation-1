import {Rug} from '../../components/rug/rug';
import {Saturn} from '../../components/saturn';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {Room} from '../room';
import * as THREE from 'three';
import bezierEasing from '../../../../utils/bezier-easing';
import {Animation} from '../../../animation';
import {degreesToRadians} from '../../utils';

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

    this.dog = {
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
      animation: {
        amplitude: 20,
        easing: bezierEasing(0.33, 0.97, 0.58, -0.06)
      },
      shadow: {
        receiveShadow: true,
        castShadow: true,
      },
      path: `3d/module-6/rooms-scenes/objects/dog.gltf`
    };

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
    this.addDogAnimation = this.addDogAnimation.bind(this);

    this.createRoom({staticObject, wallMaterial, floorMaterial});

    this.addObjects();
    this.addSvgShapes = this.addSvgShapes.bind(this);
  }

  addRug() {
    const rug = new Rug();
    rug.position.z = -20;
    this.addObject(rug);
  }

  addDogAnimation(dogObject) {
    const tail = dogObject.getObjectByName(`Tail`);
    const originalRotate = {
      x: tail.rotation.x,
      y: tail.rotation.y,
      z: tail.rotation.z
    };

    this.animations.push(new Animation({
      func: (progress) => {
        const rotateXValue = this.dog.animation.amplitude * Math.sin(8 * progress * Math.PI);

        tail.rotation.copy(
            new THREE.Euler(degreesToRadians(rotateXValue), originalRotate.y, originalRotate.z),
            `XYZ`
        );
      },
      duration: 3000,
      easing: this.dog.animation.easing,
      iterationCount: `infinite`
    }));
  }

  addSaturn() {
    const group = new THREE.Group();
    const placement = {
      position: {
        x: 0,
        y: -1000,
        z: 0
      },
      rotate: {
        y: -90
      }
    };
    const saturn = new Saturn({isShadowed: false});
    saturn.place(placement);
    group.position.set(350, 1500, 280);
    group.add(saturn);
    this.addObject(group);
    this.addSaturnAnimation(group);
    this.addSaturnRingAnimation(saturn);
  }

  addSaturnRingAnimation(saturn) {
    const ring = saturn.getRing();
    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        const sine = Math.sin(time);
        ring.rotation.x =
          degreesToRadians(-5) * sine;
        ring.rotation.y = degreesToRadians(10) * sine;
        ring.rotation.z = degreesToRadians(-18) + degreesToRadians(5) * sine;
      },
      duration: `infinite`
    }));
  }

  addSaturnAnimation(object) {
    const bounceAngle = degreesToRadians(1);
    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        object.rotation.z = bounceAngle * Math.sin(time);
        object.rotation.x = bounceAngle * Math.sin(time);
      },
      duration: `infinite`
    }));
  }

  addObjects() {
    this.addModel(this.dog, this.addDogAnimation);
    this.addRug();
    this.addSaturn();


    // todo добавит старт анимации при пеерходе на слайд после синхронизации двух сцен
    setTimeout(() => {
      this.startAnimations();
    }, 3000);
  }
}

export const dogAndSuitcaseRoom = new DogAndSuitcaseRoom();
