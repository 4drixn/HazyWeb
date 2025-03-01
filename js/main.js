// --- Fondo de estrellas animado (simulación del espacio) ---
(function() {
  // Crear y configurar el canvas de fondo
  const canvas = document.createElement('canvas');
  canvas.id = 'space-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';  // Queda detrás del contenido
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function initStars() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    const numStars = 150; // Número de estrellas
    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 1.2 + 0.2;  // Tamaño aleatorio
      const baseAlpha = Math.random() * 0.5 + 0.5; // Brillo base (entre 0.5 y 1)
      const twinkleSpeed = Math.random() * 0.05 + 0.01; // Velocidad de titileo
      const twinklePhase = Math.random() * 2 * Math.PI;  // Fase aleatoria
      stars.push({ x, y, radius, baseAlpha, alpha: baseAlpha, twinkleSpeed, twinklePhase });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      star.twinklePhase += star.twinkleSpeed;
      star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * star.baseAlpha * 0.5;
      // Asegurar que alpha esté entre 0 y 1
      star.alpha = Math.max(0, Math.min(1, star.alpha));
      ctx.fillStyle = "rgba(255,255,255," + star.alpha + ")";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animateStars);
  }

  initStars();
  animateStars();
  window.addEventListener('resize', initStars);
})();

// --- Configuración de ScrollReveal ---
ScrollReveal().reveal(".sr", {
  duration: 1600,
  distance: "100px",
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  origin: "bottom",
  reset: true,
  scale: 0.9,
  opacity: 0,
  delay: 400,
});

// --- Efecto TextScramble ---
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
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
    let output = "";
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
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const el = document.getElementById("scrambleText");
if (el) {
  const fx = new TextScramble(el);
  function scrambleReveal() {
    fx.setText("Hazy");
  }
  scrambleReveal();
  el.addEventListener("click", () => {
    fx.setText("????").then(scrambleReveal);
  });
}

// --- Cambio de texto en ".nav-left h2" ---
const navHeading = document.querySelector(".nav-left h2");
if (navHeading && el) {
  navHeading.addEventListener("click", () => {
    const fxNav = new TextScramble(el);
    fxNav.setText("????").then(() => {
      fxNav.setText("Hazy");
    });
  });
}

// --- Cursor Personalizado ---
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
cursor.style.position = "fixed";
cursor.style.top = "0";
cursor.style.left = "0";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.borderRadius = "50%";
cursor.style.background = "rgba(255,255,255,0.8)";
cursor.style.transform = "translate(-50%, -50%)";
cursor.style.pointerEvents = "none";
cursor.style.transition = "transform 0.15s ease, opacity 0.15s ease";
cursor.style.zIndex = "9999";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

document.addEventListener("click", () => {
  cursor.classList.add("click");
  setTimeout(() => cursor.classList.remove("click"), 200);
});

// --- Transiciones Suaves en la Navegación ---
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.5s ease";
});
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0";
});

// --- Notificación Beta ---
const closeNotification = document.querySelector(".close-notification");
const betaNotification = document.querySelector(".beta-notification");

if (closeNotification && betaNotification) {
  closeNotification.addEventListener("click", () => {
    betaNotification.classList.add("hide");
    setTimeout(() => {
      betaNotification.remove();
    }, 500);
    localStorage.setItem("notificationClosed", "true");
  });

  window.addEventListener("load", () => {
    if (localStorage.getItem("notificationClosed") === "true") {
      betaNotification.remove();
    }
  });
}
