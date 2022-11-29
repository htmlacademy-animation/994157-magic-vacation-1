import {BaseSceneItem} from '../../components/base-scene-item';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {behindKeyhole} from './behind-keyhole';
import {Saturn} from '../../components/saturn';
import {Animation} from '../../../animation';
import _ from '../../../../utils/easing';

export class Intro extends BaseSceneItem {
  constructor(svgObjectsLoader) {
    super();
    this.svgObjectsLoader = svgObjectsLoader;

    this.svgShapes = [
      {
        name: `flamingo`,
        settings: {
          height: 85,
          depth: 8,
          cap: 2,
        },
        animation: {
          from: {
            scale: 0,
            position: {
              x: 0,
              y: 0,
              z: 0
            },
          },
          to: {
            scale: 1,
            position: {
              x: -460,
              y: 270,
              z: 140
            },
          }
        },
        placement: {
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
        animation: {
          from: {
            scale: 0,
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            rotate: {
              x: 0,
              y: -58,
              z: 0,
            }
          },
          to: {
            scale: 1,
            position: {
              x: -320,
              y: -20,
              z: 90
            },
          }
        },
        placement: {
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
        animation: {
          from: {
            scale: 0,
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            rotate: {
              x: 0,
              y: -100,
              z: 0,
            }
          },
          to: {
            scale: 1,
            position: {
              x: 140,
              y: -260,
              z: 50
            },
          }
        },
        placement: {
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
        animation: {
          from: {
            scale: 0,
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            rotate: {
              x: 0,
              y: -150,
              z: 0,
            }
          },
          to: {
            scale: 1,
            position: {
              x: 500,
              y: 290,
              z: 100
            },
          }
        },
        placement: {
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
          },
          rotate: {
            z: 180,
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
        animation: {
          from: {
            scale: 0,
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            rotate: {
              x: 120,
              y: -22,
              z: 0,
            }
          },
          to: {
            scale: 1,
            position: {
              x: -600,
              y: -240,
              z: 200
            },
          }
        },
        placement: {
          rotate: {
            x: 17,
            y: 189,
            z: 45
          },
          scale: 1.8
        },
        path: `3d/module-6/scene-0-objects/watermelon.gltf`,
      }];

    this.saturn = {
      placement: {
        scale: 0.5,
        rotate: {
          x: -10,
          y: 0,
          z: 10,
        },
      },
      animation: {
        from: {
          scale: 0,
          position: {
            x: 0,
            y: 0,
            z: 0
          },
          rotate: {
            x: 0,
            y: 0,
            z: -100,
          }
        },
        to: {
          scale: 1,
          position: {
            x: 350,
            y: -120,
            z: 140
          },
          rotate: {
            x: 0,
            y: 0,
            z: 0,
          }
        }
      }
    };

    this.addAppearAnimation = this.addAppearAnimation.bind(this);
    this.addBounceAnimation = this.addBounceAnimation.bind(this);
    this.addFigureAnimation = this.addFigureAnimation.bind(this);

    this.addObjects();
  }

  addBehindKeyhole() {
    behindKeyhole.position.set(0, 0, -10);
    this.addObject(behindKeyhole);
  }

  addBounceAnimation(object) {
    const amplitude = (0.5 + Math.random() / 2) * 25;
    const period = 3 + 10 * Math.random();

    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        object.position.y =
          amplitude * Math.sin((2 * Math.PI * time) / period);
      },
      duration: `infinite`,
      delay: 2000,
      easing: _.easeOutCubic,
    }));
  }

  addAppearAnimation(object, animation) {
    const {from, to} = animation;
    this.animations.push(new Animation({
      func: (progress) => {
        // scale
        if (to.scale !== undefined) {
          object.setScale(to.scale * progress, object.root);
        }

        if (from.rotate !== undefined) {
          // rotate
          const progressReversed = 1 - progress;
          const rotate = {
            x: from.rotate.x * progressReversed,
            y: from.rotate.y * progressReversed,
            z: from.rotate.z * progressReversed,
          };
          object.setRotate(rotate, object.root);
        }

        // position
        const position = {
          x: to.position.x * progress,
          y: to.position.y * progress,
          z: to.position.z * progress,
        };
        object.setPosition(position);
      },
      duration: 1500,
      delay: 500,
      easing: _.easeOutCubic,
    }));
  }

  addSaturn() {
    const saturn = new Saturn({isShadowed: false, withMoon: false});
    saturn.place(this.saturn.placement, saturn.inner);

    saturn.setScale(this.saturn.animation.from.scale, saturn.root);
    saturn.setRotate(this.saturn.animation.from.rotate, saturn.root);
    saturn.setPosition(this.saturn.animation.from.position);
    this.addObject(saturn);
    this.initSaturnAnimation(saturn);
  }

  initSaturnAnimation(saturn) {
    this.addAppearAnimation(saturn, this.saturn.animation);
    this.addBounceAnimation(saturn.root);
  }

  addFigureAnimation(shapesWithObjects) {
    shapesWithObjects.forEach((group) => {
      const {figure: {animation}} = group;

      if (animation && animation.from) {
        const {scale, position, rotate} = animation.from;
        if (scale !== undefined) {
          group.setScale(scale, group.root);
        }
        if (rotate) {
          group.setRotate(rotate, group.root);
        }

        if (position) {
          group.setPosition(position);
        }

        this.addAppearAnimation(group, animation);
        this.addBounceAnimation(group.root);
      }
    });
  }

  addObjects() {
    this.addSvgShapes(this.svgObjectsLoader, this.addFigureAnimation);
    this.addModels(this.addFigureAnimation);
    this.addBehindKeyhole();
    this.addSaturn();
    // задержка старта всей анимации 1.4s
    // todo добавит старт анимации при загрузке страницы после синхронизации двух сцен
    setTimeout(() => {
      this.startAnimations();
    }, 500);
  }
}
