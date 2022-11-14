import * as THREE from 'three';

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

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_pars_vertex>`,
        `varying vec2 vUv;`
    );

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_vertex>`,
        `vUv = uv;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `varying vec3 vViewPosition;`,
        `varying vec3 vViewPosition;
                  varying vec2 vUv;
                  uniform vec3 firstColor;
                  uniform vec3 secondColor;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `vec4 texelColor = vec4(firstColor, 1.0);
                  if (vUv.x > 1.0 / 7.0 && vUv.x < 2.0 / 7.0) {
                    texelColor = vec4(secondColor, 1.0);
                  }
                  if (vUv.x > 3.0 / 7.0 && vUv.x < 4.0 / 7.0) {
                    texelColor = vec4(secondColor, 1.0);
                  }
                 if (vUv.x > 5.0 / 7.0 && vUv.x < 6.0 / 7.0) {
                    texelColor = vec4(secondColor, 1.0);
                  }
                  texelColor = mapTexelToLinear( texelColor );
                  diffuseColor *= texelColor;
                  `
    );
  }
}
