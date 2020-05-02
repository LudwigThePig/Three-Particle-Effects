import * as THREE from 'three';
import BaseShape from '.';
import { vectorTuple } from '../types';
import { Vector3 } from 'three';
import { randomArrayItem } from '../utils/random';

/**
 * This is the most primitive shape
 */
export default class SphereShape extends BaseShape {
  constructor(radius: number = 0.5) {
    const shape = new THREE.SphereGeometry(radius, 10, 10);
    super(shape, 0, Math.PI, 0, 100);
    shape.computeFaceNormals();

    console.log(shape);
  }

  generateRandomPoint(): vectorTuple {
    const face = randomArrayItem(this.geometry.faces);

    const scalar = face.normal;
    const pos = randomArrayItem(face.vertexNormals);
    return [pos, scalar];
  }
}
