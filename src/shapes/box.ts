import * as THREE from 'three';
import BaseShape from '.';

export default class Box extends BaseShape {
  constructor(width: number = 1, height: number = 1, depth: number = 1) {
    const shape = new THREE.BoxGeometry(width, height, depth, 1, 1);

    shape.rotateX(90);
    super(shape, 0, Math.PI, 0, 100);
  }
}
