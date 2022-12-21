import {BaseObject} from '../../components/base-object';
import * as THREE from 'three';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';

class BehindKeyhole extends BaseObject {
  constructor() {
    super();

    this.data = {
      material: {
        color: COLORS_MAP.Purple,
        transparent: true,
        ...MATERIAL_REFLECTIVITY.basic
      }
    };

    this.material = null;

    this.animationFadeIn = null;
    this.animationFadeOut = null;

    this.init();

    this._opacity = 1;
    this._isOpacityChanged = false;

    this.depthChange = this.depthChange.bind(this);
    this.invalidate = this.invalidate.bind(this);
  }

  addObject() {
    this.material = this.createMaterial(this.data.material);
    const geometry = new THREE.PlaneGeometry(300, 300);
    const mesh = new THREE.Mesh(
        geometry,
        this.material);
    this.add(mesh);
  }

  depthChange({detail}) {
    const {depth} = detail;

    let opacity;

    const fullOpacityBreakpoint = -2200;
    const noOpacityBreakpoint = -1800;

    if (depth < fullOpacityBreakpoint) {
      opacity = 1;
    } else if (depth > noOpacityBreakpoint) {
      opacity = 0;
    } else {
      opacity = (depth - noOpacityBreakpoint) / (fullOpacityBreakpoint - noOpacityBreakpoint);
    }

    this.opacity = opacity;
    this.invalidate();
  }

  init() {
    this.addObject();
    document.body.addEventListener(`cameraDepthChange`, this.depthChange.bind(this));
  }

  set opacity(value) {
    if (value === this._opacity) {
      return;
    }

    this._opacity = value;
    this._isOpacityChanged = true;
  }

  get opacity() {
    return this._opacity;
  }

  invalidate() {
    if (this._isOpacityChanged) {
      this.material.opacity = this._opacity;

      this._isOpacityChanged = false;
    }
  }
}

export const behindKeyhole = new BehindKeyhole();
