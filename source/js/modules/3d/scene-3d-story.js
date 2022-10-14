import * as THREE from 'three';
import {Scene3d} from './scene-3d';
import {setup3d} from './setup-3d';
import {SCREEN_NAMES, STORY_SLIDE_NAMES} from '../../constants';
import {getRawShaderMaterial} from './shaders';
import {Animation2d} from '../2d/animation-2d';
import {IMAGE_WIDTH, BUBBLES, CAMERA_POSITION, SCENE_INDEX_BY_NAME, LIGHTS, IMAGES, SVG_SHAPES} from './consts';
import {SvgObjectCreator, SvgObjectsLoader} from './svg';

class Scene3dStory extends Scene3d {
  constructor() {
    super();
    this.mainScreen = SCREEN_NAMES.TOP;
    this.storyScreen = STORY_SLIDE_NAMES.DOG_AND_SUITCASE;
    this.resizeInProgress = false;
    this.animations = [];
    this.materials = {};
    this.svgObjectsLoader = new SvgObjectsLoader(SVG_SHAPES);
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

  addSceneItem(texture, index) {
    const geometry = new THREE.PlaneBufferGeometry(1024, 512);
    const material = getRawShaderMaterial(this.getUniforms(texture));
    material.needsUpdate = true;
    this.materials[texture.name] = material;
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = IMAGE_WIDTH * index;

    // room
    if (texture.room) {
      texture.room.position.x = plane.position.x;
      this.scene.add(texture.room);
    }

    // svgShapes
    if (texture.svgShapes) {
      const svgGroup = new THREE.Group();
      texture.svgShapes.forEach((shape) => {
        const paths = this.svgObjectsLoader.getPaths(shape.name);

        const svgObject = new SvgObjectCreator({...shape, paths});
        svgGroup.add(svgObject);
      });

      svgGroup.position.x = plane.position.x;
      this.scene.add(svgGroup);
    }

    this.scene.add(plane);
  }

  initTextures() {
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const textures = Object.entries(IMAGES).map(([name, {image, ...other}]) => ({
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

  initBubblesAnimations() {
    const getAmplitude = (progress) => {
      return Math.sin(20 * progress) * Math.exp(-0.5 * progress) / 30;
    };

    BUBBLES.forEach((bubble, index) => {
      this.animations.push(new Animation2d({
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

  getLight() {
    const light = new THREE.Group();
    const helper = new THREE.Group();

    LIGHTS.forEach(({type, color, intensity, position, distance, decay}) => {
      const lightColor = new THREE.Color(color);
      if (type === `DirectionalLight`) {
        const lightUnit = new THREE.DirectionalLight(lightColor, intensity);
        // todo: разобраться со светом
        // lightUnit.target.position.set(...Object.values(position));
        lightUnit.position.set(...Object.values(position));
        this.scene.add(lightUnit.target);
        light.add(lightUnit);
        helper.add(new THREE.DirectionalLightHelper(lightUnit));
      } else {
        const lightUnit = new THREE.PointLight(lightColor, intensity, distance, decay);
        lightUnit.position.set(...Object.values(position));
        helper.add(new THREE.PointLightHelper(lightUnit, 10));
        light.add(lightUnit);
      }

      this.scene.add(helper);
    });
    return light;
  }

  setLight() {
    const light = this.getLight();
    light.position.z = this.camera.position.z;
    this.scene.add(light);
  }

  initScreenObjects() {
    this.svgObjectsLoader.createMap().then(() => {
      this.initTextures();
      // eslint-disable-next-line no-console
    }).catch((e) => console.warn(e));
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
    camera.position.z = CAMERA_POSITION;
    scene.add(camera);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.appendRendererToDOMElement(this.renderer, canvas);
    this.setListener();
    this.addDeveloperHelpers({camera: this.camera, canvas, scene});

    this.setLight();

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
