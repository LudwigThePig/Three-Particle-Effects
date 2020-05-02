import * as THREE from 'three';
import BaseShape from '.';
import { IShapeOptions } from '../types';

/**
 * This is the most primitive shape
 */
export default class SphereShape extends BaseShape {
  constructor(radius: number = 1, options: IShapeOptions) {
    const shape = new THREE.SphereGeometry(radius, 10, 10);
    super(shape, options);
  }
}
