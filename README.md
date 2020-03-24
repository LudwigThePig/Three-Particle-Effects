# Three Particle System

A particle effect system for Three.js

# Installation

Simply install the package.

In your terminal,

```sh
npm i three-particle-system
```

# Disclaimer

This project is still experimental. Do not use this in production!

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

## Options Object

The `ParticleSystem` constructor takes a second options argument object. You can provide the following properties:
