/* =========================================================================
   MAIN.JS - HAZY 3.0
   ========================================================================= */

/* ==================== Partículas Personalizadas (canvas) ==================== */
const particlesCanvas = document.getElementById('particlesCanvas');
if (particlesCanvas) {
  const ctx = particlesCanvas.getContext('2d');
  let particlesArray = [];
  let w, h;

  function initParticles() {
    w = particlesCanvas.width = window.innerWidth;
    h = particlesCanvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
      particlesArray.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1
      });
    }
  }
  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    particlesArray.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx = -p.dx;
      if (p.y < 0 || p.y > h) p.dy = -p.dy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
  }
  window.addEventListener('resize', initParticles);
  initParticles();
  animateParticles();
}

/* ==================== Menú lateral Toggle en Móvil ==================== */
const navToggle = document.getElementById('navToggle');
const sideMenu = document.getElementById('sideMenu');
if (navToggle && sideMenu) {
  navToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
  });
}

/* ==================== Three.js: Planeta giratorio ==================== */
const planetCanvas = document.getElementById('planetCanvas');
if (planetCanvas && typeof THREE !== 'undefined') {
  let scene, camera, renderer, planet;
  function initPlanet() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    renderer = new THREE.WebGLRenderer({ canvas: planetCanvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Geometría y material
    const geometry = new THREE.SphereGeometry(15, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xff88d8, shininess: 100 });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const point = new THREE.PointLight(0xffffff, 0.7);
    point.position.set(30, 30, 50);
    scene.add(point);

    animatePlanet();
  }
  function animatePlanet() {
    requestAnimationFrame(animatePlanet);
    planet.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  initPlanet();
}

/* ==================== GSAP + ScrollTrigger ==================== */
if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animar cada panel al entrar en viewport
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
          start: "top 80%"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      });
    });
  }
}

/* ==================== FAQ Accordion ==================== */
const faqHeaders = document.querySelectorAll('.faq-header');
faqHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
    header.classList.toggle('active');
  });
});

/* ==================== Stats (Fetch) ==================== */
async function fetchStats() {
  try {
    const res = await fetch('https://api.hazybot.net/api/stats');
    const data = await res.json();
    const guildCount = document.getElementById('guildCount');
    const userCount = document.getElementById('userCount');
    if (guildCount) guildCount.textContent = data.guildCount || 0;
    if (userCount) userCount.textContent = data.userCount || 0;
  } catch(e) {
    console.error("Error fetchStats:", e);
  }
}
document.addEventListener('DOMContentLoaded', fetchStats);
setInterval(fetchStats, 30000);

/* ==================== Notificación Bot ==================== */
function closeBotNotification() {
  const botNotification = document.getElementById('botNotification');
  if (botNotification) {
    botNotification.style.display = 'none';
  }
}
window.closeBotNotification = closeBotNotification;
