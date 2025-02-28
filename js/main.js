particlesJS("particles-js", {
    "particles": {
      "number": { "value": 200, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
      "opacity": {
        "value": 0.8,
        "random": true,
        "anim": { "enable": true, "speed": 1, "opacity_min": 0.2, "sync": false }
      },
      "size": { "value": 1.5, "random": true },
      "line_linked": { "enable": false },
      "move": {
        "enable": true,
        "speed": 0.5,
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
      "modes": { "repulse": { "distance": 80, "duration": 0.4 } }
    },
    "retina_detect": true
  });
  
  ScrollReveal().reveal('.sr', {
    duration: 1000,
    distance: '50px',
    easing: 'ease-in-out',
    origin: 'bottom',
    reset: false
  });
  
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
  
  const el = document.getElementById('scrambleText');
  const fx = new TextScramble(el);
  function scrambleReveal() {
    fx.setText('Hazy');
  }
  scrambleReveal();
  el.addEventListener('click', () => {
    fx.setText('????').then(scrambleReveal);
  });
  document.querySelector('.nav-left h2').addEventListener('click', () => {
    fx.setText('????').then(scrambleReveal);
  });
  