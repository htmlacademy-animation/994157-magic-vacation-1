import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export class Scene3d {
  constructor() {
    this.resize = this.resize.bind(this);
  }
  init(width, height) {
    // Устанавливаем стартовые значения сцены
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    window.addEventListener(`resize`, this.resize);
  }

  appendRendererToDOMElement(renderer, targetNode) {
    if (!targetNode) {
      return;
    }
    targetNode.appendChild(renderer.domElement);
  }

  addDeveloperHelpers({camera, canvas, scene}) {
    this.orbitControls = new OrbitControls(camera, canvas);
    this.orbitControls.target.set(0, 5, 0);
    this.orbitControls.update();
    const helpers = new THREE.Group();
    helpers.add(new THREE.AxesHelper(5000));
    scene.add(helpers);
  }

  construct() {
    // eslint-disable-next-line no-console
    console.warn(`Класс Scene3d требует расширения.
      Метод construct необходимо переопределить в дочернем классе.`);
  }

  resize() {
    // eslint-disable-next-line no-console
    console.warn(`Класс Scene3d требует расширения.
      Метод resize необходимо переопределить в дочернем классе.`);
  }
}
