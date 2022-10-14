import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from 'three';

export class SvgObjectsLoader {
  constructor(objects) {
    this.loaderManager = new THREE.LoadingManager();
    this.SVGLoader = new SVGLoader(this.loaderManager);
    this.objects = objects;
    this.map = {};
  }

  getPaths(name) {
    return this.map[name];
  }

  createMap() {
    return new Promise((resolve, reject) => {
      this.map = this.objects.reduce((accum, item) => {
        this.SVGLoader.load(item.src, (data) => {
          accum[item.name] = data.paths;
        }, null, reject);
        return accum;
      }, {});
      this.loaderManager.onLoad = () => {
        resolve();
      };
    });
  }
}
