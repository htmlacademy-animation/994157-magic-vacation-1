import * as THREE from 'three';
import {SvgObjectCreator} from '../svg';

export class BaseSceneItem extends THREE.Group {
  constructor() {
    super();
    this.svgShapes = [];
  }

  addSvgShapes(svgObjectsLoader) {
    const svgGroup = new THREE.Group();
    this.svgShapes.forEach((shape) => {
      const paths = svgObjectsLoader.getPaths(shape.name);

      const svgObject = new SvgObjectCreator({...shape, paths});
      svgGroup.add(svgObject);
    });

    this.add(svgGroup);
  }
}
