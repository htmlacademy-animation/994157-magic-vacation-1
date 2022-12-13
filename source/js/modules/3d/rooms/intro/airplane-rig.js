import {BaseObject} from '../../components/base-object';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';
import {COLORS_MAP} from '../../config/colors';
import {ModelObjectCreator} from '../../components/model-object-creator';
import {degreesToRadians} from '../../utils';

export class AirplaneRig extends BaseObject {
  constructor() {
    super();
    this.model = {
      name: `airplane`,
      type: `obj`,
      placement: {
        position: {
          x: -100,
          y: -50,
          z: 0
        }
      },
      material: {
        ...MATERIAL_REFLECTIVITY.soft,
        color: COLORS_MAP.White,
      },
      path: `3d/module-6/scene-0-objects/airplane.obj`,
    };

    this._flightRadius = 200;
    this._flightRadiusChanged = true;

    this._flightHeight = 200;
    this._flightHeightChanged = true;

    this._rigRotationY = -180;
    this._rigRotationYChanged = true;

    this._planeRotationZ = 0;
    this._planeRotationZChanged = true;

    this._planeIncline = 0;
    this._planeInclineChanged = true;

    this.modelItem = new ModelObjectCreator(this.model);
    this.add(this.modelItem);

    this.create();
  }

  create() {
    this.position.x = 115;
    this.position.y = -55;
    this.setRotate({y: this._rigRotationY});
    this.modelItem.rotation.y = degreesToRadians(130);
    this.modelItem.mesh.rotation.x = degreesToRadians(-40);
  }

  get maxFlightRadius() {
    return 250;
  }

  get flightRadius() {
    return this._flightRadius;
  }

  set flightRadius(radius) {
    if (radius === this._flightRadius) {
      return;
    }

    this._flightRadius = radius;
    this._flightRadiusChanged = true;
  }

  get flightHeight() {
    return this._flightHeight;
  }

  set flightHeight(height) {
    if (height === this._flightHeight) {
      return;
    }

    this._flightHeight = height;
    this._flightHeightChanged = true;
  }

  get rigRotationY() {
    return this._rigRotationY;
  }

  set rigRotationY(rotation) {
    if (rotation === this._rigRotationY) {
      return;
    }

    this._rigRotationY = rotation;
    this._rigRotationYChanged = true;
  }

  get planeRotationZ() {
    return this._planeRotationZ;
  }

  set planeRotationZ(rotation) {
    if (rotation === this._planeRotationZ) {
      return;
    }

    this._planeRotationZ = rotation;
    this._planeRotationZChanged = true;
  }

  get planeIncline() {
    return this._planeIncline;
  }

  set planeIncline(rotation) {
    if (rotation === this._planeIncline) {
      return;
    }

    this._planeIncline = rotation;
    this._planeInclineChanged = true;
  }

  invalidate() {
    if (this._flightRadiusChanged) {
      this.modelItem.root.position.x = -this._flightRadius;
      this._flightRadiusChanged = false;
    }

    if (this._flightHeightChanged) {
      this.modelItem.root.position.y = this._flightHeight;
      this._flightHeightChanged = false;
    }

    if (this._rigRotationYChanged) {
      this.rotation.y = degreesToRadians(this._rigRotationY);
      this._rigRotationYChanged = false;
    }

    if (this._planeRotationZChanged) {
      this.modelItem.mesh.rotation.z = this._planeRotationZ;
      this._planeRotationZChanged = false;
    }

    if (this._planeInclineChanged) {
      this.modelItem.inner.rotation.z = this._planeIncline;
      this._planeInclineChanged = false;
    }
  }
}
