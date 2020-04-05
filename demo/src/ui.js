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
    const { value } = e.target;
    particleVelocityDisplay.innerHTML = value;
    particles.particleVelocity = value;
  });

  // _____________ PARTICLES PER SECOND _____________
  const particlePerSecond = $('#particle-per-second input[type="range"]');
  const particlePerSecondDisplay = $('#particle-per-second .display');
  particlePerSecond.value = particles.particlesPerSecond;
  particlePerSecondDisplay.innerHTML = particles.particlesPerSecond;
  particlePerSecond.addEventListener('change', e => {
    const { value } = e.target;
    particlePerSecondDisplay.innerHTML = value;
    particles.particlesPerSecond = value;
  });

  // _____________ MAX PARTICLES _____________
  const maxParticles = $('#max-particles input[type="range"]');
  const maxParticlesDisplay = $('#max-particles .display');
  maxParticles.value = particles.maxParticles;
  maxParticlesDisplay.innerHTML = particles.maxParticles;
  maxParticles.addEventListener('change', e => {
    const { value } = e.target;
    maxParticlesDisplay.innerHTML = value;
    particles.maxParticles = value;
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
};

export default optionsController;