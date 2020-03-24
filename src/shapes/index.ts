import * as THREE from 'three';
import { randomArrayItem } from '../../utils/random';

export default class BaseShape implements IShape {
  constructor(geometry: THREE.Geometry, ΘX: number, ΘY: number, ΘZ: number, bakedVerticies: number | null = 100) {
    this.geometry = geometry;
    this.bakedVerticies = bakedVerticies;
    this.randomPoints = [];
    if (this.bakedVerticies) this.bakeRandomValues(this.bakedVerticies);
  }

  getVertex() {
    if (this.bakedVerticies) return randomArrayItem(this.randomPoints);

    return this.generateRandomPoint();
  }

  /**
   * This method only works with enclosed shapes. So, if you provide a donut,
   * it will not have a whole... That is a problem that I would like to solve but
   * am not smaht enough for
   */
  generateRandomPoint() {
    // Get two random verticies to lerp a value between
    const a = randomArrayItem(this.geometry.verticies);
    const b = randomArrayItem(this.geometry.verticies);

    const d = Math.random(); // Where the value is in the lerp

    // (x1, y1, z1) + d * ((x2, y2, z2) - (x1, y1, z1))
    return a.add(b.add(a.negate()).multiply(new THREE.Vector3(d, d, d)));
  }

  bakeRandomValues(verts) {
    for (let i = 0; i < verts; i++) {
      this.randomPoints.push(this.generateRandomPoint());
    }
  }
}
