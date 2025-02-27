document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  gsap.from(".commands-section", { y: 50, opacity: 0, duration: 1, delay: 0.5 });
  gsap.from(".developers-section", { y: 50, opacity: 0, duration: 1, delay: 0.8 });
  gsap.from(".faq-section", { y: 50, opacity: 0, duration: 1, delay: 1.1 });

  ScrollReveal().reveal('.hero', { duration: 1500, origin: 'bottom', distance: '50px' });
});
