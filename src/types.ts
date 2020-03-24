export interface IShape {}

export type vectorRange = [THREE.Vector3, THREE.Vector3];
export type color = number | string;

export interface IParticleOptions {
  initialRotationRange?: vectorRange;
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
