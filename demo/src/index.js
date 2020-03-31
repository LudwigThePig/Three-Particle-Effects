import { particles } from './scene';

const btn = document.getElementById('toggle-options');
const ctr = document.getElementById('options-ctr');
const particleVelocity = document.getElementById('particle-velocity');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  ctr.classList.toggle('active');
});

particleVelocity.addEventListener('change', (e) => {
  e.preventDefault();
  particles.particleVelocity = e.target.value;
});
