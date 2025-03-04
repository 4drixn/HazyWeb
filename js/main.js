// Configuración de partículas (nueva paleta y comportamiento)
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 150, "density": { "enable": true, "value_area": 900 } },
    "color": { "value": "#ffffff" },
    "shape": {
      "type": "polygon",
      "stroke": { "width": 0, "color": "#000000" },
      "polygon": { "nb_sides": 5 }
    },
    "opacity": {
      "value": 0.7,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
    },
    "size": { "value": 3, "random": true },
    "line_linked": { "enable": false },
    "move": {
      "enable": true,
      "speed": 0.8,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": { "enable": false }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": false },
      "resize": true
    },
    "modes": { "repulse": { "distance": 100, "duration": 0.5 } }
  },
  "retina_detect": true
});

// GSAP Animations (por ejemplo, para el menú y secciones)
gsap.registerPlugin(ScrollTrigger);

// Animación de entrada para el nav
gsap.from("nav", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });

// Animación para el contenido héroe
gsap.from(".hero-content", {
  duration: 1.2,
  y: 30,
  opacity: 0,
  ease: "power2.out",
  delay: 0.5
});

// ScrollReveal para secciones con efecto desde abajo
ScrollReveal().reveal('section', {
  duration: 1000,
  distance: '60px',
  easing: 'ease-in-out',
  origin: 'bottom',
  reset: false
});

// Efecto de Text Scramble renovado
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
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
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Inicializar TextScramble con un nuevo mensaje
const scrambleElement = document.getElementById('scrambleText');
const scrambleFx = new TextScramble(scrambleElement);

function scrambleReveal() {
  scrambleFx.setText('¡Bienvenido a la revolución web!');
}

scrambleReveal();

scrambleElement.addEventListener('click', () => {
  scrambleFx.setText('Explora lo Inimaginable').then(scrambleReveal);
});

document.querySelector('.nav-left h2').addEventListener('click', () => {
  scrambleFx.setText('Explora lo Inimaginable').then(scrambleReveal);
});

// Función para alternar entre modo oscuro y claro
const modeToggle = document.getElementById('modeToggle');
function toggleMode() {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light-mode');
  } else {
    document.body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  }
}

modeToggle.addEventListener('click', toggleMode);

// Aplicar el modo guardado en localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme') || 'dark-mode';
  document.body.classList.add(theme);
  
  // Iniciar la carga de estadísticas
  fetchStats();
});

// Función para actualizar estadísticas desde API
async function fetchStats() {
  try {
    const response = await fetch('https://api.hazybot.net/api/stats');
    const data = await response.json();

    const guildCountElement = document.getElementById('guildCount');
    if (guildCountElement) {
      guildCountElement.textContent = data.guildCount || 0;
    }
    const userCountElement = document.getElementById('userCount');
    if (userCountElement) {
      userCountElement.textContent = data.userCount || 0;
    }
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
  }
}

setInterval(fetchStats, 30000);
