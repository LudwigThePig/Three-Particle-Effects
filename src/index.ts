import * as THREE from 'three';
import { randomBoundedInt, randomBoundedFloat } from './utils/random';
import ConeShape from './shapes/cone';
import { IParticleSystem, IParticleOptions, vectorTuple, color, IShape } from './types';
import { Object3D } from 'three';

export default class ParticleSystem implements IParticleSystem {
  color: color = 0xedaa67;
  initialRotationRange: vectorTuple = [
    // one of tuple of vec3<float> or vec3<float>. Values in radians
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(Math.PI * 2, Math.PI * 2, Math.PI * 2),
  ];
  loop: boolean = true;
  maxParticles: number = 100;
  particleLifetime: number = 2000; // in MS
  particlesPerSecond: number = 50;
  particleVelocity: number = 1; // units per second
  rotationRate: number = 0; // in radians
  radius: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  minParticleSize: number = 0.1;
  maxParticleSize: number = 0.1;
  playOnLoad: boolean = true;
  // shape: IShape = new ConeShape();
  target: Object3D;

  particleQueue: Array<THREE.Mesh> = [];
  isPlaying: boolean = true;
  elapsedTime: number = 0;
  startTime: number;

  constructor(target: Object3D, options: IParticleOptions = {}) {
    // User Defined Values
    this.color = options.color || this.color;
    this.initialRotationRange = options.initialRotationRange || this.initialRotationRange;
    this.loop = options.loop || this.loop;
    this.minParticleSize = options.minParticleSize || options.maxParticleSize || this.minParticleSize;
    this.maxParticles = options.maxParticles || this.minParticleSize;
    this.maxParticleSize = options.maxParticleSize || options.minParticleSize || 0.1;
    this.particleLifetime = options.particleLifetime || this.particleLifetime;
    this.particlesPerSecond = options.particlesPerSecond || this.particlesPerSecond;
    this.particleVelocity = options.particleVelocity || this.particleVelocity;
    this.isPlaying = options.playOnLoad || this.isPlaying;
    this.radius = options.radius || this.radius;
    this.rotationRate = options.rotationRate || this.rotationRate;
    this.target = target;
    // this.shape = options.shape || this.shape;

    // Member Variables
    this.startTime = Date.now();
  }

  createPaticle(): void {
    const size = randomBoundedInt(this.minParticleSize, this.maxParticleSize);
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: this.color });

    const newParticle = new THREE.Mesh(geometry, material);
    newParticle.position.x = randomBoundedFloat(-this.radius.x, this.radius.x);
    newParticle.position.y = randomBoundedFloat(-this.radius.y, this.radius.y);
    newParticle.position.z = randomBoundedFloat(-this.radius.z, this.radius.z);

    newParticle.rotation.x = randomBoundedFloat(this.initialRotationRange[0].x, this.initialRotationRange[1].x);
    newParticle.rotation.y = randomBoundedFloat(this.initialRotationRange[0].y, this.initialRotationRange[1].y);
    newParticle.rotation.z = randomBoundedFloat(this.initialRotationRange[0].z, this.initialRotationRange[1].z);

    this.target.add(newParticle);
    this.particleQueue.push(newParticle);
  }

  update(deltaTime: number = 0.02 /* 50fps */): void {
    if (!this.isPlaying) return;
    if (!this.loop && this.elapsedTime > this.particleLifetime) {
      this.stop();
      return;
    }

    // create new particles
    for (let i = 0; i < this.particlesPerSecond * deltaTime; i++) {
      this.createPaticle();
    }

    // cull excess particles
    const overThreshold: number = this.particleQueue.length - this.maxParticles;
    if (overThreshold > 0) {
      const removed: Array<THREE.Mesh> = this.particleQueue.splice(0, overThreshold);
      this.target.remove(...removed);
    }

    // update current particles
    this.particleQueue.forEach((particle: THREE.Mesh) => {
      particle.position.y += this.particleVelocity * deltaTime;
    });

    this.elapsedTime = Date.now() - this.startTime;
  }

  play(): void {
    this.isPlaying = true;
  }

  pause(): void {
    this.isPlaying = false;
  }

  clear(): void {
    this.target.remove(...this.particleQueue);
    this.particleQueue = [];
  }

  stop(): void {
    this.pause();
    this.clear();
  }
}
