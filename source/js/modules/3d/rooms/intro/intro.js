import {BaseSceneItem} from '../../components/base-scene-item';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {behindKeyhole} from './behind-keyhole';
import {Saturn} from '../../components/saturn';
import {Animation} from '../../../animation';
import _ from '../../../../utils/easing';
import {AirplaneRig} from './airplane-rig';

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
        name: `suitcase`,
        type: `gltf`,
        placement: {
          rotate: {
            x: 35,
            y: 220,
            z: 20
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
          },
          to: {
            scale: 0.4,
          }
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
            scale: 1.5,
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
        },
        path: `3d/module-6/scene-0-objects/watermelon.gltf`,
      }];

    this.saturn = {
      placement: {
        scale: 0.5,
        rotate: {
          x: 10,
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
          scale: 0.5,
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

  addBounceAnimation(object, delay = 2000) {
    const amplitude = (0.5 + Math.random() / 2) * 25;
    const period = 3 + 10 * Math.random();

    this.animations.push(new Animation({
      func: (progress, {currentTime, startTime}) => {
        const time = (currentTime - startTime) / 1000;
        object.position.y =
          amplitude * Math.sin((2 * Math.PI * time) / period);
      },
      duration: `infinite`,
      delay,
      easing: _.easeOutCubic,
    }));
  }

  addAppearAnimation(object, animation, delay = 500) {
    const {from, to} = animation;

    this.animations.push(new Animation({
      func: (progress) => {
        // scale
        if (to.scale !== undefined) {
          object.setScale(to.scale * progress, object.inner);
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

        if (to.position) {
          // position
          const position = {
            x: to.position.x * progress,
            y: to.position.y * progress,
            z: to.position.z * progress,
          };
          object.setPosition(position);
        }
      },
      duration: 1500,
      delay,
      easing: _.easeOutCubic,
    }));
  }

  addSaturn() {
    const saturn = new Saturn({isShadowed: false, withMoon: false});
    saturn.place(this.saturn.placement, saturn.inner);

    saturn.setScale(this.saturn.animation.from.scale, saturn.inner);
    saturn.setRotate(this.saturn.animation.from.rotate, saturn.root);
    saturn.setPosition(this.saturn.animation.from.position);
    this.addObject(saturn);
    this.initSaturnAnimation(saturn);
  }

  initSaturnAnimation(saturn) {
    this.addAppearAnimation(saturn, this.saturn.animation);
    this.addBounceAnimation(saturn.root);
  }

  addSuitcaseAnimation(suitcase) {
    const {figure: {animation}} = suitcase;

    const rotateAnimation = {
      x: -95,
      y: 33,
      z: 48,
    };

    this.animations.push(new Animation({
      func: (progress) => {
        // rotate
        const progressReversed = 1 - progress;
        const rotate = {
          x: rotateAnimation.x + 13 * progress,
          y: rotateAnimation.y + 7 * progress,
          z: rotateAnimation.z * progressReversed,
        };
        suitcase.setRotate(rotate, suitcase.root);
      },
      duration: 500,
      delay: 800,
      easing: _.easeInOutSine,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        // rotate
        const progressReversed = 1 - progress;
        const rotate = {
          x: -82 * progressReversed,
          y: 40 * progressReversed,
          z: 0,
        };
        suitcase.setRotate(rotate, suitcase.root);
      },
      duration: 500,
      delay: 1300,
      easing: _.easeInOutSine,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        // position
        const position = {
          x: 0,
          y: 80 * progress,
          z: 60 * progress,
        };
        suitcase.setPosition(position);
      },
      duration: 500,
      delay: 800,
      easing: _.easeInOutSine,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        // position
        const position = {
          x: -60 * progress,
          y: 80 - 220 * progress,
          z: 60 + progress * 60,
        };
        suitcase.setPosition(position);
      },
      duration: 500,
      delay: 1300,
      easing: _.easeInOutSine,
    }));


    this.addAppearAnimation(suitcase, animation, 800);
    this.addBounceAnimation(suitcase.root, 2200);
  }

  addFigureAnimation(shapesWithObjects) {
    shapesWithObjects.forEach((group) => {
      const {figure: {animation, name}} = group;

      if (animation && animation.from) {
        const {scale, position, rotate} = animation.from;
        if (scale !== undefined) {
          group.setScale(scale, group.inner);
        }
        if (rotate) {
          group.setRotate(rotate, group.root);
        }

        if (position) {
          group.setPosition(position);
        }

        if (name === `suitcase`) {
          this.addSuitcaseAnimation(group);
        } else {
          this.addAppearAnimation(group, animation);
          this.addBounceAnimation(group.root);
        }
      }
    });
  }

  addAirPlane() {
    const plane = new AirplaneRig();
    this.add(plane);

    const initialFightRadius = plane.flightRadius;
    const flightAltitude = plane.flightHeight;
    const initialRigRotationY = plane.rigRotationY;
    const initialPlaneRotationZ = plane.planeRotationZ;
    const initialPlaneIncline = plane.planeIncline;

    this.animations.push(new Animation({
      func: (progress) => {

        const progressReversed = 1 - progress;
        plane.flightRadius = (plane.maxFlightRadius - initialFightRadius) * progress;
        plane.flightHeight = flightAltitude * progress;
        plane.rigRotationY = initialRigRotationY * progressReversed;

        plane.planeRotationZ = progress < 0.5 ? initialPlaneRotationZ - progress * Math.PI : initialPlaneRotationZ - 0.5 * Math.PI + (progress - 0.5) * Math.PI;

        plane.planeIncline = initialPlaneIncline + (progress * Math.PI) / 5;

        plane.invalidate();
      },
      duration: 2000,
      delay: 1400,
      easing: _.easeOutExpo,
    }));

    this.addBounceAnimation(plane.modelItem, 3400);
  }

  addObjects() {
    this.addSvgShapes(this.svgObjectsLoader, this.addFigureAnimation);
    this.addModels(this.addFigureAnimation);
    this.addBehindKeyhole();
    this.addAirPlane();
    this.addSaturn();
    // задержка старта всей анимации 1.4s
    // todo добавит старт анимации при загрузке страницы после синхронизации двух сцен
    setTimeout(() => {
      this.startAnimations();
    }, 500);
  }
}
