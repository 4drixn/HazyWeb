/* =========================================================================
   MAIN.JS - Animaciones Avanzadas con Three.js, GSAP, ScrollTrigger, etc.
   ========================================================================= */

/* ==================== Partículas ==================== */
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 160, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.7,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.2, "sync": false }
    },
    "size": { "value": 2, "random": true },
    "move": {
      "enable": true,
      "speed": 0.7,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": false },
      "resize": true
    },
    "modes": {
      "repulse": { "distance": 70, "duration": 0.4 }
    }
  },
  "retina_detect": true
});

/* ==================== ScrollReveal ==================== */
ScrollReveal().reveal('.sr', {
  duration: 1000,
  distance: '60px',
  easing: 'ease-in-out',
  origin: 'bottom',
  reset: false
});

/* ==================== Notificación Bot ==================== */
function closeBotNotification() {
  const botNotification = document.getElementById('botNotification');
  if (botNotification) {
    botNotification.style.display = 'none';
  }
}
window.closeBotNotification = closeBotNotification;

/* ==================== Menú Responsive ==================== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

/* ==================== GSAP Animaciones ==================== */
if (typeof gsap !== 'undefined') {
  // Animación de la navbar
  gsap.from(".nav-glass", {
    duration: 1,
    y: -80,
    opacity: 0,
    ease: "power2.out"
  });
  // ScrollTrigger para secciones
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.section').forEach((sec) => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      });
    });
  }
}

/* ==================== Efecto 3D con Three.js ==================== */
const canvas = document.getElementById('heroCanvas');
if (canvas && typeof THREE !== 'undefined') {
  let scene, camera, renderer, torus;
  function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Crear un objeto Torus
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0080 });
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    animate3D();
  }

  function animate3D() {
    requestAnimationFrame(animate3D);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  // Ajustar viewport al cambiar tamaño ventana
  window.addEventListener('resize', () => {
    if (!renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  init3D();
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

/* ==================== Ejemplo: Efecto de TextScramble (Opcional) ==================== */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

/* Uso de TextScramble en el hero-title (opcional) */
const glitchTitle = document.querySelector('.hero-title');
if (glitchTitle) {
  const scramble = new TextScramble(glitchTitle);
  glitchTitle.addEventListener('mouseenter', () => {
    scramble.setText('H4ZY???').then(() => {
      scramble.setText('HAZY 2.0');
    });
  });
}
