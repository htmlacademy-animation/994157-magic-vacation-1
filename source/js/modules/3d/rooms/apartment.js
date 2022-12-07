import {dogAndSuitcaseRoom, pyramidAndCactusRoom, showmanAndCompassRoom, aiSonyaRoom} from '../rooms';
import {BaseSceneItem} from '../components/base-scene-item';
import {Animation} from '../../animation';
import _ from '../../../utils/easing';
import {tick} from '../../../utils/keyframe-tools';

export class Apartment extends BaseSceneItem {
  constructor(svgObjectsLoader) {
    super();
    this.svgObjectsLoader = svgObjectsLoader;

    this.rooms = [
      {
        item: dogAndSuitcaseRoom,
        rotateY: 0,
      },
      {
        item: pyramidAndCactusRoom,
        rotateY: Math.PI / 2,
      },
      {
        item: showmanAndCompassRoom,
        rotateY: Math.PI,
      },
      {
        item: aiSonyaRoom,
        rotateY: -Math.PI / 2,
      }
    ];

    this.suitcase = {
      name: `suitcase`,
      type: `gltf`,
      placement: {
        rotate: {
          x: 0,
          y: 20,
          z: 0
        },
      },
      animation: {
        from: {
          position: {
            x: 300,
            y: 140,
            z: 790
          },
        },
        to: {
          position: {
            x: 300,
            y: 0,
            z: 790
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
  }

  addRooms() {
    this.rooms.forEach(({item, rotateY}) => {
      item.addSvgShapes(this.svgObjectsLoader);
      item.rotateY(rotateY);
      this.add(item);
    });
  }

  addSuitcaseAnimation(suitcaseGroup) {
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
      delay: 500,
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
      delay: 500,
      easing: _.easeOutCubic,
    }));
  }

  create() {
    this.addRooms();
    this.addModel(this.suitcase, this.addSuitcaseAnimation);

    // todo добавит старт анимации при загрузке страницы после синхронизации двух сцен
    setTimeout(() => {
      this.startAnimations();
    }, 1500);
  }
}
