import * as THREE from 'three';
import { IShape, vectorTuple, IShapeOptions } from '../types';
import { randomArrayItem, randomBoundedFloat, randomBoundedVec3 } from '../utils/random';
import { Vector3 } from 'three';
import { vertexLocationEnum } from '../constants';

export default class BaseShape implements IShape {
  geometry: THREE.Geometry;
  bakedVertices: number = 100;
  randomPoints: Array<vectorTuple> = [];
  vertexLocation: vertexLocationEnum;

  constructor(geometry: THREE.Geometry, options: IShapeOptions = {}) {
    this.geometry = geometry;
    this.geometry.computeBoundingBox();
    this.geometry.computeFaceNormals;
    this.bakedVertices = options.bakedVertices || 100;
    this.vertexLocation = options.vertexLocation !== undefined ? options.vertexLocation : vertexLocationEnum.Volume;
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
    const face = randomArrayItem(this.geometry.faces);
    let vertex;
    const normal = face.normal;
    const [A, B, C] = face.vertexNormals;
    if (this.vertexLocation === vertexLocationEnum.Face) {
      const AB = randomBoundedVec3(A, B);
      const AC = randomBoundedVec3(A, C);
      vertex = randomBoundedVec3(AB, AC);
    } else {
      // Get two random vertices to lerp a value between
      const a = randomArrayItem(this.geometry.vertices);
      const b = randomArrayItem(this.geometry.vertices);

      const scalar = Math.random();
      const x = randomBoundedFloat(this.geometry.boundingBox.min.x, this.geometry.boundingBox.max.x);
      const y = randomBoundedFloat(this.geometry.boundingBox.min.y, this.geometry.boundingBox.max.y);
      const z = randomBoundedFloat(this.geometry.boundingBox.min.z, this.geometry.boundingBox.max.z);

      // (x1, y1, z1) + scalar * ((x2, y2, z2) - (x1, y1, z1))
      b.sub(a);
      b.multiplyScalar(scalar);
      a.add(b);
      vertex = new Vector3(x, y, z);
    }
    return [vertex, normal];
  }

  bakeRandomValues(verts: number): void {
    const temp: Array<vectorTuple> = [];
    for (let i = 0; i < verts; i++) {
      temp.push(this.generateRandomPoint());
    }
    this.randomPoints = temp;
  }
}
