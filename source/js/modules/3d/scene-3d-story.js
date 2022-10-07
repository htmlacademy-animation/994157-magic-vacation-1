import * as THREE from 'three';
import {Scene3d} from './scene-3d';
import {setup3d} from './setup-3d';
import {SCREEN_NAMES, STORY_SLIDE_NAMES} from '../../constants';
import {getRawShaderMaterial} from './shaders';
import {Animation2d} from '../2d/animation-2d';

const IMAGE_WIDTH = 2048;

const BUBBLES = [
  {
    center: new THREE.Vector2(0.25, 0.4),
    radius: 0.06,
  },
  {
    center: new THREE.Vector2(0.4, 0.4),
    radius: 0.07,
  },
  {
    center: new THREE.Vector2(0.5, 0.5),
    radius: 0.04,
  }
];

const IMAGES = Object.freeze({
  [SCREEN_NAMES.TOP]: {
    image: `img/module-5/scenes-textures/scene-0.png`,
    hasHueShift: false,
  },
  [STORY_SLIDE_NAMES.DOG_AND_SUITCASE]: {
    image: `img/module-5/scenes-textures/scene-1.png`,
    hasHueShift: false,
  },
  [STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS]: {
    image: `img/module-5/scenes-textures/scene-2.png`,
    hasHueShift: true,
    hueShift: 0,
    bubbles: BUBBLES,
  },
  [STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS]: {
    image: `img/module-5/scenes-textures/scene-3.png`,
    hasHueShift: false,
  },
  [STORY_SLIDE_NAMES.AI_SONYA]: {
    image: `img/module-5/scenes-textures/scene-4.png`,
    hasHueShift: false,
  },
});

const SCENE_INDEX_BY_NAME = Object.freeze({
  [SCREEN_NAMES.TOP]: 0,
  [STORY_SLIDE_NAMES.DOG_AND_SUITCASE]: 1,
  [STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS]: 2,
  [STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS]: 3,
  [STORY_SLIDE_NAMES.AI_SONYA]: 4,
});

class Scene3dStory extends Scene3d {
  constructor() {
    super();
    this.mainScreen = SCREEN_NAMES.TOP;
    this.storyScreen = STORY_SLIDE_NAMES.DOG_AND_SUITCASE;
    this.resizeInProgress = false;
    this.animations = [];
    this.materials = {};
    this.updateScreen = this.updateScreen.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);
  }

  getSceneIndex(name) {
    return SCENE_INDEX_BY_NAME[name];
  }

  setCameraPosition(screenName) {
    const sceneName = screenName === SCREEN_NAMES.STORY ? this.storyScreen : screenName;
    const sceneIndex = this.getSceneIndex(sceneName);
    this.camera.position.x = IMAGE_WIDTH * sceneIndex;

    if (sceneName === STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS) {
      this.startAnimations();
    } else {
      this.stopAnimations();
    }
    this.render();
  }

  updateScreen({detail}) {
    const {screenName} = detail;
    if (screenName !== SCREEN_NAMES.TOP && screenName !== SCREEN_NAMES.STORY) {
      return;
    }
    this.mainScreen = screenName;
    this.setCameraPosition(screenName);
  }

  updateSlide({detail}) {
    this.setCameraPosition(detail.slideName);
    this.storyScreen = detail.slideName;
  }

  setListener() {
    document.body.addEventListener(`screenChanged`, this.updateScreen);
    document.body.addEventListener(`slideChanged`, this.updateSlide);
    document.body.addEventListener(`resize`, this.resize);
  }

  getUniforms(texture) {
    if (texture.bubbles) {
      return {
        map: {value: texture.map},
        hasHueShift: {value: true},
        hueShift: {value: 0},
        bubbles: {value: texture.bubbles},
        hasBubbles: {value: true}
      };
    }
    return {map: {value: texture.map}, hasHueShift: {value: false}, hasBubbles: {value: false}};
  }

  initTexture() {
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const textures = Object.entries(IMAGES).map(([name, {image, ...other}]) => ({
      name,
      map: textureLoader.load(image),
      ...other
    }));

    loadManager.onLoad = () => {
      textures.forEach((texture, index) => {
        const geometry = new THREE.PlaneBufferGeometry(2048, 1024);
        const material = getRawShaderMaterial(this.getUniforms(texture));
        material.needsUpdate = true;
        this.materials[texture.name] = material;
        const plane = new THREE.Mesh(geometry, material);
        plane.position.x = IMAGE_WIDTH * index;
        this.scene.add(plane);
      });
      this.render();
    };
  }

  initAnimations() {
    const maxHueShift = 0.25;
    let hueShiftDegrees = maxHueShift;
    const halfPi = Math.PI / 2;
    let period = 1;
    this.animations.push(new Animation2d({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        const sinusValue = Math.abs(Math.sin(2 * time));
        if (time > halfPi * period) {
          period += 1;
          hueShiftDegrees = Math.random() * maxHueShift;
        }

        this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].uniforms.hueShift.value = -hueShiftDegrees * sinusValue;
        this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].needsUpdate = true;
        this.render();
      },
      duration: `infinite`
    }));
  }

  startAnimations() {
    this.animations.forEach((anim) => {
      anim.start();
    });
  }

  stopAnimations() {
    this.animations.forEach((anim) => {
      anim.stop();
    });
  }

  init() {
    super.init();
    this.initTexture();
    this.initAnimations();

    const {
      renderer,
      scene,
      camera
    } = setup3d({initialWidth: this.width, initialHeight: this.height});
    camera.position.z = 1000;
    scene.add(camera);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.appendRendererToDOMElement(this.renderer, document.getElementById(`animation-screen`));
    this.setListener();

    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  resize() {
    if (this.resizeInProgress) {
      return;
    }
    this.resizeInProgress = true;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.resizeInProgress = false;
  }
}

export const scene3dStory = new Scene3dStory();
