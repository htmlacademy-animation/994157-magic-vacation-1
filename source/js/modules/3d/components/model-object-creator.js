import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {BaseObject} from './base-object';
// import {GUI} from 'dat.gui';

export class ModelObjectCreator extends BaseObject {
  constructor(objectWithSettings) {
    super();
    this.figure = objectWithSettings;
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
          if (this.figure.material) {
            child.material = this.createMaterial(this.figure.material);
          }
          if (this.figure.shadow) {
            this.addShadow(this.figure.shadow, child);
          }
          // this.addAxisToNode(child);
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

    switch (this.figure.type) {
      case `gltf`:
        this.loadGltf(this.figure.path, onGltfComplete);

        break;
      default:
        this.loadObj(this.figure.path, onComplete);

        break;
    }
  }

  create() {
    const {name} = this.figure;
    this.addName(name);
    // const gui = new GUI();
    this.loadModel((mesh) => {
      mesh.name = this.figure.name;
      this.addGroupSandwich(mesh);
      // if (this.figure.name === `watermelon`) {
      //   const elem = document.querySelector(`.dg.ac`);
      //   elem.style.zIndex = 1000;
      //   const folder = gui.addFolder(`figure ${this.figure.name}`);
      //   folder.add(this.rotation, `x`, 0, Math.PI * 2, 0.01);
      //   folder.add(this.rotation, `y`, 0, Math.PI * 2, 0.01);
      //   folder.add(this.rotation, `z`, 0, Math.PI * 2, 0.01);
      //   folder.open();
      // }

      if (this.figure.placement) {
        this.place(this.figure.placement, this.inner);
      }
    });
  }
}
