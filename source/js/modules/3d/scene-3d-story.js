import * as THREE from 'three';
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {Scene3d} from './scene-3d';
import {setup3d} from './setup-3d';
import {SCREEN_NAMES, STORY_SLIDE_NAMES} from '../../constants';
import {getRawShaderMaterial} from './shaders';
import {Animation} from '../animation';
import {LIGHTS} from './config/lights';
import {SCENE_INDEX_BY_NAME} from './config/scenes';
import {BUBBLES} from './config/bubbles';
import {Apartment} from './rooms/apartment';
import {Intro} from './rooms';
import {CameraRig} from './components/camera-rig';
import {Suitcase} from './components/suitcase';
import {isMobile} from '../../utils/is-mobile';
import {loadingManager} from './helpers/loading-manager';
import FullPageScroll from '../full-page-scroll';
import {objectStore} from './helpers/objectStore';
// import { GUI } from 'dat.gui'

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
    this.isMobile = isMobile();
    this.isInited = false;

    this.progressBar = document.getElementById(`progress-bar`);
  }

  getSceneIndex(name) {
    return SCENE_INDEX_BY_NAME[name];
  }

  setCameraPosition(screenName) {
    const sceneName = screenName === SCREEN_NAMES.STORY ? this.storyScreen : screenName;
    this.cameraRig.setCameraPosition(sceneName);
  }

  resetComposeAnimation(screenName) {
    if (screenName === SCREEN_NAMES.STORY && this.storyScreen === STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS) {
      this.startAnimations();
    } else {
      this.stopAnimations();
    }
  }

  updateScreen({detail}) {
    const {screenName} = detail;
    if (screenName !== SCREEN_NAMES.TOP && screenName !== SCREEN_NAMES.STORY) {
      return;
    }
    this.mainScreen = screenName;

    if (!this.isInited) {
      return;
    }
    if (screenName === SCREEN_NAMES.STORY) {
      this.suitcase.startAnimations();
    } else {
      setTimeout(() => {
        this.intro.startAnimations();
      }, 1400);
    }
    this.setCameraPosition(screenName);
    this.resetComposeAnimation(screenName);
  }

  updateSlide({detail}) {
    this.setCameraPosition(detail.slideName);
    this.storyScreen = detail.slideName;
    this.resetComposeAnimation(SCREEN_NAMES.STORY);
  }

  setListener() {
    document.body.addEventListener(`screenChanged`, this.updateScreen);
    document.body.addEventListener(`slideChanged`, this.updateSlide);
    document.body.addEventListener(`resize`, this.resize);
  }

  initHueShiftAnimation(material) {
    const maxHueShift = 0.25;
    let hueShiftDegrees = maxHueShift;
    const halfPi = Math.PI / 2;
    let period = 1;
    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        const sinusValue = Math.abs(Math.sin(2 * time));
        if (time > halfPi * period) {
          period += 1;
          hueShiftDegrees = Math.random() * maxHueShift;
        }

        material.uniforms.hueShift.value = -hueShiftDegrees * sinusValue;
        material.needsUpdate = true;
        this.render();
      },
      duration: `infinite`,
      delay: 300,
    }));
  }

  initBubblesAnimations(material) {
    const getAmplitude = (progress) => {
      return Math.sin(20 * progress) * Math.exp(-0.5 * progress) / 30;
    };

    BUBBLES.forEach((bubble, index) => {
      this.animations.push(new Animation({
        func: (progress) => {
          const amplitudeX = getAmplitude(progress);
          const cloned = bubble.center.clone();

          const currentX = bubble.center.getComponent(0);
          cloned.setX(currentX + amplitudeX);

          const factor = bubble.radius + 0.01;
          const positive = factor * progress;
          const negative = factor * (progress - 1);


          cloned.setY(progress + positive + negative);

          const currentBubbles = material.uniforms.bubbles.value;
          currentBubbles[index] = {center: cloned, radius: bubble.radius};
          material.uniforms.bubbles.value = currentBubbles;
          material.needsUpdate = true;
        },
        duration: 2000,
        delay: bubble.delay,
      }));
    });
  }

  initAnimations(material) {
    this.initHueShiftAnimation(material);
    this.initBubblesAnimations(material);
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

  getLight(lightType) {
    const light = new THREE.Group();
    const helper = new THREE.Group();

    LIGHTS.forEach(({type, color, intensity, position, distance, decay, castShadow}) => {
      const lightColor = new THREE.Color(color);

      if (lightType !== type) {
        return;
      }

      switch (type) {
        case `DirectionalLight`: {
          const lightUnit = new THREE.DirectionalLight(lightColor, intensity);
          const lightTarget = new THREE.Object3D();
          lightTarget.position.set(...Object.values(position));
          lightUnit.target = lightTarget;
          this.scene.add(lightTarget);
          light.add(lightUnit);
          // helper.add(new THREE.DirectionalLightHelper(lightUnit, 50));

          // const gui = new GUI();
          // const folder = gui.addFolder(`this light ${index}`);
          // folder.add(lightTarget.position, `x`, -5000, 5000, 1);
          // folder.add(lightTarget.position, `y`, -5000, 5000, 1);
          // folder.add(lightTarget.position, `z`, -5000, 5000, 1);
          // folder.add(lightUnit, `intensity`, 0, 1, 0.01);
          // folder.open();
          break;
        }

        case `PointLight`: {
          const lightUnit = new THREE.PointLight(lightColor, intensity, distance, decay);
          lightUnit.position.set(...Object.values(position));
          // helper.add(new THREE.PointLightHelper(lightUnit, 10));
          if (castShadow && !this.isMobile) {
            lightUnit.castShadow = true;
            // lightUnit.shadow.mapSize.width = this.width;
            // lightUnit.shadow.mapSize.height = this.height;
            lightUnit.shadow.mapSize.width = 1024;
            lightUnit.shadow.mapSize.height = 1024;
            // сглаживаем тени, убираем артефакты отражений
            lightUnit.shadow.bias = -0.005;
            lightUnit.shadow.camera.near = 100;
            lightUnit.shadow.camera.far = distance;
            lightUnit.shadow.camera.visible = true;
          }

          // const gui = new GUI();
          // const elem = document.querySelector(`.dg.ac`);
          // elem.style.zIndex = 1000;
          // const folder = gui.addFolder(`this light ${index}`);
          // folder.add(lightUnit.position, `x`, -5000, 5000, 1);
          // folder.add(lightUnit.position, `y`, -5000, 5000, 1);
          // folder.add(lightUnit.position, `z`, -5000, 5000, 1);
          // folder.add(lightUnit, `distance`, -5000, 5000, 1);
          // folder.add(lightUnit, `intensity`, 0, 1, 0.01);
          // folder.add(lightUnit, `decay`, 0, 2, 1);
          // folder.open();

          // const cameraHelper = new THREE.CameraHelper(lightUnit.shadow.camera);
          // this.scene.add(cameraHelper);

          light.add(lightUnit);
          break;
        }

        default:
          break;
      }

      this.scene.add(helper);
    });

    return light;
  }

  addSceneObject(object) {
    this.scene.add(object);
    this.render();
  }

  addIntro() {
    this.intro = new Intro();
    this.intro.position.set(0, 0, 0);
    this.addSceneObject(this.intro);
  }

  addApartment() {
    this.apartment = new Apartment();
    this.apartment.position.set(0, -700, -3270);
    this.addSceneObject(this.apartment);
  }

  initScreenObjects() {
    objectStore.createMap();

    loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
      this.progressBar.textContent = `${Math.round(itemsLoaded / itemsTotal * 100)} %`;
    };

    loadingManager.onLoad = () => {

      this.addIntro();
      this.addApartment();
      this.initCameraRig(this.camera);
      this.isInited = true;
      document.body.classList.add(`page--loaded`);

      setTimeout(() => {
        this.progressBar.classList.add(`progress-bar--loaded`);
        const fullPageScroll = new FullPageScroll();
        fullPageScroll.init();
      }, 0);
    };
  }

  initCameraRig(camera) {
    this.suitcase = new Suitcase();
    this.cameraRig = new CameraRig();
    this.cameraRig.addObjectToCameraNull(camera);
    this.scene.add(this.cameraRig);
    const dirLight = this.getLight(`DirectionalLight`);
    const ambientLight = new THREE.AmbientLight(`#fff`, 0.05);
    dirLight.add(ambientLight);
    this.cameraRig.addObjectToCameraNull(dirLight);

    const pointerLight = this.getLight(`PointLight`);
    pointerLight.position.z = CameraRig.getMinDepth();
    this.cameraRig.addObjectToRotationAxis(pointerLight);
    this.cameraRig.addObjectToRotationAxis(this.suitcase);
  }

  getEffectMaterial(texture) {
    const uniform = {
      map: new THREE.Uniform(texture),
      hasHueShift: {value: true},
      hueShift: {value: 0},
      bubbles: {value: BUBBLES},
      hasBubbles: {value: true},
      aspectRatio: {value: window.innerWidth / window.innerHeight},
    };
    return getRawShaderMaterial(uniform);
  }

  initComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(window.devicePixelRatio);

    const renderPass = new RenderPass(this.scene, this.camera);
    const effectMaterial = this.getEffectMaterial();
    this.initAnimations(effectMaterial);
    const effectPass = new ShaderPass(effectMaterial, `map`);

    this.composer.addPass(renderPass);
    this.composer.addPass(effectPass);
  }

  init() {
    super.init();
    this.initScreenObjects();
    const {
      renderer,
      scene,
      camera
    } = setup3d({initialWidth: this.width, initialHeight: this.height, fov: 35});
    const canvas = document.getElementById(`animation-screen`);
    scene.add(camera);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    // this.addDeveloperHelpers({camera: this.camera, canvas, scene});
    this.appendRendererToDOMElement(this.renderer, canvas);
    this.initComposer();
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
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height < 1 || width < 1) {
      return;
    }

    if (width > height) {
      this.camera.fov = 35;
    } else {
      this.camera.fov = (32 * height) / Math.min(width * 1.3, height);
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // 3.3. Renderer resize
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.render();
  }

  render() {
    this.composer.render();
    this.resizeInProgress = false;
  }
}

export const scene3dStory = new Scene3dStory();
