import * as THREE from 'three';
import {SvgObjectCreator} from '../svg';
import {ModelObjectCreator} from './model-object-creator';

export class BaseSceneItem extends THREE.Group {
  constructor() {
    super();
    this.svgShapes = [];
    this.models = [];
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

  addModels() {
    const groupModel = new THREE.Group();
    this.models.forEach((model) => {
      const modelItem = new ModelObjectCreator(model);
      groupModel.add(modelItem);
    });

    this.add(groupModel);
  }
}
