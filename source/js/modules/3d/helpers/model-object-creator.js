import {BaseObject} from '../components/base-object';
import {objectStore} from './objectStore';
import {Object3D} from 'three';

export class ModelObjectCreator extends BaseObject {
  constructor(objectWithSettings, callbackAfterCreate) {
    super();
    this.figure = objectWithSettings;
    this.obj3d = null;
    this.callbackAfterCreate = callbackAfterCreate;

    this.create();
  }

  getModel(callback) {
    const storedItem = objectStore.getItem(this.figure.name);
    const obj3d = new Object3D().copy(storedItem, true);

    try {
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(this.figure.name, obj3d, `error get Model`, e);
      return;
    }
    this.obj3d = obj3d;

    if (typeof callback === `function`) {
      callback.call(null, obj3d);
    }
  }

  getObjectByName(name) {
    return this.obj3d.getObjectByName(name);
  }

  create() {
    const {name} = this.figure;
    this.addName(name);
    this.getModel(async (mesh) => {
      mesh.name = `mesh_${this.figure.name}`;
      await this.addGroupSandwich(mesh);

      if (this.figure.placement) {
        this.place(this.figure.placement, this.inner);
      }

      if (this.callbackAfterCreate) {
        this.callbackAfterCreate(this);
      }
    });
  }
}
