// Add floating shapes
function createFloatingShapes() {
  const container = document.querySelector('.floating-shapes');
  for (let i = 0; i < 10; i++) {
    const shape = document.createElement('div');
    const size = Math.random() * 100 + 50;
    const positionX = Math.random() * 100;
    const positionY = Math.random() * 100;
    const animationDelay = Math.random() * 20;
    
    shape.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${positionY}%;
      left: ${positionX}%;
      animation-delay: ${animationDelay}s;
      filter: blur(${Math.random() * 10}px);
    `;
    
    container.appendChild(shape);
  }
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .developer-card').forEach((el) => {
  observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createFloatingShapes();
  
  // Gradient text animation
  const gradientText = document.querySelector('.gradient-text');
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    gradientText.style.background = `linear-gradient(${hue}deg, #FF2E63, #FFAC41)`;
  }, 50);
});
