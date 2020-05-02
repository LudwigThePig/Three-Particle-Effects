import * as THREE from 'three';
import BaseShape from '.';
import { IShapeOptions } from '../types';

/**
 * This is the most primitive shape
 */
export default class SphereShape extends BaseShape {
  constructor(radius: number | null, options: IShapeOptions) {
    const shape = new THREE.SphereGeometry(radius || 1, 10, 10);
    super(shape, options);
  }
}
