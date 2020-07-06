import { debounce, hexStringToInt } from './utils';

const optionsController = particles => {
  const $ = query => document.querySelector(query); // this feels so wrong
  const $a = query => document.querySelectorAll(query); // this feels so wrong

  const btn = document.getElementById('toggle-options');
  const ctr = document.getElementById('options-ctr');
  // If dev, display ctr by default
  if (window.location.host.slice(0, 9) === 'localhost') {
    ctr.classList.toggle('active');
    btn.classList.toggle('active');
  }

  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.toggle('active');
    ctr.classList.toggle('active');
  });

  // _____________ PARTICLES VELOCITY  _____________
  const particleVelocityInput = $('#particle-velocity input[type="range"]');
  const particleVelocityDisplay = $('#particle-velocity .display');
  particleVelocityInput.value = particles.particleVelocity;
  particleVelocityDisplay.innerHTML = particles.particleVelocity;

  particleVelocityInput.addEventListener('change', e => {
    const value = Number(e.target.value);
    particleVelocityDisplay.innerHTML = value;
    particles.particleVelocity = value;
  });

  // _____________ PARTICLES PER SECOND _____________
  const particlePerSecond = $('#particle-per-second input[type="range"]');
  const particlePerSecondDisplay = $('#particle-per-second .display');
  particlePerSecond.value = particles.particlesPerSecond;
  particlePerSecondDisplay.innerHTML = particles.particlesPerSecond;
  particlePerSecond.addEventListener('change', e => {
    const value = Number(e.target.value);
    particlePerSecondDisplay.innerHTML = value;
    particles.particlesPerSecond = value;
  });

  // _____________ MAX PARTICLES _____________
  const maxParticles = $('#max-particles input[type="range"]');
  const maxParticlesDisplay = $('#max-particles .display');
  maxParticles.value = particles.maxParticles;
  maxParticlesDisplay.innerHTML = particles.maxParticles;
  maxParticles.addEventListener('change', e => {
    const value = Number(e.target.value);
    maxParticlesDisplay.innerHTML = value;
    particles.maxParticles = value;
  });

  // _____________ MAX AGE _____________
  const maxAge = $('#max-age input[type="range"]');
  const maxAgeDisplay = $('#max-age .display');
  maxAge.value = particles.maxAge;
  maxAgeDisplay.innerHTML = particles.maxAge;
  maxAge.addEventListener('change', e => {
    const value = Number(e.target.value);
    maxAgeDisplay.innerHTML = value;
    particles.maxAge = value;
  });

  // _____________ PARTICLES SIZE _____________
  const sizeSliders = $a('#min-particle-size input[type="range"]');
  const sizeDisplay = $('#min-particle-size .display');
  sizeSliders[0].value = particles.minParticleSize;
  sizeSliders[1].value = particles.maxParticleSize;
  sizeDisplay.innerHTML = `${particles.minParticleSize} to ${particles.maxParticleSize}`;

  const sizeCallback = index => e => {
    const val = Number(e.target.value);
    const otherVal = Number(sizeSliders[index].value);

    if (val >= otherVal) particles.maxParticleSize = val;
    else particles.minParticleSize = val;
    sizeDisplay.innerHTML = `${particles.minParticleSize} to ${particles.maxParticleSize}`;
  };
  sizeSliders[0].addEventListener('change', sizeCallback(1));
  sizeSliders[1].addEventListener('change', sizeCallback(0));

  // _____________ COLOR RANGE _____________
  const colorRange = $a('#color-range input[type="text"]');
  const colorRangeCtr = $('#color-range');
  const colorDisplay = $a('#color-range .color-display');
  const colorErrMessage = $a('#color-range .invalid-input');
  const colorRegex = /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/;
  colorRange.forEach((el, i) => {
    colorDisplay[i].style.background = colorRange[i].value;
    particles.colorOverTime[i] = hexStringToInt(colorRange[i].value);

    el.addEventListener(
      'input',
      debounce(e => {
        const { value } = e.target;
        if (!colorRegex.test(value)) colorErrMessage[i].classList.remove('hidden');
        else {
          colorErrMessage[i].classList.add('hidden');
          const int = hexStringToInt(value);
          particles.colorOverTime[i] = int;
          colorDisplay[i].style.background = value;
        }
      }, 1000),
    );
  });

  console.log(particles.shape.vertexLocation);
  particles.shape.vertexLocation = 1;
  // particles.shape.bakeRandomValues(); // * YOu ended here silly
};

export default optionsController;
