import { particles } from './scene';

const $ = (query) => document.querySelector(query); // this feels so wrong

const btn = document.getElementById('toggle-options');
const ctr = document.getElementById('options-ctr');
const particleVelocityInput = $('#particle-velocity input[type="range"]');
const particleVelocityDisplay = $('#particle-velocity .display');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  ctr.classList.toggle('active');
});

particleVelocityInput.value = particles.particleVelocity;
particleVelocityDisplay.innerHTML = particles.particleVelocity;
particleVelocityInput.addEventListener('change', (e) => {
  const { value } = e.target;
  console.log(particles);
  particleVelocityDisplay.innerHTML = value;
  particles.particleVelocity = value;
});
