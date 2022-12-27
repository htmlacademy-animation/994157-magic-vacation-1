import * as THREE from 'three';
import {SvgObjectCreator} from '../helpers/svg-object-creator';
import {ModelObjectCreator} from '../helpers/model-object-creator';
import {objectStore} from '../helpers/objectStore';

export class BaseSceneItem extends THREE.Group {
  constructor() {
    super();
    this.svgShapes = [];
    this.models = [];
    this.animations = [];
  }

  addSvgShapes(callback) {
    const svgGroup = new THREE.Group();
    svgGroup.name = `svgGroup`;
    const figureWithObjects = [];
    this.svgShapes.forEach((shape) => {
      const {paths} = objectStore.getItem(shape.name);

      const svgObject = new SvgObjectCreator({...shape, paths});
      svgGroup.add(svgObject);
      figureWithObjects.push(svgObject);
    });

    if (callback) {
      callback(figureWithObjects);
    }

    this.add(svgGroup);
  }

  addModels(callback) {
    const groupModel = new THREE.Group();
    const figureWithObjects = [];
    this.models.forEach((model) => {
      const modelItem = new ModelObjectCreator(model);
      groupModel.add(modelItem);
      figureWithObjects.push(modelItem);
    });

    this.add(groupModel);

    if (callback) {
      callback(figureWithObjects);
    }
  }

  getModel(model, callback) {
    return new ModelObjectCreator(model, callback);
  }

  addModel(model, callback) {
    const modelItem = new ModelObjectCreator(model, callback);
    this.add(modelItem);
  }

  addObject(item) {
    this.add(item);
  }

  startAnimations() {
    this.animations.forEach((anim) => {
      anim.start();
    });
  }

  stopAnimations() {
    this.animations.forEach((anim) => {
      anim.stop();
    });
  }
}
