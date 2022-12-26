import * as THREE from 'three';
import {degreesToRadians} from '../utils';
import {isMobile} from '../../../utils/is-mobile';
import {textureLoader} from '../helpers/texture-loader';

export class BaseObject extends THREE.Group {
  constructor() {
    super();
    // root вкладываем в THREE.Group(обьект сцены)
    this.root = new THREE.Group();
    // inner вкладываем в root
    this.inner = new THREE.Group();
    // mesh вкладываем в inner
    this.mesh = new THREE.Group();

    this.animations = [];
    this.isRunningAnimations = false;

    this.isMobile = isMobile();

    this.textureLoader = textureLoader;
  }

  addName(name) {
    this.name = name;
    this.mesh.name = `mesh_${name}`;
    this.inner.name = `inner_${name}`;
    this.root.name = `root_${name}`;
  }

  addGroupSandwich(mesh) {
    this.mesh.add(mesh);
    this.inner.add(this.mesh);
    this.root.add(this.inner);
    this.add(this.root);
  }

  addShadow({castShadow, receiveShadow}, child = this) {

    if (receiveShadow) {
      child.receiveShadow = true;
    }

    if (castShadow) {
      child.castShadow = true;
    }
  }

  createMaterial({color, type, ...rest}) {
    if (this.isMobile) {
      return new THREE.MeshMatcapMaterial({
        ...(color && {
          color: new THREE.Color(color)
        }),
        matcap: textureLoader.matcapsMaterial[type],
        ...rest,
      });
    }

    return new THREE.MeshStandardMaterial({
      ...(color && {
        color: new THREE.Color(color)
      }),
      ...rest
    });
  }

  setRotate(rotate, object = this) {
    const {x = 0, y = 0, z = 0} = rotate;
    object.rotation.copy(
        new THREE.Euler(degreesToRadians(x), degreesToRadians(y), degreesToRadians(z)),
        `XYZ`
    );
  }

  setPosition(position, object = this) {
    object.position.set(...Object.values(position));
  }

  setScale(scale, object = this) {
    if (typeof scale === `number`) {
      object.scale.set(scale, scale, scale);
    } else {
      const {x = 0, y = 0, z = 0} = scale;
      object.scale.set(x, y, z);
    }
  }

  place(placement, object = this) {
    const {position, rotate, scale} = placement;

    if (position) {
      this.setPosition(position, object);
    }

    if (rotate) {
      this.setRotate(rotate, object);
    }

    if (scale !== undefined) {
      this.setScale(scale, object);
    }
  }

  addAxisToNode(node, axisSize = 200) {
    // The X axis is red. The Y axis is green. The Z axis is blue.
    node.geometry.computeBoundingBox();

    const bounds = node.geometry.boundingBox;
    const center = bounds.getCenter();
    const axis = new THREE.AxesHelper(axisSize);
    axis.position.copy(center);
    node.add(axis);
  }

  startAnimations() {
    this.isRunningAnimations = true;
    this.animations.forEach((anim) => {
      anim.start();
    });
  }

  stopAnimations() {
    this.isRunningAnimations = false;
    this.animations.forEach((anim) => {
      anim.stop();
    });
  }
}
