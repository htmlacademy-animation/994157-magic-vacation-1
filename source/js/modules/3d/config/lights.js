import {degreesToRadians} from '../utils';

export const LIGHTS = [
  {
    type: `DirectionalLight`,
    color: `rgb(255, 255, 255)`,
    intensity: 0.84,
    position: {
      x: 0,
      y: -1000 * Math.tan(degreesToRadians(15)),
      z: -3000
    }
  },
  {
    type: `PointLight`,
    color: `rgb(246, 242, 255)`,
    intensity: 0.60,
    position: {
      x: -785,
      y: 800,
      z: -710,
    },
    decay: 2,
    distance: 2500,
    castShadow: true
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
    decay: 2,
    distance: 2500,
    castShadow: true,
  }
];
