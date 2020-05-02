import * as THREE from 'three';
import { IShape, vectorTuple } from '../types';
import { randomArrayItem, randomBoundedFloat, randomBoundedVec3 } from '../utils/random';
import { Vector3 } from 'three';

export default class BaseShape implements IShape {
  geometry: THREE.Geometry;
  bakedVertices: number = 100;
  randomPoints: Array<vectorTuple> = [];

  constructor(geometry: THREE.Geometry, ΘX: number, ΘY: number, ΘZ: number, bakedVertices: number | null) {
    this.geometry = geometry;
    this.geometry.computeBoundingBox();
    this.geometry.computeFaceNormals;
    const { x, y, z } = this.geometry.boundingBox.max.sub(this.geometry.boundingBox.min);
    // this.geometry.translate(-x / 4, -y / 4, -z / 4);
    this.bakedVertices = bakedVertices || 100;
    if (this.bakedVertices) this.bakeRandomValues(this.bakedVertices);
  }

  getVertex() {
    if (this.bakedVertices) return randomArrayItem(this.randomPoints);

    return this.generateRandomPoint();
  }

  /**
   * This method only works with enclosed shapes. So, if you provide a donut,
   * it will not have a hole... Currently researching some possible solutions
   */
  generateRandomPoint(): vectorTuple {
    // Get a polygon
    const face = randomArrayItem(this.geometry.faces);
    // Get normal, easy 😸
    const normal = face.normal;

    // Generate random vertex in polygon
    const [A, B, C] = face.vertexNormals;
    const AB = randomBoundedVec3(A, B);
    const AC = randomBoundedVec3(A, C);
    const vertex = randomBoundedVec3(AB, AC);

    return [vertex, normal];
  }

  bakeRandomValues(verts: number): void {
    for (let i = 0; i < verts; i++) {
      this.randomPoints.push(this.generateRandomPoint());
    }
  }
}
