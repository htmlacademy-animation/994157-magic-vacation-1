import * as THREE from 'three';
import {BaseObject} from '../baseObject';

class Snowman extends BaseObject {
  constructor() {
    super();

    this.nose = {
      radius: 18,
      height: 75,
      radialSegments: 20,
      color: `#F84201`,
    };

    this.smallBall = {
      radius: 44,
      segments: 20,
      color: `#B1CFF3`,
    };
    this.bigBall = {
      radius: 75,
      segments: 20,
      color: `#B1CFF3`,
    };

    this.addObjects();
  }

  getSmallBallMesh() {
    const sphere = new THREE.SphereGeometry(
        this.smallBall.radius,
        this.smallBall.segments,
        this.smallBall.segments
    );
    const material = this.createMaterial({color: this.smallBall.color});
    return new THREE.Mesh(
        sphere,
        material
    );
  }

  getNoseMesh() {
    const cone = new THREE.ConeGeometry(
        this.nose.radius,
        this.nose.height,
        this.nose.radialSegments
    );
    const material = this.createMaterial({color: this.nose.color});
    return new THREE.Mesh(
        cone,
        material
    );
  }

  addHead() {
    const head = new THREE.Group();

    const smallBallMesh = this.getSmallBallMesh();
    const noseMesh = this.getNoseMesh();

    noseMesh.rotation.x = 90 * THREE.Math.DEG2RAD;
    noseMesh.position.set(0, 0, 43);

    head.add(smallBallMesh, noseMesh);
    head.position.set(0, 108, 0);

    this.add(head);
  }

  addBigBall() {
    const sphere = new THREE.SphereGeometry(
        this.bigBall.radius,
        this.bigBall.segments,
        this.bigBall.segments
    );
    const material = this.createMaterial({color: this.bigBall.color});
    const mesh = new THREE.Mesh(
        sphere,
        material
    );

    this.addAxisToNode(mesh);

    this.add(mesh);
  }

  addObjects() {
    this.addBigBall();
    this.addHead();
  }
}

export const snowMan = new Snowman();
