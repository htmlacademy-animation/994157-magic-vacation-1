import * as THREE from 'three';

class TextureLoader {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.isInit = false;
    this.matcapsMaterial = {};
    this.matcapsMaterial = {};

    this.matcaps = [
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

    this.init();
  }

  loadMatcapsMaterial() {
    this.matcapsMaterial = this.matcaps.reduce((accum, item) => {
      this.textureLoader.load(item.src, (data) => {
        accum[item.name] = data;
      }, null);
      return accum;
    }, {});
  }

  loadModels() {
    this.matcapsMaterial = this.matcaps.reduce((accum, item) => {
      this.textureLoader.load(item.src, (data) => {
        accum[item.name] = data;
      }, null);
      return accum;
    }, {});
  }

  init() {
    this.loadMatcapsMaterial();
  }
}

export const textureLoader = new TextureLoader();
