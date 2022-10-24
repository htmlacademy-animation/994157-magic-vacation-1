import * as THREE from 'three';

export const setup3d = ({initialWidth = 100, initialHeight = 100, far = 15500, fov = 45}) => {
  //
  // 1.1.1. Renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
    logarithmicDepthBuffer: true,
    powerPreference: `high-performance`,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(initialWidth, initialHeight);
  renderer.setClearColor(0x5F458C);

  //
  // 1.1.2. Scene
  const scene = new THREE.Scene();

  //
  // 1.1.3. Camera
  /*
   fov — Camera frustum vertical field of view. Default - 35.
   aspect — Camera frustum aspect ratio.
   near = 1 — Camera frustum near plane.
   far — Camera frustum far plane.
  * */
  const camera = new THREE.PerspectiveCamera(
      fov,
      initialWidth / initialHeight,
      1,
      far);

  return {
    renderer,
    scene,
    camera
  };
};
