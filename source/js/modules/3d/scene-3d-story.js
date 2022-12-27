import * as THREE from 'three';
import {Scene3d} from './scene-3d';
import {setup3d} from './setup-3d';
import {SCREEN_NAMES, STORY_SLIDE_NAMES} from '../../constants';
import {getRawShaderMaterial} from './shaders';
import {Animation} from '../animation';
import {IMAGE_WIDTH} from './consts';
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

  // не используется
  addSceneItem(texture, index) {
    const geometry = new THREE.PlaneBufferGeometry(1024, 512);
    const material = getRawShaderMaterial(this.getUniforms(texture));
    material.needsUpdate = true;
    this.materials[texture.name] = material;
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = IMAGE_WIDTH * index;

    // room
    if (texture.room) {
      const room = texture.room;
      room.addSvgShapes();
      room.position.x = plane.position.x;
      this.scene.add(room);
    }

    this.scene.add(plane);
  }

  // не используется
  initTextures() {
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const textures = Object.entries([]).map(([name, {image, ...other}]) => ({
      name,
      map: textureLoader.load(image),
      ...other
    }));

    loadManager.onLoad = () => {
      textures.forEach((texture, index) => {
        this.addSceneItem(texture, index);
      });
      this.initAnimations();
      this.render();
    };
  }

  initHueShiftAnimation() {
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

        this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].uniforms.hueShift.value = -hueShiftDegrees * sinusValue;
        this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].needsUpdate = true;
        this.render();
      },
      duration: `infinite`
    }));
  }

  initBubblesAnimations() {
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
          cloned.setY(progress + 0.05);

          const currentBubbles = this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].uniforms.bubbles.value;
          currentBubbles[index] = {center: cloned, radius: bubble.radius};
          this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].uniforms.bubbles.value = currentBubbles;
          this.materials[STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS].needsUpdate = true;
        },
        duration: 2000,
        delay: bubble.delay,
      }));
    });
  }

  initAnimations() {
    this.initHueShiftAnimation();
    this.initBubblesAnimations();
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
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.resizeInProgress = false;
  }
}

export const scene3dStory = new Scene3dStory();
