document.addEventListener("DOMContentLoaded", function() {
  console.log("Página cargada correctamente.");

  // Partículas de fondo
  particlesJS("particles-js", {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2 }
    }
  });

  console.log("Animaciones de partículas activadas.");
});
