import * as THREE from 'three';
import { randomBoundedFloat } from './utils/random';
import { lerpHexRGB } from './utils/lerp';
import { IParticleSystem, IParticleOptions, vectorTuple, particleTuple, color, IShape, colorRange } from './types';
import { Object3D, Vector3 } from 'three';
import SphereShape from './shapes/sphere';
import { isBool } from './utils/typeCheck';
import { vertexLocationEnum } from './constants';

export default class ParticleSystem implements IParticleSystem {
  color: color = 0xedaa67;
  colorOverTime: colorRange = [0xffffff, 0];
  duration: number = 2000; // in MS
  elapsedTime: number = 0;
  initialRotationRange: vectorTuple = [
    // one of tuple of vec3<float> or vec3<float>. Values in radians
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(Math.PI * 2, Math.PI * 2, Math.PI * 2),
  ];
  isPlaying: boolean = true;
  loop: boolean = true;
  maxParticleSize: number = 0.3;
  maxParticles: number = 100;
  mesh: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: this.color }));
  minParticleSize: number = 0.1;
  maxAge: number = 2000; // in MS
  particleQueue: particleTuple[] = [];
  particleVelocity: number = 1; // units per second
  particlesPerSecond: number = 50;
  playOnLoad: boolean = true;
  radius: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  rotationRate: number = 0; // in radians
  scene: Object3D | null = null;
  shape: IShape = new SphereShape(null, { vertexLocation: vertexLocationEnum.Face });
  startTime: number;
  target: Object3D;
  worldSpace: boolean = true;

  constructor(target: Object3D, options: IParticleOptions) {
    // User Defined Values
    this.color = options.color || this.color;
    this.colorOverTime = options.colorOverTime || this.colorOverTime;
    this.duration = options.duration || this.duration;
    this.initialRotationRange = options.initialRotationRange || this.initialRotationRange;
    this.isPlaying = isBool(options.playOnLoad) ? options.playOnLoad || false : this.isPlaying;
    this.loop = isBool(options.loop) ? options.playOnLoad || false : this.loop;
    this.maxParticleSize = options.maxParticleSize || options.minParticleSize || 0.1;
    this.maxParticles = options.maxParticles || this.maxParticles;
    this.minParticleSize = options.minParticleSize || options.maxParticleSize || this.minParticleSize;
    this.maxAge = options.maxAge || this.maxAge;
    this.particleVelocity = options.particleVelocity || this.particleVelocity;
    this.particlesPerSecond = options.particlesPerSecond || this.particlesPerSecond;
    this.radius = options.radius || this.radius;
    this.rotationRate = options.rotationRate || this.rotationRate;
    this.shape = options.shape || this.shape;
    this.target = target;
    this.worldSpace = isBool(options.worldSpace) ? options.worldSpace || false : this.worldSpace;

    if (this.worldSpace) this.findSceneObject();
    // Member Variables
    this.startTime = Date.now();
  }

  createPaticle(): void {
    // const size = randomBoundedFloat(this.minParticleSize, this.maxParticleSize);

    // const newParticle = this.mesh.clone(true);
    // newParticle.scale.set(size, size, size);
    const size = randomBoundedFloat(this.minParticleSize, this.maxParticleSize);

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: this.color });

    const newParticle = new THREE.Mesh(geometry, material);
    const [u, v] = this.shape.getVertex();
    newParticle.scalar = v;
    // todo: get and set global rotation
    newParticle.rotation.x = randomBoundedFloat(this.initialRotationRange[0].x, this.initialRotationRange[1].x);
    newParticle.rotation.y = randomBoundedFloat(this.initialRotationRange[0].y, this.initialRotationRange[1].y);
    newParticle.rotation.z = randomBoundedFloat(this.initialRotationRange[0].z, this.initialRotationRange[1].z);

    if (this.worldSpace && this.scene) {
      const pos = new Vector3();
      this.target.getWorldPosition(pos);
      pos.add(u);

      newParticle.position.set(pos.x, pos.y, pos.z);
      this.scene.add(newParticle);
    } else {
      newParticle.position.set(u.x, u.y, u.z);
      this.target.add(newParticle);
    }

    this.particleQueue.push([Date.now(), newParticle]);
  }

  private findSceneObject(): void {
    let cur: Object3D = this.target;
    while (cur.parent) cur = cur.parent;
    this.scene = cur;
  }

  removeParticles(particles: particleTuple[]): void {
    for (let [timestamp, mesh] of particles) {
      if (this.worldSpace && this.scene) this.scene.remove(mesh);
      else this.target.remove(mesh);
    }
  }

  update(deltaTime: number = 0.02 /* 50fps */): void {
    if (!this.isPlaying) return;
    if (!this.loop && this.elapsedTime > this.duration && !this.particleQueue.length) {
      // No more particles being produced
      this.stop();
      return;
    }
    const now = Date.now();

    // create new particles
    if (this.loop || this.elapsedTime < this.duration) {
      for (let i = 0; i < this.particlesPerSecond * deltaTime; i++) {
        this.createPaticle();
      }
    }

    // cull old particles
    const timeThreshold = now - this.maxAge;
    for (let i = 0; i < this.particleQueue.length; i++) {
      if (this.particleQueue[i][0] < timeThreshold) {
        const removed = this.particleQueue.splice(0, i + 1);
        this.removeParticles(removed);
      }
    }

    // cull excess particles
    const overThreshold: number = this.particleQueue.length - this.maxParticles;
    if (overThreshold > 0) {
      const removed = this.particleQueue.splice(0, overThreshold);
      this.removeParticles(removed);
    }

    // update current particles
    this.particleQueue.forEach(([timestamp, mesh]: particleTuple) => {
      if (this.colorOverTime !== null) {
        const lerpAlpha = (now - timestamp) / this.maxAge;
        const newColor = lerpHexRGB(this.colorOverTime[0], this.colorOverTime[1], lerpAlpha);

        mesh.material.color.setHex(newColor);
      }
      mesh.getWorldPosition(mesh.position);
      mesh.position.add(mesh.scalar.clone().multiplyScalar(this.particleVelocity * deltaTime));
    });

    this.elapsedTime = Date.now() - this.startTime;
  }

  play(): void {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.isPlaying = true;
  }

  pause(): void {
    this.isPlaying = false;
  }

  clear(): void {
    this.removeParticles(this.particleQueue);
    this.particleQueue = [];
  }

  stop(): void {
    this.pause();
    this.clear();
  }
}
