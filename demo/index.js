import * as THREE from 'three';
import ParticleSystem from '../lib';
import orbitControls from 'three-orbit-controls';
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
const ambientLight = new THREE.AmbientLight(0xfefefe, 0.8); // soft white light
const pointLight = new THREE.PointLight(0xfefefe, 0.8, 10);
pointLight.position.set(2, 2, -1.5);
scene.add(pointLight);
scene.add(ambientLight);

/* *******
 * Camera *
 ******** */
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 1, -8);
camera.lookAt(scene.position);
const controls = new OrbitControls(camera, document.getElementById('canvas-container'));
controls.minDistance = 0;
controls.maxDistance = 40;

/* ***********
 * Character *
 *********** */
const characterGeometry = new THREE.BoxGeometry(1, 1, 1);
const characterMaterial = new THREE.MeshPhongMaterial({ color: 0xed6767 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.rotateY(Math.PI / 3);
scene.add(character);

/**✨✨✨✨✨✨✨✨
 *  Particle Effects ✨
 ✨✨✨✨✨✨✨✨ */
const particles = new ParticleSystem(character, {});

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
  draw();
};
