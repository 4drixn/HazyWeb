// Page Transition
window.addEventListener('beforeunload', function() {
  document.querySelector('.page-transition').style.animation = 'none';
  document.querySelector('.page-transition').style.opacity = '1';
});

window.addEventListener('load', function() {
  setTimeout(() => {
    document.querySelector('.page-transition').style.display = 'none';
  }, 1000);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  gsap.to(cursorFollower, {
    duration: 0.3,
    left: e.clientX - 4 + 'px',
    top: e.clientY - 4 + 'px'
  });
});

// Hover Effects
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursor.style.borderColor = '#FF2E63';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.borderColor = '#FF2E63';
  });
});

// Particles Initialization
particlesJS('particles-js', {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    }
  },
  retina_detect: true
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// GSAP Animations
gsap.from('nav', { duration: 1, y: -100, opacity: 0, ease: 'power4.out' });
gsap.from('.hero-title', { duration: 1.5, opacity: 0, y: 50, ease: 'elastic.out' });
gsap.from('.developer-card', {
  duration: 1,
  opacity: 0,
  y: 50,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.team-section',
    start: 'top center'
  }
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.developer-card').forEach(el => observer.observe(el));
