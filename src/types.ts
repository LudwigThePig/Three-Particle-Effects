import { vertexLocationEnum } from './constants';

export type vectorTuple = [THREE.Vector3, THREE.Vector3];
export type color = number | string;
export type colorRange = null | [number, number];
export declare type particleTuple = [number, THREE.Mesh]; // [timestamp, theParticleMesh]

export interface IShapeOptions {
  bakedVertices?: number;
  vertexLocation?: vertexLocationEnum;
}

export interface IShape extends IShapeOptions {
  geometry: THREE.Geometry;
  vertexLocation: vertexLocationEnum;
  bakedVertices: number;
  randomPoints: Array<[THREE.Vector3, THREE.Vector3]>;

  getVertex(): vectorTuple;
  generateRandomPoint(): vectorTuple;
  bakeRandomValues(vertices: number): void;
}

export interface IParticleOptions {
  initialRotationRange?: vectorTuple;
  maxParticles?: number;
  maxAge?: number;
  particlesPerSecond?: number;
  particleVelocity?: number;
  rotationRate?: number;
  radius?: THREE.Vector3;
  minParticleSize?: number;
  maxParticleSize?: number;
  color?: color; // Hexadecimal RGB
  colorOverTime: colorRange;
  playOnLoad?: boolean;
  duration?: number;
  loop?: boolean;
  shape?: IShape;
  worldSpace?: boolean;
}

export interface IParticleSystem extends IParticleOptions {
  color: number | string; // Hexadecimal RGB
  colorOverTime: colorRange;
  initialRotationRange: [THREE.Vector3, THREE.Vector3];
  maxParticles: number;
  maxAge: number;
  particlesPerSecond: number;
  particleVelocity: number;
  rotationRate: number;
  radius: THREE.Vector3;
  minParticleSize: number;
  maxParticleSize: number;
  loop: boolean;
  isPlaying: boolean;
  // shape: IShape;

  createPaticle(): void;
  update(deltaTime?: number): void;
  play(): void;
  pause(): void;
  clear(): void;
  stop(): void;
}
