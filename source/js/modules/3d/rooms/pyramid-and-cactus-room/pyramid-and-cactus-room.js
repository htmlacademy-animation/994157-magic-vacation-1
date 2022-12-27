import {pyramid} from './pyramid';
import {lantern} from './lantern';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {Room} from '../room';
import * as THREE from 'three';
import {Animation} from '../../../animation';

export class PyramidAndCactusRoom extends Room {
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
            x: 0,
            y: 105,
            z: 160
          },
          rotate: {
            x: -150,
            y: -90,
            z: 0
          },
          scale: 1.5
        },
        position: {
          x: 80,
          y: 20,
          z: 330
        },
        animation: {
          amplitude: 1.2,
          factor: 0.3,
        },
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
            x: 0,
            y: 300,
            z: 30
          },
          rotate: {
            x: 166,
            y: -90,
            z: 0
          },
          scale: 2.5
        },
        position: {
          x: 80,
          y: 20,
          z: 330
        },
        animation: {
          amplitude: 1,
          factor: 0.4,
        },
      },
    ];

    const staticObject = {
      name: `pyramid-and-cactus-room`,
      shadow: {
        receiveShadow: true,
        castShadow: true,
      },
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

    this.addFigureAnimation = this.addFigureAnimation.bind(this);

    this.createRoom({staticObject, wallMaterial, floorMaterial});

    this.addObjects();
  }

  addFigureAnimation(shapesWithObjects) {
    shapesWithObjects.forEach((group) => {
      const {figure: {animation, position}} = group;
      const {amplitude, factor} = animation;
      const object = group.root;

      if (position) {
        group.setPosition(position);
      }

      this.animations.push(new Animation({
        func: (progress, {currentTime, startTime}) => {
          const time = ((currentTime - startTime) / 300) % 16;
          object.rotation.x = factor * Math.exp(-0.2 * time) * Math.cos(amplitude * time + Math.PI / 2);
        },
        duration: `infinite`
      }));
    });
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

  addSvgShapes() {
    super.addSvgShapes(this.addFigureAnimation);
  }

  addObjects() {
    this.addPyramid();
    this.addLantern();

    setTimeout(() => {
      this.startAnimations();
    }, 300);
  }
}
