import * as THREE from 'three';

class TextureLoader {
  constructor() {
    this.loadManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadManager);
    this.isInit = false;
    this.matcapsMaterial = {};

    this.init();
  }

  loadMatcapsMaterial() {
    this.matcapsMaterial = {
      soft: this.textureLoader.load(`./img/module-7/matcaps/Soft-Mat.png`),
      basic: this.textureLoader.load(`./img/module-7/matcaps/Basic-Mat.png`),
      strong: this.textureLoader.load(`./img/module-7/matcaps/Strong-Mat-SnowColor.png`),
    };
  }

  init() {
    this.loadMatcapsMaterial();
  }
}

export const textureLoader = new TextureLoader();
