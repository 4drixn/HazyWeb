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
if (el) {
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
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");

    document.querySelectorAll("a").forEach(link => {
        if (link.hostname === window.location.hostname && link.target !== "_blank") {
            link.addEventListener("click", function (event) {
                event.preventDefault(); 
                let destination = this.href;

                document.body.classList.remove("loaded");
                document.body.style.opacity = 0;

                setTimeout(() => {
                    window.location.href = destination; 
                }, 500); 
            });
        }
    });
});

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
        navbar.classList.add("hidden"); 
    } else {
        navbar.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
});

const menuBtn = document.querySelector(".navbar-menu");
const navLinks = document.querySelector(".navbar-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const notification = document.querySelector(".notification");
        if (notification) {
            notification.style.animation = "slideOut 0.5s ease-in-out forwards";
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 5000);
});
