import * as THREE from 'three';
import BaseShape from '.';
import { vectorTuple } from '../types';
import { Vector3 } from 'three';
import { randomArrayItem } from '../utils/random';

/**
 * This is the most primitive shape
 */
export default class SphereShape extends BaseShape {
  constructor(radius: number = 1) {
    const shape = new THREE.SphereGeometry(radius, 10, 10);
    super(shape, 0, Math.PI, 0, 100);
  }
}
