import * as THREE from 'three';

import vertexShader from './vertex-shader.glsl';
import fragmentShader from './fragment-shader.glsl';

export const getRawShaderMaterial = (uniforms) => new THREE.RawShaderMaterial(
    {
      uniforms,
      vertexShader,
      fragmentShader,
    });
