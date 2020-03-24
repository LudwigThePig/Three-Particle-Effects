export interface IShape {}

export interface IParticleOptions {
  initialRotationRange?: [THREE.Vector3, THREE.Vector3];
  maxParticles?: number;
  particleLifetime?: number;
  particlesPerSecond?: number;
  particleVelocity?: number;
  rotationRate?: number;
  radius?: THREE.Vector3;
  minParticleSize?: number;
  maxParticleSize?: number;
  color?: number | string; // Hexadecimal RGB
  playOnLoad?: boolean;
  loop?: boolean;
  shape?: IShape;
}

export interface IParticleSystem extends IParticleOptions {
  new (target: THREE.Object3D, options: IParticleOptions): IParticleSystem;
  color?: number | string; // Hexadecimal RGB
  initialRotationRange?: [THREE.Vector3, THREE.Vector3];
  maxParticles?: number;
  particleLifetime?: number;
  particlesPerSecond?: number;
  particleVelocity?: number;
  rotationRate?: number;
  radius?: THREE.Vector3;
  minParticleSize?: number;
  maxParticleSize?: number;
  playOnLoad?: boolean;
  loop?: boolean;
  shape?: IShape;

  createPaticle(): void;
  update(deltaTime?: number): void;
  play(): void;
  pause(): void;
  clear(): void;
  stop(): void;
}
