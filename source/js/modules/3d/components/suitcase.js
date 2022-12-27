import {BaseObject} from './base-object';
import {Animation} from '../../animation';
import _ from '../../../utils/easing';
import {tick} from '../../../utils/keyframe-tools';
import {ModelObjectCreator} from '../helpers/model-object-creator';

export class Suitcase extends BaseObject {
  constructor() {
    super();
    this.model = {
      name: `suitcase`,
      type: `gltf`,
      placement: {
        rotate: {
          x: 0,
          y: -20,
          z: 0
        },
      },
      animation: {
        from: {
          position: {
            x: 0,
            y: 140,
            z: 0
          },
        },
        to: {
          position: {
            x: 0,
            y: 0,
            z: 0
          },
        },
      },
      keyframe: {
        times: [0, 50, 65, 85, 100],
        values: [1, 1.1, 0.85, 1.05, 1],
      },
      shadow: {
        receiveShadow: true,
        castShadow: true,
      },
      path: `3d/module-6/scene-0-objects/suitcase.gltf`,
    };

    this.addSuitcaseAnimation = this.addSuitcaseAnimation.bind(this);
    this.create();
    this.isInit = false;
  }

  addSuitcaseAnimation(suitcaseGroup) {
    this.isInit = true;
    const {figure: {animation, keyframe}} = suitcaseGroup;
    const {from, to} = animation;
    suitcaseGroup.setPosition(from.position);

    this.animations.push(new Animation({
      func: (progress) => {
        const position = {
          x: to.position.x,
          y: from.position.y - from.position.y * progress,
          z: to.position.z,
        };
        suitcaseGroup.setPosition(position);
      },
      duration: 500,
      delay: 600,
      easing: _.easeOutCubic,
    }));

    let fromIndex = 0;
    let toIndex = 1;

    const {times, values} = keyframe;

    this.animations.push(new Animation({
      func: (progress) => {
        const percent = progress * 100;

        if (percent > times[toIndex]) {
          fromIndex += 1;
          toIndex += 1;
        }

        const fromValueY = values[fromIndex];
        const toValueY = values[toIndex];

        const tickProgress = (percent - times[fromIndex]) / (times[toIndex] - times[fromIndex]);

        const otherValue = tick(1 / Math.sqrt(fromValueY), 1 / Math.sqrt(toValueY), tickProgress);

        const scale = {
          x: otherValue,
          y: tick(fromValueY, toValueY, tickProgress),
          z: otherValue,
        };

        suitcaseGroup.setScale(scale, suitcaseGroup.inner);
      },
      duration: 1300,
      delay: 600,
      easing: _.easeOutCubic,
    }));

    if (this.isRunningAnimations) {
      this.startAnimations();
    }
  }

  create() {
    const modelItem = new ModelObjectCreator(this.model, this.addSuitcaseAnimation);
    this.setPosition({
      x: -300,
      y: -697,
      z: 780
    });
    this.add(modelItem);
  }
}
