import {BaseSceneItem} from '../../components/base-scene-item';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {behindKeyhole} from './behind-keyhole';
import {Saturn} from '../../components/saturn';

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
            x: -460,
            y: 270,
            z: 140
          },
          rotate: {
            x: 355,
            y: 30,
            z: 206,
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
            x: -320,
            y: -20,
            z: 90
          },
          rotate: {
            x: 350,
            y: 40,
            z: 18,
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
            x: 140,
            y: -260,
            z: 50
          },
          rotate: {
            x: 310,
            y: 184,
            z: 160,
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
            x: 500,
            y: 290,
            z: 100
          },
          rotate: {
            x: 350,
            y: 140,
            z: 248,
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
          depth: 4,
          cap: 2
        },
        placement: {
          position: {
            x: 1000,
            y: 1000,
            z: 0
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
          position: {
            x: 190,
            y: 120,
            z: 70
          },
          rotate: {
            x: 50,
            y: 140,
            z: 0
          },
        },
        material: {
          ...MATERIAL_REFLECTIVITY.soft,
          color: COLORS_MAP.White,
        },
        path: `3d/module-6/scene-0-objects/airplane.obj`,
      },
      {
        name: `suitcase`,
        type: `gltf`,
        placement: {
          scale: 0.4,
          position: {
            x: -60,
            y: -120,
            z: 150
          },
          rotate: {
            x: 35,
            y: 220,
            z: 20
          },
        },
        path: `3d/module-6/scene-0-objects/suitcase.gltf`,
      },
      {
        name: `watermelon`,
        type: `gltf`,
        placement: {
          position: {
            x: -600,
            y: -240,
            z: 200
          },
          rotate: {
            x: 17,
            y: 189,
            z: 45
          },
          scale: 1.8
        },
        path: `3d/module-6/scene-0-objects/watermelon.gltf`,
      }];

    this.saturnPlacement = {
      scale: 0.5,
      position: {
        x: 350,
        y: -120,
        z: 140
      },
      rotate: {
        x: -10,
        y: 0,
        z: 10,
      }
    };

    this.addObjects();
  }


  addObjects() {
    this.addModels();
    behindKeyhole.position.set(0, 0, -10);

    const saturn = new Saturn({isShadowed: false, withMoon: false});
    saturn.place(this.saturnPlacement);
    this.add(behindKeyhole, saturn);
  }
}

export const intro = new Intro();
