import * as THREE from 'three';

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
                  uniform vec3 mainColor;
                  uniform vec3 lineColor;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `vec4 texelColor = vec4(mainColor, 1.0);
                  if (vUv.y > 0.36 && vUv.y < 0.39) {
                    if (vUv.x > 0.11 && vUv.x < 0.22) {
                      texelColor = vec4(lineColor, 1.0);
                    }
                    if (vUv.x > 0.33 && vUv.x < 0.44) {
                      texelColor = vec4(lineColor, 1.0);
                    }
                    if (vUv.x > 0.55 && vUv.x < 0.66) {
                      texelColor = vec4(lineColor, 1.0);
                    }
                    if (vUv.x > 0.77 && vUv.x < 0.88) {
                      texelColor = vec4(lineColor, 1.0);
                    }
                  }
                  texelColor = mapTexelToLinear( texelColor );
                  diffuseColor *= texelColor;
                  `
    );
  }
}
