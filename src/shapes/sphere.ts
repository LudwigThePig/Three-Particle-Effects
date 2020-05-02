import * as THREE from 'three';
import BaseShape from '.';

/**
 * This is the most primitive shape
 */
export default class SphereShape extends BaseShape {
  constructor(radius: number = 1) {
    const shape = new THREE.SphereGeometry(radius, 10, 10);
    shape.computeFaceNormals();
    shape.rotateX(90);
    super(shape, 0, Math.PI, 0, 100);
  }
}
