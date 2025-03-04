// main.js Redesigned - Animaciones avanzadas e interactividad mejorada
// Mantiene la estructura, variables y funciones originales, añadiendo mejoras visuales

// Clase para efecto de text-scrambling (mezclar letras aleatoriamente antes de revelar el texto final)
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';  // Conjunto de caracteres aleatorios para usar en la animación
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const startFrame = Math.floor(Math.random() * 40);
      const endFrame = startFrame + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, startFrame, endFrame });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();  // Iniciar la animación de mezcla de texto
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, startFrame, endFrame, char } = this.queue[i];
      if (this.frame >= endFrame) {
        // Cuando se alcanza el frame final, añadir el carácter definitivo
        complete++;
        output += to;
      } else if (this.frame >= startFrame) {
        // En el intervalo de animación: mostrar un carácter aleatorio
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble">${char}</span>`;
      } else {
        // Aún no es el momento de este carácter: mostrar el original (o vacío)
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      // Animación completada: resolver la Promise asociada
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  }
  randomChar() {
    // Seleccionar un carácter aleatorio del conjunto predefinido
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // (Aquí se podría conservar código original existente, por ejemplo inicializaciones previas)

  // Efecto de partículas de fondo (animación avanzada)
  const heroSection = document.querySelector('.hero');
  const particleContainer = document.createElement('div');
  particleContainer.classList.add('particle-container');
  if (heroSection) {
    // Adjuntar contenedor de partículas al hero para que las partículas estén en esa sección
    heroSection.style.position = 'relative';
    heroSection.prepend(particleContainer);  // Insertar como primer hijo (detrás del contenido del hero)
    particleContainer.style.position = 'absolute';
  } else {
    // Si no existe sección con clase .hero, usar todo el fondo de la página
    document.body.appendChild(particleContainer);
    particleContainer.style.position = 'fixed';
  }
  // Configurar tamaño del contenedor de partículas para cubrir todo el área
  particleContainer.style.top = 0;
  particleContainer.style.left = 0;
  particleContainer.style.width = '100%';
  particleContainer.style.height = '100%';
  // Crear partículas individuales
  let particleCount = window.innerWidth < 768 ? 30 : 50;  // Cantidad de partículas (menos en móvil por rendimiento)
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    // Tamaño aleatorio entre 2px y 6px
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    // Posición inicial aleatoria dentro del contenedor (usando porcentajes)
    p.style.top = `${Math.random() * 100}%`;
    p.style.left = `${Math.random() * 100}%`;
    // Aplicar desenfoque a algunas partículas para variar profundidad
    if (Math.random() < 0.5) {
      p.style.filter = 'blur(1px)';
    }
    particleContainer.appendChild(p);
  }
  // Animar partículas continuamente con GSAP (si la librería está disponible)
  if (window.gsap) {
    document.querySelectorAll('.particle').forEach(p => {
      gsap.to(p, {
        x: `${Math.random() * 100 - 50}%`,    // Desplazamiento aleatorio en X (entre -50% y 50%)
        y: `${Math.random() * 100 - 50}%`,    // Desplazamiento aleatorio en Y
        duration: Math.random() * 5 + 5,      // Duración aleatoria entre 5 y 10 segundos
        repeat: -1,                          // Repetir indefinidamente
        yoyo: true,                          // Oscilar ida y vuelta (yoyo)
        ease: "sine.inOut",
        delay: Math.random() * 5             // Comenzar en distintos momentos
      });
    });
  }

  // Animaciones de entrada (on load) con GSAP
  if (window.gsap) {
    const tl = gsap.timeline();
    // Animar título principal del hero
    if (document.querySelector('.hero-title')) {
      tl.from('.hero-title', {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: "power2.out"
      });
    }
    // Animar subtítulo del hero (ligeramente después del título)
    if (document.querySelector('.hero-subtitle')) {
      tl.from('.hero-subtitle', {
        duration: 1.2,
        y: -30,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.8");  // "-=0.8" inicia esta animación 0.8s antes de que termine la anterior (solapamiento)
    }
    // Animar botón del hero (aparece con rebote)
    if (document.querySelector('.hero .btn')) {
      tl.from('.hero .btn', {
        duration: 1.2,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)"
      }, "-=0.8");
    }
  }

  // Efectos al hacer scroll con ScrollReveal
  if (window.ScrollReveal) {
    const sr = ScrollReveal();
    // Revelar secciones enteras desde abajo
    sr.reveal('.section', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      interval: 200  // Intervalo entre revelaciones de elementos .section (si hay varios)
    });
    // Revelar tarjetas y elementos de características de forma escalonada
    sr.reveal('.card, .feature, .service, .profile', {
      origin: 'bottom',
      distance: '30px',
      duration: 800,
      easing: 'ease-in-out',
      interval: 100  // Pequeño intervalo para animar múltiples elementos en secuencia
    });
  }

  // Efecto de text-scrambling en texto principal (por ejemplo, subtítulo del hero)
  const scrambleElement = document.querySelector('.hero-subtitle') || document.querySelector('.hero-title');
  if (scrambleElement) {
    const originalText = scrambleElement.textContent;
    scrambleElement.textContent = '';           // Limpiar texto inicialmente para que la animación arranque desde vacío
    const fx = new TextScramble(scrambleElement);
    fx.setText(originalText);                   // Iniciar animación de texto mezclado hacia el texto original
  }

  // Toggle del menú responsive (mostrar/ocultar el menú de navegación en móviles)
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');  // Agregar o quitar la clase 'show' en el ul del nav
    });
  }

  // Efecto Parallax en scroll: mover fondos a diferente velocidad que el scroll
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
      // Ajustar posición de fondo en función del scroll y velocidad definida
      el.style.backgroundPositionY = `${-(window.pageYOffset * speed)}px`;
    });
  });

  // ... (Aquí se podrían conservar otras funciones originales, como manejadores de eventos, etc.)
});
