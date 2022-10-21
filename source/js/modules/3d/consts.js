import * as THREE from 'three';
import {SCREEN_NAMES, STORY_SLIDE_NAMES} from '../../constants';
import {dogAndSuitcaseRoom, pyramidAndCactusRoom, showmanAndCompassRoom} from './rooms';

export const IMAGE_WIDTH = 1024;

export const CAMERA_POSITION = 750;

export const BUBBLES = [
  {
    center: new THREE.Vector2(0.25, -1),
    radius: 0.06,
    delay: 600,
  },
  {
    center: new THREE.Vector2(0.4, -1),
    radius: 0.07,
    delay: 0,
  },
  {
    center: new THREE.Vector2(0.5, -1),
    radius: 0.04,
    delay: 1000,
  }
];

export const LIGHTS = [
  {
    type: `DirectionalLight`,
    color: `rgb(255, 255, 255)`,
    intensity: 0.84,
    position: {
      x: 0,
      y: CAMERA_POSITION * Math.tan(-15 * THREE.Math.DEG2RAD),
      z: CAMERA_POSITION,
    }
  },
  {
    type: `PointLight`,
    color: `rgb(246, 242, 255)`,
    intensity: 0.60,
    position: {
      x: -785,
      y: -350,
      z: -710,
    },
    decay: 2.0,
    distance: 975,
  },
  {
    type: `PointLight`,
    color: `rgb(245, 254, 255)`,
    intensity: 0.95,
    position: {
      x: 730,
      y: 800,
      z: -985
    },
    decay: 2.0,
    distance: 975,
  },
];

export const IMAGES = Object.freeze({
  [SCREEN_NAMES.TOP]: {
    image: `img/module-5/scenes-textures/scene-0.png`,
    hasHueShift: false,
    svgShapes: [
      {
        name: `flamingo`,
        settings: {
          height: 85,
          depth: 8,
          cap: 2,
        },
        placement: {
          position: {
            x: -180,
            y: 150,
            z: 0
          },
          rotate: {
            y: 45,
            z: 135,
          }
        }
      },
      {
        name: `snowflake`,
        settings: {
          height: 74,
          depth: 8,
          cap: 2,
        },
        placement: {
          position: {
            x: 180,
            y: 150,
            z: 0
          },
          rotate: {
            y: -45,
            z: 135,
          }
        }
      },
      {
        name: `question`,
        settings: {
          height: 56,
          depth: 8,
          cap: 2,
        },
        placement: {
          position: {
            x: 180,
            y: -150,
            z: 0
          },
          rotate: {
            y: 45,
            z: 135,
          }
        }
      },
      {
        name: `leaf`,
        settings: {
          height: 117,
          depth: 8,
          cap: 2,
        },
        placement: {
          position: {
            x: -180,
            y: -150,
            z: 0
          },
          rotate: {
            y: -45,
            z: 135,
          }
        }
      },
      {
        name: `keyhole`,
        settings: {
          height: 2000,
          depth: 20,
          cap: 2
        },
        placement: {
          position: {
            x: 1000,
            y: 1000,
            z: -250
          }
        }
      }
    ]
  },
  [STORY_SLIDE_NAMES.DOG_AND_SUITCASE]: {
    image: `img/module-5/scenes-textures/scene-1.png`,
    hasHueShift: false,
    room: dogAndSuitcaseRoom,
    svgShapes: [
      {
        name: `flower`,
        settings: {
          height: 413,
          depth: 4,
          cap: 2,
        }
      }
    ]
  },
  [STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS]: {
    image: `img/module-5/scenes-textures/scene-2.png`,
    hasHueShift: true,
    hueShift: 0,
    bubbles: BUBBLES,
    room: pyramidAndCactusRoom,
    svgShapes: [
      {
        name: `leaf`,
        settings: {
          height: 335.108,
          depth: 3,
          cap: 3,
        }
      }
    ]
  },
  [STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS]: {
    image: `img/module-5/scenes-textures/scene-3.png`,
    hasHueShift: false,
    room: showmanAndCompassRoom,
  },
  [STORY_SLIDE_NAMES.AI_SONYA]: {
    image: `img/module-5/scenes-textures/scene-4.png`,
    hasHueShift: false,
  },
});

export const SCENE_INDEX_BY_NAME = Object.freeze({
  [SCREEN_NAMES.TOP]: 0,
  [STORY_SLIDE_NAMES.DOG_AND_SUITCASE]: 1,
  [STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS]: 2,
  [STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS]: 3,
  [STORY_SLIDE_NAMES.AI_SONYA]: 4,
});

export const SVG_SHAPES = [
  {
    name: `flamingo`,
    src: `img/module-6/svg-forms/flamingo.svg`,
  },
  {
    name: `snowflake`,
    src: `img/module-6/svg-forms/snowflake.svg`,
  },
  {
    name: `question`,
    src: `img/module-6/svg-forms/question.svg`,
  },
  {
    name: `leaf`,
    src: `img/module-6/svg-forms/leaf.svg`,
  },
  {
    name: `keyhole`,
    src: `img/module-6/svg-forms/keyhole.svg`,
  },
  {
    name: `flower`,
    src: `img/module-6/svg-forms/flower.svg`,
  },
];
