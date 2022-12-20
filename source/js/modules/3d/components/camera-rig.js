import * as THREE from 'three';
import {SCENE_INDEX_BY_NAME} from '../config/scenes';
import {SCREEN_NAMES} from '../../../constants';
import {degreesToRadians} from '../utils';
import {Animation} from '../../animation';
import {easeInOutSine} from '../../../utils/easing';

export class CameraRig extends THREE.Group {
  constructor() {
    super();

    // Описываем внутренние параметры и их ограничения
    this._angle = 0;
    this._angleChanged = false;

    this._depthChanged = true;
    this._depth = -4750;

    this._horizonIncline = 0;
    this._horizonInclineChanged = false;

    this.position.z = -3270;

    this.constructRigElements();
    this.invalidate();
  }

  getSceneIndex(name) {
    return SCENE_INDEX_BY_NAME[name];
  }

  getTransitionDuration(index) {
    if (index) {
      return 700;
    }
    return 1500;
  }

  getMinDepth() {
    return 2150;
  }

  getMaxDepth() {
    return 4750;
  }

  getCameraConfig(screenName) {
    // При этом она должна смотреть на сцену под углом 15deg,
    // в точку на оси стыковки комнат на высоте 130 отн. ед.
    // (в случае портретной ориентации 160 отн. ед. вниз от угла и под углом 20deg).
    const index = this.getSceneIndex(screenName);
    if (screenName === SCREEN_NAMES.TOP) {
      return {
        index,
        depth: -4750,
        angle: 0,
        horizonIncline: 0,
      };
    }
    return {
      index,
      depth: -2150,
      angle: ((index - 1) * Math.PI) / 2,
      horizonIncline: -degreesToRadians(15),
    };
  }

  setCameraPosition(screenName) {
    const {index, depth, angle, horizonIncline} = this.getCameraConfig(screenName);

    const initDepth = this._depth;
    const initHorizonIncline = this._horizonIncline;
    const initAngle = this._angle;
    this.camaraAnimation = new Animation({
      func: (progress) => {
        this.depth = initDepth + (depth - initDepth) * progress;
        this.horizonIncline = initHorizonIncline + (horizonIncline - initHorizonIncline) * progress;
        this.angle =
          initAngle + (angle - initAngle) * progress;
        this.invalidate();
      },
      duration: this.getTransitionDuration(index),
      easing: easeInOutSine,
    });

    this.camaraAnimation.start();
  }

  emitChangeDepth() {
    const event = new CustomEvent(`cameraDepthChange`, {
      detail: {
        depth: this.depth
      }
    });

    document.body.dispatchEvent(event);
  }

  // Добавляем setter и getter для внутренних параметров
  // Устанавливаем флаги
  set horizonIncline(value) {
    if (value === this._horizonIncline) {
      return;
    }

    this._horizonIncline = value;
    this._horizonInclineChanged = true;
  }

  get horizonIncline() {
    return this._horizonIncline;
  }

  set angle(value) {
    if (this._angle === value) {
      return;
    }
    this._angle = value;
    this._angleChanged = true;
  }

  get angle() {
    return this._angle;
  }

  set depth(value) {
    if (value === this._depth) {
      return;
    }
    this._depth = value;
    this._depthChanged = true;
    this.emitChangeDepth();
  }

  get depth() {
    return this._depth;
  }

  constructRigElements() {
    // Создаём необходимое количество групп
    // Root - сам класс CamRig
    this.rotationAxis = new THREE.Group();
    this.depthTrack = new THREE.Group();
    this.camNull = new THREE.Group();

    // Соединяем в конструкцию
    this.add(this.rotationAxis);
    this.rotationAxis.add(this.depthTrack);
    this.depthTrack.add(this.camNull);
  }

  addObjectToCameraNull(object) {
    this.camNull.add(object);
  }

  addObjectToRotationAxis(object) {
    this.rotationAxis.add(object);
  }

  // Пишем метод, который обновляет состояние конструкции на основании текущих значений параметров
  invalidate() {
    if (this._angleChanged) {
      this.rotationAxis.rotation.y = this._angle;

      // Сбрасываем флаг
      this._angleChanged = false;
    }

    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;

      // Сбрасываем флаг
      this._depthChanged = false;
    }

    if (this._horizonInclineChanged) {
      this.depthTrack.rotation.x = this._horizonIncline;
      this._horizonInclineChanged = false;
    }
  }
}
