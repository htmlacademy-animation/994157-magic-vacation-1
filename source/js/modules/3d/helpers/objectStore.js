import {loadingManager} from './loading-manager';
import * as THREE from 'three';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

class ObjectStore {
  constructor() {
    this.textureLoader = new THREE.TextureLoader(loadingManager);
    this.SVGLoader = new SVGLoader(loadingManager);
    this.objLoader = new OBJLoader(loadingManager);
    this.loaderGltf = new GLTFLoader(loadingManager);
    this.map = {};

    this.svgShapes = [
      {
        name: `flamingo`,
        src: `img/module-6/svg-forms/flamingo.svg`,
      },
      {
        name: `snowflake`,
        src: `img/module-6/svg-forms/snowflake.svg`,
      },
      {
        name: `question`,
        src: `img/module-6/svg-forms/question.svg`,
      },
      {
        name: `leaf`,
        src: `img/module-6/svg-forms/leaf.svg`,
      },
      {
        name: `keyhole`,
        src: `img/module-6/svg-forms/keyhole.svg`,
      },
      {
        name: `flower`,
        src: `img/module-6/svg-forms/flower.svg`,
      },
    ];

    this.models = [
      {
        name: `suitcase`,
        type: `gltf`,
        path: `3d/module-6/scene-0-objects/suitcase.gltf`,
      },
      {
        name: `watermelon`,
        type: `gltf`,
        path: `3d/module-6/scene-0-objects/watermelon.gltf`,
      },
      {
        name: `airplane`,
        type: `obj`,
        path: `3d/module-6/scene-0-objects/airplane.obj`,
      },
      {
        name: `dog`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/objects/dog.gltf`,
      },
      {
        name: `dog-and-suitcase-room`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
      },
      {
        name: `pyramid-and-cactus-room`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
      },
      {
        name: `showman-and-compass-room`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
      },
      {
        name: `ai-sonya-room`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
      },
      {
        name: `wall`,
        type: `obj`,
        path: `3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
      },
      {
        name: `sonya`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/objects/sonya.gltf`,
      },
      {
        name: `compass`,
        type: `gltf`,
        path: `3d/module-6/rooms-scenes/objects/compass.gltf`,
      }
    ];

    this.matcapsMaterials = [
      {
        name: `soft`,
        src: `./img/module-7/matcaps/Soft-Mat.png`
      },
      {
        name: `basic`,
        src: `./img/module-7/matcaps/Basic-Mat.png`
      },
      {
        name: `strong`,
        src: `./img/module-7/matcaps/Strong-Mat-SnowColor.png`
      }
    ];
  }

  getItem(name) {
    return this.map[name];
  }

  loadObj(path, onComplete) {
    this.objLoader.load(path, onComplete);
  }

  loadGltf(path, onComplete) {
    this.loaderGltf.load(path, onComplete);
  }

  loadModel(figure) {
    const onComplete = (obj3d) => {
      this.map[figure.name] = obj3d;
    };

    const onGltfComplete = (gltf) => {
      if (!gltf.scene) {
        return;
      }
      onComplete(gltf.scene);
    };

    switch (figure.type) {
      case `gltf`:
        this.loadGltf(figure.path, onGltfComplete);

        break;
      default:
        this.loadObj(figure.path, onComplete);

        break;
    }
  }

  loadMatcapsMaterial() {
    this.matcapsMaterials.forEach((item) => {
      this.textureLoader.load(item.src, (data) => {
        this.map[item.name] = data;
      });
    });
  }

  loadSvgShapes() {
    this.svgShapes.forEach((item) => {
      this.SVGLoader.load(item.src, (data) => {
        this.map[item.name] = data;
      });
    });
  }

  load3dModels() {
    this.models.forEach((item) => {
      this.loadModel(item);
    });
  }

  createMap() {
    this.loadMatcapsMaterial();
    this.loadSvgShapes();
    this.load3dModels();
  }
}

export const objectStore = new ObjectStore();
