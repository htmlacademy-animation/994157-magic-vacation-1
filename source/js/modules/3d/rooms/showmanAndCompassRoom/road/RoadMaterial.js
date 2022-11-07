import * as THREE from 'three';
import vertexShader from './shader/vertex-shader.glsl';
import fragmentShader from './shader/fragment-shader.glsl';

export class RoadMaterial extends THREE.MeshStandardMaterial {
  constructor({
    mainColor,
    lineColor
  }) {
    super();
    this.uniforms = {
      mainColor: {value: new THREE.Color(mainColor)},
      lineColor: {value: new THREE.Color(lineColor)}
    };
  }

  onBeforeCompile(shader) {
    shader.uniforms = {
      ...shader.uniforms,
      ...this.uniforms,
    };
    shader.vertexShader = vertexShader;

    shader.fragmentShader = fragmentShader;
  }
}
