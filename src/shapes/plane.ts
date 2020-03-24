import * as THREE from 'three';
import BaseShape from '.';

export default class PlaneShape extends BaseShape {
  constructor(width: number, height: number) {
    const shape = new THREE.PlaneGeometry(width, height, 1, 1);
    super(shape, 0, Math.PI, 0, 100);
  }
}
