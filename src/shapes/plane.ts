import * as THREE from 'three';
import BaseShape from '.';

/**
 * This is the most primitive shape
 */
export default class PlaneShape extends BaseShape {
  constructor(width: number = 1, height: number = 1) {
    const shape = new THREE.PlaneGeometry(width, height, 1, 1);
    shape.computeFaceNormals();
    shape.rotateX(-90);
    super(shape, 0, Math.PI, 0, 100);
  }
}
