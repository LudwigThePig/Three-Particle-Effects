# Three Particle System

A particle effect system for Three.js

# Installation

Simply install the package.

In your terminal,

```sh
npm i three-particle-system
```

# Usage

Using the particle system can be as simple or complex as you would like.

## Basic Usage

To start, create a new particle system object and provide it an object.

```js
import ParticleSystem from 'three-particle-system';

const myObject = new THREE.Object3D();
const particles = new ParticleSystem(myObject);

// example render method
const draw = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
  // ...
  particles.update(); // call update every frame
};

particles.stop(); // to stop
```

## API

The `ParticleSystem`'s constructor takes two arguments, the target object to attach the particle system to and the options object. Below are all of the options you can provide.

### target

**Description**: The object to attach the particle system to. This Object3D must be added to the scene prior to declaring `new ParticleSystem(target)`

**Type**: Object3D

**Required**: true

### Color

**Description**: The color of the particle in hexadecimal format.

**Type**: string | number;

**Default**: `0xedaa67`;

### initialRotationRange

**Description**: The range of rotation upon initialization.

**Type**: [THREE.Vector3, THREE.Vector3];

**Default**: `[new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.PI * 2, Math.PI * 2, Math.PI * 2)]` (0° to 360°)

### loop

**Description**: Should the particle system loop continuously

**Type**: boolean

**Default**: true

### playOnLoad

**Description**: Should the start when the object is instantiated

**Type**: boolean

**Default**: true

### duration

**Description**: The duration of the particle effect in milliseconds. Note, this only describes how long particles are produced for. Particles alive after the duration has elapsed will live until they reach the end of their `particleLifetime`

**Type**: number

**Default**: 2000

### maxParticles

**Description**: The maximum number of particles to be rendered.

**Type**: number

**Default**: 100

### particleLifetime

**Description**: The maximum lifespan of a particle in milliseconds

**Type**: number

**Default**: 2000

### particlesPerSecond

**Description**: The number of particles to be emitted per second.

**Type**: number

**Default**: 50

### particleVelocity

**Description**: How fast a particle moves (in m/s)

**Type**: number

**Default**: 1

### minParticleSize

**Description**: The minimum particle starting size

**Type**: number

**Default**: 0.1

### maxParticleSize

**Description**: the maximum particle starting size

**Type**: number

**Default**: 0.1

### shape

**Description**: the shape, or geometry, that particles will be emitted from or within.

**Type**: IShape

**Default**: PlaneShape

### worldSpace

**Description**: Place new particles in world space, regardless of the target's position. So, updated particles will move in relative space and not relative to the target.

**Type**: boolean

**Default**: false

# Disclaimer

This project is still experimental. Do not use this in production!

# Demo

You can find a small implementation on my website, [ludwigthepig.com](https://ludwigthepig.com)
