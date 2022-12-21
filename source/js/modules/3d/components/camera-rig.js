import * as THREE from 'three';
import {SCENE_INDEX_BY_NAME} from '../config/scenes';
import {SCREEN_NAMES} from '../../../constants';
import {degreesToRadians} from '../utils';
import {Animation} from '../../animation';
import {easeInOutSine} from '../../../utils/easing';
import {CAMERA_POSITION} from '../consts';

export class CameraRig extends THREE.Group {
  static getMinDepth() {
    return 2150;
  }

  static getMaxDepth() {
    return CAMERA_POSITION;
  }

  constructor() {
    super();

    // Описываем внутренние параметры и их ограничения
    this._angle = 0;
    this._angleChanged = false;

    this._depthChanged = true;
    this._depth = -CameraRig.getMaxDepth();

    this._horizonIncline = 0;
    this._horizonInclineChanged = true;

    this._pitchRotation = 0;
    this._pitchRotationChanged = true;

    this._pitchDepth = 1405;
    this._pitchDepthChanged = true;

    this.position.z = -CAMERA_POSITION;

    this.constructRigElements();
    this.invalidate();

    this.mouseEventHandlerTick = null;
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
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

  getCameraConfig(screenName) {
    // При этом она должна смотреть на сцену под углом 15deg,
    // в точку на оси стыковки комнат на высоте 130 отн. ед.
    // (в случае портретной ориентации 160 отн. ед. вниз от угла и под углом 20deg).
    const index = this.getSceneIndex(screenName);
    if (screenName === SCREEN_NAMES.TOP) {
      return {
        index,
        depth: -CAMERA_POSITION,
        angle: 0,
        horizonIncline: 0,
        pitchRotation: 0,
        pitchDepth: 1405,
      };
    }
    return {
      index,
      depth: 0,
      angle: ((index - 1) * Math.PI) / 2,
      horizonIncline: -degreesToRadians(15),
      pitchRotation: 0,
      pitchDepth: 2200,
    };
  }

  mouseMoveHandler(ev) {
    if (this.mouseEventHandlerTick) {
      window.cancelAnimationFrame(this.mouseEventHandlerTick);
    }

    const windowHeight = window.innerHeight;

    const targetMouseYPosition = (2 * (windowHeight / 2 - ev.y)) / windowHeight;

    const targetPitchRotation = degreesToRadians(4 * targetMouseYPosition);

    let currentPitchRotation = this.pitchRotation;

    const movePitchRotationCloserToTarget = (increase) => {
      if (
        (increase && currentPitchRotation > targetPitchRotation) ||
        (!increase && currentPitchRotation < targetPitchRotation)
      ) {
        window.cancelAnimationFrame(this.mouseEventHandlerTick);
        return;
      }

      if (increase) {
        currentPitchRotation += 0.001;
      } else {
        currentPitchRotation -= 0.001;
      }

      this.pitchRotation = currentPitchRotation;
      this.invalidate();
      //
      this.mouseEventHandlerTick = requestAnimationFrame(() => {
        movePitchRotationCloserToTarget(increase);
      });
    };

    movePitchRotationCloserToTarget(
        targetPitchRotation > this.pitchRotation
    );
  }

  addMouseEventListener() {
    window.addEventListener(`mousemove`, this.mouseMoveHandler.bind(this));
  }

  setCameraPosition(screenName) {
    window.removeEventListener(`mousemove`, this.mouseMoveHandler.bind(this));

    if (this.mouseEventHandlerTick) {
      window.cancelAnimationFrame(this.mouseEventHandlerTick);
    }

    const {index, depth, angle, horizonIncline, pitchRotation, pitchDepth} = this.getCameraConfig(screenName);

    const initDepth = this._depth;
    const initHorizonIncline = this._horizonIncline;
    const initAngle = this._angle;
    const initPitchRotation = this._pitchRotation;
    const initPitchDepth = this._pitchDepth;

    this.camaraAnimation = new Animation({
      func: (progress) => {
        this.depth = initDepth + (depth - initDepth) * progress;
        this.horizonIncline = initHorizonIncline + (horizonIncline - initHorizonIncline) * progress;
        this.angle = initAngle + (angle - initAngle) * progress;

        this.pitchRotation = initPitchRotation + (pitchRotation - initPitchRotation) * progress;
        this.pitchDepth = initPitchDepth + (pitchDepth - initPitchDepth) * progress;
        this.invalidate();
      },
      duration: this.getTransitionDuration(index),
      easing: easeInOutSine,
      callback: () => {
        this.addMouseEventListener();
      }
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

  get pitchRotation() {
    return this._pitchRotation;
  }

  set pitchRotation(value) {
    if (value === this._pitchRotation) {
      return;
    }

    this._pitchRotation = value;
    this._pitchRotationChanged = true;
  }

  get pitchDepth() {
    return this._pitchDepth;
  }

  set pitchDepth(value) {
    if (value === this._pitchDepth) {
      return;
    }

    this._pitchDepth = value;
    this._pitchDepthChanged = true;
  }

  constructRigElements() {
    // Создаём необходимое количество групп
    // Root - сам класс CamRig
    this.rotationAxis = new THREE.Group();
    this.depthTrack = new THREE.Group();
    this.camNull = new THREE.Group();
    this.pitchAxis = new THREE.Group();

    // Соединяем в конструкцию
    this.add(this.rotationAxis);
    this.rotationAxis.add(this.depthTrack);
    this.depthTrack.add(this.pitchAxis);
    this.pitchAxis.add(this.camNull);
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
      this.pitchAxis.position.y = this._pitchDepth * Math.tan(this._horizonIncline);
      this._horizonInclineChanged = false;
    }

    if (this._pitchRotationChanged) {
      this.camNull.position.y = Math.tan(this._pitchRotation) * this._pitchDepth;
      this.camNull.rotation.x = -this._pitchRotation;

      this._pitchRotationChanged = false;
    }

    if (this._pitchDepthChanged) {
      this.pitchAxis.position.z = this._pitchDepth;

      this._pitchDepthChanged = false;
    }
  }
}
