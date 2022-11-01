import {BaseSceneItem} from '../baseSceneItem';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {behindKeyhole} from './behindKeyhole';

class Intro extends BaseSceneItem {
  constructor() {
    super();
    this.svgShapes = [
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
        },
        material: {
          color: COLORS_MAP.LightDominantRed,
          ...MATERIAL_REFLECTIVITY.soft
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
        },
        material: {
          color: COLORS_MAP.Blue,
          ...MATERIAL_REFLECTIVITY.basic
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
        },
        material: {
          color: COLORS_MAP.Blue,
          ...MATERIAL_REFLECTIVITY.basic
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
        },
        material: {
          color: COLORS_MAP.Green,
          ...MATERIAL_REFLECTIVITY.basic
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
        },
        material: {
          color: COLORS_MAP.DarkPurple,
          ...MATERIAL_REFLECTIVITY.soft
        }
      }
    ];

    this.addObjects();
  }


  addObjects() {
    behindKeyhole.position.set(0, 0, -260);
    this.add(behindKeyhole);
  }
}

export const intro = new Intro();
