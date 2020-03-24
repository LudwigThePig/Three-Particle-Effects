import * as THREE from 'three';
import { randomBoundedInt, randomBoundedFloat } from './utils/random';
import ConeShape from './shapes/ConeShape';
import { IParticleSystem } from './types';

const defaultOptions = {
  initialRotation: [
    // one of tuple of vec3<float> or vec3<float>. Values in radians
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(Math.PI * 2, Math.PI * 2, Math.PI * 2),
  ],
  maxParticles: 100,
  maxTime: 2000, // in MS
  particlesPerSecond: 50,
  particleVelocity: 1, // units per second
  rotationRate: 0, // in radians
  radius: new THREE.Vector3(1, 1, 1),
  minParticleSize: 0.1,
  maxParticleSize: 0.1,
  color: 0xedaa67,
  playOnLoad: true,
  loop: true,
  shape: new ConeShape(),
};

export default class ParticleSystem implements IParticleSystem {
  constructor(target, options = {}) {
    // User Defined Values
    options = { ...defaultOptions, options };
    this.color = options.color;
    this.initialRotation = options.initialRotation;
    this.loop = options.loop;
    this.minParticleSize = options.minParticleSize || options.maxParticleSize || 0.1;
    this.maxParticles = options.maxParticles;
    this.maxParticleSize = options.maxParticleSize || options.minParticleSize || 0.1;
    this.maxTime = options.maxTime;
    this.particlesPerSecond = options.particlesPerSecond;
    this.particleVelocity = options.particleVelocity;
    this.particleQueue = [];
    this.play = options.playOnLoad;
    this.radius = options.radius;
    this.rotationRate = options.rotationRate;
    this.target = target;
    this.shape = options.shape;

    // Member Variables
    this.elapsedTime = 0;
    this.startTime = Date.now();
  }

  createPaticle() {
    const size = randomBoundedInt(this.minParticleSize, this.maxParticleSize);
    const geometry = new THREE.BoxBufferGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: this.color });

    const newParticle = new THREE.Mesh(geometry, material);
    newParticle.position.x = randomBoundedFloat(-this.radius.x, this.radius.x);
    newParticle.position.y = randomBoundedFloat(-this.radius.y, this.radius.y);
    newParticle.position.z = randomBoundedFloat(-this.radius.z, this.radius.z);

    if (Array.isArray(this.initialRotation)) {
      newParticle.rotation.x = randomBoundedFloat(this.initialRotation[0].x, this.initialRotation[1].x);
      newParticle.rotation.y = randomBoundedFloat(this.initialRotation[0].y, this.initialRotation[1].y);
      newParticle.rotation.z = randomBoundedFloat(this.initialRotation[0].z, this.initialRotation[1].z);
    } else {
      newParticle.rotation = this.initialRotation;
    }

    this.target.add(newParticle);
    this.particleQueue.push(newParticle);
  }

  update(deltaTime = 0.02 /* 50fps */) {
    if (!this.play) return;
    if (!this.loop && this.elapsedTime > this.maxTime) {
      this.stop();
      return;
    }

    // create new particles
    for (let i = 0; i < this.particlesPerSecond * deltaTime; i++) {
      this.createPaticle();
    }

    // cull excess particles
    const overThreshold = this.particleQueue.length - this.maxParticles;
    if (overThreshold > 0) {
      const removed = this.particleQueue.splice(0, overThreshold);
      this.target.remove(...removed);
    }

    // update current particles
    this.particleQueue.forEach((particle) => {
      particle.position.y += this.particleVelocity * deltaTime;
    });

    this.elapsedTime = Date.now() - this.startTime;
  }

  play() {
    this.play = true;
  }

  pause() {
    this.play = false;
  }

  clear() {
    this.target.remove(...this.particleQueue);
    this.particleQueue = [];
  }

  stop() {
    this.pause();
    this.clear();
  }
}

export default ParticleEffect;
