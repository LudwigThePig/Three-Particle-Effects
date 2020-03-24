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

particles.stop();
```

## API

The `ParticleSystem`'s constructor takes two arguments, the target object to attach the particle system to and the options object. Below are all of the options you can provide.

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

# Disclaimer

This project is still experimental. Do not use this in production!
