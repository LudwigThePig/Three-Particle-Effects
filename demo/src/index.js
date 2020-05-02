import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import orbitControls from 'three-orbit-controls';
import optionsController from './ui';

import ParticleSystem from '../../lib';

const OrbitControls = orbitControls(THREE);

/* *********
 * Renderer *
 ********** */
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

/* ******
 * Scene *
 ******* */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

/* *******
 * Lights *
 ******** */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3); // soft white light
const pointLight = new THREE.PointLight(0xffffff, 1.8, 10);
pointLight.position.set(1, 1, -2);
scene.add(pointLight);
scene.add(ambientLight);

/* *******
 * Camera *
 ******** */
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 1, -3);
camera.lookAt(scene.position);
const controls = new OrbitControls(camera, document.getElementById('canvas-container'));
controls.minDistance = 0;
controls.maxDistance = 40;
/**✨✨✨✨✨✨✨✨
 *  Particle Effects ✨
 ✨✨✨✨✨✨✨✨ */
export let particles;

/* ***********
 * Character *
 *********** */
const monkeyLoader = new GLTFLoader();
let monkey;
const monkeyLoadCallback = gltf => {
  monkey = gltf.scene;
  monkey.rotateY(-Math.PI * 0.85);
  monkey.rotateX(-Math.PI * 0.25);
  scene.add(monkey);
  particles = new ParticleSystem(monkey, {});
  draw();
  optionsController(particles);
};
monkeyLoader.load('monkey.glb', monkeyLoadCallback);

/* ***************
 * Main Game Loop *
 **************** */
const draw = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
  particles.update();
  controls.update();
};

/* *********************
 * MISC EVENT LISTENERS *
 ********************** */
const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', onWindowResize);

window.onload = () => {
  document.getElementById('canvas-container').appendChild(renderer.domElement);
};

const len = 20;
let i = len - 1;
setInterval(() => {
  let str = '_'.repeat(len);
  str = str.substring(0, i) + '🌠' + str.substring(i + 1, len);
  if (i-- === 0) i = len - 1;
  document.title = str;
}, 400);
