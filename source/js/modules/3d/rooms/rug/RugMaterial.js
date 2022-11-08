import * as THREE from 'three';
import vertexShader from './shader/vertex-shader.glsl';
import fragmentShader from './shader/fragment-shader.glsl';

export class RugMaterial extends THREE.MeshStandardMaterial {
  constructor({
    firstColor,
    secondColor
  }) {
    super();
    this.uniforms = {
      firstColor: {value: new THREE.Color(firstColor)},
      secondColor: {value: new THREE.Color(secondColor)}
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
