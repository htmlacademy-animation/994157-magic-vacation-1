import {BaseSceneItem} from '../../components/base-scene-item';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {behindKeyhole} from './behind-keyhole';

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

    this.models = [
      {
        name: `airplane`,
        type: `obj`,
        placement: {
          scale: 0.5,
          position: {
            x: 70,
            y: 80,
            z: 100
          },
          rotate: {
            x: 90,
            y: 140,
            z: -30
          },
        },
        material: {
          ...MATERIAL_REFLECTIVITY.soft,
          color: COLORS_MAP.White,
        },
        path: `../../../../../3d/module-6/scene-0-objects/airplane.obj`,
      },
      {
        name: `suitcase`,
        type: `gltf`,
        placement: {
          scale: 0.5,
          position: {
            x: 50,
            y: -150,
            z: 30
          },
          rotate: {
            x: 25,
            y: -30,
            z: 0
          },
        },
        path: `../../../../../3d/module-6/scene-0-objects/suitcase.gltf`,
      },
      {
        name: `watermelon`,
        type: `gltf`,
        placement: {
          position: {
            x: -250,
            y: 0,
            z: 40
          },
          rotate: {
            x: 0,
            y: 0,
            z: 130
          },
        },
        path: `../../../../../3d/module-6/scene-0-objects/watermelon.gltf`,
      }];

    this.addObjects();
  }


  addObjects() {
    this.addModels();
    behindKeyhole.position.set(0, 0, -260);
    this.add(behindKeyhole);
  }
}

export const intro = new Intro();
