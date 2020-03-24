import * as THREE from 'three';
import { IShape, vectorTuple } from '../types';
import { randomArrayItem, randomBoundedFloat } from '../utils/random';
import { Vector3, Vector2 } from 'three';

export default class BaseShape implements IShape {
  geometry: THREE.Geometry;
  bakedVertices: number = 100;
  randomPoints: Array<vectorTuple> = [];

  constructor(geometry: THREE.Geometry, ΘX: number, ΘY: number, ΘZ: number, bakedVertices: number | null) {
    this.geometry = geometry;
    this.geometry.computeBoundingBox();
    this.bakedVertices = bakedVertices || 100;
    if (this.bakedVertices) this.bakeRandomValues(this.bakedVertices);
  }

  getVertex() {
    if (this.bakedVertices) return randomArrayItem(this.randomPoints);

    return this.generateRandomPoint();
  }

  /**
   * This method only works with enclosed shapes. So, if you provide a donut,
   * it will not have a whole... That is a problem that I would like to solve but
   * am not smaht enough for
   */
  generateRandomPoint(): vectorTuple {
    // Get two random vertices to lerp a value between
    const a = randomArrayItem(this.geometry.vertices);
    const b = randomArrayItem(this.geometry.vertices);

    const scalar = Math.random(); // Where the value is in the lerp
    const x = randomBoundedFloat(this.geometry.boundingBox.min.x, this.geometry.boundingBox.max.x);
    const y = randomBoundedFloat(this.geometry.boundingBox.min.y, this.geometry.boundingBox.max.y);
    const z = randomBoundedFloat(this.geometry.boundingBox.min.z, this.geometry.boundingBox.max.z);
    // (x1, y1, z1) + scalar * ((x2, y2, z2) - (x1, y1, z1))
    b.sub(a);
    b.multiplyScalar(scalar);
    a.add(b);
    const vector: Vector3 = new Vector3(0, Math.PI, 0); // Adjacent to surface
    return [new Vector3(x, y, z), vector];
  }

  bakeRandomValues(verts: number): void {
    for (let i = 0; i < verts; i++) {
      this.randomPoints.push(this.generateRandomPoint());
    }
  }
}
