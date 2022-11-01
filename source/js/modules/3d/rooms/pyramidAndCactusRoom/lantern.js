import {BaseObject} from '../baseObject';
import * as THREE from 'three';
import {getConeRadius} from '../../utils';
import {COLORS_MAP} from '../../config/colors';
import {MATERIAL_REFLECTIVITY} from '../../config/material-reflectivity';

class Lantern extends BaseObject {
  constructor() {
    super();

    this.lightBoxTop = {
      widthTop: 45,
      widthBottom: 57,
      height: 6,
      radialSegments: 4,
      material: {
        color: COLORS_MAP.Blue,
        flatShading: true,
        ...MATERIAL_REFLECTIVITY.soft
      },
    };

    this.lightBox = {
      widthTop: 42,
      widthBottom: 34,
      height: 60,
      radialSegments: 4,
      material: {
        flatShading: true,
        color: COLORS_MAP.LightBlue,
        ...MATERIAL_REFLECTIVITY.soft
      },
    };

    this.lightBoxBottom = {
      width: 37,
      height: 4,
      material: {
        color: COLORS_MAP.Blue,
        ...MATERIAL_REFLECTIVITY.soft
      },
    };

    this.column = {
      height: 230,
      radius: 7,
      radialSegments: 20,
      material: {
        color: COLORS_MAP.Blue,
        ...MATERIAL_REFLECTIVITY.soft
      },
    };

    this.sphere = {
      height: 16,
      radius: 16,
      segments: 20,
      material: {
        color: COLORS_MAP.Blue,
        ...MATERIAL_REFLECTIVITY.soft
      },
    };

    this.foot = {
      height: 120,
      radius: 16,
      radialSegments: 20,
      material: {
        color: COLORS_MAP.Blue,
        ...MATERIAL_REFLECTIVITY.soft
      },
    };

    this.addObject();
  }

  createLightBox() {
    const lightBox = new THREE.Group();


    // подставка
    const lightBoxBottom = new THREE.BoxGeometry(
        this.lightBoxBottom.width,
        this.lightBoxBottom.height,
        this.lightBoxBottom.width
    );
    const lightBoxBottomMesh = new THREE.Mesh(
        lightBoxBottom,
        this.createMaterial(this.lightBoxBottom.material)
    );

    // светильник
    const box = new THREE.CylinderGeometry(
        getConeRadius(this.lightBox.widthTop),
        getConeRadius(this.lightBox.widthBottom),
        this.lightBox.height,
        this.lightBox.radialSegments
    );
    const boxMesh = new THREE.Mesh(
        box,
        this.createMaterial(this.lightBox.material)
    );

    boxMesh.position.set(0, this.lightBox.height / 2 + this.lightBoxBottom.height / 2, 0);

    boxMesh.rotation.copy(
        new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0),
        `XYZ`
    );

    // крышка
    const lightBoxTop = new THREE.CylinderGeometry(
        getConeRadius(this.lightBoxTop.widthTop),
        getConeRadius(this.lightBoxTop.widthBottom),
        this.lightBoxTop.height,
        this.lightBoxTop.radialSegments
    );
    const lightBoxTopMesh = new THREE.Mesh(
        lightBoxTop,
        this.createMaterial(this.lightBoxTop.material)
    );

    lightBoxTopMesh.position.set(0, this.lightBox.height + this.lightBoxBottom.height, 0);

    lightBoxTopMesh.rotation.copy(
        new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0),
        `XYZ`
    );

    lightBox.add(lightBoxBottomMesh, boxMesh, lightBoxTopMesh);
    return lightBox;
  }

  createBase() {
    const base = new THREE.Group();
    const footGroup = new THREE.Group();

    // палка
    const column = new THREE.CylinderGeometry(
        this.column.radius,
        this.column.radius,
        this.column.height,
        this.column.radialSegments
    );
    const columnMesh = new THREE.Mesh(
        column,
        this.createMaterial(this.column.material)
    );
    this.addAxisToNode(columnMesh);

    // ножка
    const foot = new THREE.CylinderGeometry(
        this.foot.radius,
        this.foot.radius,
        this.foot.height,
        this.foot.radialSegments
    );
    const footMesh = new THREE.Mesh(
        foot,
        this.createMaterial(this.foot.material)
    );

    const halfSphere = new THREE.SphereGeometry(
        this.sphere.radius,
        this.sphere.segments,
        this.sphere.segments,
        Math.PI * 2.0,
        Math.PI * 2.0,
        0,
        Math.PI * 0.5
    );
    const halfSphereMesh = new THREE.Mesh(
        halfSphere,
        this.createMaterial(this.sphere.material)
    );

    halfSphereMesh.position.set(0, this.foot.height / 2, 0);

    footGroup.add(footMesh, halfSphereMesh);

    const footGroupY = -1 * (this.column.height / 2 + this.foot.height / 2 - this.sphere.radius);

    footGroup.position.set(0, footGroupY, 0);

    base.add(footGroup, columnMesh);
    return base;
  }

  addObject() {
    const base = this.createBase();
    const lightBox = this.createLightBox();
    const lightBoxY = this.column.height / 2 + this.lightBoxBottom.height / 2;
    lightBox.position.set(0, lightBoxY, 0);
    this.add(lightBox, base);
  }
}

export const lantern = new Lantern();
