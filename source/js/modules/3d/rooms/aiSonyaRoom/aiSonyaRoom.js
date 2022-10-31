import {Saturn} from '../saturn';
import {BaseSceneItem} from '../baseSceneItem';

class AiSonyaRoom extends BaseSceneItem {
  constructor() {
    super();

    this.addObject();
  }

  addObject() {
    const saturn = new Saturn({isShadowed: true});
    saturn.scale.set(0.9, 0.9, 0.9);
    saturn.position.set(85, 220, -540);
    this.add(saturn);
  }
}

export const aiSonyaRoom = new AiSonyaRoom();
