import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

let scene, camera, renderer, particles, geometry;
const particleCount = 700;

export function init3DBackground() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('webgl-bg').appendChild(renderer.domElement);

  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Pakistani Wedding Theme Colors: Gold, Rose Red, Marigold Yellow
  const themeColors = [
    new THREE.Color('#D4AF37'), // Gold
    new THREE.Color('#E63946'), // Rose Red
    new THREE.Color('#FFB703')  // Marigold (Mayun Yellow)
  ];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    const color = themeColors[Math.floor(Math.random() * themeColors.length)];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();

  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  const positions = particles.geometry.attributes.position.array;
  for (let i = 1; i < particleCount * 3; i += 3) {
    positions[i] -= 0.005; // Falling effect
    if (positions[i] < -5) positions[i] = 5;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}