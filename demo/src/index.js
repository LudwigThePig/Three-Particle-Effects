import { particles } from './scene';

const $ = (query) => document.querySelector(query); // this feels so wrong

const btn = document.getElementById('toggle-options');
const ctr = document.getElementById('options-ctr');
const particleVelocityInput = $('#particle-velocity input[type="range"]');
const particleVelocityDisplay = $('#particle-velocity .display');

// If dev, display ctr by default
if (window.location.host.slice(0, 9) === 'localhost') {
  ctr.classList.toggle('active');
  btn.classList.toggle('active');
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  btn.classList.toggle('active');
  ctr.classList.toggle('active');
});

particleVelocityInput.value = particles.particleVelocity;
particleVelocityDisplay.innerHTML = particles.particleVelocity;
particleVelocityInput.addEventListener('change', (e) => {
  const { value } = e.target;
  particleVelocityDisplay.innerHTML = value;
  particles.particleVelocity = value;
});
