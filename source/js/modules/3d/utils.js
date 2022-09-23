import * as THREE from 'three';

export const getRawShaderMaterial = (uniforms) => new THREE.RawShaderMaterial(
    {
      uniforms,
      vertexShader: `
      uniform mat4 projectionMatrix;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      }
    `,
      fragmentShader: `
      precision mediump float;
      uniform sampler2D map;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D( map, vUv );
        gl_FragColor = texel;
      }
    `,
    });
