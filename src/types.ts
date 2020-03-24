export type vectorTuple = [THREE.Vector3, THREE.Vector3];
export type color = number | string;

export interface IShape {
  geometry: THREE.Geometry;
  bakedVertices: number;
  randomPoints: Array<[THREE.Vector3, THREE.Vector3]>;

  getVertex(): vectorTuple;
  generateRandomPoint(): vectorTuple;
  bakeRandomValues(vertices: number): void;
}

export interface IParticleOptions {
  initialRotationRange?: vectorTuple;
  maxParticles?: number;
  particleLifetime?: number;
  particlesPerSecond?: number;
  particleVelocity?: number;
  rotationRate?: number;
  radius?: THREE.Vector3;
  minParticleSize?: number;
  maxParticleSize?: number;
  color?: color; // Hexadecimal RGB
  playOnLoad?: boolean;
  loop?: boolean;
  shape?: IShape;
}

export interface IParticleSystem extends IParticleOptions {
  color: number | string; // Hexadecimal RGB
  initialRotationRange: [THREE.Vector3, THREE.Vector3];
  maxParticles: number;
  particleLifetime: number;
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
