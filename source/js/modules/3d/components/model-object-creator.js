import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {BaseObject} from './base-object';

export class ModelObjectCreator extends BaseObject {
  constructor(objectWithSettings) {
    super();
    this.object = objectWithSettings;
    this.objLoader = new OBJLoader();
    this.loaderGltf = new GLTFLoader();

    this.create();
  }

  loadObj(path, onComplete) {
    this.objLoader.load(path, onComplete);
  }

  loadGltf(path, onComplete) {
    this.loaderGltf.load(path, onComplete);
  }

  loadModel(callback) {
    const onComplete = (obj3d) => {
      obj3d.traverse((child) => {
        if (child.isMesh) {
          if (this.object.material) {
            child.material = this.createMaterial(this.object.material);
          }
          if (this.object.shadow) {
            this.addShadow(this.object.shadow, child);
          }
        }
      });

      if (typeof callback === `function`) {
        callback.call(null, obj3d);
      }
    };

    const onGltfComplete = (gltf) => {
      if (!gltf.scene) {
        return;
      }
      onComplete(gltf.scene);
    };

    switch (this.object.type) {
      case `gltf`:
        this.loadGltf(this.object.path, onGltfComplete);

        break;
      default:
        this.loadObj(this.object.path, onComplete);

        break;
    }
  }

  create() {
    this.loadModel((mesh) => {
      mesh.name = this.object.name;
      this.add(mesh);

      if (this.object.placement) {
        this.place(this.object.placement);
      }
    });
  }
}
